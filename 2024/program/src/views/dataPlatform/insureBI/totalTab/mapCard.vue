<template>
    <div class="border">
        <div :style="{ width: width }" id="eMap" ref="eMap"></div>
        <div class="mapChoose">
            <span v-for="(item, index) in parentInfo" :key="item.code">
                <span class="title" @click="chooseArea(item, index)">{{ item.cityName == '全国' ? '全国' : item.cityName
                }}</span>
                <span class="icon" v-show="index + 1 != parentInfo.length">></span>
            </span>
        </div>
        <div ref="listdom" class="projectlist" v-show="tipsShow">
            <input class="input" v-if="_projectList.length > 6 && tipsShow" type="text" @input="filterProject">
            <div v-loading="loading" :style="{ height: _projectList.length > 6 ? '178px' : '100%' }">
                <div @click="toCustomer(x.projectId)" v-for="x in projectList" :key="x.projectId">
                    <span>{{ x.projectName }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getCityInfo, getDataByPlaceCode } from '@/api/module/dataPlatform'
import { ref, onMounted, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import { UserSearch } from '@/module.ts/search/usersearch'
const props = defineProps({
    data: {
        type: String,
        default: ''
    },
})
const store = useStore()
const Router = useRouter()
const toCustomer = (e) => {
    // 1524688836977201127
    store.commit('CHANGEPRO', e)
    Router.push({
        name: 'CustomerBi'
    })
}
const tipsShow = ref(false)
const projectList = ref([])
const _projectList = ref([])
let timer
let loading = ref(false)
const filterProject = (e) => {
    if (timer) {
        clearTimeout(timer)
    }
    loading.value = true
    timer = setTimeout(() => {
        projectList.value = _projectList.value.filter(x => {
            if (x.projectName.indexOf(e.target.value) > -1 || x.projectId.indexOf(e.target.value) > -1) {
                return true
            } else {
                return false
            }
        })
        loading.value = false
    }, 500)
}
const listdom = ref(null)
onMounted(() => {
    // document.getElementById('eMap').addEventListener('click', (e)=>{
    //     console.log(e)
    //     mousePosition.x = e.clientX ;
    //     mousePosition.y = e.clientY


    //     console.log({mousePosition})
    //     console.log('时间1：',new Date().getTime())


    //     setTimeout(()=>{
    //         console.log('时间3：',new Date().getTime())
    //         const offsetX = listdom.value.clientWidth;
    //         const offsety = listdom.value.clientHeight;
    //         if(width.value === '710px'){
    //             listdom.value.style.left = `${mousePosition.x-300-offsetX/2}px`
    //             listdom.value.style.top = `${mousePosition.y}px`
    //         }else{
    //             listdom.value.style.left = `${mousePosition.x - offsetX/2}px`
    //             listdom.value.style.top = `${mousePosition.y}px`
    //         } 
    //     })
    // }) 
})
const sleep = (t = 500) => {
    return new Promise(res => {
        setTimeout(() => {
            res(1)
        })
    }, t)
}

const width = ref('710px')

const isFullscreen = computed(() => store.state.menu.fullsreen)
watch(
    () => isFullscreen,
    (newVal) => {
        tipsShow.value = false
        if (newVal.value) {
            width.value = '850px'

        } else {
            width.value = '710px'
        }
        setTimeout(() => {
            if (!mapData) return
            console.log('-----------重绘地图------------')

            initEcharts(mapData)
        })
    },
    {
        deep: true,
        immediate: true
    }
)
const companyId = computed(() => props.data)
let geoJson = reactive({
    features: []
})
let maploading = null;
let parentInfo = reactive([{
    cityName: "全国",
    code: 100000
}])
let echartsDom = ref('')

const CQ_gps = [106.504962, 29.533155];


watch(companyId, v => {
    if (v) {
        setTimeout(() => {
            getGeoJson(100000, { placeCode: '', level: '', companyType: '02', companyId: v })
        });
    }
},
    {
        immediate: true,
        deep: true
    })
const getGeoJson = (adcode, params = { placeCode: '', level: '', companyType: '02', companyId: companyId.value }) => {
    maploading = $loading('#platform-layout')
    AMapUI.loadUI(["geo/DistrictExplorer"], DistrictExplorer => {
        var districtExplorer = new DistrictExplorer();
        districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
            if (error) {
                console.error(error);
                return;
            }
            let Json = areaNode.getSubFeatures();
            if (adcode == 100000) {//重置数据
                Json.map(x => {
                    x.properties.elevatorTotal = undefined
                    x.properties.projectTotal = undefined
                    return x
                })
            }
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
let mapData
const getMapData = async (params) => {
    try {
        const cityList = await getCityInfoApi(params)
        mapData = geoJson.features.map(item => {
            cityList.forEach(city => {
                if (item.properties.adcode == city.cityCode) {
                    item.properties.elevatorTotal = city.elevatorTotal
                    item.properties.projectTotal = city.projectTotal
                    item.properties.cityLevel = city.level
                    item.properties.projectList = city.projectList
                }
            })
            return {
                name: item.properties.name,
                value: [item.properties.center[0], item.properties.center[1]],// [经度，纬度，值]    
                cityCode: item.properties.adcode,
                projectTotal: item.properties.projectTotal || 0, //地图显示数据来源 
                elevatorTotal: item.properties.elevatorTotal || 0,
                level: item.properties.level,
                cityLevel: item.properties.cityLevel,
                projectList: item.properties.projectList

            };
        });
        initEcharts(mapData);
    } catch (e) {
        console.log('报错：', e)
    } finally {
        maploading.close()
    }

}

var convertToLineData = function (data, gps) {
    const res = [];
    for (let i = 0; i < data.length; i++) {

        const dataItem = data[i];

        const fromCoord = dataItem.value;
        const toCoord = gps; //郑州
        //  var toCoord = geoGps[Math.random()*3]; 
        if (fromCoord && toCoord && dataItem.elevatorTotal > 0 && parentInfo.length === 1) {
            res.push([{
                coord: fromCoord,
                value: fromCoord,
                name: dataItem.name,
                elevatorTotal: dataItem.elevatorTotal,
                projectTotal: dataItem.projectTotal,
                projectList: dataItem.projectList,


            }, {
                coord: toCoord,
            }]);
        }
    }
    return res;
};
const initEcharts = (mapData) => {
    var min = mapData[mapData.length - 1].value;
    var max = mapData[0].value;
    if (mapData.length === 1) {
        min = 0;
    }
    console.log('地图数据：', mapData)
    document.getElementById('eMap').setAttribute('_echarts_instance_', '')
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
                console.log({ p })
                let txtCon = `
                    <div style=' padding:5px 20px'>所在城市 : <span style='color:#23FFFC'>${p.data.name}</span> </div>
                    <div style=' padding:5px 20px'>项目数量 : <span style='color:#23FFFC'>${p.data.projectTotal}</span> </div> 
                    <div style=' padding:5px 20px'>电梯数量 : <span style='color:#23FFFC'>${p.data.elevatorTotal}</span></div>`;

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

        series: [
            {
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
            //地图线的动画效果
            // {
            //     type: 'lines',
            //     zlevel: 0,
            //     effect: {
            //         show: true,
            //         period: 1, //箭头指向速度，值越小速度越快
            //         trailLength: 0.5, //特效尾迹长度[0,1]值越大，尾迹越长重
            //         symbol: 'arrow', //箭头图标
            //         symbolSize: 3, //图标大小
            //     },
            //     lineStyle: {
            //         normal: {
            //             color: "#23FFFC",//colors[colorIndex][n],
            //             width: 0.1, //尾迹线条宽度
            //             opacity: 0, //尾迹线条透明度
            //             curveness: .3 //尾迹线条曲直度
            //         }
            //     },
            //     data: convertToLineData(mapData, CQ_gps)
            // },
        ]
    },
        true
    );
    let click_type = false

    echartsDom.value.off("click");
    echartsDom.value.off("dblclick");
    echartsDom.value.on("click", (params) => {
        click_type = false
        setTimeout(() => {
            if (click_type) return
            console.log(params)
            const datax = echartsDom.value.convertFromPixel('geo', [params.event.event.offsetX, params.event.event.offsetY])
            console.log(JSON.stringify(datax))
            const lastCode = parentInfo[parentInfo.length - 1].code
            console.log('点击：', parentInfo[parentInfo.length - 1], params?.data, lastCode)
            tipsShow.value = false;
            projectList.value = []
            if (
                parentInfo[parentInfo.length - 1].code ==
                params?.data?.cityCode
            ) {
                console.log('显示弹窗列表项目数据：')
                if (width.value === '710px') {
                    listdom.value.style.left = `${params.event.event.clientX - 300}px`
                    listdom.value.style.top = `${params.event.event.offsetY + 10}px`
                } else {
                    listdom.value.style.left = `${params.event.event.clientX}px`
                    listdom.value.style.top = `${params.event.event.offsetY + 10}px`
                }

                if (params.data.projectList.length) {
                    projectList.value = params.data.projectList
                    tipsShow.value = true
                }

                return;
            }

            let data = params.data;
            if (data) {
                if (!data.cityCode) return
                parentInfo.push({
                    cityName: data.name,
                    code: data.cityCode
                });
                console.log('默认数据：', data)

                getGeoJson(data.cityCode, { placeCode: data.cityCode, level: data.cityLevel, companyType: '02', companyId: companyId.value });
            } else {
                geoJson.features.forEach(item => {
                    if (item.properties.name == params.name) {
                        console.log('点击数据：', { item, parentInfo })
                        if (lastCode != item.properties.adcode && item.properties.adcode) {
                            parentInfo.push({
                                cityName: item.properties.name,
                                code: item.properties.adcode
                            });
                            getGeoJson(item.properties.adcode);
                        }

                    }
                })
            }
        }, 200)
    });
    echartsDom.value.on('dblclick', (params) => {
        click_type = true
        console.log('双击事件', params)
        tipsShow.value = false;
        projectList.value = []
        if (width.value === '710px') {
            listdom.value.style.left = `${params.event.event.clientX - 300}px`
            listdom.value.style.top = `${params.event.event.offsetY + 10}px`
        } else {
            listdom.value.style.left = `${params.event.event.clientX}px`
            listdom.value.style.top = `${params.event.event.offsetY + 10}px`
        }

        if (params.data.projectList.length) {
            projectList.value = params.data.projectList
            tipsShow.value = true
        }
    })

}
const chooseArea = (val, index) => {
    tipsShow.value = false;
    if (parentInfo.length === index + 1) {
        return
    }
    parentInfo.splice(index + 1)
    getGeoJson(parentInfo[parentInfo.length - 1].code);

}
const getCityInfoApi = (cityInfo) => {
    return new Promise((res, rej) => {
        getDataByPlaceCode(cityInfo).then(r => {
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
.border {
    width: 100%;
    height: 100%;
    position: relative;

    #eMap {
        width: 710px;
        height: 980px;
        margin: 0 auto;
    }
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

.projectlist {
    position: fixed;
    top: 0;
    left: 0;
    width: 220px;
    height: 230px;
    color: #fff;
    background-color: rgba(0, 0, 0, .5);
    border: 1px solid rgb(54, 255, 251);
    border-radius: 5px;
    box-sizing: border-box;
    padding: 10px;
    z-index: 999;

    div {
        text-indent: 20px;
        padding: 8px 0;
        font-size: 14px;
        overflow-y: auto;
        box-sizing: border-box;


        span {
            background: linear-gradient(to right, #23FFFC, #23FFFC) no-repeat right bottom;
            background-size: 0 1px;
            padding-bottom: 2px;
            transition: background-size 500ms;
        }

        span:hover {
            cursor: pointer;
            background-size: 100% 1px;
            background-position-x: left;
        }

    }

    .input {
        outline: none;
        border: 1px solid rgb(54, 255, 251);
        border-radius: 3px;
        background: transparent;
        color: rgb(54, 255, 251);
        width: 95%;
        margin-bottom: 5px;
    }
}
</style>