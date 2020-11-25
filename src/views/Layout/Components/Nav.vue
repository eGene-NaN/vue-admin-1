<template>
  <div id="nav-wrap">
    <h1 class="logo"><img alt="Vue logo"
           src="../../../assets/123.png" /></h1>
    <el-menu id="elmenu"
             default-active="1-4-1"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             background-color="transparent"
             text-color="#fff"
             active-text-color="fff"
             router>
      <template v-for="(item, index) in routers">
        <el-submenu v-if="!item.hidden"
                    :key="item.id"
                    :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <!-- <i :class="item.meta.icon"></i> -->
            <svg-icon :iconClass="item.meta.icon"
                      :className="item.meta.icon" />
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item-group>
            <el-menu-item v-for="subItem in item.children"
                          :key="subItem.id"
                          :index="subItem.path">{{ subItem.meta.name }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import {
  ref,
  reactive,
  isRef,
  toRefs,
  onMounted,
  computed,
} from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    // const isCollapse = ref(false);
    // 监听
    const isCollapse = computed(() => {
      return root.$store.state.isCollapse;
    });

    // console.log(root.$router.options);
    const routers = reactive(root.$router.options.routes);

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath);
    };
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath);
    };

    console.log("store's state " + root.$store.state.stateCount);
    console.log("store's getters " + root.$store.getters.gettersCount);
    root.$store.commit("SET_COUNT", 100);

    return {
      isCollapse,
      handleOpen,
      handleClose,
      routers,
    };
  },
};
</script>
<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.logo {
  text-align: center;
  img {
    margin: 28px, auto, 25px;
    width: 92px;
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
}
</style>
