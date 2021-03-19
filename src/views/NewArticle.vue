<template>
  <div class="page">
    <el-page-header
      @back="goBack"
      :content="id === '' ? '新增文章页面' : '编辑文章页面'"
    >
    </el-page-header>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="ruleForm"
    >
      <el-form-item label="文章标题" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="kind">
        <el-select v-model="ruleForm.kind" placeholder="请选择分类">
          <el-option
            v-for="item in kindList"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
            {{ item.name }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章内容" prop="description">
        <el-input type="textarea" v-model="ruleForm.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          v-if="id === ''"
          type="primary"
          @click="submitForm('ruleForm')"
        >
          立即创建
        </el-button>
        <el-button v-else type="primary" @click="updataForm('ruleForm')">
          立即更新
        </el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  addProjectApi,
  findAllKindApi,
  updataProjectApi,
  findProjectByIdApi,
} from "../api/project/index";

export default {
  data() {
    return {
      id: "",
      kindList: [],
      ruleForm: {
        name: "",
        kind: "",
        description: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        kind: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        description: [{ required: true, message: "请填写", trigger: "blur" }],
      },
    };
  },
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.findProjectById(this.id);
    }
    this.findAllKind();
  },
  methods: {
    //   新增提交
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = that.ruleForm;
          obj.createrId = localStorage.getItem("userid");
          addProjectApi(obj).then((res) => {
            console.log(res);
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "新增成功",
              });
              this.goBack();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 更新提交
    updataForm(formName) {
      let that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = that.ruleForm;
          obj.createrId = localStorage.getItem("userid");
          updataProjectApi(this.id, obj).then((res) => {
            console.log(res);
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "更新成功",
              });
              this.goBack();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 获取一条数据
    findProjectById(id) {
      findProjectByIdApi(id).then((res) => {
        this.ruleForm.name = res.msg.data.name;
        this.ruleForm.description = res.msg.data.description;
        this.ruleForm.kind = res.msg.data.kind;
      });
    },

    // 分类列表
    findAllKind() {
      findAllKindApi().then((res) => {
        this.kindList = res.msg.data;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      this.id = "";
      this.resetForm('ruleForm');
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
  .ruleForm {
    margin-top: 20px;
  }
}
</style>