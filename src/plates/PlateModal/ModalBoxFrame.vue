<template>
    <transition name="modal__box">
        <div    class="modal__box"
                :class="`${type ? ` type--${type}` : ''}`"
        >
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    props : {
        type : String,
    },
    name : 'ModalBoxFrame',

}
</script>

<style scoped lang="scss">
.modal__box {
    background-color: #fff;
    pointer-events: all;
    display : flex;
    position: absolute;
    z-index: 1020;
    box-sizing: border-box;

    &.type--alert ,
    &.type--confirm {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        top : 50%; left: 50%;
        padding: 30px;
        transform : translate3d(-50%,-50%,0);
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        border-radius: 14px;

        min-width : 360px;
        max-width : 720px;

        @include phone {
            width: 100%;
            min-width : unset !important;
            max-width : 360px !important;
        }

        transition: transform 650ms $EASE_outExpo ,
                    opacity 300ms ease
        ;

        &.modal__box-enter,
        &.modal__box-leave-to  {
            transition: transform 300ms $EASE_inCubic,
                        opacity 280ms ease
            ;
            opacity: 0;
            transform : translate3d(-50%,calc(-50% + 50px),0);
        }
    }

}

</style>