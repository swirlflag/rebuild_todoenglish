<template>
    <div    ref="ref_root"
            class="nav-gnb"
            :class="{'st-openmenu' : $store.state.$nav.is_openGnb , 'dt-login' : isLogin}"
    >

        <div class="gnb__dimmed" @click="closeMenu"></div>

        <div class="gnb__wrap" ref="ref_wrap">
            <div class="gnb__concise" ref="ref_concise">
                <router-link to="/" class="gnb__logo">
                    <span class="icon icon--logoschool c-white"></span>
                    <span class="typo--todoenglish"></span>
                </router-link>

                <div class="gnb__storage">
                    <div class="gnb__emphasis">
                    </div>
                    <div class="gnb__user">
                        <span class="gnb__user__dot"></span>
                        <span class="icon icon--account c-white"></span>
                    </div>
                    <button class="gnb__menu" @click="toggleMenu">
                        <div class="gnb__menu__icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div>

            <div class="gnb__pannel" ref="ref_pannel">

                <div class="gnb__pannel__block">
                    <div class="gnb__public">
                        <span class="gnb__public__focus">focus</span>
                        <ul class="gnb__public__list" ref="ref_public">

                            <template v-for="(item,idx) in gnbData.public">
                                <li :key="idx" class="gnb__public__item">
                                    <router-link :to="item.to">
                                        <span class="gnb__public__number">
                                            0{{ idx+1}}
                                        </span>
                                        <span class="gnb__public__name">
                                            {{ item.name }}
                                        </span>
                                    </router-link>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>

                <div class="gnb__pannel__block">
                    <div    class="gnb__private"
                    >

                        <div    class="gnb__private__title"
                        >
                            <span class="icon icon--lock"></span>
                            {{
                                isLogin ? `${$store.state.$user.username}님, 안녕하세요!` : '로그인이 필요합니다'
                            }}
                        </div>

                        <ul class="gnb__private__list" ref="ref_private">

                            <template v-for="(item,idx) in gnbData.private">
                                <li :key="idx" class="gnb__private__item">
                                    <router-link to="#">
                                        {{ item.name }}
                                    </router-link>
                                </li>
                            </template>

                            <li class="gnb__private__item gnb__auth"
                                @click="openAuthPanel"
                            >
                                <router-link to="#">
                                    <span class="icon icon--key"></span>
                                    {{
                                        isLogin ? '로그아웃' : '로그인'
                                    }}
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    <div class="gnb__banner">
                        <div class="gnb__banner__badge">
                            <span>New Event!</span>
                        </div>
                        <div class="gnb__banner__source">
                            <div class="image-box">
                                <img src="@/assets/illust/rocket_purple.svg" alt="">
                            </div>
                        </div>
                        <p class="gnb__banner__content">
                            <strong>월 32,500원</strong>으로 꺼내는
                            <br>우리 아이 영어 자신감!
                        </p>
                    </div>

                    <div class="gnb__etc">

                        <a href="#" class="gnb__etc__enuma">
                            <span class="gnb__etc__enuma__copy">Empower ALL Children</span>
                            <span class="gnb__etc__enuma__detail" >에누마 공식 홈페이지</span>
                        </a>

                        <ul class="gnb__etc__sns">
                            <li class="gnb__etc__sns__item">
                                <a href="#"><i class="fab fa-instagram"></i></a>
                            </li>
                            <li class="gnb__etc__sns__item">
                                <a href="#"><i class="fab fa-facebook-square"></i></a>
                            </li>
                            <li class="gnb__etc__sns__item">
                                <a href="#"><i class="fab fa-twitter-square"></i></a>
                            </li>
                            <li class="gnb__etc__sns__item">
                                <a href="#"><i class="fab fa-youtube-square"></i></a>
                            </li>
                        </ul>

                        <p class="gnb__etc__copyright">
                            ⓒ 2018 Enuma, Inc. All Rights Reserved.
                        </p>

                    </div>

                </div>
            </div>
        </div>



    </div>
</template>

<script>

import gsap from 'gsap';


