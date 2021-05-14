<template>
    <transition
        name="nav-region"
        :duration="700"
    >
        <div    id="nav-region"
                v-if="isOpen"
                ref="ref_root"
        >

            <div class="region__dimmed" @click="onClickDimmed"></div>

            <div    class="region__panel"
                    :class="{'st-gogo' : gogo}"
                    ref="ref_panel"
            >

                <div class="region__cover"></div>

                <div class="region__swiper swiper-container" ref="ref_swiper">
                    <div class="swiper-wrapper">

                        <template v-for="(item) in regionList">
                            <div    class="swiper-slide"
                                    :key="item.code"
                            >
                                <div    class="region__flag"
                                        :class="`region--${item.code}`"
                                        data-swiper-parallax-scale="0.58"
                                        data-swiper-parallax-opacity="0.4"
                                        :data-region-code="item.code"
                                >
                                </div>
                            </div>
                        </template>

                    </div>
                </div>

                <div class="region__spinner">
                    <SpinnerColordotsWave/>
                </div>

                <div class="region__name">
                    <TextChangeMask     :text="selectRegionText"
                                        :contain="false"
                                        :speed="500"

                    />
                </div>

                <div    class="region__control"
                        ref="ref_control"
                >
                    <button class="region__select" @click="onClickSelect">
                        <TextChangeMask :text="selectRegion.confirm"
                                        :contain="false"
                                        :speed="500"
                                        :delay="200"
                        />
                    </button>
                </div>

            </div>

        </div>
    </transition>
</template>

<script>
import TextChangeMask from '@/components/display/TextChangeMask.vue';
import SpinnerColordotsWave from  '@/components/spinner/SpinnerColordotsWave.vue';

export default {
    name : 'RegionChange',
    components : {
        TextChangeMask ,
        SpinnerColordotsWave,
    },
    data() {
        return {
            regionList : [
                {
                    code : 'ko',
                    name : '한국어',
                    confirm : '언어 변경',
                    success : '언어를 한국어로 변경합니다.',
                },
                {
                    code : 'en',
                    name : 'English',
                    confirm : 'Change language',
                    success : 'Change the language to English.',

                },
                {
                    code : 'jp',
                    name : 'にほんご',
                    confirm : '言語を変更する',
                    success : '言語を日本語に変更します。',

                },
                {
                    code : 'zh',
                    name : '中國語',
                    confirm : '改变语言',
                    success : '将语言更改为中文。',
                },
            ],

            selectIndex : 0,

            gogo : false,

            swiper : null,

            modelData : {
                isShow : false,
            }
        }
    },
    computed : {
        currentIndex () {
            let index = 0;
            for(let i = 0, l = this.regionList.length; i < l; ++i){
                const regionData = this.regionList[i];
                if(regionData.code === this.$store.state.region){
                    index = i;
                    break;
                }
            }
            return index;
        },

        isOpen() {
            return this.$store.state.$nav.is_openRegionChange;
        },
        selectRegion() {
            return this.regionList[this.selectIndex];
        },
        selectRegionText() {
            return this.selectRegion[this.gogo ? 'success' : 'name'];
        },
    },
    watch : {
        "isOpen"() {
            this.watchIsOpen();
        },
        "modelData.isShow"() {
            // this.watchModelData();
        },
    },

    methods : {
        onClickSelect() {
            this.gogo = !this.gogo;

            setTimeout(() => {
                this.$store.dispatch('changeRegion' , this.selectRegion.code);
                this.gogo = false;
            },1500)
        },
        onClickDimmed() {
            this.$store.dispatch('closeRegionPanel');
        },
        watchIsOpen(){

            if(this.isOpen){
                this.selectIndex = this.currentIndex;
                setTimeout(() => {
                    this.openMotion();
                    this.renderSwiper();
                })
            }else {
                this.closeMotion();
            }
        },

        openMotion() {

        },
        closeMotion() {

        },

        renderSwiper() {

            const slideChange = ({realIndex}) => {
                this.selectIndex = realIndex;
            };

            const options = {
                // freeMode : true,
                // freeModeSticky : true,
                mousewheel      : true,
                slidesPerView   : 'auto',
                // slidesPerView   : 3,
                initialSlide    : this.selectIndex,

                centeredSlides  : true,
                loop            : true,
                parallax        : true,

                spaceBetween : 30,

                on : {
                    slideChange
                }
            };

            this.swiper = new this.$swiper(this.$refs.ref_swiper, options);

        },

    },

    mounted() {
    },

}

export const regionChangeStore = {
    state : {
        is_openRegionChange : false,
    },
    mutations : {
        REGION_open({$nav}) {
            $nav.is_openRegionChange = true;
        },
        REGION_close({$nav}) {
            $nav.is_openRegionChange = false;
        },
    },
    actions : {
        openRegionPanel(context) {
            context.commit('REGION_open');
        },
        closeRegionPanel(context) {
            context.commit('REGION_close');
        },
    }
};

