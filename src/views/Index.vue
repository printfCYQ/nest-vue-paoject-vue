<template>
  <div class="page">
    <el-row :gutter="20" class="index-top" :class="{ show: isShow }">
      <el-col :span="4" :xs="0" :sm="0" :md="0" :lg="4" :xl="4"> </el-col>
      <el-col :span="16" :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <Header></Header>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4" :xs="0" :sm="0" :md="0" :lg="4" :xl="4"> </el-col>
      <el-col
        :span="12"
        class="index-left"
        :class="{ show: isShow }"
        :xs="24"
        :sm="18"
        :md="18"
        :lg="12"
        :xl="12"
      >
        <ArticleCard></ArticleCard>
      </el-col>
      <el-col
        :span="4"
        :xs="0"
        :sm="5"
        :md="5"
        :lg="4"
        :xl="4"
        class="index-right"
        :class="{ show: isShow }"
      >
        <PersonCard></PersonCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Header from "../components/index/Header.vue";
import ArticleCard from "../components/index/ArticleCard.vue";
import PersonCard from "../components/index/PersonCard.vue";

export default {
  name: "index",
  components: {
    Header,
    ArticleCard,
    PersonCard,
  },
  data() {
    return {
      isShow: false,
    };
  },
  created() {
    let that = this;
    setTimeout(() => {
      that.isShow = true;
    }, 1000);
  },
};
</script>

<style scoped>
#app {
  position: relative !important;
}
.el-row {
  margin-bottom: 20px;
}

.index-top {
  transform: translateY(-500%);
  transition: transform 0.4s ease;
}
.index-left {
  transform: translateX(-500%);
  transition: transform 0.4s ease;
}
.index-right {
  transform: translateX(500%);
  transition: transform 0.4s ease;
}
.index-top.show {
  transform: translateY(0);
}
.index-left.show {
  transform: translateX(0);
}
.index-right.show {
  transform: translateX(0);
}

@media only screen and (max-width: 767px) {
  .el-col-xs-0 {
    display: none !important;
  }
}
</style>