<template>
  <div class="scrollcontainer">
    <virtual-scroll
      v-slot:default="oneItem"
      :initData="initData"
      :oneHeight="50"
    >
      <div @click="getItem(oneItem)" class="title">
        {{ oneItem.thisItem.title }}+{{ oneItem.index }}
      </div>
      <div class="content">{{ oneItem.thisItem.body }}</div>
      <div>{{ value }}</div>
    </virtual-scroll>

    <div v-for="i in arr" :key="i"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "xx",
      isLoading: false,
      initData: [
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "33333" },
        { title: "222", body: "333330" }
      ],
      arr: []
    };
  },
  mounted() {
    this.longTask();
  },

  methods: {
    /**
     * 长任务 阻塞进程
     */

    longTask() {
      let start = null;
      let i = 0;
      let step = timestamp => {
        if (!start) start = timestamp;
        this.arr.push(i);
        i++;
        let progress = timestamp - start;
        // console.log(progress);
        if (progress < 2000) {
          window.requestAnimationFrame(step);
        } else {
          console.timeEnd("任务一");
        }
      };
      console.time("任务一");
      window.requestAnimationFrame(step);
    },

    /**
     * longTime会阻塞主线程
     */
    longTime() {
      console.time("时间");
      const start = performance.now();
      let count = 0;
      while (performance.now() - start < 1000) {
        console.log(count++);
      }
      console.timeEnd("时间");
      console.log("done!");
    },

    /**
     * 时间分片任务 不会阻塞；
     */

    tsRun() {
      (function*() {
        const start = performance.now();
        let count = 0;
        while (performance.now() - start < 1000) {
          yield;
        }
        console.log("done!");
      })();
    },
    tsRun(gen) {
      if (typeof gen === "function") gen = gen();
      if (!gen || typeof gen.next !== "function") return;
      return function next() {
        const start = performance.now();
        const res = null;
        do {
          res = gen.next();
        } while (!res.done && performance.now() - start < 25);
        if (res.done) return;
        setTimeout(next);
      };
    },

    getItem(e) {
      console.log(e);
    },
    changeSwitch(e) {
      console.log(e);
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2200);
    }
  }
};
</script>

<style>
.scrollcontainer {
  height: 100%;
}
.news-list {
  height: 50px;
  overflow: hidden;
  padding-bottom: 20px;
  border-bottom: 1px solid rgb(20, 10, 10);
}
</style>