import * as THREE from 'three'

/**
 * iPhone XS Max 建模函数
 * 尺寸：77.4 × 157.5 × 7.7 mm
 * 颜色：银色不锈钢中框 + 白色玻璃背板
 */
export function buildIPhone(scene) {
  const phone = new THREE.Group()
  phone.name = 'iPhoneXSMax'
  scene.add(phone)

  const W = 0.0774
  const H = 0.1575
  const D = 0.0077
  const W2 = W / 2
  const H2 = H / 2
  const D2 = D / 2
  const R = 0.008

  // ---- 材质 ----
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0xC0C0C0,  // 银色不锈钢
    metalness: 1.0,
    roughness: 0.15
  })
  const backMat = new THREE.MeshStandardMaterial({
    color: 0xF5F5F7,  // 白色玻璃
    metalness: 0.1,
    roughness: 0.05
  })
  const logoMat = new THREE.MeshStandardMaterial({
    color: 0x888888,
    metalness: 0.3,
    roughness: 0.3
  })

  // ---- A. 机身主体 ----
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

  // ---- B. 黑色 bezel 边框 ----
  const bezel = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 0.92, H * 0.92),
    new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.3, metalness: 0.1 })
  )
  bezel.name = 'RS_Bezel'
  bezel.position.set(0, H2, D2 + 0.00005)
  phone.add(bezel)

  // ---- C. 屏幕（带壁纸）----
  const { canvas, texture, draw } = createScreenTextureIPhone()
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 0.88, H * 0.88),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, alphaTest: 0.01 })
  )
  screen.name = 'RS_Screen'
  screen.position.set(0, H2, D2 + 0.0001)
  screen.renderOrder = 10
  phone.add(screen)

  // ---- D. 白色玻璃背板 ----
  const back = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 0.95, H * 0.95),
    backMat
  )
  back.name = 'RS_Back'
  back.position.set(0, H2, -D2 - 0.00005)
  back.rotation.y = Math.PI
  phone.add(back)

  // ---- D2. Apple Logo ----
  const logo = new THREE.Mesh(
    new THREE.CylinderGeometry(0.006, 0.006, 0.0001, 64),
    logoMat
  )
  logo.rotation.x = Math.PI / 2
  logo.position.set(0, H2 + 0.028, -D2 - 0.0001)
  phone.add(logo)

  // ---- D3. "iPhone" 文字 ----
  const text = new THREE.Mesh(
    new THREE.BoxGeometry(0.020, 0.0015, 0.00008),
    logoMat
  )
  text.position.set(0, H2 - 0.026, -D2 - 0.0001)
  phone.add(text)

  // ---- E. 摄像头模组 ----
  const camGroup = new THREE.Group()
  camGroup.position.set(-W2 * 0.45, H2 + H * 0.34, -D2)
  phone.add(camGroup)

  const bumpMat = new THREE.MeshStandardMaterial({ color: 0xE8E8ED, metalness: 0.8, roughness: 0.15 })
  const bump = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.012, 0.0008, 64), bumpMat)
  bump.rotation.x = Math.PI / 2
  bump.position.z = -0.0004
  bump.castShadow = true
  camGroup.add(bump)

  const ringMat = new THREE.MeshStandardMaterial({ color: 0xD0D0D5, metalness: 0.9, roughness: 0.1 })
  const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.0038, 0.0038, 0.0004, 32), ringMat)
  ring.rotation.x = Math.PI / 2
  ring.position.set(0, 0.004, -0.0009)
  camGroup.add(ring)

  const lensMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.02, metalness: 0.2 })
  const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.0033, 0.0033, 0.0006, 32), lensMat)
  lens.rotation.x = Math.PI / 2
  lens.position.set(0, 0.004, -0.0011)
  camGroup.add(lens)

  const ring2 = ring.clone()
  ring2.position.set(0, -0.004, -0.0009)
  camGroup.add(ring2)

  const tele = lens.clone()
  tele.position.set(0, -0.004, -0.0011)
  camGroup.add(tele)

  const flash = new THREE.Mesh(
    new THREE.CylinderGeometry(0.0015, 0.0015, 0.0003, 16),
    new THREE.MeshStandardMaterial({ color: 0xfff8e7, emissive: 0xffe8c0, emissiveIntensity: 0.5 })
  )
  flash.rotation.x = Math.PI / 2
  flash.position.set(0.012, 0, -0.0008)
  camGroup.add(flash)

  // ---- F. 按键（银色）----
  const btnMat = new THREE.MeshStandardMaterial({ color: 0xC0C0C0, metalness: 0.95, roughness: 0.12 })
  const power = new THREE.Mesh(new THREE.BoxGeometry(0.0006, 0.014, 0.0012), btnMat)
  power.position.set(W2 + 0.0003, H2 + 0.028, 0)
  power.castShadow = true
  phone.add(power)

  const volUp = new THREE.Mesh(new THREE.BoxGeometry(0.0006, 0.008, 0.0012), btnMat)
  volUp.position.set(-W2 - 0.0003, H2 + 0.022, 0)
  phone.add(volUp)

  const volDown = new THREE.Mesh(new THREE.BoxGeometry(0.0006, 0.008, 0.0012), btnMat)
  volDown.position.set(-W2 - 0.0003, H2 + 0.01, 0)
  phone.add(volDown)

  // ---- F2. 天线隔断条 ----
  const antennaMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, metalness: 0.0, roughness: 0.8 })
  ;[[-W2 + 0.015, H2 + H2 - 0.003], [W2 - 0.015, H2 + H2 - 0.003],
     [-W2 + 0.015, H2 - H2 + 0.003], [W2 - 0.015, H2 - H2 + 0.003]
  ].forEach(([x, y]) => {
    const ant = new THREE.Mesh(new THREE.BoxGeometry(0.0003, 0.001, D + 0.0001), antennaMat)
    ant.position.set(x, y, 0)
    phone.add(ant)
  })

  // ---- G. VFX 接触阴影 ----
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
 * iPhone 屏幕纹理：黄色渐变 + 刘海 + 实时时间
 */
