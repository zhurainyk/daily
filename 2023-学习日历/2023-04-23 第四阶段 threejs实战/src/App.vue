<template>
  <div class="container" ref="container">

  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
const render = () => {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

// const cubeGeometry = new THREE.BoxGeometry(1,1,1)
// const cubeMaterial = new THREE.MeshBasicMaterial({color:'pink'})
// const cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
// scene.add(cube)
const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync('imgs/hdr/Living.hdr').then(texture => {
  const sphereGeometry = new THREE.SphereGeometry(5, 32, 32)
  const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.geometry.scale(1, 1, -1)
  scene.add(sphere)
})
let control
const container = ref(null)
let div
let cssrender  
const createDiv = () => {
  div = document.createElement('div')
  div.textContent = 'hello css2d'
  div.style.color = 'red'
  var label = new CSS2DObject(div);
  label.position.set(2, 3, 3);
 
 scene.add(label)
 console.log(scene)
   
}
onMounted(() => {
  control = new OrbitControls(camera, container.value)
  control.enableDamping = true
  container.value.appendChild(renderer.domElement)
  render()
  createDiv()
})

</script>
<style>
* {
  margin: 0;
  padding: 0;
}

.container {
  width: 100vw;
  height: 100vh;
}
</style>