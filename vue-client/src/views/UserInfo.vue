<template>
  <el-row class="main" :getter="20">
    <el-col :span="8">
      <!-- 左上 -->
      <el-card shadow="always">
        <div class="user">
          <div class="user-info">
            <img src="../assets/user.jpg" alt="用户头像" />
            <p class="name">{{ user.userName }}</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            身份: <span>{{ user.identity }}</span>
          </p>
          <p>
            邮箱 <span>{{ user.userEmail }}</span>
          </p>
        </div>
      </el-card>
    </el-col>
    <el-col :span="16"> </el-col>
  </el-row>
</template>

<script>
export default {
  name: "UserInfo",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  mounted() {
    console.log(this.user);
  },
};
</script>

<style lang='scss' scoped>
.main {
  margin: 20px;
  .user {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    .user-info {
      display: flex;
      align-items: center;
      img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        margin-right: 30px;
      }
      .name {
        font-size: 32px;
        margin-bottom: 20px;
      }
    }
  }
  .login-info {
    p {
      line-height: 28px;
      font-size: 16px;
      color: #999;
      span {
        margin-left: 10px;
        color: #666;
      }
    }
  }
}
</style>