<template>
  <div class="dialog-mian">
    <div class="dialog-body">
      <div id="container"></div>
      <div class="info">
        <div class="input-item">
          <div class="input-item-prepend">
            <span class="input-item-text" style="width: 8rem"
              >请输入关键字</span
            >
          </div>
          <input id="tipinput" type="text" />
        </div>
      </div>
      <div class="dialog-footer">
        <el-button plain @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="saveMap">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, onMounted } from 'vue'

export default defineComponent({
  props: {
    address: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['close', 'success'],
  setup(props, { emit }) {
    let map: any
    let marker: any
    let geocoder: any
    const install = () => {
      map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 12
      })
      const auto = new AMap.AutoComplete({
        input: 'tipinput'
      })
      const placeSearch = new AMap.PlaceSearch({
        map
      })
      geocoder = new AMap.Geocoder({})
      AMap.Event.addListener(auto, 'select', e => {
        placeSearch.setCity(e.poi.adcode)
        placeSearch.search(e.poi.name)
      })
      if (props.address.lng) {
        const tempmarker = new AMap.Marker({
          position: new AMap.LngLat(props.address.lng, props.address.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png' // 添加 Icon 图标 URL
        })
        map.add(tempmarker)
        marker = tempmarker
      }
      map.on('click', e => {
        if (marker) {
          marker.remove(marker)
        }
        const tempmarker = new AMap.Marker({
          position: new AMap.LngLat(e.lnglat.lng, e.lnglat.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png' // 添加 Icon 图标 URL
        })
        map.add(tempmarker)
        marker = tempmarker
      })
    }
    const closeDialog = () => {
      emit('close')
    }
    const saveMap = async () => {
      if (marker) {
        geocoder.getAddress(
          [marker.getPosition().lng, marker.getPosition().lat],
          (status, result: any) => {
            if (status === 'complete' && result.regeocode) {
              const address = result.regeocode.formattedAddress
              closeDialog()
              emit('success', {
                lng: marker.getPosition().lng,
                lat: marker.getPosition().lat,
                address
              })
            }
          }
        )
      }
    }
    onUnmounted(() => {
      map && map.destroy()
    })
    onMounted(() => {
      install()
    })
    return {
      map,
      closeDialog,
      saveMap
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-body {
  position: relative;
  #container {
    width: 100%;
    height: 600px;
  }
  .info {
    position: absolute;
  }
}
</style>
