<template>
    <div class="mypage-account area__outer">

        <div class="layout">

            <div class="account__basic valueboard">
                <div class="valueboard__header">
                    <h3 class="valueboard__title">
                        계정
                    </h3>
                </div>
                <div class="valueboard__content">
                    <div class="account__id valueboard__block">
                        <div class="valueboard__key">
                            <span class="valueboard__keyname">
                                ID
                            </span>
                        </div>
                        <div class="valueboard__value">
                            <div class="thumb-text">
                                <span class="icon icon--rect-kakao"></span>
                                <span>seunghyun@enuma.com</span>
                            </div>
                        </div>
                    </div>

                    <div class="valueboard__block">
                        <div class="valueboard__key">
                            <span class="valueboard__keyname">
                                비밀번호
                            </span>
                        </div>
                        <div class="valueboard__value">
                            <span class="hover-link theme-pink type-underline"><span>비밀번호 변경</span></span>
                        </div>
                    </div>

                    <div class="valueboard__block">
                        <div class="valueboard__key">
                            <span class="valueboard__keyname">
                                계정 인증
                            </span>
                        </div>
                        <div class="account__connect valueboard__value">
                            <div class="thumb-text">
                                <span class="icon icon--mail"></span>
                                <span>이메일</span>
                                <span class="hover-link theme-pink type-underline"><span>인증하기</span></span>
                            </div>
                            <div class="thumb-text">
                                <span class="icon icon--rect-kakao"></span>
                                <span>카카오 계정</span>
                                <span class="hover-link theme-pink type-underline"><span>인증하기</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="area__inner">


            <div class="account__membership valueboard">
                <div class="valueboard__header">
                    <h3 class="valueboard__title">
                        멤버십
                    </h3>
                </div>
                <div class="valueboard__content">
                    <div class="valueboard__block account__inuse">
                        <div class="valueboard__key">
                            사용중인 이용권
                        </div>
                        <div class="valueboard__value">
                            <ul class="account__blocklist account__pass">
                                <li class="account__block">
                                    <span class="account__block__name">무료 체험권</span>
                                    <span class="account__block__period">20.03.14 - 20.03.14</span>
                                    <span class="account__block__status">사용중</span>
                                </li>
                                <li class="account__block">
                                    <span class="account__block__name">12개월 이용권 + 갤럭시탭 A</span>
                                    <span class="account__block__period">20.03.14 - 20.03.14</span>
                                    <span class="account__block__status color-mint">미사용</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="valueboard__block">
                        <div class="valueboard__key">
                            총 사용 기간
                        </div>
                        <div class="valueboard__value">
                            2020.03.20 - 2020.03.20
                        </div>
                    </div>
                    <div class="valueboard__block">
                        <div class="valueboard__key">
                            추가 상품 구매 내역
                        </div>
                        <div class="valueboard__value">
                            <ul class="account__blocklist account__addon">
                                <li class="account__block">
                                    <span class="account__block__name">토도라이브 1회권</span>
                                    <span class="account__block__price">100000원</span>
                                    <span class="account__block__date">20.05.01</span>
                                </li>
                                <li class="account__block">
                                    <span class="account__block__name">갤럭시 탭 A7</span>
                                    <span class="account__block__price">100000원</span>
                                    <span class="account__block__date">20.05.01</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="valueboard__block">
                        <div class="valueboard__key">
                            멤버십 취소
                        </div>
                        <div class="valueboard__value">
                            <button class="hover-link theme-pink type-underline">
                                <span>취소 요청</span>
                            </button>
                        </div>
                    </div>
                    <div class="valueboard__block">
                        <div class="valueboard__key">
                            보유중인 쿠폰
                        </div>
                        <div class="valueboard__value">
                            [3]
                        </div>
                    </div>
                    <div class="valueboard__block account__couponfield">
                        <div class="valueboard__key">
                            쿠폰 등록
                        </div>
                        <div class="valueboard__value">

                            <form class="account__coupon__form" @submit.prevent="tryRegisterCoupon">
                                <div class="account__coupon__input">
                                    <InputDefault placeholder="플레이스홀더체크"/>
                                </div>
                                <div class="account__coupon__submit">
                                    <ButtonDefault
                                        theme="pink"
                                    >
                                        등록
                                    </ButtonDefault>
                                </div>
                            </form>

                            <ul class="account__coupon__notice">
                                <li class="prefix--asterisk precaution">
                                    발급받은 쿠폰번호를 등록해주세요.
                                </li>
                                <li class="prefix--asterisk">
                                    웰컴미션 달성 쿠폰은 등록없이 자동 적용됩니다.
                                </li>
                                <li class="prefix--asterisk precaution">
                                    구매 시 쿠폰은 중복하여 사용할 수 없으며, 가장 혜택이 높은 쿠폰이 자동으로 적용됩니다.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="valueboard">
                <div class="valueboard__header">
                    <h3 class="valueboard__title">
                        워크시트 배송 정보
                    </h3>
                </div>
                <div class="valueboard__content">
                    <div class="valueboard__block">
                        <div class="valueboard__key">
                            학습 어린이
                        </div>
                        <div class="valueboard__value">
                            [학습 어린이 이름]
                        </div>
                    </div>
                    <div class="valueboard__block">
                        <div class="valueboard__key">
                            배송 내역
                        </div>
                        <div class="valueboard__value">
                            <ul class="account__blocklist account__addon">
                                <li class="account__block">
                                    <span class="account__block__name">토도라이브 1회권</span>
                                    <span class="account__block__price">100000원</span>
                                    <span class="account__block__date">20.05.01</span>
                                </li>
                                <li class="account__block">
                                    <span class="account__block__name">갤럭시 탭 A7</span>
                                    <span class="account__block__price">100000원</span>
                                    <span class="account__block__date">20.05.01</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="valueboard__block">
                        <div class="valueboard__key">
                            배송 주소
                        </div>
                        <div class="valueboard__value">
                            [7]
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
import InputDefault     from '@/components/input/InputDefault.vue';
import ButtonDefault    from '@/components/button/ButtonDefault.vue';

