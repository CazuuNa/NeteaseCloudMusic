import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import './components/element/elementPlus.scss'
import '@/assets/css/base.css';
import '@/assets/iconfont/iconfont.css'
import '@/assets/css/element-extends.scss'
// import svgIcon from './components/icons/svg/svgIcon.vue'
// import 'amfe-flexible/index.js'
 

const app = createApp(App)
console.log(app.config)
app.config.performance = true
app.use(router)
app.use(store)
app.use(ElementPlus)
// app.component('svg-icon', svgIcon).mount('#app')
app.mount('#app')