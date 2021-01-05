<template>
    <div class="auth__signup-success">
        <p>
            [임시 : 회원가입 완료 화면]
        </p>

        <div class="temp__wave">
            <SpinnerColordotsWave
            :isHide="temp_value"

            />
        </div>

        <ButtonDefault
                @click="CLICK"
        >
            임시 : 가입 정보로 로그인
        </ButtonDefault>
    </div>
</template>

<script>
import ButtonDefault from '@/components/button/ButtonDefault.vue';
import SpinnerColordotsWave from '@/components/spinner/SpinnerColordotsWave.vue';

export default {
    name : 'AuthSigninSuccess',
    components : {
        ButtonDefault,
        SpinnerColordotsWave,
    },
    data() {
        return {
            temp_value : true,
        }
    },
    methods : {
        CLICK(){

            this.temp_value = false;
            setTimeout(() => {
                this.temp_value = true;
                this.$emit('change-phase' ,'signinSuccess' )
            },1000)
        }
    },
    mounted() {
        this.$emit('reset-history');
    },
}
</script>

<style scoped lang="scss">
.auth__signup-success {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #aaa;

    p {
        border: 1px solid #ddd;
        padding: 20px;
    }
}
.temp__wave {
    margin: 30px 0;
}
</style>