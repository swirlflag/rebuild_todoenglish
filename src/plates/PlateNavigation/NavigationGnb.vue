<template>
    <div    id="nav-gnb"
            :class="`${useTransition ? 'use-trs' : ''}${$user.isSignin ? ' is-login' : ''}${isOpenMenu ? ' st-open-menu' : ''}${isOpenAccount ? ' st-open-account' : ''}${isReduce ? ' st-reduce' : ''}${themeClear ? ' type-clear' : ''}${themeWhite ? ' color-white' : ''} ${isHide ? 'st-hide' : ''}`"
    >

        <div class="nav-gnb__wrap">

            <div class="nav-gnb__source" v-if="0">
                <video autoplay loop muted playsinline ref="ref_video">
                    <source src="@/assets/video/sample.mp4" type="video/mp4">
                </video>
            </div>

            <router-link to="/" class="nav-gnb__logo" >
                <span></span>
            </router-link>

            <div class="nav-gnb__linkwrap" ref="ref_linkwrap">

                <ul class="nav-gnb__links">
                    <li class="nav-gnb__link"><router-link class="style-gnb-link hover-underline color-white" to="/" exact>토도영어 소개</router-link></li>
                    <li class="nav-gnb__link"><router-link class="style-gnb-link hover-underline color-white" to="/review" exact>멤버십 후기</router-link></li>
                    <li class="nav-gnb__link"><router-link class="style-gnb-link hover-underline color-white" to="/curriculum">커리큘럼</router-link></li>
                    <li class="nav-gnb__link"><router-link class="style-gnb-link hover-underline color-white" to="/product" exact>멤버십 가입</router-link></li>
                    <li class="nav-gnb__link"><router-link class="style-gnb-link hover-underline color-white" to="/4" exact>도움말</router-link></li>
                    <li class="nav-gnb__link"><router-link class="style-gnb-link hover-underline color-white" to="/mypage">TEST</router-link></li>
                </ul>

                <div class="nav-gnb__account">
                    <div class="nav-gnb__user">
                        <div class="nav-gnb__link--user">
                            <span class="icon icon--account" :class="{'c-white' : whiteCondition}"></span>
                            <div class="nav-gnb__account__parents" >
                                <router-link v-if="$user.isSignin" to="/mypage" exact class="style-gnb-link hover-underline color-white"> Parents </router-link>
                                <span v-else @click.prevent="TEST_OPENAUTH" class="style-gnb-link hover-underline color-white"> Sign in </span>
                            </div>
                            <router-link to="/mypage" class="nav-gnb__account__username style-gnb-link hover-underline color-white">
                                {{ $user.username }}
                            </router-link>
                        </div>
                        <button class="nav-gnb__openinfo-button"
                                @click="toggleAccountInfo"
                        >
                            <span   class="icon icon--dropdown-arrow"
                                    :class="{'c-white' : whiteCondition}"
                            >
                            </span>
                        </button>
                    </div>

                    <span class="nav-gnb__listline" ref="ref_accountLine"></span>

                    <div    class="nav-gnb__account-info"
                            ref="ref_accountInfo"
                    >
                        <div class="nav-gnb__account-email">{{ $user.username }}</div>
                        <span class="icon icon--signout-arrow"></span>
                        <a href="#" class="nav-gnb__signout style-gnb-link hover-underline" @click.prevent="TEST_OPENAUTH">Sign Out</a>
                    </div>

                </div>

            </div>

            <button class="nav-gnb__menu-button" @click="toggleMenu">
                <div class="nav-gnb__menu-button__wrap">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';