export default {
    data() {
        return {

            gnbData  : {
                public : [
                    {
                        name : '멤버십 후기',
                        to : '/review',
                    },
                    {
                        name : '커리큘럼 안내',
                        to : '/curriculum'
                    },
                    {
                        name : '이용하기',
                        to : '/product'
                    },
                    {
                        name : '도움말',
                        to : '/help'
                    },
                ],

                private : [
                    {
                        name : '계정 관리',
                        to : '/mypage/account'
                    },
                    {
                        name : '학습정보 열람',
                        to : '/mypage/study'
                    },
                ],
            },

            isOpenMenu : false,
            navTL : new gsap.timeline(),

            publicList  : null,
            privateList : null,
        }
    },
    computed : {
        isLogin () {
            return this.$store.state.$user.is_login
        },
    },
    watch: {
        'isOpenMenu'(now) {
            this.navTL.clear();
            if(now){
                this.openMenuMotion();
            }else {
                this.closeMenuMotion();
            }
        },

        '$store.state.$nav.is_openGnb'(now) {
            this.navTL.clear();
            if(now){
                this.openMenuMotion();
            }else {
                this.closeMenuMotion();
            }
        },
    },
    methods : {
        openMenuMotion() {
            const wrap      = this.$refs.ref_wrap;
            const concise   = this.$refs.ref_concise;
            const pannel    = this.$refs.ref_pannel;
            const openHeight = concise.offsetHeight + pannel.offsetHeight;

            this.navTL.to(wrap, {
                height: openHeight,
                ease: 'power2.out',
                duration: 0.5,
            });

        },
        closeMenuMotion() {
            const wrap          = this.$refs.ref_wrap;
            const concise       = this.$refs.ref_concise;
            const closeHeight   = concise.offsetHeight;

            this.navTL.to(wrap, {
                height: closeHeight,
                ease: 'power2.out',
                duration: 0.45,
            });
        },

        openAuthPanel() {
            this.$store.dispatch('openAuthPanel');
        },

        openMenu() {
            this.$store.dispatch('openGnb');
        },
        closeMenu() {
            this.$store.dispatch('closeGnb');
        },

        toggleMenu() {
            if(this.$store.state.$nav.is_openGnb){
                this.closeMenu();
            }else {
                this.openMenu();
            }
        },

        selectElement() {
            this.publicList    = this.$refs.ref_public.querySelectorAll('li');
            this.privateList   = this.$refs.ref_private.querySelectorAll('li');
        },
    },

    mounted(){
        this.selectElement();
    },
}

export const gnbStore2 = {
    state : {
        is_openGnb : false,
    },
    mutations : {
        GNB_open(state){
            state.$nav.is_openGnb = true;
        },
        GNB_close(state){
            state.$nav.is_openGnb = false;
        },
    },
    actions : {
        openGnb({commit}) {
            commit('GNB_open');
        },
        closeGnb({commit}) {
            commit('GNB_close');
        }
    },

}

</script>

<style lang="scss" scoped>

$navh : 68px;

.nav-gnb{

}

.gnb__dimmed {
    width: 100%; height: 100%;
    position: absolute;
    top: 0; left: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 1;
    transition : opacity 600ms ease;
    opacity: 0;
    pointer-events: none;
    .st-openmenu & {
        opacity: 1;
        pointer-events: all;
    }
}

.gnb__wrap {
    overflow: hidden;
    background-color: $COLOR_navy_2;
    height : $navh;
    position: relative;
    width: 100%;
    will-change: height;
    z-index: 10;
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2);
    @include hardSelect {
        color : #fff;
    }
}

