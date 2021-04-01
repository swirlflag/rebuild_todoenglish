<!--

    USE PREVIEW :
        <InputRadioCollection   v-model="myModelValue"
                                name="myName"
                                @change="myChange"
                                direction="row"
                                :list="[
                                    {
                                        text : 'itemText',
                                        value : itemValue,
                                    }
                                ]"
        />

    METHODS :
        ref.select(0)                   // Number : index
        ref.select(my option')          // String : index

    MEMO :

-->

<template>
    <div    class="default--radio-collection"
            :class="`direction--${computedDirection}`"
    >

        <template v-for="(item,idx) in list" >

            <InputRadio     :key="idx"
                            :value="item.value"
                            :name="name"
                            v-model="localVmodel"
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

        return {
            data_name : this.name || Math.random().toString(),

            modelData: {
                before  : {},
                index   : 0,
                value   : '',
            },

            localVmodel : this.modelValue || '',

            listValueMap : this.list.map(c => c.value),

            ignoreModel : false,

        }
    },
    computed : {
        computedDirection () {
            switch (this.direction) {
                case ('col') :
                case('vertical') :{
                    return '';
                }
                case ('row') :
                case ('horizontal') :
                default : {
                    return 'row';
                }
            }
        },
    },
    watch: {
        'modelValue'() {
            this.watchModelValue();
        },
        'localVmodel'() {
            this.watchVmodel();
        },
    },
    methods : {
        watchModelValue() {
            if(this.localVmodel !== this.modelValue){
                this.localVmodel = this.modelValue;
            }
        },
        watchVmodel() {
            if(!this.ignoreModel){
                const index = this.listValueMap.indexOf(this.localVmodel);
                this.selectLogic(index);
            }
            this.ignoreModel = false;
        },

        select(index) {
            this.ignoreModel = true;
            this.selectLogic(index);
        },

        selectLogic(index) {
            this.recordModelData(index);

            this.$emit('change' , this.modelData);
            if(index > -1 && index < this.list.length){
                this.$emit('modelEvent' , this.modelData.value);
            }
        },

        recordModelData(index) {
            const before = {...this.modelData};

            delete before.before;

            let value = null;

            if(index > -1 && index < this.list.length){
                value = this.list[index].value;
            }

            this.modelData = {
                before,
                value,
                index,
            }

        },

    },
    mounted() {

    },
}
</script>

<style lang="scss" scoped>

.default--radio-collection {
    line-height: $SIZE_lineheight_high3;
    display :flex;
    flex-direction: column;

    &.direction--row {
        flex-direction: row;
        flex-wrap: wrap;
        > .default--radio {
            margin: 0 10px;
        }
    }
    &.direction--col {
        flex-direction: column;
    }

}
</style>