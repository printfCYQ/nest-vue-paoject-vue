<template>
  <div>
    <div class="card-box">
      <div class="avator">
        <img :src="logo" alt="" />
      </div>
      <div class="name">{{ userPhone }}</div>
      <div v-for="item in dataList" :key="item.id" class="card-list">
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script>
import logo from "../../assets/logo.png";
import { findUserByIdApi } from "../../api/user/index";

export default {
  data() {
    return {
      logo: logo,
      userPhone: "",
      dataList: [
        { id: 0, title: "一" },
        { id: 1, title: "一" },
        { id: 2, title: "一" },
        { id: 3, title: "一" },
      ],
    };
  },
  created() {
    const userid = localStorage.getItem("userid");
    this.findUserById(userid);
  },
  methods: {
    findUserById(userid) {
      findUserByIdApi(userid).then((res) => {
        this.userPhone = res.msg.data.phone;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  .avator {
    display: flex;
    justify-content: center;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
  }

  .name {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    margin-top: 20px;
  }

  .card-list {
    border-bottom: 1px solid #eee888;
    padding: 5px 0;
    cursor: pointer;
  }
}
</style>
<style>
.card-box .avator img {
  animation: light 2s linear both infinite;
}
@keyframes light {
  0% {
    box-shadow: 0 0 1px white, 0 0 5px white, 0 0 10px white, 0 0 20px purple,
      0 0 5px purple, 0 0 11px pink;
  }
  100% {
    box-shadow: 0 0 5px white, 0 0 10px yellow, 0 0 15px yellow, 0 0 8px green,
      0 0 10px green, 0 0 12px blue;
  }
}
</style>