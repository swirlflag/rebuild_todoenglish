<template>

    <nav id="plate--navigation" class="plate">

        <NavigationGnb

        />

    </nav>

</template>

<script>

import NavigationGnb    from '@/components/navigation/NavigationGnb.vue';
// import NavigationMenu   from '@/components/navigation/NavigationMenu.vue';

export default {
    name : 'PlateNavigation',
    components : { NavigationGnb },
    data () {
        return {
            isOpenMenu : false,
        };
    },
}
</script>

<style lang="scss" scoped>

#plate--navigation{
    position: fixed;
    z-index: 1000;
    width: 100vw; height: 100%;
    pointer-events: none;
    background-color: transparent;
    pointer-events: none;
    > * {
        pointer-events: auto;
    }
}
</style>