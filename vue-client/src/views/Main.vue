<template>
  <div class="main">
    <div class="container">这是主页</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  background: url(../assets/backImg.jpg) no-repeat;
  background-size: 100% 100%;
  .container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 100px;
    background-color: rgba(0, 0, 0, 0.7);
    text-align: center;
    color: white;
  }
}
</style>