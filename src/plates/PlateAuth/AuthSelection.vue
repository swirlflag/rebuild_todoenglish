<template>
    <div class="auth__selection">

        <ButtonSignin type="kakao"/>

        <ButtonSignin type="google"/>

        <div class="auth__divider">
            <span class="auth__divider__bar"></span>
            <span class="precaution">또는</span>
            <span class="auth__divider__bar"></span>
        </div>

        <ButtonSignin type="email" @click="$emit('change-phase' , 'signinEmail')"/>

    </div>
</template>

<script>
import ButtonSignin from '@/components/button/ButtonSignin.vue';

export default {
    name : 'AuthSelection',
    components : {
        ButtonSignin,
    },
    methods: {

    }

}
</script>

<style scoped lang="scss">
.auth__selection {
    display: flex;
    flex-direction: column;
    width: 360px;
    > * {
        margin-top: 23px;
        &:nth-child(1) {
            margin-top: 0;
        }
    }

    .auth__divider {
        display: flex;
        align-items: center;

        span:nth-child(2) {
            margin: 0 20px;
        }

        .auth__divider__bar {
            display: inline-block;
            height: 1px;
            width: 100%;
            background-color: rgba(0,0,0,0.1);
        }
    }
}



</style>