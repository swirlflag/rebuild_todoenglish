<template>

    <nav id="plate--navigation" class="plate">

        <NavigationGnb

        />

    </nav>

</template>

<script>

import NavigationGnb , { gnbStore } from '@/components/navigation/NavigationGnb.vue';
// import NavigationMenu   from '@/components/navigation/NavigationMenu.vue';

export default {
    name : 'PlateNavigation',
    components : { NavigationGnb }
}

export const navStore = {
    name : 'nav',
    gnbStore,
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
    box-sizing: border-box;
    > * {
        pointer-events: auto;
    }
}
</style>