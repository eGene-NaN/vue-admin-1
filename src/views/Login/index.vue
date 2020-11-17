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
               ref="loginForm"
               label-width="95px"
               class="login-form"
               size="small">
        <el-form-item prop="username"
                      class="item-form">
          <label for="userName">邮箱</label>
          <el-input id="userName"
                    type="text"
                    v-model="ruleForm.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <label for="password">密码</label>
          <el-input id="password"
                    type="password"
                    v-model="ruleForm.password"
                    autocomplete="off"
                    minlength="6"
                    maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="passwords"
                      v-if="model === 'register'">
          <label for="passwords">重复密码</label>
          <el-input id="passwords"
                    type="password"
                    v-model="ruleForm.passwords"
                    autocomplete="off"
                    minlength="6"
                    maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <label for="code">验证码</label>
          <el-row :gutter="8">
            <el-col :span="14">
              <el-input id="code"
                        v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button type="success"
                         class="block"
                         v-bind:disabled="codeButtonStatus.status"
                         @click="getSms()">{{ codeButtonStatus.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger"
                     @click="submitForm('loginForm')"
                     v-bind:disabled="loginButtonStatus"
                     class="login-btn block">{{ model === "login" ? "登录" : "注册"}}
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
  validataCode,
} from "@/utils/validata.js";

import { GetSms, Register } from "@/api/login.js";
import { ref, reactive, isRef, toRefs, onMounted } from "@vue/composition-api";
//import axios from "axios";

export default {
  name: "login",

  // vue3.0 这里放置2.0中的data数据、生命周期函数、自定义函数等
  setup(props, { context, root, refs }) {
    /**
     * context包含的内容
      attrs: (...) == this.$attrs
      emit: (...) == this.$emit
      isServer: (...) == ???
      listeners: (...) == $this.listeners
      parent: (...) == $this.parent
      refs: (...) == $this.refs
      root: (...) == this
     */
    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validataMail(value)) {
        callback(new Error("用户名输入有误"));
      } else {
        callback();
      }
    };

    // 验证密码
    let validatePassword = (rule, value, callback) => {
      console.log(stripscript(value));
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validataPassword(value)) {
        callback(new Error("密码为6-20位字母和数字"));
      } else {
        callback();
      }
    };

    // 验证重复密码
    let validatePasswords = (rule, value, callback) => {
      if (model.value === "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };

    // 验证验证码
    let validateCode = (rule, value, callback) => {
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

    /**
     * 一、声明数据
     */
    // 声明基础类型数据
    const model = ref("login"); // 模块值
    const loginButtonStatus = ref(true); // 登录按钮状态
    // 获取验证码按钮
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码",
    });
    //console.log(model.value);

    // 声明对象类型数据
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" },
    ]);
    // console.log(menuTab);

    // isRef 判断是不是基础类型
    console.log(isRef(model) ? true : false);
    // toRefs 对reactive数据进行解构，转换成普通类型
    const obj = reactive({
      x: 0,
      y: 1,
    });
    const objX = toRefs(obj);
    // console.log(objX.y.value);

    // 倒计时
    const timer = ref(null);

    // 表单绑定数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: "",
    });

    // 表单的验证
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }],
    });

    /**
     * 二、声明函数
     */
    // vue 数据驱动视图渲染
    // js 操纵DOM元素
    const toggleMenu = (data) => {
      console.log(data);
      menuTab.forEach((element, index) => {
        element.current = false;
      });
      // tab高亮
      data.current = true;
      // tab切换
      model.value = data.type;
      // 重置表单
      // refs["loginForm"].resetFields();
      refs.loginForm.resetFields();
    };

    // 获取验证码
    const getSms = () => {
      // if (ruleForm.username == "") {
      //   root.$message.error("邮箱不能为空");
      //   return false;
      // }

      // if (validataMail(ruleForm.username)) {
      //   root.$message.error("邮箱格式有误，请重新输入");
      //   return false;
      // }
      let requestData = {
        username: ruleForm.username,
        module: model.value,
      };

      // 修改获取验证码按钮状态
      codeButtonStatus.status = true;
      codeButtonStatus.text = "发送中";

      setTimeout(() => {
        // 请求接口
        GetSms(requestData)
          .then((response) => {
            console.log("GetSms Right(Promise.resolve)");
            console.log(response);
            root.$message({
              message: response.data.message,
              type: "success",
            });
            // 启用登录/注册按钮
            loginButtonStatus.value = false;
            // 调用定时器，倒计时
            countDown(5);
          })
          .catch((error) => {
            console.log("GetSms Error(Promise.reject)");
            console.log(error);
          });
      }, 3000);
    };

    // 提交
    const submitForm = (formName) => {
      refs[formName].validate((valid) => {
        if (valid) {
          let requestData = {
            username: ruleForm.username,
            password: ruleForm.password,
            code: ruleForm.code,
            module: "register",
          };
          Register(requestData)
            .then((response) => {
              let data = response.data;
              root.$message({
                message: data.message,
                type: "success",
              });
            })
            .catch((error) => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };

    // 倒计时
    const countDown = (number) => {
      // setTimeout:clearTimeout(变量) 只执行1次
      // setInterval:clearInterval(变量) 不断的执行，需要条件才会停止
      // setTimeout(() => {
      //   console.log("setTimeout");
      // }, 1000);

      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          // 清除定时器
          clearInterval(timer.value);
          codeButtonStatus.status = false;
          codeButtonStatus.text = "再次获取";
        } else {
          codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };

    // resetForm(formName) {
    //   this.$refs[formName].resetFields();
    // }

    /**
     * 三、生命周期
     */
    // 挂载完成后
    onMounted(() => {
      // GetSms();
    });

    return {
      model,
      loginButtonStatus,
      codeButtonStatus,
      menuTab,
      objX,
      ruleForm,
      rules,
      toggleMenu,
      getSms,
      submitForm,
    };
  },
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
