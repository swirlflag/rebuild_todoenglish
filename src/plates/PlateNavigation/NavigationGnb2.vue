<template>
    <div    ref="ref_root"
            class="nav-gnb"
            :class="{'st-openmenu' : $store.state.$nav.is_openGnb , 'dt-login' : isLogin}"
    >

        <div class="gnb__dimmed" @click="closeMenu"></div>

            <div class="gnb__concise" ref="ref_concise">

                <div class="gnb__concise__wrap">
                    <router-link to="/" class="gnb__logo">
                        <i class="icon--logoschool c-white"></i>
                        <span class="typo--todoenglish"></span>
                    </router-link>

                    <div class="gnb__storage">
                        <ul class="gnb__emphasis">
                            <li class="gnb__emphasis__item">
                                <a>
                                    <div class="gnb__emphasis__badge" style="background-color : #F4B537">
                                        <i class="fas fa-hashtag"></i>
                                        멤버십 후기
                                    </div>
                                    <div class="gnb__emphasis__content">
                                        <div class="gnb__emphasis__source">
                                            <div class="image-box">
                                                <img src="@/assets/event/wp_worksheet.jpg" alt="">
                                            </div>
                                        </div>
                                        <p class="gnb__emphasis__title">
                                            토도영어 사용자들의 솔직 후기
                                        </p>
                                        <p class="gnb__emphasis__text">
                                            토도영어를 사용해본 아이들의 부모님이 직접 남기는 솔직한 후기들을 살펴보세요.
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li class="gnb__emphasis__item">
                                <a>
                                    <div class="gnb__emphasis__badge" style="background-color : #1F96DB">
                                        <i class="fas fa-external-link-alt"></i>
                                        방침 변경
                                    </div>
                                    <div class="gnb__emphasis__content">
                                        <div class="gnb__emphasis__source">
                                            <div class="image-box">
                                                <img src="@/assets/event/wp_worksheet.jpg" alt="">
                                            </div>
                                        </div>
                                        <p class="gnb__emphasis__title">
                                            토도영어의 방침이 변경됩니다.
                                        </p>
                                        <p class="gnb__emphasis__text">
                                            새롭게 변경되는 토도영어 방침을 자세하게 알려드려요.
                                        </p>
                                    </div>
                                </a>
                            </li>
                            <li class="gnb__emphasis__item">
                                <a>
                                    <div class="gnb__emphasis__badge" style="background-color : #F7419C">
                                        <i class="fas fa-external-link-alt"></i>
                                        토도라이브
                                    </div>
                                    <div class="gnb__emphasis__content">
                                        <div class="gnb__emphasis__source">
                                            <div class="image-box">
                                                <img src="@/assets/event/wp_worksheet.jpg" alt="">
                                            </div>
                                        </div>
                                        <p class="gnb__emphasis__title">
                                            토도라이브 런칭!
                                        </p>
                                        <p class="gnb__emphasis__text">
                                            토도영어와 찰떡궁합! 집에서 하는 즐거운 영어수업 토도라이브를 만나보세요.
                                        </p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <div class="gnb__user">
                            <span class="gnb__user__dot"></span>
                            <i class="icon--account c-white"></i>
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


            </div>


        <div class="gnb__panel" ref="ref_panel">
            <!-- <div class="gnb__concise" ref="ref_concise">
                <router-link to="/" class="gnb__logo">
                    <i class="icon--logoschool c-white"></i>
                    <span class="typo--todoenglish"></span>
                </router-link>

                <div class="gnb__storage">
                    <ul class="gnb__emphasis">
                        <li class="gnb__emphasis__item">
                            <a>
                                <div class="gnb__emphasis__badge" style="background-color : #F4B537">
                                    <i class="fas fa-hashtag"></i>
                                    멤버십 후기
                                </div>
                                <div class="gnb__emphasis__content">
                                    big
                                </div>
                            </a>
                        </li>
                        <li class="gnb__emphasis__item">
                            <a>
                                <div class="gnb__emphasis__badge" style="background-color : #1F96DB">
                                    <i class="fas fa-external-link-alt"></i>
                                    방침변경 안내
                                </div>
                                <div class="gnb__emphasis__content">
                                    big
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div class="gnb__user">
                        <span class="gnb__user__dot"></span>
                        <i class="icon--account c-white"></i>
                    </div>
                    <button class="gnb__menu" @click="toggleMenu">
                        <div class="gnb__menu__icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                </div>
            </div> -->

            <div class="gnb__panel__wrap" ref="ref_panelwrap">

                <div class="gnb__panel__block">
                    <div class="gnb__public">
                        <span class="gnb__public__focus">focus</span>
                        <ul class="gnb__public__list" ref="ref_public">

                            <template v-for="(item,idx) in gnbData.public">
                                <li :key="idx" class="gnb__public__item">
                                    <router-link :to="item.to">
                                        <span class="gnb__public__prefix">
                                            <span class="gnb__public__prefix-number">0{{ idx+1}}</span>
                                            <span class="gnb__nowbadge">now</span>
                                        </span>
                                        <span class="gnb__public__name">
                                            <span>{{ item.name }}</span>
                                        </span>
                                    </router-link>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>

                <div class="gnb__panel__block">
                    <div    class="gnb__private"
                    >

                        <div    class="gnb__private__title"
                        >
                            <i class="icon--lock"></i>
                            {{
                                isLogin ? `${$store.state.$user.username}님, 안녕하세요!` : '로그인이 필요합니다'
                            }}
                        </div>

                        <ul class="gnb__private__list" ref="ref_private">

                            <template v-for="(item,idx) in gnbData.private">
                                <li :key="idx" class="gnb__private__item">
                                    <router-link :to="item.to" class="gnb__private__item__target">
                                        <span class="gnb__nowbadge">now</span>
                                        <span class="gnb__private__name">{{ item.name }}</span>
                                    </router-link>
                                </li>
                            </template>

                            <li class="gnb__private__item gnb__auth"
                                @click="openAuthPanel"
                            >
                                <button class="gnb__private__item__target">
                                    <i class="icon--key"></i>
                                    <span class="gnb__private__name">
                                        {{ isLogin ? '로그아웃' : '로그인' }}
                                    </span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div class="gnb__banner">
                        <a class="gnb__banner__link" href="#">
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
                        </a>
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

            navTL : new this.gsap.timeline(),

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
        '$route.path'() {
            this.$store.dispatch('closeGnb');
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
            // const concise   = this.$refs.ref_concise;
            const panel    = this.$refs.ref_panel;
            const panelWrap    = this.$refs.ref_panelwrap;

            const openHeight = panelWrap.offsetHeight;

            this.navTL.to(panel, {
                height: openHeight,
                ease: 'power3.out',
                duration: 0.7,
            });

        },
        closeMenuMotion() {
            const panel          = this.$refs.ref_panel;
            // const concise       = this.$refs.ref_concise;
            // const closeHeight   = concise.offsetHeight;

            this.navTL.to(panel, {
                height: 0,
                ease: 'power4.out',
                duration: 0.6,
            });
        },

        openAuthPanel() {
            this.$store.dispatch('openAuthPanel');
            this.$store.dispatch('closeGnb');
        },

        openMenu() {
            this.$store.dispatch('openGnb');
        },
        closeMenu() {
            this.$store.dispatch('closeGnb');
        },

        toggleMenu() {
            if(this.$store.state.$nav.is_openGnb){
                this.$store.dispatch('closeGnb');
            }else {
                this.$store.dispatch('openGnb');
            }
        },

        selectElement() {
            this.publicList    = this.$refs.ref_public.querySelectorAll('li');
            this.privateList   = this.$refs.ref_private.querySelectorAll('li');
        },
    },

    mounted(){
        this.selectElement();
        this.closeMenu()
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
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.15);
    @include hardSelect {
        color : #fff;
    }
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

