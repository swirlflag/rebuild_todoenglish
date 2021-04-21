<template>
    <div class="mypage-study area__outer">

        <div class="study__profile-select area__inner mo-max">
            <!-- <div class=""> -->
                <ul class="study__profile-select__list">
                    <li>
                        <label class="round--radio">
                            <input type="radio" name="select-profile" value="1번 프로필 닉네임" v-model="TEST_PROFILENAME" checked="checked" id="hey">
                            <span>프로필1</span>
                        </label>
                    </li>
                    <li>
                        <label class="round--radio" >
                            <input type="radio" name="select-profile" value="2번 프로필 닉네임" v-model="TEST_PROFILENAME">
                            <span>프로필 2</span>
                        </label>
                    </li>
                    <li>
                        <label class="round--radio" >
                            <input type="radio" name="select-profile" value="3번 프로필 닉네임" v-model="TEST_PROFILENAME">
                            <span>프로필 3</span>
                        </label>
                    </li>
                </ul>
                <p class="precaution">* 프로필 추가 및 변경은 토도영어 앱에서 가능합니다.</p>
            <!-- </div> -->
        </div>

        <div class="study__content area__inner">

            <!-- <div class="study__content"> -->

                <div class="study__info">
                    <h2 class="study__info__nickname">
                        <TextChangeMask :text="TEST_PROFILENAME || '&nbsp;'" contain/>
                    </h2>
                    <span class="study__info__level">
                        <span>Level</span>&nbsp;
                        <strong>C</strong>
                    </span>
                    <span class="study__info__progress">
                        <span>24day 중</span>
                        <strong>&nbsp;12day&nbsp;</strong>
                        <span>진행</span>
                    </span>
                </div>

                <div class="study__chart">
                    <div class="study__chart__header">
                        <h3 class="study__subtitle">
                            토도 스코어
                        </h3>
                        <ul class="study__chart__mark">
                            [canvas mark]
                        </ul>
                    </div>
                    <div class="study__chart__canvas">
                        [canvas]
                    </div>
                    <div class="study__chart__pagination">
                        <button class="study__chart__prev">P</button>
                        <ul class="study__chart__pagination__list">
                            <li>[mm/dd]</li>
                            <li>[mm/dd]</li>
                            <li>[mm/dd]</li>
                            <li>[mm/dd]</li>
                            <li>[mm/dd]</li>
                        </ul>
                        <button class="study__chart__next">N</button>
                    </div>
                </div>

                <div class="study__report">
                    <h3 class="study__subtitle">
                        토도 리포트
                    </h3>
                    <p>토도 리포트 상세 보기</p>

                    <div class="study__report__control">

                        <InputDropdown placeholder="날짜를 선택하세요">
                            <option value="200330">2020.03.30</option>
                            <option value="200430">2020.04.30</option>
                            <option value="200530">2020.05.30</option>
                        </InputDropdown>

                        <ButtonDefault theme="pink">
                            보기
                        </ButtonDefault>
                    </div>

                </div>

                <div class="study__trophy">

                    <h3 class="study__subtitle">
                        토도 트로피
                    </h3>

                    <div class="study__trophy__table">

                        <div class="study__trophy__table__head">
                            <span>Mission</span>
                            <span>Date</span>
                        </div>

                        <ul class="study__trophy__items">
                            <li>
                                <span class="study__trophy__icon trophy--verygood"></span>
                                <div class="study__trophy__info">
                                    <span>토도영어 함께상</span>
                                    <span><span class="visible-phone fw-700">Mission:&nbsp;</span>일주일에 5일 이상 출석!</span>
                                    <span><span class="visible-phone fw-700">Date:&nbsp;</span>2020/03/28</span>
                                </div>
                            </li>
                            <li>
                                <span class="study__trophy__icon trophy--complete"></span>
                                <div class="study__trophy__info">
                                    <span>토도영어 함께상</span>
                                    <span><span class="visible-phone fw-700">Mission:&nbsp;</span>일주일에 5일 이상 출석!</span>
                                    <span><span class="visible-phone fw-700">Date:&nbsp;</span>2020/03/28</span>
                                </div>
                            </li>
                            <li>
                                <span class="study__trophy__icon trophy--dayclear"></span>
                                <div class="study__trophy__info">
                                    <span>토도영어 함께상</span>
                                    <span><span class="visible-phone fw-700">Mission:&nbsp;</span>일주일에 5일 이상 출석!</span>
                                    <span><span class="visible-phone fw-700">Date:&nbsp;</span>2020/03/28</span>
                                </div>
                            </li>
                            <li>
                                <span class="study__trophy__icon trophy--excellent"></span>
                                <div class="study__trophy__info">
                                    <span>토도영어 함께상</span>
                                    <span><span class="visible-phone fw-700">Mission:&nbsp;</span>일주일에 5일 이상 출석!</span>
                                    <span><span class="visible-phone fw-700">Date:&nbsp;</span>2020/03/28</span>
                                </div>
                            </li>
                            <li>
                                <span class="study__trophy__icon trophy--medal"></span>
                                <div class="study__trophy__info">
                                    <span>토도영어 함께상</span>
                                    <span><span class="visible-phone fw-700">Mission:&nbsp;</span>일주일에 5일 이상 출석!</span>
                                    <span><span class="visible-phone fw-700">Date:&nbsp;</span>2020/03/28</span>
                                </div>
                            </li>
                            <li>
                                <span class="study__trophy__icon trophy--shiny"></span>
                                <div class="study__trophy__info">
                                    <span>토도영어 함께상</span>
                                    <span><span class="visible-phone fw-700">Mission:&nbsp;</span>일주일에 5일 이상 출석!</span>
                                    <span><span class="visible-phone fw-700">Date:&nbsp;</span>2020/03/28</span>
                                </div>
                            </li>
                            <li>
                                <span class="study__trophy__icon trophy--visit"></span>
                                <div class="study__trophy__info">
                                    <span>토도영어 함께상</span>
                                    <span><span class="visible-phone fw-700">Mission:&nbsp;</span>일주일에 5일 이상 출석!</span>
                                    <span><span class="visible-phone fw-700">Date:&nbsp;</span>2020/03/28</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="study__trophy__pagination">
                        <button class="study__trophy__prev">
                            <i class="icon--linearrow type-left"></i>
                        </button>
                        <ul class="study__trophy__pagination__items">
                            <li>1</li>
                            <li class="st-selected">2</li>
                            <li>3</li>
                        </ul>
                        <button class="study__trophy__prev">
                            <i class="icon--linearrow type-right"></i>
                        </button>
                    </div>

                </div>

            <!-- </div> -->


        </div>

    </div>
