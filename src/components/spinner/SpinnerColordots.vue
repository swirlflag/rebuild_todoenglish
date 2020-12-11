<template>
    <span class="spinner--colordots" :class="{'st-show' : isShow}">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </span>
</template>

<script>
export default {
    name : 'SpinnerColordots',
    props : {
        isShow : Boolean,
    },
}
</script>

<style lang="scss" scoped>

$rootWidth : 50px;
$dotWidth : 12px;

@keyframes dotSpinner {
    0% {
        transform: translate3d(0,-35%,0);
    }
    100% {
        transform: translate3d(0,35%,0);
    }
}

.spinner--colordots  {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    opacity: 0;
    transition: opacity 120ms ease ;

    &.st-show {
        opacity: 1;
        transition: opacity 300ms ease ;
    }

    span {
        // position: absolute;
        position: relative;
        display: inline-block;
        width: $dotWidth; height: $dotWidth;
        border-radius: 9999px;
        margin: 0 2px;
        animation: dotSpinner 600ms $EASE_inOutSine infinite alternate;
        transform: translate3d(0,-35%,0);

        &:nth-child(1) {background-color: $COLOR_mint_1;}
        &:nth-child(2) {background-color: $COLOR_violet_1;}
        &:nth-child(3) {background-color: $COLOR_navy_1;}
        &:nth-child(4) {background-color: $COLOR_pink_1;}
        &:nth-child(5) {background-color: $COLOR_navy_2;}

        $max : 5;
        $distance : 90ms;
        @for $i from 1 through 5 {
            &:nth-child(#{$i}) {
                z-index: $max - $i;
                animation-delay: ($i - 1) * $distance;
            }
        }

    }

}
</style>