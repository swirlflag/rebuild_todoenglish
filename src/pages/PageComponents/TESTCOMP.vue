<template>
    <div class="test-input">
        <input  type="text"
                ref="ref_input"
                @input="onChange"
                v-model="myValue"
        >
    </div>
</template>

<script>
export default {
    name : 'TEST',
    model : {
        prop :'value',
        event : 'change',
    },
    props: {
        value : String
    },
    watch : {
        'value'() {
            this.myValue = this.value;
        },
    },
    methods : {
        onChange() {
            const changeValue = this.$refs.ref_input.value;
            this.$emit('change' , changeValue);

        }
    },
    data() {
        console.log(this.model);
        return {
            myValue : '시작 값',
        }
    },
    mounted() {
        // console.log('m');
        console.log(this.value);
    },
}
</script>

<style lang="scss" scoped>
.test-input {
    background: #d3d;
}
</style>