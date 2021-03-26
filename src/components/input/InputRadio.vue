<!--
    <InputRadio
        text="inputText"
        name="input-radio"
        value="select_value_1"
        v-model="modelValue"
    />

    MEMO :
    이 컴포넌트를 단일로 구성해 묶음을 직접 구성할 경우 $emit change시 현재 input의 value만 받을수 있습니다.
    index, before와 같은 요소가 필요하다면 InputRadioCollection을 사용해 주세요.

-->
<template>
    <label class="default--radio" :class="{'st-checked' : isPick}">
        <input type="radio" v-model="valueData" :value="value" :name="name" @change="onChange" ref="ref_radio">
        <span class="radio--icon"></span>
        <div class="radio--label" v-html="text">
        </div>
    </label>
</template>

<script>
export default {
    name : 'InputRadio',
    props : {
        modelValue : null,

        text : String,
        name : {
            type : String,
            required : true
        },
        checked : Boolean,
        value : null,
    },
    model: {
        prop: 'modelValue',
        event: 'modelEvent'
    },
    data() {
        return {
            valueData  : this.value,
            isPick : false,
        }
    },
    watch : {
        'modelValue'(now){
            this.isPick = this.valueData === now;
        }
    },
    methods : {
        onChange(){
            console.log(this.valueData);
            this.$emit('change' , this.valueData);
            this.$emit('modelEvent' , this.valueData);
        },
    },
    mounted() {
        if(this.checked){
            this.$refs.ref_radio.checked = true;
        }

        if(this.$refs.ref_radio.checked){
            this.isPick = true;
        }
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