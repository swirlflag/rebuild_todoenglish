<!--
    USE PREVIEW :
        <InputCheckbox      text="myText"
                            v-model="modelValue"
        />

    METHODS :
        ref.check();
        ref.uncheck();

    MEMO :
        최초 mount시 checked 속성이 v-model보다 우선시 됩니다.
        checked가 true이고 v-model이 false라면 실행시 내부 값을 true로 만들고 연동된 v-model값에도 변이를 줍니다.

        v-model은 양방향, :checked를 단방향으로 사용합니다.

-->

<template>

    <label class="input--checkbox" :class="{'st-checked' : modelData.checked}">
        <input type="checkbox" v-model="modelData.checked">

        <span class="checkbox--icon"></span>

        <div class="checkbox--label">
            {{ text }}
        </div>
    </label>

</template>

<script>
export default {
    name : 'InputCheckbox',
    props : {
        modelValue : Boolean,
        checked : Boolean,

        text : [String,Number],
        index : Number,
    },
    model: {
        prop: 'modelValue',
        event: 'modelEvent'
    },
    watch : {
        'modelValue'(){
            this.watchModelValue();
        },
        'checked'() {
            this.watchChecked();
        },
        'modelData.checked'(){
            this.watchModelDataChecked();
        }
    },
    data () {
        const checked = this.modelValue === undefined ? false : this.modelValue;
        const index = this.index === undefined ? null : this.index;

        return {
            modelData : {
                checked,
                index,
            },
        }
    },
    methods : {
        watchModelValue() {
            if(this.modelValue !== this.modelData.checked){
                this.modelData.checked = this.modelValue;
            }
        },
        watchChecked() {
            if(this.checked !== this.modelData.checked){
                this.modelData.checked = this.checked;
            }
        },
        watchModelDataChecked() {
            this.$emit('change' , this.modelData);
            this.$emit('modelEvent' , this.modelData.checked);
        },

        check() {
            this.modelData.checked = true;
        },
        uncheck() {
            this.modelData.checked = false;
        },

    },

    created () {
        if(this.checked){
            this.check();
        }
    },

}
</script>

<style lang="scss" scoped>
@keyframes line {
    0% {
        transform: scaleX(0)
    }
    100% {
        transform: scaleX(1)
    }
}
.input--checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 200ms ease;

    input {
        display: none;
    }
}

.checkbox--icon {
    width: 22px; height: 21px;
    flex :0 0 22px;
    border-radius: 4px;
    box-sizing: border-box;
    border: 2px solid $COLOR_linegray;
    background-color: #F5F5F7;
    margin-right: 10px;

    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    display: inline-block;
    transition:  background-color 200ms $EASE_outCubic, border 200ms ease;

    .st-checked & {
        background-color: $COLOR_pink_1;
        border-color: $COLOR_pink_1;
    }

    &::before {
        box-sizing: border-box;
        content: '';
        width: 100%; height: 100%;
        position: absolute;
        top: 0; left: 0;
        background-image: url('~@/assets/icon/icon_checked_white.svg');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        transform : translate3d(0,110%,0);
        transition:  transform 300ms $EASE_outCubic;

        .st-checked & {
            transform : translate3d(0,0,0);
        }
    }
}

.checkbox--label {

}

.input--checkbox{
   @include hover {

       color: $COLOR_pink_1;

       .checkbox--icon {
           border-color: $COLOR_pink_1;
       }

   }
}
</style>