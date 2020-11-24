<template>
  <div id="header-wrap">
    <div class="pull-left header-icon">
      <svg-icon iconClass="menu"
                className="menu" />
    </div>
    <div class="pull-right">
      <div class="pull-left user-icon">
        <!-- <img alt="Vue logo" src="../../../assets/123.png" /> -->
        <svg-icon iconClass="loginUser"
                  className="loginUser" />
      </div>
      <div class="pull-left user-info">管理员</div>
      <div class="pull-left header-icon">
        <svg-icon iconClass="exit"
                  className="exit" />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#header-wrap {
  position: fixed;
  top: 0;
  left: $navMenu;
  right: 0;
  height: 75px;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  line-height: 75px;
}
.header-icon {
  padding: 0 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}
.user-info {
  padding: 0 32px;
  border-right: 1px solid #ededed;
}
.user-icon {
  padding: 0 32px;
  padding-right: 1px;
  svg {
    margin-bottom: -8px;
    font-size: 30px;
    cursor: pointer;
  }
}
</style>
