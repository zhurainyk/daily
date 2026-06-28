<template>
  <div ref="container" class="container"></div>
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default {
  name: 'IQOOZ10Turbo',
  mounted() {
    // ⚠️ 所有 Three.js 对象放在闭包中，不能挂到 this 上（Vue 3 Proxy 陷阱）
    let scene, camera, renderer, controls
    const container = this.$refs.container

    // ========================
    //  1. 基础设置
    // ========================
    scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a2e)  // 深色背景，突出燃/沙漠色

    camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.001, 10)
    camera.position.set(0.05, 0.09, 0.18)
    camera.lookAt(0, 0.082, 0)

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
    controls.target.set(0, 0.082, 0)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 0.05
    controls.maxDistance = 0.6

    // ========================
    //  2. 灯光
    // ========================
    scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    const key = new THREE.DirectionalLight(0xffffff, 1.8)
    key.position.set(0.3, 0.6, 0.5)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    key.shadow.camera.near = 0.01
    key.shadow.camera.far = 2
    key.shadow.bias = -0.0001
    scene.add(key)

    // 补光（冷色，模拟 AMOLED 屏反射）
    scene.add(new THREE.DirectionalLight(0x8844ff, 0.4).position.set(-0.5, 0.2, 0.3))
    // 轮廓光（暖色，突出金属中框）
    scene.add(new THREE.DirectionalLight(0xffaa44, 0.6).position.set(0, 0.2, -0.6))

    // ========================
    //  3. 地面
    // ========================
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(0.6, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.9 })
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.001
    floor.receiveShadow = true
    scene.add(floor)

    // ========================
    //  4. 屏幕贴图（Canvas 动态绘制）
    // ========================
    const screenCanvas = document.createElement('canvas')
    screenCanvas.width = 512
    screenCanvas.height = 1024
    const screenCtx = screenCanvas.getContext('2d')
    const sw = screenCanvas.width
    const sh = screenCanvas.height

    // iQOO 风格壁纸：暗紫色渐变 + 光斑
    function drawScreen(now) {
      const ctx = screenCtx
      const w = sw
      const h = sh
      ctx.clearRect(0, 0, w, h)

      // 圆角裁剪
      const r = 44
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(r, 0)
      ctx.lineTo(w - r, 0)
      ctx.quadraticCurveTo(w, 0, w, r)
      ctx.lineTo(w, h - r)
      ctx.quadraticCurveTo(w, h, w - r, h)
      ctx.lineTo(r, h)
      ctx.quadraticCurveTo(0, h, 0, h - r)
      ctx.lineTo(0, r)
      ctx.quadraticCurveTo(0, 0, r, 0)
      ctx.closePath()
      ctx.clip()

      // 暗紫色渐变壁纸（iQOO 风格）
      const grad = ctx.createLinearGradient(0, 0, w, h)
      grad.addColorStop(0, '#1a0533')
      grad.addColorStop(0.5, '#2d1b69')
      grad.addColorStop(1, '#0d0d2e')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // 光斑装饰（iQOO 电竞风格）
      ctx.globalAlpha = 0.15
      const g1 = ctx.createRadialGradient(w * 0.3, h * 0.2, 0, w * 0.3, h * 0.2, 180)
      g1.addColorStop(0, '#ff6600')
      g1.addColorStop(1, 'transparent')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, w, h)
      ctx.globalAlpha = 1.0

      // 前置摄像头开孔（顶部中央）
      ctx.fillStyle = '#000'
      ctx.beginPath()
      ctx.arc(w / 2, 22, 4, 0, Math.PI * 2)
      ctx.fill()

      // 状态栏：时间（左上角）
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 22px Arial'
      ctx.textAlign = 'left'
      const hours = String(now.getHours()).padStart(2, '0')
      const mins = String(now.getMinutes()).padStart(2, '0')
      ctx.fillText(hours + ':' + mins, 20, 30)

      // 状态栏：电量（右上角）
      ctx.font = 'bold 18px Arial'
      ctx.textAlign = 'right'
      ctx.fillText('100%', w - 62, 29)
      // 电池图标
      ctx.fillRect(w - 58, 17, 22, 11)
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.strokeRect(w - 60, 15, 28, 15)

      // 信号/ WiFi 图标（状态栏右侧）
      ctx.fillStyle = '#fff'
      ctx.font = '14px Arial'
      ctx.textAlign = 'right'
      ctx.fillText('5G', w - 100, 29)

      // App 图标（矩形圆角，iQOO 风格）
      const colors = ['#FF3B30', '#FF9500', '#34C759', '#5AC8FA', '#AF52DE', '#FF2D55', '#FFD60A', '#00C7BE']
      for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 4; col++) {
          const i = row * 4 + col
          const x = 36 + col * 110
          const y = 120 + row * 110
          // 圆角矩形图标
          ctx.fillStyle = colors[i % colors.length]
          ctx.beginPath()
          ctx.roundRect(x + 18, y + 18, 34, 34, 8)
          ctx.fill()
        }
      }

      // Dock 栏（底部）
      ctx.fillStyle = 'rgba(255,255,255,0.15)'
      ctx.beginPath()
      ctx.roundRect(20, h - 130, w - 40, 110, 20)
      ctx.fill()

      // Home 指示条
      ctx.fillStyle = 'rgba(255,255,255,0.6)'
      ctx.beginPath()
      ctx.roundRect(w / 2 - 60, h - 16, 120, 6, 3)
      ctx.fill()

      ctx.restore()
    }

    // 初始绘制
    drawScreen(new Date())

    const screenTexture = new THREE.CanvasTexture(screenCanvas)
    screenTexture.colorSpace = THREE.SRGBColorSpace
    screenTexture.needsUpdate = true

    // ========================
    //  5. iQOO Z10 Turbo 模型
    // ========================
    const phone = new THREE.Group()
    scene.add(phone)

    // 真实尺寸（百度百科）：163.72 × 75.88 × 8.09 mm
    const W = 0.07588   // 宽
    const H = 0.16372   // 高
    const D = 0.00809   // 厚
    const W2 = W / 2
    const H2 = H / 2
    const D2 = D / 2
    const R = 0.007     // 圆角半径

    // ---------- A. 机身中框（直边 + R 角）----------
    // iQOO Z10 Turbo：直边金属中框，塑料/金属混合
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,      // 星穹黑（深色金属）
      metalness: 0.85,
      roughness: 0.25
    })

    const shape = new THREE.Shape()
    shape.moveTo(-W2 + R, 0)
    shape.lineTo(W2 - R, 0)
    shape.quadraticCurveTo(W2, 0, W2, R)
    shape.lineTo(W2, H - R)
    shape.quadraticCurveTo(W2, H, W2 - R, H)
    shape.lineTo(-W2 + R, H)
    shape.quadraticCurveTo(-W2, H, -W2, H - R)
    shape.lineTo(-W2, R)
    shape.quadraticCurveTo(-W2, 0, -W2 + R, 0)

    const bodyGeo = new THREE.ExtrudeGeometry(shape, {
      depth: D,
      bevelEnabled: false,
      steps: 1
    })
    bodyGeo.center()

    const body = new THREE.Mesh(bodyGeo, frameMat)
    body.name = 'RS_Body'
    body.position.y = H2
    body.castShadow = true
    body.receiveShadow = true
    phone.add(body)

    // ---------- B. 屏幕 bezel（黑色窄边框）----------
    const bezelW = W * 0.94
    const bezelH = H * 0.94
    const bezel = new THREE.Mesh(
      new THREE.PlaneGeometry(bezelW, bezelH),
      new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.3, metalness: 0.1 })
    )
    bezel.name = 'RS_Bezel'
    bezel.position.set(0, H2, D2 + 0.00005)
    phone.add(bezel)

    // ---------- C. 屏幕（AMOLED 直屏，无刘海）----------
    const screenW = W * 0.92
    const screenH = H * 0.92
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(screenW, screenH),
      new THREE.MeshBasicMaterial({
        map: screenTexture,
        transparent: true,
        alphaTest: 0.01
      })
    )
    screen.name = 'RS_Screen'
    screen.position.set(0, H2, D2 + 0.0001)
    screen.renderOrder = 10
    phone.add(screen)

    // ---------- D. 背板（AG 磨砂玻璃）----------
    const backMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,     // 星穹黑，磨砂质感
      metalness: 0.15,
      roughness: 0.65,
      transparent: true,
      opacity: 0.95
    })
    const back = new THREE.Mesh(
      new THREE.PlaneGeometry(W * 0.96, H * 0.96),
      backMat
    )
    back.name = 'RS_Back'
    back.position.set(0, H2, -D2 - 0.00005)
    back.rotation.y = Math.PI
    phone.add(back)

    // ---------- E. 后置摄像头（"万里舷窗"设计）----------
    // iQOO Z10 Turbo：矩形模组 + 双摄 + 环形闪光灯
    const camGroup = new THREE.Group()
    // 后置左上角
    camGroup.position.set(-W2 * 0.55, H2 + H * 0.32, -D2)
    phone.add(camGroup)

    // 矩形 Deco 底座（全金属一体成型）
    const decoMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9, roughness: 0.2 })
    const deco = new THREE.Mesh(
      new THREE.BoxGeometry(0.022, 0.024, 0.0009),
      decoMat
    )
    deco.position.z = -0.00045
    deco.castShadow = true
    camGroup.add(deco)

    // 主摄（5000万 LYT-600，OIS）
    const mainLensMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.02, metalness: 0.2 })
    const mainLens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0035, 0.0035, 0.0005, 32),
      mainLensMat
    )
    mainLens.rotation.x = Math.PI / 2
    mainLens.position.set(-0.004, 0.004, -0.0009)
    camGroup.add(mainLens)

    // 主摄金属环
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.95, roughness: 0.1 })
    const mainRing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0042, 0.0042, 0.00025, 32),
      ringMat
    )
    mainRing.rotation.x = Math.PI / 2
    mainRing.position.set(-0.004, 0.004, -0.0007)
    camGroup.add(mainRing)

    // 景深镜头（200万像素）
    const depthLens = mainLens.clone()
    depthLens.position.set(-0.004, -0.004, -0.0009)
    camGroup.add(depthLens)

    const depthRing = mainRing.clone()
    depthRing.position.set(-0.004, -0.004, -0.0007)
    camGroup.add(depthRing)

    // 环形闪光灯（iQOO 标志性设计）
    const flashRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.002, 0.0004, 8, 32),
      new THREE.MeshStandardMaterial({ color: 0xfff8e7, emissive: 0xffe8c0, emissiveIntensity: 0.5 })
    )
    flashRing.rotation.x = Math.PI / 2
    flashRing.position.set(0.005, 0, -0.0008)
    camGroup.add(flashRing)

    // ---------- F. 前置摄像头（顶部中央开孔）----------
    const frontCam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.0015, 0.0015, 0.0002, 16),
      new THREE.MeshStandardMaterial({ color: 0x111111 })
    )
    frontCam.rotation.x = Math.PI / 2
    frontCam.position.set(0, H2 + H2 - 0.003, D2 + 0.00005)
    phone.add(frontCam)

    // ---------- G. 按键 ----------
    // iQOO：右侧电源键 + 左侧音量键
    const btnMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.9, roughness: 0.2 })

    // 电源键（右侧，纹理标识）
    const power = new THREE.Mesh(new THREE.BoxGeometry(0.0006, 0.012, 0.0012), btnMat)
    power.position.set(W2 + 0.0003, H2 + 0.025, 0)
    power.castShadow = true
    phone.add(power)

    // 音量+（左侧）
    const volUp = new THREE.Mesh(new THREE.BoxGeometry(0.0006, 0.007, 0.0012), btnMat)
    volUp.position.set(-W2 - 0.0003, H2 + 0.022, 0)
    phone.add(volUp)

    // 音量-（左侧）
    const volDown = new THREE.Mesh(new THREE.BoxGeometry(0.0006, 0.007, 0.0012), btnMat)
    volDown.position.set(-W2 - 0.0003, H2 + 0.012, 0)
    phone.add(volDown)

    // ---------- H. iQOO 品牌 Logo（背面）----------
    const logoMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.4, roughness: 0.3 })
    // "iQOO" 文字用细长 Box 模拟
    const logoBar = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.0018, 0.00008), logoMat)
    logoBar.position.set(0, H2 - 0.025, -D2 - 0.0001)
    phone.add(logoBar)

    // ---------- I. VFX 接触阴影 ----------
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(W * 1.4, H * 0.4),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.1, depthWrite: false })
    )
    shadowPlane.rotation.x = -Math.PI / 2
    shadowPlane.position.set(0, -D2 - 0.001, 0)
    phone.add(shadowPlane)

    // ========================
    //  6. 渲染循环（实时更新时间）
    // ========================
    let lastSecond = -1
    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()

      // 每秒刷新屏幕时间
      const now = new Date()
      if (now.getSeconds() !== lastSecond) {
        lastSecond = now.getSeconds()
        drawScreen(now)
        screenTexture.needsUpdate = true
      }

      renderer.render(scene, camera)
    }
    animate()

    // ========================
    //  7. 窗口 resize + 清理
    // ========================
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
      screenTexture.dispose()
    }

    console.log('✅ iQOO Z10 Turbo 星穹黑 · 建模完成')
  },
  beforeUnmount() {
    this._cleanup?.()
  }
}
</script>

<style>
* { margin: 0; padding: 0; }
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #1a1a2e;
}
</style>