.gnb__concise {
    display: flex;
    position: relative;
    z-index: 10;
    max-width : $SIZE_PC_contentWidth;
    padding: 0 $SIZE_PC_innerPadding ;
    margin: 0 auto;
    box-sizing: border-box;
    height: $navh ;
    transition: transform 500ms $EASE_outQuart;

    .st-openmenu & {
        transform : translate3d(0,50%,0);
    }

    .gnb__logo {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        will-change: filter;
        transition: filter 400ms ease;

        filter : grayscale(1) brightness(3);
        .st-openmenu & {
            transition-delay: 370ms;
            filter : grayscale(0) brightness(1);
        }

        .icon--logoschool {
            width: 34px ; height: 34px;
            transition : transform 300ms $EASE_outBack2;
            .st-openmenu & {
                transform:scale(1.5);
                transition-delay: 220ms;
            }
        }
        .typo--todoenglish {
            opacity: 0;
            position: absolute;
            top: 0; left: 100%;
            margin-left: 35px;
            pointer-events: none;
            width: 90px; height: 100%;
            background-image: url('~@/assets/logo/logo_todoenglish_typo.svg');
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            transform : translate3d(0, 20px, 0);
            transition: opacity 200ms ease, transform 300ms $EASE_inCubic 200ms;
            .st-openmenu & {
                pointer-events: all;
                transition: opacity 200ms ease 250ms, transform 500ms $EASE_outBack 200ms;
                opacity: 1;
                transform : translate3d(0, 0, 0);
            }
        }
    }

    .gnb__storage {
        margin-left: auto;
        display :flex;
        align-items: center;

        > * {
            margin-left: 24px;
            &:nth-child(1) {
                margin-left: 0;
            }
        }

        .gnb__user {
            display : flex;
            align-items: center;

            .gnb__user__dot {
                display: inline-block;
                width: 5px; height: 5px;
                border-radius: 9999px;
                background-color: rgba(255,255,255,0.4);
                margin-right: 12px;

                .dt-login & {
                    background-color: rgba(255,255,255,1);
                    box-shadow: 0 0 5px 2px rgba(5,255,0,0.8);
                }
            }

        }

        .gnb__menu {
            cursor: pointer;
            position: relative;
            border-radius: 8px;
            padding: 6px;
            transition : background-color 300ms ease , border 300ms ease;
            border: 1px solid transparent;

            @include hover {
                background-color : #fff;
                .gnb__menu__icon > span::before,
                .gnb__menu__icon > span::after{
                    background: $COLOR_navy_1;
                }
            }

            .gnb__menu__icon {
                transition : transform 300ms $EASE_outCubic;
                overflow: hidden;
                box-sizing: border-box;
                width: 30px; height: 30px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .st-openmenu & {
                    transform: scale(1.35);
                }
                > span {
                    display: inline-block;
                    width: 100%; height: 3px;
                    transform-origin: center;
                    position: relative;

                    @mixin menuline {
                        content: '';
                        display: inline-block;
                        position: absolute;
                        top: 0;left: 0;
                        background-color: #fff;
                        width: 100%; height: 100%;
                        transition: transform 500ms $EASE_outExpo, background-color 150ms ease 0ms;
                        border-radius: 9999px;
                    }

                    &::before , &:nth-child(2)::after{
                        @include menuline;
                    }

                    &:nth-child(1)::before{ transition: transform 500ms $EASE_outExpo 250ms, background-color 150ms ease 0ms; }
                    &:nth-child(3)::before{ transition: transform 500ms $EASE_outExpo 350ms, background-color 150ms ease 0ms; }

                    .st-openmenu & {
                        &:nth-child(1)::before{
                            transform : translate3d(103%,0,0);
                            transition: transform 500ms $EASE_outExpo 0ms, background-color 150ms ease 0ms;
                        }
                        &:nth-child(2) {
                            &::before{
                                transform : rotate(45deg);
                                transition : transform 300ms $EASE_outBack 200ms , background-color 150ms ease 0ms;
                            }
                            &::after {
                                transform : rotate(-45deg);
                                transition : transform 300ms $EASE_outBack 200ms, background-color 150ms ease 0ms;
                            }
                        }
                        &:nth-child(3)::before{
                            transform : translate3d(-103%,0,0);
                            transition: transform 500ms $EASE_outExpo 40ms, background-color 150ms ease 0ms;
                        }
                    }

                }
            }

        }
    }
}


















