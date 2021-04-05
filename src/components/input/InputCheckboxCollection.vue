<!--
    USE PREVIEW :
        <InputCheckboxCollection    v-model || :list="[
                                        {
                                            text : 'itemText',
                                            value : itemValue,
                                            checked : true,
                                        }
                                    ]"
                                    @change="myChange"
                                    name="myName"
                                    direction="row"
                                    name="input-checkbox-collection"

        />

    METHODS :

    MEMO :
        props list와 v-model로 받는 모양은 완전히 같으며 둘중 하나만 설정하면 됩니다.

-->

<template>
    <div     class="default--checkbox-collection"
            :class="`direction--${computedDirection}`"

    >
        <template v-for="(item,idx) in renderList">

            <InputCheckbox
                :key="`${idx}-${item.text}`"
                :text="item.text"
                v-model="renderList[idx].checked"
                @change="onInputChange"
                :index="idx"
                :name="data_name"
            />
        </template>

    </div>
</template>

<script>
import { deepCopy } from '@/utils';
import InputCheckbox from '@/components/input/InputCheckbox.vue';
export default {
    name : 'InputCheckboxCollection',
    components : {
        InputCheckbox
    },
    model : {
        prop : 'modelValue',
        event : 'modelEvent',
    },
    props: {
        modelValue : Array,

        list : Array,
        name : String,
        direction : String,
    },
    data() {
        return {
            data_name : this.name || 'name-radio-' + Math.random().toString().split('.')[1],

            renderList      : [],

            modelData : {
                renderList : [],
                index : 0,
                checked : false,
                value : '',
                text : '',
            },

            ignoreModel     : false,
    }
    },
    computed : {
        computedDirection () {

            switch (this.direction) {
                case ('col') :
                case('vertical') :{
                    return 'col';
                }
                case ('row') :
                case ('horizontal') :
                default : {
                    return 'row';
                }
            }
        },
    },
    watch : {
        modelValue : {
            deep : true,
            handler() {
                this.ignoreModel = true;
                this.renderList = deepCopy(this.modelValue);
            }
        },
        list : {
            deep : true,
            handler() {
                this.ignoreModel = true;
                this.renderList = deepCopy(this.list);
            }
        },

        renderList : {
            deep : true,
            handler() {
                if(!this.ignoreModel){
                    this.$emit('modelEvent' , this.renderList);
                }
                this.ignoreModel = false;
            },
        },
    },
    methods : {
        toggle(index) {
            this.modifyTarget(index);
        },
        check(index) {
            this.modifyTarget(index,true);
        },
        uncheck(index) {
            this.modifyTarget(index,false);
        },

        modifyTarget(index, willCheck) {


            console.log('modify');
            if(index === undefined){
                return
            }

            // const currentCheck = this.renderList[index].checked;

            // if(currentCheck === willCheck) {
            //     return;
            // }

            this.renderList[index].checked = willCheck;

            const current = this.renderList[index];

            this.modelData = {
                renderList : [...this.renderList],
                index : index,
                checked : willCheck,
                value : current.value,
                text : current.text,
            };

            this.$emit('change' , this.modelData);
        },

        onInputChange(isChecked,index) {
            this.modifyTarget(index,isChecked);
        },

        createrenderList() {
            const list = this.modelValue || this.list || null;
            this.renderList = deepCopy(list)
        },
    },

    created() {
        this.createrenderList();
    },

    mounted () {
        // console.log(this.list, this.modelValue);
    },
}
</script>

<style scoped lang="scss">

$colGap : 5px;
$rowGap : 10px;

.default--checkbox-collection {
    // line-height: 1em;
    display :flex;
    flex-direction: column;

    &.direction--row {
        flex-direction: row;
        flex-wrap: wrap;
        > .default--checkbox {
            margin: $colGap $rowGap;
        }
    }
    &.direction--col {
        > .default--checkbox {
            margin: $colGap  0;
        }
        flex-direction: column;
    }

}
</style>