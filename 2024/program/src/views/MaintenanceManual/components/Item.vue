<template>
  <div class="config-item">
    <div><label>常规保养</label></div>
    <div>
      <div class="item">
        <div><label>基础保养周期</label></div>
        <div><label>运行时长</label><span>100小时</span></div>
        <div><label>运行时长</label><span>100小时</span></div>
      </div>
      <div class="item">
        <div><label>预计耗时</label> <span>40分钟</span></div>
      </div>
      <div class="item">
        <div><label>维保工作项</label></div>
        <div><label>2. 检查紧急电动运行装置是否正常</label></div>
        <div><label>2. 检查紧急电动运行装置是否正常</label></div>
        <div><label>2. 检查紧急电动运行装置是否正常</label></div>
        <div><label>2. 检查紧急电动运行装置是否正常</label></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.config-item {
  background: #ffffff;
  box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
  > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    > label {
      font-weight: bold;
    }
    .item {
      flex-wrap: wrap;
      border-bottom: 1px solid;
      width: 100%;
      margin-top: 20px;

      > div {
        width: 100%;
        display: flex;
        margin-top: 10px;
        justify-content: space-between;
        label {
          word-break: break-all;
        }
      }
      > div:first-child {
        border-bottom: 1px solid;
        > label {
          font-weight: bold;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
