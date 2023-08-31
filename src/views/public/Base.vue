<template>
    <lay-layout class="layout container-base">
      <div class="layout__left">
        <lay-header>网站管理</lay-header>
        <Menu :conf="menuConf"></Menu>
      </div>
      <lay-layout class="layout__right">
        <lay-header>
            <Header :conf="menuConf" :collapse="collapse" @collapseMenu="collapseMenu" />
        </lay-header>
        <lay-body><LayBody/></lay-body>
      </lay-layout>
    </lay-layout>
</template>

<script>
import { ref, reactive } from 'vue'
import Header from './Header'
import Menu from './Menu.vue'
import LayBody from './LayBody.vue'
export default {
    name: 'Base',
    components: { Header, Menu, LayBody },
    setup() {
        const menuConf = reactive({})
        menuConf.collapse = false
        const collapse = ref(true)
        const collapseMenu = () => {
          console.log('emit')
          menuConf.collapse = !menuConf.collapse
        }
        return {
            menuConf,
            collapse,
            collapseMenu
        }
    }
}
</script>
<style lang="scss" scoped>
  .container-base {
    height: 100vh;
  }
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
