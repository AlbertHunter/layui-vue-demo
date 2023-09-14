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
        <lay-body>
            <BodyContent/>
        </lay-body>
      </lay-layout>
    </lay-layout>
</template>

<script>
import { ref, toRef, toRefs, reactive } from 'vue'
import Header from './Header'
import Menu from './Menu.vue'
import BodyContent from './LayBody.vue'
export default {
    name: 'Base',
    components: { Header, Menu, BodyContent },
    setup() {
        const menuConf = reactive({})
        menuConf.collapse = false
        const collapse = ref(true)
        const collapseMenu = () => {
          console.log('emit')
          menuConf.collapse = !menuConf.collapse
        }
        const obj = toRefs(menuConf)
        console.log(obj.collapse.value)
        return {
            menuConf,
            collapse,
            collapseMenu
        }
    }
}
</script>
<style lang="scss" scoped>
  body {
    color: #000000d9;
  }
  .container-base {
    height: 100vh;
  }
  .layout .layui-header {
    line-height: 60px;
    text-align: center;
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
            margin: .1rem;
            padding: .15rem;
            justify-content: center;
        }
        background: #ebebeb;
        flex: 1;
    }
}
</style>
