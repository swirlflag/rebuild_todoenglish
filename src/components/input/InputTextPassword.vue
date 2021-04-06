<template>
    <InputText  class="type--password"
                type="password"
                :placeholder="placeholder"
                :value="modelData.value"
                :mark="mark"
                :focus="focus"
                @change="onChange"
                @focus="onFocus"
                @blur="onBlur"
    />
</template>

<script>
import { validatePassword } from '@/utils';
import InputText from '@/components/input/InputText.vue';
export default {
    name : "InputTextPassword",
    components : {
        InputText,
    },
    model : {
        prop : 'modelValue',
        event : 'modelEvent',
    },
    props : {
        modelValue  : [String],
        value  : [String],
        mark : Boolean,
        focus : Boolean,
        placeholder : String,
    },
    data() {

        const value = this.value || this.modelValue || '';
        const { valid , errorState } = validatePassword(value);

        return {
            modelData : {
                value,
                valid ,
                errorState ,
            }
        }
    },

    watch : {
        'value'() {
            this.watchValue();
        },
        'modelValue'() {
            this.watchModelValue();
        },
        'modelData'() {
            this.watchModelData();
        },

    },
    methods : {
        onFocus() {
            this.$emit('focus');
        },
        onBlur() {
            this.$emit('blur');
        },
        watchValue() {
            this.recordModelData(this.value)
        },
        watchModelValue() {
            this.recordModelData(this.modelValue)
        },

        onChange(payload) {
            const { value } = payload;

            this.recordModelData(value);
        },

        recordModelData(value) {
            if(this.modelData.value === value){
                return;
            }

            const { valid , errorState } = validatePassword(value);
            // errorState
            // 1 : 비밀번호가 6자 이상 20자 이하가 아닐때
            // 2 : 영문 혹은 숫자가 없을때
            // 3 : 공백 등 허용 가능한 문자셋을 이탈할떄

            const recordData = {
                ...this.modelData,
                value,
                valid,
                errorState,
            };

            this.modelData = recordData;

        },
        watchModelData(){
            this.$emit('change' , this.modelData);
            this.$emit('modelEvent' , this.modelData.value);
        },
    },
    created() {
        // const value = this.value || this.modelValue || null;
        // value && this.recordModelData(value);
    },
}
</script>

<style>

</style>