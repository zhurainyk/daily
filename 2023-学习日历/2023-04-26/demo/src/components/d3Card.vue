<template >
    <div class="demo" ref="demo">

    </div>
</template>
<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(-3.23, 2.98, 4.06) //设置指定的位置
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

const render = () => {
    renderer.render(scene, camera)
    controles.update()
    requestAnimationFrame(render)
}

// const cubeGeometry = new THREE.BoxGeometry(1,1,1)
// const cubeMaterial = new THREE.MeshBasicMaterial()
// const cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
// scene.add(cube)


const demo = ref(null)
let controles
onMounted(() => {
    demo.value.appendChild(renderer.domElement)
    controles = new OrbitControls(camera, demo.value)
    controles.enableDamping = true
    render()
})


//初始化loader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('assets/draco/')
gltfLoader.setDRACOLoader(dracoLoader)

//加载场景模型
gltfLoader.load('assets/model/scene.glb', gltf => {
    const model = gltf.scene
    model.traverse(child => {
        console.log(child.name)
        if (child.name === 'Plane') {
            child.visible = false  //隐藏平面
        }
        //开启阴影
        if (child.isMesh) {
            child.castShadow = true //开启阴影2
            child.receiveShadow = true //开启阴影3
        }
    })
    scene.add(gltf.scene)
})

//加载环境纹理
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
const rgbeLoader = new RGBELoader()
rgbeLoader.load('assets/textures/sky.hdr', texture => {
    texture.mapping = THREE.EquirectangularRefractionMapping //环境旋转 映射
    scene.background = texture
    scene.environment = texture
})

//设置色条映射
renderer.toneMapping = THREE.ACESFilmicToneMapping // 色调映射参数 使用算法将HDR值转换为LDR值，使其介于0到1之间， 0 <---> 1
// 渲染器将允许多少光线进入
renderer.toneMappingExposure = 0.5 //默认是1  越大环境越亮 映射的是hdr中的颜色值亮度

renderer.outputEncoding = THREE.sRGBEncoding  //告诉渲染器将片段着色器中的最终颜色值从线性转换为 sRGB 颜色空间

renderer.shadowMap.enabled = true  //开启阴影1

renderer.physicallyCorrectLights = true //添加物理光照
//添加水面
import { Water } from 'three/examples/jsm/objects/Water2'
const waterGeometry = new THREE.CircleGeometry(300, 32)
const water = new Water(waterGeometry, {
    textureWidth: 1024,
    textureHeight: 1024,
    color: 0xeeeeff,
    flowDirection: new THREE.Vector2(1, 1),
    scale: 100,
    normalMap0: new THREE.TextureLoader().load('assets/textures/water/Water_1_M_Normal.jpg'),//必须手动导入才不会报错
    normalMap1: new THREE.TextureLoader().load('assets/textures/water/Water_2_M_Normal.jpg'),

})
water.rotation.x = -Math.PI / 2
water.position.y = -.4;
scene.add(water)

//添加光照

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 50, 0)
scene.add(directionalLight)

//添加点光源
// const pointLight  = new THREE.PointLight(0xffffff,10)
// pointLight.position.set(0.5,2.4,0)
// pointLight.castShadow = true //开启阴影4
// scene.add(pointLight)

//添加点光源组
const pointLightGroup = new THREE.Group()
let radius = 3;
let pointLightArr = []
for (let i = 0; i < 3; i++) {
    //创建球体当点光源的载体
    const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffff,
        emissiveIntensity: 10,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    pointLightArr.push(sphere);
    sphere.position.set(
        radius * Math.cos((i * 2 * Math.PI) / 3) - 10,
        Math.cos((i * 2 * Math.PI) / 3) + 3,
        radius * Math.sin((i * 2 * Math.PI) / 3)
    );

    let pointLight = new THREE.PointLight(0xffffff, 50);
    sphere.add(pointLight);
    pointLightGroup.add(sphere);

}
scene.add(pointLightGroup)


//补间动画 从0到2π 灯泡转圈
import gsap from 'gsap'
let options = {
    angle: 0
}
gsap.to(options, {
    angle: Math.PI * 2,
    duration: 10,
    repeat: -1,
    ease: 'linear',
    onUpdate: () => {
        pointLightGroup.rotation.y = options.angle;
        pointLightArr.forEach((item, index) => {
            item.position.set(radius * Math.cos((index * 2 * Math.PI) / 3),
                Math.cos((index * 2 * Math.PI) / 3 + options.angle * 5),
                radius * Math.sin((index * 2 * Math.PI) / 3)
            )
        })
    }
})
// 使用补间动画移动相机
let timeLine1 = gsap.timeline();
let timeline2 = gsap.timeline();
// 定义相机移动函数
function translateCamera(position, target) {
    timeLine1.to(camera.position, {
        x: position.x,
        y: position.y,
        z: position.z,
        duration: 1,
        ease: "power2.inOut",
    });

    timeline2.to(controles.target, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration: 1,
        ease: "power2.inOut",
    });
}

let scenes = [
    {
        text: "圣诞快乐",
        callback: () => {
            // 执行函数切换位置
            translateCamera(
                new THREE.Vector3(-3.23, 3, 4.06),
                new THREE.Vector3(-8, 2, 0)
            );
        },
    },
    {
        text: "感谢在这么大的世界里遇见了你",
        callback: () => {
            // 执行函数切
            translateCamera(new THREE.Vector3(7, 0, 23), new THREE.Vector3(0, 0, 0));
        },
    },
    {
        text: "愿与你探寻世界的每一个角落",
        callback: () => {
            // 执行函数切
            translateCamera(new THREE.Vector3(10, 3, 0), new THREE.Vector3(5, 2, 0));
        },
    },
    {
        text: "愿将天上的星星送给你",
        callback: () => {
            // 执行函数切
            translateCamera(new THREE.Vector3(7, 0, 23), new THREE.Vector3(0, 0, 0));
            //   makeHeart();
        },
    },
    {
        text: "愿疫情结束，大家健康快乐！",
        callback: () => {
            // 执行函数切
            translateCamera(
                new THREE.Vector3(-20, 1.3, 6.6),
                new THREE.Vector3(5, 2, 0)
            );
        },
    },
];

let index = ref(0);
let isAnimate = false;
// 监听鼠标滚轮事件
// window.addEventListener(
//     "wheel",
//     (e) => {
//         if (isAnimate) return;
//         isAnimate = true;
//         if (e.deltaY > 0) {
//             index.value++;
//             if (index.value > scenes.length - 1) {
//                 index.value = 0;
//                 // restoreHeart();
//             }
//         }
//         scenes[index.value].callback();
//         setTimeout(() => {
//             isAnimate = false;
//         }, 1000);
//     },
//     false
// );

const autoRun = () => {
    index.value++;
    if (index.value > scenes.length - 1) {
        index.value = 0;
        // restoreHeart();
    }
    scenes[index.value].callback();
    setTimeout(()=>{
        autoRun()
    },1500) 
}
setTimeout(()=>autoRun())
</script>

<style> .demo {
     width: 100%;
     height: 100%;
 }
</style>