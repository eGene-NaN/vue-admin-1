<template>
  <div id="login">
    <!-- 内容区 -->
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="item in menuTab"
            :key="item.id"
            :class="{ current: item.current }"
            @click="toggleMenu(item)">
          {{ item.txt }}
        </li>
      </ul>
      <el-form :model="ruleForm"
               status-icon
               :rules="rules"
               ref="ruleForm"
               label-width="95px"
               class="login-form"
               size="small">
        <el-form-item prop="username"
                      class="item-form">
          <label>邮箱</label>
          <el-input type="text"
                    v-model="ruleForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label>密码</label>
          <el-input type="text"
                    v-model="ruleForm.password"
                    autocomplete="off"
                    minlength="6"
                    maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="passwords"
                      v-if="model === 'register'">
          <label>重复密码</label>
          <el-input type="text"
                    v-model="ruleForm.passwords"
                    autocomplete="off"
                    minlength="6"
                    maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="8">
            <el-col :span="14">
              <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="success"
                         class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger"
                     @click="submitForm('ruleForm')"
                     class="login-btn block">提交
          </el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  stripscript,
  validataMail,
  validataPassword,
  validataCode
} from "@/utils/validata.js";
export default {
  name: "login",

  data() {
    // 验证用户名
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validataMail(value)) {
        callback(new Error("用户名输入有误"));
      } else {
        callback();
      }
    };

    // 验证密码
    var validatePassword = (rule, value, callback) => {
      console.log(stripscript(value));
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validataPassword(value)) {
        callback(new Error("密码为6-20位字母和数字"));
      } else {
        callback();
      }
    };

    // 验证重复密码
    var validatePasswords = (rule, value, callback) => {
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };

    // 验证验证码
    var validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      } else if (validataCode(value)) {
        callback(new Error("验证码格式有误"));
      } else {
        callback();
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };

    return {
      menuTab: [
        { txt: "登录", current: true, type: "login" },
        { txt: "注册", current: false, type: "register" }
      ],
      // 模块值
      model: "login",
      // 表单数据
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    // vue 数据驱动视图渲染
    // js 操纵DOM元素
    toggleMenu(data) {
      this.menuTab.forEach(element => {
        element.current = false;
      });
      // tab高亮
      data.current = true;
      // tab切换
      this.model = data.type;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #008080;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom: 3px;
  }
  .item-form {
    margin-bottom: 15px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>
