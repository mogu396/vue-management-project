<template>
  <div class="index">
    <Head></Head>
    <router-view></router-view>
  </div>
</template>

<script>
import Head from "../components/Head.vue";
export default {
  name: "Home",
  components: { Head },
};
</script>

<style lang="scss">
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>