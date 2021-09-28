<template>
  <div class="scroll-box">
    <div class="scroll-container" ref='scrollContainer'>
      <!-- <div v-for="(item, index) in allDataList" :key="index">
        <div class="title">{{ item.title }}</div>
        <div class="content">{{ item.content }}</div>
      </div> -->
      <div class="msg" v-if='isRequestStatus'>
        {{ msg }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allDataList: [],
      msg: "小二努力加载中",
      isRequestStatus: true,
      oneHeight:1
    };
  },
  created() {
    this.getMorkData(5);
  },
  mounted(){
      console.log(this.$refs.scrollContainer)
    setTimeout(()=>{
         console.log( this.$refs.scrollContainer.offsetHeight)
    },100)
  },
  methods: {
    getMorkData(num) {
      this.isRequestStatus = true;
      this.axios(num)
        .get()
        .then(res => {
          this.allDataList = res;
          this.isRequestStatus = false;
        });
    },
    axios(num) {
      const that = this;
      return {
        get: url => {
          return new Promise(res => {
            setTimeout(() => {
              res(that.createData(num));
            }, 1000);
          });
        }
      };
    },
    createData(length) {
      let arr = [];
      for (let i = 0; i < length; i++) {
        let item = {};
        item.id = Math.random();
        item.title = this.createStr(5);
        item.content = this.createStr(20);
        arr.push(item);
      }
      return arr;

      console.log(arr);
    },
    createStr(length) {
      let str = "";
      for (let i = 0; i < length; i++) {
        str += String.fromCharCode("A".charCodeAt() + ~~(Math.random() * 120));
      }
      return str;
    }
  }
};
</script>

<style >
*{
    margin: 0;
    padding: 0;
}
</style>