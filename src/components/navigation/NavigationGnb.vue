<template>
    <div    class="nav-gnb trs"
            :class="`
                ${useTransition ? 'use-trs' : ''}
                ${isLogin ? 'is-login' : ''}
                ${isOpenMenu ? 'st-open-menu' : ''}
                ${isOpenAccount ? 'st-open-account' : ''}
                ${isReduce ? 'st-reduce' : ''}
                ${themeClear ? 'type-clear' : ''}
                ${themeWhite ? 'color-white' : ''}
            `"
    >

        <div class="nav-gnb__wrap">

            <div class="nav-gnb__source">
                <video autoplay loop muted playsinline>
                    <source src="@/assets/video/sample.mp4" type="video/mp4">
                </video>
            </div>

            <router-link to="/" class="nav-gnb__logo" >
                <span></span>
            </router-link>

            <div class="nav-gnb__linkwrap" ref="ref_linkwrap">

                <ul class="nav-gnb__links">
                    <li class="nav-gnb__link"><router-link to="/" exact>토도영어 소개</router-link></li>
                    <li class="nav-gnb__link"><router-link to="/products" exact>멤버십 가입</router-link></li>
                    <li class="nav-gnb__link"><router-link to="/2" exact>멤버십 후기</router-link></li>
                    <li class="nav-gnb__link"><router-link to="/3" exact>커리큘럼</router-link></li>
                    <li class="nav-gnb__link"><router-link to="/4" exact>도움말</router-link></li>
                </ul>

                <div class="nav-gnb__account"
                >
                    <div class="nav-gnb__user">
                        <router-link to="/10" exact class="nav-gnb__link--user" @click.prevent>
                            <span class="icon icon--account" :class="{'c-white' : whiteCondition}"></span>
                            <div class="nav-gnb__account__parents">Parents</div>
                            <div class="nav-gnb__account__username">seunghyun</div>
                        </router-link>
                        <button class="nav-gnb__openinfo-button">
                            <span   class="icon icon--dropdown-arrow"
                                    :class="{'c-white' : whiteCondition}"
                                    @click="toggleAccountInfo"
                            >
                            </span>
                        </button>
                    </div>

                    <span class="nav-gnb__listline" ref="ref_accountLine"></span>

                    <div    class="nav-gnb__account-info"
                            ref="ref_accountInfo"
                    >
                        <div class="nav-gnb__account-email">seunghyun@enuma.com</div>
                        <span class="icon icon--signout-arrow"></span>
                        <a href="#" class="nav-gnb__signout" @click.prevent="TEST_logout">Sign Out</a>
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

export default {
    name : 'NavagationGnb',
    data() {
        return {
            isLogin             : true,
            isOpenMenu          : false,
            isOpenAccount       : false,
            isReduce            : false,

            useTransition       : true,

            mobileMenuHeight    : 0,
            mobileSignoutHeight : 0,

            themeClear     : false,
            themeWhite     : true,

        }
    },
    computed : {
        whiteCondition() {
            return this.isOpenMenu || this.themeWhite;
        }
    },
    watch: {
        '$route.path' () {
            this.$store.commit('unuse_claerGnb');
            this.$store.commit('use_whiteGnb');
            this.closeMenu(false);
        },
        '$store.state.nav' : {
            handler({is_clearGnb ,is_whiteGnb}) {
                this.themeClear = is_clearGnb;
                this.themeWhite = is_whiteGnb;
            },
            deep: true,
        }
    },
    methods : {
        openMenu(trs = true) {
            this.$store.commit('SCROLL_lock');
            this.useTransition = trs;
            this.isOpenMenu = true;
        },
        closeMenu(trs = true) {
            this.$store.commit('SCROLL_unlock');
            this.useTransition = trs;
            this.isOpenMenu = false;
        },
        toggleMenu() {
            this.isOpenMenu ? this.closeMenu() : this.openMenu();
        },
        toggleAccountInfo() {
            this.isOpenAccount = !this.isOpenAccount;
        },
        TEST_logout() {
            this.isLogin = false;
            this.closeMenu();
        },
    },
    mounted () {
        this.closeMenu();
        window.addEventListener('resize' , this.closeMenu)
    }
}

export const gnbStore = {
    state : {
        is_clearGnb    : false,
        is_whiteGnb   : true,
    },
    mutations : {
        use_claerGnb(state) {
            state.nav.is_clearGnb = true;
        },
        unuse_claerGnb(state) {
            state.nav.is_clearGnb = false;
        },
        use_whiteGnb(state) {
            state.nav.is_whiteGnb = true;
        },
        unuse_whiteGnb(state) {
            state.nav.is_whiteGnb = false;
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

.nav-gnb {
    z-index: 1100;
    font-size: 16px;
    background-color: $COLOR_default_2;
    box-sizing: border-box;
    padding: 20px $SIZE_PC_outlinePadding;
    position: relative;
    border-bottom: 1px solid rgba(0,0,0,0.1);
    &.use-trs {
        transition  : background-color 450ms ease
                    , height 700ms $EASE_inOutQuint
                    , transform 300ms $EASE_outCubic
                    ;
    }

    @include phone {
        padding: 0;
        width: 100%;
        font-size: 24px;
        height: 84px;
        overflow: hidden;
    }
    &.color-white{
        @include hardSelect {
            color: #fff;
        }
    }
    &.type-clear {
        background-color: transparent;
    }
    &.st-open-menu {
        background-color: $COLOR_default_2;
        height: 100%;
    }
    &.st-reduce:not(.st-open-menu){
        transform : translateY(-100%);
    }
    .icon {
        transition : background-image 300ms ease ;
    }
}

.nav-gnb__wrap {
    max-width: $SIZE_PC_contentWidth;
    // min-width : 920px;
    margin: 0 auto;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    @include phone {
        max-width : 100%;
        min-width : 100%;
        height: 100vh;
        align-items: start;
        flex-direction: column;
        padding: 14px $SIZE_MO_outlinePadding;
    }
}

.nav-gnb__logo {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    > span {
        width: 80px; height: 72px;
        display: inline-block;
        background-image: url('~@/assets/logo/logo_todoenglish.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;

        // transition: background-image 200ms ease;

        @include phone {
            width: 70px; height: 50px;
        }

        .color-white & ,
        .st-open-menu & {
            background-image: url('~@/assets/logo/logo_todoenglish_white.svg');
        }

    }
}

.nav-gnb__linkwrap {

    width: 100%;
    box-sizing: border-box;
    position: relative;
    display:flex;
    height :auto;

    a {
        @include phone {
            opacity: 0.4;
        }
        &.router-link-active {
            font-weight: 800;
            opacity: 1;
        }
    }

    @include overPhone {
        height: auto !important;
    }
    @include phone {
        margin-top: 30px;
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
            height: calc(100% - 84px);
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
                color: $COLOR_default_1;
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
    width: 24px; height: 20px;
    position: absolute;
    top: 32px; right: $SIZE_MO_outlinePadding;
    @include phone {
        display: inline-block;
    }
    .nav-gnb__menu-button__wrap {
        display: inline-block;
        width: 100%; height: 100%;
        position: relative;
        overflow: hidden;
        > span {
            position: absolute;
            width: 100%; height: 2px;
            display: inline-block;
            left: 0;
            background-color:$COLOR_default_1;
            transition: transform 300ms ease;
            transform : translate3d(0,0,0) ,rotate(0deg);

            .color-white &,
            .st-open-menu &  {
                background-color: #fff;
            }

            &:nth-child(1) {top: 0; transition-delay: 300ms;}
            &:nth-child(2) {top: calc(50% - 1px); }
            &:nth-child(3) {top: calc(50% - 1px); }
            &:nth-child(4) {bottom: 0; transition-delay: 350ms;}

            .st-open-menu & {
                transition-delay: 0ms;
                &:nth-child(1) {transform : translateX(100%); }
                &:nth-child(2) {transform : rotate(45deg); }
                &:nth-child(3) {transform : rotate(-45deg); }
                &:nth-child(4) {transform : translateX(-100%); }
            }
        }
    }
}


</style>