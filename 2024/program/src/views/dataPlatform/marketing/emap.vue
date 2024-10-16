<template>
    <div class="mapecharts">
        <div style="width:800px;height:980px;margin:0 auto; " id="eMap" ref="eMap"></div>
        <div class="mapChoose">
            <span v-for="(item, index) in parentInfo" :key="item.code">
                <span class="title" @click="chooseArea(item, index)">{{ item.cityName == '全国' ? '全国' : item.cityName
                }}</span>
                <span class="icon" v-show="index + 1 != parentInfo.length">></span>
            </span>
        </div>
    </div>
</template>

<script setup>
import { getCityInfo } from '@/api/module/dataPlatform'
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'

let geoJson = reactive({
    features: []
})
let maploading = null;
let parentInfo = reactive([{
    cityName: "全国",
    code: 100000
}])
let echartsDom = ref('')
let geoCoordMap = {}
var geoGpsMap = {
    '1': [108.384366, 30.439702],
};
var d1 = {
    '江苏': 10041,
    '黑龙江': 4093,
    '内蒙古': 1157,
    '吉林': 4903,
    '北京市': 2667,
    '辽宁': 8331,
    '河北': 23727,
    '天津': 681,
    '山西': 5352,
    '陕西': 38,
    '甘肃': 77,
    '宁夏': 65,
    '青海': 10,
    '新疆': 193,
    '四川': 309,
    '重庆': 77,
    '山东': 21666,
    '河南': 15717,
    '安徽': 15671,
    '湖北': 3714,
    '浙江': 3141,
    '福建': 955,
    '江西': 4978,
    '湖南': 778,
    '贵州': 33,
    '云南': 149,
    '广东': 1124,
    '广西': 125,
    '海南': 7,
    '上海': 2155,

};
var colors = 'rgb(46,233,183)'


