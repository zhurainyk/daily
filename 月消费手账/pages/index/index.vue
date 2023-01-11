<template>
	<view class="container">
		<view class="tab">
			<view class="label">
				<text>
					{{dateType?'日期':'月份'}}：
				</text>
				<view class='icon' @click='changeDateType'></view>
			</view>
			<view class="value">
				<uni-datetime-picker v-if='dateType' v-model="daterange" type="daterange" @change='changeTime'
					rangeSeparator="至" />
				<picker v-else mode="date" fields="month" :value="daterange" @change="changeMonth">
					<view class="uni-input">{{daterange}}</view>
				</picker>

	

			</view>
		</view>
		<view class='tab'>
			<view class="label">
				账单详情：
			</view>
			<textarea class='value' v-model='text'   maxlength='-1' confirm-type='确定' @input='confirm' @confirm='confirm'
				placeholder-style='color:#ccc'
				placeholder="请粘贴或输入账单详情  示例:小面7买烟20买水4    or   小面7,买烟20,买水4     or    小面7 买烟20,买水4  " />
		</view>

		<view class='flex'>
			<button class='primary left'   size='mini' @tap='clear'>清空</button>
			<button class='primary right' type='primary' size='mini' @tap='go'>确定</button>
		</view>
		<view class='tab'>
			<view class="label">
				历史记录：
			</view>
			<view class="value content" v-if='history.length'>
				<view class="history" v-for='(x,y) in history' :key='y'>
					<view class="label" @click='()=>goHistory(x)'>{{x.title}}</view>
					<view class='delete' @click.stop='deleteFn(y)'>删除</view>
				</view>
			</view>

		</view>
		<button class='primary right' v-if='history.length>1' size='mini' type='primary' @click='calcTotal'>统计</button>
	</view>
</template>

