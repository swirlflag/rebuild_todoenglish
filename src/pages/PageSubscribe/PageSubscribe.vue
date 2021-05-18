<template>

    <div class="pagemission page--subscribe">

        <section class="subscribe__notice">
            <p>
                선택하기 전에 알려드립니다!
            </p>
        </section>

        <section class="subscribe__header">
            <h1>선택한 학습 과목의 구독권을 발급받아 볼까요?</h1>
        </section>

        <br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br>br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br<br> br

        <section class="subscribe__configure">

            <div class="subscribe__configure__wrap">


                <div class="subscribe__option">
                    <div class="subscribe__configure__block">
                        <p class="subscribe__block__title">
                            먼저, 구독하려는 과목을 선택해주세요.
                        </p>
                        <div class="subscribe__block__radios">
                            <RadioCollection
                                                :list="['토도영어','토도한글']"
                                                @change="log"
                                                type="flat"

                            />
                        </div>

                    </div>

                    <br><br>

                    <div class="subscribe__configure__block">
                        <p class="subscribe__block__title">
                            구독하려는 자녀의 프로필 갯수를 알려주세요.
                        </p>
                        <div class="subscribe__block__radios">
                            <RadioCollection
                                                :list="['한 자녀','두 자녀']"
                                                @change="log"
                                                type="flat"

                            />
                        </div>

                    </div>

                    <br> <br>
                    <div class="subscribe__configure__block">
                        <p class="subscribe__block__title">
                            상품의 구독 기간은요?
                        </p>
                        <div class="subscribe__block__radios">
                            <RadioCollection
                                                :list="['6개월' , '12개월']"
                                                @change="log"
                                                type="flat"

                            />
                        </div>
                    </div>
                    <br><br>

                    워크시트 추가 구입하기
            <br>
                    태블릿

                    <br>
                    토도라이브 티켓


                    <div class="subscribe__configure__block">
                        <p class="subscribe__block__title">
                            
                        </p>
                        <div class="subscribe__block__radios">
                            <RadioCollection
                                                :list="['6개월' , '12개월']"
                                                @change="log"
                                                type="flat"

                            />
                        </div>
                    </div>
                </div>

                <div class="subscribe__status">

                    <div class="subscribe__ticket">
                        <div class="subscribe__ticket__title">
                            <p>토도영어</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>

    </div>

</template>

<script>

import RadioCollection from '@/components/input/RadioCollection.vue';
export default {
    components : {
        RadioCollection,
    },
    data() {
        return {
        }
    },
    methods : {
        log(v){
            console.log(v)
        }
    }
}
</script>

<style scoped lang="scss" src="./PageSubscribe.scss"></style>
<style lang="scss" scoped>

.page--subscribe {
    // border: 1px solid #000;
}

section {
    // border: 1px solid #d3d;
    @include layout;
    // background-color: #aa1;
}

.page--subscribe {

}

.subscribe__header {
    h1 {
        // font-size: ;
        // font-size: 20px;
        // color: #d3d;
    }
}



.subscribe__configure {
    border: 1px solid #d3d;
}
.subscribe__configure__wrap {
    border: 1px solid #3d3;
    display: flex;
    height: 100%;
    min-height: 100%;
}

.subscribe__status{
    width: 50%; height: auto;
    height: auto;
    display: inline-block;
    box-sizing: border-box;
    border: 2px dashed #d3d;
    border-radius: 16px;
    flex : 0 0 auto;
    // position: sticky;
    display: flex;
    // align-items: center;
    // justify-content: center;
    // top: 0;
    // top: 0;

}

.subscribe__ticket {
    width: 400px; height: 800px;
    border: 1px solid #ddd;
    color: #fff;
    background: dodgerblue;
    background-color: #E03F82;

    position: sticky;
    top: calc(50% - 400px);

    .subscribe__ticket__title {
        border: 1px solid #fff;
        font-size: 30px;
        font-weight: 300;
    }
}

// font-family: 'Bebas Neue', cursive;

.subscribe__option {
    width: 50%;
    // margin-left: 50px;
    margin-right: 50px;
}
.subscribe__configure__block {
    width: 100%;
    border: 1px solid #000;
    p {
        @include TEXT_SUBTITLE_M;
    }
}

</style>