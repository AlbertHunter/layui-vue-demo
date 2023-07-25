<template>
    <lay-layout class="layout">
      <div class="layout__left">
        <lay-header>网站管理</lay-header>
        <lay-switch v-model="menuConf.collapse"></lay-switch>
        <Menu :conf="menuConf"></Menu>
      </div>
      <lay-layout class="layout__right">
        <lay-header>
            header
        </lay-header>
        <lay-body><LayBody/></lay-body>
      </lay-layout>
    </lay-layout>
</template>
  
<script>
    import { ref } from 'vue'
    import Menu from './Menu.vue'
    import LayBody from './LayBody.vue'
    export default {
        name: 'Base',
        components: { Menu, LayBody },
        setup() {
            const menuConf = ref({})
            menuConf.collapse = true
            return {
                menuConf
            }
        }
    }
</script>
<style lang="scss" scoped>
  .layout .layui-header {
    line-height: 60px;
    text-align: center;
    margin-bottom: .1rem;
  }
  .layout {
    display: flex;
    justify-content: center;
    align-items: stretch;
    &__left, layui-side {
        background: #303641;
        color: white;
        width: auto!important;
        flex-basis: auto;
    }
    &__right {
        .layui-header {
            background: #fff;
        }
        .layui-body {
            display: flex;
            background: #fff;
            align-items: center;
            justify-content: center;
            color: white;
        }
        background: #ebebeb;
        flex: 1;
    }
}
</style>