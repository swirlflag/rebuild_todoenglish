<template>
    <div class="page-contents">

        <section class="main-header">
            <div class="section--inner">
                <h1 class="main-header__title">
                    실패가 없는 모두의 영어유치원
                </h1>
                <div class="main-header__logo"></div>
                <p class="main-header__logo">
                    아이들의 즐거운 첫 영어 시작을 응원하며
                    30일 무료 이용권을 드려요
                </p>
                <div class="main-header__downloads">
                    <div class="main-header__download-apple">앱스토어</div>
                    <div class="main-header__download-google">구글플레이</div>
                </div>
                <!-- <div class="test_longtext"></div> -->
            </div>
        </section>

    </div>

</template>

<script>
export default {
    name : 'PageMain',
    mounted () {
        this.$store.commit('use_claerGnb');
        this.$store.commit('unuse_whiteGnb');
    }
}
</script>

<style lang="scss" scoped>

// scoped
.main-header {
    width: 100%;
    background: #aac;
}
</style>