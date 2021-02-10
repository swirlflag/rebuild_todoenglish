<template>
    <div class="auth__external">
        외부 로그인 중............
        <br>
        <template v-if="nowPhase === 'signinKakao'">
            카카오 고고 빨리만들자
        </template>
        <template v-else-if="nowPhase === 'signinGoogle'">
            구글 고고빨리만들자
        </template>
    </div>
</template>

<script>
export default {
    props : {
        nowPhase : String,
    },
}
</script>

<style>

</style>