.gnb__pannel {
    max-width : $SIZE_PC_contentWidth;
    padding: #{$SIZE_PC_innerPadding*3} $SIZE_PC_innerPadding ;
    margin: 0 auto;
    width: 100%;
    position: relative;
    display :flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
    pointer-events: none;

    .st-openmenu & {
        pointer-events: all !important;
    }


    > .gnb__pannel__block{
        box-sizing: border-box;
        display : flex;
        flex-direction: column;
        width: 50%;
        max-width: 380px;
        border: 1px solid #111;
        // border: 1px solid #333;
        margin-left: $SIZE_PC_innerPadding;
        &:nth-child(1) {
            margin-left: 0;
        }
    }

    @mixin publicFont {
        font-size: $SIZE_PC_fontsize_title;
        font-weight: 700;
    }

    .gnb__public {
        position: relative;
        width: 100%;

        .gnb__public__focus {
            width: 100%;
            // border: 1px solid #d3d;
            position: absolute;
            top: 0; left: 0;
            user-select: none !important;
            pointer-events: none !important;
            color: transparent;
            @include publicFont;
        }

        .gnb__public__list {

            display: flex;
            flex-direction: column;

            .gnb__public__item {
                margin-top: 34px;
                &:nth-child(1) {margin-top: 0}

                > a {
                    width: 100%; height: 100%;
                    // border: 1px solid #ddd;
                    box-sizing: border-box;
                    display: flex;

                    .gnb__public__number {
                        display: inline-block;
                        writing-mode: vertical-rl;
                        text-align: center;
                        margin-right: 16px;
                        font-weight: 300;
                        letter-spacing: 0;
                        opacity: 0.7;
                        transition: transform 500ms ease 0ms;
                    }

                    .gnb__public__name {
                        @include publicFont;
                        transition: transform 450ms $EASE_inCubic 0ms, opacity 350ms ease 0ms;
                        transform: translate3d(30px,0,0);
                        opacity: 0;
                    }

                }

                .st-openmenu & {
                    @for $i from 1 through 10 {
                        $delay : #{$i * 30ms};
                        &:nth-child(#{$i}) {
                            .gnb__public__number {
                                // margin-left: #{$i *10px};
                            }
                            .gnb__public__name {
                                // margin-left: #{$i *10px};
                                opacity: 1;
                                transform: translate3d(0,0,0);
                                transition: transform 800ms $EASE_outExpo $delay, opacity 350ms ease $delay;
                            }
                        }
                    }
                }
            }
        }

    }

    .gnb__private {
        // margin-left: auto;
        text-align: right;

        .icon {
            margin-right: 14px;
        }

        .gnb__private__title {
            font-size: $SIZE_PC_fontsize_large;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            > .icon--lock {
                .dt-login & {
                    display: none;
                }
            }

        }

        .gnb__private__list {
            padding: 26px 0 ;
            margin-top: 26px;

            position: relative;

            &::before , &::after {
                content: '';
                position: absolute;
                width: 100%;
                background-color: #fff;
                height: 1px;
                right: 0;
            }
            &::before {top: 0;}
            &::after {bottom: 0;}

            .gnb__private__item {
                margin-top: 26px;
                opacity: 0.3;
                pointer-events: none;

                .dt-login & ,
                &.gnb__auth{
                    pointer-events: all;
                    opacity: 1;
                }

                &:nth-child(1) {
                    margin-top: 0;;
                }
                a {
                    display :inline-flex;
                    justify-content: flex-end;
                    align-items: center;
                    font-weight: 700;
                    font-size: $SIZE_PC_fontsize_subtitle;
                }

            }

            .gnb__auth {
                .icon--key {
                    .dt-login & {
                        display: none;
                    }
                }
            }
        }
    }

    .gnb__banner {
        margin-top: 52px;
        position: relative;
        padding: 26px 30px;
        border-radius: 16px;
        background-color: #F5FAFF;
        background: linear-gradient(129deg, rgba(245,250,255,1) 0%, rgba(251,245,255,1) 100%);
        // background: linear-gradient(129deg, rgba(245,250,255,1) 0%, rgba(245,255,247,1) 100%);

        .gnb__banner__badge {
            position: absolute;
            box-sizing: border-box;
            width: 100%;

            top: 0; left: 0;
            transform : translate3d(0,-50%,0);
            display: flex;
            justify-content: center;

            span {
                padding: 3px 15px 5px;
                border-radius: 9999px;
                box-sizing: border-box;
                font-weight: 700;
                color: #fff;
                background-color: #F4B537;
            }
        }
        .gnb__banner__source {
            position: absolute;
            right: -23%; bottom: -7px;
            height: 100%;
            z-index: 1;
            .image-box {
                height: 100%;
            }
        }

        .gnb__banner__content {
            position: relative;
            z-index: 10;
            color: #000000;
            width: 100%;
            font-size: $SIZE_PC_fontsize_large;
            font-weight: 700;
            text-shadow: 0 3px 5px rgba(255,255,255,0.2);
            strong   {
                color: #7C32C0;
            }
        }
    }


    $opacityEtc : 0.5;
    .gnb__etc {
        margin-top: 52px;
        display: flex;
        flex-direction: column;
        text-align: right;

        @include hardSelect {
            font-size: $SIZE_PC_fontsize_small;
        }

        > * {
            margin-top: 16px;
            &:nth-child(1) {
                margin-top: 0;
            }
        }

        .gnb__etc__enuma {
            display : inline-flex;
            flex-direction: column;
            margin-left: auto;
            opacity: $opacityEtc;

            .gnb__etc__enuma__copy {
                text-decoration: underline;
                font-family: 'Caveat', cursive;
                font-size: $SIZE_PC_fontsize_subtitle;
            }
        }

        .gnb__etc__sns {
            display: flex;
            justify-content: flex-end;

            .gnb__etc__sns__item {
                opacity: $opacityEtc;
                margin-left: 22px;
                > a {
                    display: inline-block;
                    i {
                        font-size: 28px;
                    }
                }
            }
        }

        .gnb__etc__copyright {
            font-weight: 300;
            opacity: $opacityEtc;
            letter-spacing: $SIZE_letterspacing_low;
        }

    }

}


</style>