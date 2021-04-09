<!--

    USE PREVIEW :
        <InputRadio value="myValue"
                    name="myName"
                    @change="myChange"
                    v-model="myModelValue"  ||  checked
        >
            myText
        </InputRadio>

    METHODS :
        ref.check()

    MEMO :
        이 컴포넌트를 단일로 구성해 묶음을 직접 구성한후 $emit('change')호출시 현재 input의 value 정보만 받을수 있습니다.
        나열한 라디오들의 index, before와 같은 요소가 필요하다면 InputRadioCollection을 사용해 주세요.

-->
<template>
    <label  class="input--radio"
            :class="{'st-checked' : isChecked}"
    >
        <input type="radio" :value="value" :name="name" ref="ref_radio" @change="onChange" :data-checked="isChecked" @click="onClick">
        <span class="radio--icon"></span>

        <div class="radio--label">
            <slot></slot>
        </div>

    </label>
</template>

<script>
export default {
    name : 'InputRadio',
    model: {
        prop: 'modelValue',
        event: 'modelEvent'
    },

    props : {
        modelValue : null,

        name : {
            type : String,
            required : true
        },
        value : {
            type : null,
            required : true,
        },

        checked : Boolean,

        index : Number,
    },

    data() {
        return {
            isChecked : false,
            syncObserver : null,

            ignoreModel : false,
            ignoreChange : false,

            modelData : {
                value : this.value,
                index : 0,
            },
        }
    },
    watch : {
        'modelValue'(){
            this.watchModelValue();
        },
        'checked'() {
            this.watchChecked();
        },

    },
    computed : {

    },
    methods : {

        check() {
            this.detectSiblingBeforeUnselect();
            this.isChecked = true;
            this.emitEvent();
        },
        uncheck() {
            this.isChecked = false;
        },

        watchModelValue() {
            if(!this.ignoreModel){
                if(this.value === this.modelValue){
                    this.check();
                }else {
                    this.uncheck();
                }
            }
            this.ignoreModel = false;
        },

        watchChecked() {
            if(this.checked){
                this.check();
            }
        },

        onClick() {
            if(this.isChecked){
                return
            }

            this.check();
            this.ignoreChange = true;
        },

        onChange() {
            if(this.ignoreChange){
                this.ignoreChange = false;
                return;
            }

            this.check();
        },

        emitEvent() {
            this.ignoreModel = true;
            this.$emit('change' , this.value , this.index);
            this.$emit('modelEvent' , this.value);
        },

    // 같은 name으로 묶여있고, 직전에 선택되어있던 항목의 data-checked를 해제해주는 기능
        detectSiblingBeforeUnselect() {
            const before = document.querySelector(`input[type=radio][name=${this.name}][data-checked=true]`);
            if(before){
                before.dataset.checked = false;
            }
        },

    // data-checked 가 false가 될때 반응해 컴포넌트 내의 isChecked를 동기화 시켜주는 옵저버
        bindSyncObserver() {
            this.$refs.ref_radio.dataset.checked = this.isChecked;

            this.syncObserver = new MutationObserver((mutations) => {
                mutations.forEach(({ target, attributeName }) => {
                    if(attributeName === 'data-checked'){
                        this.isChecked = target.dataset.checked === 'true';
                    }
                });
            });

            this.syncObserver.observe(this.$refs.ref_radio, { attributes: true });
        },

    },

    mounted() {

        if(this.checked || this.modelValue === this.value){
            // this.ignoreModel = true;
            this.isChecked = true;
        }

        this.bindSyncObserver();

    },
    beforeDestroy() {
        this.syncObserver.disconnect();
    }
}


</script>

<style scoped lang="scss">
.input--radio {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 200ms ease;

    input {
        display: none;
    }

    @include hover {

        color: $COLOR_pink_1;
        .radio--icon {
            border-color : $COLOR_pink_1;
        }
    }
}

.radio--icon {
    display: inline-block;
    width: 22px; height: 22px;
    border-radius: 9999px;
    position: relative;
    box-sizing: border-box;
    margin-right: 8px;
    border: 2px solid $COLOR_linegray;
    background-color: #F5F5F7;
    transition: border 200ms ease, background-color 200ms ease;

    .st-checked & {
        background-color: $COLOR_pink_1;
        border-color : $COLOR_pink_1;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: #fff;
        transform : scale(1);
        transform-origin: center center;
        border-radius: inherit;
        opacity: 0;
        transition: transform 450ms $EASE_outBack2;

        .st-checked & {
            transform : scale(0.4) ;
            opacity: 1;
        }
    }
}

</style>