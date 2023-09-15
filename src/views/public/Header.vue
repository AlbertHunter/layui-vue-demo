<template>
  <lay-row>
    <lay-col md="14" class="header-left">
      <span class="header-left__icon">
        <lay-icon :type="conf.collapse ? 'layui-icon-spread-left' : 'layui-icon-shrink-right'" @click="collapseMenu"></lay-icon>
      </span>
      <lay-breadcrumb>
        <lay-breadcrumb-item title="工作空间"></lay-breadcrumb-item>
        <lay-breadcrumb-item title="控制台"></lay-breadcrumb-item>
        <lay-breadcrumb-item title="访问量"></lay-breadcrumb-item>
      </lay-breadcrumb>
    </lay-col>
    <lay-col md="10" class="header-right">
      <lay-icon type="layui-icon-refresh"></lay-icon>
      <lay-icon type="layui-icon-home"></lay-icon>
      <lay-menu theme="light">
        <lay-sub-menu>
          <template #title>
            <lay-icon type="layui-icon-username"></lay-icon>Marx
          </template>
          <lay-menu-item>
            <router-link to="/user/index">用户信息</router-link>
          </lay-menu-item>
          <lay-menu-item>退出登录</lay-menu-item>
        </lay-sub-menu>
      </lay-menu>
    </lay-col>
  </lay-row>
</template>
<script setup>
import { toRefs } from 'vue'
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
  &__icon {
    margin-right: .3rem;
    .layui-icon {
      cursor: pointer;
    }
  }
}
.header-right {
  display: flex;
  justify-content: end;
  .layui-icon {
    cursor: pointer;
  }
  .layui-icon-refresh {
    margin-right: .5rem;
  }
}
</style>
