<template>
    <div class="container" ref="container"></div>
  </template>
  
  <script setup>
  import * as THREE from 'three'
  import { ref, onMounted } from 'vue'
  //导入控制器
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
  //导入hdr loader
  import {RGBELoader} from 'three/examples/jsm/loaders/RGBELoader'
  
  //初始化场景
  const scene = new THREE.Scene( )
  //初始化相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5
  //初始化渲染器
  const renderer = new THREE.WebGLRenderer({antialias:true})
  renderer.setSize(window.innerWidth, window.innerHeight)
  
  
  // //添加立方体
  // const geometry = new THREE.BoxGeometry(10, 10, 10)
  // // const material = new THREE.MeshBasicMaterial({ color: 'pink' })
  // // const cube = new THREE.Mesh(geometry, material)
  // // scene.add(cube)
  
  // //引入图片素材
  // const arr  = ['4_r','4_l','4_u','4_d','4_f','4_b'] //右 左 上 下 前 后 
  // const boxMaterials = []
  // arr.forEach(x=>{
  //   let texture = new THREE.TextureLoader().load(`./imgs/living/${x}.jpg`)
  //   // if(x =='4_u'||x=='4_d'){ //旋转纹理 设置旋转中心点 向量
  //   //   texture.rotation = -Math.PI / 2
  //   //   texture.center = new THREE.Vector2(0.5,0.5)
  //   // }
  //   //创建材质
  //   boxMaterials.push(new THREE.MeshBasicMaterial({map:texture}))
  
  // })
  // const cube = new THREE.Mesh(geometry, boxMaterials)
  // cube.geometry.scale(1,1,-1)
  // scene.add(cube)
  
  //添加球
  
  const sphereGeometry = new THREE.SphereBufferGeometry(5,32,32)
  const rgbeLoader = new RGBELoader()
  rgbeLoader.load('./imgs/hdr/Living.hdr',texture=>{ //返回一个promise
    const sphereMaterial = new THREE.MeshBasicMaterial({map:texture})
    const sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)
    sphere.geometry.scale(1,1,-1) //内外翻转 
    scene.add(sphere)
  })
   
  
  //动画帧渲染
  const render = () => {
    renderer.render(scene, camera)
    control.update() //2 阻尼效果必须调用update（）
    requestAnimationFrame(render)
  }
  //挂在dom
  const container = ref(null)
  
  let control  
  onMounted(() => {
    //添加控制器
    control = new OrbitControls(camera, container.value)
    control.enableDamping = true // 1 开启阻尼效果 
    container.value.appendChild(renderer.domElement)
    render()
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
  