<!--
    USE PREVIEW
        <InputToggleSwitch  v-model="controls.value"
                            @change="controls.onChange"
        />

    METHODS
        ref.check();
        ref.uncheck();
        ref.toggle();

    MEMO :
-->

<template>
    <label class="input--toggle-switch"
            :class="{'st-checked' : modelData.checked}"
    >
        <input type="checkbox" v-model="modelData.checked">
        <span class="input--toggle-switch__plate">
            <span class="input--toggle-switch__point"></span>
        </span>
    </label>
</template>

<script>
export default {
    name : 'InputToggleSwitch',
    model : {
        prop : 'modelValue',
        event : 'modelEvent',
    },
    props : {
        modelValue : Boolean,
        checked : Boolean,
    },
    data() {
        return {
            modelData : {
                checked : false
            }
        }
    },
    watch : {
        "modelValue"() {
            this.watchModelValue();
        },
        "checked"() {
            this.watchChecked();
        },
        "modelData" :{
            deep : true,
            handler() {
                this.watchModelData();
            }
        },
    },
    methods : {
        watchModelValue() {
            this.modelData.checked = this.modelValue;
        },
        watchChecked() {
            this.modelData.checked = this.checked;
        },
        watchModelData() {
            this.$emit('change' , this.modelData)
            this.$emit('modelEvent' , this.modelData.checked);
        },
        check() {
            this.modelData.checked = true;
        },
        uncheck() {
            this.modelData.checked = false;
        },
        toggle() {
            this.modelData.checked = !this.modelData.checked;
        }
    }

}
</script>



<style lang="scss" scoped>
$size : 28px;
$inner : 3px;
$radius : 9999px;
$shadow : $size*0.1;

.input--toggle-switch {
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    border-radius: $radius;
    cursor: pointer;
    background-color: rgb(194, 194, 194);

    @include hover {
        .input--toggle-switch__point {
            // background: $COLOR_mint_1;
        }
    }

    &.st-checked {
        background-color: $COLOR_mint_1;

        .input--toggle-switch__point {
            transform:translate3d($size*0.76,0,0);
            box-shadow: -$shadow $shadow #{$shadow*0.5} 0px rgba(0,0,0,0.2);
        }
    }

    > input[type=checkbox] {
        display: none;
        pointer-events: none;
    }

    .input--toggle-switch__plate  {
        display: inline-block;
        position: relative;
        width: 100%; height: 100%;
        width: $size * 1.76; height: $size;
        background-color: inherit;
        transition: background-color 300ms ease;
        box-shadow: inset 0 $shadow $shadow 0 rgba(0,0,0,0.15);
        overflow: hidden;

        border-radius: $radius;
        vertical-align: top;

        .input--toggle-switch__point  {
            display: inline-block;
            position: absolute;
            background-color: rgb(243, 243, 243);
            top: $inner; left: $inner;
            border-radius: $radius;
            width: #{$size - $inner*2}; height: #{$size - $inner*2};
            border: 1px solid #fff;
            box-sizing: border-box;

            box-shadow: $shadow $shadow #{$shadow*0.5} 0px rgba(0,0,0,0.2);
            transition: transform 300ms $EASE_outCubic, box-shadow 300ms ease ,background-color 250ms ease;

            background: linear-gradient(144deg, rgba(240,240,240,1) 0%, rgba(240,240,240,1) 37%, rgba(255,255,255,1) 100%);
            will-change: transform , box-shadow;
        }
    }

}


</style>