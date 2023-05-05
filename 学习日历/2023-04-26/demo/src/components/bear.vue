<template >
    <div class="demo" ref="demo">

    </div>
</template>
<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import * as dat from 'dat.gui'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(1.5, 1, 1.5)
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

//1. 添加背景纹理
const loader = new THREE.TextureLoader()
const bgTexture = loader.load('assets/images/050.jpg');
bgTexture.mapping = THREE.EquirectangularReflectionMapping //环境纹理可旋转 折射和漫反射
scene.background = bgTexture
scene.environment = bgTexture

//2. 添加小熊模型
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
const gltfLoader = new GLTFLoader()
let model
gltfLoader.load('assets/model/bear.gltf', gltf => {
    console.log(gltf)
    const params = {
        color:0xffffff
    }
    model = gltf.scene.children[0]
    model.material = new THREE.MeshPhongMaterial({ //光亮的材质
        color: params.color, //便于使用gui修改
        envMap: bgTexture,
        // refractionRatio:0.7,//折射率
        reflectivity: 0.99,

    })
    scene.add(model)
    // gui.add(model.material,'refractionRatio').min(0).max(1).step(0.01)
    gui.add(model.material, 'reflectivity').min(0).max(1).step(0.01)
   
    gui.addColor(params,'color').name('color').onChange(()=>{
        model.material.color.set(params.color)
    })
})

//添加光照
const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
scene.add(ambientLight)


//添加控制ui
const gui = new dat.GUI()

</script>

<style> .demo {
     width: 100%;
     height: 100%;
 }
</style>