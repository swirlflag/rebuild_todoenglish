<template>
<!--

    레이아웃별 사용법.. 아 헷갈려 나중에다시정리하기

    중앙 정렬 은 컴포넌트  혹은 컴포넌트 부모에 text-align :center

    inline 자동 줄바꿈을 포함한 height + height변환까지 사용할 경우엔 부모의 width를 직접 지정

    부모 > .mask-text를 100%로 지정해야 자동으로 바꿈줄을 만들지않음

    props contain 을 사용

 -->

    <span class="mask-text" ref="ref_root" :class="{'st-contain' : contain}">
        <span class="mask-text__target" :class="{'st-animate' : isAnimate}" ref="ref_target">
            <span class="mask-text__fly" ref="ref_fly">
                <span class="mask-text__before" v-html="beforeText" ref="ref_before"></span>
                <span class="mask-text__after" v-html="afterText" ref="ref_after"></span>
            </span>
            <span class="mask-text__contain" v-html="containText" ref="ref_contain"></span>
        </span>

    </span>
</template>

<script>

import gsap from 'gsap';

export default {
    props: {
        text        : null, // Number , String

        speed       : null ,// Number, String
        delay       : null , // Number ,String
        contain     : Boolean,  // true면 컴포넌트의 텍스트를 inline화한 사이즈를 사용함. false면 외부의 사이즈에 100%로 적용
        direction   : String, // top,bottom, left, right => 미구현
    },
    data() {
        return {
            beforeText  : '',
            afterText   : this.text || '',
            containText : this.text || '',

            remainderTexts : [],
            isAnimate   : false,
        }
    },
    watch : {
        'text'(now,old) {
            this.textWatcher(now,old);
        }
    },
    methods : {
        textWatcher(now,old) {
            if(this.isAnimate){
                this.remainderRegist(now,old);
                return;
            }

            this.beforeText     = old;
            this.afterText      = now;
            this.animate();
        },
        remainderRegist(now,old) {
            this.remainderTexts = [now,old];
        },
        remainderAnimate() {
        // 지연 동작
            if(!this.remainderTexts.length){
                return
            }
            const [now, old]    = this.remainderTexts;
            this.beforeText     = old;
            this.afterText      = now;
            this.remainderTexts = [];

            this.animate();
        },
        animate() {
            const fly       = this.$refs.ref_fly;
            const target    = this.$refs.ref_target;
            const contain   = this.$refs.ref_contain;
            const before    = this.$refs.ref_before;
            const after     = this.$refs.ref_after;

            const defaultSpeed = 0.58;

            const duration  = this.speed ? this.speed * 0.001 : defaultSpeed;
            const delay     = this.delay ? this.delay * 0.001 : 0;

            setTimeout(() => {

                const startWidth    = target.offsetWidth;
                // const startHeight   = target.offsetHeight;

                gsap.set(fly, {css : {width : this.contain ? 'auto' : null}});

                const ofs = {
                    before : {
                        width   : before.offsetWidth,
                        height  : contain.offsetHeight,
                    },
                    after : {
                        width   : after.offsetWidth,
                        height  : after.offsetHeight,
                    },
                };

                const maxWidth = Math.max(startWidth, ofs.before.width, ofs.after.width);

                gsap.set(target , {css : {width : maxWidth}});

                gsap.fromTo(target, {
                    height  : ofs.before.height,
                }, {
                    height  : ofs.after.height,
                    ease: 'power3.out',
                    duration,
                    delay ,
                    clearProps : 'all',
                });

                gsap.to(fly, {
                    y : -ofs.before.height,
                    ease: 'power3.out',
                    duration,
                    delay,
                    clearProps : 'all',
                    onStart : () => {
                        this.isAnimate = true;
                        this.containText = this.afterText;
                    },
                    onComplete : () => {
                        this.isAnimate = false;
                        gsap.set(this.$refs.ref_target , {css : {
                            width : null
                        }});
                        this.remainderAnimate();
                    }
                })
            },1);

        }
    }

}
</script>

<style scoped lang="scss">

.mask-text {
    display: inline-block;
    width: auto;
    box-sizing: border-box;

    &.st-contain {
        width: 100%;
        white-space: nowrap;
    }
}

.mask-text__target {
    box-sizing: border-box;
    position: relative;
    width: auto; height: auto;
    display: inline-block;
    vertical-align: top;
    text-align: inherit;
    overflow: hidden;
    // border: 1px solid #3d3;
    width: 100%;
}
.mask-text__fly {
    box-sizing: border-box;
    position: absolute;
    top: 0; left: 0;
    width: auto; height: auto;
    width: 100%;
    flex-direction: column;
    text-align: inherit;
    display: inline-flex;
    pointer-events: none;
    user-select: none !important;
    transform: translateY(0);
    vertical-align: top;
    // visibility: hidden;
    opacity: 0;
    // opacity: 0.3;
    // flex-wrap: wrap;

    .st-animate &{
        // visibility: visible;
        opacity: 1;
    }

    > span {
        vertical-align: top;
        box-sizing: border-box;
        width: auto;
        position: relative;
        display: inline-block;
        text-align: inherit;

        // background-color: rgba(50,255,50,0.2); &:nth-child(2) {background-color: rgba(255,0,50,0.2);}
    }
}

.mask-text__contain {
    box-sizing: border-box;
    position: relative;
    width: auto;
    opacity: 1;
    height: 100%;
    display: inline-block;
    // white-space: nowrap;

    .st-animate &{
        opacity: 0;
        // opacity: 0.3;
        // color: #d3d;
    }
}


</style>
