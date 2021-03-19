<template>
  <div class="index-content">
    <div class="index-logo">
      <img :src="logo" alt="" />
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="3">
        <template #title>操作</template>
        <el-menu-item index="3-1">新增文章</el-menu-item>
        <el-menu-item index="3-2">退出登录</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import logo from "../../assets/logo.png";

export default {
  data() {
    return {
      activeIndex: "1",
      logo: logo,
    };
  },
  methods: {
    // 新建文章
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === "3-1") {
        this.$router.push("/newArticle");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.index-content {
  display: flex;
  background-color: rgb(84, 92, 100);
  justify-content: space-between;
  align-items: center;

  .index-logo {
    margin-left: 50px;
    width: 50px;
    height: 50px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>