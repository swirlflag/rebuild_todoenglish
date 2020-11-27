<template>
    <span class="mask-text" ref="ref_root">
        <transition name="mask"
                    @enter="start"
                    @afterLeave="end"
        >
            <span :key="text">{{ text }}</span>
        </transition>
    </span>
</template>

<script>
export default {
    props: {
        text : null,
        direction : String, // top,bottom, left, right
    },
    methods : {
        start() {
            const texts = this.$refs.ref_root.querySelectorAll('span');
            const maxWidth = Math.max(texts[0].getBoundingClientRect().width , texts[1].getBoundingClientRect().width);
            this.$refs.ref_root.style.width = (maxWidth + 1) + 'px';
        },
        end () {
            this.$refs.ref_root.style.width = null;
        }
    }

}
</script>

<style scoped lang="scss">

.mask-text {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    vertical-align: bottom;
    position: relative;

    > span {
        white-space: nowrap;
        width: auto;
        display: inline-block;
        transition: transform 800ms $EASE_inOutCubic ;
    }
}

.mask-leave-active {
    position: relative;
}
.mask-leave {
    transform : translate3d(0, 0, 0);
}
.mask-leave-to {
    transform : translate3d(0, -100%, 0) ;
}

.mask-enter-active {
    position: absolute;
    left: 0;
}
.mask-enter {
    transform : translate3d(0, 100%, 0);
}
.mask-enter-to{
    transform : translate3d(0, 0, 0);
}
</style>