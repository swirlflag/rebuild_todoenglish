<template>

    <div class="auth__signin-email" ref="ref_root">

        <form id="form-signin" ref="ref_form">

            <InputDefault   type="email"
                            placeholder="이메일"
                            id="form-signin__id"
                            ref="ref_id"
                            :mark="nowState === 'wrongId'"
                            @input="onInputEmail"
            />

            <InputDefault   type="password"
                            placeholder="비밀번호"
                            id="form-signin__password"
                            ref="ref_password"
                            :mark="nowState === 'wrongPassword'"
                            @input="onInputPassword"
            />

            <div id="form-signin__alert" >

                <SpinnerColordotsWave   :isHide="nowState !== 'loading'"
                />

                <AlertFlashText     ref="ref_flashAlert"
                                    :text="alertDataMap[nowState]"
                />

            </div>

            <ButtonDefault  theme="pink"
                            id="form-signin__submit"
                            @click.prevent="tryLogin"
                            :disable="!isValidAllclear"
                            ref="ref_submit"
            >
                로그인
            </ButtonDefault>

        </form>

        <div class="auth__signin-email__etc">
            <div class="auth__signin-email__etc__item">
                <ButtonUnderMask    text="회원가입"
                                    @click="$emit('change-phase', 'signupEmail')"
                />
            </div>

            <div class="auth__signin-email__etc__item">
                <ButtonUnderMask    text="비밀번호 찾기"
                                    @click="$emit('change-phase', 'findPassword')"
                />
            </div>

        </div>

    </div>

</template>

<script>
const API_tryLogin = (signData = {id: '' , password : ''}) => {

    const { id, password } = signData;
    {id,password}
    // (대충 siginData로 서버랑 통신하는코드)

    // (대충 랜덤으로로그인시도하기)
    const serverResult = randomOne(
        {result : true , data : { username : 'TEST_loginSuccess' }},
        {result: false, errorCode : 'ID' },
        {result: false, errorCode : 'PW' },
    );

    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(serverResult);
            },2000)
        }catch(error) {
            reject(error);
        }
    })
}


import { validateEmail , randomOne} from '@/utils';
import InputDefault         from '@/components/input/InputDefault.vue';
import ButtonDefault        from '@/components/button/ButtonDefault.vue';
import SpinnerColordotsWave     from '@/components/spinner/SpinnerColordotsWave.vue';
import AlertFlashText       from '@/components/layout/AlertFlashText.vue';

import ButtonUnderMask from '@/components/button/ButtonUnderMask.vue';

export default {
    components : {
        ButtonUnderMask,
        InputDefault ,
        ButtonDefault ,
        SpinnerColordotsWave,
        AlertFlashText,
    },
    data() {
        return {

            alertFlash : false,

            nowState : 'idle',

            alertDataMap : {
                idle                : '',
                wrongId             : '해당 아이디가 없습니다.',
                wrongPassword       : '비밀번호가 맞지 않습니다.',
                validFailId         : '올바른 이메일 형식을 입력해주세요.',
                validFailPassword   : '비밀번호를 입력해주세요.',
            },

            value : {
                id          : '',
                password    : '',
            },

            valid : {
                id          : false,
                password    : false,
            },

        }
    },

    computed : {
        isValidAllclear() {
            return Object.values(this.valid).indexOf(false) === -1;
        },
    },
    methods : {

        focusId() {
            this.$refs.ref_id.$refs.ref_input.focus();
        },
        focusPassword() {
            this.$refs.ref_password.$refs.ref_input.focus();
        },

        onInputEmail (value) {
            this.value.id = value;
            this.valid.id = validateEmail(value);
            if(this.nowState === 'wrongId'){
                this.stateToIdle();
            }
        },
        onInputPassword(value) {
            this.value.password = value;
            this.valid.password = !!value;
            if(this.nowState === 'wrongPassword'){
                this.stateToIdle();
            }
        },

        validCheck() {
            if(!this.valid.id){
                this.stateToVaildFailId();
                return
            }
            if(!this.valid.password){
                this.stateToVaildFailPassword();
                return
            }
        },

        startFlashAlert() {
            this.$refs.ref_flashAlert.flash();
        },

        tryLogin() {
            if(this.nowState === 'loading'){
                return;
            }

            if(!this.isValidAllclear){
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

            if(result){
                this.loginSuccess(data);
            }else {
                this.loginFail(errorCode);
            }
        },

        loginSuccess(data) {
            this.$emit('change-phase' , 'signinSuccess');
            this.$store.commit('RECORD_username' , data.username );
        },
        loginFail(errorCode) {
            if(errorCode === "ID"){
                this.stateToWrongId();
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
        stateToVaildFailId() {
            this.nowState = 'validFailId';
            this.startFlashAlert();
        },
        stateToVaildFailPassword() {
            this.nowState = 'validFailPassword';
            this.startFlashAlert();
        },
        stateToWrongId() {
            this.nowState = 'wrongId';
            this.startFlashAlert();
            this.focusId();
        },
        stateToWrongpassword() {
            this.nowState = 'wrongPassword';
            this.startFlashAlert();
            this.focusPassword();
        },

    },

    mounted () {
        this.focusId();
    }
}
</script>

<style lang="scss" scoped>
.auth__signin-email {
    width: 100%;
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

#form-signin {
    width: 100%;
    display: flex;
    flex-direction: column;

    > * {
        margin-top: 20px;
        &:nth-child(1) {
            margin-top: 0;
        }
    }
    #form-signin__alert {
        height: 30px;
        color: $COLOR_pink_1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .spinner--colordots {
            position: absolute;
            width: 100%; height: 100%;
        }

    }

    #form-signin__submit {
        margin-top: 40px;
    }


}

</style>