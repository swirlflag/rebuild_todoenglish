<template>
    <transition name="popover" :duration="500">
    <!-- <transition name="modal-dialog2" :duration="600"> -->
        <div    v-if="modelData.isShow"
                class="popover"
                :class="classNames"

        >
            <div class="popover__box">
                <span class="popover__anchor"></span>
                <p class="popvoer__message">
                    <slot></slot>
                </p>
                <button class="popover__close" @click="close">
                    <i class="icon--cancel c-white"></i>
                </button>
            </div>
        </div>
    </transition>

</template>

<script>
export default {
    props : {
        position : [String , Array],
        type : String,
        isShow : Boolean,
        modelValue : Boolean,
    },
    model : {
        prop : 'modelValue',
        event : 'modelEvent',
    },
    data() {
        return {
            modelData : {
                isShow : false,
                position : '',
                type : 'default',
            }
        }
    },
    computed : {
        classNames() {
            return `pos--${this.modelData.position} type--${this.type}`
        }
    },
    watch :{
        "modelValue"() {
            this.watchModelValue();
        },
        "isShow"() {
            this.watchIsShow();
        },
        "modelData.isShow"() {
            this.watchModelData();
        },
        "position"(){
            this.setPosition();
        },
    },
    methods : {
        open() {
            this.modelData.isShow = true;
        },
        close() {
            this.modelData.isShow = false;
        },
        watchModelValue() {
            this.modelValue ? this.open() : this.close();
        },
        watchIsShow(){
            this.isShow ? this.open() : this.close();
        },
        watchModelData() {
            this.$emit('modelEvent', this.modelData.isShow);
        },
        setPosition() {
            let position = ['bottom' , 'left'];

            if(this.position){
                let propsPos = [];
                if(typeof this.position === 'string'){
                    propsPos = this.position.replaceAll(' ','').split(',');
                }else {
                    propsPos = this.position;
                }

                if(propsPos.length >= 2){
                    position = [propsPos[0], propsPos[1]];
                }else {
                    const prop = propsPos[0];
                    position[0] = prop;
                    if(prop === 'left' || prop === 'right'){
                        position[1] = 'bottom';
                    }
                    if(prop === 'top' || prop === 'bottom'){
                        position[1] = 'left'
                    }
                    if(prop === 'center'){
                        position = ['bottom' , 'center'];
                    }
                }
            }

            position = position.join('-');

            this.modelData.position = position;
        },
        setModelData() {
            this.watchIsShow();
            this.setPosition();
        },
    },
    mounted() {
        this.setModelData();
    },
}
</script>

