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

<style lang="scss">

#plate--page {
    // width: 100%;
    box-sizing: border-box;
}
.page-contents  {
    // width: 100%;

}
.page-contents section{
    background-color: #aaa;


    .section--inner {
        width: $SIZE_PC_contentWidth;
        padding : 0 $SIZE_PC_outlinePadding;
        box-sizing: border-box;
        background-color: #acc;
        margin-left : auto;
        margin-right :auto;

        @include phone {
            width : 100%;
        }
    }


}

</style>