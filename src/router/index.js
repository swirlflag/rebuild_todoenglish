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
            path : '/product',
            name : 'product',
            component : () => import('@/pages/PageProduct/PageProduct.vue'),
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

    if(useTransition){
        // 트랜지션 사용 조건이면 PlateTransitionCover를 통해 페이지 넘김
        store.commit('registTransitionNext' , next);
        store.commit('pageTransition');
    }else {
        // 트랜지션 사용 조건이 아니면 그냥 넘김
        next();

    }

});

router.afterEach(() => {
    // const title = document.querySelector('.main-header__title');
    // console.log(router.nextTick);
})

export default router;