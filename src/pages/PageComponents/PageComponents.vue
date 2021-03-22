<template>
    <div>
        <div id="comp">

            <div id="mylog">
                <!-- {{selectItem.control.text}} -->
                <TESTCOMP

                    v-if="0"
                    v-model="TEMP_VMODEL"
                />
            </div>
            <div id="comp-wrap">
                <!-- <div id="comp-not-mobile">
                    모바일에선 안보여줄거임
                </div> -->
                <div    id="comp-tab"
                        :class="{'st-opentab' : isTabOpen}"
                >

                    <div    class="comp-tab__toggle"
                            @click="onClickControlTab"
                    >
                        menu
                    </div>

                    <div class="comp-tab__dimmed" @click="onClickControlTab(false)"></div>

                    <div class="comp-tab__wrap">
                        <template v-for="([category,items],idx) in Object.entries(categoryOrder)">
                            <div  class="tab__category" :key="idx">
                                <div class="tab__category-name" @click="onClickCategoryName">
                                    {{category}}
                                </div>
                                <div class="tab__list">
                                    <template v-for="(item, idx) in items">
                                        <div :key="idx" class="tab__item" :data-id="item" @click="onClickItem(item)">
                                            {{item.split('/')[1]}}
                                        </div>
                                    </template>
                                </div>

                            </div>
                        </template>
                    </div>
                </div>

                <div id="comp-content">

                    <div id="comp-content-wrap">

                        <div v-if="renderId === '맞는 ID'">
                            <div class="comp-view">
                            </div>
                            <div class="comp-control">
                                <div></div>
                                <div></div>
                            </div>
                        </div>

                        <div v-if="renderId === '버튼/기본'" class="comp-component" >
                            <div class="comp-view">
                                <ButtonDefault
                                    :theme="selectItem.control.theme"
                                >
                                    {{selectItem.control.text}}
                                </ButtonDefault>
                            </div>
                            <div class="comp-control">
                                <div>
                                    버튼에 들어갈 텍스트 : <input type="text" v-model="selectItem.control.text" value="">
                                </div>
                                <div>
                                    버튼 색상 테마 :
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/기본/색테마" value="" v-model="selectItem.control.theme"><span>default</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/기본/색테마" value="navy" v-model="selectItem.control.theme"><span>navy</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/기본/색테마" value="pink" v-model="selectItem.control.theme"><span>pink</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/기본/색테마" value="green" v-model="selectItem.control.theme"><span>green</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div v-if="renderId === '버튼/다운로드'" class="comp-component" >
                            <div class="comp-view">
                                <ButtonDownload :type="selectItem.control.type" :theme="selectItem.control.theme"/>
                            </div>
                            <div class="comp-control">
                                <div>
                                    다운로드 버튼 타입 :
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/타입" value="apple" v-model="selectItem.control.type"><span>apple</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/타입" value="google" v-model="selectItem.control.type"><span>google</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/타입" value="mobile" v-model="selectItem.control.type"><span>mobile</span>
                                    </label>
                                </div>
                                <div>
                                    버튼 색상 테마 :
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/색테마" value="" v-model="selectItem.control.theme"><span>default</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/색테마" value="navy" v-model="selectItem.control.theme"><span>navy</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div v-if="renderId === '입력/선택 드롭다운'">
                            <div class="comp-view row"
                            >

                                <DropdownSelect :placeholder="`선택해주세요`"
                                                @change="selectItem.control.change"
                                                v-model="TEMP_VMODEL"
                                >
                                    <option     v-for="(item,idx) in TEMPCOUNT2"
                                                :key="idx"
                                                :value="`value${item}`"
                                    >
                                        OPTION {{item}}
                                    </option>
                                </DropdownSelect>
                                <DropdownSelect :placeholder="`선택해주세요[표시]`"
                                                @change="selectItem.control.change"
                                >
                                    <option     v-for="(item,idx) in TEMPCOUNT1"
                                                :key="idx"
                                                :value="`value${item}`"
                                    >
                                        옵션 {{item}}
                                    </option>
                                </DropdownSelect>
                                <!-- <DropdownSelect :placeholder="`${TEMPCOUNT1.length}개 짜리`"
                                                @change="selectItem.control.change"
                                >
                                    <option v-for="item in TEMPCOUNT1"
                                            :key="item"
                                            :value="item"
                                    >
                                        OPTION {{item}}
                                    </option>
                                </DropdownSelect>
                                <DropdownSelect :placeholder="`${TEMPCOUNT3.length}개 짜리`"
                                                @change="selectItem.control.change"
                                >
                                    <option v-for="item in TEMPCOUNT3"
                                            :key="item"
                                            :value="item"
                                    >
                                        OPTION {{item}}
                                    </option>
                                </DropdownSelect> -->

                            </div>

                            <div class="comp-control">
                                <button @click="TEST_VMODELCHANGE">
                                    랜덤 테스트
                                </button>

                                <div>
                                    {{
                                        TEMP_VMODEL
                                    }}
                                </div>
                            </div>

                        </div>

                        <template v-if="selectItem.name">
                            <div class="comp-infomation">

                                <div class="comp-title">{{selectItem.title}}</div>
                                <div class="comp-text">{{selectItem.text}}</div>

                                <ul class="comp-infovalue" v-if="selectItem.info" >
                                    <!-- <p>기본 설정 시트<p> -->
                                    <li v-for="([c,v],idx) in Object.entries(selectItem.info)" :key="idx">
                                        <div class="comp-infovalue-key">{{c}}</div>
                                        <div class="comp-infovalue-value">{{v}}</div>
                                    </li>
                                </ul>

                            </div>
                        </template>

                        <template v-else>
                            <div class="comp-need-select">
                                <!-- <span class="visible-overphone">←</span> -->
                                <!-- <span class="visible-phone">↑</span> -->
                                ← please select component
                            </div>
                        </template>
                    </div>

                </div>

            </div>

        </div>
    </div>