export default {
    name : 'mypageStudyInfo',
    components : {
        InputDefault,
        ButtonDefault,
    },
    methods : {
        tryRegisterCoupon() {
            console.log('쿠폰등록시도');
        }
    }
}
</script>

<style scoped lang="scss">

.mypage-account {
    // margin-top: 80px;

    .valueboard__value {
        max-width: 500px;
    }
}

.account__blocklist {
    width: 100%;
    display: flex;
    flex-direction: column;

    .account__block {
        display: flex;
        background-color: $COLOR_lightgray_2;
        width: 100%;
        border-radius: 8px;
        padding: 16px 18px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        @include phone {
            padding: 16px;
        }

        & + .account__block {
            margin-top: 8px;
        }

        // > * {
        //     margin-left: 16px;
        // }

    }

    &.account__pass {
        .account__block__name {
            margin-right: auto;
        }
        .account__block__period {
            // font-size: $SIZE_PC_fontsize_small;
        }
        .account__block__status {
            font-weight: 700;
            width: 70px;
            text-align: right;

            &.color-mint {color: $COLOR_mint_1;}
            &.color-pink {color: $COLOR_pink_1;}
        }
    }

    &.account__addon {
        .account__block__name {
            margin-right: auto;
            // margin-left: 0;
            // width: 200px;
        }
        .account__block__price {
            // margin-right: auto;
            font-weight: 700;
        }
        .account__block__date {

            width: 80px;
            text-align: right;
        }
        
    }




}



.account__basic {

    .account__connect {
        .icon {
            width: 20px; height: 20px;
        }
    }

    .thumb-text {
        display: flex;
        align-items: center;

        > * {
            margin-right: 5px;
        }

        & + .thumb-text {
            margin-left: 90px;
        }
    }

}

.account__couponfield {

    border: 1px solid #d3d;

    .account__coupon__form{
        display :flex;
        width: 100%;
        align-items: center;
        .account__coupon__input {
            width: 100%;

        }
        .account__coupon__submit {

            .button--default {
                vertical-align: top;
                width: 126px;
                margin-left: 16px;
            }

        }

    }

    .account__coupon__notice {
        margin-top: 8px;
        // border: 1px solid #000;
        font-size: $SIZE_PC_fontsize_small;
        li {
            // border: 1px solid #000;
            line-height: $SIZE_lineheight_high2;
        }
    }

}

// .account__
</style>