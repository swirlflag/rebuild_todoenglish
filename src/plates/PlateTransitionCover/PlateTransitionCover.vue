<template>
    <div    id="plate--transition"
            class="plate"
            :class="{'st-active' : $store.state.$paging.isEnable }"
    >
        <div class="transition__curtain" ref="ref_curtain">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="transition__cover" :class="`st-lean-${coverLeanDirection ? 'left' : 'right'}`" ref="ref_cover">
            <div class="transition__cover-inner">
                <img src="@/assets/logo/logo_todoenglish.svg" alt="">
                <SpinnerColordotsWave v-if="0"/>
            </div>
        </div>

    </div>
</template>

<script>

import gsap from 'gsap';
import { iterElement } from '@/utils';
import SpinnerColordotsWave from '@/components/spinner/SpinnerColordotsWave.vue'

export default {

    name : 'PlateTransitionCover',
    components : {
        SpinnerColordotsWave
    },
    data() {
        return {
            transitionActive : false,
            curtains : null,

            direction   : true,
            reverse     : true,

            coverDelay : 200,
            uncoverDelay : 200,

            coverLeanDirection : true,

            time : {
                duration : 0.9,
                stagger : 0.04,
            },

        }
    },

    watch : {
        '$store.state.$paging.isCover'(now) {
            if(now){
                this.setRandom();
                setTimeout(() => {
                    this.coverd();
                },this.coverDelay)
            }else {
                setTimeout(() => {
                    this.uncovered();
                },this.uncoverDelay)
            }
        }
    },

    methods :  {
        changeLean(value) {
            this.coverLeanDirection = value;
        },
        reverseLean () {
            this.coverLeanDirection = !this.coverLeanDirection;
        },
        setRandom() {
            this.direction  = Math.random() > 0.5;
            this.reverse    = Math.random() > 0.5;
        },

        coverd() {
            this.changeLean(this.reverse)

            // this.transitionActive = true;

            let delay = 0;

            iterElement(this.curtains , (target,idx) => {
                gsap.fromTo(target , {
                    xPercent : 101 * (this.reverse?1:-1) ,
                }, {
                    xPercent : 0,
                    duration : this.time.duration,
                    delay : delay,
                    ease : 'power4.out',
                    onComplete : () => {
                        if(idx === 0){
                            this.reverseLean();
                            this.$store.state.$paging.next();
                        }
                        // if(idx === this.curtains.length - 1){
                        //     this.uncovered();
                        // }
                    }
                });

                delay += this.time.stagger;
            });

            gsap.fromTo(this.$refs.ref_cover , {
                width : 0,
            }, {
                width: 101 + (this.reverse?1:-1) + '%',
                ease: 'power3.out',
                duration : this.time.duration,
                delay : delay
            });

            this.$store.commit('PAGING_enable');
        },

        uncovered() {
            gsap.to(this.$refs.ref_cover , {
                width: 0,
                ease: 'power2.inOut',
                duration : this.time.duration,
            })

            const curtains = [...this.curtains].reverse();

            iterElement(curtains , (target,idx) => {
                gsap.to(target, {
                    xPercent : 101 * (this.reverse?-1:1),
                    ease : 'power2.inOut',
                    duration : this.time.duration,
                    delay : this.time.stagger * (idx+1),
                    onComplete : () => {
                        if(idx === this.curtains.length - 1){
                            this.$store.commit('PAGING_disable');
                        }
                    }
                })
            })
        },

    },
    mounted () {
        this.curtains = this.$refs.ref_curtain.querySelectorAll('span');
    },

}

export const transitionStore = {
    name : '$paging',
    state : {
        isEnable : false,
        isCover : false,
        next : () => {console.dev('ERC_PT1')},
    },
    mutations : {
        PAGING_enable(state) {
            state.$paging.isEnable = true;
        },
        PAGING_disable(state) {
            state.$paging.isEnable = false;
        },
        PAGING_registNext(state, next) {
            state.$paging.next = next;
        },
        PAGING_cover(state) {
            state.$paging.isCover = true;
        },
        PAGING_uncover(state) {
            state.$paging.isCover = false;
        },

    },

    actions : {
        coverPage(context, next) {
            context.commit('PAGING_registNext', next);
            context.commit('PAGING_cover');
        },
        uncoverPage(context) {
            context.commit('PAGING_uncover');
        }
    },
}

</script>

<style scoped lang="scss">

#plate--transition{
    position: fixed;
    z-index: 1010;
    width: 100vw; height: 100%;
    box-sizing: border-box;
    background: transparent;
    // opacity: 0;
    // pointer-events: none;
    display: none;
    &.st-active {
        opacity: 1;
        pointer-events: all;
        display: block;
    }
}

.transition__curtain {
    width: 100%; height: 100%;
    box-sizing: border-box;
    display: block;
    position: absolute;

    span {
        position: absolute;
        width: 100%; height: 100%;
        display: inline-block;
        box-sizing: border-box;
        z-index: 1000;

        &:nth-child(1) {
            background-color: #f7419c;
        }
        &:nth-child(2) {
            background-color: #372c77;
        }
        &:nth-child(3) {
            background-color: #9857db;
        }
        &:nth-child(4) {
            background-color: #fff;
        }

    }
}

.transition__cover {
    background: #fff;
    box-sizing: border-box;
    width: 0; height: 100%;
    position: absolute;
    top: 0;
    z-index: 1100;
    overflow: hidden;
    will-change: width;

    .transition__cover-inner {
        box-sizing: border-box;
        position: absolute;
        width: 100vw; height: 100%;
        top: 0;
        left :unset; right: unset;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .spinner--colordots {
            margin-top: 30px;
        }

    }
    &.st-lean-left {
        right: 0 !important;
        .transition__cover-inner {right: 0 !important;}
    }
    &.st-lean-right {
        left: 0 !important;
        .transition__cover-inner {left: 0 !important;}
    }

}

</style>