import { defineStore } from 'pinia';

export const useCrumbStore = defineStore({
  id: 'crumbs',
  state: () => ({
    crumbItemList: [
      {
        to: {
          path: '/'
        },
        name: '首页'
      }
    ]
  }),
  getters:{
    breadList:(state)=>state.crumbItemList
  },
  actions: {
    pushCrumb(crumbItem ) {
      this.crumbItemList.push(crumbItem);
    },
    sliceLastCrumb() {
      this.crumbItemList.splice(-1);
    },
    replaceCrumb(crumbItemList ) {
      this.crumbItemList = crumbItemList;
       
    }
  }
});