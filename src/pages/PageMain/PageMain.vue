<template>
    <div>
        <!-- haha main -->
    </div>
</template>

<script>
export default {
    name : 'PageMain',
    mounted () {
        this.$store.commit('useClaerGnb');
        this.$store.commit('unuseWhiteGnb');
    }
}
</script>

<style>

</style>