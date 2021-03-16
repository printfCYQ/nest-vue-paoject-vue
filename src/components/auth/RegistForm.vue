<template>
  <div class="login-from">
    <!-- 登录表单头部 -->
    <header class="login-title">
      <h2>注册</h2>
      <h4>
        已有账号
        <span class="login-regist" @click="login">返回</span>
        登录
      </h4>
    </header>
    <!-- 登录表单内容 -->
    <article>
      <el-form
        :model="LoginFormData"
        :rules="rules"
        class="login-form-body"
        ref="RegistFormData"
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
        <el-form-item prop="captcha" label="验证码">
          <div class="form-code">
            <el-input v-model="LoginFormData.captcha" maxlength="4"></el-input>
            <div
              class="form-code-pic"
              @click="getNewCaptcha(captcha.id)"
              v-html="captcha.img"
            ></div>
          </div>
        </el-form-item>
      </el-form>
      <el-checkbox v-model="ready" class="login-ready"
        >我已经阅读并同意
      </el-checkbox>
      <span class="login-ready-span" @click="readyClick">《相关协议》</span>
      <div class="login-button">
        <el-button round type="primary" @click="regist">注册</el-button>
      </div>
    </article>
    <Ready ref="readyBox"></Ready>
  </div>
</template>

<script>
import Ready from "./Ready.vue";

import { ElMessage } from "element-plus";
import { registApi, captchaApi, verifyApi } from "../../api/auth/auth";
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
        checkpassword: "",
        captcha: "",
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
          title: "密码",
          name: "password",
          value: "",
          meta: {
            max: 30,
            type: "password",
          },
        },
        {
          title: "确认密码",
          name: "checkpassword",
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
        checkpassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      ready: false,
      captcha: {
        id: "-1",
        img: "",
      },
    };
  },
  methods: {
    /**
     * 注册-表单校验
     */
    async regist() {
      let that = this;
      that.$refs.RegistFormData.validate((valid) => {
        if (valid) {
          if (!that.ready) {
            ElMessage.warning({
              message: "请阅读并勾选相关协议",
              type: "warning",
            });
          } else {
            that.sendRegist();
          }
        } else {
          return false;
        }
      });
    },

    /**
     * 注册-判断密码-验证码
     */
    async sendRegist() {
      if (this.LoginFormData.password !== this.LoginFormData.checkpassword) {
        ElMessage.warning({
          message: "两次密码不相同",
          type: "warning",
        });
        return;
      } else {
        const captcha = {
          captcha: this.LoginFormData.captcha,
          id: this.captcha.id,
        };
        const result = await verifyApi(captcha);
        console.log(result);
        if (result.code === 0) {
          const res = await registApi(this.LoginFormData);
          if (res.code === 0) {
            ElMessage.success({
              message: res.msg + "，请登录",
              type: "success",
            });
            this.login();
          }
        } else {
          this.getCaptcha();
          this.LoginFormData.captcha = "";
        }
      }
    },

    /**返回登录 */
    login() {
      store.commit("setEvent", "login");
    },

    /**确认协议 */
    readyClick() {
      this.$refs.readyBox.dialogVisible = true;
    },

    /**更新验证码 */
    getNewCaptcha(id) {
      this.getCaptcha(id);
    },

    /**获取验证码 */
    async getCaptcha(id) {
      const res = await captchaApi(id);
      console.log(res);
      if (res.code === 0) {
        this.captcha.id = res.msg.id;
        this.captcha.img = res.msg.img;
      }
    },
  },
  mounted() {
    this.getCaptcha();
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
      .password,
      .checkpassword {
        width: 80%;
        padding: 5px;
      }
      .password {
        padding-top: 5px;
      }
      .form-code {
        display: flex;
        .el-input {
          margin-left: 5px;
          width: 40%;
        }
        .form-code-pic {
          height: 40px;
        }
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
        width: 80%;
      }
    }
  }
}
</style>
