<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category">
            <h4>
              <svg-icon icon-class="minus"></svg-icon>
              新闻
            </h4>
            <ul style="list-style:none;">
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
            </ul>
            <h4>
              <svg-icon icon-class="minus"></svg-icon>新闻
            </h4>
            <ul style="list-style:none;">
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">CCCC</el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "category",
  setup(props) {},
};
</script>
<style lang="scss" scoped>
.category {
  line-height: 30px;
  padding-left: 15px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 25px;
    left: 14px;
    bottom: 14px;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    position: relative;
    padding-left: 20px;
    height: 15px;
  }
  svg {
    position: absolute;
    left: -8px;
    top: 7px;
    background-color: #fff;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: -40px;
    &:before {
      content: "";
      position: absolute;
      left: 0px;
      top: 15px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
}
</style>