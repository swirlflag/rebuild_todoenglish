<template>
    <div class="page-contents">

        <section class="main-header">
            <div class="section--inner">
                <h1 class="main-header__title">
                    실패가 없는
                    <br>모두의 영어유치원
                </h1>
                <div class="main-header__logo">
                    <img src="@/assets/main/signboard.svg" alt="">
                </div>
                <p class="main-header__description">
                    아이들의 즐거운 첫 영어 시작을 응원하며
                    <br><span class="fw-b">30일 무료 이용권</span>을 드려요
                </p>
                <div class="main-header__downloads">

                    <DownloadButton type="apple" class="visible-overphone"/>

                    <DownloadButton type="google" class="visible-overphone"/>

                    <DownloadButton type="mobile" class="visible-phone"/>

                </div>

                <div class="image-box main-header__source-children">
                    <img src="@/assets/main/img_students.svg" alt="">
                </div>

            </div>
        </section>

        <div class="test_longtext"></div>
        <div class="test_longtext"></div>
        <div class="test_longtext"></div>
        <div class="test_longtext"></div>

    </div>

</template>

<script>
import DownloadButton from '@/components/button/DownloadButton.vue';

export default {
    name : 'PageMain',
    
    components : {
        DownloadButton,
        
    },
    data() {
        return {
            isNavClear : false,
        }
    },
    methods: {
        test(e) {
            console.log(e);
        },

        clearStyleNav() {
            this.$store.commit('use_claerGnb');
            this.$store.commit('unuse_whiteGnb');
        },
        defaultStyleNav() {
            this.$store.commit('unuse_claerGnb');
            this.$store.commit('use_whiteGnb');
        },

        checkNavStyle() {

            if(window.scrollY < 100){
                if(this.isNavClear){
                    return
                }
                this.clearStyleNav();
                this.isNavClear = true;

            }else {
                if(!this.isNavClear){
                    return
                }
                this.defaultStyleNav();
                this.isNavClear = false;
            }

        }
    },
    mounted () {

        this.checkNavStyle();
        window.addEventListener('scroll' , this.checkNavStyle );

    },

    beforeDestroyed() {
        window.removeEventListener('scroll' , this.checkNavStyle );
    }
}
</script>

<style lang="scss" scoped>
.page-contents {

}
// scoped
.main-header {
    width: 100%;
    padding-top: 200px;
    // padding-bottom: 356px;
    text-align: center;

    background-image: url('~@/assets/main/bg_home_top.png');
    background-position: center;
    background-size: cover;

    @include phone {
        padding-top: 140px;
    }

    .section--inner {
        border: 1px solid #d3d;
        display :flex;
        flex-direction: column;
        align-items: center;
    }
}

.main-header__title {
    font-size: 88px;
    @include phone {
        font-size: calc(15px + 8vw);
    }
}
.main-header__logo {
    margin-top: 32px;
    width: 460px;

    @include phone {
        margin-top: 40px;
        width: 88%;
    }

    img {
        display: inline-block;
        width: 100%;
    }

}
.main-header__description {
    margin-top: 100px;
    font-size: 48px;
    @include phone {
        margin-top: 90px;
        font-size: calc(8px + 3.5vw);
    }
}

.main-header__downloads {
    width: 100%;
    margin-top: 50px;
    @include phone {
        margin-top: 26px;
    }

    > button {
        margin: 10px;
        @include phone {
            margin: 0;
        }
    }
}
.main-header__source-children {
    margin-top: 142px;
    margin-bottom: 30px;
}


</style>