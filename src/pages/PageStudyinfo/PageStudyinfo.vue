<template>

    <div class="pagemission page--studyinfo layout">
        <h1>PAGE : 학습 정보</h1>
        <p>path : {{ $route.path }}</p>
        <p>@/src/pages/PageAccount/PageAccount.vue</p>
        <br>
        <p>아이의 학습 정보에 대한 자세한 정보의 화면을 작성합니다.</p>
        <p>로그인상태 : {{ this.$store.state.$user.is_login }}</p>
    </div>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>