<template>
  <div>
    <el-dialog title="新增"
               :visible.sync="dialogFormVisible"
               @close="close"
               width="580px">
      <el-form :model="form">
        <el-form-item label="类别："
                      :label-width="formLabelWidth">
          <el-select v-model="form.region"
                     placeholder="请选择活动区域">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题："
                      :label-width="formLabelWidth">
          <el-input v-model="form.name"
                    placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="概况："
                      :label-width="formLabelWidth">
          <el-input v-model="form.name"
                    type="textarea"
                    style="height: 160px"
                    placeholder="请输入内容"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger"
                   @click="dialogFormVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogInfo",
  data() {
    return {
      dialogFormVisible: true,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "70px",
    };
  },

  methods: {
    close() {
      this.dialogFormVisible = false;
      this.$emit("update:flag", false);
      // this.$emit("close", false);
    },
  },

  // 单向流数据，父级 -> 子级，不能反向修改
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
  },

  watch: {
    flag: {
      handler(newValue, oldValue) {
        this.dialogFormVisible = newValue;
      },
    },
  },
};
</script>

<style scoped>
</style>