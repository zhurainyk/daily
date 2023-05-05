import * as THREE from 'three'
console.log(THREE)
import { OrbitControls } from '../assets/js/OrbitControls'

import gsap from 'gsap'


//++目标 了解常用网格几何体 材质 纹理 纹理旋转 偏移 重复
// import * as dat from 'dat.gui'


//1. 创建场景 文档搜索scene
const scene = new THREE.Scene()

//2. 创建相机  PerspectiveCamera透视相机 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000) //参数：角度 宽高比 近 远 
//摆放相机的位置
camera.position.set(20, 20, 20)
//添加相机到场景
scene.add(camera)


//添加正方体
const cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
const basicMaterial = new THREE.MeshBasicMaterial({ color: '#ff00ff' })
const cube = new THREE.Mesh(cubeGeometry, basicMaterial)
// scene.add(cube)
//添加圆形
const circleGeometry = new THREE.CircleGeometry(5, 6, 0, Math.PI)//半径 分段 起始角度 西塔 
const circleMaterial = new THREE.MeshBasicMaterial({ color: '#ffff00' })
const circle = new THREE.Mesh(circleGeometry, circleMaterial)
circle.position.set(-5, -5, -5)
// scene.add(circle)

//圆锥体
const coneGeometry = new THREE.ConeGeometry(5, 10, 15) //半径 高度  侧面分段 高度分段 是否封顶 起始角度 西塔 
const coneMaterial = new THREE.MeshBasicMaterial({ color: '#ff0000' })
const cone = new THREE.Mesh(coneGeometry, coneMaterial)
cone.position.set(-5, -10, 10)
// scene.add(cone)

//圆柱体
const cylinderGeometry = new THREE.CylinderGeometry(5, 5, 20, 32);
const cylinderMaterial = new THREE.MeshBasicMaterial({ color: 'skyblue' })
const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial)
cylinder.position.set(-10, -12, -13)
// scene.add(cylinder)

//多面体
const doceBoxGeometry = new THREE.DodecahedronGeometry(1) //半径  顶点数（越多就像个球）
const doceBoxMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' })
const doceBox = new THREE.Mesh(doceBoxGeometry, doceBoxMaterial)
doceBox.position.set(-8, -6, -3)
// scene.add(doceBox)

//球
const ballGeometry = new THREE.SphereGeometry(6, 32, 16)
const ballMaterial = new THREE.MeshBasicMaterial({ color: 'purple' })
const ball = new THREE.Mesh(ballGeometry, ballMaterial)
ball.position.set(-22, -16, -23)
// scene.add(ball)

//引入3d字体 还没有实现
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
//导入纹理
const textLoader = new THREE.TextureLoader()
import door from './assets/images/door.jpg' //先引入 才能使用load加载
const doorColorTexture = textLoader.load(door)
//doorColorTexture纹理偏移
// doorColorTexture.offset.x = 1
// doorColorTexture.offset.y = 1
// doorColorTexture.offset.set(2.5,2.5)
//纹理旋转中心点
doorColorTexture.center.set(0.5,0.5)
// doorColorTexture.rotation = Math.PI/4//旋转45‘
//纹理重复
// doorColorTexture.repeat.set(1,1)
//纹理重复的模式
doorColorTexture.wrapS = THREE.RepeatWrapping
doorColorTexture.wrapT = THREE.MirroredRepeatWrapping

//
const cubeGeometry2 = new THREE.BoxBufferGeometry(5,5,5)
//纹理材质 map
const cubeMaterial = new THREE.MeshBasicMaterial({color:"pink",map:doorColorTexture })
const cube2 = new THREE.Mesh(cubeGeometry2,cubeMaterial)
// cube2.position.set(-30,-8,-15)
console.log(cube2,doorColorTexture)
scene.add(cube2)




//创建坐标轴
const axesHelper = new THREE.AxesHelper(6) //红色x  绿色y  蓝色z
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