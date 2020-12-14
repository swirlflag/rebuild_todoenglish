<template>
    <div id="plate--auth" ref="ref_root">

        <div class="auth__dimmed" @click="closePlateAuth"></div>

        <div class="auth__box" v-if="phaseDataMap[nowPhase]">

            <div class="auth__close" @click="closePlateAuth">
                <span></span>
                <span></span>
            </div>

            <h2 class="auth__title" ref="ref_title">
                <TextChangeMask :text="phaseDataMap[nowPhase].title"/>
            </h2>

            <p class="auth__text" ref="ref_text">
                <TextChangeMask :text="phaseDataMap[nowPhase].text"/>
            </p>

            <div class="auth__controller" :class="{'st-show' : this.phaseHistory.length > 1}">
                <ButtonUnderMask    class="auth__history-back"
                                    :text="historyButtonText"
                                    @click="onClickHistoryButton"
                />
            </div>

            <div class="auth__content" ref="ref_content">
                <transition-group   name="auth-content"
                                    @before-enter="onBeforeEnterTransition"
                                    @enter="onEnterTransition"
                                    @after-enter="onAfterEnterTransition"
                >

                    <AuthSelection  v-if="nowPhase === 'selectType'" :key="nowPhase"
                                    @change-phase="changePhase"
                    />

                    <AuthSignin v-if="nowPhase === 'signinEmail'" :key="nowPhase"
                                @change-phase="changePhase"

                    />

                    <AuthSignup v-if="nowPhase === 'signupEmail'" :key="nowPhase"

                    />

                    <AuthSuccess v-if="nowPhase === 'signinSuccess'" :key="nowPhase"

                    />

                    <AuthFindPassword v-if="nowPhase === 'findPassword'" :key="nowPhase"

                    />


                    <!-- <div  >
                        <span @click="changePhase('select')">back</span>
                    </div> -->

                </transition-group>
            </div>

        </div>
    </div>
</template>

<script>
import TextChangeMask   from '@/components/layout/TextChangeMask.vue';
import ButtonUnderMask  from '@/components/button/ButtonUnderMask.vue';
import AuthSelection    from '@/plates/PlateAuth/AuthSelection.vue';
import AuthSignin       from '@/plates/PlateAuth/AuthSignin.vue';
import AuthSignup       from '@/plates/PlateAuth/AuthSignup.vue';
import AuthSuccess      from '@/plates/PlateAuth/AuthSuccess.vue';
import AuthFindPassword from '@/plates/PlateAuth/AuthFindPassword.vue';

import gsap from 'gsap';
{gsap}

export default {
    name : 'PlateAuth',
    components : {
        TextChangeMask,
        ButtonUnderMask,
        AuthSelection,
        AuthSignin,
        AuthSignup,
        AuthSuccess,
        AuthFindPassword
    },
    data() {
        return {
            nowPhase   : '',
            phaseHistory : [],

            isRunTransition : false,
        }
    },

    computed : {
        phaseDataMap() {
            return ({
                selectType : {
                    title   : '토도영어에 오신 것을 환영합니다! &#x1F44B;',
                    text    : '토도영어에 등록한 방법으로 로그인하세요.',
                },
                signinEmail : {
                    title   : '토도영어에 오신 것을 환영합니다! &#x1F44B;',
                    text    : '가입하신 이메일로 로그인 하세요.',
                },
                signupEmail : {
                    title   : '토도영어에 오신 것을 환영합니다! &#x1F44B;',
                    text    : '회원 가입',
                },
                signinSuccess : {
                    title   : `${this.$store.state.username}님, 안녕하세요! &#x1F44B;`,
                    text    : '성공적으로 로그인 되었습니다.',
                },
                findPassword : {
                    title   : '비밀번호 찾기',
                    text    : '이메일 주소를 입력하세요.',
                },

            });
        },

        historyButtonText () {
            return this.nowPhase === 'signinSuccess'  ? '닫기' : '이전 단계로'
        }

    },

    methods : {
        closePlateAuth() {
            this.$store.dispatch('closeAuthPanel');
        },

        changePhase(phase) {
            this.phaseHistory.push(phase);
            this.nowPhase = phase;
        },
        backPhase() {
            if(this.phaseHistory.length <= 1){
                console.dev('ERC_AT1 : 더 이상 뒤로 갈 수 없습니다.')
                return;
            }

            this.phaseHistory.pop();
            this.nowPhase = this.phaseHistory[this.phaseHistory.length-1];
        },

        onClickHistoryButton () {
            if(this.nowPhase === 'signinSuccess'){
                this.closePlateAuth();
            }else {
                this.backPhase();
            }
        },

        onBeforeEnterTransition() {
        },
        onAfterEnterTransition() {
        },
        onEnterTransition() {
            const el_content = this.$refs.ref_content;
            const el_leave = el_content.querySelector('.auth-content-leave');
            const el_enter = el_content.querySelector('.auth-content-enter');

            if(!el_leave || !el_enter){
                return;
            }

            gsap.fromTo(el_content, 0.6, {
                height : el_leave.offsetHeight,
            },{
                height : el_enter.offsetHeight,
                ease : 'power4.out',
            });

        },

        onMountedMotion() {

            const el_targets = [
                this.$refs.ref_title,
                this.$refs.ref_text,
            ];

            gsap.from( el_targets, {
                opacity : 0,
                y : 50,
                ease : 'power2.out',
                duration : 0.6,
                delay : 0.25,
                stagger : 0.05,
            });

            const el_selection = this.$refs.ref_root.querySelector('.auth__selection');

            if(this.nowPhase === 'selectType'&& el_selection){

                const el_buttons = el_selection.querySelectorAll('.button--default');
                const el_dividerbar = el_selection.querySelectorAll('.auth__divider__bar');
                const el_precaution = el_selection.querySelectorAll('.auth__divider .precaution');

                gsap.from( el_buttons,  {
                    opacity : 0,
                    y : 50,
                    ease : 'power4.out',
                    duration : 0.6,
                    delay : 0.45,
                    stagger : 0.1,
                });

                gsap.from(el_precaution, {
                    opacity : 0,
                    duration : 1,
                    delay : 0.7,
                })

                gsap.from(el_dividerbar , {
                    scaleX : 0,
                    ease: 'power2.out',
                    duration : 1,
                    delay : 0.7,
                })

            }

        },

    },

    created() {
        this.changePhase('selectType');
        // this.changePhase('signinEmail');
        // this.changePhase('signinSuccess');
    },

    mounted() {
        this.onMountedMotion();
    },

}

