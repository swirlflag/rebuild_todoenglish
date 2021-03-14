<template>
    <div    class="input--dropdown-select" ref="ref_root" id="root"
            :class="{'st-open' : isOpen}"
    >
        <select :name="data_name" ref="ref_select" @change="onChange" id="hey">
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
                    <TextChangeMask :text="modelData.html" contain/>
                </div>
                <div class="dropdown-select__dimmed" @click="close"></div>
                <div    class="dropdown-select__option"
                        :class="{
                            'st-before-calc' : !transformStyle.calcFinish,
                        }"
                        v-if="isDetectOption || true"
                        ref="ref_selectOption"
                >
                    <ul class="dropdown-select__option__list">
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
    props : {
        placeholder : String,
        name : String,
    },
    components : {
        TextChangeMask,
    },
    data() {

        return {
            el_options : [],
            transformStyle : {
                closeHeight : 'auto',
                openHeight : 'auto',
                maxHeight: null,
                calcFinish : false,
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
        }
    },
    computed : {
        isDetectOption () {

            return !!this.el_options.length
        },
    },

    watch : {
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

    // 전달받은 인자를 파악해 현재 컴포넌트의 정보를 변경할 준비를 한다 (인자는 index 혹은 value)
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

            if(this.$refs.ref_select.selectedIndex !== index){
                this.$refs.ref_select.selectedIndex = index;
            }

            this.saveModelData(this.el_options[index],index);

            this.$emit('change' , this.modelData);

        },


    // 현재 셀렉트된 것 파악후 컴포넌트에 저장. (이 변경으로 실제 표현화면 적용)
        saveModelData(target,index) {

            if(!this.el_options){
                return
            }

            const beforeData = this.modelData;

            if(target){
            // 인자가 있다면 인자로 파악후 그대로 저장
                this.modelData = {
                    target : target,
                    value : target.value,
                    html : target.innerHTML,
                    index : index,
                    before : beforeData,
                }
            }else {
            // 인자가 없다면 직접 순서를 체크해 저장 (memo: selectedindex로 해보자)
                iterElement(this.el_options, (el,idx) => {
                    if(el.selected){

                        this.modelData = {
                            target : el,
                            value : el.value,
                            html : el.innerHTML,
                            index : idx ,
                            before : beforeData,
                        };

                        return true;
                    }
                });

                if(this.modelData.index === 0 && this.placeholder){
                    this.modelData.html = this.placeholder
                }

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


        open() {
            // console.log('open?');
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        },
        openAction() {

            // console.log(this.$refs.ref_root);

            const WH = window.innerHeight;

            const rect = this.$refs.ref_root.getBoundingClientRect();
            const st = rect.top;{st}

            let overvalue = 0; {overvalue}
            const padingValue = 10;

            // this.transformStyle.maxHeight = (WH - (padingValue*2)) - this.transformStyle.closeHeight;
            this.transformStyle.maxHeight = (WH - (padingValue*2)) - 0;

            const wantHeight = Math.min(this.transformStyle.openHeight, this.transformStyle.maxHeight);
            // console.log(wantHeight);

            if(st + wantHeight > WH - padingValue){
                overvalue = WH - (st + wantHeight) - padingValue;
                // console.log('over value =',  overvalue );
            }

            // const st = rect.top;{st}
            // console.log(this.transformStyle.openHeight/2 - st/2);

            // let Y = this.transformStyle.openHeight/2 - st/2;

            const isMove = overvalue !== 0;

            const delay = isMove ? 0.2: 0;

            // console.log(isMove);

            // const tl = new this.gsap.timeline();


            this.tl.to(this.$refs.ref_transform , {
                // height: wantHeight,
                y: overvalue,
                duration : 0.5,
                ease: 'power4.out',
            },0);

            this.tl.to(this.$refs.ref_transform , {
                height: wantHeight,
                // y: overvalue,
                duration : 0.8,
                ease: 'power4.out',
            },delay)

            // this.tl.to(this.$refs.ref_transform , {
            //     height: wantHeight,
            //     // y: overvalue,
            //     duration : 0.7,
            //     ease: 'power4.out',
            // },delay);

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
            const el_options = this.$refs.ref_selectOption;
            const el_transform = this.$refs.ref_transform;
            const el_display = this.$refs.ref_display;
            // const el_display = this.$refs.ref_display;

            // console.log(el_display.offsetHeight);

            // console.log(object);
            el_transform.style.height = el_display.offsetHeight + 'px';

            setTimeout(() => {

                const closeHeight = el_display.offsetHeight;

                // console.log(closeHeight);
                const openHeight = el_options.offsetHeight + closeHeight;

                this.transformStyle = {
                    ...this.transformStyle,
                    openHeight, closeHeight,
                    calcFinish : true,
                }

                // console.log(this.transformStyle);
                // console.log();
                // el_options.offsetHeight

            },0);
        },

        correctionWindowResize() {
            this.close();
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
    // select 태그의 하위 정보 변경시에 onchange발동하게끔 설정
        this.syncChangeSelect();
    // 현재 셀렉트된 것 파악후 컴포넌트에 정보 저장. (실제 인터페이스에 들어갈 정보 저장 )
        this.saveModelData();
    // 실제 보이는 인터페이스 제작, 모션,이벤트 바인딩
        this.formationElements();
    // 다른 영역 클릭시 보정처리할 기능
        this.bindWindowEvent();

        // if(this.placeholder){
        //     this.modelData.html = this.placeholder;
        // }
        // this.selectedOption('o2');
        // this.selectedOption('o1');
        // this.selectedOption('o3');
        // this.selectedOption(0);
        // this.selectedOption(1);
        // this.selectedOption(2);
        // this.selectedOption(0);
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

    @include phone {
        padding: 15px 20px;
    }
}

.input--dropdown-select {
    width: auto;
    height: auto;

    &.st-open {
        z-index: 10;
    }

    > select {
        display: none;
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
        background: #000;
        transition: opacity 500ms ease;
        opacity: 0;
        pointer-events: none;

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
    // box-sizing: border-box;
    border: 1px solid #000;
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
        // left: 5px;
        // bottom: 5px;
        z-index: 30;
        background-color: #ddd;

        box-sizing: border-box;
        // padding: 4px;
        // margin-bottom: 4px;
        // overflow: hidden;
        max-height : 73%;
        // border: 5px solid #3dd;
        pointer-events: all !important;
        border-radius: 20px;
        transition: transform 400ms $EASE_inOutQuint;
        transform: translateY(100%);
        // display: none !important;
        .st-open & {
            transition: transform 700ms $EASE_outExpo;
            transform: translateY(0);
            // border: 1px solid #d3d;
        }
    }

}

.dropdown-select__option__list {
    display: flex;
    flex-direction: column;

    @include phone {
        // border: 5px solid #3d3;
        // border-radius: 8px;
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
    }

    @include hover {
        background-color: #ddd;
        color: #000;
    }

    @include phone {
        text-align: center;
    }
}

</style>