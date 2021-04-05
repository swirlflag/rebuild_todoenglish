<!--
    USE PREVIEW
        <InputText      v-model="myValue"
                        placeholder="1번 v-model"
                        :mark="myValueValidate"
        />
-->

<template>
    <div    class="input--default" :class="{'st-focus' : isFocus , 'st-mark' : mark}"
            :style="propStyle"

    >
        <div class="input__inner">

            <span class="input__placeholder" :class="{'st-show' : !modelData.value}" v-if="placeholder">
                {{ placeholder }}
            </span>

            <span class="input__border"></span>

            <input  :type="inputType"
                    :placeholder="placeholder"
                    v-model="modelData.value"
                    @keydown="keydown"
                    @focus="() => {isFocus = true}"
                    @blur="() => {isFocus = false}"
            />

        </div>
    </div>
</template>

<script>

import { validateEmail } from '@/utils';
{validateEmail}

export default {
    name : 'InputText',
    props : {
        modelValue : [String,Number],
        value : [String,Number],

        type : String,
        placeholder : String,

        mark : Boolean,
        // style : [String,Object]
    },
    model : {
        prop : 'modelValue',
        event : 'modelEvent',
    },
    data() {
        const inputType = this.type || 'text';

        return {
            propStyle : this.style || null,
            inputType,

            isFocus : false,
            isMark : false,

            modelData : {
                value : this.value || this.modelValue || null,
            },
        }
    },
    watch : {
        "value"() {
            this.watchValue();
        },
        "modelValue"() {
            this.watchModelValue();
        },
        "modelData"(){
            this.watchModelData();
        },
    },
    methods : {
        keydown(e) {
            setTimeout(() => {this.recordModelData(e.target.value)},0);
        },
        watchValue () {
            this.recordModelData(this.value);
        },
        watchModelValue() {
            this.recordModelData(this.modelValue);
        },
        recordModelData(value) {
            const recordData = {...this.modelData};
            if(this.modelData.value !== value){
                recordData.value = value;
            }
            this.modelData = recordData;
        },

        watchModelData() {
            this.$emit('change' , this.modelData);
            if(this.modelValue !== this.modelData.value){
                this.$emit('modelEvent' , this.modelData.value);
            }
        },
    },
}
</script>

<style lang="scss" scoped>

$PC_padding     : 16px 18px;
$MO_padding     : 16px;

$PC_radius      : 8px;
$MO_radius      : 8px;

.input--default {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    line-height: inherit;
    @include hardSelect {
        letter-spacing: $SIZE_letterspacing_low;
    }

}

.input__inner {
    width: 100%;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    line-height: inherit;
    border-radius: $PC_radius;

    .input__placeholder {
        position: absolute;
        width: 100%; height: 100%;
        padding: $PC_padding;
        padding-left : $PC_padding + 2px;
        user-select: none;
        pointer-events: none;
        box-sizing: border-box;
        background-color : transparent;
        // line-height: 1em;
        color: $COLOR_gray;
        opacity: 0;
        // transform : translate3d(20px,0,0);
        transform : translate3d(0,-10%,0);
        vertical-align: top;
        transition : transform 180ms $EASE_outCubic , opacity 150ms $EASE_outCubic , color 300ms ease;
        white-space: nowrap;

        @include phone {
            padding: $MO_padding;
        }

        &.st-show {
            opacity: 1;
            transform : translate3d(0,0,0);
        }
    }

    .input__border {
        // border: 1px solid $COLOR_linegray;
        border: 2px solid transparent;
        width: 100%; height: 100%;
        position: absolute;
        pointer-events: none;
        box-sizing: border-box;
        border-radius: inherit;
        transition : border-color 180ms ease , transform 0ms ease 300ms;
        transform : scale(1.05) ;
        background-color:transparent ;
        box-shadow: 0 0 0px 3px transparent;

    }

    input {
        border-radius: inherit;
        background-color:$COLOR_lightgray_2;
        border-radius: $PC_radius;
        outline: none;
        padding: $PC_padding;
        width: 100%;
        border: none;
        box-sizing: border-box;
        border: 1px solid $COLOR_linegray;
        transition : color 300ms ease;
        line-height: inherit;
        transition: background-color 350ms ease;

        @include phone {
            border-radius: $MO_radius;
            padding: $MO_padding;
        }

        &:focus {
            // background-color: #;
            border: 1px solid rgba(52,45,81,0);
            // border: 3px solid #d3d;
        }

        &::placeholder {
            opacity: 0;
            font-size: 0;
            color : transparent;
            visibility: hidden;
        }
        &::selection {
            background-color: $COLOR_mint_1;
            color: #fff;
        }
    }

    .st-focus & {
        .input__placeholder , input{
            color: $COLOR_mint_1;
        }

        @keyframes waveFocus {
            0% {
                box-shadow: 0 0 0 0px $COLOR_mint_1;
            }
            30% {
                box-shadow: 0 0 0px 11px COLOR_mint_1(0);
            }
        }
        .input__border {
            border: 2px solid $COLOR_mint_1;
            transform : scale(1) ;
            transition : border-color 180ms ease , transform 500ms $EASE_outCubic;
            animation: waveFocus 4s $EASE_outExpo infinite 1s;
        }

    }

    .st-mark & {
        .input__placeholder , input{
            color: $COLOR_pink_1;
        }
        @keyframes waveMark {
            0% {
                box-shadow: 0 0 0 0px $COLOR_pink_1;
            }
            30% {
                box-shadow: 0 0 0px 11px COLOR_pink_1(0);
            }
        }
        .input__border {
            transform : scale(1) ;
            border: 2px solid $COLOR_pink_1;
            transition : border-color 180ms ease , transform 500ms $EASE_outCubic;
            animation: waveMark 4s $EASE_outExpo infinite 1s;
        }
        input::selection {
            background-color: $COLOR_pink_1;
        }
    }

}
</style>