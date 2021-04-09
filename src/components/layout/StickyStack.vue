<template>
    <div class="sticky-stack" ref="ref_root">
        <div class="sticky-stack__flag" ref="ref_flag"></div>
        <div    class="sticky-stack__target"
                :class="`${isFixed ? 'st-fixed' : ''}`"
                ref="ref_target"

        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name : 'StickyStack',
    props : {
    },
    data() {
        return {
            beforeY : false,
            isFixed : false,

            targetRect : {}
        }
    },
    methods : {
        actionScroll() {
            console.log('hey');
        },
        bindScroll() {
            window.addEventListener('scroll' , this.actionScroll);
        },
        unbindScroll() {
            window.removeEventListener('scroll' , this.actionScroll);
        },
        bindObserver() {

            const options = {
                threshold: [1]
            }

            const io = new IntersectionObserver(entries => {

                entries.forEach(entry => {
                    // console.log(entry);
                    const beforeY = this.beforeY;
                    const currentY = entry.boundingClientRect.y;
                    const currentRatio = entry.intersectionRatio;
                    const isIntersecting = entry.isIntersecting;
                    {currentY,currentRatio,isIntersecting}
                    // console.log({currentY,currentRatio,isIntersecting});

                    const point = 0;

                    if(beforeY >= point && currentY < point){
                        // console.log('위에서 막 사라짐 = fixed로');
                        // const rect = this.$refs.ref_target.getBoundingClientRect();
                        // console.log(rect);
                        const osHeight = this.$refs.ref_target.offsetHeight;
                        const osWidth = this.$refs.ref_target.offsetWidth;
                        this.$refs.ref_flag.style.height = osHeight + 'px';
                        this.$refs.ref_flag.style.width = osWidth + 'px';
                        this.isFixed = true;
                    }
                    if(beforeY < point && currentY >= point){
                        // console.log('아래에서 위로 올라옴 = static으로');
                        this.$refs.ref_flag.style.height = 0;
                        this.$refs.ref_flag.style.width = 0;
                        this.isFixed = false;
                    }

                    this.beforeY = currentY;

                    // if (entry.intersectionRatio > 0) {entry.target.classList.add('tada');}else {entry.target.classList.remove('tada');}
                })
            },options);

            io.observe(this.$refs.ref_root);

        },
    },

    mounted () {
        // this.targetRect = this.$refs.ref_target.getBoundingClientRect();

        this.bindScroll();
        this.bindObserver();

    },
    beforeDestroy() {
        this.unbindScroll();
    }

}

export const stickyStackStore = {
    name : '$stickyStack',

    state : {
        stackList : [

        ],
    },
    getters : {
        stackLength({$stickyStack}) {
            return $stickyStack.stackList.length
        }
    },
    mutations : {
        STICKY_ENTER({$stickyStack}, target) { {$stickyStack, target}
            const copy = [...$stickyStack.stackList];
            copy.push(target);
            $stickyStack.stackList = copy;
        },
        STICKY_REMOVE() {
            // $stickyStack.stackList = [...$stickyStack.stackList].push(target);
        },
    },
    actions : {
        stickyStack({commit} , target) { {commit}
            console.log(target);

            // commit('STICKY_ENTER' , target);
        },
    }

}
</script>

<style lang="scss" scoped>
.sticky-stack {
    border: 1px solid #d3d;
    display: inline-flex;
    flex-direction: column;
    width: auto;
    height: auto;
    box-sizing: border-box;

    &.tada {
        width: 100px;
    }

}

.sticky-stack__flag {
    width: 100%;
    height: 0;
    // visibility: hidden;
    vertical-align: top;
    display: inline-block;
    // height: 3px;
    // background: #d3d;
    background: rgb(255,0,112);
    background: linear-gradient(168deg, rgba(255,0,112,1) 0%, rgba(0,255,48,1) 35%, rgba(255,74,0,1) 64%, rgba(0,117,255,1) 100%);
    box-sizing: border-box;
}
.sticky-stack__target{
    box-sizing: border-box;
    // border: 1px solid #3d3;
    background: rgba(0,0,0,0.2);
    opacity: 0.7;
    font-weight: bold;

    &.st-fixed {
        top: 0;
        position: fixed;
    }
}

</style>