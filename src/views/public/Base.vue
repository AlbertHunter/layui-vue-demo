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
          <lay-tab type="card" allow-close class="tab-head-menu" v-model="current11" @change="changeTab" @close="closeTab">
            <lay-tab-item :id="index" :title="item.title" v-for="(item, index) in tabMenu" :key="index" :closable="(index === 0) ? false : true">
            </lay-tab-item>
          </lay-tab>
          <div class="global-content">
            <BodyContent/>
          </div>
        </lay-body>
      </lay-layout>
    </lay-layout>
</template>

<script>
import { ref, toRef, toRefs, reactive } from 'vue'
import { useRouter } from "vue-router"
import Header from './Header'
import Menu from './Menu.vue'
import BodyContent from './LayBody.vue'
import { useStore } from 'vuex'
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

      const router = useRouter()
      console.log(router.currentRoute.value)
      console.log(router.currentRoute.value.meta.title)

      const store = useStore()
      const { tabMenu } = store.state
      const current11 = ref(0)
      const changeTab = (id) => {
        const menu = tabMenu[id]
        router.push(menu.path)
      }
      const closeTab = (id) => {
        console.log('关闭Tab' + id)
      }
      return {
            menuConf,
            collapse,
            collapseMenu,
            tabMenu,
            current11,
            changeTab,
            closeTab
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
      &__icon {
        cursor: pointer;
      }
    }
    &__right {
        .layui-header {
            background: #fff;
        }
        .layui-body {
            justify-content: center;
          .tab-head-menu {
            background: #fff;
            margin-top: 0;
            border-top: 1px solid #f1f1f1;
          }
          .global-content {
            background: #fff;
            margin: .1rem;
            padding: .15rem;
          }
        }
        background: #ebebeb;
        flex: 1;
    }
}
</style>
