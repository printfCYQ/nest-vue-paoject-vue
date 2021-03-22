<template>
  <div>
    <header class="header">
      <div class="header-logo">
        <img src="../../assets/logo.png" alt="" />
        <span>management</span>
      </div>
      <div class="header-messages">
        <div class="header-message" v-for="item in messages" :key="item.title">
          <span>{{ item.title }}</span>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [{ title: "我的" }, { title: "消息" }, { title: "设置" }],
    };
  },
};
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 5px 4px -4px rgba($color: gray, $alpha: 0.8);
  width: 100%;
  height: 5vh;
  align-content: center;
  animation: init2 1s;

  .header-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;

    img {
      zoom: 0.2;
    }

    span {
      margin-left: 1rem;
      font-size: 14px;
    }
  }

  .header-messages {
    display: flex;
    margin-right: 20px;
    align-items: center;

    span {
      cursor: pointer;
    }

    .header-message {
      padding: 0.5rem;
      font-size: 12px;
      text-shadow: 0 1px 1px rgba($color: gray, $alpha: 0.4);
    }
  }
}

@keyframes init2 {
  from {
    transform: translateY(-100px);
  }

  to {
    transform: translateY(0);
  }
}
</style>