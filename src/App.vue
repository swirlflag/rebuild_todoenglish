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
            :useTest="false"
        />

        <PlateTransitionCover
             v-if="1"
        />

        <PlateNavigation
            v-if="1"
        />

        <PlatePage
            v-if="1"
        />

        <PlateFooter/>

    </div>
</template>

<script>
import PlateTest                from '@/plates/PlateTest.vue';
import PlateTransitionCover     from '@/plates/PlateTransitionCover.vue';
import PlateNavigation          from '@/plates/PlateNavigation.vue';
import PlatePage                from '@/plates/PlatePage.vue';
import PlateFooter              from '@/plates/PlateFooter.vue';

// import '@/styles/font/font.scss';
// import '@/styles/global/_reset.css';
// import '@/styles/global/_global.scss';

export default {
    name: 'App',
    components: {
        PlateTransitionCover , PlateNavigation , PlatePage ,PlateTest , PlateFooter
    },
    data() {
        return {
            // before
        }
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
            window.scrollTo(0,0);
        },

    },
    methods : {
        detectScrollDirectionNav(e) {
            {e}
            // console.log(e);
        }
    },
    created() {
        // /     const mobileStoreUrl = isAndroid ? process.env.GOOGLEPLAY_URL : browserName == 'Chrome' ? process.env.APPSTORE_URL_CHROME : process.env.APPSTORE_URL
            //   const appStoreUrl = browserName == 'Chrome' ? process.env.APPSTORE_URL_CHROME_PC : process.env.APPSTORE_URL_PC
        // console.log(process.env);

        window.addEventListener('scroll' , this.detectScrollDirectionNav)
    },
    destroyed() {
        window.removeEventListener('scroll' , this.detectScrollDirectionNav)
    }
}
</script>

<style lang="scss" scoped>
#app {
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}
</style>
