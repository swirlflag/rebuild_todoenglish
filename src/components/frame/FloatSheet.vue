<template>
    <transition name="float-sheet" :duration="700">
        <div    v-if="this.modelData.isShow || beforeObserve"
                class="float-sheet"
                :class="{'st-beforeobserve' : beforeObserve}"
                ref="ref_root"
        >
            <div    class="float-sheet__dimmed"
                    @click="close"
            >
            </div>

            <div    class="float-sheet__wrap"
                    ref="ref_wrap"
            >
                <div class="float-sheet__header" v-if="!headerless">
                    <p class="float-sheet__title">
                        {{ title }}
                    </p>
                    <button class="float-sheet__close"
                            @click="close"
                    >
                        <i class="icon--cancel"></i>
                    </button>

                </div>
                <div    class="float-sheet__box"

                >
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

import { targetPathDetect } from '@/utils';

export default {
    name : "FloatSheet",
    model : {
        prop : 'modelValue',
        event : 'modelEvent',
    },
    props : {
        modelValue : Boolean,
        isShow : Boolean,

        title : String,

        headerless : Boolean,
        point : null,
    },
    data() {
        const isShow = this.modelValue || this.isShow;

        return {

            beforeObserve : true,

            prevSibling : null,

            gap : 10,

            modelData : {
                isShow,
                point : this.target,
            },

            position : {
                x :0,
                y : 0,
                overX : false,
                overY : false,
            },

            tl : new this.$gsap.timeline(),
        }
    },
    computed : {
        isMobile() {
            return this.$screen.isMobileSize;
        }
    },
    watch : {
        'point'(){
            this.registPoint();
        },
        'modelValue'() {
            this.control(this.modelValue)
        },
        'isShow'() {
            this.control(this.isShow);
        },
        'modelData.isShow'() {
            this.watchModelData();
        },
    },
    methods : {
        control(bool){
            bool ? this.open() : this.close();
        },
        open(){
            this.modelData.isShow = true;
        },
        close() {
            this.modelData.isShow = false;
        },

        watchModelData() {
            this.calcPosition();
            this.$emit('modelEvent', this.modelData.isShow);

            if(!this.isMobile && this.modelData.isShow){
                this.bindPcEvents();
            }else {
                this.unbindPcEvents();
            }
        },

        registPoint(){
            if(this.point){
                if(this.point._isVue){
                    this.modelData.point = this.point.$el;
                }else {
                    this.modelData.point = this.point;
                }
            }else {
                this.modelData.point = this.$refs.ref_root.previousSibling;
            }
        },

        calcPosition() {
            if(this.isMobile || !this.modelData.isShow){
                return;
            }

            const point = this.modelData.point;
            const rect = point.getBoundingClientRect();
            const screen = this.$screen;
            const isOutside =   rect.y + rect.height < 0
                            ||  rect.x + rect.width < 0
                            ||  rect.y > screen.height
                            ||  rect.x > screen.width;

            if(isOutside){
                this.close();
                return;
            }

            if(!this.$refs.ref_wrap){

                setTimeout(() => {
                    const wrap = this.$refs.ref_wrap;

                    const overX = wrap.offsetWidth > screen.width - rect.x;
                    const overY = wrap.offsetHeight > screen.height - rect.y - rect.height;

                    this.position = {
                        x : rect.x - (overX ? wrap.offsetWidth - rect.width : 0),
                        y : rect.y - (overY ? wrap.offsetHeight + rect.height + this.gap : -this.gap) + rect.height,
                    };

                    wrap.style.left = this.position.x + 'px';
                    wrap.style.top  = this.position.y + 'px';

                },0);

            }else {
                const wrap = this.$refs.ref_wrap;

                let willX = rect.x - this.position.x;
                let willY = rect.y - this.position.y + rect.height + this.gap;

                if(wrap.offsetWidth > screen.width - rect.x){
                    willX -= wrap.offsetWidth - point.offsetWidth
                }

                if(wrap.offsetHeight > screen.height - rect.y - rect.height - this.gap){
                    willY -= wrap.offsetHeight + point.offsetHeight + this.gap*2
                }

                this.tl.clear();

                this.tl.to(wrap, {
                    x : willX ,
                    y : willY ,
                    ease : 'power2.out',
                    duration : 0.4,
                })

                // wrap.style.transform = `translate3d(${willX}px,${willY}px,0)`;

            }

        },

        detectPath(e) {
            const isPathClick = targetPathDetect(e,this.$refs.ref_wrap , this.modelData.point);

            if(!isPathClick){
                this.close();
            }
        },

        bindPcEvents() {
            setTimeout(() => {
                window.addEventListener('scroll' , this.calcPosition);
                window.addEventListener('resize' , this.close);
                window.addEventListener('mousedown' , this.detectPath);
            },0)
        },
        unbindPcEvents() {
            window.removeEventListener('scroll' , this.calcPosition);
            window.removeEventListener('resize' , this.close);
            window.removeEventListener('mousedown' , this.detectPath)
        },

    },
    mounted() {

        this.registPoint();
        this.beforeObserve = false;

        


    },

    beforeDestroyed() {
        this.unbindPcEvents();
    },
}

</script>

<style lang="scss" scoped>
$tempPadding : 30px;

