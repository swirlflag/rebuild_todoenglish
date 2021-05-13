<template>
    <div id="nav-region"
    >

        {{isOpen}}

        <div class="region__dimmed"></div>
        <div class="region__cover">
            cover
        </div>

        <div class="region__panel">

            <div class="region__swiper swiper-container" ref="ref_swiper">
                <div class="swiper-wrapper">

                    <template v-for="(item) in regionList">
                        <div    class="swiper-slide"
                                :key="item.code"
                        >
                            <div    class="region__flag"
                                    :class="`region--${item.code}`"
                                    data-swiper-parallax-scale="0.55"
                                    data-swiper-parallax-opacity="0.4"
                                    :data-region-code="item.code"
                            >
                            </div>
                        </div>
                    </template>

                </div>
            </div>

            <div class="region__name">
                <TextChangeMask     :text="currentRegion.name"
                                    contain
                                    :speed="500"

                />
            </div>

            <div class="region__control">
                <button class="region__select">
                    <TextChangeMask :text="currentRegion.confirm"
                                    contain
                                    :speed="500"
                                    :delay="200"
                    />
                </button>
            </div>

        </div>

    </div>
</template>

<script>
import TextChangeMask from '@/components/display/TextChangeMask.vue';
export default {
    name : 'RegionChange',
    components : {
        TextChangeMask ,
    },
    data() {
        return {
            regionList : [
                {
                    code : 'ko',
                    name : '한국어',
                    confirm : '언어 변경',
                },
                {
                    code : 'en',
                    name : 'English',
                    confirm : 'Change language',
                },
                {
                    code : 'jp',
                    name : 'にほんご',
                    confirm : '言語を変更する',
                },
                {
                    code : 'zh',
                    name : '中國語',
                    confirm : '改变语言',
                },
            ],

            currentIndex : 0,
        }
    },
    computed : {
        isOpen() {
            return this.$store.state.$nav.is_openRegionChange;
        },
        currentRegion() {
            return this.regionList[this.currentIndex];
        },
    },
    watch : {
        "isOpen"() {
            console.log(this.isOpen);
        }
    },

    methods : {
        makeRegionSwiper() {

            const options = {
                // freeMode : true,
                // freeModeSticky : true,
                // mousewheel      : true,
                slidesPerView   : 'auto',
                centeredSlides  : true,
                loop            : true,
                parallax        : true,
            };

            const swiper = new this.$swiper(this.$refs.ref_swiper, options);

            swiper.on('slideChange' , ({realIndex}) => {
                this.currentIndex = realIndex;
            });

        },

    },
    mounted(){
        this.makeRegionSwiper();
    }
}

export const regionChangeStore = {
    state : {
        is_openRegionChange : false,
    },
};

</script>

<style lang="scss" scoped>
#nav-region {
    position : absolute;
    top: 0 ; left: 0;
    width: 100%; height: 100%;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.region__dimmed {
    position: absolute;
    width: 100%; height: 100%;
    // background-color: rgba(255,255,0,0.4);
    // background-color: rgba(200,255,255,0.4);
    background-color: rgba(255,255,255,0.4);
    // background-color: rgba(0,0,0,0.4);
    top: 0; left: 0;
    z-index: 1;
    width: 100%; height: 100%;
}
.region__cover {
    width: 100%; height: 100%;
    display: inline-block;
    position: absolute;
    top: 0; left: 0;
    background-color: rgba(200,0,0,0.5);
    z-index: 20;
    display: none;
}

