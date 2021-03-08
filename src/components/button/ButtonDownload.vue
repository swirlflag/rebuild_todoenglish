<template>

    <ButtonDefault  :theme="theme || defaultTheme"
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

    </ButtonDefault>

</template>

<script>
import ButtonDefault from '@/components/button/ButtonDefault.vue';

export default {
    props : {
        type : String,
        theme : String,
    },
    components : {
        ButtonDefault,
    },
    watch : {
        'type'() {
            this.sortType();
        }
    },

    data() {

        return {
            typeClassName : '',
            downloadLink : '',

            defaultTheme : 'white',

        }
    },
    methods : {
        sortType() {
            switch (this.type) {
                case ('apple') : {
                    this.typeClassName = 'type-appstore';
                    this.downloadLink = 'https://apple.co.kr';
                    break;
                }
                case ('google') : {
                    this.typeClassName = 'type-playstore';
                    this.downloadLink = 'https://google.co.kr';
                    break;
                }
                case ('mobile') : {
                    this.typeClassName = 'type-download';
                    break;
                }
                default : {
                    this.typeClassName = 'type-download';
                }
            }
        }
    },
    created() {
        // this.sortType();
    },
    mounted() {
        this.sortType();
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