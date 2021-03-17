<template>
  <div>
    <el-dialog title="相关协议" v-model="dialogVisible" width="30%">
      <span @click="test">这是一协议</span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Ready",

  setup() {
    const dialogVisible = ref<Boolean>(false);
    const test = () => {
      console.log("测试");
      console.log(dialogVisible.value);
    };
    return {
      dialogVisible,
      test,
    };
  },
});
</script>