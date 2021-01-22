<template>
    <button class="button--undermask"
            :class="`${type ? `type-${type}` : ''}`"

            @click="onClick">
        <span v-html="text"></span>
    </button>
</template>

<script>
export default {
    props: {
        text : null,
        type : String,
    },
    name : 'ButtonUnderMask',
    methods : {
        onClick() {
            this.$emit('click')
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.button--undermask{
    position: relative;
    overflow: hidden;
    height: 100%;
    box-sizing: border-box;
    display: inline-block;
    line-height: inherit;
    vertical-align: middle;

    span {
        box-sizing: border-box;
        display: inline-block;
        line-height: inherit;
        vertical-align: middle;
        position: relative;
    }

    > * {
        z-index: 2;
    }

    &::before {
        position: absolute;
        content: '';
        width: 102%; height: 100%;
        top: 0; left: -1%;
        transform: translateY(calc(100% + 1px));
        transition: transform 200ms $EASE_outCubic, color 100ms ease , opacity 200ms ease;

        z-index: 1 !important;
    }

    &.type-underline {
        &::before  {
            transform: translateY(calc(100% - 0.08em));
            background: $COLOR_gray;
            opacity: 0.5;
        }
    }

    @include hover {
        color: #fff;
        font-weight: 700;
        &::before {
            transform: translateY(0);
            background: $COLOR_navy_2;
            opacity: 1;
        }
    }
}
</style>