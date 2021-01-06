<template>
    <div id="plate--auth" ref="ref_root" :class="{'st-open' : $store.state.$auth.is_openAuth}" >

        <div class="auth__dimmed" @click="closeAuth"></div>

        <div class="auth__box" v-if="phaseDataMap[nowPhase]" ref="ref_box" @transitionend="closeAuthAfter">

            <div class="auth__close" @click="closeAuth">
                <span></span>
            </div>

            <h2 class="auth__title" ref="ref_title">
                <TextChangeMask :text="phaseDataMap[nowPhase].title" />
            </h2>

            <p class="auth__text" ref="ref_text">
                <TextChangeMask :text="phaseDataMap[nowPhase].text" :delay="350"/>
            </p>

            <div class="auth__controller" :class="{'st-show' : isShowHistoryButton}">
                <ButtonUnderMask    class="auth__history-back"
                                    text="이전 단계로"
                                    @click="onClickHistoryButton"
                />
            </div>

            <div class="auth__content" ref="ref_content">
                <transition-group   name="auth-content"
                                    @before-enter="onBeforeEnterTransition"
                                    @enter="onEnterTransition"
                                    @after-enter="onAfterEnterTransition"
                >

                <!-- 로그인 방식 분류 -->
                    <AuthSelection  v-if="nowPhase === 'selectType'" :key="nowPhase"
                                    @change-phase="changePhase"
                    />

                <!-- 외부 로그인 시도 . (카카오, 구글) -->
                    <AuthExternal   v-if="nowPhase === 'signinKakao' || nowPhase === 'signinGoogle'" :key="nowPhase"
                                    :nowPhase="nowPhase"
                                    @change-phase="changePhase"
                    />

                <!-- 자체 이메일 로그인 입력 폼 -->
                    <AuthSigninForm     v-if="nowPhase === 'signinForm'" :key="nowPhase"
                                        :nowPhase="nowPhase"
                                        @change-phase="changePhase"
                    />

                <!-- 회원가입에 필요한 동의 체크 -->
                    <AuthSignupConsent  v-if="nowPhase === 'signupConsent'" :key="nowPhase"
                                        @change-phase="changePhase"
                    />

                <!-- 회원가입을 위한 아이디,비밀번호 입력 폼 -->
                    <AuthSignupForm  v-if="nowPhase === 'signupEmailForm'" :key="nowPhase"
                                     @change-phase="changePhase"
                    />

                <!-- 회원가입 완료후 마케팅 동의-->
                    <AuthSignupMarketingAgree   v-if="nowPhase === 'signupMarketingAgree'" :key="nowPhase"
                                                @change-phase="changePhase"
                    />

                <!-- 로그인 완료 -> 인증 종료 -->
                    <AuthSigninSuccess  v-if="nowPhase === 'signinSuccess'" :key="nowPhase"
                                        @change-phase="changePhase"
                                        @reset-history="resetHistory"
                    />

                <!-- 회원가입 완료 -->
                    <AuthSignupSuccess  v-if="nowPhase === 'signupSuccess'" :key="nowPhase"
                                        @change-phase="changePhase"
                                        @reset-history="resetHistory"
                    />

                <!-- 비밀번호 찾기를 위한 이메일 입력 폼 -->
                    <AuthFindPassword   v-if="nowPhase === 'findPassword'" :key="nowPhase"
                                        @change-phase="changePhase"
                    />

                <!-- 비밀번호 찾기 이메일 전송 완료 -->
                    <AuthFindPasswordSuccess    v-if="nowPhase === 'findPasswordSuccess'" :key="nowPhase"
                                                @change-phase="changePhase"
                    />

                <!-- 로그아웃 확인창 -->
                    <AuthSignoutCheck   v-if="nowPhase === 'signoutCheck'" :key="nowPhase"
                                        @change-phase="changePhase"
                    />

                <!-- 로그아웃 완료! -->
                    <AuthSignoutSuccess  v-if="nowPhase === 'signoutSuccess'" :key="nowPhase"
                    />

                </transition-group>
            </div>

        </div>
    </div>
</template>

