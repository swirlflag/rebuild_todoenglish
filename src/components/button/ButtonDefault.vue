<template>
    <button     class="button--default"
                :class="`${isPressButton ? 'st-press' :''} ${theme ? `theme-${theme}` : ''}`"
                ref="ref_root"
                @click="(e) => clickButton(e)"

                @mousedown="pressButton"
                @mouseup="releaseButton"
                @mouseleave="releaseButton"
                @touchstart="pressButton"
                @touchend="releaseButton"

    >
        <span class="button__inner"
                :style="{
                    borderRadius : `${radius}px`,
                }"
        >

            <span   class="button__body"
                    :style="{
                        color : color,
                        backgroundColor : background,
                        padding : padding,
                    }"
            >
                <span class="button__flash"></span>

                <slot></slot>

            </span>

            <span   class="button__shadow"
                    :style="{
                        boxShadow : `0 7px 0 ${shadow}`,
                    }"
            >
            </span>

            <span class="button__particle" ref="ref_particle" :class="{'st-show' : stateAnimate.isRun}">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </span>

        </span>

    </button>
</template>

<script>

import { gsap , TimelineMax } from 'gsap';
import { iterElement, randomOne , randomRange} from '@/utils';

const randomNegative = (v) => v*randomOne(-1,1);
const randomPercent = (v = 100) => Math.floor(Math.random()*v);
const randomNegativePercent = (v = 100) => randomNegative(randomPercent(v));

export default {
    props : {
        to          : String,
        href        : String,
        blank       : Boolean,

        theme       : String,
        radius      : null,
        color       : String,
        background  : String,
        shadow      : String,
        padding     : String,
    },
    data() {
        return {
            ref_particles : null,

            isPressButton : false,

            stateAnimate : {
                isRun : false
            },
        }
    },
    methods : {
        clickAnimate() {
            if(this.stateAnimate.isRun){
                return;
            }

            this.stateAnimate.isRun = true;

            const rect = this.$refs.ref_root.getBoundingClientRect();
            const maxX  = rect.width/1.9;
            const maxY  = rect.height/1.9;

            const tl = new TimelineMax();
            tl.pause();

            const finishLength = this.ref_particles.length;
            let particleCompleteCount = 0;

            const staggerTime = 0.007;

            iterElement(this.ref_particles , (item,idx) => {

                const limitDirection = Math.random() > 0.5;
                const delay = idx * staggerTime;

                let x = limitDirection ? randomNegative(maxX) : randomNegativePercent(maxX);
                let y = limitDirection ? randomNegativePercent(maxY) : randomNegative(maxY);

                x = randomRange(x,x*2,2);
                y = randomRange(y,y*2,2);

                tl.set(item, { css : {opacity : 1}},idx * staggerTime )

                tl.to(item, {
                    x,
                    y,
                    scale : randomRange(1.4, 2.8 ,3),
                    rotate : randomPercent(553),
                    ease: 'power3.out',
                    duration : 0.8,
                    onComplete : () => {
                        if(finishLength === ++particleCompleteCount){
                            gsap.set(this.ref_particles ,{
                                css : {
                                    rotate : 0,
                                    x : 0,
                                    y : 0,
                                    scale : 1,
                                }
                            });

                            this.stateAnimate.isRun = false;
                        }
                    }
                },delay);

                tl.to(item , {
                    opacity : 0,
                    ease : 'power2.in',
                    duration : 0.3,
                    delay : 0.2,
                },delay);

            },{});

            tl.play();

        },

        clickLink() {

            if(this.to){

                this.$router.push(this.to)

            } else if (this.href) {

                if(this.blank){
                    const targetBlank = window.open('about:blank');
                    targetBlank.location.href = this.href;
                }else {
                    window.location.href = this.href
                }

            }
        },

        clickButton(e) {
            // this.clickAnimate();
            this.clickLink();

            this.$emit('click',e);
        },

        pressButton() {
            this.isPressButton = true;
        },
        releaseButton() {
            this.isPressButton = false;
        },
    },
    mounted() {
        this.ref_particles = this.$refs.ref_particle.querySelectorAll('span');
    }
}
</script>

<style scoped lang="scss">
$thickness : 5px;
$hoverjump : 10px;
$radius : 25px;

