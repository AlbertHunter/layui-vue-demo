<template>
    <lay-menu v-model:selected-key="selectedMenuKey" v-model:tree="isTree" v-model:open-keys="openMenuKey" :collapse="conf.collapse">
        <template v-for="item in menuData"  :key="item.path">
          <div v-if="!item.hasOwnProperty('children')">
            <router-link :to="item.path" @click="() => addTabMenu(item)">
                <lay-menu-item :id="item.path">
                  <template #icon>
                      <lay-icon :type="item.icon"></lay-icon>
                  </template>
                  <template #title>
                      {{ item.meta.title }}
                  </template>
                </lay-menu-item>
            </router-link>
          </div>
          <div v-else>
            <lay-sub-menu :title="item.meta.title" :id="item.path">
              <template #icon>
                <lay-icon :type="item.icon"></lay-icon>
              </template>
              <template #title> {{ item.meta.title }} </template>
              <template v-for="row in item.children" :key="row.path">
                <router-link :to="row.path" @click="() => addTabMenu(row)">
                  <lay-menu-item  class="sub-menu" :id="row.path">
                    <template #icon>
                      <lay-icon :type="row.icon"></lay-icon>
                    </template>
                    <template #title>
                      {{ row.meta.title }}
                    </template>
                  </lay-menu-item>
                </router-link>
              </template>
            </lay-sub-menu>
          </div>
        </template>
    </lay-menu>
</template>

<script setup name="Menu">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import {useRouter} from "vue-router/dist/vue-router";
import useCommonMenuEffect from '@/effects/menuEffect'
const router = useRouter()
const store = useStore()
const props = defineProps({
  conf: {
    type: Object
  }
})
const { getMenus } = useCommonMenuEffect()
const useMenuEffect = () => {
  const isTree = ref(true)
  const selectedMenuKey = computed({
    get: () => store.state.selectedMenuKey,
    set: (val) => store.state.selectedMenuKey = val
  })
  const openMenuKey = computed({ 
    get: () => store.state.openMenuKey,
    set: (val) => store.state.openMenuKey = val
  })
  const tabList = computed(() => store.state.tabList)

  //设置菜单选中
  const selectedMenu = () => {
    //当前路径
    const path = router.currentRoute.value.path
    for(const item of menuData) {
      const menu_path = item?.redirect ? item?.redirect : item?.path
      if(item.hasOwnProperty('children')) {
        const subMenu = item.children
        subMenu.map((row) => {
          if(row.path === path){
            // store.state.selectedMenuKey = row.path
            // store.state.openMenuKey = item.path
            const selectedKey = row.path
            const openKey = item.path
            store.dispatch('selectedMenu', { selectedKey, openKey })         
            addTabMenu(row)

            // store.state.breadcrumb.title = item?.title || item.meta.title
            // store.state.breadcrumb.path = item.path
            // store.state.breadcrumb.children = {
            //   title: row.title || row.meta.title,
            //   path: row.path
            // }

          }
        })
      } else {
        if(path === menu_path) {
          // store.state.selectedMenuKey = item.path
          const selectedKey = item.path
          store.dispatch('selectedMenu', { selectedKey })          
          addTabMenu(item)
          break
        }
      }
    }
  }
  //菜单添加到Tab
  const addTabMenu = (item) => {
    store.dispatch('addTabMenu', { item })

    console.log(item)
    if(item.hasOwnProperty('parent_id')) {
      const menuData = getMenus()
      const parentObj = menuData[item.parent_id -1 ]
      store.dispatch('setBreadcrumb', { item, parentObj })      
    } else {
      store.dispatch('setBreadcrumb', { item })
    }

  }
  return { isTree, selectedMenuKey, openMenuKey, selectedMenu, addTabMenu }
}

const { isTree, selectedMenuKey, openMenuKey, selectedMenu, addTabMenu } = useMenuEffect()
const menuData = getMenus()
selectedMenu()
</script>
<style lang='scss' scoped>
.sub-menu {
  padding-left: .2rem;
}
</style>
