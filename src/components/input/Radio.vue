<!--

    USE PREVIEW :
        <Radio value="myValue"
                    name="myName"
                    @change="myChange"
                    v-model="myModelValue"  ||  checked
        >
            myText
        </Radio>

    METHODS :
        ref.check()

    MEMO :
        이 컴포넌트를 단일로 구성해 묶음을 직접 구성한후 $emit('change')호출시 현재 input의 value 정보만 받을수 있습니다.
        나열한 라디오들의 index, before와 같은 요소가 필요하다면 RadioCollection을 사용해 주세요.

-->
<template>
    <label  class="input--radio"
            :class="`${isChecked ? 'st-checked' : ''}${styleType}`"
    >
        <input  type="radio"
                ref="ref_radio"
                :data-checked="isChecked"
                :value="value"
                :name="name"
                @change="onChange"
                @click="onClick"
        >
        <span class="radio--mark"></span>

        <div class="radio--label">
            <slot></slot>
        </div>

    </label>
</template>

<script>
export default {
    name : 'Radio',
    model: {
        prop: 'modelValue',
        event: 'modelEvent'
    },

    props : {
        modelValue : null,

        name : {
            type : String,
            required : true
        },

        value : {
            type : null,
            required : true,
        },

        checked : Boolean,

        index : Number,
        type : String,

    },

    data() {
        return {
            isChecked : false,
            syncObserver : null,

            ignoreModel : false,
            ignoreChange : false,

            modelData : {
                value : this.value,
                index : 0,
            },
        }
    },
    watch : {
        'modelValue'(){
            this.watchModelValue();
        },
        'checked'() {
            this.watchChecked();
        },

    },
    computed : {
        styleType() {
            return this.type ? ` type--${this.type}` : 'type--default';
        }
    },
    methods : {

        check() {
            this.detectSiblingBeforeUnselect();
            this.isChecked = true;
            this.emitEvent();
        },
        uncheck() {
            this.isChecked = false;
        },

        watchModelValue() {
            if(!this.ignoreModel){
                if(this.value === this.modelValue){
                    this.check();
                }else {
                    this.uncheck();
                }
            }
            this.ignoreModel = false;
        },

        watchChecked() {
            if(this.checked){
                this.check();
            }
        },

        onClick() {
            if(this.isChecked){
                return
            }

            this.check();
            this.ignoreChange = true;
        },

        onChange() {
            // console.log(1);
            // if(this.ignoreChange){
            //     this.ignoreChange = false;
            //     return;
            // }

            // this.check();
        },

        emitEvent() {
            this.ignoreModel = true;
            this.$emit('change' , this.value , this.index);
            this.$emit('modelEvent' , this.value);
        },

    // 같은 name으로 묶여있고, 직전에 선택되어있던 항목의 data-checked를 해제해주는 기능
        detectSiblingBeforeUnselect() {
            const before = document.querySelector(`input[type=radio][name=${this.name}][data-checked=true]`);
            if(before){
                before.dataset.checked = false;
            }
        },

    // data-checked 가 false가 될때 반응해 컴포넌트 내의 isChecked를 동기화 시켜주는 옵저버
        bindSyncObserver() {
            this.$refs.ref_radio.dataset.checked = this.isChecked;

            this.syncObserver = new MutationObserver((mutations) => {
                mutations.forEach(({ target, attributeName }) => {
                    if(attributeName === 'data-checked'){
                        this.isChecked = target.dataset.checked === 'true';
                    }
                });
            });

            this.syncObserver.observe(this.$refs.ref_radio, { attributes: true });
        },

    },

    mounted() {

        if(this.checked || this.modelValue === this.value){
            // this.ignoreModel = true;
            this.isChecked = true;
        }

        this.bindSyncObserver();

    },
    beforeDestroy() {
        this.syncObserver.disconnect();
    }
}


</script>

<style scoped lang="scss">
.input--radio {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 200ms ease;
    position: relative;
    box-sizing: border-box;

    input {
        display: none;
    }

    .radio--mark {
        display: inline-block;
        position: relative;
        box-sizing: border-box;
    }

    &.type--default {
        .radio--mark {
            width: 22px; height: 22px;
            border-radius: 9999px;
            margin-right: 8px;
            border: 2px solid $COLOR_linegray;
            position: relative;
            background-color: #F5F5F7;
            transition: border 200ms ease, background-color 200ms ease;

            &::before {
                content: '';
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                background: #fff;
                transform : scale(1);
                transform-origin: center center;
                border-radius: inherit;
                opacity: 0;
                transition: transform 450ms $EASE_outBack2;
            }
        }
        @include hover {
            color: $COLOR_pink_1;
            .radio--mark {
                border-color : $COLOR_pink_1;
            }
        }
        &.st-checked {
            .radio--mark {
                background-color: $COLOR_pink_1;
                border-color : $COLOR_pink_1;
                &::before {
                    transform : scale(0.4) ;
                    opacity: 1;
                }
            }
        }
    }


    &.type--flat {

        $flat-thick : 8px;
        $flat-radius : 10px;
        $color-default : rgb(182, 190, 182);

        position: relative;
        margin-bottom: #{$flat-thick} !important;
        color: rgb(70, 95, 79);

        &::before {
            content: '';
            position: absolute;
            width: 100%; height: 100%;
            bottom: #{-$flat-thick}; left: 0;
            border-radius: $flat-radius;
            background-color: $color-default;
            transition: background-color 100ms ease;
            border-bottom: 1px solid rgba(255,255,255,0.7);
            box-shadow: 0 5px 5px 0 rgba(0,0,0,0.15);
        }

        .radio--mark {
            display: none;
        }

        .radio--label {
            padding: 14px 40px;
            width: auto; height: auto;
            top: 0; left: 0;
            position: relative;
            font-weight: 700;
            transition: transform 280ms $EASE_outBack3 40ms, background-color 150ms ease;

            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: $flat-radius;
            background-color: rgba(239,239,239,1);
            background-color: rgba(255,255,255,1);
            border: 1px solid $color-default;
        }

        @include hover {

        }

        &.st-checked {
            &::before {
                background-color: rgb(30, 155, 78);
            }
            .radio--label {
                color: #fff;
                border-top: 1px solid rgba(255,255,255,0.8);
                border-left: 1px solid rgba(200,200,200,0.1);
                border-right: 1px solid rgba(200,200,200,0.1);
                border-bottom: 1px solid transparent;
                background: rgba(51,205,112,1);
                transition: transform 160ms $EASE_outBack3 ,background-color 150ms ease;
                transform: translateY($flat-thick - 3px);
            }
        }
    }

}

















.radio--mark {

    .type--flat &{
        width: 100%; height: 100%;
        position: absolute;
        border: 1px solid rgb(51,205,112);
    }

}


.type--default {
    

    .radio--mark {

    }
}

</style>