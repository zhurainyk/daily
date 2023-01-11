<template>
	<view style="height: 750upx">
		<l-echart ref="chart" style='z-index: 0;'></l-echart>
	</view>
</template>

<script>
	import {
		dateformat
	} from '@/utils/common.js'
	import * as echarts from '@/uni_modules/lime-echart/static/echarts.min'
	const option1 = {
		title: {
			text: '',
			textStyle: {
				align: 'center',
				color: '#fff',
				fontSize: 16,
			},
			top: '0%',
			left: '3%',
		},
		backgroundColor: '#0f375f',
		grid: {
			top: "18%",
			bottom: "12%" //也可设置left和right设置距离来控制图表的大小
		},
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
				label: {
					show: true
				}
			}
		},
		legend: {
			data: ["消费走势", "消费金额"],
			top: "10%" ,
			textStyle: {
				color: "#ffffff"
			}
		},
		dataZoom: [{
			type: 'slider',
			xAxisIndex: 0,
			startValue: 0,
			endValue: 6,
			show: true,
			borderColor: 'transparent',
			borderCap: 'round',
			zoomLock: true,
			brushSelect: false,
			borderColor: 'transparent',
			borderCap: 'round',
			zoomOnMouseWheel: true,
			//组件高度
			height: 12,
			left: 5, //左边的距离
			right: 5, //右边的距离

			bottom: 2, //右边的距离
			fillerColor: 'rgba(27,90,169,1)',
			// handleIcon: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5M36.9,35.8h-1.3z M27.8,35.8 h-1.3H27L27.8,35.8L27.8,35.8z',// 画一个圆形
			handleSize: '100%',
			handleStyle: {
				color: 'rgba(27,90,169,1)',
				borderWidth: 0
			},
			backgroundColor: 'rgba(37, 46, 100, 0.8)', //两边未选中的滑动条区域的颜色
			showDataShadow: false, //是否显示数据阴影 默认auto
			showDetail: false, //即拖拽时候是否显示详细数值信息 默认true
			filterMode: 'filter'
		}],
		xAxis: {
			data: [],
			axisLine: {
				show: true, //隐藏X轴轴线
				lineStyle: {
					color: '#01FCE3'
				}
			},
			axisTick: {
				show: true //隐藏X轴刻度
			},
			axisLabel: {
				show: true,
				textStyle: {
					color: "#ebf8ac" //X轴文字颜色
				},
				fontSize: 10,
				rotate: -30,
			},
		},
		yAxis: [{
				type: "value",
				name: "元",
				nameTextStyle: {
					color: "#ebf8ac"
				},
				splitLine: {
					show: false
				},
				axisTick: {
					show: true
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#FFFFFF'
					}
				},
				axisLabel: {
					show: true,
					textStyle: {
						color: "#ebf8ac"
					}
				},

			},
			{
				type: "value",
				name: "",
				nameTextStyle: {
					color: "#ebf8ac"
				},
				position: "right",
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisLabel: {
					show: true,
					formatter: "{value} ", //右侧Y轴文字显示
					textStyle: {
						color: "transparent"
					}
				}
			},
			{
				type: "value",
				gridIndex: 0,
				min: 50,
				max: 100,
				splitNumber: 8,
				splitLine: {
					show: false
				},
				axisLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLabel: {
					show: false
				},
				splitArea: {
					show: true,
					areaStyle: {
						color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
					}
				}
			}
		],
		series: [{
				name: "消费走势",
				type: "line",
				yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
				smooth: true, //平滑曲线显示
				showAllSymbol: true, //显示所有图形。
				symbol: "circle", //标记的图形为实心圆
				symbolSize: 8, //标记的大小
				itemStyle: {
					//折线拐点标志的样式
					color: "#058cff",
					normal: {
						barBorderRadius: 4,
						label: {
							//在柱状图挨着显示文字
							show: true,
							position: "top",
						},
					},
				},
				lineStyle: {
					color: "#058cff"
				},
				areaStyle: {
					color: "rgba(5,140,255, 0.2)"
				},
				data: []
			},
			{
				name: "消费金额",
				type: "bar",
				barWidth: 15,
				itemStyle: {
					normal: {
						barBorderRadius: 4,
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
								offset: 0,
								color: "#00FFE3"
							},
							{
								offset: 1,
								color: "#4693EC"
							}
						])
					}
				},
				data: []
			}
		]
	}
	export default {
		props: ['xData', 'yData', 'total', 'title'],
		data() {
			return {
				 
			}
		},
		computed: {
			_list: {
				set(v) {
					console.log({
						v
					})
				},
				get() {
					return {
						xData: this.xData,
						yData: this.yData
					}
				}
			} 
		},
		watch: {
			_list: {
				handler(v) {
					if (!v.xData.length) return
					this.start()
				},
				immediate: true,
				deep: true
			}
		},
		methods: {
			start() {
				option1.title.text = this.title || dateformat(new Date().getTime())
				option1.xAxis.data = this.xData
				option1.series[0].data = this.yData
				option1.series[1].data = this.yData
				this.$refs.chart.init(echarts, chart => {
					chart.setOption(option1);
				});
			}
		},
		mounted() {

		}
	}
</script>
