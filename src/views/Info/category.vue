<template>
  <div id="category">
    <el-button type="danger"
               @click="addFirst({ type: 'category_first_add' })">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category">
            <!-- 一级分类 -->
            <div v-for="firstItem in category.item"
                 :key="firstItem.id">
              <h4>
                <svg-icon icon-class="minus"></svg-icon>
                <label>{{ firstItem.category_name }}
                </label>
                <div class="button-group">
                  <el-button size="mini"
                             type="danger"
                             @click="editCategory({ data: firstItem, type: 'category_first_edit' })"
                             round>编辑</el-button>
                  <el-button size="mini"
                             type="success"
                             round>添加子级</el-button>
                  <el-button size="mini"
                             round
                             @click="deleteCategoryConfirm(firstItem.id)">删除</el-button>
                </div>
              </h4>
              <!-- 二级分类 -->
              <ul v-if="firstItem.children"
                  style="list-style:none;">
                <li v-for="childrenItem in firstItem.children"
                    :key="childrenItem.id">{{ childrenItem.category_name }}
                  <div class="button-group">
                    <el-button size="mini"
                               type="danger"
                               round>编辑</el-button>
                    <el-button size="mini"
                               round>删除</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类菜单</h4>
          <el-form :model="ruleForm"
                   ref="categoryForm"
                   label-position="center"
                   label-width="140px"
                   style="width:420px"
                   size="small">
            <el-form-item label="一级菜单名称"
                          v-if="categoryFirst">
              <el-input v-model="ruleForm.categoryName"
                        :disabled="categoryFirstDisabled"></el-input>
            </el-form-item>
            <el-form-item label="二级菜单名称"
                          v-if="categorySec">
              <el-input v-model="ruleForm.secCategoryName"
                        :disabled="categorySecDisabled"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger"
                         @click="submit"
                         :loading="submitButtonLoading"
                         :disabled="submitButtonDisabled">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {
  AddFirstCategory,
  GetCategory,
  DeleteCategory,
  EditCategory,
} from "@/api/news.js";
import { ref, reactive, onMounted, watchEffect } from "@vue/composition-api";
import { global } from "@/utils/global_V3.0.js";
export default {
  name: "category",
  setup(props, { root, refs }) {
    // global
    const { str: aaa, confirm } = global();

    /**
     * ref
     */
    const categoryFirst = ref(true);
    const categorySec = ref(true);
    const submitButtonLoading = ref(false);
    const categoryFirstDisabled = ref(true);
    const categorySecDisabled = ref(true);
    const submitButtonDisabled = ref(true);
    const deleteCategoryId = ref("");
    const submitButtonType = ref("");
    /**
     * reactive
     */
    // const form = reactive({
    //   categoryName: "",
    //   secCategoryName: "",
    // });

    // 表单绑定数据
    const ruleForm = reactive({
      categoryName: "",
      secCategoryName: "",
    });

    const category = reactive({
      item: [
        {
          id: "01",
          category_name: "国际信息",
          children: [
            {
              id: "002",
              category_name: "日本",
            },
          ],
        },
      ],
      current: [],
    });

    /**
     * methonds
     */
    const submit = () => {
      if (submitButtonType.value === "category_first_add") {
        addFirstCategory();
      }
      if (submitButtonType.value === "category_first_edit") {
        editFirstCategory();
      }
    };

    const addFirstCategory = () => {
      if (!ruleForm.categoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "error",
        });
        return;
      }
      submitButtonLoading.value = true;
      AddFirstCategory({ categoryName: ruleForm.categoryName })
        .then((response) => {
          let data = response.data;
          if (data.resCode === 0) {
            root.$message({
              message: data.message,
              type: "success",
            });
            // category.item.push(response.data.data);
            getCategory();
            submitButtonLoading.value = false;
            refs.categoryForm.resetFields();
          }
        })
        .catch((error) => {
          submitButtonLoading.value = false;
          refs.categoryForm.resetFields();
        });
    };

    const addFirst = (params) => {
      categoryFirst.value = true;
      categorySec.value = false;
      categoryFirstDisabled.value = false;
      categorySecDisabled.value = false;
      submitButtonDisabled.value = false;
      submitButtonType.value = params.type;
      console.log(submitButtonType.value);
    };

    const getCategory = () => {
      GetCategory()
        .then((response) => {
          let responseData = response.data.data.data;
          category.item = responseData;
        })
        .catch((error) => {
          console.log("getCategory Error");
        });
    };

    const deleteCategoryConfirm = (categoryId) => {
      // DeleteCategory({
      //   categoryId: categoryId,
      // })
      //   .then((response) => {
      //     getCategory();
      //   })
      //   .catch((error) => {
      //     console.log("deleteBACError");
      //   });
      deleteCategoryId.value = categoryId;
      confirm({
        content: "确认删除当前分类吗？",
        tip: "警告",
        fn: () => {
          DeleteCategory({
            categoryId: deleteCategoryId.value,
          })
            .then((response) => {
              // 第一种方法，重新取请求接口
              // getCategory();
              // 第二种方法，操作数组，找到要删除的那个元素Id，利用splice函数删除
              // let index = category.item.findIndex(
              //   (item) => item.id == deleteCategoryId.value
              // );
              // category.item.splice(index, 1);
              // 第三种方法，利用数组的过滤函数filter，重新过滤出一个符合条件的数组
              let newData = category.item.filter(
                (item) => item.id != deleteCategoryId.value
              );
              category.item = newData;
            })
            .catch((error) => {
              console.log("deleteCategoryError");
            });
        },
        catchFn: () => {
          deleteCategoryId.value = "";
        },
        id: "deleteCategory",
      });
    };

    // 编辑分类
    const editCategory = (params) => {
      categoryFirstDisabled.value = false;
      categorySec.value = false;
      submitButtonDisabled.value = false;

      ruleForm.categoryName = params.data.category_name;
      submitButtonType.value = params.type;
      category.current = params.data;
    };

    const editFirstCategory = () => {
      if (category.current.length == 0) {
        root.$message({
          message: "未选择分类！！",
          type: "error",
        });
        return;
      }

      let requestDate = {
        id: category.current.id,
        categoryName: ruleForm.categoryName,
      };
      EditCategory(requestDate)
        .then((response) => {
          root.$message({
            message: response.data.message,
            type: "success",
          });
          // getCategory();
          category.current.category_name = response.data.data.data.categoryName;
          ruleForm.categoryName = "";
          category.current = [];
        })
        .catch((error) => {
          console.log("editCategory Error");
        });
    };

    /**
     * 生命周期
     */
    // 画面挂载完成后执行
    onMounted(() => {
      getCategory();
    });

    return {
      // ref
      category,
      categoryFirst,
      categorySec,
      submitButtonLoading,
      categoryFirstDisabled,
      submitButtonDisabled,
      categorySecDisabled,
      deleteCategoryId,
      submitButtonType,
      //reactive
      ruleForm,
      // methods
      submit,
      addFirst,
      deleteCategoryConfirm,
      editCategory,
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