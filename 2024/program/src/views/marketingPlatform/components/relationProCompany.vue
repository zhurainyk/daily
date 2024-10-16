<template>
  <div class="relation-person">
    <div class="body">
      <div>
        <label>公司名称:</label><span>{{ company.db_id_companyName }}</span>
      </div>
      <div>
        <label>纳税识别号:</label><span>{{ company.db_companyCode }}</span>
      </div>
      <div>
        <label>公司地址:</label><span>{{ company.db_companyAddr }}</span>
      </div>
      <div>
        <label>联系人:</label><span>{{ company.db_contactName }}</span>
      </div>
      <div>
        <label>公司电话:</label><span>{{ company.db_companyPhone }}</span>
      </div>
      <div>
        <label>开户账号:</label><span>{{ company.db_bankAccount }}</span>
      </div>
      <div>
        <label>开户行:</label><span>{{ company.db_bankName }}</span>
      </div>
      <div class="image-pro-company">
        <label>营业执照:</label
        ><img v-if="company.db_licenseUrl" :src="company.db_licenseUrl" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { Usercenter_PropCompany } from '@/module.ts/Usercenter_PropCompany'
import { selectByIdApi } from '@/api/module/propcompany'

export default defineComponent({
  props: {
    modelData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const company = ref<IUsercenter_PropCompany>(new Usercenter_PropCompany())
    onMounted(async () => {
      if (props.modelData.db_useCompanyId) {
        const tempPosi = await selectByIdApi({
          id: props.modelData.db_useCompanyId
        })
        if (tempPosi.data.success) {
          company.value = tempPosi.data.data
        }
      }
    })
    return {
      company
    }
  }
})
</script>

<style lang="scss" scoped>
.relation-person {
  margin: 20px 30px;
  box-shadow: 0px 5px 19px 1px rgba(3, 0, 55, 0.1);
  background-color: white;
  padding: 10px;
  border-radius: 10px;
  height: 500px;
  .head {
    margin-bottom: 20px;
    padding-top: 10px;
  }
  .body {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-left: 60px;
    > div {
      width: 540px;
      margin-left: 50px;
      margin-top: 23px;
      display: flex;
      align-items: center;
      > label {
        font-weight: bold;
        white-space: nowrap;
        margin-right: 20px;
        width: 100px;
        text-align: right;
        line-height: 40px;
      }
      > span {
        width: 400px;
        background: #f1f1f1;
        border-radius: 10px;
        height: 40px;
        display: flex;
        padding-left: 10px;
        align-items: center;
      }
      &.image-pro-company {
        align-items: flex-start;
      }
    }
    img {
      height: 160px;
      width: 130px;
      cursor: pointer;
    }
  }
}
</style>
