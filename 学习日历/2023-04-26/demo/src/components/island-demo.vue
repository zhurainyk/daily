<template >
    <div class="demo" ref="demo">

    </div>
</template>
<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000)
camera.position.set(1000,1000,1000) //原始位置(-50, 50, 200)   初始化位置(1000,1000,1000)
scene.add(camera)
const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true }) //解决谍影锯齿闪烁重影模型的方法 开启会增加性能消耗
renderer.setSize(window.innerWidth, window.innerHeight)
const render = () => {
    renderer.render(scene, camera)
    controles.update()
    requestAnimationFrame(render)
}
const demo = ref(null)
let controles
onMounted(() => {
    demo.value.appendChild(renderer.domElement)
    controles = new OrbitControls(camera, demo.value)
    controles.enableDamping = true
    render()
})

//2.创建巨大天空球 为天空添加视频纹理
const skyTexture = new THREE.TextureLoader().load('assets/textures/sky.jpg')
const skyGeo = new THREE.SphereGeometry(1200, 60, 60)
const skyMaterial = new THREE.MeshBasicMaterial({
    map: skyTexture
})
const sky = new THREE.Mesh(skyGeo, skyMaterial)
sky.geometry.scale(1, 1, -1)
scene.add(sky)

const video = document.createElement('video')
video.src = 'assets/textures/sky.mp4'
video.loop = true
window.addEventListener('click', () => {
    if (video.paused) {
        video.play()
        skyMaterial.map = new THREE.VideoTexture(video) //替换原有的图片 为视频纹理
        skyMaterial.map.needsUpdate = true
    }
})


//3创建水面
import { Water } from 'three/examples/jsm/objects/Water2'
const waterGeometry = new THREE.CircleBufferGeometry(300, 32)
const water = new Water(waterGeometry, {
    textureWidth: 1024,//水面大小
    textureHeight: 1024,
    color: 0xeeeeff,//水面颜色
    flowDirection: new THREE.Vector2(1, 1),//流向
    // scale:1,//水波纹大小
    normalMap0: new THREE.TextureLoader().load('assets/textures/water/Water_1_M_Normal.jpg'),
    normalMap1: new THREE.TextureLoader().load('assets/textures/water/Water_2_M_Normal.jpg'),
})
water.rotation.x = -Math.PI / 2
water.position.y = 2 //水面淹过石头
scene.add(water)


//4 引入小岛模型 引入小岛模型的时候 threejs 高本版151会报错  THREE.DRACOLoader: Unexpected geometry type 回退到137版本即可正常加载模型
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('assets/draco/')
gltfLoader.setDRACOLoader(dracoLoader)
gltfLoader.loadAsync('assets/model/island2.glb').then(gltf => {
    scene.add(gltf.scene)
    setTimeout(()=>{
        translateCamera(new THREE.Vector3(-50, 50, 200) )
  
    },500)
})
// gltfLoader.load('./assets/model/island2.glb',gltf=>{
//     scene.add(gltf.scene) //也支持
// })
//5 导入环境纹理
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
const rgbeLoader = new RGBELoader()
rgbeLoader.load('assets/hdr/050.hdr', texture => {
    texture.mapping = THREE.EquirectangularRefractionMapping;//纹理模式 是一个球 漫反射 THREE.EquirectangularRefractionMapping  EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture //小岛闪烁的原因 是因为threejs不知道渲染哪一个 所以需要设置logarithmicDepthBuffer：true
})

//6 添加平行光
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(-100, 100, 10)
scene.add(light)
const ambientLight = new THREE.AmbientLight(0xffffff, .5)
scene.add(ambientLight)

window.addEventListener('resize',()=>{
    camera.aspect = window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
})


//添加 补间动画 
import gsap from 'gsap'
const timeline1 = gsap.timeline()
const timeline2 = gsap.timeline()
const translateCamera = (position,target)=>{
    timeline1.to(camera.position,{
        x:position.x,
        y:position.y,
        z:position.z ,
        duration:2,
        ease:'power2.inOut'
    })
    // timeline2.to(controles.target,{
    //     x:target.x,
    //     y:target.y,
    //     z:target.z ,
    //     duration:2,
    //     ease:'power2.inOut'
    // })
}






</script>

<style> .demo {
     width: 100%;
     height: 100%;
 }
</style>