<script>
import gsap from 'gsap';
import TextChangeMask               from '@/components/layout/TextChangeMask.vue';
import ButtonUnderMask              from '@/components/button/ButtonUnderMask.vue';


import AuthSelection                from './AuthSelection.vue';
import AuthExternal                 from './AuthExternal.vue';
import AuthSigninForm               from './AuthSigninForm.vue';
import AuthSigninSuccess            from './AuthSigninSuccess.vue';
import AuthSignupForm               from './AuthSignupForm.vue';
import AuthSignupConsent            from './AuthSignupConsent.vue';
import AuthSignupMarketingAgree     from './AuthSignupMarketingAgree.vue';
import AuthSignupSuccess            from './AuthSignupSuccess.vue';
import AuthFindPassword             from './AuthFindPassword.vue';
import AuthFindPasswordSuccess      from './AuthFindPasswordSuccess.vue';
import AuthSignoutCheck             from './AuthSignoutCheck.vue';
import AuthSignoutSuccess           from './AuthSignoutSuccess.vue';

export default {
    name : 'PlateAuth',
    components : {
        TextChangeMask,
        ButtonUnderMask,
        AuthSelection,
        AuthExternal,
        AuthSigninForm,
        AuthSigninSuccess,
        AuthSignupForm,
        AuthSignupConsent,
        AuthSignupMarketingAgree,
        AuthSignupSuccess,
        AuthFindPassword,
        AuthFindPasswordSuccess,
        AuthSignoutCheck,
        AuthSignoutSuccess,
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
            // 로그인 타입 선택
                selectType : {
                    title   : '토도영어에 오신 것을 환영합니다! &#x1F44B;',
                    text    : '토도영어에 등록한 방법으로 로그인하세요.',
                },
            // 외부 계정으로 로그인 시도하기
                signinKakao : {
                    title   : '카카오 계정으로 로그인 합니다.',
                    text    : '로그인 과정을 완료해주세요.',
                },
                signinGoogle : {
                    title   : '구글 계정으로 로그인 합니다.',
                    text    : '로그인 과정을 완료해주세요.',
                },
            // 이메일 로그인 폼
                signinForm : {
                    title   : '토도영어에 오신 것을 환영합니다! &#x1F44B;',
                    text    : '가입하신 이메일로 로그인 하세요.',
                },
            // 로그인 성공시
                signinSuccess : {
                    title   : `${this.$store.state.$user.username}님, 안녕하세요! &#x1F64C;`,
                    text    : '성공적으로 로그인 되었습니다.',
                },
            // 회원 가입 : 약관 및 체크박스 (필수 및 선택)
                signupConsent : {
                    title   : '토도영어에 오신 것을 환영합니다! &#x1F44B;',
                    text    : '약관 동의',
                },
            // 회원 가입 : 마케팅 수신 동의/미동의
                signupMarketingAgree : {
                    title   : '토도영어에 오신 것을 환영합니다! &#x1F44B;',
                    text    : '마케팅 수신 동의 여부를 확인합니다. 나중에 변경할 수 있어요.',
                },
            // 회원가입 : 회원정보 입력
                signupEmailForm : {
                    title   : '토도영어에 오신 것을 환영합니다! &#x1F44B;',
                    text    : '가입에 필요한 정보를 입력해주세요.',
                },
            // 회원가입 : 회원가입 완료
                signupSuccess : {
                    title   : `${this.$store.state.$user.username}님, 가입을 환영합니다!`,
                    text    : '회원가입이 완료되었습니다.',
                },
            // 비밀번호 찾기 : 이메일 입력 폼
                findPassword : {
                    title   : '비밀번호를 잊으셨나요? &#128269;',
                    text    : '가입한 이메일 주소를 입력해주세요.',
                },
            // 비밀번호 찾기 : 이메일 발송 완료
                findPasswordSuccess : {
                    title   : '메일함을 확인해주세요! &#128236;',
                    text    : '비밀번호 변경을 위한 이메일을 발송하였습니다.'
                },

            // 로그아웃 : 확인
                signoutCheck : {
                    title   : `${this.$store.state.$user.username}님, 로그아웃 하시겠어요?`,
                    text    : '로그아웃 확인',
                },
            // 로그아웃 :  완료
                signoutSuccess : {
                    title   : '안전하게 로그아웃 되었습니다! &#128641;',
                    text    : '로그아웃 완료',
                }
            });
        },

        isShowHistoryButton() {
            return this.phaseHistory.length > 1
                && this.nowPhase !== 'signinSuccess'
                && this.nowPhase !== 'signupSuccess'
                && this.nowPhase !== 'signoutCheck'
                && this.nowPhase !== 'signoutSuccess'
        }

    },

    watch : {
        "$store.state.$auth.is_openAuth"(now) {
            if(now){
                this.openAuthMotion();
            }
        }
    },

    methods : {
        closeAuthAfter(e) {
            if(e.target !== this.$refs.ref_box){
                return
            }
            if(e.propertyName !== 'transform'){
                return
            }
            if(this.$store.state.$auth.is_openAuth){
                return
            }
            this.changePhaseBase();
        },
        closeAuth() {
            this.$store.dispatch('closeAuthPanel');
        },
        openAuthMotion() {
            this.onMountedMotion();
        },
        changePhase(phase) {
            this.phaseHistory.push(phase);
            this.nowPhase = phase;
        },
        changePhaseBase() {
            this.resetHistory();
            const isSignin = this.$store.state.$user.isSignin;

            if(isSignin){
                this.changePhase('signoutCheck');
            }else {
                this.changePhase('selectType');
            }
        },
        resetHistory() {
            this.phaseHistory = [];
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
            this.backPhase();
            // if(this.nowPhase === 'signinSuccess'){
            //     this.closeAuth();
            // }else {
            //     this.backPhase();
            // }
        },

        onBeforeEnterTransition() {
        },
        onAfterEnterTransition() {
        },
        onEnterTransition() {
            const el_content = this.$refs.ref_content;
            // el_content.style.width = 'auto';
            const el_leave = el_content.querySelector('.auth-content-leave');
            const el_enter = el_content.querySelector('.auth-content-enter');

            if(!el_leave || !el_enter){
                return;
            }

            gsap.fromTo(el_content, 0.6, {
                height  : el_leave.offsetHeight,
                // width   : el_leave.offsetWidth,
            },{
                height  : el_enter.offsetHeight,
                // width   : el_enter.offsetWidth,
                ease    : 'power4.out',
            });

        },

        onMountedMotion() {

            if(this.nowPhase === 'selectType' || this.nowPhase === 'signoutCheck'){

                const el_targets = [
                    this.$refs.ref_title,
                    this.$refs.ref_text,
                ];

                gsap.from( el_targets, {
                    opacity : 0,
                    y : 50,
                    ease : 'power2.out',
                    duration : 0.6,
                    delay : 0.45,
                    stagger : 0.07,
                });

                const el_content = this.$refs.ref_content;
                const el_buttons = el_content.querySelectorAll('.button--default');
                const el_dividerbar = el_content.querySelectorAll('.auth__divider__bar');
                const el_precaution = el_content.querySelectorAll('.auth__divider .precaution');

                el_buttons.length && gsap.from( el_buttons,  {
                    opacity : 0,
                    y : 50,
                    ease : 'power4.out',
                    duration : 0.6,
                    delay : 0.7,
                    stagger : 0.1,
                    clearProps : 'all',
                });

                el_dividerbar.length && gsap.from(el_precaution, {
                    opacity : 0,
                    duration : 1,
                    delay : 1,
                });

                el_precaution.length && gsap.from(el_dividerbar , {
                    scaleX : 0,
                    ease: 'power3.out',
                    duration : 1,
                    delay : 1.1,
                });

            }

        },

    },

    created() {

        const isSignin = this.$store.state.$user.isSignin;

        if(isSignin){
            this.changePhase('signoutCheck');
        }else {
            this.changePhase('selectType');
        }

        // this.changePhase('signupConsent');
        // this.changePhase('signinForm');

        // this.changePhase('signupMarketingAgree');
    },

    mounted() {
        // this.onMountedMotion();
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
            commit('AUTH_open');
            commit('SCROLL_lock');
        },
        closeAuthPanel({commit}) {
            commit('AUTH_close')
            commit('SCROLL_unlock');
        },
    }
}
</script>

