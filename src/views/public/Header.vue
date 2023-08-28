<template>
  <lay-row>
    <lay-col md="18">&nbsp;</lay-col>
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
import { ref } from 'vue'
const collapse = ref(true)
</script>
