<template>
	<view class="container">
		<line :xData='xData' :yData='yData' :title='title'   @change='changeEvent'></line>
	</view>
</template>

<script>
	import line from '@/components/line.vue'
	export default{
		components: {
			line
		},
		data(){
			return {
				xData:[],
				yData:[],
				title:''
			}
		},
		onLoad(e){
			this.xData = JSON.parse(e.xData);
			this.yData = JSON.parse(e.yData);
			this.title = e.title
			console.log(e)
		},
		methods:{
			changeEvent(){
				
			}
		}
	}
</script>

<style lang="scss">
	.container{
		width: 100%;
		box-sizing: border-box;
		padding: 10upx;
	}
</style>