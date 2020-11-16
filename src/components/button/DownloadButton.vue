<template>

    <DefaultButton  colorType="navy"
                    :class="typeClassName"
                    :href="downloadLink" :blank="true"
    >

        <template v-if="type === 'apple'">
            <span></span>
        </template>

        <template v-else-if="type === 'google'">
            <span></span>
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
        }
    },

}

</script>

<style scoped lang="scss">
.button--default {
    min-width: 220px;

    &.type-appstore {

        span {
            width: 133px; height: 33px;
            background-image : url('~@/assets/common/icon_appstore.svg');
            background-repeat: no-repeat;
            background-position: center center;
        }
    }

    &.type-playstore {

        span {
            width: 149px; height: 33px;
            background-image : url('~@/assets/common/icon_playstore.svg');
            background-repeat: no-repeat;
            background-position: center center;
        }
    }

    &.type-download {
        font-weight: 700;
    }

}

</style>