var moveData = [];

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
var convertToLineData = function (data, gps) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var toCoord = geoCoordMap[dataItem.name];

        var fromCoord = gps; //郑州
        //  var toCoord = geoGps[Math.random()*3]; 
        if (fromCoord && toCoord) {
            res.push([{
                coord: fromCoord,
                value: dataItem.value
            }, {
                coord: toCoord,
            }]);
        }
    }
    return res;
};
onMounted(() => {
    console.log('地图加载。。。。。。。。。。。。')
    getGeoJson(100000)

})
const getGeoJson = (adcode, params = { placeCode: '', level: '' }) => {
    maploading = $loading('#platform-layout')
    AMapUI.loadUI(["geo/DistrictExplorer"], DistrictExplorer => {
        var districtExplorer = new DistrictExplorer();
        districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
            if (error) {
                console.error(error);
                return;
            }
            let Json = areaNode.getSubFeatures();
            if (Json.length > 0) {
                geoJson.features = Json;
            } else if (Json.length === 0) {
                geoJson.features = geoJson.features.filter(
                    item => item.properties.adcode == adcode
                );
                if (geoJson.features.length === 0) return;
            }

            getMapData(params);
        });
    });
}
const getMapData = async (params) => {
    try {
        const cityList = await getCityInfoApi(params)
        console.log('城市数据：', cityList)
        let mapData = geoJson.features.map(item => {
            cityList.forEach(city => {
                if (item.properties.adcode == city.cityCode) {
                    item.properties.elevatorTotal = city.elevatorTotal
                    item.properties.projectTotal = city.projectTotal
                    item.properties.cityLevel = city.level
                }
            })
            return {
                name: item.properties.name,
                value: [item.properties.center[0], item.properties.center[1]],// [经度，纬度，值]    
                cityCode: item.properties.adcode,
                projectTotal: item.properties.projectTotal || 0, //地图显示数据来源 
                elevatorTotal: item.properties.elevatorTotal || 0,
                level: item.properties.level,
                cityLevel: item.properties.cityLevel

            };
        });
        initEcharts(mapData);
    } catch (e) {
        console.log('报错：', e)
    } finally {
        maploading.close()
    }

}
const initEcharts = (mapData) => {
    var min = mapData[mapData.length - 1].value;
    var max = mapData[0].value;
    if (mapData.length === 1) {
        min = 0;
    }
    console.log('地图数据：', mapData)
    echartsDom.value = echarts.init(document.getElementById('eMap'));
    echarts.registerMap("Map", geoJson); //注册
    echartsDom.value.setOption({
        timeline: {
            show: false
        },
        tooltip: {
            backgroundColor: 'rgba(0,0,0,.5)',
            color: '#fff',
            trigger: "item",
            formatter: p => {

                let txtCon = `<div style=' padding:5px 20px'>所在城市 : <span style='color:#23FFFC'>${p.name}</span> </div><div style=' padding:5px 20px'>项目数量 : <span style='color:#23FFFC'>${p.data.projectTotal}</span> </div> <div style=' padding:5px 20px'>电梯数量 : <span style='color:#23FFFC'>${p.data.elevatorTotal}</span></div>`;
                return txtCon;
            },
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            show: true,
            map: 'Map', //使用
            roam: true,
            itemStyle: {
                normal: {
                    show: true,
                    areaColor: "#579BEB",
                    borderColor: "#61D8E5",
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowColor: "rgb(58,115,192)",
                    shadowOffsetX: 1,
                    shadowOffsetY: 1
                },
                //emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                emphasis: {
                    show: false,
                    areaColor: "#7cd7fc",
                    borderWidth: 1.6,
                    shadowBlur: 15
                }
            },
            label: {
                normal: {
                    show: false,
                    color: "rgb(249, 249, 249)", //省份标签字体颜色
                    formatter: p => {
                        switch (p.name) {
                            case "内蒙古自治区":
                                p.name = "内蒙古";
                                break;
                            case "西藏自治区":
                                p.name = "西藏";
                                break;
                            case "新疆维吾尔自治区":
                                p.name = "新疆";
                                break;
                            case "宁夏回族自治区":
                                p.name = "宁夏";
                                break;
                            case "广西壮族自治区":
                                p.name = "广西";
                                break;
                            case "香港特别行政区":
                                p.name = "香港";
                                break;
                            case "澳门特别行政区":
                                p.name = "澳门";
                                break;
                            default:
                                break;
                        }
                        return p.name;
                    }
                },
                emphasis: {
                    show: false,
                    areaColor: "#7cd7fc",
                    borderWidth: 1.6,
                    shadowBlur: 15
                }
            },
            zoom: 1.15
        },

        series: [{
            name: 'name',
            type: 'effectScatter',
            data: mapData,
            coordinateSystem: 'geo',
            //这里可以设置点的大小
            symbolSize: function (val, p) {
                if (p.data.elevatorTotal + p.data.projectTotal > 0) {
                    return 15
                }
                return 0
            },
            showEffectOn: 'render', //高亮时显示特效
            rippleEffect: {
                brushType: 'fill'
            },
            hoverAnimation: false,
            label: {
                show: false,
                normal: {
                    formatter: p => {
                        return p.value[2].toFixed() + 'xx'
                    },
                    position: 'center', //地图上是否有文字
                    show: false,
                    textStyle: {
                        color: '#fff'
                    }
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    color: '#23FFFC' //地图点的颜色
                }
            },
            layoutCenter: ['40%', '50%'], //属性定义地图中心在屏幕中的位置，一般结合layoutSize 定义地图的大小
            layoutSize: 530
        },
        ]
    },
        true
    );

    echartsDom.value.off("click");
    echartsDom.value.on("click", (params) => {
        console.log('点击：', parentInfo[parentInfo.length - 1], params?.data)
        const lastCode = parentInfo[parentInfo.length - 1].code
        if (
            parentInfo[parentInfo.length - 1].code ==
            params?.data?.cityCode
        ) {
            return;
        }
        let data = params.data;
        if (data) {
            parentInfo.push({
                cityName: data.name,
                code: data.cityCode
            });
            console.log('默认数据：', data)
            getGeoJson(data.cityCode, { placeCode: data.cityCode, level: data.cityLevel });
        } else {
            geoJson.features.forEach(item => {
                if (item.properties.name == params.name) {
                    // if(item.properties.childrenNum == 0) return //防止多次添加
                    console.log('点击数据：', { item, parentInfo })

                    if (lastCode != item.properties.adcode) {
                        parentInfo.push({
                            cityName: item.properties.name,
                            code: item.properties.adcode
                        });
                        getGeoJson(item.properties.adcode);
                    }

                }
            })
        }

    });

}
const chooseArea = (val, index) => {
    if (parentInfo.length === index + 1) {
        return
    }
    parentInfo.splice(index + 1)
    console.log('切换：', parentInfo, index)
    getGeoJson(parentInfo[parentInfo.length - 1].code);

}
const getCityInfoApi = (cityInfo) => {
    return new Promise((res, rej) => {
        getCityInfo(cityInfo).then(r => {
            res(r.data.data)
        }, j => {
            rej(j)
        })
    })
}
const getCityParam = (cityCode, province) => {
    return {

    }
}

</script>

<style lang="scss" scoped>
.mapecharts {
    width: 100%;
    height: 100%;
    position: relative;
}

.mapChoose {
    position: absolute;
    left: 56px;
    top: 25px;
    color: #eee;


    .title {
        padding: 5px;
        border-top: 1px solid rgba(147, 235, 248, .8);
        border-bottom: 1px solid rgba(147, 235, 248, .8);
        cursor: pointer;
    }

    .icon {
        font-family: "simsun";
        font-size: 25px;
        margin: 0 11px;
    }
}
</style>