</template>

<script>
import ButtonDefault    from '@/components/button/ButtonDefault.vue';
import TextChangeMask   from '@/components/display/TextChangeMask.vue';
import InputDropdown   from '@/components/input/InputDropdown.vue';

export default {
    name : 'mypageStudyInfo',
    components : {
        ButtonDefault ,
        TextChangeMask ,
        InputDropdown,
    },
    data() {
        return {
            // TEST_PROFILE_KEY : 'key1',
            TEST_PROFILENAME : '1번 프로필 닉네임',
        }
    },
    watch : {
        TEST_PROFILECHANGE() {

        },
    },
    methods : {
        TEST_change() {

        }
    }
}
</script>

<style scoped lang="scss">
.round--radio {
    display: inline-block;
    width: auto; height: auto;
    border-radius: 9999px;
    cursor: pointer;

    > input {
        display: none;
        display: block;
    }

    > span {
        border-radius: inherit;
        display: inline-block;
        padding: 15px;
        min-width : 160px;
        box-sizing: border-box;
        text-align: center;
        background-color: $COLOR_offwhite;
    }

    > input:checked + span {
        background-color: $COLOR_navy_2;
        color: #fff;
        font-weight: 700;
    }
}

.mypage-study {

}


.study__profile-select {
    display: flex;
    align-items: center;
    width: 100%;
    // border: 1px solid #d3d;

    @include phone {
        box-sizing: border-box;
        flex-wrap: wrap;
        width: 100%;
        // border: 1px solid #000;
        align-items: start;
        // overflow: scroll;
    }

    .study__profile-select__list {
        display: flex;
        box-sizing: border-box;

        @include phone {
            // padding: 0 $SIZE_MO_innerPadding;
            padding:0;
            display: inline-block;
            width: 100%;
            overflow:scroll;
            white-space: nowrap;
            box-sizing: content-box;
            box-sizing: border-box;
        }

        li {
            display: inline-block;
            margin-left: 15px;
            &:nth-child(1){
                margin-left: 0;
            }

            @include phone {
                margin-left: 0;
                margin-right: $SIZE_MO_innerPadding;
                &:nth-child(1) {
                    margin-left: $SIZE_MO_innerPadding;
                }
            }

            > .round--radio {
            }
        }
    }

    .precaution {
        margin-left: 26px;
        @include phone {
            margin-top: 20px;
            margin-left: $SIZE_MO_innerPadding;
        }
    }
}


