<template>
    <div>
        <div id="comp">

            <div id="mylog">
                <!-- {{controls.text}} -->
                <TESTCOMP
                    v-if="0"
                    v-model="VMODEL_SELECTVALUE"
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







                    <!-- 버튼/기본 -->
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
                    <!-- //버튼/기본 -->








                    <!-- 입력/선택 드롭다운 -->
                        <div v-if="renderId === '입력/선택 드롭다운'">
                            <div class="comp-view row">

                                <InputDropdown  placeholder="선택해주세요"
                                                @change="controls.change"
                                                v-model="VMODEL_SELECTVALUE"
                                                ref="ref_dropdown"
                                >
                                    <option     v-for="(item,idx) in 4"
                                                :key="idx"
                                                :value="`select_value_${item}`"
                                    >
                                        value {{item}}
                                    </option>
                                </InputDropdown>

                                <InputDropdown  placeholder="test placeholder"
                                                @change="controls.change"
                                                v-model="VMODEL_SELECTVALUE"
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
                                    셀렉트 값 : <strong>{{ VMODEL_SELECTVALUE }}</strong>
                                    &nbsp;
                                    <button class="default-button" @click="CHANGE_VMODEL_SELECTVALUE(6)">
                                        무작위변경 (1~6)
                                    </button>
                                </div>
                            </div>
                        </div>
                <!-- //입력/선택 드롭다운 -->









                <!-- 입력/선택 라디오 -->
                        <div v-if="renderId === '입력/선택 라디오'">

                            <div class="comp-view row">

                                <!-- <InputRadio value="yes"
                                            v-model="controls.value"
                                            name="input-radio"
                                            @change="controls.change"
                                >
                                    YES!!
                                </InputRadio>

                                <InputRadio value="no"
                                            v-model="controls.value"
                                            name="input-radio"
                                            @change="controls.change"
                                >
                                    NO..
                                </InputRadio>

                                <InputRadio value="no2"
                                            v-model="controls.value"
                                            name="input-radio"
                                            @change="controls.change"
                                >
                                    NO2..
                                </InputRadio> -->

                                <InputRadio value="yes"
                                            name="input-radio"
                                            @change="controls.change"
                                            v-model="controls.value"
                                >
                                    yes
                                </InputRadio>

                                <InputRadio value="no"
                                            name="input-radio"
                                            @change="controls.change"
                                            v-model="controls.value"
                                >
                                    no
                                </InputRadio>

                            </div>

                            <div class="comp-control">
                                <div>
                                   셀렉트 값 : <strong> {{ controls.value }} </strong>
                                </div>
                                <div>
                                    셀렉트 값 설정해보기 :
                                    <label class="radio-label">
                                        <input type="radio" name="입력/선택 라디오/값" value="yes" v-model="controls.value" ><span>yes</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="입력/선택 라디오/값" value="no" v-model="controls.value" ><span>no</span>
                                    </label>
                                    <label class="radio-label">
                                        <input type="radio" name="입력/선택 라디오/값" value="unmatch" v-model="controls.value" ><span>unmatch</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                <!-- //입력/선택 라디오 -->










                    <!-- 입력/선택 라디오 컬렉션 -->
                        <div v-if="renderId === '입력/선택 라디오 컬렉션'">
                            <div class="comp-view">

                                <!-- <InputRadioCollection -->
                                <InputRadioCollection   v-model="VMODEL_SELECTVALUE"
                                                        name="input-radio-collection"
                                                        @change="controls.change"
                                                        :direction="controls.direction"
                                                        :list="controls.list"
                                />

                            </div>
                            <div class="comp-control">
                                <div>
                                    셀렉트 값 :  <strong> {{ VMODEL_SELECTVALUE }} </strong>
                                    &nbsp;
                                    <button class="default-button" @click="CHANGE_VMODEL_SELECTVALUE(10)">
                                        무작위변경 (1~10)
                                    </button>
                                </div>
                                <div>
                                    나열 방향 : {{ controls.direction === 'col' ? '세로' : '가로'}}
                                    &nbsp;
                                    <button class="default-button" @click="controls.directionChange(controls)">
                                        변환
                                    </button>
                                </div>
                            </div>
                        </div>
                    <!-- 입력/선택 라디오 컬렉션 -->









                    <!--  입력/선택 체크박스 -->
                        <div v-if="renderId === '입력/선택 체크박스'">
                            <div class="comp-view row">
                                <InputCheckbox
                                    v-model="controls.checks[0]"
                                    @change="controls.change"
                                    checked
                                    text="체크박스 A"
                                />
                                <InputCheckbox
                                    v-model="controls.checks[0]"
                                    @change="controls.change"
                                    text="체크박스 A"
                                />
                                <InputCheckbox
                                    v-model="controls.checks[1]"
                                    @change="controls.change"
                                    text="체크박스 B"
                                />
                                <InputCheckbox
                                    v-model="controls.checks[2]"
                                    @change="controls.change"
                                    text="체크박스 C"
                                />
                            </div>
                            <div class="comp-control">
                                <div>
                                    체크 옵저버 : <strong>{{ controls.checks }}</strong>
                                </div>
                                <div>
                                    체크 값 설정해보기
                                    &nbsp;
                                    <label class="checkbox-label">
                                        <input type="checkbox" v-model="controls.checks[0]">
                                        <span>sync A</span>
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" v-model="controls.checks[1]">
                                        <span>sync B</span>
                                    </label>
                                    <label class="checkbox-label">
                                        <input type="checkbox" v-model="controls.checks[2]">
                                        <span>sync C</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    <!--  입력/선택 체크박스 -->




                        <div v-if="renderId === '입력/선택 체크박스 컬렉션'">
                            <div class="comp-view">
                                <InputCheckboxCollection    v-model="controls.list"
                                                            @change="controls.change"
                                                            :direction="controls.direction"
                                                            name="input-checkbox-collection"

                                />
                            </div>
                            <div class="comp-control">
                                <div>
                                    체크 옵저버 : <strong>{{ controls.list.map(c => c.checked) }}</strong>
                                </div>
                                <div>
                                    체크 값 설정해보기
                                    &nbsp;
                                    <label class="checkbox-label" v-for="(item,idx) in controls.list" :key="idx">
                                        <input type="checkbox" v-model="item.checked">
                                        <span>sync {{idx+1}}</span>
                                    </label>
                                </div>
                                <div>
                                    나열 방향 : {{ controls.direction === 'col' ? '세로' : '가로'}}
                                    &nbsp;
                                    <button class="default-button" @click="controls.directionChange(controls)">
                                        변환
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- <div v-if="renderId === '맞는 ID'">
                            <div class="comp-view">
                            </div>
                            <div class="comp-control">
                                <div></div>
                                <div></div>
                            </div>
                        </div> -->


                        <template v-if="selectItem.name">
                            <div class="comp-infomation">
                                <div class="comp-title">{{selectItem.title}}</div>
                                <div class="comp-text">{{selectItem.text}}</div>

                                <ul class="comp-propslist" v-if="selectItem.props">
                                   <li v-for="([c,v],idx) in Object.entries(selectItem.props)" :key="idx">
                                        <div class="comp-propslist-key">{{c}}</div>
                                        <div class="comp-propslist-value">{{v}}</div>
                                   </li>
                                </ul>

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
import InputRadioCollection from '@/components/input/InputRadioCollection.vue';
import InputCheckbox from '@/components/input/InputCheckbox.vue';
import InputCheckboxCollection from '@/components/input/InputCheckboxCollection.vue';

