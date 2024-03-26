import { createRouter, createWebHashHistory } from 'vue-router';
import VwHubMap from '../components/VwHubMap.vue';
// import AmapDemo from '../components/AmapDemo.vue';
import ADemo from '../components/ADemo.vue';
import Upload from '../components/Upload.vue';

const routes = [
    
    {
        path: '',  
        component: Upload,
            redirect: '/upload'
    },
    {
        path: '/upload',
        name: "Upload",
        component: Upload
    },
    {
        path: '/VwHubMap',
        name: 'VwHubMap',
        component: VwHubMap
    },
    {
        path: '/ADemo',
        name: 'ADemo',
        component: ADemo
    }
];

const router:any = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
