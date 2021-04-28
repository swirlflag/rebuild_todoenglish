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

// 컴포넌트 정리
    {
        path : '/components',
        name : 'components',
        component : () => import('@/pages/PageComponents/PageComponents.vue'),
    },

// 404 not found
    {
        path : '/404',
        // redirect : '/404',
        alias : '/*',
        name : '404',
        component : () => import('@/pages/Page404/Page404.vue'),
    },


];

const routerInfo = {
    mode : 'history',
    base : process.env.BASE_URL,
    routes ,
};

export {
    routes,
    routerInfo,
}