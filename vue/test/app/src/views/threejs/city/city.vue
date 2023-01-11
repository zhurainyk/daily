<template>
    <div id="container">
        <button @click="handleStructure">查看结构</button>
    </div>
</template>

<script>

import * as THREE from "three";
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader";
import { DDSLoader } from "three/examples/jsm/loaders/DDSLoader";
const OrbitControls = require("three-orbit-controls")(THREE);
// 场景
let scene = null;
// 相机
let camera = null;
// 渲染
let renderer = null;
// 控制器
let controls = null;
// 原材质
let oldChildren = null;
// 保存之前的结构数据
let selectObj = null;
let selectObject = null;
// 判断结构是否停止,没有停止不给任何操作
let isClick = true;
export default {
    name: "Home",
    mounted() {
        this.init();
        this.light();
        this.loadObj();
        this.animate();
    },
    methods: {
        init() {
            let container = document.getElementById("container");
            // 场景
            scene = new THREE.Scene();
            // 相机
            camera = new THREE.PerspectiveCamera(
                75,
                container.clientWidth / container.clientHeight,
                1,
                10000
            );
            // 可根据自己需求调整
            camera.position.z = 1300;
            camera.position.y = 1100;
            renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            });
            const that = this
            renderer.setSize(container.clientWidth, container.clientHeight);
            // 渲染在页面
            container.appendChild(renderer.domElement);
            controls = new OrbitControls(camera, renderer.domElement);
            // 能缩放最远距离与最近距离
            controls.maxDistance = 12000;
            controls.minDistance = 1000;
            renderer.domElement.addEventListener("dblclick", that.mouseClick);
        },
        light() {
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
            scene.add(ambientLight);
            //创建一个点灯光
            const pointLight = new THREE.PointLight(0xffffff, 0.8);

            //给模型添加灯光
            camera.add(pointLight);
            //把视角放入环境
            scene.add(camera);
        },
        animate() {
            // camera.position.x += 1
            requestAnimationFrame(this.animate);
            renderer.render(scene, camera);
        },
        loadObj() {
            const that = this
            let mtlloader = new MTLLoader();
            let objloader = new OBJLoader();
            let manager = new THREE.LoadingManager();
            manager.addHandler(/\.dds$/i, new DDSLoader());
            mtlloader.load("/model/7/2.mtl", (materials) => {
                objloader.setMaterials(materials);
                materials.preload();
                objloader.load(
                    "/model/7/2.obj",
                    (obj) => {
                        oldChildren = that.dealMeshMaterial(obj.children);
                        obj.traverse((child) => {
                            if (child instanceof THREE.Mesh) {
                                child.material.transparent = true;
                                child.material.reflectivity = 0.9;
                            }
                        });
                        obj.scale.set(0.02, 0.02, 0.02);
                        obj.position.set(0, -7, 0);
                        scene.add(obj);
                    },
                    that.log
                );
            });
        },
        log(xhr) {
            let num = parseInt((xhr.loaded / xhr.total) * 100) - 0;
            console.log(num);
        },
        // 留住每个模型的原材质（后面需要拿到原材质实现需求）
        dealMeshMaterial(arrs) {
            let result = [];
            for (let i = 0; i < arrs.length; i++) {
                let obj = {
                    // name: arrs[i].name,
                    material: arrs[i].material,
                    uuid: arrs[i].uuid,
                };
                result.push(obj);
            }
            return result;
        },
        // 双击高亮效果
        mouseClick(event) {
            console.log(1111);
            this.restore(scene.children[2].children, oldChildren);
            // 获取 raycaster 和所有模型相交的数组，其中的元素按照距离排序，越近的越靠前
            let intersects = this.getIntersects(event, event.clientX, event.clientY);
            // 获取选中最近的 Mesh 对象
            if (
                intersects.length != 0 &&
                intersects[0].object instanceof THREE.Mesh
            ) {
                // selectObject = intersects[0].object;
                // 需要高亮等效果  
                if (isClick) {
                    this.showObject(intersects[0].object, event);
                }
            } else {
                // 关闭所以效果
                this.colseData();
            }
        },
         /**点击事件，高亮的原理是之前先备份一份原材质，在点击之前先还原，最后通过new THREE.材质map 使用原来记录的材质map添加一个高亮颜色就可以了*/
        restore(arrsNew, arrsOld) {
            for (let i = 0; i < arrsNew.length; i++) {
                for (let j = 0; j < arrsOld.length; j++) {
                    if (arrsNew[i].uuid === arrsOld[j].uuid) {
                        arrsNew[i].material = arrsOld[j].material;
                        break;
                    }
                }
            }
        },
        // 关闭高亮与回原
        colseData() {
            isClick = false;
            this.restore(scene.children[2].children, oldChildren);
            if (selectObject) {
                let i = selectObj.position.x;
                let backTime = setInterval(() => {
                    selectObject.position.set(i, 0, 0);
                    i -= 250;
                    if (i < 0) {
                        isClick = true;
                        selectObj = null;
                        selectObject = null;
                        clearInterval(backTime);
                    }
                }, 1);
            }
        },
        // 效果展示
        showObject(obj, event) {
            // selectObject 前面保存得结构数据
            if (selectObject && obj.uuid === selectObject.uuid) {
                let i = selectObj.position.x;
                // 回退前一个结构
                let backTime = setInterval(() => {
                    selectObject.position.set(i, 0, 0);
                    i -= 250;
                    if (i < 0) {
                        this.isClick = true;
                        selectObj = null;
                        selectObject = null;
                        clearInterval(backTime);
                    }
                }, 1);
            } else {
                //   高亮效果与保存当前点击的建模单个数据
                selectObj = obj;
                obj.material = new THREE.MeshPhongMaterial({
                    color: 0xfff,
                    transparent: true,
                    opacity: 0.4,
                });
            }
        },
        // 查看与取消结构
        handleStructure() {
            isClick = false;
            this.restore(scene.children[2].children, oldChildren);
            if (selectObject) {
                let j = selectObject.position.x;
                let backTime = setInterval(() => {
                    selectObject.position.set(j, 0, 0);
                    j -= 250;
                    if (j < 0) {
                        isClick = true;
                        clearInterval(backTime);
                    }
                }, 1);
            }
            let i = 0;
            let timeMove = setInterval(() => {
                selectObj.position.set(i, 0, 0);
                i += 250;
                if (i >= 35000) {
                    selectObject = selectObj;
                    isClick = true;
                    clearInterval(timeMove);
                }
            }, 1);
        },
        // 将屏幕坐标转换为3d 坐标
        getIntersects(event, x, y) {
            let mainCanvas = event.path[0];
            event.preventDefault();
            let raycaster = new THREE.Raycaster();
            let mouse = new THREE.Vector2();
            x =
                ((event.clientX - mainCanvas.getBoundingClientRect().left) /
                    mainCanvas.offsetWidth) *
                2 -
                1;
            y =
                -(
                    (event.clientY - mainCanvas.getBoundingClientRect().top) /
                    mainCanvas.offsetHeight
                ) *
                2 +
                1;
            mouse.set(x, y, 0.05);
            raycaster.setFromCamera(mouse, camera);
            let intersects = raycaster.intersectObjects(scene.children, true);
            return intersects;
        }
    },

};
</script>
<style>
#container {
    width: 100%;
    margin: 0 auto;
    height: 100vh;
}

button {
    width: 100px;
    height: 88px;
    background-color: rgb(70, 79, 163);
}
</style>
