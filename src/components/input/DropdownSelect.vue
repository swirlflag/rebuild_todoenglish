<template>
    <div class="input--dropdown-select" ref="ref_root">

        <select :name="data_name" ref="ref_select" @change="onChange" id="hey">
            <slot></slot>
        </select>

        <div class="dropdown-select__layout">
            <div class="dropdown-select__display">
                display
            </div>
            <div class="dropdown-select__option" v-if="isDetectOption">
                <template v-for="(item,idx) in el_options">
                    <div    class="dropdown-select__option__item"
                            :class="{'st-selected' : idx === modelData.index}"
                            :key="idx"
                            :id="`i${idx}`"
                            @click="onClickItem(idx)"

                    >
                        {{ allDatas[idx].html }}
                    </div>
                </template>

                <!-- <div class="dropdown-select__option__item">option2</div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { iterElement } from '@/utils';
export default {
    name : "DropdownSelect",
    props : {
        placeholder : String,
        name : String,
    },
    data() {
        return {
            el_options : [],
            data_name : this.name || Math.random().toString(),

            observer : null,

            allDatas : [],

            modelData : {
                target : null,
                value : null,
                html : null,
                index : 0,
                before : {},
            },
        }
    },
    computed : {
        isDetectOption () {
            // if(this.el_options.length){
            //     console.log('hey~');
            // }
            return !!this.el_options.length
        },
    },
    methods : {

    // 엘리먼트 가져와서 컴포넌트에 저장
        fetchElements() {
            this.el_options = this.$refs.ref_select.querySelectorAll('option');

            const makeAllData = [];

            iterElement(this.el_options , (el,idx) => {
                makeAllData.push({
                    target : el,
                    html : el.innerHTML,
                    index : idx,
                })
            });

            this.allDatas = makeAllData;
        },

    // 현재 셀렉트된 것 파악후 컴포넌트에 저장. (이 변경으로 실제 표현화면 적용)
        saveModelData(target,index) {

            if(!this.el_options){
                return
            }

            const beforeData = this.modelData;

            if(target){
            // 인자로 파악후 저장
                this.modelData = {
                    target : target,
                    value : target.value,
                    html : target.innerHTML,
                    index : index,
                    before : beforeData,
                }
            }else {
            // 직접 파악후 저장
                iterElement(this.el_options, (el,idx) => {
                    if(el.selected){
                        this.modelData = {
                            target : el,
                            value : el.value,
                            html : el.innerHTML,
                            index : idx,
                            before : beforeData,
                        };
                        return true;
                    }
                });
            }

        },



    // 직접 찍어서 셀렉트 하는 기능 (index 혹은 value)
        selectedOption(value) {
            if(!this.el_options.length){
                return;
            }

            let index = 0;

            if(typeof value === 'number'){
                if(value >= this.el_options.length){
                    return;
                }
                index = value;
            }

            if(typeof value === 'string'){
                iterElement(this.el_options, (el,i) => {
                    if(el.value === value){
                        index = i;
                        return true;
                    }
                });
            }

            this.$refs.ref_select.selectedIndex = index;
            this.saveModelData(this.el_options[index],index);

            this.$emit('change' , this.modelData);

        },

        onClickDisplay() {

        },

    // 아이템 선택 바인딩.
        onClickItem(index) {
            this.selectedOption(index)
        },
    // 내장 select태그에 직접 바인딩 되어있는 함수. 컴포넌트 바깥에선 select태그를 조절
        onChange() {
            this.selectedOption(this.$refs.ref_select.selectedIndex);
        },

    // select 태그의 하위 정보 변경시에 onchange발동하게끔 설정
        syncChangeSelect() {
            // this.observer = new MutationObserver((mutations) => {
            //     console.log(mutations);
            //     mutations.forEach((mutation) => {
            //         console.log(mutation);
            //     });
            // });

            // this.observer.observe(this.$refs.ref_select, {characterData : true, attributes : true });
            // console.log(this.$refs.ref_select);
        },

    // 실제 보이는 인터페이스 제작, 바인딩
        formationElements() {

        },

    },
    created() {
    },
    mounted() {
    // select, option 엘리먼트들 가져와서 컴포넌트에 저장
        this.fetchElements();
    // select 태그의 하위 정보 변경시에 onchange발동하게끔 설정
        this.syncChangeSelect();
    // 현재 셀렉트된 것 파악후 컴포넌트에 정보 저장. (실제 인터페이스에 들어갈 정보 저장 )
        this.saveModelData();
    // 실제 보이는 인터페이스 제작, 모션,이벤트 바인딩
        this.formationElements();

        this.selectedOption('o2');
    },
}
</script>

<style scoped lang="scss">
.input--dropdown-select {
    border: 1px solid #d3d;

    > select {
        border: 5px dashed #3d3 ;
    }

    .dropdown-select__layout {

        border: 1px solid #000;
        cursor: pointer;

        .dropdown-select__display {
            background-color: #aac;
        }

        .dropdown-select__option {
            border: 1px solid #3d3;
            

            .dropdown-select__option__item {
                
                &.st-selected {
                    background: #aaa;
                }
            }
        }
        

    }

}
</style>