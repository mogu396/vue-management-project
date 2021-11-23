<template>
  <div class="index">
    <Head></Head>
    <div class="container">
      <div class="left-container">
        <Aside></Aside>
      </div>
      <div class="right-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "../components/Head.vue";
import Aside from "../components/Aside.vue";
export default {
  name: "Home",
  components: { Head, Aside },
};
</script>

<style lang="scss">
.index {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .container {
    display: flex;
    justify-content: space-evenly;
    .left-container {
      display: flex;
    }
    .right-container {
      // top: 0;
      width: 100%;
      height: 100vh;
      overflow: auto;
    }
  }
}
</style>