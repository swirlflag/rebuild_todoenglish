<template>
    <div class="curriculum-objectives area__outer">

        <div class="area__inner">
            <div class="objectives__outer">

                <table class="objectives__table">

                    <thead>
                        <tr>
                            <th scope="col">Level</th>
                            <th scope="col">학습 목표</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="[k,v] in Object.entries(objectivesData)" :key="k">
                            <th>
                                <span class="objectives__grade" :class="`type--${v.type}`">
                                    {{k}}
                                </span>
                            </th>
                            <td v-html="v.content.replace(/\n/gi, `<br class='visible-overphone'/>`)"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <ul class="dot-list precaution">
                <li>
                    {{lastLevel}}레벨 이후의 레벨은 계속 업데이트됩니다.
                </li>
            </ul>

        </div>

    </div>

</template>

<script>
export default {
    data() {
        return {
            objectivesData : {
                "A" : {
                    type : 1,
                    content : `토도영어의 디지털 액티비티 시스템에 익숙해 집니다. A부터 P까지의 대/소문자, 글자와 순서를 배웁니다.\n각 알파벳에 대한 정확한 발음을 듣고, 따라 쓰고, 읽으면서 자연스럽게 알파벳과 친해집니다.`,
                },
                "B" : {
                    type : 1,
                    content : `Q부터 Z까지의 대/소문자, 글자와 순서를 배웁니다. 각 알파벳에 대한 정확한 발음을 듣고, 따라 쓰고,\n읽으면서 자연스럽게 알파벳과 친해집니다. `,
                },
                "C" : {
                    type : 2,
                    content : `알파벳 글자의 대표 음가(sound)를 연습하며 파닉스(phonics)의 개념을 처음 접하고 Most common words를 배우면서\n영어 단어에 흥미를 가지기 시작합니다. 뜻은 몰라도 읽을 수 있는 단어들이 생기기 시작하는 단계입니다.`,
                },
                "D" : {
                    type : 2,
                    content : `단어의 첫 음가(sound)를 인식하고 구분합니다. 파닉스(phonics)와 Most common words를 본격 학습하기 시작합니다.\nWord Challenge가 새로 열리면서 드릴링(drilling) 학습이 강화되고, 다양한 말하기(speaking) 액티비티 활동이 확대됩니다.`,
                },
                "E" : {
                    type : 2,
                    content : `단어 학습을 위한 디지털 타이핑(typing) 스킬을 습득합니다. 파닉스(phonics)와 Most common words,드릴링(drilling) 학습이\n지속되고 Sight Words를 접하며 많은 단어와 친숙해집니다.`,
                },
                "F" : {
                    type : 3,
                    content : `파닉스(phonics)와 Most common words, Sight Words에 대한 학습이 지속되고 Phonics Chanllenge가 새로 열립니다.\n단어의 복수형이나 대명사를 시작으로 기초 문법(syntax)을 배웁니다.`,
                },
                "G" : {
                    type : 3,
                    content : `한글과 다른 영어의 문장 구조 문법을(syntax) 학습합니다. 주어(subject)-동사(verb)-보어(compliment), 영어 문장의 2형식과\nbe동사(am, is, are)의 특성을 알게 됩니다.`,
                },
                "H" : {
                    type : 3,
                    content : `다양한 장르의 단어(word)와 파닉스(phonics) 심화 학습을 지속합니다. 기초 문법(syntax) 3형식을 배우면서\n어려운 문장 구조를 이해 합니다. 이를 통해 책의 문장을 읽는 연습을 시작합니다.`,
                },
                "I" : {
                    type : 4,
                    content : `친구들과 역할놀이가 가능한 묻고 답하기가 가능해 지고 책을 통해 문장 읽기 학습도 더 강화 됩니다.\n다양한 장르의 단어(word)와 파닉스(phonics), 기초문법(syntax) 심화 학습을 지속합니다. `,
                },
                "J" : {
                    type : 4,
                    content : `짧은 문장을 만들어 느낌이나 생각을 표현할 수 있습니다. 단모음과 장모음의 개념을 익혀 단어의 철자를 정확하게\n읽고 쓰게 됩니다. 다양한 장르의 단어(word)와 파닉스(phonics), 기초문법(syntax) 심화 학습을 지속합니다. `,
                },
                "K" : {
                    type : 4,
                    content : `책을 읽을 때 모르는 단어의 뜻을 유추할 수 있습니다. 단어의 수가 많고, 길고 어려운 문장이 포함된 도서를 읽고 이해합니다.\n다양한 장르의 단어(word)와 파닉스(phonics), 기초문법(syntax) 심화 학습을 지속합니다. `,
                },
                "L" : {
                    type : 4,
                    content : `책을 읽고 이야기 흐름을 정리하고 재배열 할 수 있습니다. 향상된 독해력을 바탕으로 이야기에 대한 질문에\n구체적으로 답할 수 있습니다. 미국 Grade-1 수준의 읽기와 쓰기가 가능해지는 레벨입니다.`,
                },
                "M" : {
                    type : 1,
                    content : `	문장을 직접 쓰기 위해서 QWERTY 키보드 타이핑 연습을 시작합니다.\n좋아하는 것과 싫어하는 것에 대해 묻고 대화를 하며 표현을 익히는 레벨입니다.`,
                },
                "N" : {
                    type : 1,
                    content : `	대화 형식으로 이루어진 책을 읽고 이해합니다.\n단어와 어휘를 확장하고 고난이도(sematic complexity)의 문장을 읽고 해석합니다.`,
                },
            }
        }
    },

    computed : {
        lastLevel() {
            const keys = Object.keys(this.objectivesData)
            return keys[keys.length-1];
        }
    },

}
</script>

<style scoped lang="scss">

.curriculum-objectives {
    margin-top: 20px;
}
.objectives__outer {
    width: 100%;
}

.objectives__table {
    line-height: $SIZE_lineheight_high1;
    word-break: keep-all;
    width: 100%;
    tr {
        display: flex;
        padding: 18px 0;
        border-bottom: 1px solid $COLOR_linegray;

        th:nth-child(1){
            flex-grow : 0;
            flex-shrink: 0;
            flex-basis: 80px;
            text-align: left;

            @include phone {
                flex-basis: 54px;
            }
            .objectives__grade {
                box-sizing: border-box;
                font-weight: 700;
                width: 28px; height: 28px;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                border-radius: 9999px;
                color: #fff;
                padding-top: 0.2em;

                &.type--1 {background-color: #E6801B;}
                &.type--2 {background-color: #1F96DB;}
                &.type--3 {background-color: #9857DB;}
                &.type--4 {background-color: #D63679;}
            }
        }
    }
    th,td {
        width: 100%;
        display: inline-flex;
        align-items: center;
    }

    thead {
        tr {
            border-bottom: 2px solid $COLOR_navy_1;

        }
        th:nth-child(2) {
            justify-content: center;
        }
    }
    tbody {
        th {
            
            @include phone {
                align-self: flex-start;
            }
        }
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

</style>