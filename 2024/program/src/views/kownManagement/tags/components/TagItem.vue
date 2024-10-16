<template>
  <div class="tag-item">
    <div class="tag-item-head">
      <label>{{ item.name }}</label>
      <!-- <span class="add-btn"></span> -->
    </div>
    <div class="tag-item-mian">
      <span v-for="x in list" :key="x">{{ x }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const list = computed(() => {
      if (props.item && props.item.detailData) {
        const templist: any = []
        Object.entries(props.item.detailData).forEach((k, v) => {
          templist.push(k[1])
        })
        return templist
      }
      return []
    })
    return {
      list
    }
  }
})
</script>

<style lang="scss" scoped>
.tag-item {
  min-height: 180px;
  background: #ffffff;
  box-shadow: 0px 8px 13px 2px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  .tag-item-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 30px 20px 30px;
    > label {
      font-size: 16px;
      font-weight: bold;
    }
    .add-btn {
      background-image: url('../../../../public/images/common/add');
      font-size: 14px;
      margin-right: 8px;
      display: inline-block;
      width: 18px;
      height: 18px;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
  .tag-item-mian {
    padding: 0 30px;
    > span {
      display: inline-block;
      min-width: 92px;
      height: 30px;
      color: $p-color-primary;
      border-radius: 10px;
      border: 1px solid $p-color-primary;
      text-align: center;
      line-height: 30px;
      margin-right: 20px;
      margin-bottom: 10px;
      padding: 0 10px;
    }
  }
}
</style>
