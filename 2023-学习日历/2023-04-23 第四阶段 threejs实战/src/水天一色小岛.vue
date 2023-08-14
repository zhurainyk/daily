<template>
  <div class="container" ref="container"></div>
</template>

<script setup>
import { onMounted,ref } from 'vue'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
//导入水面
import {Water} from 'three/examples/jsm/objects/Water2'
//导入gltf载入库
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
//解压模型库
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
//导入RGBELoader 引入hdr模型
import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
//css2d标签
import {CSS2DObject,CSS2DRenderer} from 'three/examples/jsm/renderers/CSS2DRenderer'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
camera.position.set(-50, 50, 200)
camera.aspect = window.innerWidth / window.innerHeight //更新摄像头宽高比
camera.updateProjectionMatrix() //更新摄像头投影矩阵
const renderer = new THREE.WebGLRenderer({
  antialias: true ,//设置抗锯齿
  // alpha:true 
  logarithmicDepthBuffer:true //解决谍影锯齿闪烁重影模型的方法 开启会增加性能消耗
})
renderer.outputEncoding = THREE.sRGBEncoding //输出编码格式 否者颜色不正常
renderer.setSize(window.innerWidth, window.innerHeight)

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
const container = ref(null)

const controle = new OrbitControls(camera,renderer.domElement)
controle.enableDamping = true
function render(){
  renderer.render(scene,camera)
  controle.update()
  requestAnimationFrame(render)
}

// const planeGeometry = new THREE.PlaneGeometry(100,100)
// const planeMaterial = new THREE.MeshBasicMaterial({color:'#fff'})
// const plane = new THREE.Mesh(planeGeometry,planeMaterial)
// plane.material.side = THREE.DoubleSide
// scene.add(plane)
/**
 * 1.初始化场景  
 * 2.创建巨大天空球 设置视频纹理
 * 3.创建球形水面 
 * 3.1需要 实例化Water 
 * 3.2设置水面实例属性 纹理 旋转水平
 * 4. 导入小岛 引入gltf  draco
 */

//创建一个天空球
const texture = new THREE.TextureLoader().load('assets/textures/sky.jpg')
const skyGeometry = new THREE.SphereGeometry(1000,60,60)
const skyMaterial = new THREE.MeshBasicMaterial({map:texture  })
const sky = new THREE.Mesh(skyGeometry,skyMaterial)
sky.geometry.scale(1,1,-1)
scene.add(sky)

// scene.background =texture
// scene.environment = texture

//创建视频纹理替换图片
const video = document.createElement('video')
video.src = 'assets/textures/sky.mp4'
video.loop = true 
window.addEventListener('click',()=>{
  if(video.paused){
    video.play()
    skyMaterial.map = new THREE.VideoTexture(video) //替换原有的图片 为视频纹理
    skyMaterial.map.needsUpdate = true 
  }
})

//创建水面
const waterGeometry = new THREE.CircleBufferGeometry(300,32) //
const water = new Water(waterGeometry,{
  textureWidth:1024,//水面大小
  textureHeight:1024,
  color:0xeeeeff,//水面颜色
  flowDirection:new THREE.Vector2(1,1) ,//流向
  // scale:1,//水波纹大小
  normalMap0:new THREE.TextureLoader().load('./assets/textures/water/Water_1_M_Normal.jpg'),
  normalMap1:new THREE.TextureLoader().load('./assets/textures/water/Water_2_M_Normal.jpg'), 
}) 
water.rotation.x =  -Math.PI/2//旋转水平面
water.position.y = 2 //水面淹过石头
scene.add(water)


//添加小岛模型
//实例化gltf载入库
const loader = new GLTFLoader()
// //实例化draco载入库
const dracoLoader = new DRACOLoader()
// //添加draco载入库地址
dracoLoader.setDecoderPath('./assets/draco/')
// //添加draco载入库 
loader.setDRACOLoader(dracoLoader)
// //导入小岛模型
loader.load('./assets/model/island2.glb',gltf=>{
   //如果出现资源路径404 可查看f12 根据缺少的资源 在相应的位置补充资源即可解决（比如这里报错404缺少了一份model 复制了一份model到public下面 ）
  scene.add(gltf.scene)
  console.log(gltf)
})

//载入环境纹理
const hdrLoader = new RGBELoader()
hdrLoader.loadAsync('./assets/050.hdr').then(texture=>{
  texture.mapping = THREE.EquirectangularRefractionMapping;//纹理模式 是一个球 漫反射 THREE.EquirectangularRefractionMapping  EquirectangularReflectionMapping
  scene.background = texture
  scene.environment = texture //小岛闪烁的原因 是因为threejs不知道渲染哪一个 所以需要设置logarithmicDepthBuffer：true
})

//添加平行光
const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(-200,100,10)
scene.add(light)
const ambientLight = new THREE.AmbientLight(0xffffff,.3)
scene.add(ambientLight)


//添加环境标签
const addLabel = ()=>{
  const div = document.createElement('div')
  div.style.width = '200px'
  div.style.height = '50px'
  div.style.background = 'pink'
  div.className = 'label'
  div.textContent = '人工3d小岛'
  // div.style.marginTop = '-1em'
  const _div = new CSS2DObject(div)
  _div.position.set(5,5,5)
  scene.add(_div)
  

  // const cssRender = new CSS2DRenderer(  )
  // cssRender.setSize(10,10)
  //   cssRender.domElement.style.position = 'absolute';
  //   cssRender.domElement.style.top = '0'
  //   document.body.appendChild(cssRender)
}
onMounted(() => {
  container.value.appendChild(renderer.domElement)
  render()
  addLabel()
})

</script>

<style> * {
   margin: 0;
   padding: 0;
 }

 .container {
   width: 100vw;
   height: 100vh;
 }
</style>
