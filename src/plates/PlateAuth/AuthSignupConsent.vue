<template>
    <div class="auth__signup-check">

        <InputCheckbox    text="본인은 성인이며, 13세 이하의 아동이 아님을 확인합니다. (필수)"
                            v-model="checkValid.age"
        />

        <InputCheckbox    text="Email 및 휴대전화 번호를 등록하여 자녀의 학습 리포트와 할인 정보를 받아 보겠습니다. (선택)"
                            v-model="checkOption.register"
        />

        <p class="precaution">
            토도영어의
            <button class="hover-link type-underline"><span>이용약관</span></button>
            및
            <button class="hover-link type-underline"><span>개인정보 수집 및 이용</span></button>
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

import InputCheckbox from '@/components/input/InputCheckbox.vue';
import ButtonDefault from '@/components/button/ButtonDefault.vue';
export default {
    name : 'AuthsignupConsent',
    components : {
        InputCheckbox,
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

    > * {
        margin-top: 25px;

        @include phone {
            margin-top: 14px;
        }

        &:nth-child(1) {
            margin-top: 0;
        }
    }

    .precaution {
        text-align: center;
        margin-top: 85px;
        // display: flex;
        vertical-align: top;
        // align-items: center;

        @include phone {
            margin-top: 25px;
            // margin-top: 0;
        }
    }

    .button--default {
        // margin-top: 25px;
    }
}
</style>