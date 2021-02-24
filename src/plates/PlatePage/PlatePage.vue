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
                this.$store.commit('PAGE_mounted');
            },1000)
            // console.log('page mount');
        },
    },
    mounted() {

    },
}
</script>

<style scoped>

</style>
<style lang="scss">

#plate--page {
    box-sizing: border-box;
}
#page-router {

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