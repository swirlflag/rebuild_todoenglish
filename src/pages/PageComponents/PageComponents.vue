<template>
    <div>
        <div id="comp">

            <div id="mylog">
                <!-- {{controls.text}} -->
                <TESTCOMP
                    v-if="0"
                    v-model="SELECT_VMODEL"
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
                                    :theme="controls.theme"
                                >
                                    {{controls.text}}
                                </ButtonDefault>
                            </div>
                            <div class="comp-control">
                                <div>
                                    버튼에 들어갈 텍스트 : <input type="text" v-model="controls.text" value="">
                                </div>
                                <div>
                                    버튼 색상 테마 :
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/기본/색테마" value="" v-model="controls.theme"><span>default</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/기본/색테마" value="navy" v-model="controls.theme"><span>navy</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/기본/색테마" value="pink" v-model="controls.theme"><span>pink</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/기본/색테마" value="green" v-model="controls.theme"><span>green</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div v-if="renderId === '버튼/다운로드'" class="comp-component" >
                            <div class="comp-view">
                                <ButtonDownload :type="controls.type" :theme="controls.theme"/>
                            </div>
                            <div class="comp-control">
                                <div>
                                    다운로드 버튼 타입 :
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/타입" value="apple" v-model="controls.type"><span>apple</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/타입" value="google" v-model="controls.type"><span>google</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/타입" value="mobile" v-model="controls.type"><span>mobile</span>
                                    </label>
                                </div>
                                <div>
                                    버튼 색상 테마 :
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/색테마" value="" v-model="controls.theme"><span>default</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="버튼/다운로드/색테마" value="navy" v-model="controls.theme"><span>navy</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div v-if="renderId === '입력/선택 드롭다운'">
                            <div class="comp-view row">

                                <InputDropdown placeholder="선택해주세요"
                                                @change="controls.change"
                                                v-model="SELECT_VMODEL"
                                                ref="ref_dropdown"
                                >
                                    <option     v-for="(item,idx) in 4"
                                                :key="idx"
                                                :value="`select_value_${item}`"
                                    >
                                        value {{item}}
                                    </option>
                                </InputDropdown>

                                <InputDropdown placeholder="test placeholder"
                                                @change="controls.change"
                                                v-model="SELECT_VMODEL"
                                                ref="ref_dropdown"
                                >
                                    <option     v-for="(item,idx) in 40"
                                                :key="idx"
                                                :value="`select_value_${item}`"
                                    >
                                        value {{item}}
                                    </option>
                                </InputDropdown>

                            </div>

                            <div class="comp-control">
                                <div>
                                    <button class="default-button" @click="CHANGE_SELECT_VMODEL">
                                        랜덤 셀렉트 0 ~ 9
                                    </button>
                                </div>
                                <div>
                                    셀렉트 값 : <strong>{{ SELECT_VMODEL }}</strong>
                                </div>
                            </div>

                        </div>

                        <div v-if="renderId === '입력/선택 라디오'">

                            <div class="comp-view row">

                                <InputRadio
                                    text="value 1"
                                    name="input-radio"
                                    value="select_value_1"
                                    v-model="SELECT_VMODEL"
                                />
                                <InputRadio
                                    text="value 2"
                                    value="select_value_2"
                                    name="input-radio"
                                    v-model="SELECT_VMODEL"
                                />
                                <InputRadio
                                    text="value 10"
                                    value="select_value_10"
                                    name="input-radio"
                                    v-model="SELECT_VMODEL"
                                />

                            </div>

                            <div class="comp-control">
                                <div>
                                   hi..
                                </div>
                                <div>
                                    hi
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
import InputDropdown from '@/components/input/InputDropdown.vue';
import InputRadio from '@/components/input/InputRadio.vue';

import TESTCOMP from './TESTCOMP.vue';

export default {
    name : 'PageComponents',
    components : {
        // Category,
        ButtonDefault,
        ButtonDownload,
        InputDropdown,
        InputRadio,

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

            controls : {},

            renderId : '',

            SELECT_VMODEL : 'select_value_3',

        }
    },

    methods : {
        CHANGE_SELECT_VMODEL() {

            const newValue = `select_value_${Math.floor(Math.random() * 10 )}`;

            if(newValue === this.SELECT_VMODEL){
                this.CHANGE_SELECT_VMODEL();
                return;
            }

            this.SELECT_VMODEL = newValue;

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

            this.controls = {...find.control};

            this.renderId = itemName;

            this.onClickControlTab(false);

        },

    },

    updated () {
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
