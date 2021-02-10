<template>
    <div class="auth__selection" ref="ref_root">

        <ButtonSignin type="kakao" @click="selectKakao"/>

        <ButtonSignin type="google" @click="selectGoogle"/>

        <div class="auth__divider auth__contain" ref="ref_divider">
            <span class="auth__divider__bar"></span>
            <span class="precaution">또는</span>
            <span class="auth__divider__bar"></span>
        </div>

        <ButtonDefault @click="selectEmail">
            이메일로 시작하기
        </ButtonDefault>

        <ButtonDefault background="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(29,94,253,1) 30%, rgba(252,69,119,1) 100%)" color="#fff" @click="TEST_onetouchLogin">
            ★한방에 로그인★
        </ButtonDefault>

    </div>
</template>

<script>
import gsap from 'gsap';
import ButtonSignin from '@/components/button/ButtonSignin.vue';
import ButtonDefault from '@/components/button/ButtonDefault.vue';
{gsap}

export default {
    name : 'AuthSelection',
    components : {
        ButtonSignin, ButtonDefault
    },
    methods: {
        TEST_onetouchLogin() {
            this.$store.dispatch('closeAuthPanel');
            const random = `random${Math.round(Math.random()* 100)}`;
            this.$store.dispatch('showModalAlert' , {
                title : '',
                message : `
                    이렇게 로그인합니다.
                    <br>
                    <br>id : ${random}@gmail.com
                    <br> username : ${random}
                `,
                close : () => {
                    this.$store.dispatch('signIn' , {
                        id : `${random}@gmail.com`,
                        username : `${random}`,
                    });
                }
            });
        },
        selectEmail() {
            this.$emit('change-phase' , 'signinForm')
        },
        selectKakao() {
            this.$emit('change-phase' , 'signinKakao')
        },
        selectGoogle() {
            this.$emit('change-phase' , 'signinGoogle')
        },
    },
    mounted() {
    },

}
</script>

<style scoped lang="scss">
.auth__selection {
    display: flex;
    flex-direction: column;
    width: 360px;
    width: 100%;

    > * {
        margin-top: 22px;
        @include phone {
            margin-top: 14px;
        }
        &:nth-child(1) {
            margin-top: 0;
        }
    }

    .auth__divider {
        display: flex;
        align-items: center;

        span:nth-child(2) {
            margin: 0 20px;
        }

        .auth__divider__bar {
            display: inline-block;
            height: 1px;
            width: 100%;
            background-color: rgba(0,0,0,0.1);
        }
    }
}



</style>