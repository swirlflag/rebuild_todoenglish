<template>

    <form class="auth__signin-email">

        <InputDefault   type="email"
                        class="auth__signin-email__id"
                        placeholder="이메일"
        />

        <InputDefault   type="password"
                        class="auth__signin-email__password"
                        placeholder="비밀번호"
        />

        <div class="auth__signin-email__alert" >

            <SpinnerColordots :isShow="state === 'loading'" />

            <p v-if="stateDataMap[state].alert">{{ stateDataMap[state].alert }}</p>

        </div>

        <ButtonDefault  theme="pink"
                        class="auth__signin-email__submit"
                        @click.prevent="tryLogin"
        >
            로그인
        </ButtonDefault>

        <div class="auth__signin-email__submit">
            회원가입 비밀번호 찾기
        </div>

    </form>

</template>

<script>

import InputDefault from '@/components/input/InputDefault.vue';
import ButtonDefault from '@/components/button/ButtonDefault.vue';
// import TextChangeMask from '@/components/layout/TextChangeMask.vue';
import SpinnerColordots from '@/components/spinner/SpinnerColordots.vue';

export default {
    components : {
        InputDefault ,
        ButtonDefault ,
        // TextChangeMask ,
        SpinnerColordots,
    },
    data() {
        return {
            state : 'loading',

            stateDataMap : {

                loading : {
                },

                wrongPassword : {
                    alert : '비밀번호가 맞지 않습니다.'
                },

            }
        }
    },
    methods : {
        tryLogin() {
            console.log('go login');
        },
        logingFail () {
            this.state = 'wrongPassword';
        },
    },
    mounted () {
        setInterval(() => {
            if(this.state === 'loading'){
                this.state = 'wrongPassword'
            }else {
                this.state = 'loading'
            }
        },2000)
    }
}
</script>

<style lang="scss" scoped>

@keyframes appearFlash {
    0% {opacity: 0.1;}
    15% {opacity: 1;}
    30% {opacity: 0.1;}
    45% {opacity: 1;}
    60% {opacity: 0.1;}
    75% {opacity: 1;}
    90% {opacity: 0.1;}
    100% {opacity: 1;}
}
@keyframes appearY {
    0% {transform : translate3d(0,-50%,0); }
    100% {transform : translate3d(0,0,0); }
}

.auth__signin-email {
    width: 100%;
    display: flex;
    flex-direction: column;

    > * {
        margin-top: 20px;
    }
    .auth__signin-email__alert {
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

        p {
            width: 100%;
            text-align: center;
            animation: appearFlash 280ms steps(8, end), appearY 700ms $EASE_outCubic;
            // animation-timing-function: ;
        }

    }

    .auth__signin-email__submit {
        margin-top: 40px;
    }


}
</style>