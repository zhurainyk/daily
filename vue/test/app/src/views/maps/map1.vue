<template>
  <div id="map-container"></div>
</template>

<script>
/*

layer：层
contorl：控件
feature：元素
interaction：交互
Vector：矢量的
Tile：瓦片
source：资源
format：转换
projection：投影
*/

/*

 瓦片层
  从OSM，Bing，MapBox，Stmen，以及你能找到的任何其他XYZ源中提取瓷砖。OGC映射服务和不固定层也支持。

  矢量层
  呈现GeoJSON、TpoJSON、KML、GML、Mapbox向量块和其他格式的矢量数据。


*/
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { XYZ, OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import {
  defaults as defaultInteractions,
  DragRotateAndZoom,Draw
} from "ol/interaction"; //旋转动画
import { defaults, FullScreen, MousePosition, ScaleLine } from "ol/control"; //控件
import Overlay from "ol/Overlay";

//显示图标
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Icon } from "ol/style";

//画矩形
import { createRegularPolygon, createBox } from 'ol/interaction/Draw'

//修改多边形
import { Modify } from 'ol/interaction'
export default {
  data() {
    return {
      mapObj: null
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      const tileLayer = new TileLayer({
        source: new XYZ({
          url:
            "https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
        })
      });
      this.mapObj = new Map({
        layers: [tileLayer],
        view: new View({
          center: fromLonLat([118.589678004, 34.34733]), //地图中心点[11864092.589678004, 3456516.7639334733]
          zoom: 7, // 缩放级别
          minZoom: 0, // 最小缩放级别
          maxZoom: 18, // 最大缩放级别
          constrainResolution: true // 因为存在非整数的缩放级别，所以设置该参数为true来让每次缩放结束后自动缩放到距离最近的一个整数级别，这个必须要设置，当缩放在非整数级别时地图会糊
        }),
        target: "map-container", // DOM容器
        interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
        controls: defaults().extend([
          new FullScreen(), // 全屏
          new MousePosition(), // 显示鼠标当前位置的经纬度
          new ScaleLine() // 显示比例尺
        ]) //旋转动画
      });


  let source = new VectorSource()
  let vector = new VectorLayer({
      source: source
  })
  this.mapObj.addLayer(vector)
  let draw = new Draw({
      source: source,
      type: 'Circle'//画圆
    //    source: source,
    // type: 'Polygon',//画矩形 没错，还是Circle
    // geometryFunction: createBox()
  })
  this.mapObj.addInteraction(draw)

let modify = new Modify({ //拖动多边形
    source
})
this.mapObj.addInteraction(modify)

// 获取当前地图区域上下左右四个点的经纬度
let range = this.mapObj.getView().calculateExtent(this.mapObjap.getSize())
console.log(range);
let state = {
    minLon: range[0],
    minLat: range[1],
    maxLon: range[2],
    maxLat: range[3],
    zoomLevel: this.mapObj.getView().getZoom()// 当前缩放级别，缩放级别可用来判断是否要将要素聚合进行显示
}

      //------------------
    //   // 实例化要素
    //   let feature = new Feature({
    //     geometry: new Point([118.589678004, 34.34733]) // 地理几何图形选用点几何
    //   });
    //   // 如果需要给要素附加一些自定义数据
    //   // feature.set("data", data);
    //   // 设置样式，这里就是显示一张图片icon
    //   feature.setStyle([
    //     new Style({
    //       image: new Icon({
    //         anchor: [0.5, 1], // 显示位置
    //         size: [18, 28], // 尺寸
    //         src: require("../../assets/logo.png") // 图片url
    //       })
    //     })
    //   ]);
    //   // 矢量源
    //   let source = new VectorSource({
    //     features: [feature]
    //   });
    //   // 实例化的时候也可以不添加feature，后续通过方法添加：source.addFeatures([feature])
    //   // 清空feature：source.clear()

    //   // 矢量图层
    //   let vector = new VectorLayer({
    //     source: source
    //   });
    //   // 样式除了可以设置在单个feature上，也可以统一设置在矢量图层上
    //   /*
    //   let vector = new VectorLayer({
    //       source: source,
    //       style: new Style({
    //           image: new Icon({
    //             anchor: [0.5, 1],// 显示位置
    //             size: [18, 28],// 尺寸
    //             src: require('../../assets/images/mouse_location_ing.png')// 图片url
    //           })
    //       })
    //   })
    //   */
    //  console.log(this.mapObj.addLayer)
    //   this.mapObj.addLayer(vector);

      // 你可以给元素添加任意的内容或属性或样式，也可以给元素绑定事件
      // let el = document.createElement("div");
      // el.style.cssText = 'width:100px;height:50px;background:red;z-index:1000'
      // let marker = new Overlay({
      //   element: el, // 要显示的元素
      //   position: fromLonLat([118.589678004, 34.34733], "EPSG:4326"), // 地图投影的位置
      //   offset: [-17, -17], // 元素显示的像素偏移量
      //   autoPan: true // 自动移动地图以完整的显示元素
      // });
      // // 添加到地图
      // console.log(marker)
      // this.mapObj.addOverlay(marker);
      // 从地图上删除
      // this.mapObj.removeOverlay(marker);

      this.mapObj.on("click", e => {
        console.log(e);
        var { coordinate } = e;
      });
    }
  }
};
</script>

<style>
#map-container {
  margin: 0;
  height: 100%;
  width: 100%;
  font-family: sans-serif;
}
</style>