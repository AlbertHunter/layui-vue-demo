import { createStore } from 'vuex'

export default createStore({
  state: {
    tabMenu: [
      {
        "name": "Home",
        "title": "首页",
        "path": "/dashboard/index"
      }
    ]
  },
  mutations: {
    addTabMenu (state, payload){
      const { item } = payload
      const data = {
        "name": item.title,
        "title": item.title,
        "path": item.link
      }
      const menus = state.tabMenu
      for(const row of menus) {
        if(row.title === item.title) return
      }
      state.tabMenu.push(data)
    }
  },
  actions: {
    addTabMenu ({ commit }, data) {
      commit('addTabMenu', data)
    },
  },
  modules: {
  }
})
