<template>
    <lay-menu v-model:selected-key="selectedKey" v-model:tree="isTree" v-model:open-keys="openKeys" :collapse="conf.collapse">
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
import { ref } from 'vue'
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
  const selectedKey = ref(0)
  const openKeys = ref([])


  // const selectedMenuKey = computet(() => store.state.selectedMenuKey)
  // const openMenuKeys = computet(() => store.state.openMenuKey)
  
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
            selectedKey.value = row.path
            openKeys.value = item.path
            addTabMenu(row)
          }
        })
      } else {
        if(path === menu_path) {
          selectedKey.value = item.path
          addTabMenu(item)
          break
        }
      }
    }
  }
  //菜单添加到Tab
  const addTabMenu = (item) => {
    store.dispatch('addTabMenu', { item })
  }
  return { isTree, selectedKey, openKeys, selectedMenu, addTabMenu }
}

const { isTree, selectedKey, openKeys, selectedMenu, addTabMenu } = useMenuEffect()
const menuData = getMenus()
console.log(menuData)
selectedMenu()

</script>
<style lang='scss' scoped>
.sub-menu {
  padding-left: .2rem;
}
</style>
