import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import { VM } from '@/main.js';

{store}

Vue.use(VueRouter);

const routerInfo = {
    mode : 'history',
    routes : [


    // 메인
        {
            path : '/',
            name : 'main',
            component : () => import('@/pages/PageMain/PageMain.vue'),
        },


    // 제품 소개(멤버십 가입)
        {
            path : '/product',
            name : 'product',
            component : () => import('@/pages/PageProduct/PageProduct.vue'),
        },


    // 커리큘럼
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


    // 마이페이지
        {
            path : '/mypage',
            redirect : '/mypage/study'
        },
        {
            path : '/mypage/study',
            alias: [
                '/mypage',
                '/mypage/account'
            ],
            name : 'mypage',
            component : () => import('@/pages/PageMypage/PageMypage.vue'),
        },

    // 404 not found
        {
            path : '/404',
            alias : '*',
            name : 'page404',
            component : () => import('@/pages/Page404/Page404.vue'),
        },

    ],

}

const router = new VueRouter(routerInfo);

let firstRender = true;
{firstRender}

const isSameCategoryPath = (to,from) => {
    const toCategory = to.split('/')[1];
    const fromCategory = from.split('/')[1];

    return toCategory === fromCategory
}
{isSameCategoryPath}

let isPaging = false;
{isPaging}

router.beforeEach((to,from, next) => {

    const isChangeCategoryPath = !isSameCategoryPath(to.path, from.path);

    const useTransition = !firstRender && isChangeCategoryPath;
    {useTransition}

    if(firstRender){
        firstRender = false;
    }

    if(useTransition){
        if(isPaging){
            return
        }
        isPaging = true;

        store.dispatch('coverPage' , next);
    }else {
        // 트랜지션 사용 조건이 아니면 그냥 넘김
        next();
    }
});

router.afterEach(() => {
    if(!VM){
        return
    }
    VM.$nextTick(() => {
        isPaging = false;
        store.dispatch('uncoverPage');
    })
})


export default router;