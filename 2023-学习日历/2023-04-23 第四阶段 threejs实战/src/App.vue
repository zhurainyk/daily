<template>
  <div class="wrapper">
    <div class="toolbar">
      <button :class="{ active: model === 'iphone' }" @click="switchModel('iphone')">iPhone XS Max</button>
      <button :class="{ active: model === 'iqoo' }" @click="switchModel('iqoo')">iQOO Z10 Turbo</button>
    </div>
    <div ref="container" class="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 建模函数拆分到独立文件，这里只保留入口
import { buildIPhone } from './models/iphone.js'
import { buildIQOO } from './models/iqoo.js'

export default {
  name: 'PhoneShowcase',
  data() {
    return { model: 'iphone' }
  },
  mounted() {
    this.initThree(this.$refs.container)
  },
  methods: {
    switchModel(name) {
      this._cleanup?.()
      this.model = name
      this.$nextTick(() => this.initThree(this.$refs.container))
    },

    initThree(container) {
      // ⚠️ 清空容器，避免旧 canvas 叠加
      container.innerHTML = ''
      // ⚠️ 所有 Three.js 对象放闭包，不能挂 this（Vue 3 Proxy 陷阱）
      let scene, camera, renderer, controls, phone, screenTexture, drawScreen

      // ---- 1. 基础设置 ----
      scene = new THREE.Scene()
      scene.background = new THREE.Color(this.model === 'iqoo' ? 0x1a1a2e : 0xe8e8ed)

      camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.001, 10)
      camera.position.set(0.05, 0.09, 0.18)

      renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setSize(container.clientWidth, container.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.0
      container.appendChild(renderer.domElement)

      controls = new OrbitControls(camera, renderer.domElement)
      controls.enableDamping = true
      controls.dampingFactor = 0.05
      controls.minDistance = 0.05
      controls.maxDistance = 0.6

      // ---- 2. 灯光 ----
      scene.add(new THREE.AmbientLight(0xffffff, 0.6))
      const key = new THREE.DirectionalLight(0xffffff, 1.6)
      key.position.set(0.3, 0.6, 0.5)
      key.castShadow = true
      key.shadow.mapSize.set(2048, 2048)
      key.shadow.camera.near = 0.01
      key.shadow.camera.far = 2
      key.shadow.bias = -0.0001
      scene.add(key)
      const fill = new THREE.DirectionalLight(0xcce0ff, 0.6)
      fill.position.set(-0.5, 0.2, 0.3)
      scene.add(fill)
      const back = new THREE.DirectionalLight(0xffffff, 0.8)
      back.position.set(0, 0.2, -0.6)
      scene.add(back)

      // ---- 3. 地面 ----
      const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(0.6, 0.6),
        new THREE.MeshStandardMaterial({ color: 0xf5f5f7, roughness: 0.9 })
      )
      floor.rotation.x = -Math.PI / 2
      floor.position.y = -0.001
      floor.receiveShadow = true
      scene.add(floor)

      // ---- 4. 根据型号分发建模 ----
      if (this.model === 'iphone') {
        const result = buildIPhone(scene)
        phone = result.phone
        screenTexture = result.screenTexture
        drawScreen = result.drawScreen
        camera.lookAt(0, 0.07875, 0)
        controls.target.set(0, 0.07875, 0)
      } else {
        const result = buildIQOO(scene)
        phone = result.phone
        screenTexture = result.screenTexture
        drawScreen = result.drawScreen
        camera.lookAt(0, 0.08186, 0)
        controls.target.set(0, 0.08186, 0)
      }

      // ---- 5. 渲染循环（实时更新时间）----
      let lastSecond = -1
      const animate = () => {
        requestAnimationFrame(animate)
        controls.update()
        const now = new Date()
        if (now.getSeconds() !== lastSecond) {
          lastSecond = now.getSeconds()
          drawScreen?.(now)
          if (screenTexture) screenTexture.needsUpdate = true
        }
        renderer.render(scene, camera)
      }
      animate()

      // ---- 6. Resize + 清理 ----
      const onResize = () => {
        camera.aspect = container.clientWidth / container.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.clientWidth, container.clientHeight)
      }
      window.addEventListener('resize', onResize)

      this._cleanup = () => {
        window.removeEventListener('resize', onResize)
        controls.dispose()
        renderer.dispose()
        screenTexture?.dispose()
      }
    }
  },
  beforeUnmount() {
    this._cleanup?.()
  }
}
</script>

<style>
.wrapper { width: 100vw; height: 100vh; display: flex; flex-direction: column; }
.toolbar {
  height: 44px; display: flex; align-items: center; justify-content: center; gap: 12px;
  background: #1a1a2e; z-index: 10;
}
.toolbar button {
  padding: 6px 18px; border: 1px solid #555; border-radius: 6px;
  background: transparent; color: #aaa; cursor: pointer; font-size: 14px; transition: all 0.2s;
}
.toolbar button.active { background: #7B61FF; color: #fff; border-color: #7B61FF; }
.toolbar button:hover { color: #fff; border-color: #7B61FF; }
.container { flex: 1; overflow: hidden; }
</style>
