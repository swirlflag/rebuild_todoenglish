import { checkDefaultRegion } from '@/utils';

const TEMP_SESSIONID = "TEMP-SESSIONID";

const region = checkDefaultRegion();

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
        USER_login({$user}){
            $user.is_login = true;
        },
        USER_logout({$user}){
            $user.is_login = false;
        },
        USER_setSessionId({$user} , sessionId) {
            $user.sessionId = sessionId;
        },
        USER_removeSessionId({$user}) {
            $user.sessionId = null;
        },
        USER_setEmailId({$user}, emailId) {
            $user.emailId = emailId;
        },
        USER_removeEmailId({$user}) {
            $user.emailId = null;
        },
        USER_setAccountId({$user},accountId) {
            $user.accountId = accountId;
        },
        USER_removeAccountId({$user}) {
            $user.accountId = null;
        },
        USER_setUsername({$user},username) {
            $user.username = username;
        },
        USER_removeUsername({$user}){
            $user.username = null;
        },
        USER_setRegion({$user}, region) {
            $user.region = region;
        },
    },

    actions : {
        signIn({commit},payload) {
            const { emailId , accountId, username } = payload;

            commit('USER_login');
            commit('USER_setEmailId' , emailId);
            commit('USER_setUsername' , username);
            commit('USER_setAccountId' , accountId);
            commit('USER_setSessionId' , TEMP_SESSIONID);

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
            commit('USER_logout');
            commit('USER_removeEmailId');
            commit('USER_removeUsername');
            commit('USER_removeAccountId');
            commit('USER_removeSessionId');

            localStorage.removeItem('userData');
        },

        changeRegion(context,region) {
            context.commit('USER_setRegion',region);
        },

    },

};

export default userStore;