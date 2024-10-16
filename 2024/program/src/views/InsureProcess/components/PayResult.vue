<template>
  <div class="pay-result">
    <div class="comment-aggree">
      <div>
        <h2>平台确认</h2>
        <div class="name">
          <label>确认人:</label>
          <span>{{ baseInfo.ui_finishTLComfirmUserName }}</span>
        </div>
        <div class="time">
          <label>确认时间:</label>
          <div class="note">
            {{ baseInfo.ui_finishTLComfirmTime }}
          </div>
        </div>
        <div class="note">
          <label>确认描述:</label>
          <div>
            {{ baseInfo.db_finishTLComfirmNote }}
          </div>
        </div>
        <i
          class="status-pass-reject"
          :class="
            !baseInfo.db_finishTLComfirmUserId
              ? 'no-process'
              : baseInfo.db_finishTLComfirmUserId
              ? 'pass'
              : 'reject'
          "
        ></i>
      </div>
      <div>
        <h2>结算审核</h2>
        <div class="name">
          <label>确认人:</label>
          <span>{{ baseInfo.ui_settleAuditUserName }}</span>
        </div>
        <div class="time">
          <label>确认时间:</label>
          <div class="note">
            {{ baseInfo.ui_settleAuditTime }}
          </div>
        </div>
        <div class="note">
          <label>确认描述:</label>
          <div>
            {{ baseInfo.db_settleAuditNote }}
          </div>
        </div>
        <i
          class="status-pass-reject"
          :class="
            !baseInfo.db_settleAuditUserId
              ? 'no-process'
              : baseInfo.db_settleAuditUserId
              ? 'pass'
              : 'reject'
          "
        ></i>
      </div>

      <div>
        <h2>支付确认</h2>
        <div class="name">
          <label>确认人:</label>
          <span>{{ baseInfo.ui_payComfirmUserName }}</span>
        </div>
        <div class="time">
          <label>确认时间:</label>
          <div class="note">
            {{ baseInfo.ui_payComfirmTime }}
          </div>
        </div>
        <div class="note">
          <label>确认描述:</label>
          <div>
            {{ baseInfo.db_payComfirmNote }}
          </div>
        </div>
        <i
          class="status-pass-reject"
          :class="
            !baseInfo.db_payComfirmUserId
              ? 'no-process'
              : baseInfo.db_payComfirmUserId
              ? 'pass'
              : 'reject'
          "
        ></i>
      </div>

      <!-- <div>
        <h2>归档审核</h2>
        <div class="name">
          <label>审核人:</label>
          <span>{{ baseInfo.ui_filingUserName }}</span>
        </div>
        <div class="time">
          <label>审核时间:</label>
          <div class="note">
            {{ baseInfo.ui_filingTime }}
          </div>
        </div>
        <i
          class="status-pass-reject"
          :class="
            !baseInfo.db_filingUserId
              ? 'no-process'
              : baseInfo.db_filingUserId
              ? 'pass'
              : 'reject'
          "
        ></i>
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, reactive, watch } from 'vue'

export default defineComponent({
  props: {
    baseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {}
})
</script>

<style lang="scss" scoped>
.pay-result {
  background-color: white;
  overflow: auto;
  width: 100%;
  padding-bottom: 20px;
  > div {
    margin-top: 20px;
  }
  .comment-aggree {
    display: flex;
    margin-top: 20px;
    margin-bottom: 10px;
    justify-content: flex-start;
    padding-left: 70px;
    > div {
      width: 300px;
      height: 200px;
      box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
      margin-right: 20px;
      border-radius: 10px;
      padding: 20px;
      position: relative;
      h2 {
        font-weight: bold;
        color: #000000;
        text-align: center;
        font-size: 16px;
      }
      > div {
        width: 100%;
        height: 20px;
        display: inline-flex;
        margin-top: 18px;
        > label {
          width: 80px;
          padding-bottom: 20px;
          color: #666666;
        }
        > div {
          color: #666666;
        }
        > span {
          color: #666666;
        }
      }
      .note {
        > div {
          white-space: pre-wrap;
          word-break: break-all;
          flex: 1;
        }
      }
      .status-pass-reject {
        width: 90px;
        height: 90px;
        display: inline-block;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        right: 5px;
        top: 5px;
        &.pass {
          background-image: url('../../../public/images/insure/confirm.png');
        }
        &.no-process {
          background-image: url('../../../public/images/insure/no-confirm.png');
        }
        &.reject {
          background-image: url('../../../public/images/insure/no-confirm.png');
        }
      }
    }
  }
}
</style>
