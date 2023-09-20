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
          <lay-tab type="card" allow-close class="tab-head-menu" v-model="currentTab" @change="changeTab" @close="closeTab">
            <lay-tab-item :id="item.id" :title="item.title" v-for="(item, index) in tabMenu" :key="index" :closable="(index === 0) ? false : true">
              <div style="padding:20px">{{ item.id + item.title }}</div>
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
import { ref, toRef, toRefs, reactive, watch, computed } from 'vue'
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


      const tabMenu = computed(() => {
        return store.state.tabMenu
      })
      const currentTab = computed(() => store.state.currentTab)
      const changeTab = (id) => {
        let menu = []
        for(const item of tabMenu.value) {
          if(item.id === id) {
            menu = item
            break
          }
        }
        router.push(menu.path)
        store.state.currentTab = id
      }
      const onBeforeCloseTab = (id) => {
          console.log(id)
      }
      const closeTab = (id) => {
          const nextId = parseInt(id + 1)
          const prevId = parseInt(id - 1)
        // const tabArr =tabMenu.value
        console.log(currentTab)
/*        if(currentTab.value === id) {
          store.state.currentTab = id -1
        }else {
          store.state.currentTab = 2
        }*/
        store.dispatch('closeTabMenu', { id })
        console.log(tabMenu)
        // const menu = tabArr[nextId] ? tabArr[nextId] : tabArr[prevId]
        // router.push(menu.path)
        // console.log(tabArr)
      }
      return {
            menuConf,
            collapse,
            collapseMenu,
            tabMenu,
            currentTab,
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
