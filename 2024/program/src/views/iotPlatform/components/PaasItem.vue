<template>
  <div class="pass-item">
    <div><label>梯联直梯方案 1.0</label></div>
    <div><label>类型</label><span>运行监测方案</span></div>
    <div><label>供应商</label><span>安智物联</span></div>
    <div><label>方案说明</label><span>点击查看</span></div>
    <div><label>接口文档</label><span>点击查看</span></div>
  </div>
</template>

<style lang="scss" scoped>
.pass-item {
  background: #ffffff;
  box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: 300px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    > label {
      font-weight: bold;
    }
  }
}
</style>
