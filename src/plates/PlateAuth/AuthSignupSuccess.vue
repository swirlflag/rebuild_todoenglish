<template>
    <div>
        회원가입완료~~~~~~~~~~~~``

        <ButtonDefault
                @click="CLICK"
        >
            로그인 하기
        </ButtonDefault>
    </div>
</template>

<script>
import ButtonDefault from '@/components/button/ButtonDefault.vue';
export default {
    name : 'AuthSigninSuccess',
    components : {
        ButtonDefault,
    },
    methods : {
        CLICK(){
            this.$emit('change-phase' ,'signinEmail' )
            console.log(1);
        }
    },
    mounted() {
        console.log(1);
        this.$emit('reset-history');
    },
}
</script>

<style>

</style>