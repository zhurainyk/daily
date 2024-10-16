<template>
  <div id="workplan">
    <moduleName :moduleName="modulename"></moduleName>
    <div class="currentMonth">本月</div>
    <div class="tableList">
      <div class="item header">
        <!-- <div class="tab"></div> -->
        <div class="tab">日期</div>
        <div class="tab">电梯位置</div>
        <div class="tab">保养类型</div>
        <div class="tab">任务状态</div>
        <div class="tab">责任人</div>
        <!-- <div class="tab">工作时长</div> -->
      </div>
      <el-scrollbar height="99%">
        <div class="item list" v-for="(item, index) in tableList" :key="index">
          <!-- <div class="tab">{{ index + 1 }}</div> -->
          <div class="tab">{{ item.date }}</div>
          <div class="tab"
            style="flex-grow:1;text-overflow:ellipsis;overflow:hidden;white-space:nowrap; direction: rtl;"
            :title="item.elevatorLocation">{{
              item.elevatorLocation
            }}</div>
          <div class="tab">{{ item.maintType }}</div>
          <div class="tab">{{ item.taskState }}</div>
          <div class="tab">{{ item.chargeUserName }}</div>
          <!-- <div class="tab">{{ item.workDuration + item.desc }}</div> -->
          <!-- <div class="tab">{{item.address}}</div> -->
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, defineProps, } from 'vue'
const modulename = ref('工作计划')
const props = defineProps({
  data: {
    type: Array,
    default: []
  }
})
let tableList = computed({
  get() {
    return props.data
  }
})
</script>

<style scoped lang="scss">
:deep().el-scrollbar__view {
  counter-reset: count;
  list-style: none;
}

#workplan {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .tableList {
    height: calc(100% - 50px);
    box-sizing: border-box;
    padding: 0 0px;
    margin-top: 10px;

    .item {
      display: flex;
      line-height: 32px;
    }

    .item.header {
      font-size: 16px;
      // line-height: 40px;
      color: #fff;

      .tab {
        text-align: center;
        width: 100%;

      }

      .tab:first-child {
        margin-left: 20px;
        min-width: 112px;
        text-indent: 30px;
      }
    }

    .item {

      font-size: 14px;
      color: #fff;

      .tab {
        text-align: center;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: SourceHanSansCN-Regular;
      }

      .tab:first-child {
        margin-left: 20px;
      }
    }



    .item.list {


      .tab:first-child {
        counter-increment: count;
        position: relative;
        min-width: 112px;
        //  transform:translateX(-20px);
      }

      .tab:first-child::before {
        content: counter(count, decimal)'';
        color: #fff;
        margin-right: 20px;


      }
    }
  }

  .currentMonth {
    position: absolute;
    top: 10px;
    right: 20px;
    width: 60px;

    height: 26px;
    background: rgba(35, 154, 255, 0.2);
    border: 1px solid rgba(35, 154, 255, 0.3);
    // opacity: 0.3;
    line-height: 26px;
    font-size: 14px;
    color: #009AFC;
    text-align: center;
  }

}
</style>