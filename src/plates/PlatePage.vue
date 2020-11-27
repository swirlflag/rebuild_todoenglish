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
.page-contents  {

    &.nav-correction {
        margin-top: 114px;
        @include phone {
            margin-top: 84px;
        }
    }
}

</style>