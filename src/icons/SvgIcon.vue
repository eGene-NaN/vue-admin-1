<template>
  <svg :class="svgClass"
       aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
import { ref, reactive, computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  // 子组件接受参数的两种写法
  // props: ["iconClass", "className"],
  props: {
    // 对传入的值属性设定
    iconClass: {
      type: String, // 设定传入参数类型
      default: "aaa", // 设定传入参数默认值
      // default: () => [], 如果传入的是个对象类型，设置默认值时，这样写
      required: true, // 设定传入参数是否必须
      // 对传入的参数校验
      // validator: (value) => {
      //   return value >= 0;
      // },
    },
    className: {
      type: String,
      default: "bbb",
      required: false,
    },
  },

  setup(props) {
    console.log(props.iconClass);
    console.log(props.className);

    // 监听，计算属性，得出最终结果返回
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svb-icon`;
      }
    });

    return {
      iconName,
      svgClass,
    };
  },
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  // 改变颜色的写法
  fill: currentColor;
  // &.iconColor {
  //   fill: currentColor;
  //   color: red;
  // }
  // &.font20 {
  //   font-size: 50px;
  // }
}
</style>