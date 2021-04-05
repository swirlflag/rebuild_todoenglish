<template>
    <div>
        <InputText
            v-model="modelData.value"
            @change="onChange"
            type="email"
        />
    </div>
</template>

<script>
import { validateEmail } from '@/utils';
import InputText from '@/components/input/InputText.vue';
export default {
    components : {
        InputText,
    },
    name : "InputTextEmail",
    model : {
        prop: 'modelValue',
        event : 'modelEvent',
    },
    props : {
        value: String,
        modelValue : String,
    },
    data() {

        const value = this.value || this.modelValue || '';
        const valid = false;

        return {
            modelData : {
                value,
                valid,
            }
        }

    },
    watch : {
        'value'(){
            this.watchValue();
        },
        'modelValue'() {
            this.watchModelValue();
        },
        'modelData'(){
            this.watchModelData();
        },
    },
    methods : {
        onChange(payload) {
            this.recordModelData(payload.value);
        },
        watchValue() {
            this.recordModelData(this.value)
        },
        watchModelValue() {
            this.recordModelData(this.modelValue);
        },

        recordModelData(value) {
            const recordData = {...this.modelData};
            if(this.modelData.value !== value){
                recordData.value = value;
                recordData.valid = validateEmail(value);
            }
            this.modelData = recordData;
        },

        watchModelData() {
            this.$emit('change' , this.modelData);
            this.$emit('modelEvent' , this.modelData.value);
        },

    },

}
</script>

<style>

</style>