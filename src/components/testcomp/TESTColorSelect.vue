<template>
    <div class="test-color-select">

        <div class="swiper-container" ref="ref_container">

            <div class="swiper-wrapper">
                <template v-for="(color,idx) in colors">
                    <li     class="swiper-slide"
                            :key="color"
                            :style="`background-color: ${color}`"
                            :class="{'st-select' : idx === modelData.index}"
                            @click="pick(idx)"
                    >
                        <span>{{ color }}</span>
                    </li>
                </template>

            </div>

        </div>

        <div class="test-color-select__controls">
            <ButtonDefault   @click="select"
            >
                결정하기
            </ButtonDefault>
        </div>
    </div>
</template>

<script>
import ButtonDefault from '@/components/button/ButtonDefault.vue';
export default {
    components : {
        ButtonDefault,
    },
    props: {
        index : Number,
    },
    data() {
        const colors = [
            '#542e71',
            '#f8c957',
            '#51dacf',
            '#7779ff',
            '#55e0a3',
            '#fbd46d',
            '#eb596e',
            '#6f4a8e',
            '#c86af8',
            '#0d63a5',
            '#c9f658',
            '#158a8c',
            '#7971ea',
            '#ed5485',
            '#ffe869',
            '#ad56cd',
            '#80d6ff',
        ];

        const index = this.index === undefined ? -1 : this.index;
        const value = this.index === undefined ? '' : colors[index];

        return {
            colors,

            modelData : {
                index,
                value,
            },
        }

    },
    methods : {
        pick (index){
            this.modelData.index = index;
        },
        select() {
            this.modelData.value = this.colors[this.modelData.index];
            this.$emit('select' , this.modelData);
        },
        makeSwiper() {
            const container = this.$refs.ref_container;
            const swiper = new this.$swiper(container, {
                slidesPerView : 'auto',
                // freeMode : true,
                // freeModeSticky : true,
                // centeredSlides : true,
            });
            {swiper}
        },
    },
    mounted() {
        this.makeSwiper();
    }
}
</script>

<style lang="scss" scoped>
.float-sheet {
    .test-color-select{

        .swiper-container {
            padding-left: 30px;
            padding-right: 30px;
            @include phone {
                padding: $SIZE_MO_innerPadding;
            }
        }
    }
}



.test-color-select {
    // margin-top: 50px;

    // margin-bottom: 50px;
    // background-color: #aac;
    background-color: rgb(27, 27, 27);

    .swiper-container {
        // border: 1px solid #3d3;
    }

    .swiper-wrapper {
        padding-top: 50px;
        padding-bottom: 50px;
        // display: flex;
        // flex-direction: row;
        @include phone {
            padding: $SIZE_MO_innerPadding 0;
        }
    }

    .swiper-slide {
        cursor: pointer;
        width: 150px; height: 150px;
        border-radius: 24px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: 700;
        box-sizing: border-box;
        border : 3px solid transparent;

        @include phone {
            width: 100px; height: 100px;
        }

        transition : border 100ms ease;

        + .swiper-slide {
            margin-left: 10px;
        }

        &.st-select {
            border-color: rgba(255,255,255,0.8);
            span {
                border-color: rgba(255,255,255,0.8);
            }
        }

        span {
            border: 3px solid transparent;
            transition: all 100ms ease;
            padding: 5px 10px;
            border-radius: 9999px;
        }
    }

}

.test-color-select__controls {
    display: flex;
    justify-content: center;
    padding-bottom: 50px;

    @include phone {
        padding: $SIZE_MO_innerPadding;
    }
}
</style>