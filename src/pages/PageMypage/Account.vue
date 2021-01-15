<template>
    <div class="mypage-account area__outer">
        <div class="area__inner">
            <div class="valueboard account__basic">
                <div class="valueboard__header">
                    <h3 class="valueboard__title">
                        계정
                    </h3>
                </div>
                <div class="valueboard__content">
                    <div class="valueboard__block">
                        <div class="valueboard__key">
                            <span class="valueboard__keyname">
                                ID
                            </span>
                        </div>
                        <div class="valueboard__value">
                            <div class="value__id thumb-text">
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
                        <div class="valueboard__value">
                            <div class="value__connect-mail thumb-text">
                                <span class="icon icon--mail"></span>
                                이메일 인증 완료
                            </div>
                            <div class="value__connect-kakao thumb-text">
                                <span class="icon icon--rect-kakao"></span>
                                카카오 인증하기
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="valueboard">
                <div class="valueboard__header">
                    <h3 class="valueboard__title">
                        멤버십
                    </h3>
                </div>
                <div class="valueboard__content">
                    <div class="valueboard__block">
                        <div class="valueboard__key">
                            ID
                        </div>
                        <div class="valueboard__value">
                            seunghyun@enuma.com
                        </div>
                    </div>
                    <div class="valueboard__block">
                        <div class="valueboard__key">
                            비밀번호
                        </div>
                        <div class="valueboard__value">
                            ㅇㄴㅁ
                        </div>
                    </div>
                    <div class="valueboard__block">
                        <div class="valueboard__key">계정 인증 ?</div>
                        <div class="valueboard__value">
                            이메일 인증 완료
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'mypageStudyInfo',
    components : {

    },
}
</script>

<style scoped lang="scss">

.account__basic {
    border: 1px solid #d3d;

    .icon {
        margin-right: 5px;
    }

    .thumb-text {
        display: flex;
        align-items: center;

        & + .thumb-text {
            margin-left: 90px;
        }

        &.value__connect-kakao {
            .icon {
                width: 20px; height: 20px;
            }
        }
    }


}
</style>