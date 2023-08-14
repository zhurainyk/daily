import * as THREE from 'three'
console.log(THREE)
import { OrbitControls } from './assets/js/OrbitControls'

import gsap from 'gsap'

//++目标   聚光灯 
/**
 * 灯光阴影产生的条件步骤
 * 1. 材质要满足对光照有反应
 * 2. 设置渲染器开启阴影的计算 renderer.shadowMap.enabled = true 
 * 3. 设置光照投射阴影 directionalLight.castShadow = true 
 * 4. 设置物体投射阴影 sphere.castShadow = true
 * 5. 设置物体接收阴影 plane.receiveShadow = true
 */

import * as dat from 'dat.gui' //引入ui控制器
 

//1. 创建场景 文档搜索scene
const scene = new THREE.Scene()

//2. 创建相机  PerspectiveCamera透视相机 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000) //参数：角度 宽高比 近 远 
 
//摆放相机的位置
camera.position.set(0, 10, 10)
//添加相机到场景
scene.add(camera)



// const textureLoader = new THREE.TextureLoader()
// const imgTexture = textureLoader.load('hdr/赛博朋克2077.webp')
// imgTexture.mapping = THREE.EquirectangularReflectionMapping
// scene.background = imgTexture
//  scene.environment = imgTexture

 //基础球
const sphereGeometry = new THREE.SphereGeometry(1,20,20)
const sphereMaterial = new THREE.MeshStandardMaterial( )
const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
// sphere.position.y = 0
sphere.castShadow = true //物体开启投射阴影
scene.add(sphere)

//创建平面
const planeGeometry = new THREE.PlaneGeometry(50,50) 
const planeMaterial = new THREE.MeshStandardMaterial({color:'#ccc'})
planeMaterial.side = THREE.DoubleSide
const plane = new THREE.Mesh(planeGeometry,planeMaterial)
plane.rotation.x = -Math.PI/2
plane.position.y = -1
plane.receiveShadow = true 
scene.add(plane)

//灯光
//环境光 强度
const light = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(light)

//平行光
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
// directionalLight.position.set(10, 10,  10)
// directionalLight.castShadow = true//平行光开启阴影
// directionalLight.shadow.radius = 20 // 阴影贴图模糊度
// directionalLight.shadow.mapSize.set(2048,2048) // 设置阴影贴图的分辨率  必须是2的n次方
// //设置平行光投射相机的属性
// //平行光投射生效范围
// directionalLight.shadow.camera.near = 18.2
// directionalLight.shadow.camera.far = 500
// directionalLight.shadow.camera.top = 5
// directionalLight.shadow.camera.bottom = -5
// directionalLight.shadow.camera.left = -5
// directionalLight.shadow.camera.right = 5
// scene.add(directionalLight) 

//++ 聚光灯 产生的阴影较大 是发散型效果
const spotLight = new THREE.SpotLight(0xffffff,.5)
spotLight.position.set(5,5,5)
spotLight.castShadow  = true
spotLight.shadow.radius = 20 //阴影贴图模糊度 
spotLight.shadow.mapSize.set(4096,4096) //阴影分辨率

//++设置聚光灯投射目标   灯光跟随效果
spotLight.target = sphere //跟随基础球
spotLight.angle = Math.PI/6 //++聚光灯范围 不超过90°  默认60°
spotLight.decay = 0 //衰减
spotLight.penumbra = 1 //虚化边缘
spotLight.distance = 5 
scene.add(spotLight) 


// 初始化用户界面 
//改变阴影大小
const gui = new dat.GUI()
// gui
//   .add(directionalLight.shadow.camera, "near")
//   .min(16)
//   .max(19)
//   .step(0.1)
//   .onChange(() => {
//     directionalLight.shadow.camera.updateProjectionMatrix();
//   });
//++ 调节球的位置 阴影跟随
gui 
  .add(sphere.position, "x")
  .min(-25)
  .max(25)
  .step(0.1) 

  //++聚光灯范围大小
  gui 
  .add(spotLight, "angle")
  .min(0)
  .max(Math.PI/2)
  .step(0.01) 

  gui 
  .add(spotLight, "decay")
  .min(0)
  .max(1)
  .step(0.001) 

  gui 
  .add(spotLight, "distance")
  .min(0)
  .max(5)
  .step(0.01) 


//创建坐标轴
const axesHelper = new THREE.AxesHelper(30) //红色x  绿色y  蓝色z
//坐标轴添加到场景
scene.add(axesHelper)

//4. 初始化渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true }) //添加抗锯齿
//设置渲染的尺寸和大小
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true //开启投影渲染
renderer.physicallCorrectLights = true  //开启物理渲染
//将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)
//开始渲染
// renderer.render(scene,camera)

//创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
//开启阻尼动画  必须要在 you must call .update () in your animation loop.
controls.enableDamping = true

//自适应全屏 
window.addEventListener('resize', () => {
    //更新摄像头
    camera.aspect = window.innerWidth / window.innerHeight
    //更新摄像机的投影矩阵
    camera.updateProjectionMatrix()
    //更新渲染器
    renderer.setSize(window.innerWidth, window.innerHeight)
 
    //设置渲染像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})





//改写开始渲染函数

function render(time) {

    controls.update()//开启阻尼动画的关键 
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

render()

//步骤总结：
/**
 * 1.创建场景
 * 2.创建相机 添加到场景
 * 3.创建物体 添加到场景
 * 4.创建渲染器 设置传染尺寸 添加到html 并且执行渲染
 * 
 * 创建轨道控制器 需要动画帧渲染  
 * 
 * 创建坐标辅助器  添加到场景
 * 
 * 移动 旋转 缩放 
 */