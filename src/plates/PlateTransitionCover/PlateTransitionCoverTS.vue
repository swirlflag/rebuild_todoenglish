<template>
    <div    id="plate--transition"
            v-if="$store.state.$paging.is_enable"
            class="plate"
            ref="ref_root"
    >
        <div    class="transition__curtain"
                ref="ref_curtain"
        >
            <span></span>
        </div>

        <div    class="transition__cover"
                ref="ref_cover"
        >
            <div class="transition__cover-inner">
                <p v-if="$store.state.$paging.is_cover"> from : {{ $route.path }}</p>
                <p v-else>to : {{ $route.path }} </p>
            </div>
        </div>

    </div>

</template>

<script>

import { iterElement } from '@/utils';
{iterElement}

export default {
    name : 'PlateTransitionCover',

    data() {
        return {
            transitionActive : false,
            curtains : null,

            direction   : true,
            reverse     : true,

            coverDelay : 200,
            uncoverDelay : 200,

            coverLeanDirection : true,
        }
    },

    watch : {
        '$store.state.$paging.is_cover'(now) {
            setTimeout(() => {
                if(now){
                    this.coverd();
                }else {
                    this.uncovered();
                }
            })
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
            const curtain = this.$refs.ref_curtain;

            const duration = 0.43;

            this.$gsap.fromTo(curtain , {
                xPercent : 100,
                // opacity : 0.5,
            } , {
                // opacity : 1,
                xPercent : 0,
                ease : 'power2.out',
                duration,
                onComplete : () => {
                    this.$store.dispatch('uncoveredPage');
                    console.log(1);
                },
            });

            this.$gsap.fromTo(this.$refs.ref_cover , {
                width : 0,
            }, {
                width: '100%',
                ease: 'power2.out',
                duration,
            });

            this.$refs.ref_root.style.opacity = 1;

        },

        uncovered() {
            {iterElement}

            const duration = 0.62;
            const delay = 0.22;

            this.$gsap.to(this.$refs.ref_cover , {
                width: 0,
                ease : 'power3.inOut',
                duration,
                delay,
            });

            this.$gsap.to(this.$refs.ref_curtain ,  {
                xPercent  : -100,
                ease : 'power3.inOut',
                duration,
                delay,
                onComplete : () => {
                    this.$store.commit('PAGING_disable');
                }
            })

        },

    },
    mounted () {
        // this.curtains = this.$refs.ref_curtain.querySelectorAll('span');
    },

}

export const transitionStore = {
    name : '$paging',
    state : {
        is_enable   : false,
        is_cover    : false,
        next        : () => {console.dev('ERC_PT1')},
    },
    mutations : {
        PAGING_enable(state) {
            state.$paging.is_enable = true;
        },
        PAGING_disable(state) {
            state.$paging.is_enable = false;
        },
        PAGING_registNext(state, next) {
            state.$paging.next = next;
        },
        PAGING_cover(state) {
            state.$paging.is_cover = true;
        },
        PAGING_uncover(state) {
            state.$paging.is_cover = false;
        },
        PAGING_goNext(state) {
            state.$paging.next();
            state.$paging.next = () => {};
        },

    },

    actions : {
        coveredPage(context, next) {
            context.commit('PAGING_registNext', next);
            context.commit('PAGING_cover');
            context.commit('PAGING_enable');
        },
        uncoveredPage(context) {
            context.commit('PAGING_goNext');
            context.commit('PAGING_uncover');
        },
    },
}

</script>

<style scoped lang="scss">

#plate--transition{
    position: fixed;
    z-index: 1050;
    width: 100vw; height: 100%;
    box-sizing: border-box;
    background: transparent;
    opacity: 0;
    // opacity: 0;
    // pointer-events: none;
    // display: none;
    // background-color: rgba(255,0,0,0.5);

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
        background-color: rgba(100,100,100,1);
    }
}

.transition__cover {
    box-sizing: border-box;
    width: 0; height: 100%;
    position: absolute;
    top: 0;
    z-index: 1100;
    overflow: hidden;
    will-change: width;

    color: #fff;
    font-weight: 700;

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

        .transition__cover__logo {

        }

        @keyframes floatCharacter {
            0% {
                transform : translate3d(0,10px,0);
            }
            100% {
                transform : translate3d(0,-10px,0);
            }
        }
        .transition__cover__characters {
            position: absolute;
            top: 50%; left: 50%;
            width: 0; height: 0;

            img {

                @keyframes tick1 {
                    0% {transform : rotate(5deg);}
                    100% {transform : rotate(-30deg);}
                }
                @keyframes tick2 {
                    0% {transform : rotate(15deg);}
                    100% {transform : rotate(-20deg);}
                }
                @keyframes tick3 {
                    0% {transform : rotate(-0deg);}
                    100% {transform : rotate(-30deg) translateY(-200%);}
                }
                @keyframes tick4 {
                    0% {transform : rotate(25deg);}
                    100% {transform : rotate(-5deg)}
                }
                position: absolute;


                &:nth-child(1) {
                    top: 50px;
                    right: 100px;
                    filter: drop-shadow(8px 8px 0  $COLOR_violet_1);
                    animation: tick1 800ms steps(2) infinite ;
                    transform-origin: 80%;
                }
                &:nth-child(2) {
                    top: 0;
                    left: 100px;
                    filter: drop-shadow(8px 8px 0 $COLOR_orange_1);
                    animation: tick2 750ms steps(2) infinite;
                    transform-origin: 20%;
                }

                &:nth-child(3) {
                    bottom: 70px;
                    right: 60px;
                    filter: drop-shadow(8px 8px 0 $COLOR_pink_1);
                    animation: tick3 850ms steps(2) infinite;
                    transform-origin: 80%;
                }
                &:nth-child(4) {
                    bottom: 50px;
                    left: 50px;
                    filter: drop-shadow(8px 8px 0 $COLOR_blue_1);
                    animation: tick4 900ms steps(2) infinite;
                    transform-origin: 50%;
                }
            }
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