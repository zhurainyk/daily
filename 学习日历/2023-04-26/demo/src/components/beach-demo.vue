<template >
    <div class="vr" ref="vr">

    </div>
</template>
<script setup>
//海滩 球映射
import * as THREE from 'three'
import { ref, onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 30
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true   
const render = () => {
    renderer.render(scene, camera)
    controles.update()
    requestAnimationFrame(render)
}

 
//添加球  
//导入hdr
const rgbeLoader = new RGBELoader()
rgbeLoader.loadAsync('assets/hdr/beach.hdr').then(texture => {
    texture.mapping = THREE.EquirectangularReflectionMapping //环境支持旋转 配置1
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(5, 32, 32),
        new THREE.MeshStandardMaterial({
            map: texture, 
            roughness:.1,
            metalness:.8
        })
    ) 
    sphere.castShadow = true 
    scene.add(sphere) 
    scene.background = texture //环境支持旋转 配置2
    scene.environment = texture //环境支持旋转 配置3
    scene.receiveShadow = true 
})

const vr = ref(null)
let controles

//添加光
const directiveLight = new THREE.DirectionalLight(0xffffff,1)
directiveLight.castShadow = true
directiveLight.position.set(20,20,20)
scene.add(directiveLight)
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