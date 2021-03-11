<template>
    <div class="input--dropdown-select" ref="ref_root" id="root">

        <select :name="data_name" ref="ref_select" @change="onChange" id="hey">
            <slot></slot>
        </select>

        <div    class="dropdown-select__layout"
                :class="{'st-open' : isOpen}"
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
                <div    v-if="isDetectOption || true"
                        class="dropdown-select__option"
                        ref="ref_selectOption"
                        :style="{
                            'top' : transformStyle.closeHeight + 'px' ,
                        }"
                >
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
            },
            data_name : this.name || Math.random().toString(),
            isOpen : false,
            isOpenDelay : false,
            tl : new this.gsap.timeline(),

            // observer : null,

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

    watch : {
        'isOpen'(now,old) {
            this.isOpenDelay = old;
            this.tl.isActive() && this.tl.clear();
            now ? this.openAction() : this.closeAction();
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
                            index : idx,
                            before : beforeData,
                        };
                        return true;
                    }
                });
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
            const padingValue = 0;

            // this.transformStyle.maxHeight = (WH - (padingValue*2)) - this.transformStyle.closeHeight;
            this.transformStyle.maxHeight = (WH - (padingValue*2)) - 0;

            const wantHeight = Math.min(this.transformStyle.openHeight, this.transformStyle.maxHeight);
            console.log(wantHeight);

            if(st + wantHeight > WH - padingValue){
                overvalue = WH - (st + wantHeight) - padingValue;
                console.log('over value =',  overvalue );
            }

            // const st = rect.top;{st}
            // console.log(this.transformStyle.openHeight/2 - st/2);

            // let Y = this.transformStyle.openHeight/2 - st/2;

            this.tl.to(this.$refs.ref_transform , {
                height: wantHeight,
                duration : 0.7,
                y: overvalue,

                ease: 'power4.out',
            });

        },

        closeAction() {

            this.tl.to(this.$refs.ref_transform , {
                height: this.transformStyle.closeHeight,
                duration : 0.5,
                y : 0,
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
            const el_display = this.$refs.ref_display;
            // const el_display = this.$refs.ref_display;
            setTimeout(() => {

                const closeHeight = el_display.offsetHeight;
                const openHeight = el_options.offsetHeight + closeHeight;

                this.transformStyle = {
                    openHeight, closeHeight
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

        this.selectedOption('o2');
        this.selectedOption('o1');
        this.selectedOption('o3');
        this.selectedOption(0);
        this.selectedOption(1);
        this.selectedOption(2);
        this.selectedOption(0);
        this.selectedOption(1);

    },

    destroyed() {
        console.log('destory');
    // 파괴시 다른영역 클릭 보정처리 해제
        this.unbindWindowEvent();
    }
}
</script>

<style scoped lang="scss">

@mixin itemStyle {
    display: inline-block;
    padding: 10px;
    min-width : 200px;
}

.input--dropdown-select {
    width: auto;
    height: auto;

    > select {
        display: none;
    }

}

.dropdown-select__layout {
    cursor: pointer;
    position: relative;

    .dropdown-select__transform {
        overflow: hidden;
        position: relative;
        display: inline-block;
        border: 1px solid #d3d;
        border-radius: 8px;
    }

    &.st-open {

    }

    

}

.dropdown-select__display {
    @include itemStyle;
    background-color: #ddd;
    position: relative;
}

.dropdown-select__option {

    position: absolute;
    top: auto; left: 0;
    pointer-events: none;
    // max-height: 500px;
    overflow-y: scroll;
    overflow-x : hidden;
    // -webkit-mask-image: -webkit-radial-gradient(white, black);
    // -webkit-backface-visibility: hidden;

// 출처: https://webdir.tistory.com/431 [WEBDIR]
    background: #fff;
    height: auto;

    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb,
    &::-webkit-scrollbar-track {
        display: none;
    }

    .st-open &{
        pointer-events: all;
    }

    .dropdown-select__option__item {
        @include itemStyle;
        &.st-selected {
            background: #aac;
        }

        @include hover {
            background-color: #aca;
        }
    }
}

</style>