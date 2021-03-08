<template>
    <div>
        <div id="comp">

            <div id="mylog">
                <!-- {{selectItem.control.text}} -->
            </div>
            <div id="comp-wrap">
                <div id="comp-not-mobile">
                    모바일에선 안보여줄거임
                </div>
                <div id="comp-tab">
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

                <div id="comp-content">

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




                    <div class="comp-infomation">
                        <template v-if="selectItem.name">

                            <div class="comp-title">{{selectItem.title}}</div>
                            <div class="comp-text">{{selectItem.text}}</div>

                            <ul class="comp-infovalue" v-if="selectItem.info" >
                                <!-- <p>기본 설정 시트<p> -->
                                <li v-for="([c,v],idx) in Object.entries(selectItem.info)" :key="idx">
                                    <div class="comp-infovalue-key">{{c}}</div>
                                    <div class="comp-infovalue-value">{{v}}</div>
                                </li>
                            </ul>

                        </template>

                        <template v-else>
                            <div class="comp-need-select">← please select component</div>
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

export default {
    name : 'PageComponents',
    components : {
        // Category,
        ButtonDefault,
        ButtonDownload,
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
            categoryData ,
            categoryOrder,

            selectItem : {},

            renderId : '',

        }
    },

    methods : {

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
        * {
            pointer-events: none !important;
            user-select: none !important;
        }
    }
}

</style>
