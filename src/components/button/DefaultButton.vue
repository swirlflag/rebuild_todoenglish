<template>
    <button     class="button--default"
                :class="{'st-press' : isPressButton}"
                ref="ref_root"
                @click="(e) => clickButton(e)"

                @mousedown="pressButton"
                @mouseup="releaseButton"
                @mouseleave="releaseButton"
                @touchstart="pressButton"
                @touchend="releaseButton"

    >
        <span class="button__body">
            <slot></slot>
        </span>
        <span class="button__shadow"></span>

    </button>
</template>

<script>
export default {
    props : {
        to : String,
        href : String,
        blank : Boolean,
        color : String,
        background : String,
    },
    data() {
        return {
            isPressButton : false,
        }
    },
    methods : {
        clickButton(e) {
            this.$emit('click',e)
        },
        pressButton() {
            this.isPressButton = true;
        },
        releaseButton() {
            this.isPressButton = false;
        },
    }
}
</script>

<style scoped lang="scss">
$thickness : 7px;

.button--default {

    color: #fff;
    // font-weight: bold;
    // font-size: 24px;
    box-sizing: border-box;
    border-radius: 15px;
    position:relative;

    span {
        padding: 15px 44px;
        display: inline-block;
        box-sizing: border-box;
    }
}

.button__body {
    width: 100%;
    position: relative;
    background: #cac;
    border-radius: inherit;
    transition: transform 100ms ease;
    z-index: 1;

    .st-press & {
        transform : translate3d(0,$thickness,0);
    };
    .st-hover & {

    };
}

.button__shadow {
    position: absolute;
    width: 100%; height: 100%;
    // border: 1px solid #ddd;
    bottom: 0; left: 0;
    // pointer-events: none;
    border-radius: inherit;
    box-shadow: 0 $thickness 0 #333;
}
</style>