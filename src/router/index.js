import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import { VM } from '@/main.js';

Vue.use(VueRouter);

const needLoginPages = [
    'mypage',
]

const routes =  [
// 메인 (토도영어 소개)
    {
        path : '/',
        name : 'main',
        component : () => import('@/pages/PageMain/PageMain.vue'),
    },

// 멤버십 후기
    {
        path : '/review',
        name : 'review',
        component : () => import('@/pages/PageReview/PageReview.vue'),
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

    {
        path : '/help',
        component : () => import('@/pages/PageHelp/PageHelp.vue'),
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
        needLogin : true,
        component : () => import('@/pages/PageMypage/PageMypage.vue'),
    },

// 404 not found
    {
        path : '/404',
        alias : '*',
        name : '404',
        component : () => import('@/pages/Page404/Page404.vue'),
    },

];

const routerInfo = {
    mode : 'history',
    base : process.env.BASE_URL,
    routes ,
};

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

    const checkLoginNeedBeforeHref  =   !firstRender
                                    &&  needLoginPages.indexOf(to.name) > -1
                                    &&  !store.state.$user.is_login
                                    ;

    if(checkLoginNeedBeforeHref){
        store.dispatch('openAuthPanel');
        store.dispatch('registSuccessLogin' , () => {
            VM.$router.push(to.path);
        });
        return;
    }

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

router.afterEach((to) => {

    if(!VM){
        return;
    }

    if(needLoginPages.indexOf(to.name) > -1){
        store.commit('PAGE_needLogin');
    }else {
        store.commit('PAGE_freeLogin');
    }

    VM.$nextTick(() => {
        isPaging = false;
        store.dispatch('uncoverPage');
    })
})


export default router;