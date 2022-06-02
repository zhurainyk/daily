{
    /**
     * @param name 电梯年龄分布
     */
    var myChart = echarts.init(document.getElementById("main"));
    var xData = ["1-3年", "4-6年", "7-9年", "10-12年", "12-15年", "超15年"],
      yData = [20, 30, 40, 50, 70, 80, 100, 44, 99];
    var min = 0;
    var max = 100;
    const option = {
      // backgroundColor: "#111c4e",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            opacity: 0,
          },
        },
        backgroundColor: "rgba(255,255,255,.5)",
        //   formatter: ' {a0} <br /> {b0}: {c0}% '
        formatter: function (param) {
          console.log(param);
          return `<h3 >${param[0].seriesName}</h3> <span>${param[0].name} ：</span> <span style='color:red'>${param[0].data}  </span>`;
        },
      },
  
      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        top: "0%",
        height: "100%",
        containLabel: true,
        z: 22,
      },
      xAxis: [
        {
          type: "category",
          gridIndex: 0,
          data: xData,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: "#0c3b71",
            },
          },
          axisLabel: {
            show: true,
            color: "rgb(170,170,170)",
            fontSize: 16,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          gridIndex: 0,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          min,
          max,
          axisLine: {
            lineStyle: {
              color: "#0c3b71",
            },
          },
          axisLabel: {
            color: "rgb(170,170,170)",
            formatter: "{value} %",
            show: false,
          },
        },
        {
          type: "value",
          gridIndex: 0,
          min,
          max,
          splitNumber: 12,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
            },
          },
        },
      ],
      series: [
        {
          name: "电梯年龄分布",
          type: "bar",
          barWidth: "20%",
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              barBorderRadius: [6, 6, 0, 0],
              color: function (params) {
                const color = [
                  "#FED52F",
                  "#23FFFC",
                  "#009AFC",
                  "#B149FF",
                  "#FF6882",
                  "#FF6882",
                ];
                return color[params.dataIndex];
              },
              //渐变色
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //   {
              //     offset: 0,
              //     color: "#00feff"
              //   },
              //   {
              //     offset: 0.5,
              //     color: "#027eff"
              //   },
              //   {
              //     offset: 1,
              //     color: "#0286ff"
              //   }
              // ])
            },
          },
          data: yData,
          zlevel: 11,
        },
        //   {
        //     name: "背景",
        //     type: "bar",
        //     barWidth: "50%",
        //     xAxisIndex: 0,
        //     yAxisIndex: 1,
        //     barGap: "-135%",
        //     data: [100, 100, 100, 100, 100, 100, 100],
        //     itemStyle: {
        //       normal: {
        //         color: "rgba(255,255,255,0.1)"
        //       }
        //     },
        //     zlevel: 9
        //   }
      ],
    };
    myChart.setOption(option);
  }
  {
    /**
     * @param name 电梯场所类型分布
     */
    var myChart = echarts.init(document.getElementById("main"));
    var xData = [
        "住宅",
        "其他",
        "特定",
        "商场超时",
        "办公区域",
        "宾馆饭店",
        "医院",
        "政府机构",
        "学习",
        "文体娱乐馆",
        "交通场所",
      ],
      yData = [4310, 2000, 4000, 6000, 8000, 10000, 333, 4444, 5555, 6667, 2234];
    var min = 0;
    var max = 10000;
    const option = {
      // backgroundColor: "#111c4e",
      color: "#29D1F9",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            opacity: 0,
          },
        },
        backgroundColor: "rgba(255,255,255,.5)",
        //   formatter: ' {a0} <br /> {b0}: {c0}% '
        formatter: function (param) {
          console.log(param);
          return `<h3 >${param[0].seriesName}</h3> <span>${param[0].name} ：</span> <span style='color:red'>${param[0].data}  </span>`;
        },
      },
  
      grid: {
        left: "0%",
        right: "5%",
        bottom: "15%",
        top: "5%",
        height: "80%",
        containLabel: true,
        z: 22,
      },
      xAxis: [
        {
          type: "category",
          gridIndex: 0,
          data: xData,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: "#0c3b71",
            },
          },
          axisLabel: {
            show: true,
            color: "rgb(0,0,0)",
  
            fontSize: 10,
            rotate: -30,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          gridIndex: 0,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          min,
          max,
          axisLine: {
            lineStyle: {
              color: "#0c3b71",
            },
          },
          axisLabel: {
            color: "rgb(170,170,170)",
            //   formatter: "{value} %",
            show: true,
          },
        },
        {
          type: "value",
          gridIndex: 0,
          min,
          max,
          splitNumber: 2,
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"],
            },
          },
        },
      ],
      series: [
        {
          name: "电梯年龄分布",
          type: "bar",
          barWidth: "40%",
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              barBorderRadius: [6, 6, 0, 0],
              // color: function(params) {
              //   const color = [
              //     "#FED52F",
              //     "#23FFFC",
              //     "#009AFC",
              //     "#B149FF",
              //     "#FF6882",
              //     "#FF6882"
              //   ];
              //   return color[params.dataIndex];
              // }
              //渐变色
              // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              //   {
              //     offset: 0,
              //     color: "#00feff"
              //   },
              //   {
              //     offset: 0.5,
              //     color: "#027eff"
              //   },
              //   {
              //     offset: 1,
              //     color: "#0286ff"
              //   }
              // ])
            },
          },
          data: yData,
          zlevel: 11,
        },
        //   {
        //     name: "背景",
        //     type: "bar",
        //     barWidth: "50%",
        //     xAxisIndex: 0,
        //     yAxisIndex: 1,
        //     barGap: "-135%",
        //     data: [100, 100, 100, 100, 100, 100, 100],
        //     itemStyle: {
        //       normal: {
        //         color: "rgba(255,255,255,0.1)"
        //       }
        //     },
        //     zlevel: 9
        //   }
      ],
    };
    myChart.setOption(option);
  }
  {
    /**
     * @param name 电梯品牌分布
     */
    onMounted(() => {
      var myChart = echarts.init(document.getElementById("main"));
      var xData = [
          "西莱特",
          "威斯特",
          "迅达",
          "曼斯顿",
          "奥的斯",
          "西奥",
          "富士",
          "快意",
        ],
        yData = [122, 33, 33, 44, 55, 66, 66, 234];
      var min = 0;
      var max = 10000;
  
      const option = {
        backgroundColor: "#003366",
        grid: {
          left: "2%",
          right: "2%",
          bottom: "2%",
          top: "2%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
          },
          formatter: function (params) {
            return params[0].name + " : " + params[0].value;
          },
        },
        xAxis: {
          show: false,
          type: "value",
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            data: xData,
          },
          {
            type: "category",
            inverse: true,
            axisTick: "none",
            axisLine: "none",
            show: false,
            axisLabel: {
              textStyle: {
                color: "#ffffff",
                fontSize: "12",
              },
            },
            data: yData,
          },
        ],
        dataZoom: {
          show: true,
          // type: 'slider',
          realtime: true,
          // height: 10,
          // start: 0,
          // end: 80,
          textStyle: false,
          //   filterMode: "empty",
          type: "slider",
          yAxisIndex: [0],
          start: 0,
          end: 80,
          width: 10,
          height: "80%",
          zoomLoxk: true,
          //   handleStyle:{
          //       color:#fff,
          //       shadowBlur:3,
          //       shadowColor:'rgba(0,0,0,.3)',
          //   }
          //   left: "95%"
        },
        series: [
          {
            name: "值",
            type: "bar",
            zlevel: 1,
            itemStyle: {
              normal: {
                barBorderRadius: 4,
  
                label: {
                  //在柱状图挨着显示文字
                  show: true,
                  position: "right",
                  color: "#F0F0F0",
                },
  
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#58E3FD",
                  },
                  {
                    offset: 1,
                    color: "#1796FF",
                  },
                ]),
              },
            },
            barWidth: 8,
            data: yData,
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            barGap: "-200%",
            data: xData,
            itemStyle: {
              normal: {
                color: "rgba(24,31,68,1)",
                barBorderRadius: 4,
              },
            },
          },
        ],
      };
      myChart.setOption(option);
    });
  }