<script>
	export default {
		comments: {

		},
		data() {
			return {
				text:'',
				dateType: true,
				xData: [],
				yData: [],
				total: '',
				title: '',
				daterange: [],
				history: [],
				history_: []
			}
		},
		onLoad() {
			const t = this;
			uni.getStorage({
				key: 'history',
				success(e) {
					console.log('成功', e)
					if (e.data) {
						t.history = JSON.parse(e.data)
					}
				},
				fail(e) {
					console.log('失败', e)
				}
			})
			uni.getStorage({
				key: 'history_',
				success(e) {
					console.log('成功', e)
					if (e.data) {
						t.history_ = JSON.parse(e.data)
					}
				},
				fail(e) {
					console.log('失败', e)
				}
			})
		},
		methods: {
	 
			clear(){
				this.text = ''
			},
			getCurrentMonth() {
				const date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				month = month > 9 ? month : '0' + month
				return `${year}-${month}`
			},
			changeTime(e) {
				console.log(e)
				this.daterange = e;
			},

			changeMonth(e) {
			 
				this.daterange = e.detail.value;
			},
			changeDateType() {
				this.dateType = !this.dateType;
				if (this.dateType) {
					this.daterange = []
				} else {
					this.daterange =   this.getCurrentMonth()
				}
			},
			goHistory(x) {
				uni.navigateTo({
					url: `/pages/index/graph?xData=${JSON.stringify(x.xData)}&yData=${JSON.stringify(x.yData)}&title=${x.title}`
				})
			},
			calcTotal() {
				const o = {
					xData: [],
					yData: [],
					total: 0,
					title: '历史汇总统计'
				}
				this.history.forEach(x => {
					o.xData.push(x.title)
					const yData = x.total || x.yData.reduce((p, c) => p + Number(c), 0)
					o.yData.push(yData)
					o.total += yData;
				})
				o.title += o.total + '元'
				uni.navigateTo({
					url: `/pages/index/graph?xData=${JSON.stringify(o.xData)}&yData=${JSON.stringify(o.yData)}&title=${o.title}`
				})

			},
			deleteFn(index) {
				this.history.splice(index, 1)
			},
			setHistory(item) {
				this.history.unshift({
					title: item.title,
					total: item.total || item.yData.reduce((p, c) => p + Number(c), 0),
					xData: item.xData,
					yData: item.yData,
					timestamp: new Date().getTime(),
				})
				this.history_.unshift({
					title: item.title,
					total: item.total || item.yData.reduce((p, c) => p + Number(c), 0),
					xData: item.xData,
					yData: item.yData,
					timestamp: new Date().getTime(),
				})
				uni.setStorage({
					key: 'history',
					data: JSON.stringify(this.history)
				})
				uni.setStorage({
					key: 'history_',
					data: JSON.stringify(this.history_)
				})
			},
			go() {
				if ((this.daterange.length != 2 && this.dateType) || (!this.dateType && !this.daterange)) return uni
					.showToast({
						title: '选择日期/月份',
						icon: 'error'
					})
				if (!this.xData.length || this.xData.length != this.yData.length) {
					return uni.showToast({
						title: '请输入账单详情',
						icon: 'error'
					})
				}
				if (this.dateType) {
					this.title = `${this.daterange[0]}至${this.daterange[1]}总消费${this.total}元`
				} else {
					this.title = `${this.daterange }月份总消费${this.total}元`
				}

				const t = this
				this.setHistory({
					title: this.title,
					xData: this.xData,
					yData: this.yData
				})
				uni.navigateTo({
					url: `/pages/index/graph?xData=${JSON.stringify(t.xData)}&yData=${JSON.stringify(t.yData)}&title=${t.title}`
				})
			},
			changeEvent(v) {

			},
			confirm(e) {
				const value = e.detail.value
				if (value) {
					let result = this.analyser(value)
					console.log(result)
					this.yData = result.valueList
					this.xData = result.labelList
					this.total = result.total;
				}
			},
			analyser(str, key = 'label', value = 'value') {
				const regNum = /\d+(\.?\d+)?/g
				const numArr = str.match(regNum);
				const strArr = str.replace(regNum, '-').split('-').filter(e => e);
				let list = []
				const shiftX = (s) => {
					const filter = [',', '，', '\n'];
					let index = 0;
					filter.forEach((x, i) => {
						if (s.indexOf(x) > -1) {
							s = s.replace(new RegExp(filter[i]), '')
						}
					})
					return s
				}
				const valueList = [],
					labelList = []
				if (strArr.length === numArr.length) {
					numArr.forEach((item, index) => {
						let o = {
							[key]: shiftX(strArr[index]),
							[value]: item
						}
						valueList.push(o[value])
						labelList.push(o[key])
						list.push(o)
					})
				}
				return {
					total: numArr.reduce((p, c) => p + Number(c), 0),
					valueList,
					labelList,
					list
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		box-sizing: border-box;
		padding: 10upx;

		.tab {
			margin-bottom: 20upx;

			.label {
				display: flex;
				justify-content: space-between;
				padding-bottom: 10upx;

				text {
					color: #000;
				}

				.icon {
					width: 50upx;
					height: 50upx;
					background: url('../../static/images/switch.png') no-repeat center/cover;
				}

			}

			.value {
				width: 100%;
				border-radius: 10upx;
				box-sizing: border-box;
				padding: 10upx;
				color: #666;
				border: 1px solid #ccc;
			}

			.value.content {
				max-height: 444upx;
				overflow: scroll;
			}
		}
		.flex{
			display:flex;
			justify-content: space-between;
			margin-bottom: 20upx;
		}
		.primary {
			width: 180upx;
			margin:0;
		}

		.primary.right {
		 
			width: 180upx;
		}

		.history {
			box-sizing: border-box;

			display: flex;
			justify-content: space-between;
			align-items: center;

			.label {
				width: 90%;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				color: #666;
				font-size: 30upx;

				padding: 10upx 0;
			}

			.delete {
				color: #d00;
				font-size: 25upx;
				padding: 0 10upx;
				text-align: center;
				padding: 10upx 0;
			}
		}
	}
</style>
