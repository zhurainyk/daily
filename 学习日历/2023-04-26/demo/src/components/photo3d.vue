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
camera.position.z = 5
scene.add(camera)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

const render = () => {
    renderer.render(scene, camera)
    // controles.update()
    material.uniforms.uMouse.value = mouse 
    requestAnimationFrame(render)
}

// const cubeGeometry = new THREE.BoxGeometry(1,1,1)
// const cubeMaterial = new THREE.MeshBasicMaterial()
// const cube = new THREE.Mesh(cubeGeometry,cubeMaterial)
// scene.add(cube)


const demo = ref(null)
let controles
onMounted(() => {
    demo.value.appendChild(renderer.domElement)
    // controles = new OrbitControls(camera,demo.value)
    // controles.enableDamping = true 

    render()
    window.addEventListener('mousemove',(e)=>{
    mouse.x = (e.clientX / window.innerWidth)*2 - 1
    mouse.y = -(e.clientY/window.innerHeight) * 2 + 1
    
})
})

//导入图片纹理
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('./assets/images/mary.jpg')
const depthTexture = textureLoader.load('./assets/images/mary_depth.jpg')
const planGeomatry = new THREE.PlaneGeometry(3.84, 5.76)
const planeMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    // alphaMap:texture,
    // transparent:true ,
}) 
//鼠标坐标
const mouse = new THREE.Vector2()
//着色器 材质
const material = new THREE.ShaderMaterial({
    uniforms:{
        uTexture:{value:texture},
        uDepthTexture:{value:depthTexture},
        uMouse: { value: mouse }
    },
    vertexShader: //顶点着色器 
    ` 
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    fragmentShader: //片源着色器  
    `
    uniform sampler2D uTexture;
    uniform sampler2D uDepthTexture;
    uniform vec2 uMouse;
    varying vec2 vUv;
        void main(){
            vec4 color = texture2D(uTexture, vUv);
            vec4 depth = texture2D(uDepthTexture, vUv);
            float depthValue = depth.r;
            float x = vUv.x + (uMouse.x)*0.01*depthValue;
            float y = vUv.y + (uMouse.y)*0.01*depthValue;
            vec4 newColor = texture2D(uTexture, vec2(x, y));
            gl_FragColor = newColor;
        }
    
    `

})
const plane = new THREE.Mesh(planGeomatry, material)
scene.add(plane) 
window.addEventListener('mousemove',(e)=>{
    mouse.x = (e.clientX / window.innerWidth)*2 - 1
    mouse.y = -(e.clientY/window.innerHeight) * 2 + 1
    
})

</script>

<style> .demo {
     width: 100%;
     height: 100%;
 }
</style>