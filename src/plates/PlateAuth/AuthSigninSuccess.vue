<template>
    <div class="auth__success">

        <div class="auth__success__icon st-check">

            <div class="icon__check">

                <div class="icon__check__line">
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>

        <p class="auth__success__alert">
            <TextChangeMask :text="count" speed="500"/>초후 자동으로 닫혀요.
        </p>

    </div>
</template>

<script>
import TextChangeMask from '@/components/layout/TextChangeMask.vue';
export default {
    name : 'AuthSuccess',
    components : {
        TextChangeMask,
    },
    data() {
        return {
            isDestory : false,
            count : 3,
            // counting : false,
            counting : true,
        }
    },
    methods : {
        closeCounting() {
            if(this.isDestory || !this.counting){
                return
            }
            setTimeout(() => {
                if(this.count > 1){
                    this.closeCounting();
                }else {
                    this.$store.dispatch('closeAuthPanel');
                }
                --this.count;
            },1000);
        },
    },
    mounted() {
        this.closeCounting();
    },
    beforeDestroy(){
        this.isDestory = true;
    }
}
</script>

<style lang="scss" scoped>

$green : #2cd62c;

.auth__success {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    align-items: center;
}


@keyframes appearRotate {
    0% {
        opacity: 0;
        transform: rotateX(-180deg) rotateY(90deg) scale(0.6)  ;
    }
    100% {
        opacity: 1;
        transform: none;
    }
}

@keyframes checkLine {
    0% {
        transform:scaleX(0)
    }
    100% {
        transform:scaleX(1)
    }
}

@keyframes gradientflow {
    0% {
        left: 0;
    }
    100% {
        left: -100%;
    }
}

.auth__success__icon {
    width: 200px;
    height: 200px;
    border-radius: 9999px;
    opacity: 0;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0%; left: 0;
        background-color:  rgba(44,214,44,1);
        background: linear-gradient(132deg, rgba(44,214,44,1) 0%, rgb(22, 216, 206) 100%);
        width: 200%; height: 100%;
        z-index: 1;

        animation: gradientflow 2s $EASE_inOutCubic infinite both alternate;
    }

    &.st-check {
        opacity: 1;
        animation: appearRotate 1200ms $EASE_outExpo 200ms both;
    }
}

.icon__check {

    width: 100%;
    height: 100%;
    position: relative;
    z-index: 10;

    .icon__check__line {
        display: inline-block;
        width: 60%; height: 60%;
        position: relative;
        z-index: 10;
        transform : rotate(-45deg);
        left: 13%;
        top: 4%;

        span {
            position: absolute;
            display: inline-block;
            border-radius: 9999px;
            box-sizing: border-box;
            box-shadow: none;
            overflow: hidden;
            bottom: 0; left: 0;
            height: 20%;
            transform-origin: bottom left;

            &::before {
                content: '';
                display: inline-block;
                position: relative;
                width: 100%; height: 100%;
                vertical-align: top;
                background-color: #fff;
                border-radius: inherit;
                transform-origin: left;
                bottom: 0; left: 0;
            }

            &:nth-child(1) {
                width: 60%;
                transform : rotate(90deg) translateX(-100%);
                &::before {
                    .st-check & {
                        animation: checkLine 500ms $EASE_inOutCubic both;
                        animation-delay: 500ms !important;
                    }
                }
            }
            &:nth-child(2) {
                width: 100%;
                &::before {
                    .st-check & {
                        animation: checkLine 600ms $EASE_inOutCubic both;
                        animation-delay: 820ms !important;
                    }
                }
            }
        }
    }

}

@keyframes appearY{
    0% {
        opacity: 0;
        transform: translate3d(0,50px,0);
    }
    100% {
        opacity: 1;
        transform: translate3d(0,0,0);
    }
}

.auth__success__alert {
    margin-top: 50px;
    color: $green;
    font-size: $SIZE_PC_fontsize_strong;
    animation: appearY 600ms $EASE_outCubic 500ms both;

    .mask-text {
        width: 20px;
        font-weight: 700;
        text-align: right;
        margin-right: 2px;
    }
}

</style>