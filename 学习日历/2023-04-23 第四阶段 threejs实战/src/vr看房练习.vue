<template>
  <div class="container" ref="container">

  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5;
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

let controle
const render = () => {
  renderer.render(scene, camera)
  controle.update()
  requestAnimationFrame(render)

}

// const boxGeometry = new THREE.BoxGeometry(1,1,1)
// const material = new THREE.MeshBasicMaterial({color:'pink'})
// const   box = new THREE.Mesh(boxGeometry,material)
// scene.add(box)

const loader = new RGBELoader()
// loader.load('./imgs/hdr/Living.hdr', texture => {
//   // sphere.material.map = texture
//   const sphereGeometry = new THREE.SphereGeometry(5, 32, 32)
//   const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture })
//   const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
//   sphere.geometry.scale(1,1,-1)
//   scene.add(sphere)
// })
loader.loadAsync('./imgs/hdr/Living.hdr').then(texture=>{
  const sphereGeometry = new THREE.SphereGeometry(5, 32, 32)
  const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.geometry.scale(1,1,-1)
  scene.add(sphere)
})


// sphere.geometry.scale(1,1,-1)

const container = ref(null)
onMounted(() => {

  controle = new OrbitControls(camera, container.value)
  controle.enableDamping = true
  container.value.appendChild(renderer.domElement)
  render()
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