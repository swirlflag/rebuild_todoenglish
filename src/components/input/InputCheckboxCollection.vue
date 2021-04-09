<!--
    USE PREVIEW :
        <InputCheckboxCollection    v-model || :list="[
                                        {
                                            text : 'itemText',
                                            value : itemValue,
                                            checked : true,
                                        }
                                    ]"
                                    name="myName"
                                    direction="row"
                                    @change="myChange"

        />

    METHODS :

    MEMO :
        props list와 v-model로 받는 모양은 완전히 같으며 둘중 하나만 설정하면 됩니다.
        @change로 받는 인자는 v-model,list의 형태와 같은 객체를 받습니다.

-->

<template>
    <div     class="input--checkbox-collection"
            :class="`direction--${computedDirection}`"

    >
        <template v-for="(item,idx) in allList">

            <InputCheckbox  :key="`${idx}-${item.text}`"
                            :text="item.text"
                            :index="idx"
                            :name="data_name"
                            v-model="allList[idx].checked"
                            @change="onInputChange"
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

            allList      : [],

            modelData : {
                allList : [],
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
        "modelValue" : {
            deep : true,
            handler() {
                this.ignoreModel = true;
                this.allList = deepCopy(this.modelValue);
            }
        },
        "list" : {
            deep : true,
            handler() {
                this.ignoreModel = true;
                this.allList = deepCopy(this.list);
            }
        },

        "allList" : {
            deep : true,
            handler() {
                if(!this.ignoreModel){
                    this.$emit('modelEvent' , this.allList);
                }
                this.ignoreModel = false;
            },
        },

        "modelData"() {
            this.$emit('change' , this.modelData);
        },
    },
    methods : {
        toggle(index) {
            this.modifyTarget(index, !this.allList[index].checked);
        },
        check(index) {
            this.modifyTarget(index,true);
        },
        uncheck(index) {
            this.modifyTarget(index,false);
        },

        modifyTarget(index, willCheck) {

            if(index === undefined){
                return
            }

            if(this.allList[index].checked === willCheck){
                return
            }

            this.allList[index].checked = willCheck;

            const current = this.allList[index];

            this.modelData = {
                allList : [...this.allList],
                index : index,
                checked : willCheck,
                value : current.value,
                text : current.text,
            };

        },

        onInputChange(payload) {
            const { value , index } = payload;
            this.modifyTarget(index,value);
        },

        createAllList() {
            const list = this.modelValue || this.list || null;
            this.allList = deepCopy(list);
        },
    },

    created() {
        this.createAllList();
    },

    mounted () {
        // console.log(this.list, this.modelValue);
    },
}
</script>

<style scoped lang="scss">

$colGap : 5px;
$rowGap : 10px;

.input--checkbox-collection {
    // line-height: 1em;
    display :flex;
    flex-direction: column;

    &.direction--row {
        flex-direction: row;
        flex-wrap: wrap;
        > .input--checkbox {
            margin: $colGap $rowGap;
        }
    }
    &.direction--col {
        > .input--checkbox {
            margin: $colGap  0;
        }
        flex-direction: column;
    }

}
</style>