<template>
  <AddCommentInsureVue
    :data="objupfile"
    :base-info="insureInfo"
    :isrelationstate="false"
    @close-dialog="closedialog"
    :currentstateprop="currentstate"
    v-if="!loading"
  >
    <template #btn="{ savefn, validationData }">
      <el-button type="primary" @click="updateInsure(savefn, validationData)"
        >提交</el-button
      >
      <!-- <authority-button
          v-if="currentstate == '03'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/onSite"
          @click="updateInsure(savefn, validationData)"
          >提交</authority-button
        >
        <authority-button
          v-if="currentstate == '04'"
          type="primary"
          api-url="/elevator_order/iinsuranceInfo/submitMaintPlan"
          @click="updateInsure(savefn, validationData)"
          >提交</authority-button
        > -->
    </template>
  </AddCommentInsureVue>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, ref } from 'vue'
import { updateByIdApi, selectByIdApi } from '@/api/module/insuranceInfo'
import AddCommentInsureVue from './AddCommentInsure'

export default defineComponent({
  components: { AddCommentInsureVue },

  emits: ['close-dialog'],
  props: {
    db_id: {
      type: String,
      default: ''
    },
    typebtn: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const insureInfo: any = ref({})
    const objupfile = ref('')
    const currentstate = ref('')
    const loading = ref(true)
    const closedialog = () => {
      emit('close-dialog')
    }
    const saveAddComment = data => {
      if (currentstate.value == '03') {
        insureInfo.value.db_onSiteImgUrls = JSON.stringify({
          db_description: data.db_description,
          db_imagesUrls: data.db_imagesUrls,
          db_filesUrls: data.db_filesUrls,
          db_fileNames: data.db_fileNames
        })
      } else if (currentstate.value == '04') {
        insureInfo.value.db_maintPlan = JSON.stringify({
          db_description: data.db_description,
          db_imagesUrls: data.db_imagesUrls,
          db_filesUrls: data.db_filesUrls,
          db_fileNames: data.db_fileNames
        })
        insureInfo.value.db_preDuration = data.db_preDuration
      } else if (currentstate.value == '06') {
        insureInfo.value.db_quotation = JSON.stringify({
          db_description: data.db_description,
          db_imagesUrls: data.db_imagesUrls,
          db_filesUrls: data.db_filesUrls,
          db_fileNames: data.db_fileNames
        })
        insureInfo.value.db_scrapValueDeal = data.db_scrapValueDeal
        insureInfo.value.db_scrapValue = data.db_scrapValue
        insureInfo.value.db_partCost = data.db_partCost
        insureInfo.value.db_manhourCost = data.db_manhourCost
        insureInfo.value.db_totalCost = data.db_totalCost
        insureInfo.value.db_partList = data.db_partList
      }
    }
    const updateInsure = (savefn, validationData) => {
      if (!validationData()) return
      const temp = savefn()
      saveAddComment(temp)
      updateByIdApi(insureInfo.value).then(x => {
        if (x.data.success) {
          ElMessage.success('操作成功')
          emit('close-dialog')
        } else {
          ElMessage.error('失败')
        }
      })
    }
    onMounted(() => {
      if (props.db_id) {
        selectByIdApi({ id: props.db_id }).then(x => {
          if (x.data.success) {
            insureInfo.value = x.data.data
            if (props.typebtn == '03') {
              objupfile.value = insureInfo.value.db_onSiteImgUrls
              currentstate.value = '03'
            } else if (props.typebtn == '04') {
              objupfile.value = insureInfo.value.db_maintPlan
              currentstate.value = '04'
            } else if (props.typebtn == '06') {
              objupfile.value = insureInfo.value.db_quotation
              currentstate.value = '06'
            }
            console.log(currentstate.value)
          }
          loading.value = false
        })
      }
    })
    return {
      insureInfo,
      objupfile,
      loading,
      closedialog,
      updateInsure,
      currentstate
    }
  }
})
</script>

<style lang="scss" scoped></style>
