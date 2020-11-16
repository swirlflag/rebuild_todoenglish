<template>
    <div    id="plate--transition"
            class="plate"
            :class="{'st-active' : transitionActive }"
    >
        <div class="transition__curtain" ref="ref_curtain">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>

import gsap from 'gsap';
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
        }
    },

    watch : {
        '$store.state.pageTransition.trigger'() {
            this.setRandom();
            this.coverd();
        }
    },

    methods :  {
        setRandom() {
            this.direction  = Math.random() > 0.5;
            this.reverse    = Math.random() > 0.5;
        },

        coverd() {
            const _this = this;

            const direction = [this.direction ? 'x' : 'y' ,this.direction ? 'y' : 'x'];

            iterElement(this.curtains , (target,idx) => {
                _this.transitionActive = true;
                gsap.fromTo(target , {
                    [direction[0]] : `${this.reverse ? '-' : ''}100%`,
                    [direction[1]] : 0,
                }, {
                    'x' : 0,
                    'y' : 0,
                    duration : 0.6,
                    delay : idx * 0.1,
                    ease : 'power2.in',
                    onComplete (){
                        if(idx === 0){
                            _this.$store.state.pageTransition.next();
                        }
                        if(idx === _this.curtains.length - 1){
                            _this.uncovered();
                        }
                    }
                });
            });
        },

        uncovered() {
            const _this = this;
            const direction = [this.direction ? 'x' : 'y' ,this.direction ? 'y' : 'x'];

            gsap.to(this.curtains ,{
                [direction[0]] : `${this.reverse ? '' : '-'}100%`,
                duration : 0.6,
                stagger : -0.1,
                ease : 'power2.out',
                onComplete(){
                    _this.transitionActive = false;
                }
            })
        },

    },
    mounted () {
        this.curtains = this.$refs.ref_curtain.querySelectorAll('span');
    },

}

export const transitionStore = {
    name : 'pageTransition',
    state : {
        trigger : false,
        isTransitionPaging : false,
        next : () => {},
    },
    mutations : {
        pageTransition(state , bool) {
            state.pageTransition.trigger = bool === undefined ? !state.pageTransition.trigger : bool;
        },
        registTransitionNext(state, next) {
            state.pageTransition.next = next;
        },
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
    opacity: 0;
    pointer-events: none;
    &.st-active {
        opacity: 0.3;
        opacity: 1;
        pointer-events: all;
    }

}

.transition__curtain {
    width: 100%; height: 100%;
    box-sizing: border-box;
    display: block;
    position: relative;

    span {
        position: absolute;
        width: 100%; height: 100%;
        display: inline-block;
        box-sizing: border-box;

        &:nth-child(1) {
            background-color: #f7419c;
        }
        &:nth-child(2) {
            background-color: #372c77;
        }
        &:nth-child(3) {
            background-color: #9857db;
        }

    }
}
</style>