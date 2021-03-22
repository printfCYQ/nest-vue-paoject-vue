<template>
  <div class="main">
    <div class="main-title">
      <div class="title-name">项目</div>
      <div class="title-buttons">
        <el-button type="success">新增</el-button>
        <el-input
          class="search"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="inputValue"
        >
        </el-input>
      </div>
    </div>
    <div class="main-form">
      <el-table height="90%" :data="tableData" style="width: 100%">
        <el-table-column
          v-for="item in tableArgs"
          :key="item"
          :prop="item.prop"
          :label="item.label"
          align="center"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 9, 12]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getProjectsByUserApi } from "../../api/project/index";
export default {
  data() {
    return {
      inputValue: "",
      tableData: [],
      tableArgs: [
        { prop: "date", label: "创建日期" },
        { prop: "name", label: "名称" },
        { prop: "address", label: "地址" },
        { prop: "stage", label: "阶段" },
        { prop: "identity", label: "身份" },
      ],
      pageTotal: 0, //数据总条数
      currentPage: 1, //当前页码
      pageSize: 6, //每页数据条数
    };
  },
  created() {
    this.getProjectsByUser();
  },
  methods: {
    //获取数据
    getProjectsByUser() {
      let userid = localStorage.getItem("userid");
      let pageObj = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      getProjectsByUserApi(userid, pageObj).then((res) => {
        console.log(res);
        this.tableData = res.msg.data;
        this.pageTotal = res.msg.total;
      });
    },
    // 分页组件
    handleSizeChange(val) {
      this.pageSize = val;
      this.getProjectsByUser();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getProjectsByUser();
    },
  },
};
</script>

<style lang="scss">
.main {
  width: 85vw;
  animation: init3 1s;
  .main-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
    .title-name {
      font-style: 24px;
      font-weight: bold;
    }
    .title-buttons {
      padding-right: 2rem;
      display: flex;
      .search {
        margin-left: 10px;
      }
    }
  }

  .main-form {
    margin-top: 20px;
    margin-right: 2rem;
    height: 90%;
    .pagination {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
}
@keyframes init3 {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}
</style>