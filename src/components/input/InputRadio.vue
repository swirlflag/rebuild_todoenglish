<!--

    <InputRadio value="inputValue"
                v-model="modelValue"
                name="input-radio"
    >
        value text
    </InputRadio>

    MEMO :
    이 컴포넌트를 단일로 구성해 묶음을 직접 구성한후 $emit('change')호출시 현재 input의 value 정보만 받을수 있습니다.
    index, before와 같은 요소가 필요하다면 InputRadioCollection을 사용해 주세요.

-->
<template>
    <label class="default--radio" :class="{'st-checked' : isSelect}">
        <input type="radio" v-model="value" :value="data_value" :name="name" @change="onChange" ref="ref_radio">
        <span class="radio--icon"></span>

        <div class="radio--label">
            <slot></slot>
        </div>

    </label>
</template>

<script>
export default {
    name : 'InputRadio',
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

    model: {
        prop: 'modelValue',
        event: 'modelEvent'
    },

    data() {
        return {
            data_value  : this.value,
            isSelect : false,
        }
    },
    watch : {
        'modelValue'(){
            console.log(this.modelValue);
            // console.log(this.ignoreModel);
            // if(!this.ignoreModel){
            //     this.changeCheck();
            //     // this.select(this.modelValue);
            // }
            // this.ignoreModel = false;
        }
    },
    methods : {
        onChange(){
            console.log('on change');
            // console.log(1);
            // this.changeCheck();
        },
        changeCheck() {
            this.isSelect = this.data_value === this.modelValue;
            // this.eventEmiting();
        },
        eventEmiting() {
            this.$emit('change' , this.data_value , this.index);
            // this.$emit('modelEvent' , this.data_value);

            if((this.modelValue !== this.data_value)){
                this.ignoreModel = true;
                this.$emit('modelEvent' , this.data_value)
            }
        },
    },
    mounted() {
        // console.log(this.modelValue , this.data_value);

        if(this.checked || this.modelValue === this.data_value){
            // this.$refs.ref_radio.checked = true;
            this.isSelect = true;
        }

        // if(this.$refs.ref_radio.checked){
        //     this.isSelect = true;
        // }

        console.log(this.isSelect);

    }
}


</script>

<style scoped lang="scss">
.default--radio {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 200ms ease;

    input {
        // display: none;
        -webkit-appearance : unset !important;
        appearance:  unset !important;
        width: 50px; height: 50px;
        background : unset !important;
        opacity: 1;
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