export const authStore = {
    name : '$auth',

    state : {
        is_openAuth : false,
        // is_openAuth : true,
    },

    mutations : {
        AUTH_open(state) {
            state.$auth.is_openAuth = true
        },
        AUTH_close(state) {
            state.$auth.is_openAuth = false
        }
    },

    actions : {
        openAuthPanel({commit}) {
            commit('AUTH_open')
        },
        closeAuthPanel({commit}) {
            commit('AUTH_close')
        },
    }
}
</script>

<style scoped lang="scss">
.plate--auth-enter-active {
    transition: transform 700ms $EASE_outExpo 30ms;
}
.plate--auth-leave-active {
    transition: transform 400ms $EASE_inOutCubic 10ms;
}
.plate--auth-leave-active   {transform : translate3d(0, 100%, 0) ;}
.plate--auth-leave          {transform : translate3d(0, 0, 0);}
.plate--auth-leave-to       {transform : translate3d(0, 100%, 0) ;}
.plate--auth-enter-active   {transform : translate3d(0, 100%, 0) ;}
.plate--auth-enter          {transform : translate3d(0, 100%, 0) ;}
.plate--auth-enter-to       {transform : translate3d(0, 0, 0);}

.auth-content-enter-active,  .auth-content-leave-active {
    transition: opacity 600ms ease ;
    position: absolute;
    top: 0;
}

.auth-content-leave-active{
    // transition: opacity 150ms ease ;
    transition: opacity 150ms ease ;
}

.auth-content-leave-active      {opacity: 1;}
.auth-content-leave             {opacity: 1;}
.auth-content-leave-to          {opacity: 0;}
.auth-content-enter-active      {opacity: 0;}
.auth-content-enter             {opacity: 0;}
.auth-content-enter-to          {opacity :1;}

// .auth-content-enter-active {
//     position: absolute;
// }
// .auth-content-enter {
//     position: absolute;
// }

.button--default {
   width: 100%;
}

#plate--auth {
    position: fixed;
    top: 0; left:0 ;
    box-sizing: border-box;
    width: 100%; height: 100%;
    z-index: 1010;
    padding: 20px 20px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
}

.auth__dimmed {
    position: absolute;
    top:0 ; left: 0;
    width: 100%; height: 100%;
}

.auth__box {
    position: relative;
    margin-top:  auto;
    width: 100%; height: 100%;
    max-width : 1480px;
    background: rgba(255,255,255,0.98);
    padding: 20px;
    border-radius: 20px 20px 0 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);

}

.auth__close {
    position: absolute;
    top: 51px; right: 51px;
    width: 40px; height: 40px;
    transform : translateY(-50%);
    cursor: pointer;

    &::before {
        content: '';
        border-top: 2px solid $COLOR_navy_2;
        border-left: 2px solid $COLOR_navy_2;
        width: 100%; height: 100%;
        display: inline-block;
        position: relative;
        transform: rotate(-135deg);
    }

}

.auth__title {
    font-size: $SIZE_PC_fontsizeTitle;
    font-weight: 300;
    text-align: center;
    // background-color: #aac;
    min-height: 65px;
}

.auth__text {
    // background-color: #aca;
    font-size: $SIZE_PC_fontsizeLarge;
    margin-top: 25px;
    text-align: center;
    min-height: 30px;
}


.auth__content {
    width: 360px;
    margin-top: 56px;
    position: relative;
    // border: 1px solid #f11;

}

.auth__controller {
    position: absolute;
    bottom: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    font-weight: 700;
    opacity: 0;
    transform : translate3d(-10px,0,0);
    transition: opacity 200ms ease, transform 400ms $EASE_outCubic;
    text-align: center;

    &.st-show {
        opacity: 1;
        transform : translate3d(0,0,0);
    }

    .auth__history-back {
        padding: 2px 4px;
        font-weight: 700;
    }
}

</style>