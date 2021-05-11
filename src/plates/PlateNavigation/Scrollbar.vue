
<template>
    <div    id="nav-scrollbar"
            ref="ref_root"
            :class="{'st-grab' : isGrab , 'st-hover' : isHover , 'st-none' : isNoneScroll}"
            @mouseenter="onMouseenterRoot"
            @mouseleave="onMouseleaveRoot"
    >

        <div    id="scrollbar__thumb"
                ref="ref_thumb"
                @mousedown="onMousedownThumb"
        >
            <span></span>
        </div>

    </div>
</template>

<script>
export default {
    name : 'Scrollbar',

    data() {

        return {
            isGrab : false,
            isHover : false,
            isNoneScroll : false,

            grabStartRatio : 0,

            scrollElement : document.scrollingElement,
            // scrollElement : document.body,

            isScrollBindFinish : false,

            ST : 0,
            WH : 0,
            FH : 0,
        }
    },
    watch : {
        '$route.path'() {
            this.calcScrollState();
        }
    },

    computed : {
        isMobile() {
            return this.$store.state.type_device
        }
    },

    methods : {
        calcSizing() {
            this.WH = window.innerHeight;
            this.FH = this.scrollElement.scrollHeight;
            // this.ST = window.scrollY;
            this.ST = this.scrollElement.scrollTop;
        },

        onMouseenterRoot() {
            this.isHover = true;
        },
        onMouseleaveRoot() {
            this.isHover = false;
        },

        onMousedownThumb(e) {
            this.isGrab = true;
            this.grabStartRatio = 1/this.$refs.ref_thumb.offsetHeight * e.offsetY;
            this.$store.commit('APP_freeze');
        },

        calcScrollState() {
            this.calcSizing();

            const scrollBarHeight   = this.$refs.ref_root.offsetHeight;

            const thumbY            = scrollBarHeight * ((1/this.FH) * this.ST);
            const thumbHeight       = this.WH * (this.WH/this.FH) ;

            this.isNoneScroll       = thumbHeight >= this.WH;

            this.$refs.ref_thumb.style.transform   = `translate3d(0,${thumbY}px,0)`;
            this.$refs.ref_thumb.style.height      = `${thumbHeight}px`;

        },

        onMouseUpWindow() {
            if(!this.isGrab){
                return
            }
            this.isGrab = false;
            this.$store.commit('APP_unfreeze');
        },

        onMouseMoveWindow(e) {
            if(!this.isGrab){
                return
            }

            const CY = e.clientY;
            const nowRatio = 1/this.WH * CY;
            const targetY = this.FH * nowRatio - (this.WH*this.grabStartRatio);

            this.scrollElement.scrollTo(0,targetY);
        },

        bindScrollBarEvent() {
            if(this.isScrollBindFinish){
                return
            }
            this.isScrollBindFinish = true;
            this.scrollingElement   = document.scrollingElement;

            // document.body.addEventListener('scroll' , this.calcScrollState);

            window.addEventListener('scroll' , this.calcScrollState);
            window.addEventListener('mousemove' , this.onMouseMoveWindow);
            window.addEventListener('mouseup' , this.onMouseUpWindow);
        },
        unbindScrollBarEvnet() {
            // document.body.removeEventListener('scroll' , this.calcScrollState);
            window.removeEventListener('scroll' , this.calcScrollState);
            window.removeEventListener('mousemove' , this.onMouseMoveWindow);
            window.removeEventListener('mouseup' , this.onMouseUpWindow);
        },

    },
    mounted() {
        this.calcScrollState();
        this.bindScrollBarEvent();
    },
    destroyed(){
        this.unbindScrollBarEvnet();
    }
}
</script>
<style lang="scss">
body {
    @include hideScrollbar;
}

</style>


<style lang="scss" scoped>

$outGap : 4px;
$max : 20px;
$min : 8px;

$tmepcolor : #333;

#nav-scrollbar {
    z-index: 1200;
    position: absolute;
    top: $outGap; right: 0;
    height: calc(100vh - #{$outGap * 2});
    box-sizing: border-box;
    width: #{$max + ($outGap*2)};

    transition: opacity 300ms ease;

    &.st-none {
        opacity: 0;
        pointer-events: none;
    }
    .device--mobile & {
        display: none;
    }
}

#scrollbar__thumb {
    position: absolute;
    height: auto;
    right: 0;
    top: 0; padding-right: $outGap;
    width: auto;
    cursor: pointer;
    display: inline-block;
    box-sizing: border-box;
    transform-origin: top;
    transition: transform 750ms $EASE_outExpo;

    .st-grab &{
        transition: none !important;
    }

    > span {
        width: $min; height: 100%;
        display: inline-block;
        transition:  transform 300ms $EASE_outBack2, width 250ms $EASE_outCubic, opacity 200ms ease, background-color 130ms ease;
        transform-origin: right;
        border-radius: 9999px;

        opacity: 0.4;
        box-sizing: border-box;
        background-color: $tmepcolor;
        overflow: hidden;
        border: 1px solid rgba(255,255,255,0.3);

        .st-grab & , .st-hover &{
            width: $max;
            opacity: 0.5;
            // background-color: $COLOR_pink_1;
        }

        .st-grab &{
            cursor: grabbing;
            transform : scale(0.96);
            animation : bgflow 1s linear infinite;
            opacity: 0.9;
        }

        .st-hover &{
            transition: transform 300ms $EASE_outBack2, width 350ms $EASE_outBack2, opacity 200ms ease, background-color 130ms ease;
        }
    }
}

</style>