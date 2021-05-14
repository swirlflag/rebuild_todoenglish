<template>

    <nav id="plate--navigation" class="plate">


        <GlobalNavigation
            v-if="1"
        />

        <Scrollbar
            v-if="1"
        />

        <RegionChange

        />

    </nav>

</template>

<script>

import Scrollbar  from './Scrollbar.vue';
import GlobalNavigation , { gnbStore } from './GlobalNavigation.vue';
import RegionChange , {regionChangeStore} from './RegionChange.vue';

export default {
    name : 'NavagationGnb',
    components : {
        GlobalNavigation,
        RegionChange,
        Scrollbar,
    }
}

export const navStore = {
    name : '$nav',
    gnbStore,
    regionChangeStore,
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