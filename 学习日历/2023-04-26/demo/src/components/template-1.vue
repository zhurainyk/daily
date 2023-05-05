<template >
    <div class="demo" ref="demo">
      
    </div>
</template>
<script setup>
import * as THREE from 'three'
import {ref,onMounted} from 'vue'
import  {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 5
scene.add(camera)

const renderer = new THREE.WebGLRenderer({antialias:true})
renderer.setSize(window.innerWidth,window.innerHeight)

const render = ()=>{
    renderer.render(scene,camera)
    controles.update()
    requestAnimationFrame(render)
}

const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial()
const cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
scene.add(cube)


const demo = ref(null)
let controles 
onMounted(()=>{
    demo.value.appendChild(renderer.domElement)
    controles = new OrbitControls(camera,demo.value)
    controles.enableDamping = true 
    render()
})
</script>

<style> 
.demo{
    width:100%;
    height:100%;
}
</style>