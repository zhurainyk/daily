<template>
  <div class="config-item">
    <div><label>深圳政府平台</label></div>
    <div>
      <div class="item">
        <div><label>推送接口</label></div>
        <div>
          <label
            >http://127.0.0.1:32767/start.html#id=bqq6ke&p=%E4%B8%BB%E9%A1%B5_5</label
          >
        </div>
        <div>
          <label
            >http://127.0.0.1:32767/start.html#id=bqq6ke&p=%E4%B8%BB%E9%A1%B5_5</label
          >
        </div>
      </div>
      <div class="item">
        <div><label>推送周期</label> <span>7天</span></div>
      </div>
      <div class="item">
        <div><label>推送项目</label></div>
        <div><label>项目A，项目B，项目C，项目D，项目E，项目F</label></div>
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
