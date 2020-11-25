<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#main-wrap {
  height: 90vh;
  // position: fixed;
  // left: $navMenu;
  // top: 75px;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  // -webkit-box-sizing: border;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 30;
  // padding-left: $navMenu + 30;
  padding-right: 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: 100%;
  // padding: 30px, 30px, 0px, 30px;
  // -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #addfaa;
}
.open {
  #main-wrap {
    // width: $navMenu;
    padding-left: $navMenu + 30;
  }
}
.close {
  #main-wrap {
    // width: $navMenuMin;
    padding-left: $navMenuMin + 30
  }
}
</style>