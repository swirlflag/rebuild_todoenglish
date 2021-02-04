<template>
    <div    id="app"
            ref="ref_root"
            :class="`${appClassNamePage} ${appClassNameBrowser} ${appClassNameOS} ${appClassNameDevice} ${appClassNameTouchdevice} ${appClassNameStateFreeze}`"
    >


        <PlateSetting/>

        <PlateTest
            v-if="1"
        />

        <PlateTransitionCover
             v-if="1"
        />

        <PlateModal
            v-if="1"
        />

        <!-- <transition name="plate--auth">

        </transition> -->

        <PlateAuth
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
import PlateTest                from '@/plates/PlateTest/PlateTest.vue';
import PlateSetting             from '@/plates/PlateSetting/PlateSetting.vue';
import PlateModal               from '@/plates/PlateModal/PlateModal.vue';
import PlateAuth                from '@/plates/PlateAuth/PlateAuth.vue';
import PlateTransitionCover     from '@/plates/PlateTransitionCover/PlateTransitionCover.vue';
import PlateNavigation          from '@/plates/PlateNavigation/PlateNavigation.vue';
import PlatePage                from '@/plates/PlatePage/PlatePage.vue';
import PlateFooter              from '@/plates/PlateFooter/PlateFooter.vue';

// import '@/styles/font/font.scss';
// import '@/styles/global/_reset.css';
// import '@/styles/global/_global.scss';

export default {
    name: 'App',
    components: {
        PlateSetting, PlateTransitionCover , PlateNavigation , PlatePage ,PlateTest , PlateFooter , PlateModal ,PlateAuth ,
    },
    data() {
        return {
            // before
            // useAuthField : false,

            isFreeze : false,
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
        appClassNameStateFreeze() {
            return this.$store.state.$app.is_freeze ? 'st-freeze' : '';
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

export const appStore = {
    name : '$app',
    state : {
        is_freeze : false,
    },
    mutations : {
        APP_freeze(state) {
            state.$app.is_freeze = true;
        },
        APP_unfreeze(state) {
            state.$app.is_freeze = false;
        }
    }

}

</script>

<style scoped lang="scss" >
#app {
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &.st-freeze {
        user-select: none !important;
    }
}
</style>
