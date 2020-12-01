<template>
    <footer id="plate--footer" class="plate">

        <div class="footer__inner">

            <div class="footer__external">
                <div class="footer__copyright">
                    ⓒ 2018 Enuma, Inc. All Rights Reserved.
                </div>
                <ul class="footer__notice-links">
                    <li><a href="#" class="link-hover">이용약관</a></li>
                    <li><a href="#" class="link-hover">개인정보처리방침</a></li>
                    <li><a href="#" class="link-hover">법적고지</a></li>
                </ul>
                <ul class="footer__sns-links">
                    <li>
                        <a href="#" class="link-hover">
                            <i class="fab fa-instagram"></i>
                            <span class="visible-overphone">인스타그램</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="link-hover">
                            <i class="fab fa-facebook-square"></i>
                            <span class="visible-overphone">페이스북</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="link-hover">
                            <i class="fab fa-youtube-square"></i>
                            <span class="visible-overphone">유튜브</span>
                        </a>
                    </li>
                </ul>
            </div>

            <span class="footer__line"></span>

            <div class="footer__infomation">

                <div class="footer__company">
                    <span class="footer__companyname">
                        에누마코리아(주)
                    </span>

                    <span class="footer__company-ceo ">
                        <span class="type-category">대표</span>전유택
                    </span>
                </div>

                <div class="footer__business-license">
                     <span class="type-category">사업자 등록번호</span>833-86-00976
                </div>
                <div class="footer__address">
                    <span class="type-category">주소</span>
                    서울특별시 성동구 뚝섬로1나길 5, G301호 (성수동 1가, 헤이그라운드)
                </div>
                <div class="footer__phone-number">
                    <span class="type-category">전화</span>
                    1833-4405
                </div>
                <div class="footer__mail-order-sale">
                    <span class="type-category">통신판매 신고번호</span>
                    2020-서울성동-00488
                </div>
            </div>

        </div>
    </footer>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#plate--footer {
    margin-top: auto;
    border-top: 1px solid #F2F0E9;
    justify-self: flex-end;
    padding: 60px 0 75px;
    box-sizing: border-box;

    @include hardSelect {
        color: #999;
        font-size: $SIZE_MO_fontsizeDefault;
    }

    @include phone {
        overflow: hidden;
    }

    .footer__inner {
        margin: 0 auto;
        // width: 100%;
        width: $SIZE_PC_contentWidth;
        padding: 0 $SIZE_PC_innerPadding;
        box-sizing: border-box;

        @include phone {
            width: 100%;
            padding: 0 $SIZE_MO_innerPadding;
            max-width : $SIZE_MO_contentWidth;
        }
    }

    a {
        padding: 0.07em 0.1em;
        @include hover {
            font-weight: 700;
        }
    }

    .type-category {
        opacity: 0.5;
        margin-right: 5px;
    }

}

.footer__line {
    width: 100%;
    height: 1px;
    display: inline-block;
    background: #F2F0E9;
    margin: 50px 0 ;
    position: relative;
    @include phone {
        width: 102vw;
        left: 50%;
        margin: 40px 0 ;
        transform: translateX(-50%);
    }
}

.footer__external {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;

    .footer__copyright {
        width: 100%;
        margin-bottom: 25px;
        @include phone {
            margin-bottom: 0;
            margin-top: 20px;
        }
    }

    .footer__notice-links {
        display: flex;
        @include phone {
            margin-top:10px;
        }
        li {
            display: flex;
            align-items: center;
            & + li {
                &::before {
                    content: '';
                    display: inline-block;
                    width: 1px; height: 12px;
                    background-color: #F2F0E9;
                    margin-left: 15px;
                    margin-right: 15px;
                }
            }
        }
    }

    .footer__sns-links{
        display: flex;
        @include phone {
            order : -1;
        }

        li {
            & + li {
                margin-left: 25px;
            }

            a {
                display: flex;
                i.fab {
                    font-size: 20px;
                    margin-right: 4px;
                    margin-top: -1px;

                    @include phone {
                        font-size: 34px;
                    }
                }
            }
        }

    }

}

.footer__infomation {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    line-height: $SIZE_lineheight_high1;

    @include phone {
        line-height: $SIZE_lineheight_high2;
    }

    > div {
        margin-right: 30px;
    }

    .footer__company {
        width: 100%;

        margin-bottom: 20px;
    }
}


</style>