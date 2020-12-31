<template>
    <label class="default--radio" :class="{'st-checked' : isPick}">
        <input type="radio" v-model="valueData" :value="value" :name="name" @change="onChange" ref="ref_radio">

        <span class="radio--icon"></span>
        <div class="radio--label">
            {{ text }}
        </div>
    </label>
</template>

<script>
export default {
    name : 'RadioDefault',
    props : {
        text : String,
        name : String,
        checked : Boolean,
        value : null,
    },
    model: {
        prop: 'pickValue',
        event: 'change'
    },
    data() {
        return {
            valueData  : this.value,
            isPick : false,
        }
    },
    watch : {
        '$attrs.pickValue'(now){
            this.isPick = this.valueData === now;
        }
    },
    methods : {
        onChange(){
            this.$emit('change' , this.valueData);
        },
    },
    mounted() {
        if(this.checked){
            this.$refs.ref_radio.checked = true;
        }

        if(this.$refs.ref_radio.checked){
            this.isPick = true;
        }
    }
}
</script>

<style scoped lang="scss">
.default--radio {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: color 200ms ease;

    input {
        display: none;
    }

    @include hover {

        color: $COLOR_pink_1;
        .radio--icon {
            border-color : $COLOR_pink_1;
        }
    }
}

.radio--icon {
    display: inline-block;
    width: 22px; height: 22px;
    border-radius: 9999px;
    position: relative;
    box-sizing: border-box;
    margin-right: 8px;
    border: 2px solid $COLOR_linegray;
    background-color: #F5F5F7;
    transition: border 200ms ease, background-color 200ms ease;

    .st-checked & {
        background-color: $COLOR_pink_1;
        border-color : $COLOR_pink_1;
    }

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

        .st-checked & {
            transform : scale(0.4) ;
            opacity: 1;
        }
    }
}

</style>