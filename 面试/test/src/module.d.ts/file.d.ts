/// <reference types="vite/client" />
declare module "*.vue" {
  import type { DefineComponent } from "vue";

  const vueComponent: DefineComponent<{}, {}, any>;

  export default vueComponent;
}
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.less'
declare module '*.scss'
declare module '*.sass'
declare module '*.less'
declare module '*.css'
declare module '*.js'
declare module '*'