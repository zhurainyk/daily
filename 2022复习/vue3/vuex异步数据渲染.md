
<!-- 组件中使用 -->
<script>
	import {onMounted} from 'vue'
	import {useStore} from 'vuex'
	
	export default{
		setup(){
			const store = useStore()
			onMounted(){
				const promise = store.dispatch("getHomeDataAction")
				promise.then(res=>{
					...
					请求成功
				}).catch(err=>{
					  ...
					请求失败
				})
			}
			
		}
	}
</script>
<!-- store 文件夹下 index.js文件在actions 里去请求数据 -->
```js
	import {createStore} from 'vuex'
	import axios from 'axios'
	const store = createStore({
		state(){
			return{}
		},
		mutations:{
			getHomeData(state,payload){
				state.list = payload// 对应的去修改state数据就行了
			}
		},
		actions:{
			getHomeDataAction({commit}){
				return new Promise((resolve,reject)=>{
					axios.get("接口地址").then(res=>{
						// 请求成功
						commit("getHomeData",res.data.result)
						// 如果是一个请求，更改多个state里面的数据，就调用mutations对应的修改方法～
						resolve() // 通知组件，接口调用成功了
					}).catch(err=>{
						reject(err) // 通知组件，接口调用失败，并把失败原因传过去
					})
				})
			}
		}
	})
	export default store
```