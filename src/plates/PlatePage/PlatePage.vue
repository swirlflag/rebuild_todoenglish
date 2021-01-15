<template>
    <main id="plate--page" class="plate">
        <router-view></router-view>
    </main>
</template>

<script>

export default {
    name : 'PlatePage',
}
</script>

<style lang="scss">

#plate--page {
    // width: 100%;
    box-sizing: border-box;
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