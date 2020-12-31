<template>

    <label class="default--checkbox" :class="{'st-checked' : isCheck}">
        <input type="checkbox" v-model="isCheck" @change="onChange">

        <div class="checkbox--icon">

        </div>
        <div class="checkbox--label">
            {{ text }}
        </div>
    </label>

</template>

<script>
export default {
    name : 'CheckboxDeafult',
    props : {
        text    : String,
        checked : null,
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    components : {
    },
    data () {
        return {
            isCheck : !!this.checked || false ,
        }
    },
    methods : {
        onChange() {
            this.$emit('change' , this.isCheck)
        },
    }

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
.default--checkbox {
    display: flex;
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
    margin-right: 20px;

    position: relative;
    box-sizing: border-box;
    overflow: hidden;
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

.default--checkbox{
   @include hover {

       color: $COLOR_pink_1;

       .checkbox--icon {
           border-color: $COLOR_pink_1;
       }

   }
}
</style>