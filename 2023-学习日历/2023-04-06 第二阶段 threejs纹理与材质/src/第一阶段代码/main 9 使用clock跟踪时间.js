import * as THREE from 'three'
console.log(THREE)
import {OrbitControls} from './assets/js/OrbitControls'

//目标 使用clock对象跟踪时间


//1. 创建场景 文档搜索scene
const scene = new THREE.Scene()

//2. 创建相机  PerspectiveCamera透视相机 这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000) //参数：角度 宽高比 近 远 
//摆放相机的位置
camera.position.set(10,10,10) 
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
const axesHelper  = new THREE.AxesHelper(6) //红色x  绿色y  蓝色z
//坐标轴添加到场景
scene.add(axesHelper)

//4. 初始化渲染器
const renderer = new THREE.WebGLRenderer({antialias:true}) //添加抗锯齿
//设置渲染的尺寸和大小
renderer.setSize(window.innerWidth,window.innerHeight)
//将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)
//开始渲染
// renderer.render(scene,camera)

//创建轨道控制器
const controls  = new OrbitControls(camera,renderer.domElement)

//设置时钟
const clock = new THREE.Clock()


//改写开始渲染函数


function render(/* time */){
    //动态移动物体
   

    // if(cube.position.x >= 5){
    //     cube.position.x =.1
    //     cube.position.z = .1 
    // }else{
    //     cube.position.x += 0.1
    //     cube.position.z += 0.1 
    // }

     //旋转
    //  cube.rotation.x += 0.1 
    
    // console.log(time)
    //动画帧  单位时间内运行多少距离
    // let t =  time/1000%10 - 5  //得到秒 然后反复运动
    
    // let speed = 1
    // let distance = t*speed  
    // cube.position.x = Math.abs(distance)
 
    // camera.position.x = 10 + Math.abs(distance)
    // camera.position.z = 10 + Math.abs(distance)  
    // camera.position.z = 10 + Math.abs(distance)

    // let time = clock.getElapsedTime() //获取自时钟启动后的秒数
    // console.log('获取自时钟启动后的秒数:',time)
    let deltaTime = clock.getDelta( ) //获取自时钟启动后的秒数
    console.log('获取自时钟启动后的秒数:',deltaTime)


    renderer.render(scene,camera)
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