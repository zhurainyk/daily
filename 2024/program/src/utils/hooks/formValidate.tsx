import { ElForm, ElMessageBox, ElMessage } from 'element-plus'
import { ref } from 'vue'

const useValidateRespone = (
  formEl: InstanceType<typeof ElForm>,
  modelBind: any
) => {
  const errMode = ref({})
  const initErrorModel = args => {
    errMode.value = {}
    Object.entries(args).forEach(([key, v]) => {
      if (v && typeof v == 'object') {
        Object.entries(v).forEach(([key1, v1]) => {
          errMode.value[key1] = {
            error: ''
          }
        })
      } else {
        errMode.value[key] = {
          error: ''
        }
      }
    })
  }
  if (modelBind) {
    initErrorModel(modelBind)
  }
  const resetError = () => {
    Object.entries<any>(errMode.value).forEach(([key, v]) => {
      v.error = ''
    })
  }

  const showError = (res: IRowCheck, callback = null) => {
    if (!res.check) {
      Object.entries<any>(res.columnMessageMap).forEach((key: any, v) => {
        if (errMode.value[key[0]]) errMode.value[key[0]].error = key[1]
      })
      if (res.rowMessageList && res.rowMessageList.length > 0) {
        ElMessageBox.alert(res.rowMessageList[0], '', {
          confirmButtonText: '确定',
          callback: action => {
            if (action != 'cancel') {
              if (res.isNext == '01') {
                if (callback) {
                  // ElMessage({
                  //   type: 'info',
                  //   message: `action: ${action}`
                  // })
                }
              }
            }
          }
        })
      }
    }
    return res.check
  }
  return {
    errMode,
    resetError,
    showError,
    initErrorModel
  }
}
export default useValidateRespone
