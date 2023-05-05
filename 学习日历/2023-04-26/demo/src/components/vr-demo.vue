<template >
    <div class="vr" ref="vr">

    </div>
</template>
<script setup>
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

const render = () => {
    renderer.render(scene, camera)
    controles.update()
    requestAnimationFrame(render)
}

 
//添加球
//导入hdr
const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync('assets/hdr/LivingRoom.hdr').then(texture => {
 
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 32, 32),
        new THREE.MeshBasicMaterial({
            map: texture, 
        })
    )
    sphere.geometry.scale(1,1,-1)
    scene.add(sphere) 
    scene.background = texture
    scene.environment = texture
})

const vr = ref(null)
let controles
onMounted(() => {

    vr.value.appendChild(renderer.domElement)
    controles = new OrbitControls(camera, vr.value)
    controles.enableDamping = true
    render()
})
</script>

<style> .vr {
     width: 100%;
     height: 100%;
 }
</style>