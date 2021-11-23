<template>
  <header class="head">
    <el-row>
      <el-col :span="6" class="logo-container" >
        <img src="../assets/logo.png" class="logo" alt="" />
        <span class="title">后台管理系统</span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="userinfo">
          <div class="welcome">
            <span class="user-name">{{ user.userName }}</span>
          </div>
          <span class="user-info">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link"
                >菜单
                <i class="el-icon-caret-bottom el-icon-right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>
export default {
  name: "Head",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    setDialogInfo(command) {
      if (!command) {
        this.$message("缺少command");
        return;
      }
      switch (command) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList() {
      // 个人信息
      this.$router.push("/userinfo");
    },
    logout() {
      // 清除token
      localStorage.removeItem("userToken");
      this.$store.dispatch("clearState");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.head {
  width: 100%;
  height: 40px;
  min-width: 600px;
  padding: 5px;
  background: #333;
  color: #fff;
  .logo-container {
    line-height: 40px;
    min-width: 400px;
    cursor: pointer;
    .logo {
      height: 40px;
      width: 40px;
      margin-right: 5px;
      vertical-align: middle;
      display: inline-block;
    }
    .title {
      vertical-align: middle;
      font-size: 22px;
      letter-spacing: 3px;
    }
  }
  .user {
    line-height: 40px;
    text-align: right;
    float: right;
    padding-right: 20px;
    .welcome {
      position: relative;
      display: inline-block;
      width: auto;
      vertical-align: middle;
      padding: 0 5px;
      .user-name {
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: #409eff;
        font-weight: 400;
        padding-right: 10px;
      }
    }
    .user-info {
      font-size: 16px;
      cursor: pointer;
      margin-right: 5px;
      .el-dropdown-link {
        font-size: 16px;
        line-height: 20px;
        font-weight: 400;
        vertical-align: middle;
      }
      .el-dropdown {
        color: #fff;
      }
    }
  }
}
</style>
