<template>
    <div    id="app"
            :class="`
                ${appClassNamePage}
            `"
    >

        <PlateNavigation
        />

        <PlatePage
        />

    </div>
</template>

<script>

import PlateNavigation  from '@/plates/PlateNavigation.vue';
import PlatePage        from '@/plates/PlatePage.vue';

export default {
    name: 'App',
    components: {
        PlateNavigation , PlatePage ,
    },
    computed : {
        appClassNamePage() {
            return `page--${(this.$route.name || 'error').toLowerCase()}`;
        },
        // appClassNameBrowser() {
        //     return `browser--${this.$store.state.type_browser}`;
        // },
        // appClassNameOS() {
        //     return `os--${this.$store.state.type_os}`;
        // },
        // appClassNameDevice() {
        //     return `device--${this.$store.state.type_device}`;
        // },
        // appClassNameLanguage() {
        //     return `language--${this.$store.state.languageType}`;
        // },
        // appClassNameTouchdevice() {
        //     return this.$store.state.is_touchDevice ? 'use_touch' : 'unuse_touch';
        // },
    },
    created() {
        // console.log(this.$route);
    }
}
</script>

<style lang="scss" scoped>

</style>
