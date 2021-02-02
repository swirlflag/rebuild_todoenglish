<template>

    <nav id="plate--navigation" class="plate">

        <NavigationGnb
            v-if="1"
        />

        <NavigationGnb2
            v-if="0"
        />

        <Scrollbar
            v-if="1"
        />

    </nav>

</template>

<script>

import NavigationGnb , { gnbStore }     from './NavigationGnb.vue';
import Scrollbar                        from './Scrollbar.vue';
import NavigationGnb2                   from '@/plates/PlateNavigation/NavigationGnb2.vue';
// import NavigationMenu   from '@/components/navigation/NavigationMenu.vue';

export default {
    name : 'NavagationGnb',
    components : {
        NavigationGnb,
        NavigationGnb2,
        Scrollbar
    }
}

export const navStore = {
    name : '$nav',
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