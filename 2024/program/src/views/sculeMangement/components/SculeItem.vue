<template>
  <div class="scule-item">
    <div><label>直梯检查项</label></div>
    <div>
      <div class="item">
        <div><label>安全检查项</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
      </div>
      <div class="item">
        <div><label>安全检查项</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
      </div>
      <div class="item">
        <div><label>安全检查项</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
        <div><label>消防联动装置</label></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scule-item {
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
