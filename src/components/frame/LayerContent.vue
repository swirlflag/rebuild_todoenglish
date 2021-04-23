<template>
    <transition     name="layer-content"
                    :duration="700"
    >
        <div    class="layer-content"
                v-if="this.modelData.isShow"
        >
            <div class="layer-content__dimmed" @click="close"></div>

            <div class="layer-content__wrap">
                <div class="layer-content__inner">

                    <div class="layer-content__header">
                        <p class="layer-content__title" v-if="!!title">
                            {{ title }}
                        </p>
                        <button class="layer-content__close">
                            <i class="icon--cancel" @click="close"></i>
                        </button>
                    </div>

                    <div class="layer-content__scroll">
                        <div class="layer-content__box">
                            <slot></slot>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </transition>

</template>

<script>
export default {
    name : 'LayerContent',
    model : {
        prop : 'modelValue',
        event : 'modelEvent',
    },

    props: {
        modelValue : Boolean,
        isShow : Boolean,

        title : String,
        hash : String,
    },
    data() {
        return {
            modelData : {
                isShow : false,
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
        '$route.hash'(){
            this.watchHash();
        },
    },
    methods : {
        watchHash() {
            if(this.$route.hash ===  `#${this.hash}` && !this.modelData.isShow){
                this.open();
                this.ignoreHash = true;
                return;
            }

            if(this.$route.hash !== `#${this.hash}` && this.modelData.isShow){
                this.close();
                this.ignoreHash = true;
                return;
            }
        },
        watchModelValue() {
            this.modelValue ? this.open() : this.close();
        },
        watchIsShow(){
            this.isShow ? this.open() : this.close();
        },
        watchModelData() {
            if(!this.ignoreHash && this.hash){
                const hash = this.modelData.isShow ? `#${this.hash}` : null;
                this.$router.push({hash});
            }
            this.ignoreHash = false;

            this.$emit('modelEvent', this.modelData.isShow);
        },

        open(){
            this.modelData.isShow = true;
        },
        close() {
            this.modelData.isShow = false;
        }

    },

    mounted() {
        this.watchHash();
    }
}
</script>

<style lang="scss" scoped >

$outer: 50px;
$mobileCloseHeight : 60px;

.layer-content-leave-active {
    pointer-events: none !important;
}

.layer-content{
    position: fixed;
    width: 100%; height: 100%;
    top: 0;left: 0;
    z-index: 1020;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    pointer-events: all;
    overflow: hidden;

    @include phone {
        align-items: flex-end;
    }
}

.layer-content__dimmed {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background-color: $COLOR_overlayblack;
    z-index: 1;
    transition: opacity 700ms ease;
    .layer-content-enter & ,
    .layer-content-leave-to & {
        opacity: 0;
    }
}

.layer-content__wrap {
    pointer-events: none;

    position: relative;
    z-index: 2;
    box-sizing: border-box;
    width: auto;
    height: 100%;
    // min-height: 100%;

    display: flex;
    justify-content: center;
    align-items:center;

    @include hideScrollbar;

    @include phone {
        // height: calc(100% - #{$SIZE_MO_innerPadding});
        // height: calc(100% - #{30px});
        width: 100%;
        padding : 0;
    }

}

.layer-content__inner {
    width: 100%;
    max-height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start;
    position: relative;

    @include phone {
        height: 100%;
        flex-direction: column;
    }
}


.layer-content__header{
    pointer-events: all;
    position: absolute;
    top: $outer;
    left: 100%;
    box-sizing: border-box;
    transition: opacity 300ms ease 400ms, transform 300ms $EASE_outCubic 400ms;
    transform : translate3d(0,0,0);

    opacity: 1;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;

    @include phone {
        padding: $SIZE_MO_innerPadding;
        top: 0; left: 0;
        width: 100%;
        z-index: 3;
        height: $mobileCloseHeight;
        flex : 0 0 $mobileCloseHeight;
        background-color: #fff;
        // background-color: rgba(255,255,255,0.9 );
        display: flex;
        align-items: center;
        box-shadow: 0 3px 4px rgba(0,0,0,0.1);
        transition: transform 600ms $EASE_outExpo 150ms;
        will-change: transform;
        position: relative;
    }

    .layer-content-enter & ,
    .layer-content-leave-to & {
        transition: opacity 300ms ease, transform 300ms $EASE_outCubic 400ms;
        transform : translate3d(0,-100%,0);
        opacity: 0;

        @include phone {
            transition: transform 450ms $EASE_inOutCubic;
            opacity: 1;
        }
    }

    .layer-content__title {
        justify-self: center;
        display: none;
        font-weight: 700;
        font-size: $SIZE_MO_fontsize_strong;
        color: #000;
        @include phone {
            display: inline-block;
        }
    }

    .layer-content__close {
        cursor: pointer;
        box-sizing: border-box;
        margin-left: auto;
        @include phone {
            height: 100%;
            position: absolute;
            right: $SIZE_MO_innerPadding;
            bottom: 0;
            top: 0;
        }

        .icon--cancel {
            background-image: url('~@/assets/icon/icon_cancel_white.svg');
            @include phone {
                transform-origin: right;
                transform: scale(0.75);
                background-image: url('~@/assets/icon/icon_cancel.svg');
            }
        }
    }
}





.layer-content__scroll {
    position: relative;
    height: auto;

    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    max-height: 100%;
    box-sizing: border-box;
    // padding : $SIZE_PC_innerPadding;
    padding: $outer 20px;
    pointer-events: all;

    transition: transform 750ms $EASE_outExpo ,
                opacity 0ms ease 0ms
    ;
    opacity: 1;
    transform: translate3d(0,0,0);

    @include hideScrollbar;

    @include phone {
        background-color: #fff;
        padding: 0;
        // margin-top: $mobileCloseHeight;
        margin-top: 0;
        transition: transform 750ms $EASE_outExpo;
        padding-bottom: $mobileCloseHeight;
        min-height: 100%;
    }

    .layer-content-enter & ,
    .layer-content-leave-to & {
        transition: transform 400ms $EASE_inCubic ,
                    opacity 300ms $EASE_outCubic
        ;

        transform : translate3d(0,100vh,0);
        opacity: 0;

        @include phone {
            opacity: 1;
            transition: transform 480ms $EASE_inOutCubic;
        }
    }


}



.layer-content__box {

    pointer-events: all;
    position: relative;
    overflow: hidden;
    border-radius: 14px;
    height: auto;
    background-color: #fff;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);

    @include phone {
        // margin-top: $mobileCloseHeight;
        // padding-top: 60px;
        // border: 1px solid #000;
        border-radius: 0;
        height: auto;
        box-shadow: none;
    }





}
</style>