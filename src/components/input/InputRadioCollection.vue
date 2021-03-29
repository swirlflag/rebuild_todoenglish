<template>
    <div    class="default--radio-collection"
            :class="`type--${computedDirection}`"
    >

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
        direction : String, // row, col, vertical, horizontal
    },
    model: {
        prop: 'modelValue',
        event: 'modelEvent'
    },

    data() {

        console.log(this.direction);

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
    computed : {
        computedDirection() {
            if(this.direction === 'row' || this.direction === 'vertical'){
                return 'row'
            }else {
                return 'col'
            }
        }
    },
    watch: {
        'modelValue'() {

        },
        'data_modelValue'() {

        },
    },
    methods : {
        onChange(value,index) {
            this.recordModelData(index);
            this.$emit('change' , this.modelData);
            this.$emit('modelEvent' , this.modelData.value);
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

        },
    },
    mounted() {
        console.log(this.modelValue);
    },
}
</script>

<style lang="scss" scoped>

.default--radio-collection {
    line-height: $SIZE_lineheight_high3;
    display :flex;
    flex-direction: column;

    &.type--row {
        flex-direction: row;
        flex-wrap: wrap;
        > .default--radio {
            margin: 0 10px;
        }
    }
    &.type--col {
        flex-direction: column;
    }

}
</style>