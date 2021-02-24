<template>
    <div    class="modal-item"
            :class="`${isShow ? 'st-show' : ''}${type ? ` type--${type}` : ''}`"
    >
        <div class="modal__box">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        type : String,
        isShow : Boolean,
    },
    name : 'ModalBox',

}
</script>

<style scoped lang="scss">

.modal-item {
    &.type--alert ,
    &.type--confirm
    {
        position: absolute;
        top: 50%; left: 50%;
        transform :translate(-50% , calc(-50% + 30px));
        z-index: 1020;
        display : flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        box-sizing: border-box;

        @include phone {
            padding: 0 $SIZE_MO_innerPadding;
        }
    }

}


.modal__box {
    width: auto;
    min-width : 360px;
    max-width : 720px;
    height: auto;
    background-color: #fff;
    padding: 30px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
    border-radius: 14px;
    box-sizing: border-box;
    transform : translateY(30px);
    transition: transform 180ms $EASE_inCubic,
            opacity 150ms ease
            ;

    opacity: 0;

    @include phone {
        width: 100%;
        min-width : unset !important;
        max-width : 360px !important;
    }

    > * {
        margin-top: 30px;
        &:nth-child(1) {
            margin-top: 0;
        }
    }

    .st-show & {
        opacity: 1;
        transform : none;
        pointer-events: all;
        transition: transform 650ms $EASE_outExpo ,
                    opacity 300ms ease
                    ;
        transition-delay: 0ms;
    }

}
</style>