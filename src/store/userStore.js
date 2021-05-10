import { randomOne } from '@/utils';

const TEMP_SESSIONID = "TEMP-SESSIONID";

const userStore = {
    name : '$user',

    state: {
        is_login    : false,
        is_trylogin : false,
        emailId     : null,
        accountId   : null,
        username    : null,
        expireDay   : 7,
        region      : null,
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
        USER_removeRegion({$user}) {
            $user.region = null;
        },
        USER_saveLocalData({$user}) {
            const flatData = JSON.stringify({
                emailId : $user.emailId,
                accountId : $user.accountId,
                sessionId : $user.sessionId,
                username : $user.username,
                region : $user.region,
            });

            window.localStorage.setItem('userData', flatData);
        },
        USER_removeLocalData() {
            window.localStorage.removeItem('userData');
        }
    },

    actions : {

        async signInTry(context, signData) {

            const { emailId, password , TEST_random } = signData;

            if(!emailId || !password){
                return;
            }

            const username = emailId.split('@')[0];

            const tempAccountId = `TEMP-AUTHACCOUNT-${username.toUpperCase()}`;

        // do: 서버와 통신하는 코드

            let response = {
                result : true ,
                data : {
                    emailId ,
                    accountId : tempAccountId,
                    username ,
                    region : randomOne('ko','en','jp','zh'),
                }
            }

            if(TEST_random){
                response = randomOne(
                    response ,
                    {result: false, errorCode : 'ID' },
                    {result: false, errorCode : 'PW' },
                )
            }

            return new Promise((resolve, reject) => {
                try {
                    setTimeout(() => {
                        context.dispatch('signInSuccess', response.data);
                        resolve(response);
                    },1000)
                }catch(error) {
                    context.dispatch('signInFail');
                    reject(error);
                }
            })
        },

        signInSuccess(context,response) {

            const { emailId , accountId, username , region , clientSignin } = response;

            context.commit('USER_login');
            context.commit('USER_setEmailId' , emailId);
            context.commit('USER_setUsername' , username);
            context.commit('USER_setAccountId' , accountId);
            context.commit('USER_setSessionId' , TEMP_SESSIONID);
            context.commit('USER_setRegion' , region);

            context.commit('USER_saveLocalData');

            if(!clientSignin){
                context.dispatch('changeRegion' , region);
            }
        },

        signInFail() {

        },

        signOut(context) {
            context.commit('USER_logout');
            context.commit('USER_removeEmailId');
            context.commit('USER_removeUsername');
            context.commit('USER_removeAccountId');
            context.commit('USER_removeSessionId');
            context.commit('USER_removeRegion');

            context.commit('USER_removeLocalData');

        },

        saveAccountRegion(context,region) {
        // do :서버에 계정 정보를 저장함....
            // logic..
        // then
            context.commit('USER_setRegion' , region);
            context.commit('USER_saveLocalData');

            context.dispatch('changeRegion', region);

        },

    },

};

export default userStore;