function createScreenTextureIPhone() {
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
    const r = 46
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

    // 黄色渐变壁纸
    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, '#f6d365')
    grad.addColorStop(0.5, '#fda085')
    grad.addColorStop(1, '#f5576c')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    // 刘海（先画）
    ctx.fillStyle = '#000'
    const nx = w / 2 - 70, ny = 0, nw = 140, nh = 40, nr = 12
    ctx.beginPath()
    ctx.moveTo(nx, ny)
    ctx.lineTo(nx + nw, ny)
    ctx.lineTo(nx + nw, ny + nh - nr)
    ctx.quadraticCurveTo(nx + nw, ny + nh, nx + nw - nr, ny + nh)
    ctx.lineTo(nx + nr, ny + nh)
    ctx.quadraticCurveTo(nx, ny + nh, nx, ny + nh - nr)
    ctx.closePath()
    ctx.fill()

    // 时间（左上角，刘海上方）
    const hours = String(now.getHours()).padStart(2, '0')
    const mins = String(now.getMinutes()).padStart(2, '0')
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 22px Arial'
    ctx.textAlign = 'left'
    ctx.fillText(hours + ':' + mins, 20, 30)

    // 电量（右上角）
    ctx.font = 'bold 18px Arial'
    ctx.textAlign = 'right'
    ctx.fillText('100%', w - 62, 29)
    ctx.fillRect(w - 58, 17, 22, 11)
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.strokeRect(w - 60, 15, 28, 15)

    // App 图标
    const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#4CD964', '#5AC8FA', '#007AFF', '#5856D6', '#FF2D55']
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 4; col++) {
        const i = row * 4 + col
        const x = 36 + col * 110
        const y = 120 + row * 110
        ctx.fillStyle = colors[i % colors.length]
        ctx.beginPath()
        ctx.arc(x + 35, y + 35, 35, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Dock
    ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.fillRect(20, h - 130, w - 40, 110)
    ctx.fillStyle = 'rgba(255,255,255,0.8)'
    ctx.fillRect(w / 2 - 60, h - 16, 120, 8)

    ctx.restore()
  }

  draw(new Date())
  texture.needsUpdate = true

  return { canvas, texture, draw }
}
