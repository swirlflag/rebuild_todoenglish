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
                @click="TEMP_CLICK"
        >
            임시 : 로그인하러가기
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
        TEMP_CLICK(){

            this.$emit('change-phase' ,'signinForm');
            // this.temp_value = false;
            // setTimeout(() => {
            //     this.temp_value = true;
            // },1000)
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
    // margin: 30px 0;
}
</style>