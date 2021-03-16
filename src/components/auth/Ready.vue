<template>
  <div>
    <el-dialog
      title="相关协议"
      v-model="dialogVisible"
      width="30%"
    >
      <span>这是一协议</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Ready",
  data() {
    return {
      dialogVisible: false,
    };
  },
};
</script>