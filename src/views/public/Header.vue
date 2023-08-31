<template>
  <lay-row>
    <lay-col md="18" class="header-left">
      <lay-icon :type="conf.collapse ? 'layui-icon-spread-left' : 'layui-icon-shrink-right'" @click="collapseMenu"></lay-icon>
    </lay-col>
    <lay-col md="6">
      <lay-menu theme="light">
        <lay-menu-item>
          <lay-icon type="layui-icon-home"></lay-icon>
        </lay-menu-item>
        <lay-sub-menu>
          <template #title>
            <lay-icon type="layui-icon-username"></lay-icon>Marx
          </template>
          <lay-menu-item>用户信息</lay-menu-item>
          <lay-menu-item>退出登录</lay-menu-item>
        </lay-sub-menu>
      </lay-menu>
    </lay-col>
  </lay-row>


</template>
<script setup>
import { toRefs, defineEmits } from 'vue'
const props = defineProps({
  conf: {
      type: Object
  },
  collapse: {
    type: Boolean
  }
})
const emit = defineEmits(["collapseMenu"])
const collapse = toRefs(props)
console.log(collapse)
const { conf } = props
console.log(conf)
console.log(conf.collapse)
console.log(props.collapse)
const collapseMenu = () => {
  emit("collapseMenu")
}
</script>
<style lang="scss" scoped>
.header-left {
  text-align: left;
  text-indent: .2rem;
}
</style>