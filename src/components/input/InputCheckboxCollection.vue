<template>
    <div class="default--checkbox-collection"

    >
        <!-- {{list}} -->

        <template v-for="(item,idx) in list">
            <InputCheckbox
                :key="`${item.text}-${idx}`"
                :text="item.text"
            />
        </template>

    </div>
</template>

<script>
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
        modelValue : Boolean,
        list : {
            type : Array,
            require : true,
        },
    },

    methods : {

    },
    mounted () {
        console.log(this.list);
    },
}
</script>

<style scoped lang="scss">

</style>