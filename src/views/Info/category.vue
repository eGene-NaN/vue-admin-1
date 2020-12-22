<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category">
            <h4>
              <svg-icon icon-class="minus"></svg-icon>
              <label>新闻</label>
              <div class="button-group">
                <el-button size="mini"
                           type="danger"
                           round>编辑</el-button>
                <el-button size="mini"
                           type="success"
                           round>添加子级</el-button>
                <el-button size="mini"
                           round>删除</el-button>
              </div>
            </h4>
            <ul style="list-style:none;">
              <li>国内
                <div class="button-group">
                  <el-button size="mini"
                             type="danger"
                             round>编辑</el-button>
                  <el-button size="mini"
                             round>删除</el-button>
                </div>
              </li>
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
        <el-col :span="16">
          <h4 class="menu-title">一级分类菜单</h4>
          <el-form label-position="center"
                   label-width="140px"
                   style="width:420px"
                   size="small"
                   :model="formLabelAlign">
            <el-form-item label="一级菜单名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="二级菜单名称">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "category",
  setup(props) {
    const formLabelAlign = reactive({
      name: "",
      region: "",
      type: "",
    });
    return {
      formLabelAlign,
    };
  },
};
</script>
<style lang="scss" scoped>
// @import "../../styles/config.scss";

.menu-title {
  line-height: 40px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.category {
  position: relative;
  line-height: 40px;
  padding-left: 15px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    top: 25px;
    left: 14px;
    bottom: 19px;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    position: relative;
    padding-left: 20px;
    height: 15px;
    margin-bottom: auto;
    height: auto;
  }
  ul {
    margin-top: auto;
  }
  svg {
    position: absolute;
    left: -8px;
    top: 12px;
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
      top: 20px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  z-index: 2;
  top: -3px;
  right: 11px;
  button {
    font-size: 5px;
  }
}
.hr-e9e9e9 {
  width: calc(100% + 60px);
  margin-left: -30px;
  border: none;
  border-bottom: 1px solid #e9e9e9;
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>