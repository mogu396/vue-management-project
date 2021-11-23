<template>
  <el-row class="Aside">
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-aside"
        background-color="#333"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <router-link
              v-for="(childrenItem, childrenIndex) in item.children"
              :to="childrenItem.path"
              :key="childrenIndex"
            >
              <el-menu-item :index="childrenItem.path">
                <span slot="title">{{ childrenItem.name }}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      items: [
        {
          icon: "el-icon-money",
          name: "资金管理",
          path: "fundmanage",
          children: [{ path: "acountmanage", name: "资金流水" }],
        },
        {
          icon: "el-icon-user",
          name: "信息管理",
          path: "info",
          children: [{ path: "userinfo", name: "个人信息" }],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.Aside {
  width: 180px;
  min-height: 100%;
  background-color: #333;
  a {
    text-decoration: none;
  }
  .el-menu {
    border: none;
  }
}

.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}
</style>