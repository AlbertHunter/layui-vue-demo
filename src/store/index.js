import { createStore } from 'vuex'
import { ref } from 'vue'
import useCommonMenuEffect from '@/effects/menuEffect'

const setLocalStorageTabMenu = (state) => {
  const { tabMenu } = state
  const tabMenuString = JSON.stringify(tabMenu)
  localStorage.tabMenu = tabMenuString
}
const getLocalStorage = (key) => {
  if (typeof localStorage[key] !== 'undefined') {
    return JSON.parse(localStorage[key])
  } else {
    return {}
  }
}

export default createStore({
  state: {
    tabList: {
      1:  {
        "id": 1,
        "title": "首页",
        "path": "/dashboard/index"
      }
    },
    currentTab: 0,
    selectedMenuKey: 0,
    openMenuKey: [],
    breadcrumb: {
      title: '首页',
      path: "/dashboard/index"
    }
  },
  mutations: {
    addTabMenu (state, payload) {
      const { item } = payload
      const data = {
        "id": item?.id,
        "title": item.title || item.meta.title,
        "path": item.path
      }
      // if(typeof state.tabList[item.id] === 'undefined') {
      if(state.tabList.hasOwnProperty(item.id) === false) {
        state.tabList[item.id] = data
      }
      state.currentTab = item.id
      return
    },
    closeTabMenu (state, payload) {
      const { id } = payload
      const newObj = Object.assign({}, state.tabList)
      if(newObj.hasOwnProperty([id])) delete newObj[id]
      // if(typeof newObj[id] !== 'undefined') delete newObj[id]
      state.tabList = newObj
    },
    changeTabMenu ( state, payload) {
      const { id } = payload
      state.currentTab = id
    },
    selectedMenu (state, payload) {
      const { selectedKey, openKey } = payload
      state.selectedMenuKey = selectedKey
      if(typeof openKey !== 'undefined') state.openMenuKey = openKey
    },
    setCurrentTab (state, payload) {
      const { id } = payload
      state.currentTab = id
    },
    setBreadcrumb (state, payload) {
      const { item, parentObj } = payload
      if(item.hasOwnProperty('parent_id')) {
        state.breadcrumb.title = parentObj?.title || parentObj.meta.title
        state.breadcrumb.path = parentObj.path
        state.breadcrumb.children = {
          title: item.title || item.meta.title,
          path: item.path
        }
      } else {
        state.breadcrumb.title = item?.title || item.meta.title
        state.breadcrumb.path = item.path
        delete state.breadcrumb.children   
      }
    }
  },
  actions: {
    addTabMenu ({ commit }, data) {
      commit('addTabMenu', data)
    },
    closeTabMenu ({ commit }, data) {
      commit('closeTabMenu', data)
    },
    changeTabMenu ( { commit }, data) {
      commit('changeTabMenu', data)
    },
    selectedMenu ( { commit }, data) {
      commit('selectedMenu', data)
    },
    setCurrentTab ( { commit }, data) {
      commit('setCurrentTab', data)
    },
    setBreadcrumb ( { commit }, data) {
      commit('setBreadcrumb', data)
    }
  },
  modules: {
  }
})
