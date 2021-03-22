<!--
    <DropdownSelect     placeholder="옵션을 골라주세요"
                        @change="myChangeFunction"
                        v-model="selectValue"
    >
        <option     v-for="(item,idx) in optionData"
                    :key="idx"
                    :selected="idx === myIndex"
        >
            {{ item }}
        </option>
    </DropdownSelect>
-->

<template>
    <div    class="input--dropdown-select" ref="ref_root"
            :class="{'st-open' : isOpen}"
    >
        <select :name="data_name" ref="ref_select" @change="onChange">
            <option value="" v-if="placeholder" class="dropdown-select__placeholder"></option>
            <slot>

            </slot>
        </select>

        <div    class="dropdown-select__layout"
                ref="ref_layout"
                :style="{'height' : transformStyle.closeHeight + 'px'}"
        >
            <div    class="dropdown-select__transform"
                    ref="ref_transform"
            >
                <div    class="dropdown-select__display"
                        ref="ref_display"
                        @click="onClickDisplay"
                >
                    <TextChangeMask :text="displayText" contain/>
                </div>
                <div class="dropdown-select__dimmed" @click="close"></div>
                <div    class="dropdown-select__option"
                        :class="{
                            'st-before-calc' : !transformStyle.calcFinish,
                        }"
                        v-if="isDetectOption"
                        ref="ref_selectOption"
                >
                    <ul class="dropdown-select__option__list"
                        ref="ref_selectList"
                    >
                        <template v-for="(item,idx) in el_options">
                            <li    class="dropdown-select__option__item"
                                    :class="{'st-selected' : idx === modelData.index, 'sync-placeholder' : (placeholder && idx === 0)}"
                                    :key="idx"
                                    @click="onClickItem(idx)"
                            >
                                {{ allDatas[idx].html }}
                            </li>
                        </template>
                    </ul>

                </div>
            </div>

        </div>
    </div>

</template>

<script>

