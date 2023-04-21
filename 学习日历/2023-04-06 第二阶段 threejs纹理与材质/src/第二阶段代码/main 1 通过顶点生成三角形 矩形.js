import * as THREE from 'three'
console.log(THREE)
import { OrbitControls } from '../assets/js/OrbitControls'

import gsap from 'gsap'


//++目标 通过顶点创建平面   
import * as dat from 'dat.gui'


//1. 创建场景 文档搜索scene
const scene = new THREE.Scene()

//2. 创建相机  PerspectiveCamera透视相机 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000) //参数：角度 宽高比 近 远 
//摆放相机的位置
camera.position.set(10, 10, 10)
//添加相机到场景
scene.add(camera)

//3. 创建物体
// const geometry = new THREE.BoxGeometry(1, 1, 1) //宽 高 深  
// //基础网格材质(MeshBasicMaterial) 一个以简单着色（平面或线框）方式来绘制几何体的材质。这种材质不受光照的影响。
// const material = new THREE.MeshBasicMaterial({ color: '#ffff00' })
// //合成物体
// const cube = new THREE.Mesh(geometry, material)
// console.log(cube)
// //添加到场景
// scene.add(cube)

//创建一个简单的矩形
const geometry = new THREE.BufferGeometry()
//一维坐标系 
const vertices = new Float32Array([ 
    //正面 逆时针 
    -1,-1,1,
    1,-1,1,
    -1,1,1,//构成一个三角形  三个顶点的顺序必须是逆时针  或者顺时针才看得到
    1,1,1, 
    -1,1,1,
    1,-1,1,

    //反面 顺时针
    // -1,-1,1,
    // -1,1,1,
    // 1,-1,1,
   
    // 1,1,1,
    // 1,-1,1,
    // -1,1,1

//     -1.0, -1.0,  1.0,
//     1.0, -1.0,  1.0,
//     1.0,  1.0,  1.0,

//     1.0,  1.0,  1.0,
//    -1.0,  1.0,  1.0,
//    -1.0, -1.0,  1.0
])
//设置材质
const material = new THREE.MeshBasicMaterial({color:"#ffff00"})
//缓存几何体 设置位置属性                  itemSize = 3 因为每个顶点都是一个三元组
geometry.setAttribute('position',new THREE.BufferAttribute(vertices,3))

const cube = new THREE.Mesh(geometry,material)
scene.add(cube)
console.log(cube)



// 初始化用户界面 
const gui = new dat.GUI()
 
let x = 2//旋转的弧度
const params = {color:'#ffff00',fn:()=>{
    console.log('点击了旋转')
    rotate1(x * Math.PI)
    x += 2
}}
gui.addColor(params,'color').onChange(v=>{
    console.log('当前颜色：',v)
    cube.material.color.set(v)
}).onFinishChange(v=>console.log('颜色结束：',v)).name('修改颜色')

//设置按钮点击事件
gui.add(params,'fn').name('点击立方体旋转') 


//控制物体显示隐藏
gui.add(cube,'visible').name('是否显示')

//添加下拉面板
const folder = gui.addFolder('设置立方体位置大小')
folder.add(cube.scale,'x').min(.5).max(5).name('x方向放大')
folder.add(cube.scale,'y').min(.5).max(5).name('y方向放大')
folder.add(cube.scale,'z').min(.5).max(5).step(.01).name('z方向放大')
// folder.add(cube.position,'x').min(-20).max(20).name('x方向移动')
folder.add(cube.position,'y').min(-20).max(20).name('y方向移动').onChange((v)=>console.log('y方向移动的值：',v))
folder.add(cube.position,'z').min(-20).max(20).name('z方向移动').onChange((v)=>console.log('z方向移动的值：',v)).onFinishChange(v=>console.log('z方向移动结束：',v)) 

//+设置线框属性
folder.add(cube.material,'wireframe')
//控制物体移动 cube上面有个position的属性 
// cube.position.set(5,0,0)   //方法
// cube.position.x = 5 //属性


//控制物体缩放 cube上面有个 scale的属性  参数是缩放的倍数  不是长度
// cube.scale.set(2,1,3) //x2倍 y1倍 z3倍
cube.scale.x = 1.1
cube.scale.y = 1.1
cube.scale.z = 1.1

//物体旋转  cube上面有个rotation的属性
// cube.rotation.set(Math.PI/4,0,0,'XYZ')
// cube.rotation.x = Math.PI/4

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
window.addEventListener('resize',()=>{
    //更新摄像头
    camera.aspect = window.innerWidth/window.innerHeight 
    //更新摄像机的投影矩阵
    camera.updateProjectionMatrix()
    //更新渲染器
    renderer.setSize(window.innerWidth,window.innerHeight)
    //设置渲染像素比
    renderer.setPixelRatio(window.devicePixelRatio)
})


//直接使用gsap完成动画效果  官网  docs教程 https://greensock.com/docs/v3/Eases
// gsap.to(cube.position,{x:10,duration:10,ease: "bounce.out"}) 
const rotate1 = (deg=2*Math.PI)=>{
    gsap.to(cube.rotation, { y: deg, duration: 10,delay:0.5, ease: "elastic.out(1, 0.3)",onComplete(){
        
    } } )
}


//动画属性配置 
// gsap.to(cube.position, {
//     x: 10, duration: 10, ease: "bounce.out", 
//     onStart() {
//         console.log('动画开始')
//     },
//     onComplete(e){
//         console.log('动画结束')
//     },
//     repeat:2,//-1表示无限循环 
//     yoyo:true,//往返运动
// })

//可暂停的动画 控制效果
const animate1  = gsap.to(cube.position, {
    x: 10, duration: 3, ease: "bounce.out", 
    onStart() {
        console.log('动画开始')
    },
    onComplete(e){
        console.log('动画结束')
    },
    delay:0.5,//延迟5s执行动画
    repeat:-1,//-1表示无限循环  3
    yoyo:true,//往返运动
})
// document.addEventListener('click',()=>{//单击控制动画启停 
//     console.log(animate1)
//     if(animate1.isActive()){//获取动画的运动状态 
//         animate1.pause()
//     }else{
//         animate1.resume()
//     }
// })




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