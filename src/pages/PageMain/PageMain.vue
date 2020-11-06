<template>
    <div class="page-contents">

        <section class="main-header">
            <div class="section--inner">
                <h1 class="main-header__title">
                    실패가 없는
                    <br>모두의 영어유치원
                </h1>
                <div class="main-header__logo">
                    <img src="@/assets/main/signboard.png" alt="">
                </div>
                <p class="main-header__description">
                    아이들의 즐거운 첫 영어 시작을 응원하며
                    <br><span class="fw-b">30일 무료 이용권</span>을 드려요
                </p>
                <div class="main-header__downloads">

                    <DefaultButton class="main-header__appstore-button">
                        <span></span>
                    </DefaultButton>

                </div>
            </div>
        </section>
        <!-- <DefaultButton v-if="0"></DefaultButton> -->

        <div class="test_longtext"></div>
        <div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div><div class="test_longtext"></div>

    </div>

</template>

<script>
import DefaultButton from '@/components/button/DefaultButton.vue';

export default {
    name : 'PageMain',
    components : {
        DefaultButton,
    },
    methods: {
        test(e) {
            console.log(e);
        }
    },
    mounted () {
        this.$store.commit('use_claerGnb');
        this.$store.commit('unuse_whiteGnb');
    }
}
</script>

<style lang="scss" scoped>
.page-contents {

}
// scoped
.main-header {
    width: 100%;
    background: #aac;
    padding-top: 200px;
    text-align: center;

    .section--inner {
        background-color: #aaa;
        display :flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #d3d;
    }
}

.main-header__title {
    font-size: 88px;
}
.main-header__logo {
    margin-top: 32px;
    width: 460px;

    img {
        display: inline-block;
        width: 100%;
    }

}
.main-header__description {
    margin-top: 100px;
    border: 1px solid #000;
    font-size: 48px;
}

.main-header__downloads {

    .button--default {
        span {
            display: inline-block;
            width: 100px; height: 50px;
            border: 1px solid #000;
        }
    }
    .main-header__appstore-button {
        span {
            width: 133px; height: 35px;
            background-image: url('~@/assets/common/icon_appstore.svg');
        }
    }
}


</style>