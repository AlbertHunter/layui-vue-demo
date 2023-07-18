import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Layui from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'
import './style/index.scss'

createApp(App).use(store).use(router).use(Layui).mount('#app')