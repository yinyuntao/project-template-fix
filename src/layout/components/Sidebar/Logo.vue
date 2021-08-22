<!-- logo标志 -->
<template>
  <div class="logo-container">
    <img src="@/assets/logo.png" alt="" />
    <span class="logo-title">MBS系统</span>
  </div>
</template>

<script>
export default {
  name: "Logo",
};
</script>

<style lang="scss" scoped>
.logo-container {
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  padding: 0 20px;
  img {
    width: 40px;
    height: 40px;
  }
  .logo-title {
    color: #fff;
    font-size: 20px;
    margin-left: 10px;
  }
}
</style>
