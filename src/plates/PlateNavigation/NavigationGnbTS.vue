<template>
    <div    ref="ref_root"
            class="nav-gnb"
            :class="{'st-open' : isOpen , 'dt-login' : isLogin}"
    >

        <div class="gnb__dimmed" @click="closeMenu"></div>

        <div class="gnb__content" ref="ref_content">
            <div class="gnb__concise" ref="ref_concise">

                <div class="gnb__concise__wrap">
                    <router-link to="/" class="gnb__logo">
                        <i class="icon--logoschool c-white"></i>
                        <span class="typo--todoschool">
                            <strong>Todo School</strong>
                            <span>토도 스쿨</span>
                        </span>
                    </router-link>

                    <div class="gnb__minimal">
                        <ul class="gnb__minimal__list">
                            <template v-for="(item,idx) in gnbData.products">
                                <li class="gnb__minimal__item" :key="idx">
                                    <router-link :to="item.to">
                                        {{ item.name }}
                                    </router-link>
                                </li>
                            </template>
                        </ul>
                    </div>

                    <div class="gnb__storage">
                        <div class="gnb__user">
                            <span class="gnb__user__dot"></span>
                            <i  class="icon--account "
                                :class="{'c-white' : isOpen}"
                            >
                            </i>
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

                <div class="gnb__panel__wrap" ref="ref_panelwrap">

                    <div class="gnb__panel__block">
                        <div class="gnb__product">
                            <!-- <div class="gnb__panel__title">
                                토도스쿨의 제품을 만나보세요.
                            </div> -->
                            <ul class="gnb__product__list" ref="ref_public">

                                <template v-for="(item,idx) in gnbData.products">
                                    <li :key="idx" class="gnb__product__item">
                                        <router-link :to="item.to">
                                            <span class="gnb__product__prefix">
                                                <span class="gnb__product__prefix-number">0{{ idx+1}}</span>
                                                <span class="gnb__nowbadge">now</span>
                                            </span>
                                            <span class="gnb__product__name">
                                                <span>{{ item.name }}</span>
                                            </span>
                                        </router-link>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </div>

                    <div class="gnb__panel__block">


                        <div class="gnb__product">
                            <!-- <div class="gnb__panel__title">
                                도움이 필요하신가요?
                            </div> -->
                            <ul class="gnb__product__list" ref="ref_public">

                                <template v-for="(item,idx) in gnbData.public">
                                    <li :key="idx" class="gnb__product__item">
                                        <router-link :to="item.to">
                                            <span class="gnb__product__prefix">
                                                <span class="gnb__product__prefix-number">0{{ gnbData.products.length + idx+1}}</span>
                                                <span class="gnb__nowbadge">now</span>
                                            </span>
                                            <span class="gnb__product__name">
                                                <span>{{ item.name }}</span>
                                            </span>
                                        </router-link>
                                    </li>
                                </template>
                            </ul>
                        </div>
                        <!-- <div class="gnb__banner">
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
                        </div> -->
                    </div>

                    <div class="gnb__panel__block">
                        <div    class="gnb__private">

                            <div    class="gnb__panel__title"
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

                        <!-- <div class="gnb__banner">
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
                        </div> -->


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


    </div>
</template>

<script>

