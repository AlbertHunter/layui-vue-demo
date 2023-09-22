import {useRouter} from "vue-router/dist/vue-router"

const useCommonMenuEffect = () => {
    const router = useRouter()
    //从路由获取菜单
    const getMenus = () => {
      const routeList = router.options.routes
      const menuArr = []
      let i = 0
      for(const item of routeList) {
        if(item?.show) {
          i++
          item.id = i
          if(item.hasOwnProperty('children')) {
            const children = item.children.filter((row) => row?.show)
            item.children = children.map((v, index) => {
              v.parent_id = i
              v.id = i * 100 + index
              return v
            })
          }
          menuArr.push(item)
        } else {
          continue
        }
      }
      return menuArr
    }
    return { getMenus }
  }
  
  export default useCommonMenuEffect