import TESTCOMP from './TESTCOMP.vue';

export default {
    name : 'PageComponents',
    components : {
        // Category,
        ButtonDefault,
        ButtonDownload,
        InputDropdown,
        InputRadio,
        InputRadioCollection,
        InputCheckbox,
        InputCheckboxCollection,

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

            VMODEL_SELECTVALUE : 'select_value_3',

        }
    },
    watch : {
        "VMODEL_SELECTVALUE"(){
            // console.log(this.VMODEL_SELECTVALUE)
        }
    },

    methods : {
        TEST_ONCHANGE(e) {
            console.log(e);
        },
        CONSOLE_EVENT(payload) {
            {payload}
            // console.log('console evnet : ', payload);
        },
        CHANGE_VMODEL_SELECTVALUE(limit) {
            limit === undefined && (limit = 10);

            const newValue = `select_value_${Math.ceil(Math.random() * limit)}`;

            if(newValue === this.VMODEL_SELECTVALUE){
                this.CHANGE_VMODEL_SELECTVALUE(limit);
            }else {
                this.VMODEL_SELECTVALUE = newValue;
            }

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
    created() {
        this.CHANGE_VMODEL_SELECTVALUE(3);
    },

    updated () {
    },

    mounted() {

    }
}
</script>


<style src="./PageComponents.scss" lang="scss" ></style>
