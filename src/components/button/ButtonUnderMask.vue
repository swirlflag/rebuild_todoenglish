<template>
    <button class="button--undermask"
            ref="ref_root"
            :class="`${theme ? ` theme--${theme}` : ''}${underline ? ' use-underline': ''}`"
            @click="onClick"
    >
        <span class="button--undermask__wrap">
            <div class="button--undermask__slot">
                <slot></slot>
            </div>
            <span   class="button--undermask__mask"
                    :style="colorData && `background-color: ${colorData}`"
            >
            </span>
            <span   class="button--undermask__icon"
                    :style="colorData && `background-color: ${colorData}`"
            >
                <i v-if="href" class="fas fa-link" ></i>
                <!-- <i class="fas fa-link"></i> -->
                <i v-else-if="to" class="fas fa-arrow-right"></i>
            </span>
        </span>
    </button>
</template>

<script>
export default {
    name : 'ButtonUndermask',
    props: {
        theme : String,
        underline : Boolean,
        href : String,
        blank : Boolean,
        to : String,
    },
    data() {
        return {
            inheritColor : null,
            observer : null,
            colorData : null,
        }
    },
    methods : {

        onClick() {
            this.moveLink();
            // this.$emit('click');
        },

        moveLink() {
            if(this.to){
                this.$router.push(this.to);
            }
            else if(this.href){
                try{
                    window.open(this.href)
                }catch(error) {
                    console.log(error);
                }
            }
        },

        observeColor() {
            const observeTarget = this.$refs.ref_root;

            this.observer = new MutationObserver((mutations) =>{
                mutations.forEach((mutation) =>{ {mutation}
                    setTimeout(() => {
                        this.colorData = getComputedStyle(mutation.target).color;
                    },500)
                });
            });

            const observeConfig = {
                attributes: true,
                attributeFilter: ["style", "class"],
            };

            this.observer.observe(observeTarget,observeConfig);

        },
    },
    mounted() {
        // this.detectInherit();
        this.observeColor();
    },
    beforeDestroy() {
        this.observer.disconnect();
    }
}
</script>

<style lang="scss" scoped>

$lineThick : calc(1px + 0.047em);

.button--undermask {
    position: relative;
    cursor: pointer;
    display: inline-flex;
    z-index: 1;
    align-items: center;
    line-height: inherit;
    font-size: 16px;
    transition: color 150ms ease 150ms;
    will-change: color ;
    color: inherit;
    box-sizing: border-box;
    // font-size: 30px;

    .button--undermask__wrap{
        position: relative;
        width: 100%; height: 100%;
        display: inline-block;
        padding: 0 0.08em;
        box-sizing: border-box;
        .button--undermask__slot {
            position: relative;
            z-index: 2;
        }
        .button--undermask__mask {
            pointer-events: none !important;
            user-select: none;
            width: 100%; height: 100%;
            position: absolute;
            bottom: 0; left: 0;
            z-index: 1;
            background-color: $COLOR_navy_1;
            transition: transform 200ms $EASE_outCubic 200ms;
            transform: scaleY(0);
            transform-origin: bottom;
            will-change: transform;
        }
        .button--undermask__icon {
            position: absolute;
            bottom: 0;
            left: 100%;
            height: 100%;
            z-index: 0;
            display: inline-block;
            box-sizing: border-box;
            background-color: $COLOR_navy_1;
            transform: translate3d(-100%,0,0);
            transition: transform 160ms $EASE_inCubic , opacity 0ms ease 200ms;
            opacity: 0;
            font-size: 0.9em;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
                display: inline-block;
                padding: 0 0.34em;
                padding-right: 0.24em;
            }
        }
    }

    &.use-underline .button--undermask__mask{
        transform: scaleY(0.08);
    }

    &:hover {
        color: #fff !important;
        transition: color 150ms ease 0ms;
        .button--undermask__mask{
            transform: scaleY(1);
            transition: transform 200ms $EASE_outCubic;
        }
        .button--undermask__icon {
            opacity: 1;
            transform: translate3d(0,0,0);
            transition: transform 200ms $EASE_outExpo 200ms, opacity 0ms ease 200ms;
        }
    }

    @mixin themeset($color){
        color : $color;
        .button--undermask__mask ,
        .button--undermask__icon {background-color: $color;}
    }

    &.theme{
        &--navy {@include themeset($COLOR_navy_1);}
        &--pink {@include themeset($COLOR_pink_1);}
        &--mint {@include themeset($COLOR_mint_1);}
    }

}




</style>