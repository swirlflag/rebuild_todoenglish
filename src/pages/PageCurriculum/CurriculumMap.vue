<template>
    <div class="curriculum-map area__outer">

        <div class="area__inner">

            <div class="map__outer">

                <table class="map__table">
                    <thead>
                        <tr><th>Level</th></tr>
                        <tr v-for="item in curriculumCategory" :key="item">
                            <th scope="row">{{item}}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th v-for="(item,idx) in Object.keys(curriculumLevel)" :key="idx" scope="col">
                                {{item}}
                            </th>
                        </tr>

                        <template v-for="(category,categoryIdx) in Object.entries(curriculumCategory)" >
                            <tr :key="categoryIdx">
                                <td v-for="(level, levelIdx) in Object.entries(curriculumLevel)" :key="levelIdx">
                                    <span :class="`icon--curriculum-dot level--${level[1][categoryIdx]}`">
                                        {{ level[1][categoryIdx] }} 단계
                                    </span>
                                </td>
                            </tr>
                        </template>

                    </tbody>

                </table>

            </div>


            <ul class="dot-list precaution">
                <li>
                    <span class="icon--curriculum-dot level--3"></span>표시는 심화 과정 입니다.
                </li>
                <li>
                    {{lastLevel}}레벨 이후의 레벨은 계속 업데이트 됩니다.
                </li>
            </ul>

            <ul class="map__explain-list">
                <li class="map__explain-item">
                    <span class="map__explain-title">
                        Self-learning Activities
                    </span>
                    <p class="map__explain-text">
                        영상과 책 콘텐츠 위주의 기존 학습 애플리케이션과 달리 토도영어는 아이가 직접 쓰고, 말하고, 움직이는
                        <br class="visible-overphone">
                        참여형 액티비티(Self-learning Activities)가 기본 콘텐츠입니다.
                    </p>
                </li>
                <li class="map__explain-item">
                    <span class="map__explain-title">
                        Digital Testing
                    </span>
                    <p class="map__explain-text">
                        디지털 테스트(Digital Testing)는 토도영어 커리큘럼의 핵심적인 콘텐츠입니다.
                        <br class="visible-overphone">
                        테스트는 세밀하게, 아주 많이 있지만 아이들은 시험이라 느끼지 못한 채 자신의 단계에 맞는 학습을 즐겁게 진행합니다.
                        <br class="visible-overphone">
                        부모는 데이터에 기반하여 아이의 상황을 객관적으로 이해할 수 있습니다.
                    </p>
                </li>
                <li class="map__explain-item">
                    <span class="map__explain-title">
                        Hidden Curriculum
                    </span>
                    <p class="map__explain-text">
                        영미권의 문화와 매너를 자연스럽게 익힐 수 있는 콘텐츠의 비중이 매우 높습니다.
                        <br class="visible-overphone">
                        이를 통해 아이들은 언어뿐 아니라 환경, 사고방식, 커뮤니케이션 코드 등을 접하며 다양성(Diversity)을 배우고
                        <br class="visible-overphone">
                        글로벌 시티즌(Global Citizen)의 일원이 됩니다.
                    </p>
                </li>

            </ul>

        </div>

    </div>
</template>