export default {
    name : 'NavagationGnb',
    data() {
        return {
            isLogin             : true,
            isOpenMenu          : false,
            isOpenAccount       : false,
            isReduce            : false,
            isHide              : false,

            useTransition       : true,

            mobileMenuHeight    : 0,
            mobileSignoutHeight : 0,

            themeClear     : false,
            themeWhite     : true,

            beforeScrollY : window.scrollY,

        }
    },
    computed : {
        ...mapState([
            '$user'
        ]),
        whiteCondition() {
            return this.isOpenMenu || this.themeWhite;
        }
    },
    watch: {
        '$route.path' () {
            this.$store.commit('GNB_unuseClear');
            this.$store.commit('GNB_useWhite');
            // this.closeMenu(false);
            this.closeMenu();
        },
        '$store.state.$nav' : {
            handler({is_clear ,is_white}) {
                this.themeClear = is_clear;
                this.themeWhite = is_white;
            },
            deep: true,
        }
    },
    methods : {
        openMenu(trs = true) {
            this.$store.commit('SCROLL_lock');
            this.useTransition = trs;
            this.isOpenMenu = true;
            // this.$refs.ref_video.play();
        },
        closeMenu(trs = true) {
            this.$store.commit('SCROLL_unlock');
            this.useTransition = trs;
            this.isOpenMenu = false;
            // this.$refs.ref_video.pause();
        },
        toggleMenu() {
            this.isOpenMenu ? this.closeMenu() : this.openMenu();
        },
        toggleAccountInfo() {
            this.isOpenAccount = !this.isOpenAccount;
        },
        TEST_OPENAUTH() {
            this.closeMenu();
            this.$store.dispatch('openAuthPanel')
        },


        onScrollWindow() {
            const Y = window.scrollY;
            this.isHide = this.beforeScrollY < Y ;
            this.beforeScrollY = Y;
        },

    },
    mounted () {
        this.closeMenu();
        window.addEventListener('resize' , this.closeMenu);
        window.addEventListener('scroll' , this.onScrollWindow);
    },
    destroyed() {
        window.removeEventListener('resize' , this.closeMenu);
        window.removeEventListener('scroll' , this.onScrollWindow);
    }
}

export const gnbStore = {
    state : {
        is_clear   : false,
        is_white   : true,
    },
    mutations : {
        GNB_useClear(state) {
            state.$nav.is_clear = true;
        },
        GNB_unuseClear(state) {
            state.$nav.is_clear = false;
        },
        GNB_useWhite(state) {
            state.$nav.is_white = true;
        },
        GNB_unuseWhite(state) {
            state.$nav.is_white = false;
        }
    }
}

</script>

<style scoped lang="scss">

$SIZE_MO_linkDistance : 15px;

@mixin lessThenPcWidth {
    @include lessThenSize($SIZE_PC_contentWidth) {
        @content;
    };
};

#nav-gnb {

    z-index: 1100;
    font-size: 16px;
    background-color: $COLOR_navy_2;
    box-sizing: border-box;
    // padding: 20px $SIZE_PC_innerPadding;
    padding: 20px 0;
    position: relative;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    height: $SIZE_PC_gnbHeight;

    &.use-trs {
        transition  : background-color 250ms ease 100ms
                    , height 400ms $EASE_outQuart
                    , transform 200ms $EASE_outCubic
                    , box-shadow 500ms ease
                    ;
    }

    @include phone {
        padding: 0;
        width: 100%;
        font-size: 24px;
        height: $SIZE_MO_gnbHeight;
        overflow: hidden;
    }
    &.color-white{
        @include hardSelect {
            color: #fff;
        }
    }
    &.type-clear {
        background-color: transparent;
        box-shadow: none;
        .hover-underline::before{
            background-color: $COLOR_navy_1;
        }
    }
    &.st-open-menu {
        background-color: $COLOR_navy_2;
        height: 100%;
        transition  : background-color 450ms ease
                    , height 450ms $EASE_inOutCubic
                    , transform 500ms $EASE_outCubic
                    !important ;
    }
    &.st-reduce:not(.st-open-menu){
        transform : translateY(-100%);
    }s

    &.st-hide {
        transform: translate3d(0,-100%,0);
        transition  : background-color 250ms ease 100ms
                    , height 400ms $EASE_outQuart
                    , transform 400ms $EASE_outCubic 500ms
                    , box-shadow 500ms ease
                    ;
    }
    .icon {
        transition : background-image 300ms ease ;
    }
}

.nav-gnb__wrap {
    max-width: $SIZE_PC_contentWidth;
    padding : 0 $SIZE_PC_innerPadding;
    // min-width : 920px;
    margin: 0 auto;
    display: flex;
    box-sizing: border-box;
    align-items: center;

    @include phone {
        max-width : 100%;
        height: 100vh;
        align-items: start;
        flex-direction: column;
        padding: 14px $SIZE_MO_innerPadding;
        pointer-events: none ;

        .st-open-menu & {
            pointer-events: all;
        }
    }
}

