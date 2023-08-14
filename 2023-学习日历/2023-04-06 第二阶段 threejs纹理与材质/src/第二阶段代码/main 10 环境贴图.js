import * as THREE from 'three'
console.log(THREE)
import { OrbitControls } from '../assets/js/OrbitControls'

import gsap from 'gsap'


//++目标   环境贴图 （把环境的贴图贴到球上 就是环境贴图）

// import * as dat from 'dat.gui'


//1. 创建场景 文档搜索scene
const scene = new THREE.Scene()

//2. 创建相机  PerspectiveCamera透视相机 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000) //参数：角度 宽高比 近 远 
//摆放相机的位置
camera.position.set(50, 20, 20)
//添加相机到场景
scene.add(camera)

//++ cube 纹理加载器
const CubeTextureLoader = new THREE.CubeTextureLoader()
const envMapTexture = CubeTextureLoader.load([
    'Bridge2/posx.jpg',
    'Bridge2/negx.jpg',
    'Bridge2/posy.jpg',
    'Bridge2/negy.jpg',
    'Bridge2/posz.jpg',
    'Bridge2/negz.jpg',
])
//++设置背景
scene.background = envMapTexture
  
const SphereGeometry = new THREE.SphereGeometry(10,20,20)
const SphereMaterial = new THREE.MeshStandardMaterial({
    envMap:envMapTexture, //++映射周围的环境贴图 
    metalness:0.8,
    roughness:0.1 
})
const Sphere = new THREE.Mesh(SphereGeometry,SphereMaterial)
scene.add(Sphere)




//灯光
//环境光 强度
const light = new THREE.AmbientLight(0xffffff, 1)
scene.add(light)

//平行光
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(0, 0, 20)
// scene.add(directionalLight)




//创建坐标轴
const axesHelper = new THREE.AxesHelper(1) //红色x  绿色y  蓝色z
//坐标轴添加到场景
scene.add(axesHelper)

//4. 初始化渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true }) //添加抗锯齿
//设置渲染的尺寸和大小
renderer.setSize(window.innerWidth, window.innerHeight)
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