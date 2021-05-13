<template>

    <div class="pagemission page--todomath layout">

        <div class="temp-notice">
            <br>
            토도수학은 토도스쿨 오픈시 포함되지 않을 예정이며 페이지 테스트용 공간으로 사용중입니다
            <br><br>
            다국어 시스템 테스트중..
            <br>(지역,언어 값 이하 <strong>"지역"</strong> 으로 표기)
            <br>
            <br>
            [클라이언트에 보관되는 지역 값 ~ (우선순위 순)]
            <br>
            <br><strong>1. 현재 설정 값 (실 표출용) : {{ region }}</strong>
            <br>2. 로컬 스토리지 - 탐지(최초) : {{ $detect.region.storage  || '미발견'}} , 예정 :  {{ $store.state.region  || '미발견'}}
            <br>3. 로그인된 계정의 저장값 : {{ $store.state.$user.region || '미발견'}}
            <br>4. 브라우저 탐지 (최초): {{ $detect.region.navigator || '미발견'}}

            <div class="temp-control">
                <strong>웹 앱 내에서 변경 도구 (ex : 사이트의 "언어변경")</strong>
                <br>
                <InputRadioCollection   v-model="radioSiteRegion"
                                        name="test-1"
                                        :list="[
                                        {
                                            text : '한국',
                                            value : 'ko',
                                        },
                                        {
                                            text : '미국',
                                            value : 'en',
                                        },
                                        {
                                            text : '일본',
                                            value : 'jp',
                                        },
                                        {
                                            text : '중국',
                                            value : 'zh',
                                        }
                                    ]"
                />
                <ButtonDefault @click="changeSiteRegion">
                    사이트 지역 바꾸기
                </ButtonDefault>
            </div>
            <div class="temp-control">
                <strong>유저계정의 지역 설정후 저장 (ex : 계정설정 - 지역변경)</strong>
                <br>
                <InputRadioCollection   v-model="radioUserRegion"
                                        name="test-2"
                                        :list="[
                                        {
                                            text : '한국',
                                            value : 'ko',
                                        },
                                        {
                                            text : '미국',
                                            value : 'en',
                                        },
                                        {
                                            text : '일본',
                                            value : 'jp',
                                        },
                                        {
                                            text : '중국',
                                            value : 'zh',
                                        }
                                    ]"
                />
                <ButtonDefault  @click="changeAccountRegion"

                                :disable="!$store.state.$user.is_login"
                >
                    {{
                        $store.state.$user.is_login ? '계정 지역 바꾸기' : "로그인 필요"
                    }}
                </ButtonDefault>
            </div>
        </div>


        <br>


        <div class="temp-display">

            <p>~ 이하 표시 테스트 ~</p>
            <br>
            <h1>
                {{ $l.MAIN_HEADER_TITLE }}
            </h1>
            <h2>
                {{ $l.MAIN_HEADER_TEXT }}
            </h2>

            <br>
            <p>br</p><br>
            <p>br</p><br>
            <p>br</p><br>
            <p>br</p><br>
            <p>br</p><br>
            <p>br</p><br>
            <p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br>
            fin

        </div>

        <div id="sticky">
            test : css sticky
        </div>

        <div id="scrolltt"></div>
        <div id="scrollt">
            <template v-for="item in 122">
                <div :key="item">
                </div>
            </template>

        </div>

        <p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br><p>br</p><br>

    </div>

</template>

<script>
import InputRadioCollection from '@/components/input/InputRadioCollection.vue';
import ButtonDefault from '@/components/button/ButtonDefault.vue';

import todoMathContent from './todoMathContent.json';

export default {
    components : {
        InputRadioCollection,
        ButtonDefault,
    },
    data() {
        return {
            radioSiteRegion : this.$store.state.region,
            radioUserRegion : this.$store.state.$user.resion,
        }
    },
    computed : {

        region() {
            return this.$store.state.region;
        },
        $l() {
            const result = {};
            Object.keys(todoMathContent).map(c => {
                result[c] = todoMathContent[c][this.region];
            });
            return result;
        },
    },
    methods : {
        changeSiteRegion() {
            // console.log(this.radioSiteRegion , '사이트 언어 변경');
            this.$store.dispatch('changeRegion' , this.radioSiteRegion);
        },
        changeAccountRegion() {
            // console.log(this.radioUserRegion , '계정 지역 변경/저장');
            this.$store.dispatch('saveAccountRegion' , this.radioUserRegion);
        }
    },
    mounted() {
        const target = document.querySelectorAll('#scrollt > div');

        [...target].forEach((child) => {
            this.$gsap.to(child , {
                x : window.innerWidth - child.offsetWidth,
                y : -20,
                scrollTrigger : {
                    trigger : child,
                    // scrub : true,
                    scrub : 0.5,
                    to : window.innerHeight,
                    ease : 'power4.inOut'
                }
            })
        });

    }
}
</script>



<style lang="scss" scoped>

#scrollt {
    display: flex;
    flex-direction: column;
    // align-items: center;
    overflow: hidden;
}
#scrollt div {
    margin-right: auto;
    display: inline-block;
    position: relative;
    width: 100px;
    margin-top: 1px;
    height: 5px;
    color: #fff;
    font-weight: bold;
    background-color: red;
}
#sticky {
    position: sticky;
    // top: 0; left: 0;
    display: inline-block;
    background: rgb(245, 85, 138);
    border: 1px solid #ddd;
    border-radius: 20px;
    padding: 20px;
    width: calc(100% - 40px);
    bottom: 20px;
    color: #fff;
}
.temp-notice {
    background: dodgerblue;
    // font-weight: 700;
    color: #fff;
}
.temp-control {
    // > div {
        // border: 1px solid dodgerblue;
        margin-top: 40px;
    // }
    border: 3px dashed #ccc;
    margin-right: auto;
    padding: 5px;
}
.page--todomath {
    // border: 1px solid #d3d;
}
.temp-display{
    @include hardSelect {
        color:dodgerblue;
        text-align: center;
    }
}
h1 {
    font-size: 50px;
}
h2 {
    font-size: 24px !important;
}
</style>