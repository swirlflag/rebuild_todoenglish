<template>
    <div class="banner-alert">
        <div class="banner__list" ref="ref_list">
            <!-- <transition-group name="banner-alert"> -->
                <template v-for="(item,idx) in alertList">
                    <div class="banner__item" :key="idx" :class="`${idx}`">
                        <div class="banner__icon">
                            <span class="icon icon--mail"></span>
                        </div>
                        <div class="banner__messege">
                            {{item.message}}
                        </div>
                        <button class="banner__close" @click="removeBanner(idx)">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </template>
            <!-- </transition-group> -->
        </div>
    </div>
</template>

<script>

const temp = [
    {
        icon : 'check',
        messege : '주세연 프로필이 삭제되었습니다.',
        time : 3000,
    }
]

{temp}

import gsap from 'gsap';

export default {
    data() {
        return {
            localAlertList : {

            }
        }
    },
    computed : {
        alertList() {
            return this.$store.state.$banner.alertList;
        },
    },

    watch : {
        '$store.state.$banner.alertList'(now,old) {

            const isAdd = now.length > old.length;

            setTimeout(() => {
                if(isAdd){
                    // console.log('추가!');
                    this.addBanner();

                }else {
                    console.log('삭제!');
                }
            },10)


            // console.log(now.length, this.localAlertList.length);

            // setTimeout(() => {
            //     this.localAlertList = now;
            // },100)

        }
    },
    methods : {
        addBanner () {
            const list = this.$refs.ref_list;

            const items = list.querySelectorAll('.banner__item');

            // const g

            // const itemHeight = items[0].offsetHeight;

            gsap.to(items , {
                y : (idx,item) => {
                    return item.offsetHeight * idx;
                },
                ease : 'power2.out',
                duration : 1,
            })

        },
        removeBanner(index) {
            {gsap}
            this.$store.commit('BANNER_removeAlert',index);
            // const list = this.$refs.ref_list;

            // const item = list.querySelectorAll('.banner__item')[index];

            // // console.log(item);

            // const tl = new gsap.timeline();

            // // console.log(tl);

            // tl.to(item, {
            //     opacity : 0,
            //     marginTop: -item.offsetHeight,
            //     ease: 'power2.out',
            //     duration : 1,
            //     onComplete : () => {
            //         this.$store.commit('BANNER_removeAlert',index);
            //     },
            // });

        },
    }
}

export const bannerAlertStore = {
    state : {
        alertList : [],
    },
    mutations : {
        BANNER_addAlert(state,item) {
            const copy = [...state.$banner.alertList];
            copy.push(item);
            state.$banner.alertList = copy;
        },
        BANNER_removeAlert(state,index) {
            const copy = [...state.$banner.alertList];
            copy.splice(index,1);
            state.$banner.alertList = copy;
        }
    },
    actions : {
        addBannerAlert({commit},payload = {}) {
            if(typeof payload === 'string'){
                const basic = {
                    icon : 'check',
                    message :  payload,
                }
                commit('BANNER_addAlert' , basic);
            }
            if(typeof payload === 'object'){
                commit('BANNER_addAlert' , payload);
            }
        },

    }
}

</script>

<style scoped lang="scss">
$top : 10px;

.banner-alert {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    // background-color: rgba(255,255,255,0.4);
    // z-index: 1010;
    color: #fff;
    text-align: center;
    display: flex;
    justify-content: center;
    box-sizing: border-box;

    .banner__list {
        // border: 1px solid #3d3;
        width: 100%; height: auto;
        max-width : #{$SIZE_PC_contentWidth - ($SIZE_PC_innerPadding*2)};
        margin: 0 $SIZE_PC_innerPadding;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        flex-direction: column;
        transform : translate3d(0,#{$top + $SIZE_PC_gnbHeight} ,0);
        transform : none;
    }
}

.banner__item {
    opacity: 0.1;
    pointer-events: all !important;
    max-width : $SIZE_PC_contentWidth;
    width: 100%;
    font-weight: 700;
    box-sizing: border-box;
    position: absolute;
    top: 0; left: 0;
    background-color: rgba(52,45,81,0.9);
    // box-shadow: 0 0 5px 0 rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 12px 18px 14px;
    display : flex;
    align-items: center;

    & + .banner__item {
        // margin-top: #{$top/2};
    }

    .banner__icon {
        display: flex;
        align-items: center;
        margin-right: 10px;
    }

    .banner__messege {

    }

    .banner__close {
        cursor: pointer;
        display: inline-block;
        width: 24px; height: 24px;
        margin-left: auto;
        position: relative;
        span {
            position: absolute;
            display: inline-block;
            width: 100%; height: 10%;
            top: 45%; left: 0;
            background-color: #fff;
            &:nth-child(1){
                transform : rotate(45deg);
            }
            &:nth-child(2){
                transform : rotate(-45deg);
            }
        }
    }
}

// .banner-alert-leave-active {
//     // position: absolute !important;
//     // transition: transform 5300ms $EASE_inCubic , opacity 5400ms ease;
// }
// .banner-alert-enter-active  {
//     transition: transform 600ms $EASE_outQuart , opacity 600ms ease;
//     // transform : translate3d(0, -20px, 0) ;
//     // transition-delay: 400ms;
// }

// .banner-alert-leave {
//     opacity: 1;
//     transform : translate3d(0, 0, 0);
// }
// .banner-alert-leave-to {
//     opacity: 0;
//     transform : translate3d(0, 0, 0) ;
// }

// .banner-alert-enter-active {
//     position: relative;
// }

// .banner-alert-enter {
//     opacity: 0;
//     transform : translate3d(0, -20px, 0) ;
// }
// .banner-alert-enter-to{
//     opacity: 1;
//     transform : translate3d(0, 0, 0);
// }


</style>