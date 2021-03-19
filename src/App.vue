<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* position: fixed; */
  width: 100%;
  height: 100%;
}

/*修改滚动条样式*/
::-webkit-scrollbar {
  /*滚动条整体部分*/
  width: 15px;
  height: 1px;
}

::-webkit-scrollbar-track {
  /* 外层轨道。 */
  background: #f8f8f8;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  /* 滚动条里面可以拖动的那部分 */
  border-radius: 10px;
  background-color: #1890ff;
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

::-webkit-scrollbar-thumb:hover {
  background-color: #1890ff;
  background-image: -webkit-linear-gradient(
    -45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}
</style>