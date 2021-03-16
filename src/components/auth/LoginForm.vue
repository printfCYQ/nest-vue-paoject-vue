<template>
  <div class="login-from">
    <!-- 登录表单头部 -->
    <header class="login-title">
      <h2>登录</h2>
      <h4>
        你尚未拥有账户？点击
        <span class="login-regist" @click="regist">注册</span>
        进行登录
      </h4>
    </header>
    <!-- 登录表单内容 -->
    <article>
      <el-form
        :model="LoginFormData"
        :rules="rules"
        class="login-form-body"
        ref="LoginFormData"
        label-width="100px"
      >
        <el-form-item
          v-for="item in LoginForm"
          :key="item.title"
          :label="item.title"
          :prop="item.name"
          :class="item.name"
        >
          <el-input
            v-model="LoginFormData[item.name]"
            :maxlength="item.meta.max"
            :type="item.meta.type ? item.meta.type : ''"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-checkbox v-model="ready" class="login-ready"
        >我已经阅读并同意
      </el-checkbox>
      <span class="login-ready-span" @click="readyClick">《相关协议》</span>
      <div class="login-button">
        <el-button round type="warning" @click="alter">找回</el-button>
        <el-button round type="primary" @click="login">登录</el-button>
      </div>
    </article>
    <!-- 登录表单底部 -->
    <footer>
      <h3>其他社交方式登录</h3>
      <div class="login-other">
        <img
          class="login-icon"
          v-for="img in login_icons"
          :key="img"
          :src="img"
        />
      </div>
    </footer>
    <Ready ref="readyBox"></Ready>
  </div>
</template>

<script>
import Ready from "./Ready.vue";
import weixin from "../../assets/images/Auth/weixin.png";
import qq from "../../assets/images/Auth/qq.png";
import weibo from "../../assets/images/Auth/weibo.png";
import { loginApi } from "../../api/auth/auth.ts";
import { ElMessage } from "element-plus";
import store from "../../store";
export default {
  name: "LoginForm",
  components: {
    Ready,
  },
  data() {
    return {
      LoginFormData: {
        phone: "",
        password: "",
      },
      LoginForm: [
        {
          title: "手机号",
          name: "phone",
          value: "",
          meta: {
            max: 11,
          },
        },
        {
          title: "登录密码",
          name: "password",
          value: "",
          meta: {
            max: 30,
            type: "password",
          },
        },
      ],
      rules: {
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      ready: false,
      login_icons: [weixin, qq, weibo],
    };
  },
  methods: {
    async login() {
      let that = this;
      that.$refs.LoginFormData.validate((valid) => {
        if (valid) {
          if (!that.ready) {
            ElMessage.warning({
              message: "请阅读并勾选相关协议",
              type: "warning",
            });
          } else {
            that.sendLogin();
          }
        } else {
          return false;
        }
      });
    },
    async sendLogin() {
      const res = await loginApi(this.LoginFormData);
      if (res.code === 0 && res.msg.token) {
        localStorage.setItem("token", res.msg.token);
        localStorage.setItem("userid", res.msg.userid);
        ElMessage.success({
          message: "登录成功",
          type: "success",
        });
      }
    },
    regist() {
      store.commit("setEvent", "regist");
    },
    alter() {
      store.commit("setEvent", "alter");
    },
    readyClick() {
      this.$refs.readyBox.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  .login-title {
    h2 {
      font-size: 34px;
    }
    h4 {
      font-size: 14px;
      color: rgba($color: gray, $alpha: 0.7);
      letter-spacing: 1px;
      padding: 8px 0;
      .login-regist {
        color: #426ab3;
      }
      .login-regist:hover {
        color: #6a6da9;
        cursor: pointer;
      }
    }
  }
  article {
    .login-form-body {
      .phone,
      .password {
        width: 80%;
        padding: 15px;
      }
      .password {
        padding-top: 5px;
      }
    }
    .login-ready {
      margin-left: 80px;
    }
    .login-ready-span {
      color: #426ab3;
    }
    .login-ready-span:hover {
      color: #6a6da9;
      cursor: pointer;
    }
    .login-button {
      text-align: right;
      padding: 20px 15% 0 0;
      button {
        width: 40%;
      }
    }
  }
  footer {
    position: absolute;
    bottom: 10%;
    width: 60%;
    h3 {
      color: rgba($color: gray, $alpha: 0.8);
      font-size: 14px;
      letter-spacing: 1px;
    }
    .login-other {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80%;
      .login-icon {
        max-width: 3rem;
        padding: 0 1rem;
      }
    }
  }
}
</style>
