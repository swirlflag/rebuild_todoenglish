<template>
    <span class="mask-text" ref="ref_root">
        <transition name="mask"
                    @enter="start"
                    @afterEnter="end"
        >
            <span :key="text" v-html="text"></span>
        </transition>
    </span>
</template>

<script>
export default {
    props: {
        text : null,
        direction : String, // top,bottom, left, right
        speed : null // Number, String
    },
    methods : {
        start() {
            const texts = this.$refs.ref_root.querySelectorAll('span');
            const maxWidth = Math.max(texts[0].getBoundingClientRect().width , texts[1].getBoundingClientRect().width);

            texts[0].style.width = (maxWidth + 0) + 'px';
            texts[1].style.width = (maxWidth + 0) + 'px';
            if(this.speed){
                texts[0].style.transitionDuration = this.speed + 'ms';
                texts[1].style.transitionDuration = this.speed + 'ms';
            }
            this.$refs.ref_root.style.width = (maxWidth + 0) + 'px';
        },
        end () {
            if(!this.$refs.ref_root){return}
            const texts = this.$refs.ref_root.querySelectorAll('span');
            texts[0].style.width = null;
            this.$refs.ref_root.style.width = null;
        }
    }

}
</script>

<style scoped lang="scss">

.mask-text {
    display: inline-flex;
    flex-direction: column;
    overflow: hidden;
    vertical-align: bottom;
    position: relative;
    text-align: inherit;

    > span {
        white-space: nowrap;
        width: auto;
        display: inline-block;
        // transition: transform 800ms $EASE_inOutCubic ;
    }

    span {
        display: inline-block;
        box-sizing: border-box;
    }
}

.mask-leave-active {
    position: relative;
    transition: transform 700ms $EASE_inOutCubic 0ms;
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
    transition: transform 700ms $EASE_inOutCubic 0ms;
}
.mask-enter {

    transform : translate3d(0, 100%, 0);
}
.mask-enter-to{
    transform : translate3d(0, 0, 0);
}
</style>