<style scoped lang="scss">
$gap : 10px;
.popover {
    position: absolute;
    display: inline-flex;
    box-sizing: border-box;
    z-index: 20;
    // border: 1px solid #d3d;
    // transition: left 1000ms ease , top 1000ms ease , transform 1000ms ease;
    will-change: transform ,top ,left;

    &.pos{
        &--left-top         {left:#{-$gap}; top: 0;  transform : translate3d(-100%,0,0);}
        &--left-center      {left:#{-$gap}; top: 50%;  transform : translate3d(-100%,-50%,0);}
        &--left-bottom      {left:#{-$gap}; top: 100%;  transform : translate3d(-100%,-100%,0);}
        &--right-top        {left:calc(100% + #{$gap}); top: 0;  transform : translate3d(0,0,0);}
        &--right-center     {left:calc(100% + #{$gap}); top: 50%;  transform : translate3d(0,-50%,0);}
        &--right-bottom     {left:calc(100% + #{$gap}); top: 100%;  transform : translate3d(0,-100%,0);}
        &--top-left         {left:0; top:#{-$gap}; transform : translate3d(0,-100%,0);}
        &--top-center       {left:50%; top:#{-$gap};  transform : translate3d(-50%,-100%,0);}
        &--top-right        {left:100%; top:#{-$gap};  transform : translate3d(-100%,-100%,0);}
        &--bottom-left      {left:0; top: calc(100% + #{$gap});  transform : translate3d(0,0,0);}
        &--bottom-center    {left:50%; top: calc(100% + #{$gap});  transform : translate3d(-50%,0,0);}
        &--bottom-right     {left:100%; top: calc(100% + #{$gap});  transform : translate3d(-100%,0,0);}
    }
}


.popover__box {
    display: inline-flex;
    align-items: center;
    padding: 10px 16px;
    border-radius: 8px;
    box-sizing: border-box;
    flex-direction: row;
    position: relative;
    z-index: 11;

    transition: opacity 300ms ease , transform 300ms $EASE_outExpo, margin 200ms ease;
    opacity: 1;
    transform : translate3d(0,0,0);
    white-space: nowrap;

    border : 1px solid transparent;

    .popover-enter & ,
    .popover-leave-to &{
        opacity: 0;
        transform : translate3d(0,10px,0);
        transition: opacity 300ms ease , transform 300ms $EASE_inCubic, margin 200ms ease;
    }

    .type--default & {
        background-color: #fff;
        border-color: #F2F0E9;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.15);
    }

    .type--tooltip & {
        background-color: #9857DB;
        color: #fff;
    }

    .pos--right-top.type--tooltip & ,
    .pos--right-center.type--tooltip & ,
    .pos--right-bottom.type--tooltip &{
        margin-left: 20px;
    }
    .pos--left-top.type--tooltip & ,
    .pos--left-center.type--tooltip & ,
    .pos--left-bottom.type--tooltip &{
        margin-right: 20px;
    }
    .pos--top-left.type--tooltip & ,
    .pos--top-center.type--tooltip & ,
    .pos--top-right.type--tooltip &{
        margin-bottom: 20px;
    }
    .pos--bottom-left.type--tooltip & ,
    .pos--bottom-center.type--tooltip & ,
    .pos--bottom-right.type--tooltip &{
        margin-top: 20px;
    }

}

.popover__anchor {
    position: absolute;
    box-sizing: border-box;
    z-index: 10;
    width: 16px; height: 16px;
    display: none;

    transition: top 300ms $EASE_outCubic, left 300ms $EASE_outCubic, transform 300ms $EASE_outCubic;

    .type--tooltip & {
        display: inline-block;
    }

    .pos--left-top       & { left : 100%; top: $gap; transform : translate3d(-50%,0,0)}
    .pos--left-center    & { left : 100%; top:50%; transform : translate3d(-50%,-50%,0)}
    .pos--left-bottom    & { left : 100%; top:calc(100% - #{$gap}); transform : translate3d(-50%,-100%,0)}
    .pos--right-top      & { left : 0; top: $gap; transform : translate3d(-50%,0,0)};
    .pos--right-center   & { left : 0; top: 50%; transform : translate3d(-50%,-50%,0)};
    .pos--right-bottom   & { left : 0; top: calc(100% - #{$gap}); transform : translate3d(-50%,-100%,0)};
    .pos--top-left       & { left: $gap; top: 100%; transform: translate3d(0,-50%,0);}
    .pos--top-center     & { left: 50%; top: 100%; transform: translate3d(-50%,-50%,0);}
    .pos--top-right      & { left: calc(100% - #{$gap}); top: 100%; transform: translate3d(-100%,-50%,0);}
    .pos--bottom-left    & { left: $gap; top: 0;transform: translate3d(0,-50%,0);}
    .pos--bottom-center  & { left: 50%; top: 0;transform: translate3d(-50%,-50%,0);}
    .pos--bottom-right   & { left: calc(100% - #{$gap}); top: 0;transform: translate3d(-100%,-50%,0);}

    &::before {
        display: inline-block;;
        position: relative;
        content: '';
        width: 100%; height: 100%;
        background-color: #9857DB;
        box-sizing: border-box;
        transform: rotate(45deg);
    }

}

.popover__message {

}

.popover__close {
    width: 18px; height: 18px;
    flex : 0 0 18px;
    display: inline-block;
    margin-left: 16px;
    i {
        width: 100%; height: 100%;
    }
}

</style>