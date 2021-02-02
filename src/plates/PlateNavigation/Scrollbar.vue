
<template>
    <div    id="nav-scrollbar"
            @mouseenter="rootMouseEnter"
            @mouseleave="rootMouseLeave"
    >

        <div  id="scrollbar__track">
        </div>

        <div    id="scrollbar__thumb"
                ref="ref_thumb"
                @mousedown="thumbMouseDown"
                @mouseup="thumbMouseUp"
        >

        </div>

    </div>
</template>

<script>
export default {
    name : 'Scrollbar',

    data() {
        return {
            isGrab : false,


            isScrollBindFinish : false,

            scrollElement : document.scrollingElement,
        }
    },

    methods : {
        rootMouseEnter() {
            console.log('enter');
        },
        rootMouseLeave() {
            console.log('leave');
        },

        thumbMouseDown() {
            console.log('thumb down');
        },
        thumbMouseUp() {
            console.log('thumb up');
        },


        mountedScrollBind() {

            const thumb = this.$refs.ref_thumb;
            const scrollElement = this.scrollElement;
            {thumb}
            const Y         = window.scrollY;
            const WH        = window.innerHeight;
            // const WHper     = WH
            const FH        = scrollElement.scrollHeight - WH;
            // console.log({Y,WH,FH});
            const ST     = FH - (FH - Y);
            const STper    = Math.round(100/FH * ST);
            const thumbYpx = STper * (WH/100);
            const thumbScalePer = 0.3;

            console.log(thumbYpx);

            thumb.style.transform = `translate3d(0,${thumbYpx}px,0) scaleY(${thumbScalePer})`;

            // console.log(window.innerHeight);

        },


    },
    mounted() {
        if(this.isScrollBindFinish){
            return
        }
        this.isScrollBindFinish = true;
        this.scrollingElement   = document.scrollingElement;

        window.addEventListener('scroll' , this.mountedScrollBind);
    },
    destroyed(){
        window.removeEventListener('scroll' , this.mountedScrollBind);
    }
}
</script>

<style lang="scss" scoped>
#nav-scrollbar {
    z-index: 1200;
    position: absolute;
    right: 0;
    top: 0;
    height: 100vh;
    width: 20px;
    border: 1px solid #d3d;
}

#scrollbar__thumb {
    position: absolute;
    top: 0; right: 0;
    width: 20px; height: 100%;
    background-color: #3d3;
    box-sizing: border-box;
    transform-origin: top;
}
</style>