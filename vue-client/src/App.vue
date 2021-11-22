<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import isEmpty from "./util";
export default {
  name: "App",
  components: {},
  created() {
    if (localStorage.userToken) {
      const decode = jwt_decode(localStorage.userToken);
      // token存储到vuex
      this.$store.dispatch("setIsAuthorized", !isEmpty(decode));
      this.$store.dispatch("setUser", decode);
    }
  },
};
</script>

<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
}
</style>
