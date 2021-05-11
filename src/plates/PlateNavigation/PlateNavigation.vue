<template>

    <nav id="plate--navigation" class="plate">


        <NavigationGnbTS
            v-if="1"
        />

        <Scrollbar
            v-if="1"
        />

    </nav>

</template>

<script>

import Scrollbar                        from './Scrollbar.vue';
import NavigationGnbTS  , { gnbStoreTS }     from '@/plates/PlateNavigation/NavigationGnbTS.vue';
// import NavigationMenu   from '@/components/navigation/NavigationMenu.vue';

export default {
    name : 'NavagationGnb',
    components : {
        NavigationGnbTS,
        Scrollbar,
    }
}

export const navStore = {
    name : '$nav',
    gnbStoreTS,
}

</script>

<style lang="scss" scoped>

#plate--navigation{
    position: fixed;
    z-index: 1000;
    top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none;
    background-color: transparent;
    pointer-events: none;
    // box-sizing: border-box;
    > * {
        pointer-events: auto;
    }
}
</style>