.study__content {
    display: flex;
    flex-wrap: wrap;

    > * {
        margin-top: 70px;

        @include phone {
            margin-top: 50px;
        }
    }
}

.study__subtitle {
    font-size: $SIZE_PC_fontsize_large;
    font-weight: bold;

    @include phone {
        font-size: $SIZE_MO_fontsize_large;
    }
}

.study__info {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    @include phone {
        font-size: $SIZE_MO_fontsize_strong;
    }

    .study__info__nickname {
        font-size: $SIZE_PC_fontsize_title;
        width: 100%;
        margin-bottom: 13px;
        // border: 1px solid #d3d;

        @include phone {
            font-size: $SIZE_MO_fontsize_title;
        }

        > .mask-text {
            width: 100%;
            display: inline-block;
        }
    }
    .study__info__level {

    }
    .study__info__progress {
        position: relative;
        margin-left: 30px;
        @include phone {
            margin-left : 20px;
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;left: -15px;
            display: inline-block;
            width: 1px;
            height: 100%;
            background-color: $COLOR_offwhite;
            @include phone {
                left: -10px;
            }
        }
        strong {
            color: $COLOR_pink_1;
        }
    }
}

.study__chart {
    width: auto;
    color: $COLOR_laterBlue;
    @include phone {
        width: 100%;
    }

    .study__chart__header {
        display:flex;
        justify-content: space-between;

        .study__chart__mark {
            border: 1px dashed $COLOR_laterBlue;
        }
    }

    .study__chart__canvas {
        border: 1px dashed $COLOR_laterBlue;
        width: 674px; height: 260px;

        @include phone {
            width: 100%;
        }
    }
    .study__chart__pagination {
        position: relative;
        display:flex;
        justify-content: space-between;
        align-items : center;

        button {
            height: 100%;
            // position: absolute;
            // top: 0;
            &.study__chart__prev {
                left: 0;
                border: 1px dashed $COLOR_laterBlue;
            }
            &.study__chart__next {
                right: 0;
                border: 1px dashed $COLOR_laterBlue;
            }

        }
        .study__chart__pagination__list{
            display : flex;
            border: 1px dashed $COLOR_laterBlue;
            justify-content: space-around;
            width: 100%;
            li {

                cursor : pointer;
            }
        }
    }

}



.study__report {
    width: 230px;
    margin-left: auto;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    @include phone {
        width: 100%;
        flex-direction: row;
    }

    .study__subtitle {
        width: 100%;
    }

    p {
        width: 100%;
        margin-top: 28px;
        @include phone {
            margin-top: 6px;
        }
    }

    .study__report__control {
        display: flex;
        flex-direction: column;
        margin-top: 14px;

        @include phone {
            flex-direction: row;
            width: 100%;
            align-items: start;
        }

        .input--dropdown {
            @include phone {
                width: 100%;
                min-width : 150px;
            }
        }

        .button--default {
            margin-top: 65px;
            @include phone {
                width: 100%;
                margin-left: $SIZE_MO_innerPadding;
                margin-top: 0;
            }
        }

    }


}