.float-sheet {
    position: fixed !important;
    // position: absolute;
    width: 100% !important; height: 100% !important;
    max-width: unset !important; min-width : unset !important;
    max-width: unset !important; min-width : unset !important;
    // width: 100vw; height: 100vh;

    top: 0 !important; left: 0 !important;
    z-index: 1020;
    box-sizing: border-box;
    display: flex !important;
    align-items: flex-start !important;
    // border: 3px solid #3d3;

    @include overPhone {
        pointer-events: none;
    }

    @include phone {
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
    }

    &.float-sheet-leave-to{
        pointer-events: none;
    }

    &.st-beforeobserve {
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        * {
            transition: none !important;
        }
    }
}

.float-sheet__dimmed {
    width: 100%; height: 100%;
    position: absolute;
    box-sizing: border-box;
    top: 0; left: 0;
    display: inline-block;
    background: rgba(0,0,0,0.4);
    z-index: 1;
    transition: opacity 700ms ease;

    @include overPhone {
        background: rgba(255,0,255,0.4);
        display: none;
    }
    .float-sheet-enter & ,
    .float-sheet-leave-to &{
        opacity: 0;
    }
}

.float-sheet__wrap {
    // max-height: 60vh;
    // margin: 50px;
    margin-bottom: 0;
    z-index: 2;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);

    border-radius: 14px;
    overflow: hidden;
    transform : translate3d(0,0,0);

    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    position: relative;
    pointer-events: all;
    will-change: transform;

    @include overPhone {
        max-width : 520px;
        max-height: 520px;

        .float-sheet-enter & {
            opacity: 0;
            transform : translate3d(0,30px,0);
        }
        .float-sheet-enter-to &{
            transition : transform 700ms $EASE_outExpo , opacity 400ms ease;
        }
        .float-sheet-leave-to &{
            opacity: 0;
            pointer-events: none;
            transition : opacity 250ms ease;
        }
    }

    @include phone {
        border-radius: 14px 14px 0 0 ;
        margin: 0;
        width: 100%;
        max-height: 77%;
        top: 0 !important; left: 0 !important;
        transform : translate3d(0,0,0) !important;

        .float-sheet-enter &{
            transform : translate3d(0,101%,0) !important;
        }
        .float-sheet-enter-to &{
            transition : transform 700ms $EASE_outExpo;
        }
        .float-sheet-leave-to &{
            transform : translate3d(0,101%,0) !important;
            transition : transform 420ms $EASE_inOutCubic;
        }
    }

}

.float-sheet__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // height: 60px;
    padding: $tempPadding/1.3 $tempPadding;
    // box-shadow : 0 $tempPadding/2 $tempPadding/2 #fff;
    box-shadow: 0 3px 5px rgba(0,0,0,0.1);
    z-index: 2;
    position: relative;
    display: none;
    @include phone {
        display: flex;
        // padding: $SIZE_MO_innerPadding;
        padding-left: $SIZE_MO_innerPadding;
        padding-right: $SIZE_MO_innerPadding;
    }

    .float-sheet__title {
        color: #000;
        font-weight: 700;
        font-size: $SIZE_PC_fontsize_strong;
        @include phone {
            font-size: $SIZE_MO_fontsize_strong;
        }
    }
    .float-sheet__close {
        margin-left: 20px;
        display: inline-flex;
        justify-self: center;
        align-items: center;
        i {
            width: 18px; height: 18px;
        }
    }

}

.float-sheet__box {
    @include hideScrollbar;

    height: 100%;

    overflow-x : hidden;
    overflow-y: scroll;
    box-sizing: border-box;


    @include phone {
        width: 100%;
    }

}

// .float-sheet__wrap {
//     z-index: 2;
//     display: flex;
//     flex-direction: column;
//     height: 100%;
//     max-width : $SIZE_PC_contentWidth;
//     min-width : 480px;

//     max-height: 500px;
//     border-radius: 20px 20px 0 0 ;
//     overflow: hidden;
//     box-shadow: 0 0px 12px rgba(0,0,0,0.2);
// }

// .float-sheet__header{
//     display: flex;
//     padding: $tempPadding $tempPadding;
//     text-align: center;
//     align-items: center;
//     height: 70px;
//     flex : 0 0 70px;
//     box-sizing: border-box;
//     background-color: #fff;

//     .float-sheet__title {
//         // font-size: $SIZE_PC_fontsize_large ;
//         font-size: $SIZE_PC_fontsize_strong ;
//         font-weight: 700;
//     }
//     .float-sheet__close {
//         display: inline-block;
//         margin-left: auto;
//         box-sizing: border-box;
//         i {
//             width: 20px; height: 20px;
//         }
//     }
// }

// .float-sheet__box {
//     vertical-align: top;
//     overflow-y: scroll;
//     @include hideScrollbar;
//     display: inline-block;
//     box-sizing: border-box;
//     background: rgba(255,255,255,0.9);

//     // padding-top:$tempPadding/2; padding-bottom:$tempPadding/2;
//     margin-top: $tempPadding/2;
//     // margin-bottom: $tempPadding/2;
//     > * {
//         padding-left:$tempPadding; padding-right:$tempPadding;
//     }
// }





</style>