export default {
    data() {
        return {

            gnbData  : {
                products : [
                    {
                        name : '토도영어',
                        to : '/english',
                    },
                    {
                        name : '토도한글',
                        to : '/hangul',
                    },
                    {
                        name : '토도수학',
                        to : '/math',
                    },
                    {
                        name : '토도라이브',
                        to : '/live',
                    },

                ],

                public : [
                    {
                        name : '구독하기',
                        to : '/subscribe'
                    },
                    {
                        name : '고객 센터',
                        to : '/help'
                    },
                ],

                private : [
                    {
                        name : '학습 정보',
                        to : '/study'
                    },
                    {
                        name : '계정 관리',
                        to : '/account'
                    },
                ],
            },

            navTL : new this.$gsap.timeline(),

            publicList  : null,
            privateList : null,
        }
    },
    computed : {
        isLogin () {
            return this.$store.state.$user.is_login
        },
        isOpen() {
            return this.$store.state.$nav.is_openGnb;
        },
    },
    watch: {
        '$route.path'() {
            this.$store.dispatch('closeGnb');
        },
        'isOpen'(now) {
            if(now){
                this.openMenuMotion();
            }else {
                this.closeMenuMotion();
            }
        },
    },
    methods : {
        openMenuMotion() {
            this.navTL.clear();
            const panelWrap    = this.$refs.ref_panelwrap;
            let openHeight = panelWrap.offsetHeight > window.innerHeight ? window.innerHeight : panelWrap.offsetHeight;
            if(this.$screen.isMobileSize){
                openHeight = this.$screen.height;
            }

            this.navTL.to(this.$refs.ref_panel, {
                height: openHeight,
                ease: 'power3.out',
                duration: 0.7,
            });
        },

        closeMenuMotion() {
            this.navTL.clear();
            this.navTL.to(this.$refs.ref_panel, {
                height: this.$refs.ref_concise.offsetHeight,
                ease: 'power4.out',
                duration: 0.6,
                onComplete : () => {
                    this.$refs.ref_panel.scrollTo(0,0);
                },
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

        windowResize() {
            if(this.isOpen){
                console.log(this.isOpen);
                this.openMenuMotion();
            }
        },

        bindWindowResize() {
            window.addEventListener('resize' , this.windowResize);
        },
        unbindWindowResize() {
            window.removeEventListener('resize' , this.windowResize);
        },
    },

    mounted(){
        this.selectElement();
        this.closeMenu();
        this.bindWindowResize();
    },
    beforeDestroy() {
        this.unbindWindowResize();
    },
}

export const gnbStoreTS = {

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
        openGnb(context) {
            // if(!context.state.$nav.is_openGnb){
                context.commit('GNB_open');
            // }
        },
        closeGnb(context) {
            if(context.state.$nav.is_openGnb){
                context.commit('GNB_close');
            }
        }
    },

}

</script>

<style lang="scss" scoped>

$PC_navh : 60px;
$MO_navh : 60px;

@include phone {
    $PC_navh : 40px;
}


@mixin backdropBlur() {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    backface-visibility: hidden;
    will-change: transform;
    translateZ: 0px
}

@mixin hoverUnderline($color:#fff){
    position: relative;
    box-sizing: border-box;

    &::before {
        content: '';
        position: absolute;
        display: inline-block;
        width: 100%; height: 0.1em;
        left: 0;bottom: 0;
        background-color: rgba(255,255,255,1);
        background-color: $color;
        transition : transform 200ms $EASE_inOutCubic;
        transform : scaleX(0);
        transform-origin : center;
    }

    @include hover {
        &::before {
            transform : scaleX(1);
            transition : transform 300ms $EASE_outExpo;
        }
    }
}

@mixin hoverUnderlineLeft($color:#fff){
    @include hoverUnderline($color);
    &::before {transform-origin : left;}
}

@mixin hoverUnderlineRight($color:#fff){
    @include hoverUnderline($color);
    &::before {transform-origin : right;}
}


.nav-gnb{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    &.st-open {
        height: 100%;
    }
    
}

.gnb__dimmed {
    width: 100%; height: 100%;
    position: absolute;
    top: 0; left: 0;
    background-color: rgba(0,0,0,0.4);
    z-index: 1;
    transition : opacity 600ms ease;
    opacity: 0;
    pointer-events: none;
    .st-open & {
        opacity: 1;
        pointer-events: all;
    }
}

.gnb__content {

    box-sizing: border-box;
    min-height: $PC_navh;
    width: 100%;
    height: auto;
    height: 100%;
    position: relative;
    z-index: 2;
    // max-height: 100vh;
    max-height: 100%;
    box-sizing: border-box;
    // overflow: scroll;
    overflow: hidden;
    pointer-events: none;

    // box-shadow: 0 3px 5px rgba(0,0,0,0.1);
    border-bottom: 1px solid rgba(0,0,0,0.05);

    @include phone {
        min-height : $MO_navh
    }


    .st-open & {
        transition: background-color 600ms ease 0ms;
        // background-color: rgba(35,35,35,0.85);
        box-shadow: none;
    }

    // @include backdropBlur;
}

.gnb__concise {
    display: block;
    position: absolute;
    width: 100%;
    z-index: 20;
    pointer-events: all;
    // margin-bottom: -$PC_navh;
}

.gnb__concise__wrap {
    display: flex;
    position: relative;
    max-width : $SIZE_PC_contentWidth;
    max-width: unset !important;

    padding: 0 $SIZE_PC_innerPadding ;
    margin: 0 auto;
    box-sizing: border-box;
    height: $PC_navh ;
    transition: transform 500ms $EASE_outQuart;

    @include overPhone {
        .st-open & {
            transform : translate3d(0,50%,0);
        }
    }

    @include phone {
        max-width : $SIZE_MO_contentWidth;
        width: 100%;
        padding: 0 $SIZE_MO_innerPadding*1.25;
        height: $MO_navh;
    }

    .gnb__logo {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        will-change: filter;
        transition: filter 300ms ease;

        // filter : grayscale(1) brightness(3);
        filter : grayscale(1) brightness(0);
        transition-delay: 170ms;
        .st-open & {
            transition-delay: 0;
            filter : grayscale(0) brightness(1);
        }

        .icon--logoschool {
            width: 34px ; height: 34px;
            transition : transform 300ms $EASE_outBack2;
            transform-origin : left;
            .st-open & {
                @include overPhone {
                    transform:scale(1.5);
                    transition-delay: 220ms;
                }
            }
        }
        .typo--todoschool {
            opacity: 0;
            color: #fff;
            // border: 1px solid #000;
            position: absolute;
            top: 4px; left: 100%;
            margin-left: 40px;
            pointer-events: none;
            // width: 90px; height: 100%;
            width: auto;
            white-space: nowrap;
            height: 100%;
            display: flex;
            flex-direction: column;
            // align-items: center;
            justify-content: center;
            // letter-spacing: 0.05em;
            line-height: 1.2;
            // background-image: url('~@/assets/logo/logo_todoenglish_typo.svg');
            // background-size: contain;
            // background-position: center;
            // background-repeat: no-repeat;
            transform : translate3d(0, 20px, 0);
            transition: opacity 200ms ease, transform 300ms $EASE_inCubic 200ms;

            .st-open & {
                pointer-events: all;
                transition: opacity 200ms ease 250ms, transform 500ms $EASE_outBack 200ms;
                opacity: 1;
                transform : translate3d(0, 0, 0);
            }
            strong {
                font-size: 26px;
                font-weight: 700;
            }
            span {
                font-size: 16px;
                font-weight: 400;
                opacity: 0.8;
            }

            @include phone {
                display: none;
            }
        }
    }

    .gnb__minimal {
        justify-self: center;
        align-self: center;
        position: absolute;
        height: 100%;
        top: 0; left: 0;
        left: 50%;

        transform : translateX(-50%);
        display:flex;
        align-items: center;
        font-weight: 700;

        transition:  opacity 250ms $EASE_outExpo 200ms;
        opacity: 1;

        .st-open & {
            transition-delay: 0ms;
            opacity: 0;
            pointer-events: none;
            user-select: none;
        }

        @include phone {
            display: none;
        }

        .gnb__minimal__list {
            display: flex;
            align-items: center;
        }

        .gnb__minimal__item {
            display: flex;
            align-items: center;
            &::before {
                content: '';
                display: inline-block;
                width: 1px; height: 9px;
                flex : 0 0 1px;
                border-radius: 9999px;
                // background-color: rgba(255,255,255,0.5);
                background: #000;
                margin: 0 17px;
            }

            &:nth-child(1)::before {
                display: none !important;
            }
            a {
                display: inline-block;
                width: 100%; height: 100%;
                color: #000;
                padding: 0 2px;
                border-radius: 4px;

                &.router-link-active {
                    background: #333;
                    color: #fff;
                }

                @include hoverUnderline(#000);
            }
        }
    }

    .gnb__storage {
        margin-left: auto;
        display :flex;
        align-items: center;

        > * {
            margin-left: 24px;
            @include phone {
                margin-left: 12px;
            }
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
                width: 6px; height: 6px;
                border-radius: 9999px;
                margin-right: 12px;

                background-color: rgba(100,100,100,0.4);

                .st-open & {
                    background-color: rgba(255,255,255,0.4);
                }

                .dt-login &{
                    background-color: rgb(61, 204, 32);
                }

                .st-open.dt-login & {
                    background-color: rgba(255,255,255,1);
                    box-shadow: 0 0 5px 2px rgba(5,255,0,0.8);
                }
            }

            .icon--account {
                transition: background-image 200ms ease;
            }

        }

        .gnb__menu {
            cursor: pointer;
            position: relative;
            border-radius: 8px;
            padding: 6px;
            margin-right: -6px;
            transition : background-color 300ms ease , border 300ms ease;
            border: 1px solid transparent;

            @include hover {
                background-color : rgba(0,0,0,0.2);
            }
            .st-open & {
                @include hover {
                    background-color: rgba(255,255,255,0.2);
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

                .st-open & {
                    transform: scale(1.26);
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
                        background-color: #000;
                        width: 100%; height: 100%;
                        transition: transform 500ms $EASE_outExpo, background-color 150ms ease 0ms;
                        border-radius: 9999px;

                        .st-open & {
                            background-color: #fff;
                        }
                    }

                    &::before , &:nth-child(2)::after{
                        @include menuline;
                    }

                    &:nth-child(1)::before{ transition: transform 500ms $EASE_outExpo 250ms, background-color 150ms ease 0ms; }
                    &:nth-child(3)::before{ transition: transform 500ms $EASE_outExpo 350ms, background-color 150ms ease 0ms; }

                    .st-open & {
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
    padding: 2px 4px 3px 4px;
    // color: $COLOR_pink_1;
    font-weight: 700;

    .router-link-active & {
        display: inline-block;
    }
}

.gnb__panel {
    // @include backdropBlur;
    // overflow: hidden;
    // height : $PC_navh;
    // height: 100%;
    // height: auto;
    position: relative;
    // position: absolute; top: 0; left: 0;
    // height: 0;

    @include hideScrollbar ;
    overflow: scroll;
    max-height: 100%;
    height: 0;
    width: 100%;
    will-change: height;
    z-index: 10;
    pointer-events: none;
    box-sizing: border-box;

    background-color: rgba(255,255,255,0.8);
    transition: background-color 300ms ease 200ms;

    .st-open & {
        transition: background-color 600ms ease 0ms;
        background-color: rgba(35,35,35,0.85);
        pointer-events: all;
    }

    @include phone {
        // height: 100% !important;
    }

    @include hardSelect {
        color : #fff;
    }
}

.gnb__panel__wrap {
    max-width : $SIZE_PC_contentWidth;
    // padding: #{$SIZE_PC_innerPadding*3} $SIZE_PC_innerPadding ;
    padding: 0 $SIZE_PC_innerPadding ;

    margin: 0 auto;
    width: 100%;
    position: relative;
    display :flex;
    flex-direction: row;
    justify-content: space-between;
    justify-content: flex-end;
    box-sizing: border-box;
    pointer-events: none;
    // visibility: hidden;

    transform : translate3d(0,80px,0);
    transition: transform 0ms ease 500ms;

    .st-open & {
        transition: transform 800ms $EASE_outExpo 0ms;
        transform : translate3d(0,0,0);
        pointer-events: all !important;
        // visibility: visible;
    }

    @include phone {
        flex-direction: column;
        max-width : $SIZE_MO_contentWidth;
        margin-top: 100px;
        margin-bottom: 100px;
        padding: 0 $SIZE_MO_innerPadding ;
    }

    > .gnb__panel__block{
        // border: 1px solid #fff;
        border-left: 1px solid rgba(255,255,255,0.1);
        box-sizing: border-box;
        display : flex;
        flex-direction: column;
        width: 50%;
        width: 100%;
        max-width: 380px;
        max-width: 300px;
        margin-left: $SIZE_PC_innerPadding;
        margin-left: 10px;
        padding: #{$SIZE_PC_innerPadding*3 + $PC_navh} 0 #{$SIZE_PC_innerPadding*3};

        &:nth-child(1) {
            margin-left: 0;
        }
        &:last-child {
            border-left: transparent;
        }
        @include phone {
            border: none;
            max-width: 100%;
            padding: 0;
            margin-left: 0;
        }

        .gnb__panel__title {
            font-size: $SIZE_PC_fontsize_large;
            font-size: $SIZE_PC_fontsize_strong ;
            font-weight: 700;
            display: flex;
            align-items: center;
            // justify-content: flex-end;
            transition: transform 450ms $EASE_inCubic 0ms, opacity 350ms ease 0ms;
            opacity: 0;
            transform : translate3d(-20px,0,0);
            margin-bottom: 26px;

            .st-open & {
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
    }

    @mixin publicFont {
        $sizeGnbPublic : 40px;
        // font-size: $SIZE_PC_fontsize_title;
        font-size: $sizeGnbPublic;
        font-weight: 700;

        @include phone {
            font-size: $SIZE_MO_fontsize_title ;
        }
    }

    .gnb__product {
        position: relative;
        width: 100%;

        > p {
            font-size: 20px;
            // margin-bottom: 10px;
            margin-bottom: 34px;
        }

        .gnb__product__list {

            display: flex;
            flex-direction: column;

            .gnb__product__item {
                // margin-top: 34px;
                // margin-top: 20px;
                margin-bottom: 20px;
                &:nth-child(1) {margin-top: 0}

                .st-open & {
                    @for $i from 0 through 100 {
                        $delay : #{$i * 70ms};
                        &:nth-child(#{$i}) {
                            .gnb__product__name ,
                            .gnb__product__prefix{
                                opacity: 1;
                                transform: translate3d(0,0,0);
                                transition: transform 800ms $EASE_outExpo, opacity 350ms ease ;

                                @include overPhone {
                                    transition-delay : $delay;
                                }
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

                    .gnb__product__prefix {
                        display: inline-block;
                        writing-mode: vertical-rl;
                        text-align: center;
                        margin-right: 12px;
                        font-weight: 300;
                        letter-spacing: 0;
                        color: rgba(255,255,255,0.6);
                        transition: transform 450ms $EASE_inCubic 0ms, opacity 350ms ease 0ms;
                        opacity: 0;
                        line-height : 1em;

                        display: flex;

                        justify-content: center;
                        align-items: center;
                        width: 22px;
                        flex : 0 0 22px;
                        transform: translate3d(0,20px,0);
                        @include overPhone {
                            // width: 22px;
                            // flex : 0 0 22px;
                            // transform: translate3d(0,20px,0);
                        }

                        @include phone {

                        }

                        .gnb__nowbadge {
                            padding: 4px 2px 4px 3px;
                            transform: translateX(-5%);
                        }
                        .gnb__product__prefix-number{
                            display: inline-block;
                        }
                    }

                    .gnb__product__name {
                        box-sizing: border-box;
                        @include publicFont;
                        transition: transform 450ms $EASE_inCubic 0ms, opacity 350ms ease 0ms;

                        @include overPhone {
                            transform: translate3d(30px,0,0);
                        }
                        opacity: 0;
                        position: relative;

                        @include hoverUnderlineLeft();

                    }


                    &.router-link-active {

                        pointer-events: none;
                        .gnb__product__prefix{
                            font-weight: 700;
                            color: rgba(255,255,255,1);
                        }
                        .gnb__product__prefix-number{
                            display: none;
                        }
                        .gnb__product__name {
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

    .gnb__private {

        text-align: right;

        @include hover {
            .icon--lock {animation : swingLock 1000ms $EASE_outCubic infinite;}
            .icon--key {animation: floatKey 1000ms $EASE_outCubic infinite;}
        }

        @include phone {
            text-align: left;
            margin-top: 30px;
        }
        i {
            margin-right: 14px;
        }
        .gnb__panel__title {
            justify-content: flex-end;
            @include phone {
                justify-content: flex-start;
            }
        }

        .gnb__private__list {
            padding: 22px 0 ;

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
                .st-open & {
                    opacity: 1;
                    transform : scaleX(1);
                }
            }
            &::before {
                top: 0;
                .st-open & {
                    transition : transform 800ms $EASE_outExpo 0ms, opacity 700ms ease;
                }
            }
            &::after {
                bottom: 0;
                .st-open & {
                    transition : transform 950ms $EASE_outExpo 140ms, opacity 700ms ease 140ms;
                }
            }

            .gnb__private__item {
                pointer-events: none;
                transform: translate3d(-20px,0,0);
                transition: transform 450ms $EASE_inCubic 0ms, opacity 350ms ease 0ms;
                opacity: 0;
                margin-top: 26px;
                margin-top: 22px;
                &:nth-child(1) {
                    margin-top: 0;
                }

                .st-open & {
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
                    &.router-link-active {
                        pointer-events: none !important;
                        .dt-login & .gnb__private__name {
                            opacity: 0.4;
                        }
                    }

                    @include phone {
                        font-size: $SIZE_MO_fontsize_large;
                    }

                    .gnb__nowbadge {
                        margin-right: 10px;
                    }

                    .gnb__private__name {
                        @include hoverUnderlineRight;
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
        // display: none !important;

        margin-top: 52px;

        .gnb__banner__link {
            width: 100%; height: 100%;
            padding: 26px 30px;
            padding: 20px 16px;
            border-radius: 16px;
            position: relative;
            background-color: #F5FAFF;
            background: linear-gradient(129deg, rgba(245,250,255,1) 0%, rgba(251,245,255,1) 100%);
            // background: linear-gradient(129deg, rgba(245,250,255,1) 0%, rgba(245,255,247,1) 100%);
            display: inline-block;
            transition: transform 800ms $EASE_outExpo 500ms, opacity 500ms ease 0ms;
            transform : translate3d(0,50px,0);
            opacity: 0;

            .st-open & {
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
                    font-size: $SIZE_PC_fontsize_small;
                    padding: 3px 15px 5px;
                    border-radius: 9999px;
                    box-sizing: border-box;
                    font-weight: 700;
                    color: #fff;
                    background-color: #F4B537;
                    transform : scale(0);
                    transition: transform 230ms $EASE_outBack 350ms;

                    .st-open & {
                        transform : scale(1);
                    }
                }

            }
            .gnb__banner__source {
                position: absolute;
                right: -35%; bottom: -6%;
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
                font-size: $SIZE_PC_fontsize_strong;

                font-weight: 700;
                text-shadow: 0 3px 5px rgba(255,255,255,0.2);
                strong   {
                    color: #7C32C0;
                }
            }
        }

    }


    $opacityEtc : 0.3;

    .gnb__etc {

        // display: none !important;

        margin-top: 52px;
        display: flex;
        flex-direction: column;
        text-align: right;

        transform : translate3d(0,30px,0);
        opacity: 0;
        transition: transform 800ms $EASE_outExpo 320ms, opacity 250ms ease 320ms;



        .st-open & {
            opacity: 1;
            transform : translate3d(0,0,0);
        }

        @include hardSelect {
            font-size: $SIZE_PC_fontsize_small;
            @include phone {
                font-size: $SIZE_MO_fontsize_small;
            }
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
                @include phone {
                    font-size: $SIZE_MO_fontsize_subtitle;
                }
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
                        @include phone {
                            font-size: 20px;
                        }
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