<style scoped lang="scss">
.plate--auth-enter-active {
    transition: transform 700ms $EASE_outExpo 30ms;
    @include phone {
        transition: transform 800ms $EASE_outQuart 0;
    }
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

#plate--auth {
    position: fixed;
    top: 0; left:0 ;
    box-sizing: border-box;
    width: 100%; height: 100%;
    z-index: 1010;
    padding: 20px;
    padding-bottom: 0 !important;
    display: flex;
    align-items: center;
    flex-direction: column;
    @include phone {
        padding : $SIZE_MO_innerPadding;
    }

    transition:  transform 1s ease ;

    pointer-events: none;
    &.st-open {
        pointer-events: all;
    }
}

.auth__dimmed {
    position: absolute;
    top:0 ; left: 0;
    width: 100%; height: 100%;
    // cursor: pointer;
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
    transform : translate3d(0,100%,0);
    will-change: transform;
    transition: transform 400ms $EASE_inOutCubic 10ms;

    @include phone {
        padding : $SIZE_MO_innerPadding;
    }

    .st-open & {
        transform : translate3d(0,0,0);
        transition: transform 700ms $EASE_outExpo 70ms;
    }

}

@keyframes authFloat {
    0% {
        transform : translateY(-50%);
    }
    100% {
        transform : translateY(50%);
    }
}