</template>

<script>

// import Category from './Category.vue';
import categoryData from './categoryData.js';
import ButtonDefault from '@/components/button/ButtonDefault.vue';
import ButtonDownload from '@/components/button/ButtonDownload.vue';
import DropdownSelect from '@/components/input/DropdownSelect.vue';

import TESTCOMP from './TESTCOMP.vue';

export default {
    name : 'PageComponents',
    components : {
        // Category,
        ButtonDefault,
        ButtonDownload,
        DropdownSelect,

        TESTCOMP,
    },
    data() {

        const categoryOrder = categoryData.reduce((p,c) => {
            const [ categoryName ] = c.name.split('/');
            if(!p[categoryName]){
                p[categoryName] = [];
            }
            p[categoryName].push(c.name);
            return p;
        },{});

        return {

            isTabOpen : false,
            categoryData ,
            categoryOrder,

            selectItem : {},

            renderId : '',

            // TEMP_VMODEL : 'TEST_vmodel 시작값',
            TEMP_VMODEL : 'value5',

            TEMPCOUNT1 : (() => {
                let count = 45;
                let arr = [];
                for(let i = 1; i <= count; ++i){
                    arr.push(i);
                }
                return arr
            })(),

            TEMPCOUNT2 : (() => {
                let count = 12;
                let arr = [];
                for(let i = 1; i <= count; ++i){
                    arr.push(i);
                }
                return arr
            })(),
            TEMPCOUNT3 : (() => {
                let count = 4;
                let arr = [];
                for(let i = 1; i <= count; ++i){
                    arr.push(i);
                }
                return arr
            })(),

        }
    },

    methods : {
        TEST_VMODELCHANGE() {

            const newValue = `value${Math.floor(Math.random() * 10 )}`;

            if(newValue === this.TEMP_VMODEL){
                this.TEST_VMODELCHANGE();
                return;
            }

            this.TEMP_VMODEL = newValue;

        },

        onClickControlTab(bool) {
            this.isTabOpen = bool === undefined ? !this.isTabOpen : bool;
        },

        onClickCategoryName(e) {
            const parent = e.currentTarget.parentElement;

            if(parent.classList.contains('st-open')){
                parent.classList.remove('st-open');
            }else {
                parent.classList.add('st-open');
            }

        },

        onClickItem(itemName) {
            if(this.renderId === itemName){
                return
            }

            const before = document.querySelector(`.tab__item.st-selected`);
            const target = document.querySelector(`[data-id='${itemName}']`);

            before && before.classList.remove('st-selected');
            target.classList.add('st-selected');


            this.selectItem =  null;

            const find = this.categoryData.find((c) => c.name === itemName);

            this.selectItem = {...find};
            this.selectItem.control = {...find.control};

            this.renderId = itemName;

            this.onClickControlTab(false);

            // console.log(this.selectItem.control);
        },

    },

    mounted() {


    }
}
</script>


<style src="./PageComponents.scss" lang="scss" ></style>


<style lang="scss">
// 컴포넌트 페이지에서는 공용 네비게이션과 footer를 숨겨줍니다.
.page--components {
    #plate--navigation ,
    #plate--footer{
        opacity: 0 !important;
        pointer-events: none !important;
        user-select: none !important;
        height: 0 !important;
        overflow:hidden !important;
        padding: 0 !important;
        * {
            pointer-events: none !important;
            user-select: none !important;
        }
    }
    #plate--page {
        overflow: hidden !important;
    }
    #page--router {
        overflow: hidden !important;
    }
}

</style>
