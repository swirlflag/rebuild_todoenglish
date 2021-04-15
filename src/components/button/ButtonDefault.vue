<template>
    <button     :class="classNames"
                ref="ref_root"
                tabindex="0"

                @click="(e) => onClick(e)"

                @mouseenter="onMouseEnter"
                @mousedown="pressButton"
                @mouseup="releaseButton"
                @mouseleave="onMouseLeave"
                @touchstart="pressButton"
                @touchend="onTouchEnd"
                @focus="onFocus"
                @blur="onBlur"

    >
        <span class="button__inner"
                :style="{
                    borderRadius : `${radius}px`,
                }"
        >

            <span   class="button__body"
                    :style="{
                        color : color,
                        background : background,
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

            <span class="button__particle" ref="ref_particle" :class="{'st-show' : stateAnimate.isRun}" v-show="useParticle">
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
        disable     : Boolean,

        particle    : Boolean,
    },
    data() {
        return {
            ref_particles : null,

            isPressButton : false,
            isHover : false,
            isFocus : false,

            useParticle : this.particle || false,

            stateAnimate : {
                isRun : false
            },
        }
    },
    computed : {
        classNames() {
            return `button--default${this.isPressButton ? ' st-press' :''}${this.theme ? ` theme-${this.theme}` : ''}${this.isHover ? ' st-hover' : ''}${this.disable ? ' st-disable': ''}${this.isFocus ? ' st-focus' :''}`
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
        pressButton() {
            if(this.disable){
                return;
            }
            this.isPressButton = true;
        },
        releaseButton() {
            this.isPressButton = false;
        },


    // Evnet Bind
        onTouchEnd() {
            // this.$refs.ref_root.blur();
            this.releaseButton();
        },
        onFocus() {
            if(this.disable){
                return
            }
            this.isFocus = true;
        },
        onBlur() {
            this.isFocus = false;
        },
        onMouseEnter() {
            if(this.disable){
                return;
            }
            this.isHover = true;
        },
        onMouseLeave() {
            this.isHover = false;
            this.releaseButton();
            this.$refs.ref_root && this.$refs.ref_root.blur();
        },
        onClick(e) {
            if(this.useParticle){
                this.clickAnimate();
            }
            setTimeout(() => {
                this.clickLink();
                this.$emit('click',e);
            },120)
        },
        bindParticle() {
            if(this.useParticle){
                this.ref_particles = this.$refs.ref_particle.querySelectorAll('span');
            }
        }
    },
    mounted() {
        this.bindParticle();
    }
}
</script>

<style scoped lang="scss">
$thickness : 5px;
$hoverjump : 10px;

$PC_radius : 25px;
$MO_radius : 18px;

$PC_padding : 18px 30px #{18px - (floor($thickness/2))};
$MO_padding : 15px;

$min-width : 120px;


.button--default {
    cursor : pointer;
    box-sizing: border-box;
    position:relative;
    width : auto;
    transition : text-shadow 130ms ease , opacity 200ms ease;
    font-weight: bold;
    // width: $min-width;
    min-width:$min-width ;
    // top: #{floor(-$thickness/2)};
    top: #{(-$thickness/2)};
    border-radius: $PC_radius;

    @include phone {
        width: 100%;
        border-radius: $MO_radius;
    }

    &.st-disable {
        opacity: 0.3;
        cursor :default;
        pointer-events: none;
    }

    span {
        display: inline-block;
        vertical-align: top;
        box-sizing: border-box;
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
    &.theme-green {
        .button__body { background-color: #15AB99; color: #fff;}
        .button__shadow { box-shadow : 0 $thickness 0 #0C9A89;}
    }
    &.type-signin-kakao {
        .button__body {background-color: $COLOR_kakaoYellow; color: $COLOR_kakaoBrown;}
        .button__shadow { box-shadow : 0 $thickness 0 #EBD300;}
    }
    &.type-signin-google {
        .button__body { border-color: #4285F4;}
    }
    &.theme-navy , &.theme-pink , &.type-signin-kakao , &.theme-green  {
        .button__body {
            border: none !important;
        }
    }

}

.button__inner {
    width: 100%; height: 100%;
    border-radius: inherit;
    transform : none;
    box-shadow:  0 $thickness+$hoverjump 5px rgba(0,0,0,0);
    transition : transform 450ms $EASE_outCubic , box-shadow 450ms ease;
    box-sizing: border-box;
    position: relative;

    // @include unuseTouch {
        .st-hover & , .st-focus & {
            @include unuseTouch {
                box-shadow:  0 $thickness+$hoverjump 5px rgba(0,0,0,0.1);
                text-shadow : 0 3px 2px rgba(0,0,0,0.15);
                transition : transform 380ms $EASE_outBack3 , box-shadow 380ms $EASE_outCubic;
                transform : translate3d(0,-$hoverjump,0);
            }
        }
    // }

    .st-hover.st-press & {
        @include unuseTouch {
            transform : translate3d(0,-$hoverjump/1.4,0);
        }
    }

    .button__body {
        width: 100%; height: 100%;
        // padding: 15px 30px;
        // padding: 17px 30px;
        padding: $PC_padding;

        display :flex;
        justify-content: center;
        align-items: center;

        position: relative;
        background-color: #fff;
        // background: #aaa;
        // color: #fff;
        border-radius: inherit;
        transition: transform 190ms $EASE_inOutCubic;
        z-index: 1;
        overflow: hidden;
        box-sizing: border-box;
        border: 1px solid COLOR_navy_1(0.7);
        font-size: $SIZE_PC_fontsize_large;

        @include phone {
            font-size: $SIZE_MO_fontsize_strong;
            font-size: $SIZE_MO_fontsize_default;
            padding: $MO_padding;
            min-width : unset;
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

            .st-hover &, .st-focus & {
                @include unuseTouch {
                    background-color: rgba(255,255,255,0.09);
                    &::before {
                        background-color: rgba(255,255,255,0.23);
                        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
                        left: 105%;
                        transition : left 450ms $EASE_outQuart;
                    }
                }

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