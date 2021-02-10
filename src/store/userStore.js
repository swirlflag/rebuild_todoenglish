const userStore = {
    name : '$user',

    state: {
        is_login : false,
        id : null,
        username : null,
    },
    getters : {
    },
    mutations : {
        USER_SIGNIN(state){
            state.$user.is_login = true;
        },
        USER_SIGNDATA(state, payload){
            const { id, username }  = payload
            state.$user.id          = id;
            state.$user.username    = username;

        },
        USER_SIGNOUT(state){
            state.$user.is_login     = false;
            state.$user.id          = null;
            state.$user.username    = null;
        },
    },
    actions : {
        signIn(context,data) {
            context.commit('USER_SIGNDATA',data);
            context.commit('USER_SIGNIN');
            // console.log('로그인');
        },
        signOut(context) {
            // console.log('로그아웃');
            context.commit('USER_SIGNOUT');
        }
    }

}

export default userStore;