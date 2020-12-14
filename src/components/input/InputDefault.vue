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
                    @input="onInput"
                    @focus="() => {isFocus = true}"
                    @blur="() => {isFocus = false}"
                    ref="ref_input"
            />

        </div>
    </div>
</template>

<script>


export default {
    name : 'DefaultText',
    props : {
        type : String,
        placeholder : String,

        mark : Boolean,
    },
    data() {
        const inputType = this.type || 'text';

        return {
            inputType,

            isFocus : false,
            isMark : false,

            value : '',
        }
    },
    methods : {
        onInput() {
            this.$emit('input' , this.value);
        },
    }
}
</script>

<style lang="scss" scoped>

$padding  :20px;
$radius : 8px;

.input--default {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    @include hardSelect {
        letter-spacing: $SIZE_letterspacing_low;
    }

}

.input__inner {
    width: 100%;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    border-radius: $radius;

    .input__placeholder {
        position: absolute;
        width: 100%; height: 100%;
        padding: $padding;
        padding-left : $padding + 2px;
        pointer-events: none;
        box-sizing: border-box;
        color: #999;
        opacity: 0;
        transform : translate3d(20px,0,0);
        transition : transform 180ms $EASE_outCubic , opacity 150ms $EASE_outCubic , color 300ms ease;
        &.st-show {
            opacity: 1;
            transform : translate3d(0,0,0);
        }
    }

    .input__border {
        // border: 1px solid rgba(52,45,81,0.1);
        border: 2px solid transparent;
        width: 100%; height: 100%;
        position: absolute;
        pointer-events: none;
        box-sizing: border-box;
        border-radius: inherit;
        transition : border-color 180ms ease , transform 0ms ease 300ms;
        transform : scale(1.05) ;
    }

    input {
        border-radius: inherit;
        background-color: #F5F5F7;
        border-radius: 8px;
        outline: none;
        padding: $padding;
        width: 100%;
        border: none;
        box-sizing: border-box;
        border: 1px solid rgba(52,45,81,0.1);
        transition : color 300ms ease;

        &:focus {
            border: 1px solid rgba(52,45,81,0);
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