import TextChangeMask from '@/components/layout/TextChangeMask.vue';
import { iterElement , targetPathDetect} from '@/utils';
export default {
    name : "DropdownSelect",
    components : {
        TextChangeMask,
    },
    model: {
        prop: 'modelValue', // modelEvent 바인딩 값
        event: 'modelEvent',
    },
    props : {
        modelValue : String, // modelEvent 바인딩 값

        placeholder : String,
        name : String,
    },
    data() {
        return {
            el_options : [],
            transformStyle : {
                closeHeight : 'auto',
                openHeight : 'auto',
                maxHeight: null,
                calcFinish : false,
                paddingValue : 10,
            },
            data_name : this.name || Math.random().toString(),
            isOpen : false,
            tl : new this.gsap.timeline(),

            allDatas : [],

            modelData : {
                target : null,
                value : null,
                html : null,
                index : 0,
                before : {},
            },

            placeholderData : null,

            ignoreModel : false,
        }
    },
    computed : {
        isDetectOption () {
            return !!this.el_options.length;
        },
        displayText() {
            return this.placeholderData || this.modelData.html;
        },
    },
    watch : {
    // modelEvent 바인딩 값
        'modelValue'(){
            if(!this.ignoreModel){
                this.selectedOption(this.modelValue);
            }
            this.ignoreModel = false;
        },

        'isOpen'(now) {
            this.tl.pause();
            this.tl.clear();
            if(now){
                this.openAction();
            }else {
                this.closeAction();
            }
            this.tl.play();
        }
    },
    methods : {

    // isOpen 변경자
        open() {
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        },

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

    // 전달받은 인자를 파악해 현재 컴포넌트의 정보를 변경할 준비를 한다 (인자는 index:Number || value:String)
        selectedOption(value) {

            if(value === undefined){
                return;
            }

            if(!this.el_options.length){
                return;
            }

            let index = -1;

            if(typeof value === 'number'){
                if(value >= this.el_options.length){
                    return;
                }
                index = value;
            }

            if(typeof value === 'string'){
                for(let i = 0, l = this.el_options.length; i < l; ++i){
                    if(this.el_options[i].value === value){
                        index = i;
                        break;
                    }
                }
            }

            if(index === -1){
                this.inconsistencyModel();
                return;
            }

            if(this.$refs.ref_select.selectedIndex !== index){
                this.$refs.ref_select.selectedIndex = index;
            }

            this.setModelData(this.el_options[index],index);

            this.eventEmiting();
        },


    // 인자로 현재 셀렉트 된 것 정리해서 컴포넌트에 저장. (이 변경으로 실제 표현화면 적용)
        setModelData(target,index) {

            const beforeData = {...this.modelData}

            delete beforeData.before;

            this.modelData = {
                target : target,
                value : target.value,
                html : target.innerHTML,
                index : index,
                before : beforeData,
            }

            this.placeholderData = null;

        },

        inconsistencyModel() {
            this.placeholderData = this.placeholder || '오류가 발생했습니다';
        },

        eventEmiting() {
            this.$emit('change' , this.modelData);

            if((this.modelData.value !== this.modelValue)){
                this.ignoreModel = true;
                this.$emit('modelEvent' , this.modelData.value)
            }
        },

    // 현재 셀렉트 된 것 직접 파악후 컴포넌트에 저장 (이 변경으로 실제 표현화면 적용)
        detectModelData() {
            for(let i = 0, l = this.el_options.length; i < l; ++i){
                const el = this.el_options[i];

                const isSameModelValue = !!( this.modelValue && el.value === this.modelValue );
                const isDetectSelected = !!( !this.modelValue && el.selected );

                if(isSameModelValue || isDetectSelected) {
                    this.setModelData(el,i);
                    break;
                }

            }

            if(this.modelData.index === 0 && this.placeholder){
                this.placeholderData = this.placeholder;
            }
        },

        onClickDisplay() {
            this.isOpen ? this.close() : this.open();
        },

        correctionWindowClick(e) {
            if(!this.isOpen){
                return
            }

            const isExact = targetPathDetect(e,this.$refs.ref_layout);

            if(!isExact){
                this.close();
            }
        },

        openAction() {
            if(this.$screen.isMobileSize){
                return
            }

            const WH = this.$screen.height;

            const rect = this.$refs.ref_root.getBoundingClientRect();
            const offsetTop = rect.top;

            const wantHeight = Math.min(this.transformStyle.openHeight, this.transformStyle.maxHeight);

            const isOver = offsetTop + wantHeight > WH - this.transformStyle.paddingValue;

            let overValue = 0;
            let openDelay = 0;
            if(isOver){
                overValue = WH - (offsetTop + wantHeight) - this.transformStyle.paddingValue;
                openDelay = 0.2;
            }

            this.tl.to(this.$refs.ref_transform , {
                y: overValue,
                ease: 'power4.out',
                duration : 0.5,
            },0);

            this.tl.to(this.$refs.ref_transform , {
                height: wantHeight,
                ease: 'power4.out',
                duration : 0.8,
            },openDelay);

        },

        closeAction() {
            this.tl.to(this.$refs.ref_transform , {
                height: this.transformStyle.closeHeight,
                y : 0,
                duration : 0.5,
                ease: 'power4.out',
            });

        },

    // 아이템 선택 바인딩.
        onClickItem(index) {
            this.selectedOption(index);
            this.close();
        },
    // 내장 select태그에 직접 바인딩 되어있는 함수. 컴포넌트 바깥에선 select태그를 조절
        onChange() {
            this.selectedOption(this.$refs.ref_select.selectedIndex);
        },

    // 현재 상태에서 원하는 변형 값들을 계산해서 보관
        setWishSize() {
            const closeHeight = this.$refs.ref_display.offsetHeight;
            const openHeight = this.$refs.ref_selectList.offsetHeight + closeHeight;
            const maxHeight = this.$screen.height - (this.transformStyle.paddingValue*2);

            this.transformStyle = {
                ...this.transformStyle,
                openHeight,
                closeHeight,
                maxHeight,
            };
        },

    // 실제 보이는 인터페이스 제작, 바인딩
        formationElements() {
            this.$refs.ref_transform.style.height = this.$refs.ref_display.offsetHeight + 'px';

            setTimeout(() => {
                this.setWishSize();
                this.transformStyle.calcFinish = true;
            },0);
        },

        correctionWindowResize() {
            this.setWishSize();

            if(this.isOpen){
                this.close();
            }
        },

        bindWindowEvent(){
            window.addEventListener('click' , this.correctionWindowClick);
            window.addEventListener('resize' , this.correctionWindowResize);
        },
        unbindWindowEvent() {
            window.removeEventListener('click' , this.correctionWindowClick);
            window.removeEventListener('resize' , this.correctionWindowResize);
        },

    },
    created() {
    },
    mounted() {
    // select, option 엘리먼트들 가져와서 컴포넌트에 저장
        this.fetchElements();
    // 현재 셀렉트된 것 파악후 컴포넌트에 정보 저장. (실제 인터페이스에 들어갈 정보 저장 )
        // this.setModelData();
        this.detectModelData();
    // 실제 보이는 인터페이스 제작, 모션,이벤트 바인딩
        this.formationElements();
    // 다른 영역 클릭시 보정처리할 기능
        this.bindWindowEvent();

        // this.selectedOption('value5');
        // this.selectedOption(1);

    },

    destroyed() {
    // 파괴시 다른영역 클릭 보정처리 해제
        this.unbindWindowEvent();
    }
}
</script>