.gnb__concise {
    background-color: $COLOR_navy_2;
    position: relative;
    z-index: 20;
}

.gnb__concise__wrap {
    display: flex;
    position: relative;
    max-width : $SIZE_PC_contentWidth;
    padding: 0 $SIZE_PC_innerPadding ;
    margin: 0 auto;
    box-sizing: border-box;
    height: $navh ;
    transition: transform 500ms $EASE_outQuart;

    @include phone {
        max-width : $SIZE_MO_contentWidth;
        width: 100%;
        padding: 0 $SIZE_MO_innerPadding;
    }

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
            transform-origin : left;
            .st-openmenu & {
                transform:scale(1.5);
                transition-delay: 220ms;
            }
        }
        .typo--todoenglish {
            opacity: 0;
            position: absolute;
            top: 4px; left: 100%;
            margin-left: 40px;
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

        .gnb__emphasis {
            display: flex;
            align-items: center;
            margin-right: 20px;

            @include phone {
                display: none;
            }

            .gnb__emphasis__item {
                margin-left: 12px;
                &:nth-child(1) {
                    margin-left: 0;
                }

                > a {
                    width: 100%; height: 100%;
                    display: inline-block;
                    position: relative;
                    cursor : pointer;

                    .gnb__emphasis__badge {
                        padding: 8px 12px;
                        background: #ccc;
                        border-radius: 9999px;
                        line-height: 1em;
                        font-size: $SIZE_PC_fontsize_small;
                        font-weight: 700;
                    }

                    .gnb__emphasis__content {
                        border: 1px solid #ddd;
                        position: absolute;
                        top: calc(100% + 20px); left: 0;
                        background: #fff;
                        padding: 16px;
                        // width: 300px;
                        border-radius: 16px;
                        width: 200px;
                        color: $COLOR_navy_1;
                        box-shadow: 0 3px 8px 0 rgba(0,0,0,0.2);
                        transform : translate3d(0,0,0);
                        opacity: 0;
                        pointer-events: none !important;
                        transition: opacity 100ms ease, transform 200ms $EASE_outCubic;
                        transform : translate3d(0,-10px,0);

                        &::before {
                            content: '';
                            position: absolute;
                            top: -3px; left: 0;
                            width: 20px; height: 20px;
                            background: #fff;
                            box-sizing: border-box;
                            transform :rotate(45deg) translateY(-50%);
                            border-left: 1px solid #ddd;
                            border-top: 1px solid #ddd;
                            left: 25px;
                        }

                        > * {
                            margin-top: 16px;
                            &:nth-child(1) {margin-top: 0}
                        }


                        .gnb__emphasis__source {
                            min-height: 50px;
                            border-radius: 10px;
                            overflow:hidden;
                        }
                        .gnb__emphasis__title {
                            font-weight: 700;
                            font-size: $SIZE_PC_fontsize_strong ;
                            padding-right: 20%;
                        }
                        .gnb__emphasis__text {
                            font-size: $SIZE_PC_fontsize_small;
                        }

                    }

                    @include hover {
                        .gnb__emphasis__content {
                            opacity: 1;
                            transform : translate3d(0,0,0);
                            transition: opacity 220ms ease, transform 200ms $EASE_outExpo;
                        }
                    }
                }
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















.gnb__nowbadge {
    font-size: 16px;
    background-color: $COLOR_pink_1;
    padding: 0px;
    border-radius: 4px;
    display : none;
    line-height: 1em;
    padding: 0 4px 4px 4px;
    // color: $COLOR_pink_1;
    font-weight: 700;

    .router-link-active & {
        display: inline-block;
    }
}

.gnb__panel {
    overflow: hidden;
    background-color: $COLOR_navy_2;
    // height : $navh;
    // height: 100%;
    // height: auto;
    height: 0;
    position: relative;
    width: 100%;
    will-change: height;
    z-index: 10;
    
}

.gnb__panel__wrap {
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

    transform : translate3d(0,80px,0);
    transition: transform 0ms ease 500ms;

    .st-openmenu & {
        transition: transform 800ms $EASE_outExpo 0ms;
        transform : translate3d(0,0,0);
        pointer-events: all !important;
    }

    > .gnb__panel__block{
        box-sizing: border-box;
        display : flex;
        flex-direction: column;
        width: 50%;
        max-width: 380px;
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

                .st-openmenu & {
                    @for $i from 0 through 10 {
                        $delay : #{$i * 70ms};
                        &:nth-child(#{$i}) {
                            .gnb__public__name ,
                            .gnb__public__prefix{
                                opacity: 1;
                                transform: translate3d(0,0,0);
                                transition: transform 800ms $EASE_outExpo $delay, opacity 350ms ease $delay;
                            }
                        }
                    }
                }

                > a {
                    width: auto; height: 100%;
                    box-sizing: border-box;
                    display: inline-flex;
                    position: relative;
                    // padding: 5px 10px 5px 0;

                    .gnb__public__prefix {
                        display: inline-block;
                        writing-mode: vertical-rl;
                        text-align: center;
                        margin-right: 14px;
                        font-weight: 300;
                        letter-spacing: 0;
                        color: rgba(255,255,255,0.6);
                        transition: transform 450ms $EASE_inCubic 0ms, opacity 350ms ease 0ms;
                        transform: translate3d(0,20px,0);
                        opacity: 0;
                        line-height : 1em;

                        .gnb__nowbadge {
                            padding: 4px 0 4px 4px;
                            transform: translateX(-15%);
                        }
                        .gnb__public__prefix-number{
                            display: inline-block;
                        }
                    }

                    .gnb__public__name {
                        box-sizing: border-box;
                        @include publicFont;
                        transition: transform 450ms $EASE_inCubic 0ms, opacity 350ms ease 0ms;
                        transform: translate3d(30px,0,0);
                        opacity: 0;
                        position: relative;

                        &::before {
                            content: '';
                            position: absolute;
                            display: inline-block;
                            width: 100%; height: 0.1em;
                            left: 0;bottom: 0;
                            background-color: rgba(255,255,255,1);
                            transition : transform 200ms $EASE_inOutCubic;
                            transform-origin : left;
                            transform : scaleX(0);
                        }
                    }

                    @include hover {
                        .gnb__public__name {
                            &::before {
                                transform : scaleX(1);
                                transition : transform 300ms $EASE_outExpo;
                            }
                        }
                    }

                    &.router-link-active {

                        pointer-events: none;
                        .gnb__public__prefix{
                            font-weight: 700;
                            color: rgba(255,255,255,1);
                        }
                        .gnb__public__prefix-number{
                            display: none;
                        }
                        .gnb__public__name {
                            > span {
                                display: inline-block;
                                opacity: 0.4 !important;
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

        @keyframes swingLock {
            0% {transform : rotate(0);}
            20% {transform : rotate(8deg);}
            40% {transform : rotate(-8deg);}
            60% {transform : rotate(8deg);}
            80%,
            100% {transform : rotate(0);}
        }

        @keyframes floatKey{
            0% {
                animation-timing-function: $EASE_inCubic;
                transform : translate3d(0,0,0);
            }
            40% {transform : translate3d(8px,0,0);}
            80%,
            100% {transform : translate3d(0,0,0);}
        }
        @include hover {
            .icon--lock {
                animation : swingLock 1000ms $EASE_outCubic infinite;
            }
            .icon--key {
                animation: floatKey 1000ms $EASE_outCubic infinite;
            }
        }

        i {
            margin-right: 14px;
        }

        .gnb__private__title {
            font-size: $SIZE_PC_fontsize_large;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            transition: transform 450ms $EASE_inCubic 0ms, opacity 350ms ease 0ms;
            opacity: 0;
            transform : translate3d(-20px,0,0);

            .st-openmenu & {
                transition : transform 800ms $EASE_outExpo, opacity 350ms ease;
                opacity: 1;
                transform : translate3d(0,0,0);
            }

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
                transform : scaleX(0);
                opacity: 0;
                transition : transform 600ms $EASE_outCubic 300ms , opacity 300ms ease;
                transform-origin : right;
                .st-openmenu & {
                    opacity: 1;
                    transform : scaleX(1);
                }
            }
            &::before {
                top: 0;
                .st-openmenu & {
                    transition : transform 800ms $EASE_outExpo 0ms, opacity 700ms ease;
                }
            }
            &::after {
                bottom: 0;
                .st-openmenu & {
                    transition : transform 950ms $EASE_outExpo 140ms, opacity 700ms ease 140ms;
                }
            }

            .gnb__private__item {
                pointer-events: none;
                transform: translate3d(-20px,0,0);
                transition: transform 450ms $EASE_inCubic 0ms, opacity 350ms ease 0ms;
                opacity: 0;
                margin-top: 26px;
                &:nth-child(1) {
                    margin-top: 0;
                }

                .st-openmenu & {
                    @for $i from 1 through 10 {
                        $delay : #{$i * 50ms + 50ms};
                        &:nth-child(#{$i}) {
                            transform: translate3d(0,0,0);
                            transition: transform 800ms $EASE_outExpo $delay, opacity 350ms ease $delay;
                            opacity: 1;
                        }
                    }
                }


                .gnb__private__item__target {
                    opacity: 0.4;
                    display :inline-flex;
                    justify-content: flex-end;
                    align-items: center;
                    font-weight: 700;
                    font-size: $SIZE_PC_fontsize_subtitle;

                    .gnb__nowbadge {
                        margin-right: 10px;
                    }

                    .gnb__private__name {
                        box-sizing: border-box;
                        // transition: transform 450ms $EASE_inCubic 0ms, opacity 350ms ease 0ms;
                        // transform: translate3d(30px,0,0);
                        // opacity: 0;
                        position: relative;

                        &::before {
                            content: '';
                            position: absolute;
                            display: inline-block;
                            width: 100%; height: 0.1em;
                            left: 0;bottom: 0;
                            background-color: rgba(255,255,255,1);
                            transition : transform 200ms $EASE_inOutCubic;
                            transform-origin : right;
                            transform : scaleX(0);
                        }
                    }

                    @include hover {
                        .gnb__private__name::before {
                            transform : scaleX(1);
                            transition : transform 300ms $EASE_outExpo;
                        }
                    }

                    &.router-link-active {
                        pointer-events: none !important;
                        .dt-login & .gnb__private__name {
                            opacity: 0.4;
                        }
                    }

                }

                .dt-login & .gnb__private__item__target,
                &.gnb__auth .gnb__private__item__target{
                    pointer-events: all;
                    opacity: 1;
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

        .gnb__banner__link {
            width: 100%; height: 100%;
            padding: 26px 30px;
            border-radius: 16px;
            position: relative;
            background-color: #F5FAFF;
            background: linear-gradient(129deg, rgba(245,250,255,1) 0%, rgba(251,245,255,1) 100%);
            // background: linear-gradient(129deg, rgba(245,250,255,1) 0%, rgba(245,255,247,1) 100%);
            display: inline-block;
            transition: transform 800ms $EASE_outExpo 500ms, opacity 500ms ease 0ms;
            transform : translate3d(0,50px,0);
            opacity: 0;

            .st-openmenu & {
                opacity: 1;
                transition: transform 800ms $EASE_outExpo 200ms, opacity 300ms ease 200ms;
                transform : translate3d(0,0,0);
            }

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
                    transform : scale(0);
                    transition: transform 230ms $EASE_outBack 350ms;

                    .st-openmenu & {
                        transform : scale(1);
                    }
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

    }


    $opacityEtc : 0.5;
    .gnb__etc {
        margin-top: 52px;
        display: flex;
        flex-direction: column;
        text-align: right;

        transform : translate3d(0,30px,0);
        opacity: 0;
        transition: transform 800ms $EASE_outExpo 320ms, opacity 250ms ease 320ms;
        .st-openmenu & {
            opacity: 1;
            transform : translate3d(0,0,0);
        }

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
            transition: opacity 400ms ease;

            @include hover {
                opacity: 1;
            }

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
                transition: opacity 120ms ease;
                @include hover {
                    opacity: 1;
                }
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