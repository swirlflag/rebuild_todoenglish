<template>
    <div class="page-contents">

        <header class="main-header section__outer ">
            <div class="section__inner">
                <h1 class="main-header__title">
                    실패가 없는
                    <br>모두의 영어유치원
                </h1>
                <span class="main-header__logo">
                    <img src="@/assets/main/img_signboard.svg" alt="토도영어 로고 | TODO ENGLISH">
                </span>
                <p class="main-header__description">
                    아이들의 즐거운 첫 영어 시작을 응원합니다.
                    <br class="visible-overphone">
                    <span class="fw-b">15일 무료 체험</span>을 시작하세요.
                </p>
                <div class="main-header__downloads">

                    <DownloadButton type="apple" class="visible-overphone"/>

                    <DownloadButton type="google" class="visible-overphone"/>

                    <DownloadButton type="mobile" class="visible-phone"/>

                </div>

                <span class="image-box main-header__source-children"></span>

            </div>
        </header>

        <section class="main-introduce section__outer">
            <div class="section__inner">
                <div class="introduce__logo image-box" >
                    <img src="@/assets/logo/logo_todoenglish_vertical_white.svg" alt="토도영어 로고 | TODO ENGLISH">
                </div>

                <p class="introduce__description">
                    <span class="fw-b">토도영어</span> 는,
                    <br>
                    기초영어를 배우는 아이들을 위한 태블릿 학습 애플리케이션입니다.
                    <br class="visible-overphone">
                    영어 유치원에 가지 않는 아이도 알파벳부터 파닉스, 영어책 읽기 등의 학습을
                    <br class="visible-overphone">
                    충분히 할 수 있도록 설계되었습니다.
                </p>
            </div>
        </section>

        <section class="main-subheader section__outer">
            <div class="section__inner">
                <h2 class="subheader__title">
                    앱만으로 진짜 공부가 되는
                    <br class="visible-overphone">디지털 콘텐츠
                </h2>
                <p class="subheader__description">
                    게임과 같은 몰입감, 단순 암기와 반복도 즐거워요.
                </p>
            </div>
        </section>

        <section class="main-activity showing-section section__outer">
            <div class="section__inner">
                <div class="showing__content">
                    <div class="showing__subtitle">
                        <span class="icon icon--alphabet"></span>
                    </div>
                    <h3 class="showing__title">
                        반복 학습임을 잊게하는 액티비티
                    </h3>
                    <p class="showing__description">
                        똑같은 학습이라도 다양한 방식으로 접근하니 단순 암기와 반복도 즐거워요
                    </p>
                </div>
            </div>
            <div class="section__source">
                <span></span>
            </div>
        </section>

        <section class="main-culture showing-section section__outer">
            <div class="section__inner">
                <div class="showing__content">
                    <div class="showing__subtitle">
                            <span class="icon icon--movieslate"></span>
                        </div>
                        <h3 class="showing__title">
                            영미 문화와 일상을 체험
                        </h3>
                        <p class="showing__description">
                            미국 또래 아이들의 학교생활, 말하는 스타일 등
                            <br class="visible-overphone">
                            짜인 연극이 아닌 리얼한 진짜 영상으로 경험할 수 있어요.
                        </p>
                    </div>
                </div>
            <div class="section__source">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>

        <section class="main-interview section__outer" style="background-color:#1f96db">
            <div class="section__inner">
                <div class="interview__portrait image-box">
                    <img src="@/assets/main/img_interview_thumb_1.png" alt="토도영어 인터뷰 사진 - Raoul Kim">
                </div>
                <div class="interview__content">
                    <p class="interview__opinion">
                        “학습은 흥미를 잃지 않는 것이 가장 중요해요.
                        <br class="visible-overphone">
                        토도영어는 언제 공부하더라도 늘 새롭고
                        <br class="visible-overphone">
                        재미있을 수 있어요.”
                    </p>
                    <div class="interview__info">
                        <div class="interview__name">Raoul Kim</div>
                        <div class="interview__position">Head of Product, enuma Korea</div>
                    </div>
                    <div class="interview__showvideo">
                        <span class="icon icon--playbutton c-yellow"></span>
                        <span style="color: #ff0">인터뷰 영상 보기</span>
                        <span class="icon icon--arrow c-yellow"></span>
                    </div>
                </div>
            </div>
        </section>

        <section class="main-weeklyreport showing-section type-right section__outer">
            <div class="section__inner">
                <div class="showing__content">
                    <div class="showing__subtitle">
                        <span class="icon icon--uppergraph"></span>
                    </div>
                    <h3 class="showing__title">
                        한눈에 파악하는
                        <br>
                        주간 토도 리포트
                    </h3>
                    <p class="showing__description">
                        얼마나 꾸준히 했는지, 어떤 활동을 좋아했고 어려워 했는지,
                        <br class="visible-overphone">
                        다른 아이들에 비해선 어떤지 등을 알 수 있는 토도 리포트를 매주 보내드려요
                    </p>
                </div>

                <div class="showing__source">
                    <!-- 추후마크업 -->
                    <div class="image-box">
                        <img src="@/assets/main/img_report.png" alt="">
                    </div>
                </div>
            </div>
        </section>

        <section class="main-dailynotice showing-section section__outer">
            <div class="section__inner">
                <div class="showing__content">
                    <div class="showing__subtitle">
                        <span class="icon icon--talkwow"></span>
                    </div>
                    <h3 class="showing__title">
                        매일 받아보는
                        <br>
                        카톡 학습 알림
                    </h3>
                    <p class="showing__description">
                        아이의 학습 과정 중의 사소한 정보라도
                        <br class="visible-overphone">
                        카톡 데일리 학습 알림장으로 알려드려요
                    </p>
                </div>

                <div class="showing__source">
                    <!-- 추후마크업 -->
                    <div class="image-box">
                        <img src="@/assets/main/img_dailynotice.png" alt="">
                    </div>
                </div>
            </div>
        </section>

        <section class="main-coaching showing-section type-right section__outer" >
            <div class="section__inner">
                <div class="showing__content">
                    <div class="showing__subtitle">
                        <span class="icon icon--waypoint"></span>
                    </div>
                    <h3 class="showing__title">
                        학습관리가 쉬워지는
                        <br>코칭 가이드
                    </h3>
                    <p class="showing__description">
                        아이의 학습 속도, 학습 시간, 형태 등을 분석하고 비교하여
                        <br class="visible-overphone">
                        학습관리를 어떻게 해야하는지 알려드려요.
                    </p>
                </div>

                <div class="showing__source">
                    <!-- 추후마크업 -->
                    <div class="image-box">
                        <img src="@/assets/main/img_coaching.png" alt="">
                    </div>
                </div>
            </div>
        </section>

        <section class="main-interview section__outer" style="background-color:#E03F82">
            <div class="section__inner">
                <div class="interview__portrait image-box">
                    <img src="@/assets/main/img_interview_thumb_2.png" alt="토도영어 인터뷰 사진 - Jeff Park">
                </div>
                <div class="interview__content">
                    <p class="interview__opinion">
                        “디지털 서비스가 가질 수 있는 장점인 데이터를 적극.
                        <br class="visible-overphone">
                        활용해요. 아이의 학습 데이터를 그날그날 분석해서
                        <br class="visible-overphone">
                        부모님 카톡으로 알려드려요.”
                    </p>
                    <div class="interview__info">
                        <div class="interview__name">Jeff Park</div>
                        <div class="interview__position">Head of Business, enuma Korea</div>
                    </div>
                    <div class="interview__showvideo">
                        <span class="icon icon--playbutton c-cyan"></span>
                        <span style="color: #56D5E2">인터뷰 영상 보기</span>
                        <span class="icon icon--arrow c-cyan"></span>
                    </div>
                </div>
            </div>
        </section>

        <section class="main-subheader section__outer">
            <div class="section__inner">
                <h2 class="subheader__title">
                    미국 본사에서 개발한
                    <br class="visible-overphone">
                    디지털 ESL 커리큘럼
                </h2>
                <p class="subheader__description">
                    디지털 학습에 최적화 된 ESL 커리큘럼을 자체 개발 했어요.
                </p>
            </div>
        </section>

        <section class="main-curriculum showing-section section__outer" style="background-color:#fff">
            <div class="section__inner">
                <div class="showing__content">
                    <div class="showing__subtitle">
                        <span class="icon icon--todoenglish-school"></span>
                    </div>
                    <h3 class="showing__title">
                        미국 킨더 - 초등 2학년(G2)
                        <br>통합 커리큘럼
                    </h3>
                    <p class="showing__description">
                        <ul>
                            <li>
                                미국 공통교과 기준, 킨더(유치원) - G2(초2) 수준의 통합 커리큘럼을
                                <br>
                                약 2년의 학습 과정으로 제공합니다.
                            </li>
                            <li>
                                아이들은 Phonics, Syntax와 같은 하드 스킬 외에도
                                <br>
                                영미권 문화와 매너를 익히는 소프트 스킬을 학습합니다.
                            </li>
                            <li>
                                매달 배송되는 워크시트에 배운 내용을 복습하면서, 영어 ‘쓰기’를 시작합니다.
                            </li>
                            <li>
                                다양한 스피킹 액티비티와 화상 튜터링으로 통해 영어 ‘말하기’를 시작합니다.
                            </li>
                        </ul>
                    </p>
                    <a href="#" class="showing__link">
                        커리큘럼 자세히보기
                        <span class="icon icon--arrow"></span>
                    </a>
                </div>

                <div class="showing__source">
                    <!-- 추후마크업 -->
                    <div class="image-box">
                        <img src="@/assets/main/img_curriculum_map.png" alt="">
                    </div>
                </div>
            </div>
        </section>

        <section class="main-digitaltest showing-section type-right section__outer" style="background-color:#F2F0E9">
            <div class="section__inner">
                <div class="showing__content">
                    <div class="showing__subtitle">
                        <span class="icon icon--use-tablet"></span>
                    </div>
                    <h3 class="showing__title">
                        시험이라고 느끼지 못하는
                        <br>디지털 테스트
                    </h3>
                    <p class="showing__description">
                        토도영어의 테스트는, 퀴즈와 챌린지 등으로 설계되어 있어요.
                        <br>
                        아이들은 매주 1회 이상 테스트 과정을 거치지만,
                        <br>
                        이를 게임의 일부로 여기며 스트레스 없이 진행합니다.
                    </p>
                    <ul class="showing__precautions">
                        <li>
                            학습 진도와 성취도는 아마다 차이가 많습니다.
                            <br>
                            진도가 빠르다고 좋은 효과를 내는 것이 아니므로 아이의 속도에 맞추어 진행해 주세요.
                        </li>
                    </ul>
                </div>

            </div>

            <div class="section__source">
                <div class="image-box"></div>
            </div>
        </section>

        <section class="main-learning-content showing-section section__outer">
            <div class="section__inner">
                <div class="showing__content">
                    <div class="showing__subtitle">
                        <span class="icon icon--calendar"></span>
                    </div>
                    <h3 class="showing__title">
                        2년여간의
                        <br>풍부한 학습 콘텐츠
                    </h3>
                    <p class="showing__description">
                        <ul>
                            <li>
                                2000개 이상의 학습 액티비티
                            </li>
                            <li>
                                600일 이상의 데일리 코스
                            </li>
                            <li>
                                300개 이상의 영상 콘텐츠 / 200권 이상의 도서 콘텐츠
                            </li>
                            <li>
                                매주 1회 이상의 디지털 테스트
                            </li>
                            <li>
                                매달 제공되는 레벨 별 워크시트
                            </li>
                        </ul>
                    </p>
                    <ul class="showing__precautions">
                        <li>
                            콘텐츠는 계속 업데이트 됩니다.
                        </li>
                    </ul>
                </div>

            </div>

            <div class="section__source">
                <div class="image-box"></div>
            </div>

        </section>

        <section class="main-interview section__outer" style="background-color:#F59E1D">
            <div class="section__inner">
                <div class="interview__portrait image-box">
                    <img src="@/assets/main/img_interview_thumb_3.png" alt="토도영어 인터뷰 사진 - Laura Donahue">
                </div>
                <div class="interview__content">
                    <p class="interview__opinion">
                        “Every child can move through our system at their own
                        <br class="visible-overphone">
                        pace, in the path that’s best for them to learn.”
                        <br class="visible-overphone">
                        “토도영어에서는 모든 아이들이 각자에게 알맞는 속도로,
                        <br class="visible-overphone">
                        그리고 자신에게 가장 적합한 방법으로 학습할 수 있어요.”
                    </p>
                    <div class="interview__info">
                        <div class="interview__name">Laura Donahue</div>
                        <div class="interview__position">Head of Learning, enuma US</div>
                    </div>
                    <div class="interview__showvideo">
                        <span class="icon icon--playbutton c-green"></span>
                        <span style="color: #008F7E">인터뷰 영상 보기</span>
                        <span class="icon icon--arrow c-green"></span>
                    </div>
                </div>
            </div>
        </section>


    </div>

</template>

<script>
import DownloadButton from '@/components/button/DownloadButton.vue';

export default {
    name : 'PageMain',

    components : {
        DownloadButton,

    },
    data() {
        return {
            isNavClear : false,
        }
    },
    methods: {
        test(e) {
            console.log(e);
        },

        clearStyleNav() {
            this.$store.commit('use_claerGnb');
            this.$store.commit('unuse_whiteGnb');
        },
        defaultStyleNav() {
            this.$store.commit('unuse_claerGnb');
            this.$store.commit('use_whiteGnb');
        },

        checkNavStyle() {
            if(window.scrollY < 100){
                if(this.isNavClear){
                    return
                }
                this.clearStyleNav();
                this.isNavClear = true;

            }else {
                if(!this.isNavClear){
                    return
                }
                this.defaultStyleNav();
                this.isNavClear = false;
            }

        }
    },
    mounted () {

        this.checkNavStyle();
        window.addEventListener('scroll' , this.checkNavStyle );

    },

    beforeDestroyed() {
        window.removeEventListener('scroll' , this.checkNavStyle );
    }
}
</script>


<style lang="scss" scoped >
@import './PageMainStyle.scss';
</style>