import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'


const app = createApp(App)
app.use(ElementPlus)
console.log(router)
app.use(router)
app.provide("baseUrl","http://121.36.222.8:8080/")
// app.provide("baseUrl","http://localhost:8080/")
// app.provide("baseUrl","http://192.168.1.100:8080/")
app.mount('#app')

