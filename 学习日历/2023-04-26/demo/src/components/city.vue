<template >
    <div class="demo" ref="demo">

    </div>
</template>
<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 6, 27)
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
const gltfLoader = new GLTFLoader()
gltfLoader.load('./assets/model/officeRoom.gltf',gltf=>{
    console.log(gltf)
    const model = gltf.scene
    model.scale.set(0.05,0.05,0.05)
    model.position.set(-5,0.5,20)
    scene.add(model)
})
gltfLoader.load('./assets/model/officeRoom2.gltf',gltf=>{
    console.log(gltf)
    const model = gltf.scene 
    model.scale.set(0.05,0.05,0.05)
    model.position.set(4,0.75,22)
    
    scene.add(model)
})

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('assets/draco/')
const gltfLoader2 = new GLTFLoader()
gltfLoader2.setDRACOLoader(dracoLoader)
const textureLoader = new THREE.TextureLoader()
const hillTexture = textureLoader.load('assets/textures/hilltextures/gltf_embedded_0.jpeg')
const aoTexture = textureLoader.load('assets/textures/hilltextures/internal_ground_ao_texture.jpeg')
const normalTexture = textureLoader.load('assets/textures/hilltextures/gltf_embedded_1.jpeg')
gltfLoader2.load('assets/model/hill.glb', gltf => {
    const model = gltf.scene.children[0]
    model.scale.set(0.01, 0.01, 0.01)
    model.rotation.y = Math.PI
    model.position.y = -3
    scene.add(model)
})

// { //添加平面
//     const planeGeomatry = new THREE.PlaneGeometry(20, 20)
//     const planeMaterial = new THREE.MeshStandardMaterial({
//         map: hillTexture,
//     })
//     const plane = new THREE.Mesh(planeGeomatry, planeMaterial)
//     plane.rotation.x = -Math.PI / 2 //旋转90度 不是180
//     scene.add(plane)
// }

const gridHelper = new THREE.GridHelper(120, 120)
// gridHelper.material.opacity = 0.9
// gridHelper.material.transparent = true  //透明度
// gridHelper.position.y = -2
scene.add(gridHelper)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const axer = new THREE.AxesHelper(120, 120, 120)
scene.add(axer)
</script>

<style> .demo {
     width: 100%;
     height: 100%;
 }
</style>