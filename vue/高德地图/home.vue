<template>
  <div class="home">
    <div class="amap-page-container">
      <el-amap-search-box
        class="search-box"
        :search-option="searchOption"
        :on-search-result="onSearchResult"
      ></el-amap-search-box>
      <el-amap
        vid="amap"
        :zoom="zoom"
        :amap-manager="amapManager"
        :events="events"
        :plugin="[
          'AMap.Autocomplete',
          'AMap.PlaceSearch',
          'AMap.Scale',
          'AMap.OverView',
          'AMap.ToolBar',
          'AMap.MapType',
          'AMap.PolyEditor',
          'AMap.CircleEditor',
          'AMap.Geocoder',
          'AMap.Geolocation',
        ]"
        :center="center"
        ref="map"
        class="amap-demo"
        style="height: 600px; width: 1200px; margin: 50px auto"
      >
        <!-- <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker> -->
        <!-- <el-amap-marker
          v-for="(marker, index) in markers"
          :position="marker.position"
          :events="marker.events"
          :visible="marker.visible"
          :key="index + 9"
          :draggable="marker.draggable"
          :vid="index"
        ></el-amap-marker> -->

        <el-amap-polygon
          v-for="(polygon, index) in polygons"
          :key="index"
          :vid="index"
          :ref="`polygon_${index}`"
          :path="polygon.path"
          :draggable="false"
          :events="polygon.events"
          :fillColor="polygon.fillColor"
          :fillOpacity="polygon.fillOpacity"
          :strokeColor="polygon.strokeColor"
          :strokeOpacity="polygon.strokeOpacity"
          strokeWeight="4"
          :editable="false"
          strokeStyle="solid"
        >
        </el-amap-polygon>
        <el-amap-text
          v-for="polygon in polygons"
          :text="polygon.text.text"
          :offset="polygon.text.offset"
          :position="polygon.text.position"
          :events="polygon.text.events"
          :key="polygon.text.text"
        ></el-amap-text>
      </el-amap>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();
const exampleComponents = {
  props: ["text"],
  template: `<div>text from  parent: {{text}}</div>`,
};
export default {
  name: "Home",

  // },
  data() {
    return {
      /*  地图相关参数   */
      markers: [
        {
          position: [121.5273285, 31.21515044],
          events: {
            click: () => {
              alert("click marker");
            },
            dragend: (e) => {
              console.log("---event---: dragend");
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
            },
          },
          visible: true,
          draggable: false,
        },
      ],
      searchOption: {
        city: "上海",
        citylimit: true,
      },
      mapCenter: [121.59996, 31.197646],
      isMap: false,
      zoom: 15,
      // center: [120.864608, 32.016212],
      center: [121.527715, 31.227995],
      lng: 0,
      lat: 0,
      amapManager: amapManager,
      polygons: [
        {
          draggable: false,
          path: [
            [121.528187, 31.22561],
            [121.530187, 31.22561],
            [121.530187, 31.22961],
            [121.526187, 31.22561],
            [121.528187, 31.22561],
          ],
          events: {
            click: () => {
              console.log("click polygon");
              console.log(amapManager.getComponent(0));
              console.log(this.$refs.map.$$getCenter());
              console.log(this.$refs.polygon_0[0].$$getInstance());
              //  console.log(this.$refs.polygon_0[0].$$getPath())
              // console.log(this.$refs[`polygon_${id}`]);
            },
            mouseover: (e) => {
              this.hoverEvent(e.target.w.vid, 0.5);
            },
            mouseout: (e) => {
              this.hoverEvent(e.target.w.vid, 0.2);
            },
          },

          text: {
            position: [121.528187, 31.22561],
            text: "hello world",
            offset: [0, 0],
            events: {
              click: () => {
                alert("click text");
              },
            },
          },
          fillColor: "red",
          strokeColor: "purple",
          fillOpacity: 0.2,
          strokeOpacity: 0.2,
        },
        {
          draggable: false,
          path: [
            [121.5373285, 31.23515044],
            [121.5193285, 31.22515044],
            [121.5693285, 31.23915044],
            [121.5853285, 31.25515044],
            [121.5373285, 31.23515044],
          ],
          text: {
            position: [121.5373285, 31.23515044],
            text: "hello world2",
            offset: [0, 0],
            events: {
              click: () => {
                alert("click text");
              },
            },
          },
          events: {
            click: () => {
              console.log("click polygon");
              console.log(amapManager.getComponent(1));
              console.log(this.$refs.map.$$getCenter());
            },
            mouseover: (e) => {
              this.hoverEvent(e.target.w.vid, 0.5);
            },
            mouseout: (e) => {
              this.hoverEvent(e.target.w.vid, 0.2);
            },
          },

          fillColor: "yellow",
          strokeColor: "blue",
          fillOpacity: 0.2,
          strokeOpacity: 0.2,
        },
      ],
      mapchoose: [],
      //地图中的点击事件,获取到点击坐标的经纬度
      events: {
        click: (e) => {
          console.log(e);
          // this.polygons[0].path[0] = this.center;
          // this.polygons[0].path.push([e.lnglat.lat, e.lnglat.lng]);
          // this.$forceUpdate();
        },
      },
      plugin: [
        {
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: "all",
          pName: "Geolocation",
          events: {
            init(o) {
              console.log(o, "初始化");
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log(status, result);
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                }
              });
            },
          },
        },
      ],
      /*  地图相关参数   */
    };
  },
  components: {},
  methods: {
    hoverEvent(id, num) {
      this.polygons[id].fillOpacity = num;
      this.polygons[id].strokeColor = num;
    },
    onSearchResult(pois) {
      console.log(pois);
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach((poi) => {
          let { lng, lat } = poi;
          lngSum += lng;
          latSum += lat;
          this.markers.push([poi.lng, poi.lat]);
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length,
        };
        this.mapCenter = [center.lng, center.lat];
      }
    },
  },
};
</script>
<style >
.amap-demo {
  height: 300px;
}

.search-box {
  position: absolute;
  top: 25px;
  left: 20px;
}

.amap-page-container {
  position: relative;
}
</style>
