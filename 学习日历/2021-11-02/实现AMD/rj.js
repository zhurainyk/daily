const def = new Map()
const defaultOptions = {
     paths:''
 }
rj = {}
 //from CDN      
 const __import = (url)=>{
     return new Promise((resolve,reject)=>{
        //  <script src="https://cdn.bootcdn.net/ajax/libs/systemjs/6.10.2/system.min.js"></script>
         System.import(url).then(resolve,reject)
     })
 }

 //normal script
 const __load = (url)=>{
     return new Promise((resolve,reject)=>{
         const head = document.getElementsByTagName('head')[0]
         const node = document.createElement('script')
         node.type = 'text/javascript'
         node.src = url;
         node.async = true;
         node.onload = resolve;
         node.onerror = reject;
         head.appendChild(node)
     })
 }

 rj.config = options => Object.assign(defaultOptions,options) 
//定义模块 
 define = (name,deps,factory)=>{
     //参数互换。。。 判断
     //先存依赖
    def.set(name,{name,deps,factory})
 }

 //dep -> a => a.js => 'htt://www.baidu.com/a.js'
 const __getUrl = dep =>{
     const p = location.pathname;
     return p.slice(0,p.lastIndexOf('/')) + '/' + dep + '.js' 
 }

 require = (deps,factory)=>{ //异步加载模块 所有的加载完成
     return new Promise((resolve,reject)=>{
         Promise.all(deps.map(dep=>{
             if( defaultOptions.paths[dep]) return __import(defaultOptions.paths[dep])
             return __load(__getUrl(dep)).then(()=>{
                 const {deps,factory} = def.get(dep)
                 if(deps.length === 0) return factory(null)
                 return require(deps,factory)
             })
         })).then(resolve,reject)
     }).then(instances=>factory(...instances))
 }