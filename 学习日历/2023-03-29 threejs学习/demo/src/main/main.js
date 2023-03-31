import * as THREE from 'three'
console.log(THREE)


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,2000)
camera.position.set(0,0,10)
scene.add(camera)
const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color:"#ff00ff"})
const cube = new THREE.Mesh(geometry,material)
scene.add(cube)
const renderer = new THREE.WebGL1Renderer()
renderer.setSize(window.innerWidth,window.innerHeight)

document.body.appendChild(renderer.domElement)

renderer.render(scene,camera)
