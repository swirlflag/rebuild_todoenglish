import { checkRegion } from '@/utils';

const TEMP_SESSIONID = "TEMP-SESSIONID";

const region = checkRegion();

const userStore = {
    name : '$user',

    state: {
        is_login    : false,
        emailId     : null,
        accountId   : null,
        username    : null,
        expireDay   : 7,
        region      : region,
    },
    getters : {

    },
    mutations : {
        USER_LOGIN({$user}){
            $user.is_login = true;
        },
        USER_LOGOUT({$user}){
            $user.is_login = false;
        },
        USER_SET_SESSIONID({$user} , sessionId) {
            $user.sessionId = sessionId;
        },
        USER_REMOVE_SESSIONID({$user}) {
            $user.sessionId = null;
        },
        USER_SET_EMAILID({$user}, emailId) {
            $user.emailId = emailId;
        },
        USER_REMOVE_EMAILID({$user}) {
            $user.emailId = null;
        },
        USER_SET_ACCOUNTID({$user},accountId) {
            $user.accountId = accountId;
        },
        USER_REMOVE_ACCOUNTID({$user}) {
            $user.accountId = null;
        },
        USER_SET_USERNAME({$user},username) {
            $user.username = username;
        },
        USER_REMOVE_USERNAME({$user}){
            $user.username = null;
        },

    },

    actions : {
        signIn({commit},payload) {
            const { emailId , accountId, username } = payload;

            commit('USER_LOGIN');
            commit('USER_SET_EMAILID' , emailId);
            commit('USER_SET_USERNAME' , username);
            commit('USER_SET_ACCOUNTID' , accountId);
            commit('USER_SET_SESSIONID' , TEMP_SESSIONID);

            const userData = {
                accountId   : accountId,
                sessionId   : TEMP_SESSIONID,
                emailId     : emailId,
                username    : username,
            };

            const flatUserData = JSON.stringify(userData);

            localStorage.setItem('userData', flatUserData);

        },

        signOut({commit}) {
            commit('USER_LOGOUT');
            commit('USER_REMOVE_EMAILID');
            commit('USER_REMOVE_USERNAME');
            commit('USER_REMOVE_ACCOUNTID');
            commit('USER_REMOVE_SESSIONID');

            localStorage.removeItem('userData');
        },
    },

};

export default userStore;