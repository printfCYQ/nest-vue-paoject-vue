<template>
  <div>
    <ProjectHeader></ProjectHeader>
    <div class="project-area">
      <ProjectSide></ProjectSide>
      <ProjectMain></ProjectMain>
    </div>
  </div>
</template>

<script>
import ProjectMain from "../components/project/ProjectMain.vue";
import ProjectHeader from "../components/project/ProjectHeader.vue";
import ProjectSide from "../components/project/ProjectSide.vue";
export default {
  components: {
    ProjectMain,
    ProjectHeader,
    ProjectSide,
  },
};
</script>

<style lang="scss" scoped>
.project-area {
  display: flex;
  height: 95vh;
  background-color: rgba($color: #00ae9d, $alpha: 0.1);
}
</style>