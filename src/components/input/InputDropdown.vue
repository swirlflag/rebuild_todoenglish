<!--
    USE PREVIEW
        <InputDropdown      placeholder="옵션을 골라주세요"
                            @change="changeFunction"
                            v-model="modelValue"
        >
            <option     v-for="(item,idx) in list"
                        :key="idx"
                        :value="item"
                        :selected="idx === myIndex"
            >
                {{ item }}
            </option>
        </InputDropdown>

    METHODS :
        ref.open()
        ref.close()
        ref.select(0)               // Number : index
        ref.select('my option')     // String : value

    MEMO :
        최초 mount시 컴포넌트의 v-model이 option태그의 selected보다 우선시 됩니다.

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
                        <template v-for="(item,idx) in allData">
                            <li    class="dropdown-select__option__item"
                                    :class="{'st-selected' : idx === modelData.index, 'sync-placeholder' : (placeholder && idx === 0)}"
                                    :key="`${idx}-${item.value}`"
                                    @click="onClickItem(item.value)"
                                    :data-value="item.value"
                            >
                                {{ item.html }}
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
import { targetPathDetect } from '@/utils';

export default {
    name : "InputDropdown",
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
        // placeholder의 표시 여부를 결정하는 값
            isShowPlaceholder : false,
        // 실제 화면 placeholder에 표시를 결정하는 값.
            placeholderData : this.placeholder || '선택하기',
        // querySelectorAll('option')
            el_options : [],

            isOpen : false,
            tl : new this.gsap.timeline(),
            transformStyle : {
                closeHeight : 'auto',
                openHeight : 'auto',
                maxHeight: null,
                calcFinish : false,
                paddingValue : 10,
            },

        // select name 속성. 없으면 임의로 생성
            data_name : this.name || Math.random().toString(),

        // 모든 option의 데이터를 모아 보관
            allData : [],

        // 현재 포커싱된 데이터를 저장, 선택될때마다 갱신
            modelData : {
                el_option : null,
                value : null,
                html : null,
                index : 0,
                before : {},
            },

            ignoreModel : false,
        }
    },
    computed : {
        isDetectOption () {
            return !!this.el_options.length;
        },
        displayText() {
            return this.isShowPlaceholder ? this.placeholderData : this.modelData.html;
        },
    },
    watch : {
        'modelValue'(){
            this.watchModelValue();
        },
        'isOpen'() {
            this.watchIsOpen();
        },
        'modelData'() {
            this.watchModelData();
        },
    },
    methods : {
        watchModelValue(){
            if(!this.ignoreModel){
                this.select(this.modelValue);
            }
            this.ignoreModel = false;
        },
        watchIsOpen() {
            this.tl.pause();
            this.tl.clear();
            if(this.isOpen){
                this.openAction();
            }else {
                this.closeAction();
            }
            this.tl.play();
        },
        watchModelData() {
            if(this.modelData.index > -1){
                this.$emit('change' , this.modelData);
                if(this.modelData.value !== this.modelValue){
                    this.ignoreModel = true;
                    this.$emit('modelEvent' , this.modelData.value)
                }
            }
        },

    // isOpen 변경자
        open() { this.isOpen = true; },
        close() { this.isOpen = false; },

    // 엘리먼트 가져와서 컴포넌트에 저장
        fetchElements() {
            this.el_options = this.$refs.ref_select.querySelectorAll('option');

            this.allData = [...this.el_options].map((el,i) => {
                return {
                    el_option : el,
                    html : el.innerHTML,
                    index : i,
                    value : el.value,
                }
            });

        },

    // 전달받은 인자를 파악해 현재 컴포넌트의 정보를 변경할 준비를 한다 (인자는 index:Number || value:String)
        select(value) {

            if(value === undefined){
                return;
            }

            if(!this.allData.length){
                return;
            }

            const refineIndex = this.refineryIndex(value);

            this.recordModelData(refineIndex);

            if(refineIndex > -1){
                if(this.$refs.ref_select.selectedIndex !== refineIndex){
                    this.$refs.ref_select.selectedIndex = refineIndex;
                }
            }

        },

    // placeholder유무에 따라 컴포넌트 내에서 실제 사용할 index를 정제
        refineryIndex(value) {

            const lengthCorrection  = this.placeholder ? 1 : 0;

            if(typeof value === 'number'){
                if(!(value < 0 || value >= this.allData.length - lengthCorrection)){
                    return value + lengthCorrection;
                }
            }

            if(typeof value === 'string'){
                for(let i = 0, l = this.allData.length; i < l; ++i){
                    if(this.allData[i].value === value){
                        return i;
                    }
                }
            }

            return -1;
        },


    // 인자로 현재 셀렉트 된 것 정리해서 컴포넌트 데이터에 저장 . (이 변경으로 실제 표현화면 적용)
        recordModelData(index) {
            const usePlaceholder    = !!this.placeholder;
            const validRange        = index > (usePlaceholder ? 0 : -1) && index < this.allData.length;

            const data              =   validRange ? this.allData[index]    : null;
            const el_option         =   validRange ? this.el_options[index] : null;
            const value             =   validRange ? data.value             : null;
            const html              =   validRange ? data.html              : null;

            const before            =   {...this.modelData};
            delete before.before;

            const recordModelData = {
                el_option, value, html , before ,index
            };

            this.modelData = recordModelData;

            this.isShowPlaceholder = !validRange;

        },


    // 현재 셀렉트 된 것 직접 파악후 컴포넌트에 저장 (마운트시 사용) (이 변경으로 실제 표현화면 적용)
        detectModelData() {

            if(this.modelValue){
                this.select(this.modelValue);
                return;
            }

            for(let i = 0, l = this.allData.length; i < l; ++i){
                const data = this.allData[i];
                const option = data.el_option;

                if(option.selected) {
                    this.select(option.value)
                    return;
                }

            }

            this.select(-1);

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
                openDelay = 0.28;
            }

            this.tl.to(this.$refs.ref_transform , {
                y: overValue,
                ease: 'power4.out',
                duration : 0.47,
            },0);

            this.tl.to(this.$refs.ref_transform , {
                height: wantHeight,
                ease: 'power4.out',
                duration : 0.7,
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
        onClickItem(value) {
            this.select(value);
            this.close();
        },
    // 내장 select태그에 직접 바인딩 되어있는 함수. 컴포넌트 바깥에선 select태그를 조절
        onChange() {
            this.select(this.$refs.ref_select.selectedIndex);
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
    updated () {
        // console.log(this.modelValue);
    },

    mounted() {
    // select, option 엘리먼트들 가져와서 컴포넌트에 저장
        this.fetchElements();
    // 현재 셀렉트된 것 파악후 컴포넌트에 정보 저장. (실제 인터페이스에 들어갈 정보 저장 )
        this.detectModelData();
    // 실제 보이는 인터페이스 제작, 모션,이벤트 바인딩
        this.formationElements();
    // 다른 영역 클릭시 보정처리할 기능
        this.bindWindowEvent();

    },

    beforeDestroy() {
        // this.recordModelData(-1);
    },

    destroyed() {
    // 파괴시 다른영역 클릭 보정처리 해제
        this.unbindWindowEvent();
    }
}
</script>

<style scoped lang="scss">
$padding_item : 10px;
$color_background : #fff;
$color_hover : #ddd;
$color_select : #333;


@mixin itemStyle {
    display: inline-block;
    padding: $padding_item;
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
        background-color: #000;
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
    z-index: 1;

    @include phone {
        transform : none !important;
        height : auto !important;
    }
}

.dropdown-select__display {
    @include itemStyle;
    // background-color: #ddd;
    position: relative;
    background-color: $color_background;
    font-weight: 800;
    // border-bottom: 1px solid #000;
    box-shadow: 0 0 3px 2px rgba(0,0,0,0.15);
    z-index: 3;

    &::before {
        content: '';
        width: 12px; height: 100%;
        display: inline-block;
        right: $padding_item; top: 0;
        position: absolute;
        background-image: url("~@/assets/icon/icon_dropdown_arrow.svg");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center 50%;
        transition: transform 300ms ease;

        .st-open & {
            transform : rotate(180deg);
        }
    }
}

.dropdown-select__option {
    position : relative;
    pointer-events: none;
    user-select: none;
    box-sizing: border-box;
    overflow-y: scroll;
    overflow-y: overlay;
    overflow-x : hidden;

    &::-webkit-scrollbar{
        width: 5px;
        border-right: 2px solid transparent;
    }
    &::-webkit-scrollbar-thumb{
        background: linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 70%, rgba(0,0,0,0) 100%);
    }
    &::-webkit-scrollbar-track {
        // display: none;
        background-color: transparent;
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
    background: $color_background;
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