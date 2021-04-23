<template>
    <transition name="bottom-sheet" :duration="700">
        <div    v-if="this.modelData.isShow || beforeObserve"
                class="bottom-sheet"
                :class="{'st-beforeobserve' : beforeObserve}"
                ref="ref_root"
        >
            <div    class="bottom-sheet__dimmed"
                    @click="close"
            >
            </div>

            <div    class="bottom-sheet__wrap"
                    ref="ref_wrap"
            >
                <div class="bottom-sheet__header" v-if="!headerless">
                    <p class="bottom-sheet__title">
                        {{ title }}
                    </p>
                    <button class="bottom-sheet__close"
                            @click="close"
                    >
                        <i class="icon--cancel"></i>
                    </button>

                </div>
                <div    class="bottom-sheet__box"

                >
                    <slot></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
    name : "BottomSheet",
    model : {
        prop : 'modelValue',
        event : 'modelEvent',
    },
    props : {
        modelValue : Boolean,
        isShow : Boolean,

        title : String,

        headerless : Boolean,
        target : null,
    },
    data() {
        const isShow = this.modelValue || this.isShow;

        return {

            beforeObserve : true,

            prevSibling : null,
            modelData : {
                isShow,
                trigger : this.target,
            }
        }
    },
    watch : {
        'modelValue'() {
            this.watchModelValue();
        },
        'isShow'() {
            this.watchIsShow();
        },
        'modelData.isShow'() {
            this.watchModelData();
        },
    },
    methods : {
        watchModelValue() {
            this.modelValue ? this.open() : this.close();
        },
        watchIsShow(){
            this.isShow ? this.open() : this.close();
        },
        watchModelData() {
            this.calcPosition();
            this.$emit('modelEvent', this.modelData.isShow);

        },

        open(){
            this.modelData.isShow = true;
        },
        close() {
            this.modelData.isShow = false;
        },

        calcPosition() {
            if(this.$screen.isMobileSize || !this.modelData.isShow){
                return
            }

            setTimeout(() => {
                const wrap = this.$refs.ref_wrap;
                const trigger = this.modelData.trigger;

                const screen = this.$screen;

                {wrap, trigger}

                const triggerRect = trigger.getBoundingClientRect();

                // console.log(triggerRect);

                // if(triggerRect.top){

                // }

                const triggerMargin = {
                    left : triggerRect.x,
                    right : screen.width - (triggerRect.x + triggerRect.width),
                }

                console.log(triggerMargin);

                // const centerX = scrren.width - 

                // console.log(triggerMargin);

                if(triggerMargin.left > triggerMargin.right){
                    wrap.style.left = (triggerRect.left - wrap.offsetWidth )+ 'px';
                }else {
                    wrap.style.left = triggerRect.left + triggerRect.width + 'px';
                }

                // wrap.style.top = triggerRect.y + 'px';


            },0);

        },

        setObserver() {

            if(this.trigger){
                this.modelData.trigger = this.target;
            }else {
                this.modelData.trigger = this.$refs.ref_root.previousSibling;
            }

            const options = {
                rootMargin: '0px',
                threshold: [1.0, 0.5,0.2]
            }


            const io = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    console.log(io,entry);
                    if (entry.intersectionRatio > 0) {
                        // entry.target.classList.add('tada');
                        entry.target.innerText = '123';
                    }
                    else {
                        entry.target.innerText = 'hoooooooo';
                        // entry.target.classList.remove('tada');
                    }
                })
            })


            io.observe(this.modelData.trigger , options);

            this.beforeObserve = false;
        },

    },
    mounted() {
        this.setObserver();
    },
}

</script>

<style lang="scss" scoped>
$tempPadding : 30px;

.bottom-sheet {
    position: fixed;
    width: 100% !important; height: 100% !important;
    top: 0; left: 0;
    z-index: 1020;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;

    @include overPhone {
        pointer-events: none;
    }

    @include phone {
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
    }

    &.bottom-sheet-leave-to{
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

.bottom-sheet__dimmed {
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
    .bottom-sheet-enter & ,
    .bottom-sheet-leave-to &{
        opacity: 0;
    }
}

.bottom-sheet__wrap {
    // max-height: 60vh;
    // margin: 50px;
    margin-bottom: 0;
    z-index: 2;
    background-color: #fff;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);

    // border-radius: 14px 14px 0 0 ;
    overflow: hidden;
    transform : translate3d(0,0,0);

    border:2px dashed #d3d;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    position: relative;
    pointer-events: all;

    @include overPhone {
        max-width : 520px;
        max-height: 520px;

        transition : transform 700ms $EASE_outExpo ,opacity 400ms ease;
        .bottom-sheet-enter &{
            opacity: 0;
            transform : translate3d(0,-30px,0) scale(0.9);
            transition : transform 700ms $EASE_outExpo , opacity 400ms ease;
        }
        .bottom-sheet-leave-to &{
            opacity: 0;
            transform : translate3d(0,30px,0) scale(0.9);
            transition : transform 300ms $EASE_inCubic, opacity 300ms ease;
        }
    }

    @include phone {
        margin: 0;
        width: 100%;
        max-height: 77%;
        transition : transform 700ms $EASE_outExpo;

        .bottom-sheet-enter &{
            transform : translate3d(0,101%,0);
            transition : transform 700ms $EASE_outExpo;
        }
        .bottom-sheet-leave-to &{
            transform : translate3d(0,101%,0);
            transition : transform 420ms $EASE_inOutCubic;
        }
    }

}

.bottom-sheet__header {
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

    .bottom-sheet__title {
        color: #000;
        font-weight: 700;
        font-size: $SIZE_PC_fontsize_strong;
        @include phone {
            font-size: $SIZE_MO_fontsize_strong;
        }
    }
    .bottom-sheet__close {
        margin-left: 20px;
        display: inline-flex;
        justify-self: center;
        align-items: center;
        i {
            width: 18px; height: 18px;
        }
    }

}

.bottom-sheet__box {
    @include hideScrollbar;

    height: 100%;

    // border: 1px solid #000;

    overflow-x : hidden;
    overflow-y: scroll;
    box-sizing: border-box;


    @include phone {
        width: 100%;
    }

}

// .bottom-sheet__wrap {
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

// .bottom-sheet__header{
//     display: flex;
//     padding: $tempPadding $tempPadding;
//     text-align: center;
//     align-items: center;
//     height: 70px;
//     flex : 0 0 70px;
//     box-sizing: border-box;
//     background-color: #fff;

//     .bottom-sheet__title {
//         // font-size: $SIZE_PC_fontsize_large ;
//         font-size: $SIZE_PC_fontsize_strong ;
//         font-weight: 700;
//     }
//     .bottom-sheet__close {
//         display: inline-block;
//         margin-left: auto;
//         box-sizing: border-box;
//         i {
//             width: 20px; height: 20px;
//         }
//     }
// }

// .bottom-sheet__box {
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