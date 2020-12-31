<template>
    <div class="auth__signup-marketing auth__contain">

        <p>다양한 정보와 소식을 이메일로 받아보겠습니다.</p>

        <ul class="dot-list">
            <li>자녀의 학습 리포트</li>
            <li>토도수학 활용 정보</li>
            <li>토도 제품 할인 소식 등</li>
        </ul>

        <div class="auth__signup-marketing-agree">
            <RadioDefault   text="동의함"
                            name="marketing-agree"
                            :value="true"
                            v-model="pickValue"
                            :checked="true"

            />

            <RadioDefault   text="동의 하지 않음"
                            name="marketing-agree"
                            :value="false"
                            v-model="pickValue"
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
import RadioDefault     from '@/components/input/RadioDefault.vue';
import ButtonDefault    from '@/components/button/ButtonDefault.vue';

export default {
    components : {
        RadioDefault,
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

    p {
        // text-align: center;
    }

    .dot-list {
        margin-top: 27px;
    }

    .auth__signup-marketing-agree {
        display: flex;
        margin-top: 40px;
        justify-content: space-around;
    }
    .button--default {
        margin-top: 56px;
    }
}

</style>