<template>
    <div class="auth__selection" ref="ref_root">

        <ButtonSignin type="kakao"/>

        <ButtonSignin type="google"/>

        <div class="auth__divider" ref="ref_divider">
            <span class="auth__divider__bar"></span>
            <span class="precaution">또는</span>
            <span class="auth__divider__bar"></span>
        </div>

        <ButtonSignin type="email" @click="$emit('change-phase' , 'signinEmail')"/>

    </div>
</template>

<script>
import gsap from 'gsap';
import ButtonSignin from '@/components/button/ButtonSignin.vue';
{gsap}

export default {
    name : 'AuthSelection',
    components : {
        ButtonSignin,
    },
    methods: {
        onMountedMotion() {

        },
    },
    mounted() {
        this.onMountedMotion();
    },

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