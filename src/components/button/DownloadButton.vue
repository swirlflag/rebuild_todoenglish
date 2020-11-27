<template>

    <DefaultButton  :theme="theme || defaultTheme"
                    :class="typeClassName"
                    :href="downloadLink" :blank="true"
    >

        <template v-if="type === 'apple'">
            <span class="button__content"></span>
        </template>

        <template v-else-if="type === 'google'">
            <span class="button__content"></span>
        </template>

        <template v-else-if="type === 'mobile'">
            토도영어 다운로드
        </template>

    </DefaultButton>

</template>

<script>
import DefaultButton from '@/components/button/DefaultButton.vue';

export default {
    props : {
        type : String,
        theme : String,
    },
    components : {
        DefaultButton,
    },

    data() {

        let downloadLink = '';
        let typeClassName = '';

        if(this.type === 'apple'){
            typeClassName = 'type-appstore';
            downloadLink = 'https://apple.co.kr';
        }
        if(this.type === 'google'){
            typeClassName = 'type-playstore';
            downloadLink = 'https://google.co.kr';
        }
        if(this.type === 'mobile'){
            typeClassName = 'type-download'
        }

        return {
            typeClassName ,
            downloadLink ,
            defaultTheme : 'white',
        }
    },

}

</script>

<style scoped lang="scss">
.button--default {
    min-width: 220px;

    span {
        background-repeat: no-repeat;
        background-position: center center;
    }

    &.type-appstore {
        .button__content {
            width: 133px; height: 33px;
        }
        &.theme-white {.button__content {background-image : url('~@/assets/logo/logo_appstore.svg');}}
        &.theme-navy {.button__content {background-image : url('~@/assets/logo/logo_appstore_white.svg');}}
    }

    &.type-playstore {
        .button__content {
            width: 149px; height: 33px;
        }
        &.theme-white {.button__content {background-image : url('~@/assets/logo/logo_googleplay.svg');}}
        &.theme-navy {.button__content {background-image : url('~@/assets/logo/logo_googleplay_white.svg');}}
    }

    &.type-download {
        font-weight: 700;
    }

}

</style>