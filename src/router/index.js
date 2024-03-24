import {createRouter, createWebHashHistory} from 'vue-router'
import VwHubMap from '../components/VwHubMap.vue'
import Upload from '../components/Upload.vue'

const routes = [
    {
        path:'/',
        name:"upload",
        component: Upload
    },
    {
        path:'/VwHubMap',
        name:'VwHubMap',
        component:VwHubMap
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router