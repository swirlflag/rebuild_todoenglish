<template>
    <div    ref="ref_root"
            class="nav-gnb"
            :class="{'st-openmenu' : isOpenMenu , 'dt-login' : isLogin}"
    >

        <div class="gnb__concise" ref="ref_concise">
            <router-link to="/" class="gnb__logo">
                <span class="icon icon--logoschool c-white"></span>
                <span class="typo--todoenglish"></span>
            </router-link>

            <div class="gnb__storage">
                <div class="gnb__emphasis">
                </div>
                <div class="gnb__user">user</div>

                <div class="testt" @click="TEST_tooglelogin">
                    auth
                </div>
                <div class="gnb__menu" @click="toggleMenu">MENU</div>
            </div>
        </div>

        <div class="gnb__pannel" ref="ref_pannel">

            <div class="gnb__pannel__block">
                <div class="gnb__public">
                    <span class="gnb__public__focus">focus</span>
                    <ul class="gnb__public__list">
                        <li class="gnb__public__item">
                            <router-link to="#">
                                <span class="gnb__public__number">01</span>
                                <span class="gnb__public__name">멤버십 후기</span>
                            </router-link>
                        </li>
                        <li class="gnb__public__item">
                            <router-link to="#">
                                <span class="gnb__public__number">02</span>
                                <span class="gnb__public__name">커리큘럼 안내</span>
                            </router-link>
                        </li>
                        <li class="gnb__public__item">
                            <router-link to="#">
                                <span class="gnb__public__number">03</span>
                                <span class="gnb__public__name">이용하기</span>
                            </router-link>
                        </li>
                        <li class="gnb__public__item">
                            <router-link to="#">
                                <span class="gnb__public__number">04</span>
                                <span class="gnb__public__name">도움말</span>
                            </router-link>
                        </li>
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

                    <ul class="gnb__private__list">
                        <li class="gnb__private__item">
                            <router-link to="#">계정 관리</router-link>
                        </li>
                        <li class="gnb__private__item">
                            <router-link to="#">학습 정보 열람</router-link>
                        </li>
                        <li class="gnb__private__item gnb__auth">
                            <router-link to="#" style="">
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
</template>

<script>

import gsap from 'gsap';

export default {
    data() {
        return {
            isOpenMenu : false,
            isLogin : false,

            navTL : new gsap.timeline(),
        }
    },
    watch: {
        'isOpenMenu'(now) {
            this.navTL.clear();
            if(now){
                this.openMenuMotion();
            }else {
                this.closeMenuMotion();
            }
        }
    },
    methods : {

        TEST_tooglelogin() {
            this.isLogin = !this.isLogin;
        },
        openMenuMotion() {
            const nav       = this.$refs.ref_root;
            const concise   = this.$refs.ref_concise;
            const pannel    = this.$refs.ref_pannel;
            const openHeight = concise.offsetHeight + pannel.offsetHeight;

            this.navTL.to(nav, {
                height: openHeight,
                ease: 'power2.inOut',
                duration: 0.75,
            });

        },
        closeMenuMotion() {
            const nav           = this.$refs.ref_root;
            const concise       = this.$refs.ref_concise;
            const closeHeight   = concise.offsetHeight;

            this.navTL.to(nav, {
                height: closeHeight,
                ease: 'power2.out',
                duration: 0.5,
            });
        },

        openMenu() {
            this.isOpenMenu = true;
        },
        closeMenu() {
            this.isOpenMenu = false;
        },
        toggleMenu() {
            if(this.isOpenMenu){
                this.closeMenu();
            }else {
                this.openMenu();
            }
        }
    }
}

</script>

<style lang="scss" scoped>

$navh : 68px;

.nav-gnb{
    background-color: $COLOR_navy_2;
    height : $navh;
    position: relative;
    width: 100%;
    will-change: height;
    @include hardSelect {
        color : #fff;
    }
}

.gnb__wrap {
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
            width: 90px;height: 100%;
            background-image: url('~@/assets/logo/logo_todoenglish_typo.svg');
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            transform : translate3d(0, 20px, 0);
            transition: opacity 200ms ease, transform 300ms $EASE_inCubic 200ms;
            .st-openmenu & {
                transition: opacity 200ms ease 250ms, transform 500ms $EASE_outBack 200ms;
                opacity: 1;
                transform : translate3d(0, 0, 0);
            }
        }
    }

    .gnb__storage {
        margin-left: auto;
        border: 1px solid #000;
        display :flex;

        .gnb__menu {
            background: #d3d;
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
            // border: 1px solid #acc;
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
                    }

                    .gnb__public__name {
                        @include publicFont;
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
                    visibility: hidden;
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
                        visibility: hidden;
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