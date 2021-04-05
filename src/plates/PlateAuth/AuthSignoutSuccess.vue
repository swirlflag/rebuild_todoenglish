<template>
    <div class="auth__signout-success">
        <p>로그아웃 완료화면 --</p>

        <ButtonDefault @click="closeAuth">
            닫으세용~
        </ButtonDefault>
    </div>
</template>

<script>
import ButtonDefault from '@/components/button/ButtonDefault.vue';
export default {
    components : {
        ButtonDefault ,
    },
    methods : {
        closeAuth() {
            console.log('close!');
            this.$store.dispatch('closeAuthPanel')
        }
    },
}
</script>

<style scoped lang="scss">
.auth__signout-success {
    display: flex;
    width: 100%;
    flex-direction: column;
    p {
        text-align: center;
        border: 1px solid #aac;
        color: #aac;
        padding: 10px;
    }
}
</style>