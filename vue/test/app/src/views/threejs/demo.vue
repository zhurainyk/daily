<template>
    <div id="scene"></div>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Wall from "./js/Wall";
import RunRing from "./js/RunRing";
import RunLine from "./js/RunLine";
let scene; //场景
let camera; //相机
let renderer; //创建渲染器
// eslint-disable-next-line no-unused-vars
let controls; //控制器
let pickingScene, pickingTexture; //离屏渲染

export default {
    mounted() {
        this.init();
        this.createControls();
        this.addGLTF();
        this.render();
        // this.creatWall();
        this.creatRing();
        // this.creatRunLine();
        window.addEventListener("click", this.onDocumentMouseDown);
        window.onresize = () => {

        }
    },
    methods: {
        init() {
            //创建场景
            scene = new THREE.Scene();
            //天空盒

            // const textureCube = new THREE.CubeTextureLoader().load([
            //     "./img/1.jpg",
            //     "./img/2.jpg",
            //     "./img/3.jpg",
            //     "./img/4.jpg",
            //     "./img/5.jpg",
            //     "./img/6.jpg",
            // ]);
            // scene.background = textureCube; // 作为背景贴图
            var materials = []
            // const urls = [
            //     "./img/1.jpg",
            //     "./img/2.jpg",
            //     "./img/3.jpg",
            //     "./img/4.jpg",
            //     "./img/5.jpg",
            //     "./img/6.jpg",
            // ]
            // var loader = new THREE.TextureLoader()
            // for (let i = 0; i < urls.length; i++) {
            //     var texture = loader.load(urls[i], function () { console.log('q') }, undefined, function (e) { console.log(e) })
            //     materials.push(new THREE.MeshBasicMaterial({
            //         map: texture,
            //         side: THREE.BackSide
            //         // transparent: true,
            //         // needsUpdate:true
            //     }))
            // }
            var cube = new THREE.Mesh(new THREE.BoxGeometry(1000, 1000, 1000), materials)
            cube.name = 'sky'
            scene.add(cube)

            /**
             * 透视投影相机设置
             */
            const width = window.innerWidth; // 窗口宽度
            const height = window.innerHeight; // 窗口高度

            // // 在屏幕上显示坐标轴
            // var axes = new THREE.AxisHelper(3600);
            // scene.add(axes);
            /** 透视投影相机对象 */

            camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
            camera.position.set(600, 500, -800); // 树上面观察
            camera.lookAt(-300, 500, 2200); // 设置相机方向(指向的场景对象)
            // 创建渲染器对象

            const container = document.getElementById("scene");
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(container.clientWidth, container.clientHeight); // 设置渲染区域尺寸
            container.appendChild(renderer.domElement); // body元素中插入canvas对象

            //创建点光源和环境光源
            const point = new THREE.PointLight(0xffffff);
            point.position.set(500, 500, 500); // 点光源位置
            scene.add(point); // 点光源添加到场景中
            // 环境光
            const ambient = new THREE.AmbientLight(0x404040, 1);
            scene.add(ambient);
            pickingScene = new THREE.Scene(); //离屏渲染
            pickingTexture = new THREE.WebGLRenderTarget(1, 1); //离屏渲染
        },
        createControls() {
            controls = new OrbitControls(camera, renderer.domElement);
        },
        render() {
            this.cityanimate();
            renderer.setRenderTarget(null);
            renderer.render(scene, camera);
            controls.update()
            requestAnimationFrame(this.render); // 请求再次执行渲染函数render
        },
        addGLTF() {
            const loader = new GLTFLoader();
            loader.load("/shanghai.gltf", (gltf) => {
                gltf.scene.traverse((child) => {
                    // 设置线框材质
                    if (child.isMesh) {
                        //这个判断模型是楼房还是其他  加载不同的材质
                        if (["CITY_UNTRIANGULATED"].includes(child.name)) {
                            // 拿到模型线框的Geometry
                            this.setCityLineMaterial(child);
                            this.setCityMaterial(child);
                        } else if (["ROADS"].includes(child.name)) {
                            //道路
                            const material = new THREE.MeshBasicMaterial({
                                color: "rgb(41,46,76)",
                            });
                            const mesh = new THREE.Mesh(child.geometry, material);
                            mesh.rotateX(-Math.PI / 2);
                            mesh.position.set(
                                child.position.x,
                                child.position.y,
                                child.position.z
                            );
                            scene.add(mesh);
                        } else {
                            //地面
                            const material = new THREE.MeshBasicMaterial({
                                color: "#040912",
                            });
                            const mesh = new THREE.Mesh(child.geometry, material);
                            scene.add(mesh);
                            mesh.rotateX(-Math.PI / 2);
                            mesh.position.set(
                                child.position.x,
                                child.position.y,
                                child.position.z
                            );
                        }
                    }
                    // 设置线框材质
                });
            });
        },
        setCityMaterial(object) {
            const shader = new THREE.ShaderMaterial({
                uniforms: {
                    height: this.height,
                    uFlowColor: {
                        value: new THREE.Color("#5588aa"),//楼层渲染颜色
                    },
                    uCityColor: {
                        value: new THREE.Color("#1B3045"),//城市颜色
                    },
                },
                vertexShader: `
                varying vec3 vPosition;
                void main()
                {
                  vPosition = position;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                }`,
                fragmentShader: `
                            float distanceTo(vec2 src,vec2 dst)
                            {
                                float dx=src.x-dst.x;
                                float dy=src.y-dst.y;
                                float dv=dx*dx+dy*dy;
                                return sqrt(dv);
                            }
                            varying vec3 vPosition;
                            uniform float height;
                            uniform float uStartTime;
                            uniform vec3 uSize;
                            uniform vec3 uFlowColor;
                            uniform vec3 uCityColor;
                            void main()
                            {
                                //模型的基础颜色
                                vec3 distColor=uCityColor;
                                // 流动范围当前点z的高度加上流动线的高度
                                float topY=vPosition.z+10.;
                                if(height>vPosition.z&&height<topY){
                                    // 颜色渐变
                                        float dIndex = sin((height - vPosition.z) / 10.0 * 3.14);
                                        distColor = mix(uFlowColor, distColor, 1.0-dIndex);

                                }
                                //定位当前点位位置
                                vec2 position2D=vec2(vPosition.x,vPosition.y);
                                //求点到原点的距离
                                float Len=distanceTo(position2D,vec2(0,0));
                                    if(Len>height*30.0&&Len<(height*30.0+130.0)){
                                    // 颜色渐变
                                    float dIndex = sin((Len - height*30.0) / 130.0 * 3.14);
                                    distColor= mix(uFlowColor, distColor, 1.0-dIndex);
                                }
                                gl_FragColor=vec4(distColor,1.0);
                            }`,
                transparent: true,
            });

            const city = new THREE.Mesh(object.geometry, shader);
            city.position.set(
                object.position.x,
                object.position.y,
                object.position.z
            );
            scene.add(city);
            // pickingScene.add(city);
            city.rotateX(-Math.PI / 2);
        },
        setCityLineMaterial(object) {
            const edges = new THREE.EdgesGeometry(object.geometry, 1);
            //设置模型的材质
            const lineMaterial = new THREE.LineBasicMaterial({
                // 线的颜色
                color: "rgba(38,133,254)",
            });
            //把数据组合起来
            const lineS = new THREE.LineSegments(edges, lineMaterial);
            //设置数据的位置
            lineS.position.set(
                object.position.x,
                object.position.y,
                object.position.z
            );
            //添加到场景
            scene.add(lineS);

            lineS.rotateX(-Math.PI / 2);
        },
        cityanimate() {
            this.height.value += 0.1;
            if (this.height.value > 60) {
                this.height.value = 0.0;
            }
        },
        creatWall() {
            const wallData = {
                position: {
                    x: -150,
                    y: 15,
                    z: 100,
                },
                speed: 0.5,
                color: "#efad35",
                opacity: 0.6,
                radius: 420,
                height: 120,
                renderOrder: 5,
            };

            let wallMesh = new Wall(wallData);
            wallMesh.mesh.material.uniforms.time = this.height;
            scene.add(wallMesh.mesh);
        },
        creatRing() {
            const textureLoader = new THREE.TextureLoader();
            const texture = textureLoader.load("./img/clice.png");
            const cubeGeometry = new THREE.BoxGeometry(224, 224, 224)
            const cubeMaterial = new THREE.MeshStandardMaterial({
                // color: 0x00ff00,
                map: texture,
            })
            var ambient1 = new THREE.AmbientLight('#ffffff'); //影响投影的颜色
            scene.add(ambient1);
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            scene.add(cube)

            // this.RunRing1 = new RunRing({
            //     img: "./img/clice.png",
            //     scene: scene,
            //     speed: 1,
            //     radius: 500,
            //     position: [
            //         [400, 30, 400],
            //         // [100, 30, 1200],
            //     ],
            // })


        },
        creatRunLine() {
            this.runline1 = new RunLine({
                img: "./img/z1.png",
                camera: camera,
                height: 140,
                v0: new THREE.Vector3(60, 18, -279),
                v1: new THREE.Vector3(-17.5, 111.5, -23),
                el: document.getElementById("scene"),
                scene: scene,
                speed: 1,
                lineWidth: 40,
                type: "run",
            });
            this.runline2 = new RunLine({
                img: "./img/z_112.png",
                camera: camera,
                height: 140,
                v0: new THREE.Vector3(-113, 44, 666),
                v1: new THREE.Vector3(-17.5, 111.5, -23),
                el: document.getElementById("scene"),
                scene: scene,
                speed: 1,
                lineWidth: 40,
                type: "run",
            });
            this.runline3 = new RunLine({
                img: "./img/z_11.png",
                camera: camera,
                height: 140,
                v0: new THREE.Vector3(-418, 113, -12),
                v1: new THREE.Vector3(-17.5, 111.5, -23),
                el: document.getElementById("scene"),
                scene: scene,
                speed: 1,
                lineWidth: 40,
                type: "run",
            });
            this.runline5 = new RunLine({
                img: "./img/n.png",
                camera: camera,
                height: 140,
                v0: new THREE.Vector3(614, 18, 130),
                v1: new THREE.Vector3(-17.5, 111.5, -23),
                el: document.getElementById("scene"),
                scene: scene,
                speed: 1,
                lineWidth: 40,
                type: "run",
            });
        },
        onDocumentMouseDown(event) {
            this.gpuClick();
            this.raycastClick(event);
        },
        raycastClick(event) {
            event.preventDefault();
            const vector = new THREE.Vector3(); // 三维坐标对象
            vector.set(
                (event.clientX / window.innerWidth) * 2 - 1,
                -(event.clientY / window.innerHeight) * 2 + 1,
                0.5
            );
            vector.unproject(camera);
            const raycaster = new THREE.Raycaster(
                camera.position,
                vector.sub(camera.position).normalize()
            );
            const intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length > 0) {
                const selected = intersects[0]; // 取第一个物体
                console.log(`x坐标:${selected.point.x}`);
                console.log(`y坐标:${selected.point.y}`);
                console.log(`z坐标:${selected.point.z}`);
            }
        },
        gpuClick() {
            renderer.setRenderTarget(pickingTexture);
            renderer.render(pickingScene, camera);
        },
    },
    data() {
        return {
            height: {
                value: 0,
            },
            RunRing1: ''
        };
    },
};
</script>
<style scoped>
html,
body,
#scene {
    width: 100vw;
    height: 100vh;
    z-index: 2;
    position: absolute;
    top: 0%;
}
</style>
