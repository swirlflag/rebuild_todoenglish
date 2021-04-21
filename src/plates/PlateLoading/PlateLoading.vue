<template>
    <div id="plate--loading"
        :class="{'dt-loadend' : isLoadend}"
    >
        <div    class="loading__wrap"
                ref="ref_wrap"

        >
            temp loading display
            ...
            &nbsp;
            &nbsp;
            <strong>load end : {{ isLoadend }}</strong>

        </div>
    </div>
</template>

<script>

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

                this.gsap.to(wrap , {
                    yPercent : -100,
                    ease : 'power2.out',
                    duration : 0.6,
                    onComplete : () => {
                        this.$emit('loadMotionEnd');
                    },
                    delay : 0.2,
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
    position: absolute;
    width: 100%; height: 100%;
    top: 0; left: 0;
    background: rgba(0,0,0,1);

    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 600ms ease;

    .dt-loadend & {
        background: rgba(0,0,0,0.75);
    }
}
</style>