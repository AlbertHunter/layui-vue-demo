<template>
    <lay-menu v-model:selected-key="selectedKey" v-model:tree="isTree" v-model:open-keys="openKeys" :collapse="conf.collapse">
        <template v-for="item in menuData"  :key="item.id">
          <div v-if="!item.hasOwnProperty('children')">
            <router-link :to="item.link">
                <lay-menu-item :id="item.id">
                  <template #icon>
                      <lay-icon :type="item.icon"></lay-icon>
                  </template>
                  <template #title>
                      {{ item.title }}
                  </template>
                </lay-menu-item>
            </router-link>
          </div>
          <div v-else>
            <lay-sub-menu title="菜单">
              <template #icon>
                <lay-icon :type="item.icon"></lay-icon>
              </template>
              <template #title> {{ item.title }} </template>
              <template :id="row.id" v-for="row in item.children" :key="row.id">
                <router-link :to="row.link">
                  <lay-menu-item  class="sub-menu" :id="row.id">
                    <template #icon>
                      <lay-icon :type="row.icon"></lay-icon>
                    </template>
                    <template #title>
                      {{ row.title }}
                    </template>
                  </lay-menu-item>
                </router-link>
              </template>
            </lay-sub-menu>
          </div>
        </template>
    </lay-menu>
</template>

<script setup name="Menu">
import { ref } from 'vue'
const props = defineProps({
  conf: Boolean
})
const selectedKey = ref("1")
const openKeys = ref([])
const isTree = ref(true)
const menuData = [
  {
    id: 1,
    title: '首页',
    link: '/dashboard',
    icon: 'layui-icon-console'
  },{
    id: 2,
    title: '文章列表',
    link: '/articles',
    icon: 'layui-icon-list'
  },{
    id: 3,
    title: '订单管理',
    link: '/orders',
    icon: 'layui-icon-rmb'
  },{
    id:4,
    title: '会员管理',
    link: '/member',
    icon: 'layui-icon-user',
    children: [
      {
        id: 401,
        title: '会员列表',
        link: '/member/index',
        icon: 'layui-icon-user'
      },
      {
        id: 402,
        title: '登录日志',
        link: '/member/loginLog',
        icon: 'layui-icon-log'
      }
    ]
  }
]
</script>
<style lang='scss' scoped>
.sub-menu {
  padding-left: .2rem;
}
</style>