<script>
export default {
    data () {
        return {
            curriculumCategory : [
                "Digital literacy",
                "Alphabet",
                "Phonics",
                "Most common words",
                "Sight words / syntax",
                "Basic reading",
                "Comprehension",
                "Culture, manner",
                "Speaking",
                "Writing"
            ],
            curriculumLevel : {
                "A" : [ 2 , 2 , 0 , 0 , 0 , 0 , 0 , 2 , 1 , 2 ],
                "B" : [ 0 , 2 , 0 , 0 , 0 , 0 , 0 , 2 , 1 , 2 ],
                "C" : [ 0 , 2 , 2 , 2 , 1 , 0 , 0 , 2 , 1 , 2 ],
                "D" : [ 0 , 0 , 2 , 2 , 1 , 0 , 0 , 2 , 2 , 2 ],
                "E" : [ 2 , 0 , 2 , 2 , 1 , 0 , 0 , 2 , 2 , 2 ],
                "F" : [ 0 , 0 , 2 , 2 , 2 , 0 , 0 , 2 , 2 , 2 ],
                "G" : [ 0 , 0 , 1 , 1 , 2 , 0 , 0 , 2 , 2 , 2 ],
                "H" : [ 0 , 0 , 1 , 1 , 2 , 2 , 0 , 2 , 2 , 2 ],
                "I" : [ 0 , 0 , 1 , 1 , 1 , 2 , 0 , 2 , 2 , 2 ],
                "J" : [ 0 , 0 , 1 , 1 , 1 , 2 , 2 , 2 , 2 , 2 ],
                "K" : [ 0 , 0 , 1 , 1 , 1 , 2 , 2 , 2 , 2 , 2 ],
                "L" : [ 0 , 0 , 1 , 1 , 1 , 2 , 2 , 2 , 2 , 2 ],
                "M" : [ 2 , 0 , 1 , 1 , 3 , 3 , 3 , 2 , 3 , 3 ],
                "N" : [ 0 , 0 , 1 , 1 , 3 , 3 , 3 , 2 , 3 , 3 ],
            }
        }
    },
    computed: {
        lastLevel() {
            const keys = Object.keys(this.curriculumLevel)
            return keys[keys.length-1];
        }
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">

[class^=fade-left] {
    @include phone {
        transition-delay: 600ms !important;
    }
}

.map__outer {
    margin-top: 20px;
    display: flex;
    width: 100%;
    overflow: scroll;
    position: relative;
    flex-wrap: wrap;
}

table.map__table {

    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    justify-content: stretch;
    align-items: stretch;
    flex-direction: row;
    position: relative;
    flex-basis: 100%;

    @include phone {
        overflow-x: scroll;
        // flex-basis: 100%;
    }

    tr {
        display: flex;
        align-items: center;

        @include phone {
            width: 100%;
        }

        &:nth-child(1) {
            th,td {
                border-bottom: 2px solid $COLOR_navy_1;
            }
        }

    }

    th,td {
        height: 30px;
        padding: 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    thead {
        position: sticky;
        left: 0;
        z-index: 10;
        background-color: #fff;

        @include phone {
            box-shadow: 3px 0 5px rgba(0,0,0,0.12);
        }

        tr {

            th {
                padding-right: 10px;
                font-weight: 300;
                // display: inline-block;
                width: 100%;
                justify-content: flex-end;
                text-align: right;
            }
            &:nth-child(1) th{
                font-weight: 700;
            }
        }
    }

    tbody {
        width: 100%;
        position: relative;

        tr {
            // position: sticky;
            // top: 0;
            @include phone {
                // width: 300%;
                // border: 1px solid #d3d;
            }

            th, td {
                flex-basis: 100%;

                @include phone {
                    width: 50px;
                    flex-grow : 0;
                    flex-shrink: 0;
                    flex-basis: 50px;
                }
            }

            td {
                font-size: 0;
                color: transparent;
                text-align: center;
            }
        }
    }



}

.icon--curriculum-dot {
    display: inline-block;
    width: 10px; height: 10px;
    border-radius: 2px;
    transform : rotate(45deg);
    box-sizing: border-box;

    &.level--1 {
        border: 2px solid #50438c;
    }
    &.level--2 {
        background-color: #50438c;
    }
    &.level--3 {
        background-color: #f7419c;
    }
}

.precaution {
    font-size: 14px;
    margin-top: 16px;

    .icon--curriculum-dot{
        margin-top: 5px;
        margin-right: 5px;
    }
}

.map__explain-list {
    margin-top: 80px;
    line-height: $SIZE_lineheight_high;
    word-break: keep-all;
    .map__explain-item {
        display: flex;
        justify-content: flex-start;

        @include phone {
            flex-direction: column;
        }

        & + .map__explain-item {
            margin-top: 36px;
        }
    }

    .map__explain-title {
        display: inline-block;
        flex-grow :0;
        flex-shrink :0;
        width: 170px;
        font-weight: 700;
    }
    .map__explain-text {
        @include phone {
            margin-top: 22px;
        }
        word-break: keep-all
    }
}


</style>
