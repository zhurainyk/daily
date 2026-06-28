import * as THREE from 'three'

/**
 * iQOO Z10 Turbo 建模函数
 * 尺寸：163.72 × 75.88 × 8.09 mm
 * 颜色：星穹黑（深空灰金属中框 + AG 磨砂背板）
 * 摄像头："万里舷窗"设计，矩形模组 + 双摄 + 环形闪光灯
 */
export function buildIQOO(scene) {
  const phone = new THREE.Group()
  phone.name = 'iQOOZ10Turbo'
  scene.add(phone)

  const W = 0.07588   // 宽
  const H = 0.16372   // 高
  const D = 0.00809   // 厚
  const W2 = W / 2
  const H2 = H / 2
  const D2 = D / 2
  const R = 0.007    // 圆角半径

  // ---- 材质 ----
  // 中框：深空灰金属
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a2a,
    metalness: 0.85,
    roughness: 0.25
  })
  // 背板：AG 磨砂玻璃
  const backMat = new THREE.MeshStandardMaterial({
    color: 0x1a1a1a,
    metalness: 0.15,
    roughness: 0.65,
    transparent: true,
    opacity: 0.95
  })
  // 摄像头 Deco：深灰金属
  const decoMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9, roughness: 0.2 })
  // 镜头环：银色
  const ringMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.95, roughness: 0.1 })
  // 镜头：黑色
  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.02, metalness: 0.2 })
  // 按键：与中框同色
  const btnMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.9, roughness: 0.2 })
  // 品牌 Logo：灰色
  const logoMat = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.4, roughness: 0.3 })

  // ---- A. 机身主体（直边 + R 角）----
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

  const bodyGeo = new THREE.ExtrudeGeometry(shape, { depth: D, bevelEnabled: false, steps: 1 })
  bodyGeo.center()

  const body = new THREE.Mesh(bodyGeo, frameMat)
  body.name = 'RS_Body'
  body.position.y = H2
  body.castShadow = true
  body.receiveShadow = true
  phone.add(body)

  // ---- B. 屏幕 bezel（黑色窄边框）----
  const bezel = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 0.94, H * 0.94),
    new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.3, metalness: 0.1 })
  )
  bezel.name = 'RS_Bezel'
  bezel.position.set(0, H2, D2 + 0.00005)
  phone.add(bezel)

  // ---- C. 屏幕（AMOLED 直屏，无刘海）----
  const { canvas, texture, draw } = createScreenTextureIQOO()
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 0.92, H * 0.92),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.01 })
  )
  screen.name = 'RS_Screen'
  screen.position.set(0, H2, D2 + 0.0001)
  screen.renderOrder = 10
  phone.add(screen)

  // ---- D. 背板（AG 磨砂玻璃）----
  const back = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 0.96, H * 0.96),
    backMat
  )
  back.name = 'RS_Back'
  back.position.set(0, H2, -D2 - 0.00005)
  back.rotation.y = Math.PI
  phone.add(back)

  // ---- D2. iQOO 品牌 Logo（背面）----
  const logoBar = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.0018, 0.00008), logoMat)
  logoBar.position.set(0, H2 - 0.025, -D2 - 0.0001)
  phone.add(logoBar)

  // ---- E. 后置摄像头（"万里舷窗"设计）----
  const camGroup = new THREE.Group()
  camGroup.position.set(-W2 * 0.55, H2 + H * 0.32, -D2)
  phone.add(camGroup)

  // 矩形 Deco 底座（全金属一体成型）
  const deco = new THREE.Mesh(
    new THREE.BoxGeometry(0.022, 0.024, 0.0009),
    decoMat
  )
  deco.position.z = -0.00045
  deco.castShadow = true
  camGroup.add(deco)

  // 主摄（5000万 LYT-600，OIS）
  const mainRing = new THREE.Mesh(new THREE.CylinderGeometry(0.0042, 0.0042, 0.00025, 32), ringMat)
  mainRing.rotation.x = Math.PI / 2
  mainRing.position.set(-0.004, 0.004, -0.0007)
  camGroup.add(mainRing)

  const mainLens = new THREE.Mesh(new THREE.CylinderGeometry(0.0035, 0.0035, 0.0005, 32), lensMat)
  mainLens.rotation.x = Math.PI / 2
  mainLens.position.set(-0.004, 0.004, -0.0009)
  camGroup.add(mainLens)

  // 景深镜头（200万像素）
  const depthRing = mainRing.clone()
  depthRing.position.set(-0.004, -0.004, -0.0007)
  camGroup.add(depthRing)

  const depthLens = mainLens.clone()
  depthLens.position.set(-0.004, -0.004, -0.0009)
  camGroup.add(depthLens)

  // 环形闪光灯（iQOO 标志性设计）
  const flashRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.002, 0.0004, 8, 32),
    new THREE.MeshStandardMaterial({ color: 0xfff8e7, emissive: 0xffe8c0, emissiveIntensity: 0.5 })
  )
  flashRing.rotation.x = Math.PI / 2
  flashRing.position.set(0.005, 0, -0.0008)
  camGroup.add(flashRing)

  // ---- F. 前置摄像头（顶部中央开孔）----
  const frontCam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0015, 0.0015, 0.0002, 16),
    new THREE.MeshStandardMaterial({ color: 0x111111 })
  )
  frontCam.rotation.x = Math.PI / 2
  frontCam.position.set(0, H2 + H2 - 0.003, D2 + 0.00005)
  phone.add(frontCam)

  // ---- G. 按键 ----
  // 电源键（右侧）
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

  // ---- H. VFX 接触阴影 ----
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 1.4, H * 0.4),
    new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.1, depthWrite: false })
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.set(0, -D2 - 0.001, 0)
  phone.add(shadow)

  return { phone, screenTexture: texture, drawScreen: draw }
}

/**
 * iQOO 屏幕纹理：暗紫色渐变 + 光斑 + 实时时间
 * 风格：电竞感，无刘海，顶部中央前置开孔
 */
function createScreenTextureIQOO() {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 1024
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace

  function draw(now) {
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

    // 暗紫色渐变壁纸（iQOO 电竞风格）
    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, '#1a0533')
    grad.addColorStop(0.5, '#2d1b69')
    grad.addColorStop(1, '#0d0d2e')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    // 光斑装饰
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
    const hours = String(now.getHours()).padStart(2, '0')
    const mins = String(now.getMinutes()).padStart(2, '0')
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 22px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(hours + ':' + mins, 20, 30)

    // 状态栏：电量（右上角）
    ctx.font = 'bold 18px Arial'
    ctx.textAlign = 'right'
    ctx.fillText('100%', w - 62, 29)
    ctx.fillRect(w - 58, 17, 22, 11)
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.strokeRect(w - 60, 15, 28, 15)

    // 信号 5G（状态栏右侧）
    ctx.font = '14px Arial'
    ctx.textAlign = 'right'
    ctx.fillText('5G', w - 100, 29)

    // App 图标（圆角矩形，iQOO 风格）
    const colors = ['#FF3B30', '#FF9500', '#34C759', '#5AC8FA', '#AF52DE', '#FF2D55', '#FFD60A', '#00C7BE']
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 4; col++) {
        const i = row * 4 + col
        const x = 36 + col * 110
        const y = 120 + row * 110
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

  draw(new Date())
  texture.needsUpdate = true

  return { canvas, texture, draw }
}
