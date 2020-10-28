import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

{store}

Vue.use(VueRouter);

const routerInfo = {
    mode : 'history',
    routes : [
        {
            path : '/',
            component : () => import('@/pages/PageMain/PageMain.vue'),
            name : 'main',
        }
    ],
}

const router = new VueRouter(routerInfo);

export default router;