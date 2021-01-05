<template>
    <div class="auth__signup-check">

        <CheckboxDefault    text="본인은 성인이며, 13세 이하의 아동이 아님을 확인합니다. (필수)"
                            v-model="checkValid.age"
        />

        <CheckboxDefault    text="Email 및 휴대전화 번호를 등록하여 자녀의 학습 리포트와 할인 정보를 받아 보겠습니다. (선택)"
                            v-model="checkOption.register"
        />

        <p class="precaution">
            토도영어의
            <ButtonUnderMask text="이용약관" type="underline"/>
            및
            <ButtonUnderMask text="개인정보 수집 및 이용" type="underline"/>
            에 동의하시면 확인을 눌러주세요.
        </p>

        <ButtonDefault  theme="pink"
                        :disable="!isValidAll"
                        @click="$emit('change-phase', 'signupMarketingAgree')"
        >
            확인
        </ButtonDefault>
    </div>
</template>

<script>
import ButtonUnderMask from  '@/components/button/ButtonUnderMask.vue';
import CheckboxDefault from '@/components/input/CheckboxDefault.vue';
import ButtonDefault from '@/components/button/ButtonDefault.vue';
export default {
    name : 'AuthsignupConsent',
    components : {
        ButtonUnderMask,
        CheckboxDefault,
        ButtonDefault,
    },

    data() {
        return {
            checkValid : {
                age : false,
            },
            checkOption : {
                register : false,
            }
        }
    },
    computed : {
        isValidAll() {
            return Object.values(this.checkValid).indexOf(false) === -1;
        }
    },
    methods : {
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.auth__signup-check {
    // border: 1px solid #000;
    // width: auto;
    width: 100%;
    min-width : inherit;
    // white-space: nowrap;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;

    .default--checkbox {

        margin-top: 25px;

        &:nth-child(1) {
            margin-top: 0;
        }
    }

    .precaution {
        text-align: center;
        margin-top: 85px;
    }

    .button--default {
        margin-top: 25px;
    }
}
</style>