<style scoped lang="scss">

@mixin itemStyle {
    display: inline-block;
    padding: 10px;
    // padding-bottom: 11px;
    min-width : 170px;
    transition: background-color 200ms $EASE_outExpo;
    box-sizing: border-box;

}

.input--dropdown-select {
    width: auto;
    height: auto;

    &.st-open {
        z-index: 10;
    }

    > select {
        display: none !important;
        user-select: none !important;
        pointer-events: none !important;
    }

}

.dropdown-select__layout {
    cursor: pointer;
    position: relative;

}
.dropdown-select__dimmed {
    display: none;
    @include phone {
        display: block;
        width: 100%; height: 100%;
        position: fixed;
        top: 0; left: 0;
        background: #333;
        transition: opacity 500ms ease;
        opacity: 0;
        pointer-events: none;
        z-index: 20;

        .st-open & {
            pointer-events: all;
            opacity: 0.5;
        }
    }
}

.dropdown-select__transform {
    overflow: hidden;
    position: relative;
    display: inline-block;
    border: 1px solid #333;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    height: 100%;
    @include phone {
        transform : none !important;
        height : auto !important;
    }
}

.dropdown-select__display {
    @include itemStyle;
    // background-color: #ddd;
    position: relative;
    background-color: #fff;
    font-weight: 800;
}

.dropdown-select__option {
    position : relative;
    pointer-events: none;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-x : hidden;
    background-color: #fff;
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track {
        display: none;
    }

    &.st-before-calc {
        position: absolute;
        opacity: 0;
    }

    .st-open &{
        pointer-events: all;
    }

    @include phone {
        position: fixed;
        bottom: 0 ; left: 0;
        width: calc(100% - #{$SIZE_MO_innerPadding*2});
        left: $SIZE_MO_innerPadding;
        bottom: $SIZE_MO_innerPadding;
        z-index: 30;
        box-sizing: border-box;
        max-height : 73%;
        border-radius: 24px;
        transition: transform 400ms $EASE_inOutQuint , opacity 0ms linear 700ms;
        transform: translateY(calc(100% + #{$SIZE_MO_innerPadding}));
        opacity: 1;
        pointer-events: none;
        user-select: none;
        .st-open & {
            opacity: 1;
            pointer-events: all !important;
            user-select: all;
            transition: transform 700ms $EASE_outExpo, opacity 0ms linear;
            transform: translateY(0);
        }
    }

}

.dropdown-select__option__list {
    display: flex;
    flex-direction: column;

    @include phone {
    }
}

.dropdown-select__option__item {
    @include itemStyle;
    border-bottom: 1px solid #ededed;
    box-sizing: border-box;
    &:last-child {
        border-bottom: none;
    }

    &.st-selected {
        background: #666;
        font-weight: 800;
        color: #fff;
    }

    &.sync-placeholder {
        height: 0;
        display: none !important;
        border: none !important;
        pointer-events: none !important;
        user-select: none !important;
    }

    @include hover {
        background-color: #ddd;
        color: #333;
    }

    @include phone {
        text-align: center;
        font-size: $SIZE_MO_fontsize_strong;
        padding: 15px;
    }
}

</style>