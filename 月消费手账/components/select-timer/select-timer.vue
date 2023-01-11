<template>
	<view class="actions" v-if="visible">
		<view class="mask" @click="visibleChange()"></view>
		<view class="tabBar">
			<view class="left">
				<text @click="visibleChange()">取消</text>
			</view>
			<view class="right">
				<text @click="visibleChange()">确认</text>
			</view>
		</view>
		<picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange">
			<picker-view-column>
				<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
			</picker-view-column>
		<!-- 	<picker-view-column>
				<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>				
			</picker-view-column> -->
		</picker-view>
	</view>
</template>
<script>
	export default {
		data(){
			return {
				value: [0,0],
				years: [],
				months: [],
				days: [],
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		props:{
			visible: {
				type:Boolean,
				default: false
			}
		},
		created() {
			//用最古老的方式做最有效的事
			//记录一下当前时间
			let data = new Date();
			// 初始化选择器中的年份
			for(let i=1970;i<=2099;i++){
				this.years.push(i)
			}
			// 初始化选择器中的月份
			for(let j=1;j<=12;j++){
				this.months.push(j)
			}
			// 初始化选择器中的天数
			this.init(data.getFullYear(),data.getMonth())
			// 初始化选择器选中的时间
			//定义到当前时间
			this.value[0] = data.getFullYear() - 1970;
			this.value[1] = data.getMonth();
			// this.value[2] = data.getDate()-1;
			this.$emit('changeTime',this.value)
		},
		methods:{
			visibleChange(){
				this.$emit('timeCofirm',this.visible)
			},
			bindChange(e){
				this.init(
					this.years[e.detail.value[0]],
					this.months[e.detail.value[1]] - 1
				)
				this.value = e.detail.value;
				this.$emit('changeTime',this.value)
			},
			// 初始化选择器中的天数
			init(inYear,inMonth,inDay){
				this.days = [];
				// 当前月数为2月
				if(inMonth == 1){
					if(inYear %4 ==0){
						// 为闰年为29天
						for(let s=1;s<=29;s++){
							this.days.push(s)
						}
					}else {
						// 否则为28天
						for(let s=1;s<=28;s++){
							this.days.push(s)
						}
					}
				}else if(
					inMonth == 0 ||
					inMonth == 2 ||
					inMonth == 4 ||
					inMonth == 6 ||
					inMonth == 7 ||
					inMonth == 9 ||
					inMonth == 11 
				){
					// 如果为1,3,5,7,8,10,12月份为31天
					for(let s=1;s<=31;s++){
						this.days.push(s)
					}
				}else {
					// 其他月份为30天
					for(let s=1;s<=30;s++){
						this.days.push(s)
					}
				}
			}
		}
	}
</script>
<style lang="scss">
	.actions{
		width: 100%;
		position: absolute;
		background-color: rgba(0,0,0,0.1);
		bottom: 0;
		/* #ifdef H5 */
		min-height: calc(100vh - 44px);
		/* #endif */
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
	}
	.mask{
		width: 100%;
		/* #ifdef H5 */
		height: calc(100vh - 640rpx - 44px);
		/* #endif */
		/* #ifndef H5 */
		height: calc(100vh - 640rpx);
		/* #endif */
	}
	.tabBar{
		width: 90%;
		padding: 2% 5%;
		background-color: #FFFFFF;
		display: flex;
		height: 40rpx;
		line-height: 40rpx;
		view{
			width: 50%;
		}
		.left{
			color: #14ADF9;
		}
		.right{
			text-align: right;
			color: #09BB07;
		}
	}
	picker-view {
		background-color: #FFFFFF;
	    width: 100%;
	    height: 600rpx;
		picker-view-column{
			width: 100%;
			text-align: center;
		}
		
	}
</style>