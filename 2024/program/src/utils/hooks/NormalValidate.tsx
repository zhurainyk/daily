import { ElForm, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
const useNormalValidateRespone = () => {
  const showError = (res: IRowCheck) => {
    if (!res.check) {
      if (res.rowMessageList && res.rowMessageList.length > 0) {
        ElMessageBox.alert(res.rowMessageList[0])
      }
    }
    return res.check
  }
  return {
    showError
  }
}
export default useNormalValidateRespone
