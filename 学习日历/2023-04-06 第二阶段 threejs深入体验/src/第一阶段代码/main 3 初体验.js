import * as THREE from 'three'
console.log(THREE)

//1. 创建场景 文档搜索scene
const scene = new THREE.Scene()

//2. 创建相机  PerspectiveCamera透视相机 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000) //参数：角度 宽高比 近 远 
//摆放相机的位置
camera.position.set(0,0,10) 
//添加相机到场景
scene.add(camera)  

//3. 创建物体
const geometry = new THREE.BoxGeometry(1,1,1) //宽 高 深  
//基础网格材质(MeshBasicMaterial) 一个以简单着色（平面或线框）方式来绘制几何体的材质。这种材质不受光照的影响。
const material = new THREE.MeshBasicMaterial({color:'#ffff00'})
//合成物体
const cube = new THREE.Mesh(geometry,material)
console.log(cube)
//添加到场景
scene.add(cube)


//4. 初始化渲染器
const renderer = new THREE.WebGLRenderer()
//设置渲染的尺寸和大小
renderer.setSize(window.innerWidth,window.innerHeight)
//将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)
//开始渲染
renderer.render(scene,camera)

