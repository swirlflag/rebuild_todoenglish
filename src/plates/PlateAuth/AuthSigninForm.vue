<template>

    <div class="auth__signin-email" ref="ref_root">

        <form id="form-signin" ref="ref_form" @submit.prevent>

            <InputText   type="email"
                            placeholder="이메일"
                            id="form-signin__id"
                            ref="ref_id"
                            :mark="markEmail"
                            v-model="value.emailId"
                            @change="onInputEmail"
            />

            <InputText   type="password"
                            placeholder="비밀번호"
                            id="form-signin__password"
                            ref="ref_password"
                            v-model="value.password"
                            :mark="markPassword"
                            @change="onInputPassword"
            />

            <div class="auth__alert-area" >

                <SpinnerColordotsWave   :isHide="nowState !== 'loading'"
                />

                <AlertFlashText     ref="ref_flashAlert"
                                    :text="alertDataMap[nowState]"
                />

            </div>

            <ButtonDefault  theme="pink"
                            id="form-signin__submit"
                            @click.prevent="tryLogin"
                            :disable="!isCanConfirm"
                            ref="ref_submit"
            >
                로그인
            </ButtonDefault>

        </form>

        <div class="auth__signin-email__etc">
            <div class="auth__signin-email__etc__item">
                <button class="hover-link" @click="$emit('change-phase', 'signupConsent')">
                    <span>회원가입</span>
                </button>
            </div>

            <div class="auth__signin-email__etc__item">
                <button class="hover-link" @click="$emit('change-phase', 'findPassword')">
                    <span>비밀번호 찾기</span>
                </button>
            </div>

        </div>

    </div>

</template>

<script>
const API_tryLogin = (signData = {emailId: '' , password : ''}) => {

    const { emailId, password } = signData;
    {emailId , password}

    const username = emailId.split('@')[0];

    const tempAccountId = `TEMP-AUTHACCOUNT-${username.toUpperCase()}`;

    // (대충 siginData로 서버랑 통신하는코드)

    // (대충 랜덤으로로그인시도하기)
    const serverResult = randomOne({
            result : true ,
            data : {
                emailId ,
                accountId : tempAccountId,
                username ,
            }
        },
        {result: false, errorCode : 'ID' },
        {result: false, errorCode : 'PW' },
    );

    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(serverResult);
            },1000)
        }catch(error) {
            reject(error);
        }
    })
}

import { randomOne} from '@/utils';
import InputText             from '@/components/input/InputText.vue';
import ButtonDefault            from '@/components/button/ButtonDefault.vue';
import SpinnerColordotsWave     from '@/components/spinner/SpinnerColordotsWave.vue';
import AlertFlashText           from '@/components/display/AlertFlashText.vue';


export default {
    props : {
        nowPhase : String,
    },
    components : {
        InputText ,
        ButtonDefault ,
        SpinnerColordotsWave,
        AlertFlashText,
    },
    data() {
        return {
            isDestory : false,
            mydata: '',
            nowState : 'idle',

            alertDataMap : {
                idle                : '',
                validFailEmail      : '올바른 이메일 형식을 입력해주세요.',
                validFailPassword   : '비밀번호를 입력해주세요.',

                wrongEmail          : '해당 아이디가 없습니다. [이 메시지 표시 확률 33%]',
                wrongPassword       : '비밀번호가 맞지 않습니다. [이 메시지 표시 확률 33%]',
            },

            value : {
                emailId          : '',
                password    : '',
            },

            valid : {
                emailId          : false,
                password    : false,
            },

        }
    },

    computed : {
        isCanConfirm() {
            return  Object.values(this.valid).indexOf(false) === -1
                && this.nowState !== 'loading'
        },
        markEmail() {
            return  this.nowState === 'validFailEmail'
                ||  this.nowState === 'wrongEmail'
        },
        markPassword() {
            return  this.nowState === 'validFailPassword'
                ||  this.nowState === 'wrongPassword'
        },

    },
    methods : {
        focusTarget(target) { {target}
            // if(this.$store.state.is_touchDevice){ return }
            // // console.log(target);
            // target && target.focus();
        },
        focusEmail() {
            this.focusTarget(this.$refs.ref_id.$refs.ref_input);
        },
        focusPassword() {
            this.focusTarget(this.$refs.ref_password.$refs.ref_input);
        },
        onInputEmail (value,valid) {
            this.valid.emailId = valid;
            if(this.markEmail){
                this.stateToIdle();
            }
        },
        onInputPassword(value) {
            this.valid.password = !!value;
            if(this.markPassword){
                this.stateToIdle();
            }
        },

        validCheck() {
            if(!this.valid.emailId){
                this.stateToVaildFailEmail();
                return
            }
            if(!this.valid.password){
                this.stateToVaildFailPassword();
                return
            }
        },

        flashAlert() {
            this.$refs.ref_flashAlert.flash();
        },

        tryLogin() {
            if(this.nowState === 'loading'){
                return;
            }

            if(!this.isCanConfirm){
                this.validCheck();
                return;
            }

            this.$refs.ref_submit.$el.focus();
            this.$refs.ref_submit.$el.blur();

            this.stateToLoading();
            this.sendLogin();
        },

        async sendLogin() {
            const { result , errorCode , data } = await API_tryLogin(this.value);
            if(this.isDestory){
                return null;
            }
            if(result){
                this.loginSuccess(data);
            }else {
                this.loginFail(errorCode);
            }
        },
        loginSuccess(data) {
            this.$emit('change-phase' , 'signinSuccess');
            this.$store.dispatch('signIn' , data);
        },
        loginFail(errorCode) {
            if(errorCode === "ID"){
                this.stateToWrongEmail();
            }else if(errorCode === "PW"){
                this.stateToWrongpassword();
            }
        },

        stateToIdle() {
            this.nowState = 'idle';
        },
        stateToLoading() {
            this.nowState = 'loading';
        },
        stateToVaildFailEmail() {
            this.nowState = 'validFailEmail';
            this.flashAlert();
            this.focusEmail();
        },
        stateToVaildFailPassword() {
            this.nowState = 'validFailPassword';
            this.flashAlert();
            this.focusPassword();
        },
        stateToWrongEmail() {
            this.nowState = 'wrongEmail';
            this.flashAlert();
            this.focusEmail();
        },
        stateToWrongpassword() {
            this.nowState = 'wrongPassword';
            this.flashAlert();
            this.focusPassword();
        },

    },

    mounted () {
        this.focusEmail();
    },
    beforeDestroy() {
        this.isDestory = true;
    }
}
</script>

<style lang="scss" scoped>
.auth__signin-email {
    width: 100%;
}

#form-signin {
    width: 100%;
    display: flex;
    flex-direction: column;

    > * {
        margin-top: 22px;
        @include phone {
            margin-top: 14px;
        }
        &:nth-child(1) {
            margin-top: 0;
        }
    }

    // #form-signin__submit {
    //     margin-top: 20px;
    // }

}

.auth__signin-email__etc {
    margin-top: 30px;
    width: 100%;
    display : flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .auth__signin-email__etc__item {
        display: flex;
        align-items: center;

        button {
            font-weight: 400;
        }

        &::before {
            content : '';
            display: inline-block;
            width: 1px; height: 16px;
            background-color: #F2F0E9;
            position: relative;
            margin: 0 15px;
        }

        &:nth-child(1)::before { display: none;}
    }
}

</style>