.button--default {

    box-sizing: border-box;
    position:relative;
    width : auto;
    transition : text-shadow 130ms ease;
    font-weight: bold;

    @include phone {
        width: 100%;
        // font-size: 14px;
    }

    span {
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
    }

    @include hover {

        .button__inner {
            box-shadow:  0 $thickness+$hoverjump 5px rgba(0,0,0,0.1);
            text-shadow : 0 3px 2px rgba(0,0,0,0.15);
            transition : transform 380ms $EASE_outBack3 , box-shadow 380ms $EASE_outCubic;
            transform : translate3d(0,-$hoverjump,0);
        }

        .button__flash {
            background-color: rgba(255,255,255,0.09);
            &::before {
                background-color: rgba(255,255,255,0.23);
                background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%);;
                left: 105%;
                transition : left 450ms $EASE_outQuart;
            }
        }

        &.st-press {
            .button__inner {
                transform : translate3d(0,-$hoverjump/1.4,0);
            }
        }
    }

    &.theme-navy {
        .button__body { background-color: $COLOR_navy_2; color: #fff;}
        .button__shadow { box-shadow : 0 $thickness 0 rgb(14, 5, 60);}
    }
    &.theme-white {
        .button__body { background-color: #fff; color: $COLOR_navy_2;}
        .button__shadow { box-shadow : 0 $thickness 0 rgb(94, 87, 126);}
    }
    &.theme-pink {
        .button__body { background-color: #F7419C; color: #fff;}
        .button__shadow { box-shadow : 0 $thickness 0 #DF2B85;}
    }
    &.type-signin-kakao {
        .button__body {background-color: $COLOR_kakaoYellow; color: $COLOR_kakaoBrown;}
        .button__shadow { box-shadow : 0 $thickness 0 #EBD300;}
    }
    &.type-signin-google {
        .button__body { border-color: #4285F4;}
    }
    &.theme-navy , &.theme-white , &.theme-pink , &.type-signin-kakao {
        .button__body {
            border: none !important;
        }
    }

}

.button__inner {

    width: 100%; height: 100%;
    border-radius: $radius;
    transform : none;
    box-shadow:  0 $thickness+$hoverjump 5px rgba(0,0,0,0);
    transition : transform 450ms $EASE_outCubic , box-shadow 450ms ease;
    box-sizing: border-box;

    .button__body {
        width: 100%;
        // padding: 15px 30px;
        // padding: 17px 30px;
        padding: 17px 30px;
        min-width : 180px;

        position: relative;
        background-color: #fff;
        // background: #aaa;
        // color: #fff;
        border-radius: inherit;
        transition: transform 190ms $EASE_inOutCubic;
        z-index: 1;
        overflow: hidden;
        box-sizing: border-box;
        border: 1px solid $COLOR_navy_1;
        font-size: $SIZE_PC_fontsizeLarge;

        @include phone {
            font-size: $SIZE_MO_fontsizeStrong;
        }

        .st-press & {
            transition: transform 67ms $EASE_outCubic;
            transform : translate3d(0,$thickness - 1px,0);
        };
        .st-hover & {

        };

        .button__flash {
            position: absolute;
            pointer-events: none;
            width: 100%; height: 100%;top: 0; left: 0;
            box-sizing: border-box;
            z-index: 10;
            background-color: transparent;
            transition: background-color 380ms ease;

            &::before {
                content: '';
                display: inline-block;
                position: absolute;
                width: 18%; height: 130%;
                left: -20%; top: -15%;
                transform: skewX(-15deg);
                transition : none;
            }
        }

    }

    .button__shadow {
        position: absolute;
        width: 100%; height: 100%;
        bottom: 0; left: 0;
        border-radius: inherit;
        box-shadow: 0 $thickness 0 rgba(0,0,0,0.145);
    }

}

.button__particle {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    visibility: hidden;

    &.st-show {
        visibility: visible;
    }

    span {
        width: 8px; height: 3px;
        position: absolute;
        z-index: 10;
        top: 50%; left: 50%;
        opacity: 0;
        transform: translate(-50%,-50%);

        background-color: $COLOR_pink_1;
        &:nth-child(2n) {
            background-color: rgb(235, 219, 39);
        }
        &:nth-child(3n) {
            background-color: $COLOR_violet_1;
        }
        &:nth-child(4n) {
            background-color: $COLOR_mint_1;
        }
    }
}


</style>