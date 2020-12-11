<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型：</label>
          <div class="wrap-content">
            <el-select v-model="value"
                       placeholder="请选择"
                       style="width: 100%">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：</label>
          <div class="wrap-content">
            <el-date-picker v-model="value1"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            style="width: 100%">
            </el-date-picker>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <div class="label-wrap key-word">
          <label for="">关键字：</label>
          <div class="wrap-content">
            <el-select v-model="search_key"
                       style="width: 100%">
              <el-option v-for="item in searchOption"
                         :key="item.value"
                         :value="item.value"
                         :label="item.label"></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="search_keyWord"
                  placeholder="请输入内容"
                  style="width: 100%"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger"
                   style="width: 100%">搜索</el-button>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="2">
        <el-button type="danger"
                   class="pull-right"
                   style="width: 100%">
          新增</el-button>
      </el-col>
    </el-row>
    <div class="black-space-30 "></div>
    <!-- 表格数据 -->
    <el-table :data="tableData"
              border
              :header-cell-style="headClass"
              style="width: 100%">
      <el-table-column type="selection"
                       width="45"
                       align="center">
      </el-table-column>
      <el-table-column prop="title"
                       label="标题"
                       width="830">
      </el-table-column>
      <el-table-column prop="category"
                       label="类型"
                       width="130">
      </el-table-column>
      <el-table-column prop="date"
                       label="日期"
                       width="240">
      </el-table-column>
      <el-table-column prop="user"
                       label="管理人"
                       width="115">
      </el-table-column>
      <el-table-column label="操作"
                       align="center">
        <template>
          <el-button type="danger"
                     size="small">删除</el-button>
          <el-button type="success"
                     size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-30 "></div>
    <!-- 分页 -->
    <el-row>
      <el-col :span="12">
        <el-button>批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="2"
                       :page-sizes="[10, 20, 50, 100]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="1000"
                       class="pull-right">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive, ref } from "@vue/composition-api";
export default {
  name: "infoIndex",
  setup(props) {
    const options = reactive([
      {
        value: "1",
        label: "国际信息",
      },
      {
        value: "2",
        label: "国内信息",
      },
      {
        value: "3",
        label: "行业信息",
      },
    ]);

    // 搜索关键字
    const searchOption = reactive([
      { value: "id", label: "ID" },
      { value: "title", label: "标题" },
    ]);
    const search_key = ref("id");
    const search_keyWord = ref("");
    const value = ref("");
    const value1 = ref("");

    const tableData = reactive([
      {
        title: "上海市普陀区金沙江路 1518 弄",
        category: "国内信息",
        date: "2016-05-02",
        user: "管理员",
      },
      {
        title: "上海市普陀区金沙江路 1518 弄",
        category: "国内信息",
        date: "2016-05-02",
        user: "管理员",
      },
      {
        title: "上海市普陀区金沙江路 1518 弄",
        category: "国内信息",
        date: "2016-05-02",
        user: "管理员",
      },
      {
        title: "上海市普陀区金沙江路 1518 弄",
        category: "国内信息",
        date: "2016-05-02",
        user: "管理员",
      },
      {
        title: "上海市普陀区金沙江路 1518 弄",
        category: "国内信息",
        date: "2016-05-02",
        user: "管理员",
      },
    ]);

    const headClass = () => {
      return "text-align:center; font-weight:bold; color:#344a5f";
    };

    const handleSizeChange = (val) => {
      console.log(val);
    };

    const handleCurrentChange = (val) => {
      console.log(val);
    };

    return {
      options,
      value,
      value1,
      searchOption,
      search_key,
      search_keyWord,
      tableData,
      headClass,
      handleSizeChange,
      handleCurrentChange,
    };
  },
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 110, 40);
  }
  &.key-word {
    @include labelDom(right, 100, 40);
  }
  // .mytable {
  //   .el-table td,
  //   .el-table th {
  //     text-align: center;
  //   }
  // }
  .el-table th > .cell {
    text-align: center;
  }
  .el-table .cell {
    text-align: right;
  }
}
</style>