.region__panel {
    width: 500px; height: 500px;
    border-radius: 100%;
    position: relative;
    z-index: 2;

    @include phone {
        width: 90vw; height: 90vw;
    }
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    // background: linear-gradient(127deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0.05) 100%);
    // background: rgba(255,255,255,0.3);
    background-color: rgba(255,255,255,0.98);

    border: 3px solid #fff;
    box-shadow: inset 8px 8px 5px rgba(255,255,255,0.8) , 0 25px 40px rgba($color : dodgerblue , $alpha : 0.2);

    &::before {
        @keyframes regionGlobe {
            0% {
                background-position: -100% 0 ;
            }
            100% {
                background-position: 100% 0 ;
            }
        }
        content: '';
        display: inline-block;
        top: 0; left: 0;
        width: 100%; height: 100%;
        position: absolute;
        border-radius: 100%;
        background-image: url('~@/assets/illust/worldmap.png');
        // background-position: 200% 100%;
        background-repeat: repeat;
        background-size: 200% 100%;
        animation: regionGlobe 30s linear infinite;
        opacity: 0.035;
    }



    .region__swiper {
        width: 100%; height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        cursor: grab;
        position: relative;

        &::before , &::after{
            content: '';
            width: 100%; height: 100%;
            position: absolute;
            display: inline-block;
            top: 0; left: 0;
            pointer-events: none;
            border-radius: 100%;
            transform-origin: center;
        }

        &::before {
            @keyframes rotateline1 {
                0%{transform:rotate(0) scale(0.88)}
                100% {transform: rotate(360deg) scale(0.88)}
            }
            $ineer_space : 2%;
            $inner_width : 5%;
            $inner_height : 3px;
            $inner_color : rgba(0, 0, 0, 0.09);

            background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100%' ry='100%' stroke='#{$inner_color}' stroke-width='#{$inner_width}' stroke-dasharray='#{$inner_height}%2c #{$ineer_space}' stroke-dashoffset='100' stroke-linecap='butt'/%3e%3c/svg%3e");
            animation: rotateline1 77s linear infinite;
        }

        &::after {
             @keyframes rotateline2 {
                0%{transform:rotate(0) scale(0.98)}
                100% {transform: rotate(360deg) scale(0.98)}
            }

            $outer_space : 2%;
            $outer_width : 10%;
            $outer_height : 1px;
            $outer_color : rgba(0,0,0,0.07);

            background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100%' ry='100%' stroke='#{$outer_color}' stroke-width='#{$outer_width}' stroke-dasharray='#{$outer_height}%2c #{$outer_space}' stroke-dashoffset='100' stroke-linecap='butt'/%3e%3c/svg%3e");
            animation: rotateline2 100s linear infinite reverse;
        }

        .swiper-wrapper {
            width: 100%; height: 100%;
            box-sizing: border-box;
            border-radius: 100%;
            align-items: center;
        }

        .swiper-slide {
            width: 25%; height: 25%;
            box-sizing: border-box;
            margin: 0 5%;

            .region__flag {
                width: 100%; height: 100%;
                display: inline-block;
                border: 2px solid rgba(0,0,0,0.06);
                border-radius: 25%;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                color: #fff;
                background-color: #fff;
                box-shadow:  0 5px 5px rgba(0,0,0,0.1);
                background-repeat: no-repeat;
                background-position: center;

                &.region--ko {
                    background-image: url('~@/assets/common/flag_korea.svg');
                    background-size: 160%;
                    // background-position: 0% 100%;
                    background-position: center;
                }
                &.region--en {
                    background-image: url('~@/assets/common/flag_usa.png');
                    background-size: 200%;
                    background-position: 19% 50%;
                }
                &.region--jp {
                    background-image: url('~@/assets/common/flag_japan.svg');
                    background-size: 55%;
                    background-position: center;
                }
                &.region--zh {
                    background-image: url('~@/assets/common/flag_china.jpeg');
                    background-size: 190%;
                    background-position: 10% 30%;
                }
            }

        }
    }

    .region__name {
        position: absolute;
        bottom: 25%;
        transform: translateY(50%);
        text-align: center;
        font-size: 26px;
        z-index: 10;
        font-weight: 700;
        color: dodgerblue;
        color: #333;
        display: flex;
        justify-content: center;

        .mask-text {
            width: 100%;
            text-align: center;
        }
    }

    .region__control {
        position: absolute;
        top: 100%; left: 0;
        margin-top: 40px;
        z-index: 10;
        width: 100%;
        left: 0;
        display: flex;
        justify-content: center;

        .region__select {
            background-color: dodgerblue;
            border-radius: 14px;
            width: 220px; height: 50px;
            transition: background-color 200ms ease, transform 180ms $EASE_outBack2;
            text-align: center;
            color: #fff;
            font-weight: 700;
            position: relative;
            box-shadow: 0 5px 8px rgba(0,0,0,0.2);

            &::before {
                content: '';
                position: absolute;
                pointer-events: none;
                display: inline-block;
                width: 100%; height: 100%;
                top: 0; left: 0;
                background-image: url('~@/assets/icon/icon_checked_white.svg');
                background-size: 15%;
                background-repeat: no-repeat;
                background-position: center;
                opacity: 0;
                transition: opacity 150ms ease;
            }

            .mask-text {
                width: auto;
                text-align: center !important;
                // transition: opacity 150ms ease;
            }

            @include hover {
                transform: scale(1.15);
                &::before {
                    opacity: 1;
                }
                .mask-text {
                    opacity: 0;
                }
            }
        }
    }

}

</style>