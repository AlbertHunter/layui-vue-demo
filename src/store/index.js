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
        "name": "Home",
        "title": "首页",
        "path": "/dashboard/index"
      }
    ],
    currentTab: 0
  },
  mutations: {
    addTabMenu (state, payload) {
      const { item } = payload
      const data = {
        "id": item?.id,
        "title": item.title || item.meta.title,
        "path": item.path
      }
      const menus = state.tabMenu
      console.log(menus)
      for(const row of menus) {
        if(row.id === item.id) {
          state.currentTab = row.id
          return
        }
      }
      state.tabMenu.push(data)
      state.currentTab = item.id
      // setLocalStorageTabMenu(state)
    },
    closeTabMenu (state, payload) {
      const { id } = payload
      // state.tabMenu = []
      // state.tabMenu.filter((item) => item.id !== id )
      // return
      const menus = state.tabMenu.map(v => v)
      console.log(id, menus)
      state.tabMenu = []
      for(const item of menus) {
        if(item.id === id) continue
        state.tabMenu.push(item)
      }
      // setLocalStorageTabMenu(state)
      // state.tabMenu = newArr
      // state.tabMenu.filter((item) => item.id !== id )
      // state.tabMenu.push(newArr)
      return

/*      const newArr = state.tabMenu.toSpliced(1, 1)
      console.log(newArr)
      state.tabMenu.splice(0, state.tabMenu.length, ...newArr)
      state.tabMenu = newArr*/
    },
    changeTabMenu ( state, payload) {
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
    }
  },
  modules: {
  }
})
