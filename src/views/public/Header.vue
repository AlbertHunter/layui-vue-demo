<template>
  <lay-row>
    <lay-col md="14" class="header-left">
      <span class="header-left__icon">
        <lay-icon :type="conf.collapse ? 'layui-icon-spread-left' : 'layui-icon-shrink-right'" @click="collapseMenu"></lay-icon>
      </span>
      <lay-breadcrumb>
        <router-link :to="(breadcrumb.hasOwnProperty('children')) ? '#' :breadcrumb.path">
          <lay-breadcrumb-item :title="breadcrumb.title"></lay-breadcrumb-item>
        </router-link>
        <template v-if="breadcrumb.hasOwnProperty('children')">
          <router-link :to="breadcrumb.children.path">
             /  <lay-breadcrumb-item :title="breadcrumb.children.title"></lay-breadcrumb-item>
          </router-link>
        </template>
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
            <router-link to="/user/index" @click="() => addUserToTabMenu()">用户信息</router-link>
          </lay-menu-item>
          <lay-menu-item>退出登录</lay-menu-item>
        </lay-sub-menu>
      </lay-menu>
    </lay-col>
  </lay-row>
</template>
<script setup>
import { toRefs, computed } from 'vue'
import { useStore } from 'vuex'
const props = defineProps({
  conf: {
      type: Object
  },
  collapse: {
    type: Boolean
  }
})
const store = useStore()
const emit = defineEmits(["collapseMenu"])
const collapse = toRefs(props)
console.log(collapse)
const { conf } = props
// console.log(conf)
// console.log(conf.collapse)
// console.log(props.collapse)
const collapseMenu = () => {
  emit("collapseMenu")
}
const breadcrumb = computed(() => { return store.state.breadcrumb })
// const breadcrumb = computed({
//     get: () => store.state.breadcrumb,
//     set: (val) => store.state.breadcrumb = val
//   })

const addUserToTabMenu = () => {
  const item = {
        "id": 999,
        "title": "用户信息",
        "path": "/user/index"
      }
  store.dispatch('addTabMenu', { item })
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
