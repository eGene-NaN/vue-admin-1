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
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "layoutMain",
  setup(props, { root }) {
    const testLoginStore = root.$store.state.login.testLoginStore;
    // 字符串转json对象
    const str = ref('{"name": "是我。是我。", "title": "BBB"}');
    console.log(str.value);
    const json = reactive(JSON.parse(str.value));
    console.log(json);
    console.log(json.name);

    // json对象转字符串
    const jsonData = reactive({
      name: "是你，是你。",
      title: "AAA",
    });
    console.log(jsonData);
    const toString = ref(JSON.stringify(jsonData));
    console.log(toString.value);

    return {
      testLoginStore,
    };
  },
};
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
  padding-right: 30px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.content {
  width: 100%;
  height: 100%;
  @include webkit(box-sizing, border-box);
  // background-color: #addfaa;
}
.open {
  #main-wrap {
    padding-left: $navMenu + 30;
  }
}
.close {
  #main-wrap {
    padding-left: $navMenuMin + 30;
  }
}
</style>