.auth__close {
    position: absolute;
    top: 20px; left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    box-sizing: border-box;
    display: flex;
    padding: 15px 0 ;
    border: 1px solid #000;

    @include phone {
        padding: 10px 0 ;
        top: 5px;
        // top: 0;
    }

    span {
        animation: authFloat 1000ms $EASE_inOutCubic infinite alternate;
        vertical-align: top;
        display: inline-block;
        position: relative;
        width: 150px; height: 5px;
        @include phone {
            width: 140px;
            height: 5px;
        }

        display: flex;
        flex-wrap: nowrap;

        &::before , &::after {
            content : '';
            width: 50%; height: 100%;
            position: relative;
            background-color: #dfdfdf;
            transition:  transform 250ms ease ,background-color 300ms ease;
            border-radius: 9999px;
        }
        &::before {left: 2%;}
        &::after {right: 2%;}

    }

    @include hover {
        span {
            &::after,&::before{
                background-color: #ccc;
            }
            &::before {
                transform: rotate(15deg);
            }
            &::after {
                transform: rotate(-15deg);
            }
        }
    }
}

.auth__title {
    font-size: $SIZE_PC_fontsizeTitle;
    font-weight: 300;
    text-align: center;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;

    @include phone {
        width: 100%;
        font-size: $SIZE_MO_fontsizeTitle;
        // padding: 0 $SIZE_MO_innerPadding;
    }

    > .mask-text {
        width: 100%;
    }
}

.auth__text {
    width: 100%;
    font-size: $SIZE_PC_fontsizeLarge;
    margin-top: 25px;
    text-align: center;
    // min-height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    @include phone {
        font-size: $SIZE_MO_fontsizeDefault;
        padding: 0 $SIZE_MO_innerPadding;
    }

    > .mask-text {
        width: 100%;
    }

}


.auth__content {
    // min-width: 510px;
    // min-width:800px;
    // min-width: 360px;
    // max-width: 360px;
    max-width: 510px;
    width: 100%;
    margin-top: 56px;
    position: relative;

    @include phone {
        margin-top: 40px;
    }
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
    pointer-events: none;

    &.st-show {
        pointer-events: all;
        opacity: 1;
        transform : translate3d(0,0,0);
    }

    .auth__history-back {
        padding: 2px 4px;
        font-weight: 700;
    }
}



</style>

<style lang="scss">
.auth__content .auth__contain,
.auth__content .button--default,
.auth__content .input--default {
    // border: 1px solid #3d3;
    max-width : 360px;
    position: relative;
    width: 100%;
    align-self: center;
}

.auth__alert-area {
    min-height: 30px;
    color: $COLOR_pink_1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: auto;

    .spinner--colordots {
        position: absolute;
        width: 100%; height: 100%;

        @include phone {
            transform:scale(0.8);
        }
    }

}

</style>