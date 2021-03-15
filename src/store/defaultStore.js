const state = {
    type_browser : '',
    type_os : '',
    type_device : '',
    is_touchDevice : null,
    is_dev : null,

    is_pageScrollLock : false,
    is_pageNeedLogin : false,
    is_appLoading : true,

    is_mountedPage : false,

    standard_mobileSize : 768,

}

const getters = {
    is_showNeedLogin(state) {
        if(state.is_pageNeedLogin){
            // console.log('로그인이 필요함 : 로그인 검증 시작');
            if(state.$user.is_login){
                // console.log('로그인 된 상태이므로 화면 표현');
                return false
            }else {
                // console.log('로그인이 되지 않았으므로 화면 가림');
                return true
            }
        }else {
            // console.log('로그인이 필요없음');
            return false
        }
    },
}

const mutations = {
    SCROLL_lock(state) {
        state.is_pageScrollLock = true;
    },
    SCROLL_unlock(state) {
        state.is_pageScrollLock = false;
    },
    PAGE_needLogin(state) {
        state.is_pageNeedLogin = true;
    },
    PAGE_freeLogin(state) {
        state.is_pageNeedLogin = false;
    },
    PAGE_mounted(state) {
        state.is_mountedPage = true;
    },
    PAGE_unmounted() {
        state.is_mountedPage = false;
    },
}

const actions = {

}

export default { state , getters, mutations, actions };