</script>

<style lang="scss" scoped>

.nav-region-leave-active {
    pointer-events: none !important;
}
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

    opacity: 1;
    transition:  opacity 300ms ease;

    &.nav-region-enter ,
    &.nav-region-leave-to  {
        opacity: 0;
    }

}

.region__dimmed {
    position: absolute;
    width: 100%; height: 100%;
    background-color: rgba(255,255,255,0.4);

    top: 0; left: 0;
    z-index: 1;
    width: 100%; height: 100%;

}

.region__cover {
    width: 100vw; height: 100vh;

    display: inline-block;
    position: absolute;
    // position: fixed;
    // top: 0; left: 0;
    background-color: rgba(200,0,0,0.5);
    // background: rgb(22, 105, 230);
    background-color: rgba(255,255,255,1);
    z-index: 10;
    // display: none;
    border-radius: 9999px;
    transform: scale(0);
    pointer-events: none;
    opacity: 0;
    transition: transform 600ms $EASE_outCubic , opacity 500ms ease;

    .st-gogo & {
        opacity: 1;
        transform: scale(1.45);
        pointer-events: all;
    }
}

.region__panel {
    border-radius: 100%;
    position: relative;
    z-index: 2;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 500px; height: 500px;

    @include phone {
        width: 90vw; height: 90vw;
    }

    &.st-gogo {
        // pointer-events: none;
    }

    // background: linear-gradient(127deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0.2) 85%, rgba(0,0,0,0.05) 100%);
    // background: rgba(255,255,255,0.3);
    background-color: rgba(255,255,255,0.98);

    border: 3px solid #fff;
    box-shadow: inset 8px 8px 5px rgba(255,255,255,0.8) , 0 25px 40px rgba($color : dodgerblue , $alpha : 0.2);

    &::before {
        @keyframes regionGlobe {
            0% {background-position: -100% 0 ;}
            100% {background-position: 100% 0 ;}
        }
        content: '';
        display: inline-block;
        top: 0; left: 0;
        width: 100%; height: 100%;
        position: absolute;
        border-radius: inherit;
        background-image: url('~@/assets/illust/worldmap.png');
        // background-position: 200% 100%;
        background-repeat: repeat;
        background-size: 200% 100%;
        animation: regionGlobe 30s linear infinite;
        opacity: 0.035;
    }

}

.region__swiper {
    width: 100%; height: 100%;
    z-index: 20;

    box-sizing: border-box;
    overflow: hidden;
    cursor: grab;
    position: relative;
    border-radius: 100%;

    .st-gogo & {
        pointer-events: none;
    }

    &::before , &::after{
        content: '';
        width: 100%; height: 100%;
        position: absolute;
        display: inline-block;
        top: 0; left: 0;
        pointer-events: none;
        border-radius: 100%;
        transform-origin: center;

        transition: opacity 300ms ease;

        .st-gogo & {
            opacity: 0;
        }
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
        // $inner_color : red;

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

        transition: opacity 300ms ease , transform 350ms $EASE_outBack2;

        .st-gogo & {
            opacity: 0;

            &.swiper-slide-active {
                opacity: 1;
                transform: scale(1.3) translate3d(0,-50%,0);
            }
        }

        .region__flag {
            width: 100%; height: 100%;
            display: inline-block;
            border: 2px solid rgba(0,0,0,0.06);
            border-radius: 25%;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            box-sizing: border-box;
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

.region__spinner {
    position: absolute;
    bottom: 35%;
    width: 100%;
    z-index: 10;
    opacity: 0;
    transition: opacity 300ms ease;
    transform: translateY(-50%);

    .st-gogo & {
        opacity: 1;
    }
}

.region__name {
    position: absolute;
    bottom: 25%;
    transform: translateY(50%);
    font-size: 26px;
    z-index: 20;
    font-weight: 700;
    color: #333;

    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 400ms ease;
    width: 100%;
    pointer-events: none;

    @include phone {
        padding: 0 $SIZE_MO_innerPadding;
    }

    .st-gogo & {
        // color: dodgerblue;
        transform : scale(1.12) translateY(50%);
    }

    > .mask-text {
        word-break: break-all;
        width: 100%;
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
    z-index: 9;
    // z-index: 20;
    pointer-events: none;

    .region__select {
        pointer-events: all;
        background-color: dodgerblue;
        border-radius: 14px;
        width: 220px; height: 50px;
        transition: background-color 200ms ease, transform 180ms $EASE_outBack2;
        text-align: center;
        color: #fff;
        font-weight: 700;
        position: relative;
        box-shadow: 0 5px 8px rgba(0,0,0,0.2);
        z-index: 99999;

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
            width: 100%;
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

</style>