import { selectByAllTypeApi } from '@/api/module/commont'
interface options {
  value: string
  label: string
  children?: Array<options>
}
const useGetCityList = async () => {
  let alldata = await selectByAllTypeApi({ constType: 'province_city' })
  let listOne: Array<options> = []
  let listTwo: Array<options> = []
  let listThree: Array<options> = []
  Object.entries<string>(alldata.data.data).forEach(([key, v]) => {
    if (key.length == 6) {
      if (/.{2,2}0{4,4}/.test(key)) {
        listOne.push({
          value: key,
          label: v,
          children: []
        })
      } else if (/.{4,4}0{2,2}/.test(key)) {
        listTwo.push({
          value: key,
          label: v,
          children: []
        })
      } else {
        listThree.push({
          value: key,
          label: v
        })
      }
    }
    // listOne.push({
    //     value:key,
    //     label:v,
    //     children:[]
    // })
  })
  listOne.forEach(p => {
    let regp = new RegExp(`${p.value.slice(0, 2)}.{4,4}`)
    let tempP = listTwo.filter(city => regp.test(city.value))
    if (tempP.length > 0) {
      p.children = tempP
      tempP.forEach(r => {
        let regc = new RegExp(`${r.value.slice(0, 4)}.{2,2}`)
        r.children = listThree.filter(t => regc.test(t.value))
      })
    }
  })
  return {
    listOne
  }
}

export default useGetCityList
