import { createStore } from 'vuex'
import { ref } from 'vue'
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
  // return JSON.parse(localStorage.cartList) || {}
}

export default createStore({
  state: {
    tabMenu: [
      {
        "id": 1,
        "title": "首页",
        "path": "/dashboard/index"
      }
    ],
    tabList: {
      1:  {
        "id": 1,
        "title": "首页",
        "path": "/dashboard/index"
      }
    },
    currentTab: 0,
    selectedMenuKey: 0,
    openMenuKey: []
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
    }
  },
  modules: {
  }
})
