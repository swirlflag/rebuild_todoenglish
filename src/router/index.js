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
            name : 'main',
            component : () => import('@/pages/PageMain/PageMain.vue'),
        },
        {
            path : '/products',
            name : 'products',
            component : () => import('@/pages/PageProducts/PageProducts.vue'),
        },

        {
            path : '/curriculum',
            redirect : '/curriculum/map'
        },
        {
            path : '/curriculum/map',
            alias: [
                '/curriculum',
                '/curriculum/objectives'
            ],
            name : 'curriculum',
            component : () => import('@/pages/PageCurriculum/PageCurriculum.vue'),
        },

    ],
}

const router = new VueRouter(routerInfo);

let firstRender = true;

const isSameCategoryPath = (to,from) => {
    const toCategory = to.split('/')[1];
    const fromCategory = from.split('/')[1];

    return toCategory === fromCategory
}


router.beforeEach((to,from, next) => {

    const isChangeCategoryPath = !isSameCategoryPath(to.path, from.path);

    const useTransition = !firstRender && isChangeCategoryPath;

    if(firstRender){
        firstRender = false;
    }

    if(!useTransition){
        next();
        return
    }

    store.commit('registTransitionNext' , next);
    store.commit('pageTransition');

});

export default router;