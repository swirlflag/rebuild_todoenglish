<template>
    <div    class="input--default" :class="{'st-focus' : isFocus , 'st-mark' : mark}"

    >
        <div class="input__inner">

            <span class="input__placeholder" :class="{'st-show' : !value}" v-if="placeholder">
                {{ placeholder }}
            </span>

            <span class="input__border"></span>

            <input  :type="inputType"
                    :placeholder="placeholder"
                    v-model="value"
                    @focus="() => {isFocus = true}"
                    @blur="() => {isFocus = false}"
                    ref="ref_input"
            />

        </div>
    </div>
</template>

<script>
import { validateEmail } from '@/utils';


export default {
    name : 'DefaultText',
    props : {
        type : String,
        placeholder : String,

        mark : Boolean,
    },
    model : {
        prop : 'stringData',
        event : 'change',
    },
    data() {
        const inputType = this.type || 'text';

        return {
            inputType,

            isFocus : false,
            isMark : false,

            value : null,
        }
    },
    watch : {
        "value"(){
            const payloads = [
                this.value,
            ];
            if(this.type === 'email'){
                payloads.push(validateEmail(this.value));
            }
            this.$emit('change' , ...payloads)
        }
    },
}
</script>

<style lang="scss" scoped>

$PC_padding     : 18px 18px;
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
        pointer-events: none;
        box-sizing: border-box;
        background-color : transparent;
        // line-height: 1em;
        color: $COLOR_gray;
        opacity: 0;
        transform : translate3d(20px,0,0);
        vertical-align: top;
        transition : transform 180ms $EASE_outCubic , opacity 150ms $EASE_outCubic , color 300ms ease;

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
    }

    input {
        border-radius: inherit;
        background-color:$COLOR_lightgray_2;
        border-radius: 8px;
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
        .input__border {
            border: 2px solid $COLOR_mint_1;
            transform : scale(1) ;
            transition : border-color 180ms ease , transform 500ms $EASE_outCubic;
        }

    }

    .st-mark & {
        .input__placeholder , input{
            color: $COLOR_pink_1;
        }
        .input__border {
            transform : scale(1) ;
            border: 2px solid $COLOR_pink_1;
            transition : border-color 180ms ease , transform 500ms $EASE_outCubic;
        }
        input::selection {
            background-color: $COLOR_pink_1;
        }
    }

}
</style>