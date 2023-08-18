1. babel插件 去除console.log 
2. babel插件 按需引入替换包名  
    ```js
        import {ElButton} from 'element-ui'

        <!-- 转换后 -->
        import {ElButton} from 'element-ui/components/Button'
    ```
3. webpack插件开发流程 
    插件开发中最重要的两个资源：compiler和compilation对象。compiler对象代表了完整的webpack配置。compilation对象代表了一次资源版本构建