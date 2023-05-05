<template >
    <div class="demo" ref="demo">
      
    </div>
</template>
<script setup>
import * as THREE from 'three'
import {ref,onMounted} from 'vue'
import  {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.set(0,1.5,6)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)

const render = ()=>{
    renderer.render(scene,camera)
    controles.update()
    requestAnimationFrame(render)
}

// const cubeGeometry = new THREE.BoxGeometry(1,1,1)
// const cubeMaterial = new THREE.MeshBasicMaterial()
// const cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
// scene.add(cube)

const axes  = new THREE.AxesHelper(3)
scene.add(axes)

//添加环境纹理
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./assets/hdr/sky12.hdr',texture=>{
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment  = texture
})

//导入机器人模型
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('assets/draco/')
dracoLoader.setDecoderConfig({type:'js'})
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.load('assets/model/robot.glb',gltf=>{
    scene.add(gltf.scene)
})

//添加 光
const light1 = new THREE.DirectionalLight(0xffffff,1)
light1.position.set(10,10,10)
scene.add(light1)

const light2 = new THREE.DirectionalLight(0xffffff,1)
light2.position.set(0,10,0)
scene.add(light2)


const light3 = new THREE.DirectionalLight(0xffffff,1)
light3.position.set(0,10,10)
scene.add(light3)


const light4 = new THREE.DirectionalLight(0xffffff,1)
light4.position.set(0,10,-10)
scene.add(light4)


//导入光阵纹理
const video = document.createElement('video')
video.src = './assets/video/zp2.mp4'
video.muted = true 
video.loop = true 
video.play()
const videoTexture = new THREE.VideoTexture(video)
const videoGeometry = new THREE.PlaneBufferGeometry(8,4.5)
const videoMaterial = new THREE.MeshBasicMaterial({
    map:videoTexture,
    side:THREE.DoubleSide,
    transparent:true,
    alphaMap:videoTexture,//透明纹理光阵
})
const videoPlane = new THREE.Mesh(videoGeometry,videoMaterial)
videoPlane.geometry.rotateX(-Math.PI/2)
videoPlane.position.y = .2
scene.add(videoPlane)


//设置镜面
import {Reflector} from 'three/examples/jsm/objects/Reflector' 
const reflactorGeometry = new THREE.PlaneBufferGeometry(100,100)
const reflactorPlane = new Reflector(reflactorGeometry,{
    textureWidth:window.innerWidth,
    textureHeight:window.innerHeight,
    color:0xff00ff
})
reflactorPlane.rotation.x = -Math.PI/2
scene.add(reflactorPlane)


const demo = ref(null)
let controles 
onMounted(()=>{
    demo.value.appendChild(renderer.domElement)
    controles = new OrbitControls(camera,demo.value)
    controles.enableDamping = true 
    render()
})
</script>

<style> 
.demo{
    width:100%;
    height:100%;
}
</style>