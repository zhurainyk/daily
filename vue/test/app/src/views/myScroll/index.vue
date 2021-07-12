<template>
  <div class="scroll-container">
    <div class="newslist">
      <div v-for="(item, index) in allDataList" :key="index">
        <div class="news">
          <h2>{{ item.title }} -----{{ index + 1 }}</h2>
          <p>{{ item.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      allDataList: [
        { title: "12323232", body: "fsdfsfsdfs" },
        { title: "12323232", body: "fsdfsfsdfs" },
        { title: "12323232", body: "fsdfsfsdfs" },
        { title: "12323232", body: "fsdfsfsdfs" },
        { title: "12323232", body: "fsdfsfsdfs" },
        { title: "12323232", body: "fsdfsfsdfs" }
      ],
      oneHeight: 100
    };
  },
  created(){
    this.getList(15)
  },
  methods:{
    getList(num){
      axios.get('http://jsonplaceholder.typicode.com/posts?_page=1&_limit=' + num).then(res=>{
        if(res.status == 200){
          this.allDataList = [...this.allDataList,...res.data]
        }
      })
    }
  }
};
</script>

<style>
.scroll-container {
  margin:20px auto;
  width: 300px;
  height: 400px;
  overflow: hidden;
  border: 1px solid black;
}
.newslist{
  height:100%;
  overflow-y:auto;
}

.news{
  height:100px;
  box-sizing: border-box;
  border-bottom: 1px solid;
}
h2,p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}


</style>