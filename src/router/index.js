import { createRouter, createWebHashHistory } from 'vue-router';
import VwHubMap from '../components/VwHubMap.vue';
import VwHubMapDemo from '../components/VwHubMapDemo.vue';
import AmapDemo from '../components/AmapDemo.vue';
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
        component: VwHubMapDemo
    },
    {
        path: '/AmapDemo',
        name: 'AmapDemo',
        component: AmapDemo
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
