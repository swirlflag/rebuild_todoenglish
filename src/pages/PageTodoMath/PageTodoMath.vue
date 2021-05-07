<template>

    <div class="pagemission page--todomath layout">

        <!-- <PageTodoMathKR/> -->
        {{ tempContents.title[region] }}

    </div>

</template>

<script>
const tempContents  = {
    title : {
        ko : "안녕하세요!",
        en : "Hello!",
        jp : "こんにちは!",
    },
};


export default {
    data() {
        return {
            tempContents
        }
    },
    computed : {
        region(){
            return this.$detect.region
            // return 'en'
        }
    }
}
</script>



<style lang="scss" scoped>
.page--todomath {
    border: 1px solid #d3d;
}
</style>