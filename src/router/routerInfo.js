const routes =  [
// 메인 (토도스쿨 소개)
    {
        path : '/',
        name : 'main',
        component : () => import('@/pages/PageMain/PageMain.vue'),
    },

// 토도영어
    {
        path : '/english',
        name : 'english',
        component : () => import('@/pages/PageTodoEnglish/PageTodoEnglish.vue'),
    },

// 토도한글
    {
        path : '/hangul',
        name : 'hangul',
        component : () => import('@/pages/PageTodoHangul/PageTodoHangul.vue'),
    },

// 고객 센터
    {
        path : '/help',
        name : 'help',
        component : () => import('@/pages/PageHelp/PageHelp.vue'),
    },

// 구독하기
    {
        path : '/subscribe',
        name : 'subscribe',
        component : () => import('@/pages/PageSubscribe/PageSubscribe.vue'),
    },
    {
        path : '/logictest',
        name : 'logictest',
        component : () => import('@/pages/PageSubscribe/PageSubscribeTEST.vue'),
    },

// 학습 정보
    {
        path : '/studyinfo',
        name : 'studyinfo',
        component : () => import('@/pages/PageStudyinfo/PageStudyinfo.vue'),
    },

// 계정 관리
    {
        path : '/account',
        name : 'account',
        component : () => import('@/pages/PageAccount/PageAccount.vue'),
    },





// 404

// path /404로 변경
    {
        path : '*',
        redirect : '/404',
    },
    {
        path: '/404',
        name : '404',
        component : () => import('@/pages/Page404/Page404.vue'),
    },
// path 미변경으로 화면만 출력
    // {
    //     path : '/404',
    //     alias : '*',
    //     name : '404',
    //     component : () => import('@/pages/Page404/Page404.vue'),
    // },
];




// 컴포넌트 정리 페이지
routes.push({
    path : '/components',
    name : 'components',
    component : () => import('@/pages/PageComponents/PageComponents.vue'),
})


// 다국어 테스트 
routes.push({
    path : '/math',
    name : 'math',
    component : () => import('@/pages/PageTodoMath/PageTodoMath.vue'),
})


// 토도영어 구 버전
const oldVersion = () => {
    const old = [
        // 구 메인
        {
            path : '/old_main',
            name : 'old_main',
            component : () => import('@/pages/PageMain/PageMain_old.vue'),
        },

        // 제품 소개(멤버십 가입)
        {
            path : '/old_product',
            name : 'old_product',
            component : () => import('@/pages/PageProduct/PageProduct.vue'),
        },

        // 리뷰
        {
            path : '/old_review',
            name : 'old_review',
            component : () => import('@/pages/PageReview/PageReview.vue'),
        },

        // 커리큘럼
        {
            path : '/old_curriculum',
            redirect : '/old_curriculum/map'
        },
        {
            path : '/old_curriculum/map',
            alias: [
                '/old_curriculum',
                '/old_curriculum/objectives'
            ],
            name : 'old_curriculum',
            component : () => import('@/pages/PageCurriculum/PageCurriculum.vue'),
        },



        // 마이페이지
        {
            path : '/old_mypage',
            redirect : '/old_mypage/study'
        },
        {
            path : '/old_mypage/study',
            alias: [
                '/old_mypage',
                '/old_mypage/account'
            ],
            name : 'old_mypage',
            needLogin : true,
            component : () => import('@/pages/PageMypage/PageMypage.vue'),
        },

    ]

    for(let i = 0; i < old.length; ++i){
        routes.push(old[i]);
    }
};
oldVersion();


// routes.push({
//     path : '/ttt',
//     component: function() {
//         var reg = new RegExp("www|sitename|test|localhost:8000");
//         var parts = window.location.host.split(".");
//         return reg.test(parts[0]) ? require('./views/home') : require('./views/subdomain');
//     }()
// })


// subdomain test
const host = window.location.host;
const parts = host.split('.');
const domainLength = 4; // route1.example.com => domain length = 3

let test = null;

const english = [{
    path : '*',
    name : 'english',
    component : () => import('@/pages/PageHelp/PageHelp.vue'),
}]

const hangul = [{
    path : '*',
    name : 'hangul',
    component : () => import('@/pages/PageProduct/PageProduct.vue'),
}]

if (parts.length === (domainLength - 1) || parts[0] === 'www') {
    test = routes;
} else if (parts[0] === 'english') {
    test = english;
} else if (parts[0] === 'hangul') {
    test = hangul;
} else {
    test = routes;
}






const routerInfo = {
    mode : 'history',
    base : process.env.BASE_URL,
    // routes ,
    routes : test,
};

export {
    routes,
    routerInfo,
}