.study__trophy {
    width: 100%;

    .study__trophy__icon {
        display: inline-block;
        width: 96px; height: 80px;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: left;

        &.trophy--verygood  {background-image: url('~@/assets/mypage/icon_trophy_verygood.svg');}
        &.trophy--complete  {background-image: url('~@/assets/mypage/icon_trophy_complete.svg');}
        &.trophy--dayclear  {background-image: url('~@/assets/mypage/icon_trophy_dayclear.svg');}
        &.trophy--excellent {background-image: url('~@/assets/mypage/icon_trophy_excellent.svg');}
        &.trophy--medal     {background-image: url('~@/assets/mypage/icon_trophy_medal.svg');}
        &.trophy--shiny     {background-image: url('~@/assets/mypage/icon_trophy_shiny.svg');}
        &.trophy--visit     {background-image: url('~@/assets/mypage/icon_trophy_visit.svg');}
    }

    $SIZE_PC_cell_1 :100px;
    $SIZE_PC_cell_2 :200px;
    $SIZE_PC_cell_3 :100%;
    $SIZE_PC_cell_4 :110px;
    $SIZE_cellPadding : 12px;

    @mixin cellStyle {
        padding: $SIZE_cellPadding;
        box-sizing: border-box;
        display: inline-block;

        @include phone {
            padding: 0;
        }
    }
    @mixin cell_1{ @include cellStyle;
        padding-left: 0;
        @include overPhone {
            width: $SIZE_PC_cell_1;
            flex : 0 0 $SIZE_PC_cell_1;
        }
    }
    @mixin cell_2{ @include cellStyle;
        font-weight: 700;
        @include overPhone {
            width: $SIZE_PC_cell_2 ;
            flex: 0 0 $SIZE_PC_cell_2 ;
        }
    }
    @mixin cell_3{ @include cellStyle;
        @include overPhone {
            width: 100%;
        }
    }
    @mixin cell_4{ @include cellStyle;
        @include overPhone {
            width: $SIZE_PC_cell_4 ;
            text-align: right;
            padding-right: 0;
            flex : 0 0 $SIZE_PC_cell_4;
        }
    }
    @mixin cellMobile {
        padding: 0;
        width: auto;
        // flex : auto;
    }

   .study__trophy__table {
       margin-top: 20px;

        .study__trophy__table__head {

            padding-left: $SIZE_PC_cell_1 + $SIZE_PC_cell_2;
            display: flex;

            @include phone {
                display: none;
            }

            span {
                &:nth-child(1){
                    @include cell_3;
                }
                &:nth-child(2){
                    @include cell_4;
                    // margin-left: auto;
                }
            }
        }
        .study__trophy__items{
            border-top: 2px solid $COLOR_navy_2;

            li {
                display: flex;
                padding: 10px 0 ;
                border-bottom: 1px solid $COLOR_linegray;

                @include phone {
                    padding: 16px 0 ;
                }

                .study__trophy__icon {
                    @include cell_1;

                    @include phone {
                        padding: 0 !important;
                        width: 86px; height: auto;
                        flex : 0 0 86px;
                    }
                }

                .study__trophy__info {
                    width: 100%;
                    display: flex;
                    align-items: center;

                    @include phone {
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: start;
                        margin-left: $SIZE_MO_innerPadding;
                        font-size: $SIZE_MO_fontsize_strong;
                    }

                    > span {
                        display: inline-flex;
                        align-items: center;

                        &:nth-child(1) {@include cell_2;}
                        &:nth-child(2) {@include cell_3;}
                        &:nth-child(3) {@include cell_4;}

                        @include phone {
                            // margin-top: 12px;
                            margin: 6px 0;
                            &:nth-child(1) {
                                // margin-top: 0;
                            }
                            @include cellMobile;
                        }
                    }
                }
            }
        }

    }

    .study__trophy__pagination {
        display :flex;
        justify-content: center;
        margin-top: 20px;
        button {
        }

        .study__trophy__pagination__items {
            display: flex;
            li {
                cursor: pointer;
                padding: 5px 10px;
                margin: 0 8px;
                text-align: center;

                &.st-selected {
                    color: $COLOR_pink_1;
                    font-weight: 700;
                }

            }

        }
    }

}
</style>