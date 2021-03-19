<template>
  <div>
    <div class="login">
      <!-- 背景图片 -->
      <div class="login-img">
        <img :src="login_background" />
        <div class="login-img-mask"></div>
      </div>
      <!-- 表单 -->
      <div class="login-card" v-if="formEvent === 'login'">
        <div class="login-bg"></div>
        <LoginForm class="login-form"></LoginForm>
      </div>

      <div class="login-card" v-else-if="formEvent === 'regist'">
        <div class="login-bg"></div>
        <RegistForm class="login-form"></RegistForm>
      </div>

      <div class="login-card" v-else-if="formEvent === 'alter'">
        <div class="login-bg"></div>
        <AlterForm class="login-form"></AlterForm>
      </div>
    </div>
    <img :src="login_background" />
  </div>
</template>

<script lang="ts">
import { hello } from "../api/user/index";
import LoginForm from "../components/auth/LoginForm.vue";
import RegistForm from "../components/auth/RegistForm.vue";
import AlterForm from "../components/auth/AlterForm.vue";
import login_background from "../assets/images/auth/auth_background.png";
import store from "../store";
export default {
  components: { LoginForm, RegistForm, AlterForm },
  setup() {},
  data() {
    return {
      login_background,
      formEvent: "login",
    };
  },
  created() {
    // console.log(this.$store.state.count);
    // this.$store.commit("increment");
    // console.log(this.$store.state.count);
    hello().then((res) => {
      console.log(res);
    });
  },
  computed: {
    event() {
      return store.state.event;
    },
  },
  watch: {
    event(newEvent: string) {
      console.log(newEvent);
      this.formEvent = newEvent;
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    img {
      width: 100%;
      height: 100%;
    }
    .login-img-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.05);
    }
  }
  .login-card {
    width: 58%;
    height: 60%;
    position: absolute;
    border-radius: 10px;
    display: flex;
    .login-bg {
      width: 45%;
      height: 100%;
      background-color: rgba($color: #fff, $alpha: 0.4);
      border-radius: 10px 0px 0px 10px;
    }
    .login-form {
      width: 50%;
      min-width: 30rem;
      background-color: #fff;
      padding: 70px 10px 0 60px;
      border-radius: 0 10px 10px 0;
    }
  }
}
</style>
