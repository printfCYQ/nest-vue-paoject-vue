<template>
  <div>
    <el-radio v-model="kind" label="0" border @change="radioChange('0')"
      >全部</el-radio
    >
    <el-radio
      v-for="item in kindList"
      :key="item._id"
      v-model="kind"
      :label="item._id"
      border
      @change="radioChange(item._id)"
      >{{ item.name }}</el-radio
    >
    <el-row :gutter="20" class="row" :class="{ show: isShow }">
      <el-col
        v-for="item in dataList"
        :key="item._id"
        :span="8"
        :xs="24"
        :sm="12"
        :md="12"
        :lg="8"
        :xl="8"
      >
        <div class="box-card">
          <div class="card-header">{{ item.name }}</div>
          <div class="card-content">{{ item.description }}</div>
          <div class="card-footer">
            <div>
              <el-tag type="danger">{{ getKindName(item.kind) }}</el-tag>
            </div>
            <div v-if="item.createrId !== userid">
              <i class="el-icon-location-outline"></i>
            </div>
            <div v-else>
              <i class="el-icon-edit" @click="handelEdit(item._id)"></i>
              <i class="el-icon-delete" @click="handelDelete(item._id)"></i>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[6, 9, 12]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
    >
    </el-pagination>
    <!-- <div class="load-more" @click="loadMore">查看更多</div> -->
  </div>
</template>

<script>
import {
  removeProjectApi,
  findAllKindApi,
  findProjectByKindPageApi,
} from "../../api/project/index";

export default {
  data() {
    return {
      isShow: false, //控制动画
      userid: "", //userid 判断是否为自己文章
      dataList: [], //数据列表
      kindList: [], //分类列表
      pageTotal: 0, //数据总条数
      currentPage: 1, //当前页码
      pageSize: 6, //每页数据条数
      kind: "0", //分类查看
    };
  },
  created() {
    this.userid = localStorage.getItem("userid");
    this.findAllKind();
    this.findProjectByKindPage();
  },

  methods: {
    // 获取文章分页数据
    findProjectByKindPage() {
      let pageObj = {
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      };
      let kind = this.kind;
      this.isShow = false;
      findProjectByKindPageApi(kind, pageObj).then((res) => {
        console.log(res);
        setTimeout(() => {
          this.dataList = res.msg.data;
          this.pageTotal = res.msg.total;
          this.isShow = true;
        }, 500);
      });
    },

    //获取分类列表
    findAllKind() {
      findAllKindApi().then((res) => {
        this.kindList = res.msg.data;
      });
    },

    // 删除文章
    handelDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.doDelete(id);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    // 删除操作
    doDelete(id) {
      removeProjectApi(id).then((res) => {
        if (res.code === 0) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
        }
      });
      this.findProjectByKindPage();
    },

    handelEdit(id) {
      this.$router.push({ path: '/newArticle', query: { id: id }});
    },

    // 分类查看
    radioChange(val) {
      this.kand = val;
      this.findProjectByKindPage();
    },

    getKindName(id) {
      let val = "";
      this.kindList.forEach((item) => {
        if (item._id === id) {
          val = item.name;
          return;
        }
      });
      return val;
    },

    // 分页组件
    handleSizeChange(val) {
      this.pageSize = val;
      this.findProjectByKindPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.findProjectByKindPage();
    },

    loadMore() {
      this.dataList.push();
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  transform: translateX(-500%);
  transition: transform 0.4s ease;
  margin-top: 20px;
}
.row.show {
  transform: translateX(0);
}
.box-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  .card-header {
    cursor: pointer;
    padding: 15px;
    border-bottom: 1px solid #ebeef5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .card-content {
    padding: 15px;
    height: 150px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 32px;
  }

  .card-footer {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 24px;
    cursor: pointer;

    i {
      margin: 0 5px;
    }

    i:hover {
      color: #409eff;
    }
  }
}
.box-card:hover {
  transform: scale(1.1);
  transition: transform 0.4s ease;
}
.load-more {
  text-align: center;
  cursor: pointer;
}
.load-more:hover {
  color: #409eff;
}
</style>