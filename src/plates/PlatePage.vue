<template>
    <div id="plate--page" class="plate">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name : 'PlatePage',
}
</script>

<style scoped lang="scss">
body {
    * {
        background: #d3d;
    }
}
// @import '@/style/_mixin.scss';
// #plate_page {
//     flex: 1;
//     flex-basis: 100%;

//     transition: transform 400ms $EASE_outCubic;

//     &.st-pressdown {
//         transform: scale(0.98);
//         @include phone {
//             transform: scale(0.95);
//         }
//     }
// }
</style>
<style lang="scss">
// @import '@/style/_mixin.scss';
// .page__outer {
//     padding-top: 136px;
//     @include phone {
//         padding-top: 84px;
//     }
// }

// .page__inner {
//     max-width: $SIZE_PC_maxWidth;
//     padding-left: $SIZE_PC_distanceContent;
//     padding-right: $SIZE_PC_distanceContent;
//     margin: 50px auto;
//     position: relative;
//     @include phone {
//         padding-left: $SIZE_MO_distanceContent;
//         padding-right: $SIZE_MO_distanceContent;
//     }
// }

</style>