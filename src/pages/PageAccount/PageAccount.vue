<template>

    <div class="pagemission page--account layout">
        <h1>PAGE : 계정</h1>
        <p>path : {{ $route.path }}</p>
        <p>@/src/pages/PageAccount/PageAccount.vue</p>
        <br>
        <p>계정과 토도스쿨의 프로필 정보 열람 및 관리 화면을 작성합니다.</p>
        <p>로그인상태 : {{ this.$store.state.$user.is_login }}</p>
    </div>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>