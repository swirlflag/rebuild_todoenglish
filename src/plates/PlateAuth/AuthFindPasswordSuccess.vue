<template>
    <div class="auth__find-password-success">
        <p>
            [비밀번호 변경 이메일 완료화면]
        </p>

        <ButtonDefault @click.prevent="$emit('change-phase' , 'signinForm')">
            로그인 하기
        </ButtonDefault>

        <ButtonDefault>
            인증메일 재발송
        </ButtonDefault>
    </div>
</template>

<script>

import ButtonDefault from '@/components/button/ButtonDefault.vue';

export default {
    components : {
        ButtonDefault,
    },
    methods : {

    },
}
</script>

<style scoped lang="scss">
.auth__find-password-success {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    > * {
        margin-top: 22px;
        @include phone {
            margin-top: 14px;
        }
        &:nth-child(1) {
            margin-top: 0;
        }
    }

    p {
        color: #aaa;
    }

}
</style>