<template>
  <div>alter</div>
  <el-button @click="back">back</el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "../../store";

export default defineComponent({
  name: "AlterForm",
  setup() {
    const back = () => {
      store.commit("setEvent", "login");
    };
    return {
      back,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>