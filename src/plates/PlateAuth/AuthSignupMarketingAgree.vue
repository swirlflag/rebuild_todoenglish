<template>
    <div class="auth__signup-marketing auth__contain">

        <p>다양한 정보와 소식을 이메일로 받아보겠습니다.</p>

        <ul class="list--dot">
            <li>자녀의 학습 리포트</li>
            <li>토도수학 활용 정보</li>
            <li>토도 제품 할인 소식 등</li>
        </ul>

        <div class="auth__signup-marketing-agree">

            <InputRadioCollection   v-model="pickValue"
                                    name="auth-marketing-agree"
                                    :list="[
                                        {
                                            text:'동의함',
                                            value : true,
                                        },
                                        {
                                            text : '동의 하지 않음',
                                            value : false,
                                        },
                                    ]"
            />

        </div>

        <ButtonDefault  theme="pink"
                        @click="$emit('change-phase','signupEmailForm')"
        >
            확인
        </ButtonDefault>

    </div>
</template>

<script>

import InputRadioCollection from '@/components/input/InputRadioCollection.vue';
import ButtonDefault    from '@/components/button/ButtonDefault.vue';

export default {
    components : {
        InputRadioCollection,
        ButtonDefault,
    },
    name : 'AuthSignupMarketingAgree',
    data() {
        return {
            pickValue : null,
        }
    }

}
</script>

<style lang="scss" scoped>
.auth__signup-marketing {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    > * {
        margin-top: 25px;
        // border: 1px solid #d3d;

        @include phone {
            margin-top: 14px;
        }

        &:nth-child(1) {
            margin-top: 0;
        }
    }

    p {
        // text-align: center;
    }

    .auth__signup-marketing-agree {
        display: flex;
        justify-content: space-around;
        margin-top: 55px;
        @include phone {
            margin-top: 30px;
        }
    }
}

</style>