<template>
  <div id="centerInfo">
    <div class="card-nums">
      <div class="project cartitem">
        <span class="bold">{{ projectNum }}</span>
        <span>{{ projectLabel }}</span>
      </div>
      <div class="elevator cartitem">
        <span class="bold">{{ dtNum }}</span>
        <span>{{ dtLabel }}</span>
      </div>
      <div class="organization cartitem">
        <span class="bold">{{ usedNum }}</span> <span>{{ usedLabel }}</span>
      </div>
    </div>
    <div class="cylinder">
      <div class="cylinderitem">
        <p class="nums bold">{{ serviceHours }}</p>
        <span>累计总服务</span>
        <span>服务时长</span>
        <span>（小时）</span>
      </div>
      <div class="cylinderitem middle">
        <p class="nums bold">{{ serviceTimes }}</p>
        <span>累计总服务</span>
        <span>次数</span>
        <span>（次）</span>
      </div>
      <div class="cylinderitem">
        <p class="nums bold">{{ bugsTimes }}</p>
        <span>总体故故障 </span>
        <span>次数</span>
        <span>（次）</span>
      </div>
    </div>
    <div class="cylinder bottom">
      <div class="cylinderitem">
        <p class="nums bold">{{ stayHours }}</p>
        <span>总停梯时长</span>
        <span>（小时）</span>
      </div>
      <div class="cylinderitem">
        <p class="nums bold">{{ changeTimes }}</p>
        <span>总换件数量</span>
        <span>（件）</span>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, ref, reactive, computed } from 'vue'
export default {
  name: "centerInfo",
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    let projectNum = computed(() => {
      return props.data?.['01']?.data
    })
    let projectLabel = computed(() => {
      return props.data?.['01']?.name
    })
    let dtLabel = computed(() => {
      return props.data?.['02']?.name
    })
    let dtNum = computed(() => {
      return props.data?.['02']?.data
    })
    let usedLabel = computed(() => {
      return props.data?.['03']?.name
    })
    let usedNum = computed(() => {
      return props.data?.['03']?.data
    })
    let serviceHours = computed(() => {
      return props.data?.['04']?.data
    })
    let serviceTimes = computed(() => {
      return props.data?.['05']?.data
    })
    let bugsTimes = computed(() => {
      return props.data?.['06']?.data
    })
    let stayHours = computed(() => {
      return props.data?.['07']?.data
    })
    let changeTimes = computed(() => {
      return props.data?.['08']?.data
    })

    return {
      projectNum,
      projectLabel,
      dtLabel,
      dtNum,
      usedLabel,
      usedNum, bugsTimes,
      serviceHours,
      serviceTimes,
      changeTimes,
      stayHours

    }
  }
};
</script>

<style lang='scss' scoped>
#centerInfo {
  width: 773px;
  height: 515px;
  margin: 30px 26px;
  margin-left: 29px;

  .bold {
    font-weight: bold;
  }

  .card-nums {
    margin-bottom: 44px;
    display: flex;
    justify-content: space-between;

    .cartitem {
      width: 241px;
      height: 56px;
      line-height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 20px;

      span:first-child {
        font-family: PingFang-SC-Heavy;
        font-size: 24px;
        display: inline-block;
        max-width: 140px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      span:last-child {
        font-family: SourceHanSansCN-Regular;
        font-size: 16px;
      }
    }

    .project {
      background: url("../../../public/images/dataplatform/bg/bg-green.png") no-repeat 100%/100%;

      span {
        color: #23fffc;
      }
    }

    .elevator {
      background: url("../../../public/images/dataplatform/bg/bg-blue.png") no-repeat 100%/100%;

      span {
        color: #29b6ff;
      }
    }

    .organization {
      background: url("../../../public/images/dataplatform/bg/bg-yellow.png") no-repeat 100%/100%;

      span {
        color: #fed52f;
      }
    }
  }

  .cylinder {
    width: 100%;
    height: 196px;
    display: flex;
    justify-content: space-around;
    background: url("../../../public/images/dataplatform/bg/center-top.png") no-repeat center/cover;

    .cylinderitem {
      width: 119px;
      height: 130px;
      text-align: center;

      p.nums {
        font-family: PingFang-SC-Heavy;
        font-size: 24px;
        color: #29b6ff;
        margin-bottom: 8px;
        margin-top: 3px;
      }

      span {
        color: #ffffff;
        display: block;
        font-size: 16px;
        line-height: 22px;
        font-family: SourceHanSansCN-Regular;
        transform: scale(0.8);
      }

      span:last-child {
        color: #ccd3d6;
        font-size: 14px;
      }
    }

    .cylinderitem.middle {
      // padding:0 5px;
    }

    .cylinderitem:first-child {
      padding-right: 5px;
    }
  }

  .cylinder:last-child {
    margin-top: 23px;
    background: url("../../../public/images/dataplatform/bg/center-bottom.png") no-repeat center/cover;
  }

  .cylinder.bottom {
    display: flex;
    justify-content: center;

    .cylinderitem {
      p.nums {
        color: #ff6882;
      }

      padding: 0;
      margin: 0 71px;
    }

    .cylinderitem:last-child {
      p.nums {
        color: #B149FF;
      }
    }
  }
}
</style>