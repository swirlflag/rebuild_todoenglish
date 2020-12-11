<template>
    <div id="plate--auth">

        <div class="auth__dimmed" @click="closePlateAuth"></div>

        <div class="auth__box" v-if="phaseDataMap[phase]">

            <div class="auth__close" @click="closePlateAuth">
                <span></span>
                <span></span>
            </div>

            <h2 class="auth__title">
                <TextChangeMask :text="phaseDataMap[phase].title"/>
            </h2>

            <p class="auth__text">
                <TextChangeMask :text="phaseDataMap[phase].text"/>
            </p>

            <div class="auth__controller" v-if="this.phaseHistory.length > 1">
                <span class="auth__history-back" @click="backPhase">
                    뒤로가기
                </span>
            </div>

            <div class="auth__content" ref="ref_content">
                <transition-group name="auth-content" @enter="contentTrsEnter">

                    <AuthSelection  v-if="phase === 'select'" :key="phase"
                                    @change-phase="changePhase"
                    />

                    <AuthSigninEmail v-if="phase === 'signinEmail'" :key="phase"

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
import TextChangeMask from '@/components/layout/TextChangeMask.vue';
import AuthSelection from '@/plates/PlateAuth/AuthSelection.vue';
import AuthSigninEmail from '@/plates/PlateAuth/AuthSigninEmail.vue';
import gsap from 'gsap';
{gsap}

export default {
    name : 'PlateAuth',
    components : {
        TextChangeMask,
        AuthSelection,
        AuthSigninEmail,
    },
    data() {
        return {
            phase   : '',
            phaseHistory : [],
            phaseDataMap : {
                select : {
                    title   : '토도영어에 오신 것을 환영합니다! &#x1F44B;',
                    text    : '토도영어에 등록한 방법으로 로그인하세요.',
                },
                signinEmail : {
                    title   : '토도영어에 오신 것을 환영합니다! &#x1F44B;',
                    text    : '가입하신 이메일로 로그인 하세요.',
                }
            },
        }
    },
    methods : {
        closePlateAuth() {
            this.$store.dispatch('closeAuthPanel');
        },

        changePhase(phase) {
            this.phaseHistory.push(phase);
            this.phase = phase;
        },
        backPhase() {
            if(this.phaseHistory.length <= 1){
                console.dev('ERC_AT1 : 더 이상 뒤로 갈 수 없습니다.')
                return;
            }
            this.phaseHistory.pop();
            this.phase = this.phaseHistory[this.phaseHistory.length-1];
        },
        contentTrsEnter() {
            const el_content = this.$refs.ref_content;
            const el_leave = el_content.querySelector('.auth-content-leave');
            const el_enter = el_content.querySelector('.auth-content-enter');
            if(!el_leave || !el_enter){
                return;
            }

            gsap.fromTo(el_content, 0.6,
            {
                height : el_leave.offsetHeight,
            },{
                height : el_enter.offsetHeight,
                ease : 'power4.out'
            });

        },

    },

    mounted() {
        this.changePhase('select');
        // this.changePhase('signinEmail');
    },
}

export const authStore = {
    name : '$auth',

    state : {
        // is_openAuth : false,
        is_openAuth : true,
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
    transition: transform 550ms $EASE_outExpo;
}
.plate--auth-leave-active {
    transition: transform 250ms $EASE_outCubic;
}
.plate--auth-leave-active   {transform : translate3d(0, 100%, 0) ;}
.plate--auth-leave          {transform : translate3d(0, 0, 0);}
.plate--auth-leave-to       {transform : translate3d(0, 100%, 0) ;}
.plate--auth-enter-active   {transform : translate3d(0, 100%, 0) ;}
.plate--auth-enter          {transform : translate3d(0, 100%, 0) ;}
.plate--auth-enter-to       {transform : translate3d(0, 0, 0);}

.auth-content-enter-active,  .auth-content-leave-active {
    transition: opacity 600ms ease ;
    position:relative;
    position: absolute;
    top: 0;
}

.auth-content-leave-active{
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
}

.auth__text {
    font-size: $SIZE_PC_fontsizeLarge;
    margin-top: 25px;
    text-align: center;
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

    .auth__history-back {

        display: inline-block;
        color: #fff;
        background-color: $COLOR_pink_1;
        // font-weight: 700;
        padding: 10px 20px;
        font-size: $SIZE_PC_fontsizeStrong;
        cursor: pointer;
        border-radius: 9999px;
    }
}

</style>