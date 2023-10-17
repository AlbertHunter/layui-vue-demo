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
          <lay-tab type="card" allow-close class="tab-head-menu" v-model="currentTab" @change="changeTab" :beforeLeave="beforeLeaveTab" @close="closeTab">
            <lay-tab-item :id="item.id" :title="item.title" v-for="(item, index) in tabList" :key="index" :closable="(item.id === 1) ? false : true"></lay-tab-item>
          </lay-tab>
          <div class="global-content">
            <BodyContent/>
          </div>
        </lay-body>
      </lay-layout>
    </lay-layout>
</template>

<script>
import { ref, toRefs, reactive, computed } from 'vue'
import { useRouter } from "vue-router"
import { useStore } from 'vuex'
import Header from './Header'
import Menu from './Menu.vue'
import BodyContent from './LayBody.vue'
import useCommonMenuEffect from '@/effects/menuEffect'
export default {
    name: 'Base',
    components: { Header, Menu, BodyContent },
    setup() {
      const router = useRouter()
      const store = useStore()
      const { getMenus } = useCommonMenuEffect()
      const menuConf = reactive({})
        menuConf.collapse = false
        const collapse = ref(true)
        const collapseMenu = () => {
          console.log('emit')
          menuConf.collapse = !menuConf.collapse
        }
        const obj = toRefs(menuConf)

      const tabList = computed(() => store.state.tabList)
      const currentTab = computed({
        get: () => store.state.currentTab,
        set: (val) => store.state.currentTab = val
      })

      //切换Tab菜单
      const changeTab = (id) => {
        let menu = {}
        if(tabList.value.hasOwnProperty(id)) {
          menu = tabList.value[id]
          router.push(menu.path)
        }
        store.dispatch('setCurrentTab', { id })
      }
      //切换标签之前的回调钩子函数
      const beforeLeaveTab = (id) => {
        selectedMenuKey(id)
      }
      //选中左侧菜单
      const selectedMenuKey = (id) => {
        const menuData = getMenus()
        const currentMenu = tabList.value[id]
        const currentMenuPath = currentMenu.path
        for(const item of menuData) {
          const menu_path = item?.redirect ? item?.redirect : item?.path
          if(item.hasOwnProperty("children")) {
            const subMenu = item.children
            subMenu.map((row) => {
              if(row.path === currentMenuPath){
                // store.state.selectedMenuKey = row.path
                // store.state.openMenuKey = item.path
                const selectedKey = row.path
                const openKey = item.path
                store.dispatch('selectedMenu', { selectedKey, openKey })
                //设置面包屑
                store.dispatch('setBreadcrumb', { item: row, parentObj: item })
              }
            })
          } else {
            if(currentMenuPath === menu_path) {
              // store.state.selectedMenuKey = item.path
              const selectedKey = item.path
              store.dispatch('selectedMenu', { selectedKey })
              //设置面包屑
              store.dispatch('setBreadcrumb', { item })
              break
            }
          }
        }
      }
      //关闭Tab
      const closeTab = (id) => {
        store.dispatch('closeTabMenu', { id })
      }
      return {
            menuConf,
            collapse,
            collapseMenu,
            tabList,
            currentTab,
            changeTab,
            beforeLeaveTab,
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
