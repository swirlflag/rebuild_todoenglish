<template>
    <div class="event--kakao-promotion">
        <div class="event--kakao-promotion__content" ref="ref_content">
            <div>
                <i class="icon--rect-kakao" ref="ref_icon"></i>
            </div>
            <div class="test-title" ref="ref_title">
                카카오 이벤트??
            </div>
        </div>

        <div class="event--kakao-promotion__precaution">
            <p ref="ref_p">
                카카오와 <strong>함께하지 않는</strong> 레이아웃 이벤트 테스트용 컴포넌트 입니다.
                <br>
                색상도 노란색이라 테스트용으로 대충 만들기도 좋아요!
                <br>
                mount 기준도 지역 레이아웃 기준이라, 커스텀이 용이합니다.
                <br>
                너비가 지정되지 않은 부모의 상태를 체크하기 위해 이렇게 긴 줄도 만들어두면, 이 줄의 길이를 기준으로 너비가 정해지게 됩니다.
            </p>

            <ul class="list--dot precaution" ref="ref_list">
                <li>카카오랑 이벤트 하는거 없습니다.</li>
                <li>리스트 생성용입니다.</li>
                <template v-if="isShowList">
                    <li v-for="item in length" :key="item" class="visible-phone1" >
                        Scroll Dummy {{ item }}!
                    </li>
                </template>
                <li>레이아웃을 확인합니다.</li>
            </ul>
        </div>


    </div>
</template>

<script>
import gsap from 'gsap';
export default {
    props: {
        isShowList : Boolean,
    },
    data() {
        return {
            // length : 50,
            length : 100,
        }
    },
    methods :{
        simpleAnimate(){
            {gsap}

            gsap.from(this.$refs.ref_icon , {
                scale : 0.3,
                opacity : 0,
                ease : 'back.out',
                duration : 0.3,
                delay : 0.4,
            })

            gsap.from(this.$refs.ref_title, {
                letterSpacing : '0.5em',
                opacity : 0,
                ease : 'power4.out',
                duration : 0.9,
                delay : 0.7,
            });

        },
    },

    mounted() {
       this.simpleAnimate();
    },
}
</script>

<style lang="scss" scoped>
$padding : 30px;
.event--kakao-promotion {
    color: $COLOR_kakaoBrown;
    display: flex;
    flex-direction: column;

    .icon--rect-kakao {
        width: 100px; height: 100px;
        margin: 0 auto;
        display: block;
        will-change: transform ,opacity;
    }

    .test-title {
        font-size: 36px;
        font-weight: bold;
        text-align: center;
        white-space: nowrap;
        will-change: letter-spacing ,opacity;
    }

    p {
        line-height: $SIZE_lineheight_high2;
    }
}
.event--kakao-promotion__content {
    padding: $padding;
    background-color: $COLOR_kakaoYellow;
    @include phone {
        padding-left: $SIZE_MO_innerPadding;
        padding-right: $SIZE_MO_innerPadding;
    }
}
.event--kakao-promotion__precaution {
    padding: $padding;
    @include phone {
        padding-left: $SIZE_MO_innerPadding;
        padding-right: $SIZE_MO_innerPadding;
    }
    .list--dot {
        margin-top: 20px;
    }
}
</style>