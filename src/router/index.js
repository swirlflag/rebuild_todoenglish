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
        },
        {
            path : '/products',
            component : () => import('@/pages/PageProducts/PageProducts.vue'),
            name : 'products',
        },
    ],
}

const router = new VueRouter(routerInfo);

let firstRender = true;

router.beforeEach((to,from, next) => {

    if(firstRender){
        firstRender = false;
        next();
        return
    }

    store.commit('pageTransitionNext' , next);
    store.commit('pageTransition');
});

export default router;