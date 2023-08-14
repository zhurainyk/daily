<template >
    <div class="demo" ref="demo">

    </div>
</template>
<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 2, 6)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

const render = () => {
    renderer.render(scene, camera)
    controles.update()
    requestAnimationFrame(render)
}

// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
// const cubeMaterial = new THREE.MeshBasicMaterial()
// const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
// scene.add(cube)


const demo = ref(null)
let controles
onMounted(() => {
    demo.value.appendChild(renderer.domElement)
    renderer.setClearColor('#000')
    scene.background = new THREE.Color('#ccc')
    scene.environment = new THREE.Color('#ccc')
    controles = new OrbitControls(camera, demo.value)
    controles.enableDamping = true
    render()

})


//添加网格地面
const gridHelper = new THREE.GridHelper(10, 10)
gridHelper.material.opacity = 0.2
gridHelper.material.transparent = true  //透明度
scene.add(gridHelper)


//导入宝马模型
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader'
const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('assets/draco/')
gltfLoader.setDRACOLoader(dracoLoader)
let wheels =[]
let carBody
let frontCar
let hoodCar
let glassCar

const bodyMaterial = new THREE.MeshPhysicalMaterial({
    color:0xff0000,
    metalness:1,
    roughness:0.5,
    clearcoat:1,//有些类似于车漆，碳纤，被水打湿的表面的材质需要在面上再增加一个透明的，具有一定反光特性的面
    clearcoatRoughness:0,//粗糙度
    sheen:1,//光泽强度 
    // sheenColor:'yellow'//光泽颜色 
})
const glassMaterial = new THREE.MeshPhysicalMaterial({
    color:0xffffff,
    metalness:0,
    roughness:0,
    transmission:0.98,//透光率（或者说透光性）很薄的透明或者半透明的塑料、玻璃材质即便在几乎完全透明的情况下仍旧会保留反射的光线，透光性属性用于这种类型的材质。
    transparent:true,
    // opacity:1
})
const setColor = ()=>{
    bodyMaterial.color.set('yellow')
}
gltfLoader.load('assets/model/bmw01.glb',gltf=>{
    const bmw = gltf.scene
    bmw.traverse(child=>{
       
        if(child.isMesh){ 
            console.log(child.name)
           
            if(child.name.includes('轮毂')){
                wheels.push(child)
                // child.material = bodyMaterial
            }
            if(child.name.includes('Mesh002')){
                carBody = child 
                // carBody.material = bodyMaterial
            }
            if(child.name.includes('前脸')){
                frontCar = child
                // frontCar.material = bodyMaterial
            }
            if(child.name.includes('引擎盖_1')){
                hoodCar = child 
                
                // hoodCar.material = bodyMaterial
            }
            if(child.name.includes('挡风玻璃')){
                glassCar = child 
                glassCar.material = glassMaterial
                glassCar.material.color.set('pink') //修改颜色
            }

            if(child.name ==='Mesh002_1'){
                //尾灯
                // child.material = bodyMaterial
            }

            if(child.name ==='宝马双肾'){
                //宝马双肾
                // child.material = bodyMaterial
            } 
            if(child.name.startsWith('Mesh034')){
                //宝马前灯 
                // child.material = bodyMaterial
            }  
            if(child.name.startsWith('Mesh037')){
                //宝马后灯 
                // child.material = bodyMaterial
            } 
            if(child.name.startsWith('Mesh041')){
                //宝马方向盘
                // child.material = bodyMaterial
            } 
            if(child.name.startsWith('Mesh017')){
                //宝马内饰前铺面
                // child.material = bodyMaterial
            } 
            if(child.name.startsWith('Plane')){
                //宝马内饰后铺面
                // child.material = bodyMaterial
            } 
            if(child.name.startsWith('Torus')){
                //宝马前灯轮廓
                // child.material = bodyMaterial
            } 
            if(child.name.startsWith('Object')){
                //宝马轮毂支架
                // child.material = bodyMaterial
            } 
            if(child.name.startsWith('Line')){
                //宝马前内饰包括前脚垫 反光镜
                // child.material = bodyMaterial
            } 
            if(child.name.startsWith('Cylinder')){
                //宝马车标 包括方向盘上的车标
                // child.material = bodyMaterial
            } 
            if(child.name.startsWith('ChamferBox')){
                //宝马前后车牌
                // child.material = bodyMaterial
            } 
            if(child.name.startsWith('Mesh065')){
                //宝马前刹车盘 Mesh103后刹车盘
                // child.material = bodyMaterial
            } 
            if(child.name.startsWith('Mesh046')){
                //宝马轮胎 44 46 49 51
                // child.material = bodyMaterial
            } 
            if(child.name.startsWith('Mesh041')){
                //宝马轮胎 44 46 49 51
                child.material = bodyMaterial
            } 
        }
    })
    scene.add(bmw)
})

//添加灯光
const light1 = new THREE.DirectionalLight(0xffffff,1)
light1.position.set(0 , 0 ,10)
scene.add(light1)
const light2 = new THREE.DirectionalLight(0xffffff,1)
light2.position.set(0 , 0 ,-10)
scene.add(light2)
const light3 = new THREE.DirectionalLight(0xffffff,1)
light3.position.set(10 , 0 ,0)
scene.add(light3)
const light4 = new THREE.DirectionalLight(0xffffff,1)
light4.position.set(-10 , 0 ,0)
scene.add(light4)
const light5 = new THREE.DirectionalLight(0xffffff,1)
light5.position.set(0 , 10 ,0)
scene.add(light5)
const light6 = new THREE.DirectionalLight(0xffffff,1)
light6.position.set(5 , 10 ,0)
scene.add(light6)
const light7 = new THREE.DirectionalLight(0xffffff,1)
light7.position.set(0 , 10 ,5)
scene.add(light7)
const light8 = new THREE.DirectionalLight(0xffffff,1)
light8.position.set(0 , 10 ,-5)
scene.add(light8)
const light9 = new THREE.DirectionalLight(0xffffff,1)
light9.position.set(-5 , 10 ,0)
scene.add(light9)
const light10 = new THREE.DirectionalLight(0xffffff,1)
light10.position.set(10 , 10 ,10)
scene.add(light10)
// const light11 = new THREE.DirectionalLight(0xffffff,1)
// light11.position.set(0 , 2 ,-10)
// scene.add(light11)
 
</script>

<style> .demo {
     width: 100%;
     height: 100%;
 }
</style>