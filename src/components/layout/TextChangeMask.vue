<template>
    <span class="mask-text" ref="ref_root">
        <!-- <transition name="mask"
                    @enter="start"
                    @afterEnter="end"
        >
            <span :key="text" v-html="text"></span>
        </transition> -->

        <span class="mask-text__target" :class="{'st-animate' : isAnimate}" ref="ref_target">
            <span class="mask-text__fly" ref="ref_fly">
                <span class="mask-text__before" v-html="beforeText" ref="ref_before"></span>
                <span class="mask-text__after" v-html="afterText" ref="ref_after"></span>
            </span>
            <span class="mask-text__contain" v-html="containText" ref="ref_contain"></span>
        </span>

    </span>
</template>

<script>
import gsap from 'gsap';

export default {
    props: {
        text        : null,
        direction   : String, // top,bottom, left, right
        speed       : null ,// Number, String
    },
    data() {
        return {
            beforeText  : '',
            afterText   : this.text || '',
            containText : this.text || '',
            isAnimate   : false,
        }
    },
    watch : {
        'text'(now,old) {
            this.beforeText     = old;
            this.afterText      = now;

            setTimeout(() => {
                this.animate(now,old);
            },1)

        }
    },
    methods : {
        animate() {
            const fly = this.$refs.ref_fly;
            const target = this.$refs.ref_target;

            gsap.set(target , {css : {width : fly.offsetWidth}});

            gsap.to(fly,{
                yPercent : -50,
                ease: 'power3.out',
                duration : 0.55,
                onStart : () => {
                    this.isAnimate = true;
                    this.containText = this.afterText;
                },
                onComplete : () => {
                    this.isAnimate = false;
                    gsap.set(fly , {css : {
                        yPercent : 0,
                    }})
                    gsap.set(this.$refs.ref_target , {css : {
                        width : null
                    }});
                }
            });


        }
    }

}
</script>

<style scoped lang="scss">

.mask-text {
    display: inline-block;
}

.mask-text__target {
    box-sizing: border-box;
    position: relative;
    width: auto; height: auto;
    display: inline-block;
    overflow: hidden;
    vertical-align: top;
    text-align: inherit;
}
.mask-text__fly {
    box-sizing: border-box;
    position: absolute;
    top: 0; left: 0;
    width: auto; height: auto;
    flex-direction: column;
    text-align: inherit;
    visibility: hidden;
    display: flex;
    pointer-events: none;
    user-select: none !important;
    transform: translateY(0);
    vertical-align: top;

    .st-animate &{
        visibility: visible;
    }

    > span {
        vertical-align: top;
        box-sizing: border-box;
        width: auto;
        position: relative;
        white-space: nowrap;
        display: inline-block;
        text-align: inherit;

        &:nth-child(2) {
            // background-color: #aac;
        }
    }
}

.mask-text__contain {
    box-sizing: border-box;
    position: relative;
    width: auto;
    opacity: 1;
    height: 100%;
    display: inline-block;
    white-space: nowrap;

    .st-animate &{
        // opacity: 0.3;
        opacity: 0;
        // color: #d3d;
    }
}


</style>
