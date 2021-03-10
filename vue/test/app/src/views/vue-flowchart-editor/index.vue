<template>
  <div id="flowchart">
    <vue-flowchart-editor
    style='height:100%;width:100%'
      ref="vueFlowchartEditor"
      :onBeforeCommandExecute="handleBeforeCommand"
      :onAfterCommandExecute="handleAfterCommand"
      
    >
     <flow :shortcut="{ zoomIn: true, zoomOut: true }" />
    </vue-flowchart-editor>
  </div>
</template>

<script>
import VueFlowchartEditor, { Flow } from "vue-flowchart-editor";
console.log(VueFlowchartEditor);
export default {
  data() {
    return {
      data: {
        nodes: [
          {
            type: "node",
            size: "80*48",
            shape: "flow-rect",
            color: "#1890FF",
            label: "测试节点",
            x: 468,
            y: 201.5,
            id: "b69121d6",
            index: 0,
            data: [
              { name: "prop3", value: "prop3" },
              { name: "prop4", value: "prop4" }
            ]
          },
          {
            type: "node",
            size: "72*72",
            shape: "flow-circle",
            color: "#FA8C16",
            label: "开始",
            x: 524.5,
            y: 61.5,
            id: "01729835",
            index: 2,
            data: [
              { name: "prop1", value: "prop1" },
              { name: "prop2", value: "prop2" }
            ]
          },
          {
            type: "node",
            size: "72*72",
            shape: "flow-circle",
            color: "#FA8C16",
            label: "开始",
            x: 340,
            y: 126,
            id: "bd506110",
            index: 3,
            data: [
              { name: "prop1", value: "prop1" },
              { name: "prop2", value: "prop2" }
            ]
          }
        ],
        edges: [
          {
            source: "01729835",
            sourceAnchor: 2,
            target: "b69121d6",
            targetAnchor: 0,
            id: "070785c1",
            index: 1
          }
        ]
      }
    };
  },
  mounted() {
    console.log(this.$refs.vueFlowchartEditor.propsAPI);
  },
  methods: {
    handleBeforeCommand({ command }) {
      console.log("before command execute", command);
    },
    handleAfterCommand({ command }) {
      console.log("after command execute", command);
    }
  },
  components: { VueFlowchartEditor, Flow }
};
</script>
<style scoped>
#flowchart {
  width: 100%;
  height: 100%;
}
</style>