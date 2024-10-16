import { ElLoading } from 'element-plus'

window.$loading = (target, text, background, lock, fullscreen) =>
  ElLoading.service({
    target,
    text,
    background: background || 'rgba(0,0,0,.7)',
    lock,
    fullscreen
  })
