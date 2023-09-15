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
          <lay-tab type="card" allow-close class="tab-head-menu" v-model="current11">
            <lay-tab-item :id="item.name" title="{item.title}" v-for="{item, index} in tabMenu" :key="index" :closable="false">
              <div style="padding:20px">{{ item.title }}</div>
            </lay-tab-item>
            <lay-tab-item id="2" title="选项二" icon="layui-icon-console">
              <div style="padding:20px">选项二</div>
            </lay-tab-item>
            <lay-tab-item id="3" title="选项三" :icon="renderIconFunc">
              <div style="padding:20px">选项三</div>
            </lay-tab-item>
            <lay-tab-item id="4">
              <template #title>
                选项四
                <lay-icon type="layui-icon-set" style="margin-left:8px"></lay-icon>
              </template>
              <div style="padding:20px">选项四</div>
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
      const { tabMenu } = store.state.tabMenu
      console.log(tabMenu)
      return {
            menuConf,
            collapse,
            collapseMenu,
            tabMenu
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
