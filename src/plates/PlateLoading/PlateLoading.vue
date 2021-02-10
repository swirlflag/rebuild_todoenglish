<template>
    <div id="plate--loading"
        :class="{'dt-loadend' : isLoadend}"
    >
        <div    class="loading__wrap"
                ref="ref_wrap"

        >
            temp loading display
            ...
        </div>
    </div>
</template>

<script>
import gsap from 'gsap';
export default {
    name : 'PlateLoading',
    computed : {
        isLoadend() {
            return this.$store.state.is_mountedPage;
        }
    },

    watch : {
        'isLoadend'(now) {
            if(now){
                const wrap = this.$refs.ref_wrap;

                gsap.to(wrap , {
                    yPercent : -100,
                    ease : 'power2.in',
                    duration : 0.4,
                    onComplete : () => {
                        this.$emit('loadMotionEnd');
                    }
                })
            }
        }
    },

    mounted () {
        // console.log('mounted : PlateLoading.vue');
    }
}
</script>

<style scoped lang="scss">
#plate--loading {
    width: 100%; height: 100%;
    position: fixed;
    z-index: 8000;
    pointer-events: all;
    box-sizing: border-box;

    &.dt-loadend {
        pointer-events: none;
    }

    @include hardSelect {
        color: #fff;
    }
}

.loading__wrap {
    border: 1px solid #000;
    position: absolute;
    width: 100%; height: 100%;
    top: 0; left: 0;
    background: rgba(0,0,0,1);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>