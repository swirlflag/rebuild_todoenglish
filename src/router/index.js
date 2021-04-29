import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import { VM } from '@/main.js';

import {
    routerInfo
} from './routerInfo';

Vue.use(VueRouter);

const needLoginPages = [
    'mypage',
];

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
window.onbeforeunload = () => {
    console.log('before');
}

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

    if(isPaging){
        console.log('is paging so return');
        return
    }

    if(useTransition){
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

})


export default router;