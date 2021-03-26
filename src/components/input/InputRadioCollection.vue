<template>
    <div class="default--radio-collection">

        <template v-for="(item,idx) in list" >

            <InputRadio :key="idx"
                        :value="item.value"
                        v-model="data_modelValue"
                        :name="name"
                        @change="onChange"
                        :index="idx"
            >
                {{ item.text }}
            </InputRadio>

        </template>

    </div>
</template>

<script>
import InputRadio from '@/components/input/InputRadio.vue';

export default {
    name : 'InputRadioCollection',
    components : {
        InputRadio,
    },
    props : {
        modelValue : null,

        list : {
            // required : true,
            type: Array,
        },
        name : String,
        direction : String,
    },
    model: {
        prop: 'modelValue',
        event: 'modelEvent'
    },
    watch: {
        'data_name'() {

        }
    },
    data() {
        return {
            data_name : this.name || Math.random().toString(),
            data_modelValue : this.modelValue || 'test vmodel',

            modelData: {
                before : {},
                index: 0,
                value : '',
            },
        }
    },
    methods : {
        onChange(value,index) {
            this.recordModelData(index);
        },
        recordModelData(index) {
            const currentItem = this.list[index];

            const before = this.modelData;
            const { value } = currentItem;

            delete before.before;

            this.modelData = {
                before,
                value,
                index,
            }

            console.log(this.modelData);

            // console.log(currentItem);
        },
    },
    mounted() {
        console.log(this.list);
    },
}
</script>

<style>

</style>