<template>
    <main id="plate--page" class="plate">

        <PageNeedLogin  v-if="$store.getters.is_showNeedLogin"
                        @hook:mounted="mountedPage"
        />

        <router-view    v-else
                        id="page-router"
                        @hook:mounted="mountedPage"
        >

        </router-view>

    </main>
</template>

<script>

import PageNeedLogin from '@/pages/PageNeedLogin/PageNeedLogin.vue';

export default {
    name : 'PlatePage',
    components : {
        PageNeedLogin,
    },
    computed : {
    },
    methods : {
        mountedPage() {
            setTimeout(() => {
                // console.log('page mount');
                this.$store.commit('PAGE_mounted');
            },50)
            // },1000)
        },
    },
    mounted() {
        // this.$store.commit('PAGE_mounted');
    },
}
</script>

<style scoped>

</style>
<style lang="scss">

#plate--page {
    box-sizing: border-box;
    height: 100%;
}
#page-router {
    height: 100%;
}
.page-contents {

    margin-top: $SIZE_PC_gnbHeight !important;
    @include phone {
        margin-top: $SIZE_MO_gnbHeight !important;
    }

    &.nav-correction {
        margin-top: 0 !important;
    }

    &.use-bottom-margin {
        margin-bottom: $SIZE_PC_footerMargin !important;
    }
    &.use-bottom-padding {
        padding-bottom: $SIZE_PC_footerMargin !important;
    }

}

</style>