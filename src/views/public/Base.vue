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
          <lay-tab type="card" allow-close class="tab-head-menu" v-model="currentTab" @change="changeTab" :beforeLeave="beforeLeaveTab" :beforeClose="beforeCloseTab" @close="closeTab">
            <lay-tab-item :id="item.id" :title="item.title" v-for="(item, index) in tabMenu" :key="index" :closable="(item.id === 1) ? false : true"></lay-tab-item>
          </lay-tab>
          <div class="global-content">
            <BodyContent/>
          </div>
        </lay-body>
      </lay-layout>
    </lay-layout>
</template>

<script>
import { ref, toRef, toRefs, reactive, computed } from 'vue'
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
        console.log(obj.collapse.value)



      const tabMenu = computed(() => {
        return store.state.tabList
      })
      const tabList = computed(() => store.state.tabList)
      const currentTab = computed(() => store.state.currentTab)
      const changeTab = (id) => {
        let menu = {}
        if(tabList.value.hasOwnProperty(id)) {
          menu = tabList.value[id]
          router.push(menu.path)
        }
        store.state.currentTab = id
        selectedMenu(id)
      }


      // const selectedMenu = (id) => {
      //   const menuData = getMenus()
      //   const currentMenu = tabList.value[id]
      //   const currentMenuPath = currentMenu.path
      //   console.log(menuData)
      //   console.log(currentMenuPath)
      //   console.log(id)

      //   for(const item of menuData) {
      //     const menu_path = item?.redirect ? item?.redirect : item?.path
      //     if(item.hasOwnProperty('children')) {
      //       const subMenu = item.children
      //       subMenu.map((row) => {
      //         if(row.path === path){
      //           selectedKey.value = row.path
      //           openKeys.value = item.path
      //         }
      //       })
      //     } else {
      //       if(path === menu_path) {
      //         selectedKey.value = item.path
      //         break
      //       }
      //     }
      //   }

      // }


      const beforeLeaveTab = (id) => {
        console.log(id)
      }

      const beforeCloseTab = (id) => {
        console.log(id, currentTab.value)
        const currentId = currentTab.value

        if(currentId === id) {
          // const k =
          const tabObj = tabList.value
          Object.keys(tabObj).forEach((k) => {
            console.log(k, tabObj[k])
          }) 
        }
        // return false
      }
      const closeTab = (id) => {
          const nextId = parseInt(id + 1)
          const prevId = parseInt(id - 1)
        // const tabArr =tabMenu.value

/*        if(currentTab.value === id) {
          store.state.currentTab = id -1
        }else {
          store.state.currentTab = 2
        }*/
        store.dispatch('closeTabMenu', { id })
      }
      return {
            menuConf,
            collapse,
            collapseMenu,
            tabMenu,
            currentTab,
            changeTab,
            beforeCloseTab,
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
