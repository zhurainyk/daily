<template>
  <div
    class="scroll-container"
    ref="srcollContainer"
    @scroll.passive="handleScroll"
  >
    <div :style="blankFillStyle">
      <!-- 手动添加一层 -->
      
      <div v-for="(item, index) in showDataList" class="news-list" :key="index">
        <!-- <div class="title">{{ item.title }}</div>
        <div class="content">{{ item.body }}</div> -->
         <slot  :thisItem='item' :index ='index'></slot>
       
      </div>
      <div class="msg" v-if="isRequestStatus">
        <h2>
          {{ msg }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    msg: {
      default: () => "加载ing",
      type: String
    },
    oneHeight: {
      default: () => 121,
      type: Number
    },
    initData:{
      default:()=>[],
      type:Array
    },
    requestUrl: {
      default: () =>{
          return "http://jsonplaceholder.typicode.com/posts?_page=1&_limit="
      }
        ,
      type: String
    },
    requestNum: {
      default: () => 20,
      type: Number
    },
    moreRequestNum: {
      default: () => 20,
      type: Number
    }
  },
  data() {
    return {
      allDataList: [],
    //   msg: "努力加载中...",
      isRequestStatus: true,
    //   oneHeight: 121, //单个高度
      containerSize: 0, //容器存放的个数
      startIndex: 0, //记录当前滚动的初始位置
      isScrollStatus: true,
      currentScrollTop: 0 //记录距离顶部的位置
    };
  },
  async created() {
    let newsList = await this.getList(this.requestNum);
    console.log(newsList)
    if (!newsList) return;
    this.allDataList = newsList;
  },
  mounted() {
    this.getContainerSize();
    window.onresize = this.getContainerSize;
  },
  computed: {
    endIndex() {
      // let endIndex = this.startIndex + this.containerSize;
      let endIndex = this.startIndex + this.containerSize * 2; //预加载
       console.log(endIndex)
      if (!this.allDataList[endIndex]) {
        //如果最后一个不存在
        
        endIndex = this.allDataList.length ;
      }
      console.log(endIndex)
      return endIndex;
    },
    showDataList() {
      //动态显示
      //预加载实现
      let startIndex = 0;
      if (this.startIndex <= this.containerSize) {
        startIndex = 0;
      } else {
        startIndex = this.startIndex - this.containerSize;
      }
      console.log(startIndex,this.endIndex)
      // return this.allDataList.slice(this.startIndex, this.endIndex);
      return this.allDataList.slice(startIndex, this.endIndex);
    },
    // topBlankFill() {
    //   return this.startIndex * this.oneHeight;
    // },
    // bottomBlankFill() {
    //   return (this.allDataList.length - this.endIndex) * this.oneHeight;
    // },
    blankFillStyle() {
      //通过padding来让页面不闪烁

      //预加载实现
      let startIndex = 0;
      if (this.startIndex <= this.containerSize) {
        startIndex = 0;
      } else {
        startIndex = this.startIndex - this.containerSize;
      }
      return {
        paddingTop: startIndex * this.oneHeight + "px",
        paddingBottom:
          (this.allDataList.length - 1 - this.endIndex) * this.oneHeight + "px"
      };
    }
  },
  activated() {   
    this.$nextTick(() => {
      this.$refs.srcollContainer.scrollTop = this.currentScrollTop;
    });
  },
  methods: {
    getList(num) {
      this.isRequestStatus = true;
      if(this.initData.length){
        return new Promise((res=>{
          setTimeout(()=>{
             
            res(this.initData)
          },1000)
        })).then(res=>{
          this.isRequestStatus = false;
          return res
        })
      }
      return axios
        .get(this.requestUrl + num)
        .then(res => {
          if (res.status === 200) {
            // this.allDataList = [...this.allDataList,...res.data];

            this.isRequestStatus = false;
            return res.data;
          }
        })
        .catch(e => {
          return false;
        });
    },
    getContainerSize() {
      let height = this.$refs.srcollContainer.offsetHeight;
      this.containerSize = ~~(height / this.oneHeight) + 2;
      console.log(this.containerSize);
    },
    handleScroll(e) {
      // if (this.isScrollStatus) {
      //   //节流函数
      //   this.isScrollStatus = false;
      //   let myTimer = setTimeout(() => {
      //     this.isScrollStatus = true;
      //     clearTimeout(myTimer);
      //   }, 30);
      //   this.setDataStartIndex();
      // }

      //用 requestAnimationFrame 动画帧来实现节流
      let requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame;

      let fps = 30;
      let interval = 1000 / 30;
      let then = Date.now;
      requestAnimationFrame(() => {
        let now = Date.now;
        // console.log(arguments.callee)
        this.setDataStartIndex();
        if (now - then >= interval) {
          then = now;
          requestAnimationFrame();
        }
      });
    },
    async setDataStartIndex() {
      // console.log(this.$refs.srcollContainer.scrollTop )//监听距离顶部的位移
      let scrollTop = this.$refs.srcollContainer.scrollTop;
      this.currentScrollTop = scrollTop; //记录滚动位置
      // console.log(~~(scrollTop / this.oneHeight));
      // this.startIndex = ~~(scrollTop / this.oneHeight);
      let currentIndex = ~~(scrollTop / this.oneHeight);
      if (this.startIndex === currentIndex) return; //节约性能

      this.startIndex = currentIndex;

      if (
        this.startIndex + this.containerSize > this.allDataList.length - 1 &&
        !this.isRequestStatus
      ) {
        console.log("滚动到底了 追加请求");
        if(this.initData.length) return;
        let newsList = await this.getList(this.moreRequestNum);
        if (!newsList) return;
        this.allDataList.push(...newsList);
      }
    }
  }
};
</script>

<style scoped>
.scroll-container {
  height: 100%;
  overflow-y: auto;
}
/* .news-list {
  height: 100px;
  overflow: hidden;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(20, 10, 10);
} */
/* .msg h2 {
  text-align: center;
} */
</style>
</style>