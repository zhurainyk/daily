<template>
  <div>
    <div class="news-box">
      <virtual-scroll
        :msg="msg"
        :oneHeight="oneHeight"
        :requestUrl="requestUrl"
        :requestNum="requestNum"
        :moreRequestNum="moreRequestNum"
        v-slot:default="oneItem"
      >
        <template>
          <div class="title">{{ oneItem.thisItem.title }}</div>
          <div class="content">{{ oneItem.thisItem.body }}</div>
        </template>
      </virtual-scroll>
    </div>
    <router-link to="/"><button>按钮</button></router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "加载中1",
      oneHeight: 121,
      requestUrl: "http://jsonplaceholder.typicode.com/posts?_page=1&_limit=",
      requestNum: 20,
      moreRequestNum: 20
    };
  }
};
</script>

<style  scoped>
.news-box {
  width: 500px;
  position: absolute;
  top: 200px;
  left: 200px;
  bottom: 200px;
  border: 1px solid;
}

/* .scroll-container {
  height: 100%;
  overflow-y: auto;
}
.news-list {
  height: 100px;
  overflow: hidden;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(20, 10, 10);
}
.msg h2 {
  text-align: center;
} */
</style>