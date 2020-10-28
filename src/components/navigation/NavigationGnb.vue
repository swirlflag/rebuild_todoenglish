<template>
    <div class="nav-gnb">
        <div class="nav-gnb__wrap">

            <router-link to="/" class="nav-gnb__logo">
                <img src="@/assets/logo/logo_todoenglish.svg" alt="">
            </router-link>

            <ul class="nav-gnb__links">
                <li class="nav-gnb__link"><router-link to="/">토도영어 소개</router-link></li>
                <li class="nav-gnb__link"><router-link to="/1">멤버십 가입</router-link></li>
                <li class="nav-gnb__link"><router-link to="/2">멤버십 후기</router-link></li>
                <li class="nav-gnb__link"><router-link to="/3">커리큘럼</router-link></li>
                <li class="nav-gnb__link"><router-link to="/4">도움말</router-link></li>
            </ul>

            <button     class="nav-gnb__account"
                        :class="{'is-login' : true}"
            >
                <span class="icon icon--account"></span>
                <div class="nav-gnb__account__login">
                    Parents
                </div>
                <div class="nav-gnb__account__user">
                    seunghyun
                </div>
                <div class="icon icon--dropdown-arrow"></div>
            </button>

            <div class="nav-gnb__menu-button">
                menu
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name : 'NavagationGnb',
    data() {
        return {
            isLogin : false,
        }
    }
}
</script>

<style scoped lang="scss">
.nav-gnb {
    font-size: 16px;
    background: #aaa;
    box-sizing: border-box;
    padding: 20px $SIZE_PC_outlinePadding;
    border: 1px solid #000;
    @include phone {
        width: 100%;
        padding: 20px $SIZE_MO_outlinePadding;
    }

    .nav-gnb__wrap {
        max-width: $SIZE_PC_contentWidth;
        min-width : 920px;
        margin: 0 auto;
        display: flex;
        box-sizing: border-box;
    }

    .nav-gnb__logo {
        img {
            width: 100%;
        }
        @include phone {
            width: 54px;
        }
    }

    .nav-gnb__links {
        display: flex;
        margin-left: 64px;
        align-items: center;

        .nav-gnb__link {
            margin-left: 72px;
            &:nth-child(1) {
                margin-left: 0;
            }

            .router-link-active {
                font-weight: 800;
            }
        }
    }

    .nav-gnb__account {
        margin: auto;
        margin-right: 0;
        display :flex;
        align-items: center;

        &.is-login {
            font-weight: 800;
        }
        .icon--account {
            width: 15px; height: 17px;
            margin-right: 8px;
        }
        .nav-gnb__account__login {
            display: inline-block;
        }
        .nav-gnb__account__user {
            display: none;
        }
        .icon--dropdown-arrow {
            width: 24px; height: 24px;
            display: none;
        }
        &.is-login {
            .nav-gnb__account__login {display: none;}
            .nav-gnb__account__user {display: inline-block;}
            .icon--dropdown-arrow {display: inline-block;}
        }
    }

    .nav-gnb__menu-button {
        display: none;
        border: 1px solid #000;
        @include phone {
            display: inline-block;
        }
    }

}
</style>