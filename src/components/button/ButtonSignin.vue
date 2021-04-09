<template>
    <!-- <div> 가입</div> -->
    <ButtonDefault :class="typeClassName" @click="$emit('click')">

        <template v-if="type === 'kakao'">
            <i class="icon--kakaobubble"></i>
        </template>

        <template v-if="type === 'google'">
            <i class="icon--google"></i>
        </template>

        {{ buttonText }}

    </ButtonDefault>
</template>

<script>

import ButtonDefault from '@/components/button/ButtonDefault.vue';
export default {

    props : {
        type : String // kakao , google, email
    },
    data() {

        let buttonText = '';
        let typeClassName = '';

        switch (this.type) {
            case ('kakao') : {
                typeClassName = 'type-signin-kakao';
                buttonText = '카카오로 시작하기';
                break;
            }
            case ('google') : {
                typeClassName = 'type-signin-google';
                buttonText = '구글로 시작하기';
                break;
            }
            case ('email') :
            default : {
                typeClassName = 'type-signin-email';
                buttonText = '이메일로 시작하기';
                break;
            }
        }

        return {
            buttonText,
            typeClassName,
        }
    },
    components : {
        ButtonDefault,
    }
}
</script>

<style scoped lang="scss">
.button--default {
    i {
        position: absolute;
        top : 50%; transform:translateY(-50%);
        left: 21px;
    }
}
</style>