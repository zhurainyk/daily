<template >
    <div class="vr" ref="vr">

    </div>
</template>
<script setup>
//海滩 球映射
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { labelRenderer as labelRenderer2D, tag as tag2D } from "./js/tag2D";
import { labelRenderer as labelRenderer3D, tag3D, tag3DSprite } from "./js/tag3D";
 
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 30
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true   
const render = () => {
    renderer.render(scene, camera)
    controles.update()
    requestAnimationFrame(render)
    labelRenderer2D(vr.value).render(scene, camera) //传入dom  渲染2d文字标签 
    labelRenderer3D(vr.value).render(scene, camera)//传入dom  渲染3d文字标签 
}

 
//添加球  
//导入hdr
const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync('assets/hdr/beach.hdr').then(texture => {
    texture.mapping = THREE.EquirectangularReflectionMapping //环境支持旋转 配置1
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 32, 32),
        new THREE.MeshStandardMaterial({
            map: texture, 
            roughness:.1,
            metalness:.8
        })
    ) 
    sphere.castShadow = true 
    scene.add(sphere) 
    scene.background = texture //环境支持旋转 配置2
    scene.environment = texture //环境支持旋转 配置3
    scene.receiveShadow = true 
})

const vr = ref(null)
let controles

//添加光
const directiveLight = new THREE.DirectionalLight(0xffffff,1)
directiveLight.castShadow = true
directiveLight.position.set(20,20,20)
scene.add(directiveLight)


//添加模型盒子
const boxGeometry = new THREE.BoxGeometry(2,2,2)
const boxMaterial = new THREE.MeshBasicMaterial({color:'pink'})
const box = new THREE.Mesh(boxGeometry,boxMaterial)
box.position.set(-8,3,-3) // new THREE.Vector3(-8,3,-3)
scene.add(box) 

// 添加CSS 2DObject标签 永远正对当前相机视角。尺寸不会受远近影响；
var label2D = tag2D("CSS 2DObject 标签");//设置标签名称  
        // var pos1 = new THREE.Vector3();
        // box.getWorldPosition(pos1);//获取obj世界坐标、
        // pos1.y += 6;
        // label2D.position.copy(pos1);//标签标注在obj世界坐标
        console.log(label2D)
        label2D.position.set(-12,3,3)
        scene.add(label2D);//标签插入场景 
 
// 添加CSS 3DObject标签   标签朝向固定，不会随视角变化而改变 大小也会受远近影响，远小近大。
var label3D = tag3D("CSS 3DObject 标签");//设置标签名称
label3D.position.set(15,3,3)
scene.add(label3D)

 // 添加CSS 3DSprite标签 永远正对当前相机视角 远小近大
 var label3DSprite = tag3DSprite("CSS 3DSprite 标签");//设置标签名称
 label3DSprite.position.set(15,10,3)
scene.add(label3DSprite)

onMounted(() => {

    vr.value.appendChild(renderer.domElement)
    controles = new OrbitControls(camera, vr.value)
    controles.enableDamping = true
    render()
})
</script>

<style> .vr {
     width: 100%;
     height: 100%;
 }
</style>