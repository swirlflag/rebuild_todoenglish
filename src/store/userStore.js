const userStore = {
    name : '$user',

    state: {
        isSignin : false,
        username : null,
    },
    getters : {
    },
    mutations : {
        USER_SIGNIN(state){
            state.$user.isSignin = true;
        },
        USER_SIGNDATA(state, payload){
            const { username }  = payload
            state.$user.username = username;
        },
        USER_SIGNOUT(state){
            state.$user.isSignin = false;
            state.$user.username = null;
        },
    },
    actions : {
        siginIn(context,data) {
            context.commit('USER_SIGNDATA',data);
            context.commit('USER_SIGNIN');
            console.log('로그인');
        },
        siginOut(context) {
            console.log('로그아웃');
            context.commit('USER_SIGNOUT');
        }
    }

}

export { userStore }