.nav-gnb__logo {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    pointer-events: all;

    @include phone {
        position: absolute;
        top: 0; left: $SIZE_MO_innerPadding;
    }

    > span {
        width: 80px; height: 72px;
        display: inline-block;
        background-image: url('~@/assets/logo/logo_todoenglish.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center 45%;

        transition: background-image 100ms ease 200ms;

        @include phone {
            width: 70px;
            width: 34px;
            height: $SIZE_MO_gnbHeight;
            background-image: url('~@/assets/logo/logo_school.svg');
        }

        .color-white & ,
        .st-open-menu & {
            background-image: url('~@/assets/logo/logo_todoenglish_white.svg');
            @include phone {
                background-image: url('~@/assets/logo/logo_school_white.svg');
            }
        }

    }
}

.nav-gnb__linkwrap {
    width: 100%;
    box-sizing: border-box;
    position: relative;
    display:flex;
    height :auto;

    .style-gnb-link {
        cursor: pointer;
        white-space: nowrap;
        // box-sizing: border-box;
        // position: relative;

        // &::before{
        //     content: '';
        //     position: absolute;
        //     height: 2px;
        //     width: 100%;
        //     background: #fff;
        //     bottom: 0; left: 0;
        //     transform : scaleX(0);
        //     transition: transform 120ms $EASE_outCubic;
        //     transform-origin: center;
        // }

        // @include hover {
        //     &::before {
        //         transform : scaleX(1);
        //     }
        // }

        @include phone {
            opacity: 0.4;
        }
        &.router-link-active {
            font-weight: 800;
            opacity: 1;
        }

        // &.nav-gnb__signout {
        //     @include overPhone {
        //         border: 1px solid #000;
        //         &::before {
        //             background: $COLOR_navy_1;
        //         }
        //     }
        // }
    }

    @include overPhone {
        height: auto !important;
    }
    @include phone {
        // margin-top: 30px;
        margin-top: $SIZE_MO_gnbHeight;
        left: 0;
        margin-left: 0;
        height: 0;
        width: 100%; height: auto;
        margin-bottom: $SIZE_MO_linkDistance;
        flex-direction: column;
        overflow: hidden;

        transition: height 500ms $EASE_inOutCubic,
                    background-color 300ms ease
                    ;
        @include hardSelect {
            font-size: 24px;
            color: #fff;
        }
        .st-open-menu & {
            height: calc(100% - #{$SIZE_MO_gnbHeight});
        }

        .type-clear & {
            background-color: transparent;
        }

    }

}

.nav-gnb__source {
    overflow: hidden;
    width: 100vw; height: calc(100vh);
    position: absolute;
    top: 0; left: 0;
    box-sizing: border-box;
    display :none;
    opacity: 0;
    pointer-events: none;
    transition : opacity 500ms ease;

    @include phone {
        display: block;
    }
    .st-open-menu & {
        transition-delay: 500ms;
        opacity: 0.12;
        opacity: 0.5;
    }

    video {
        object-fit: cover;
        width: 100%; height: 100%;
        box-sizing: border-box;
    }
}


.nav-gnb__links {
    display: flex;
    width: 100%;
    margin-left: 64px;
    align-items: center;
    box-sizing: border-box;

    @include phone {
        flex-direction: column;
        margin: 0;
        box-sizing: border-box;
    }

    .nav-gnb__link {
        margin-left: 72px;

        @include lessThenPcWidth {
            margin-left: calc(20px + 1vw);
            font-size: 14px;
        }

        @include phone {
            width: 100%;
            margin: $SIZE_MO_linkDistance 0;
        }

        &:nth-child(1) {
            margin-left: 0;
        }
    }
}

.nav-gnb__account {
    position: relative;

    @include phone {
    }

    .nav-gnb__user {
        display: flex;
        align-items: center;

        @include phone {
            margin: $SIZE_MO_linkDistance 0;
            display: inline-block;
        }

        > .nav-gnb__link--user {
            display: inline-flex;
            align-items: center;
            height: 100%;

            .icon--account {
                display: none;
                @include overPhone {
                    .is-login & {
                        display: inline-block;
                        margin-right: 8px;
                        width: 15px; height: 17px;
                    }
                }
            }

            .nav-gnb__account__parents {
                font-weight: 300;
                display: inline-block;
                @include overPhone {
                    .is-login & {display: none}
                }
            }

            .nav-gnb__account__username {
                font-weight: 800;
                display: none;
                @include overPhone {
                    .is-login & {display : inline-block;}
                }
                @include phone {display: none;}
            }
        }

        > .nav-gnb__openinfo-button {
            display: none;
            height: 24px;
            @include overPhone {
                .is-login & {display: inline-block;}
            }
            .icon--dropdown-arrow {
                width: 24px; height: 24px;
                transition : transform 100ms ease;
                .st-open-account & {
                    transform :rotate(180deg)
                }
            }
        }

    }

    .nav-gnb__listline {
        display: none;
        @include phone {
            width: 100%; height: 1px;
            background-color: rgba(255,255,255,0.3);
            margin: $SIZE_MO_linkDistance 0;
            vertical-align: top;
            .is-login & {
                display: inline-block;
            }
        }
    }

    .nav-gnb__account-info {

        display: flex;

        @include overPhone {
            position: absolute;
            top: 100%; right: 0;
            padding: 15px;
            border-radius: 8px;
            background-color: #fff;
            margin-top: 8px;
            border: solid 1px $COLOR_offWhite;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15);
            opacity: 0;
            pointer-events: none;
            transition : opacity 200ms ease , transform 300ms $EASE_outCubic;
            transform : translateY(-10px);
            @include hardSelect {
                color: $COLOR_navy_1;
            }

            .st-open-account.is-login & {
                opacity: 1;
                pointer-events: all;
                transition : opacity 150ms ease , transform 300ms $EASE_outBack2;
                transform : none;
            }
        }

        @include phone {
            position: relative;
            margin: $SIZE_MO_linkDistance 0;
            display: none;
            .is-login & {
                display: flex;
            }
        }

        .nav-gnb__account-email {
            padding-right: 74px;
            margin-right: 20px;
            border-right: 1px solid $COLOR_offWhite;
            @include phone {
                display: none;
            }
        }
        .icon--signout-arrow {
            margin-right: 5px;
            position: relative;
            width: 16px; height: 15px;
            @include phone {
                width: 25px; height: 25px;
            }
        }
        .nav-gnb__signout {
            white-space: nowrap;
            position: relative;
            @include overPhone {
                font-weight: 800;
            }
        }
    }
}


.nav-gnb__menu-button {
    z-index: 10;
    display: none;
    margin-left: auto;
    width: 26px; height: 22px;
    position: absolute;
    top: 32px;
    top: 23px;
    right: $SIZE_MO_innerPadding;
    @include phone {
        display: inline-block;
        pointer-events: all;
    }
    .nav-gnb__menu-button__wrap {
        display: inline-block;
        width: 100%; height: 100%;
        position: relative;
        overflow: hidden;
        > span {
            position: absolute;
            width: 100%; height: 13%;
            display: inline-block;
            left: 0;
            background-color:$COLOR_navy_1;
            transition: transform 300ms $EASE_outCubic;
            transform : translate3d(0,0,0) ,rotate(0deg);
            border-radius: 9999px;

            .color-white &,
            .st-open-menu &  {
                background-color: #fff;
            }

            &:nth-child(1) {top: 0; transition-delay: 270ms;}
            &:nth-child(2) {top: calc(50% - 7.5%); }
            &:nth-child(3) {top: calc(50% - 7.5%); }
            &:nth-child(4) {bottom: 0; transition-delay: 190ms;}

            .st-open-menu & {
                transition-delay: 0ms;
                &:nth-child(1) {transform : translateX(100%); }
                &:nth-child(2) {transform : rotate(45deg);}
                &:nth-child(3) {transform : rotate(-45deg);}
                &:nth-child(4) {transform : translateX(-100%); }
            }
        }
    }
}


</style>