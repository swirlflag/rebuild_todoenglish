<template>
    <div    id="app"
            :class="`
                ${appClassNamePage}
                ${appClassNameBrowser}
                ${appClassNameOS}
                ${appClassNameDevice}
                ${appClassNameTouchdevice}
            `"
    >
        <PlateTest
            v-if="1"
        />

        <PlateTransitionCover
             v-if="1"
        />

        <PlateNavigation
            v-if="1"
        />

        <PlatePage
        />

    </div>
</template>

<script>
import PlateTest                from '@/plates/PlateTest.vue';
import PlateTransitionCover     from '@/plates/PlateTransitionCover.vue';
import PlateNavigation          from '@/plates/PlateNavigation.vue';
import PlatePage                from '@/plates/PlatePage.vue';

export default {
    name: 'App',
    components: {
        PlateTransitionCover , PlateNavigation , PlatePage ,PlateTest
    },
    computed : {
        appClassNamePage() {
            return `page--${(this.$route.name || 'error').toLowerCase()}`;
        },
        appClassNameBrowser() {
            return `browser--${this.$store.state.type_browser}`;
        },
        appClassNameOS() {
            return `os--${this.$store.state.type_os}`;
        },
        appClassNameDevice() {
            return `device--${this.$store.state.type_device}`;
        },
        appClassNameLanguage() {
            return `language--${this.$store.state.languageType}`;
        },
        appClassNameTouchdevice() {
            return this.$store.state.is_touchDevice ? 'use_touch' : 'unuse_touch';
        },
    },
    watch : {
        '$store.state.is_pageScrollLock'(now){
            document.body.classList[now ? 'add' : 'remove']('st-lockscroll')
        },
        '$route.path'() {
            // window.scrollTo(0,0);
        },

    },
    created() {
        // console.log(this.$route);
        window.vv = this
    }
}
</script>

<style lang="scss" scoped>

</style>
