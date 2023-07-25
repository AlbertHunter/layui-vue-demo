<template>
    <lay-menu v-model:selected-key="selectedKey" v-model:tree="isTree" v-model:open-keys="openKeys6" :collapse="conf.collapse">
      <lay-menu-item id="1">
          <template #icon>
            <lay-icon type="layui-icon-home"></lay-icon> 
          </template>
          <template #title>
            <router-link to="/dashboard">首页</router-link>
          </template>
      </lay-menu-item>
      <lay-menu-item id="2">
          <template #icon>
            <lay-icon type="layui-icon-home"></lay-icon> 
          </template>
          <template #title>
            <router-link to="/articles">文章列表</router-link>
          </template>
      </lay-menu-item>
      <lay-menu-item id="3">
          <template #icon>
            <lay-icon type="layui-icon-home"></lay-icon> 
          </template>
          <template #title>
            首页
          </template>
      </lay-menu-item> 
      <lay-sub-menu title="目录" id="7">
          <template #icon>
            <lay-icon type="layui-icon-home"></lay-icon> 
          </template>
          <template #title>
            首页
          </template>
          <lay-menu-item id="8">
                    <template #icon>
            <lay-icon type="layui-icon-home"></lay-icon> 
          </template>
          <template #title>
            首页
          </template>
          </lay-menu-item> 
          <lay-menu-item id="9">
          <template #icon>
            <lay-icon type="layui-icon-home"></lay-icon> 
          </template>
          <template #title>
            首页
          </template>
          </lay-menu-item>
          <lay-sub-menu id="10">
              <template #icon>
                <lay-icon type="layui-icon-home"></lay-icon> 
              </template>
              <template #title>
                首页
              </template>
              <lay-menu-item id="11">
                        <template #icon>
            <lay-icon type="layui-icon-home"></lay-icon> 
          </template>
          <template #title>
            首页
          </template>
              </lay-menu-item> 
              <lay-menu-item id="12">
                        <template #icon>
            <lay-icon type="layui-icon-home"></lay-icon> 
          </template>
          <template #title>
            首页
          </template>
              </lay-menu-item>
              <lay-sub-menu id="13">
                <template #icon>
                  <lay-icon type="layui-icon-home"></lay-icon> 
                </template>
                <template #title>
                首页
                </template>
                <lay-menu-item id="14">
                          <template #icon>
            <lay-icon type="layui-icon-home"></lay-icon> 
          </template>
          <template #title>
            首页
          </template>
                </lay-menu-item> 
                <lay-menu-item id="15">
                          <template #icon>
            <lay-icon type="layui-icon-home"></lay-icon> 
          </template>
          <template #title>
            首页
          </template>
                </lay-menu-item>
                <lay-menu-item id="16">
                          <template #icon>
            <lay-icon type="layui-icon-home"></lay-icon> 
          </template>
          <template #title>
            首页
          </template>
                </lay-menu-item>
            </lay-sub-menu>
          </lay-sub-menu>
      </lay-sub-menu> 
    </lay-menu>
  </template>
  
  <script>
  import { ref } from 'vue'

  export default {
    name: 'Menu',
    props: ['conf'],
    setup() {
      const selectedKey = ref("5")
      const openKeys6 = ref(["7"])
      const isTree = ref(true)
      return {
        selectedKey,
        openKeys6,
        isTree
      }
    }
  }
  </script>