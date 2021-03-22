<template>
  <div class="side">
    <div class="side-items">
      <div class="side-item" v-for="item in items" :key="item.title">
        <i :class="item.icon"></i>
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "项目", icon: "el-icon-folder-opened" },
        { title: "消息" },
        { title: "设置" },
      ],
    };
  },
};
</script>

<style lang="scss">
.side {
  width: 15vw;
  height: 100%;

  .side-items {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    animation: init1 1s;

    .side-item {
      width: 70%;
      margin-left: 1rem;
      padding: 1rem 1rem 1rem 2rem;
      font-style: 16px;
      letter-spacing: 1px;
      text-shadow: 0 1px 1px rgba($color: gray, $alpha: 0.4);
      cursor: pointer;
    }

    .side-item:first-child {
      margin-top: 1rem;
    }
    .side-item:hover {
      background: rgba($color: gray, $alpha: 0.2);
    }
  }
}
@keyframes init1 {
  from {
    margin-top: 10rem;
  }

  to {
    margin-top: 0;
  }
}
</style>