<template>
  <div class="elevator-detail">
    <div class="item">
      <div><label>基本信息</label></div>
      <div><label>电梯位置</label><span>重庆环球金融中心-42#</span></div>
      <div><label>注册代码</label><span>重庆环球金融中心-42#</span></div>
      <div><label>电梯品种</label><span>重庆环球金融中心-42#</span></div>
      <div><label>品牌型号</label><span>重庆环球金融中心-42#</span></div>
      <div><label>使用性质</label><span>重庆环球金融中心-42#</span></div>
      <div><label>使用性质</label><span>重庆环球金融中心-42#</span></div>
      <div><label>出厂日期</label><span>重庆环球金融中心-42#</span></div>
      <div>
        <label>初装验收合格日期</label><span>重庆环球金融中心-42#</span>
      </div>
      <div><label>安装单位</label><span>重庆环球金融中心-42#</span></div>
      <div><label>地图地址</label><span>重庆环球金融中心-42#</span></div>
    </div>
    <div class="item">
      <div><label>服务信息</label></div>
      <div><label>使用单位</label><span>重庆环球金融中心-42#</span></div>
      <div><label>维保单位</label><span>重庆环球金融中心-42#</span></div>
      <div><label>承保单位</label><span>重庆环球金融中心-42#</span></div>
      <div><label>使用单位联系人</label><span>重庆环球金融中心-42#</span></div>
      <div><label>维保服务电话</label><span>重庆环球金融中心-42#</span></div>
      <div><label>维保联系人</label><span>重庆环球金融中心-42#</span></div>
      <div><label>维保类型</label><span>重庆环球金融中心-42#</span></div>
      <div><label>下次检验日期</label><span>重庆环球金融中心-42#</span></div>
    </div>
    <div>
      <div class="item">
        <div><label>运行参数</label></div>
        <div><label>宽度</label><span>重庆环球金融中心-42#</span></div>
        <div><label>倾斜角</label><span>重庆环球金融中心-42#</span></div>
        <div><label>提升高度</label><span>重庆环球金融中心-42#</span></div>
        <div><label>额定速度</label><span>重庆环球金融中心-42#</span></div>
        <div><label>使用区长度</label><span>重庆环球金融中心-42#</span></div>
      </div>
      <div class="item">
        <div><label>运行参数</label></div>
        <div><label>楼层数</label><span>重庆环球金融中心-42#</span></div>
        <div><label>停站数</label><span>重庆环球金融中心-42#</span></div>
        <div><label>门数</label><span>重庆环球金融中心-42#</span></div>
        <div><label>额定速度</label><span>重庆环球金融中心-42#</span></div>
        <div><label>额定载重量</label><span>重庆环球金融中心-42#</span></div>
        <div><label>机房</label><span>重庆环球金融中心-42#</span></div>
        <div><label>传动方式</label><span>重庆环球金融中心-42#</span></div>
        <div><label>曳引比</label><span>重庆环球金融中心-42#</span></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.elevator-detail {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 375px;
    background-color: white;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      width: 100%;
      > label {
        font-weight: bold;
      }
    }
    > div:first-child {
      margin-bottom: 20px;
      > label {
        font-size: 20px;
      }
    }
  }
}
</style>
