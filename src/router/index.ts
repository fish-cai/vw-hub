import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path:'/',
        name:"App",
        component:()=>import(/* webpackChunkName:'App'*/'@/App.vue')
    },
    {
        path:'/viewMap',
        name:'VwHubMap',
        component:()=>import(/* webpackChunkName:'VwHubMap'*/'@/components/VwHubMap.vue')
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default {router}