<template>

    <div class="auth__signin-email" ref="ref_root">

        <FormSignin @success="singinSuccess"
                    ref="ref_signform"

        />

        <div class="auth__signin-email__etc">
            <div class="auth__signin-email__etc__item">
                <ButtonUnderMask    text="회원가입"
                                    @click="$emit('change-phase', 'signupEmail')"
                />
            </div>

            <div class="auth__signin-email__etc__item">
                <ButtonUnderMask    text="비밀번호 찾기"
                                    @click="$emit('change-phase', 'findPassword')"
                />
            </div>

        </div>

    </div>

</template>

<script>
import ButtonUnderMask from '@/components/button/ButtonUnderMask.vue';
import FormSignin from '@/components/form/FormSignin.vue';

export default {
    components : {
        ButtonUnderMask,
        FormSignin,
    },
    methods: {

        singinSuccess() {
            this.$emit('change-phase' , 'signinSuccess');
        },

    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
.auth__signin-email {
    width: 100%;
    // border: 1px solid #d3d;
}

.auth__signin-email__etc {
    margin-top: 30px;
    width: 100%;
    display : flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .auth__signin-email__etc__item {
        display: flex;
        align-items: center;

        button {
            font-weight: 400;
        }

        &::before {
            content : '';
            display: inline-block;
            width: 1px; height: 16px;
            background-color: #F2F0E9;
            position: relative;
            margin: 0 15px;
        }

        &:nth-child(1)::before { display: none;}
    }
}
</style>