<template>
    <div    id="app"
            ref="ref_root"
            :class="`${appClassNamePage}${appClassNameBrowser}${appClassNameOS}${appClassNameDevice}${appClassNameTouchdevice}${appClassNameStateFreeze}`"
    >


        <PlateSetting/>

        <PlateTest
            v-if="1"
        />

        <PlateLoading
            v-if="!appLoadEnd"
            @loadMotionEnd="loadMotionEnd"
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

        <PlateBanner
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
import PlateLoading             from '@/plates/PlateLoading/PlateLoading.vue';
import PlateModal              from '@/plates/PlateModal/PlateModal.vue';
import PlateAuth                from '@/plates/PlateAuth/PlateAuth.vue';
import PlateTransitionCover     from '@/plates/PlateTransitionCover/PlateTransitionCover.vue';
import PlateNavigation          from '@/plates/PlateNavigation/PlateNavigation.vue';
import PlateBanner              from '@/plates/PlateBanner/PlateBanner.vue';
import PlatePage                from '@/plates/PlatePage/PlatePage.vue';
import PlateFooter              from '@/plates/PlateFooter/PlateFooter.vue';

// import '@/style/font/font.scss';
// import '@/style/global/_reset.css';
// import '@/style/global/_global.scss';

export default {
    name: 'App',
    components: {
        PlateSetting, PlateLoading, PlateTransitionCover , PlateNavigation , PlatePage ,PlateTest , PlateFooter , PlateModal ,PlateAuth ,PlateBanner
    },
    data() {
        return {
            // before
            // useAuthField : false,

            appLoadEnd : false,

            isFreeze : false,
        }
    },
    computed : {
        appClassNamePage() {
            return ` page--${(this.$route.name || 'error').toLowerCase()}`;
        },
        appClassNameBrowser() {
            return this.$detect.type_browser ?  ` browser--${this.$detect.type_browser}`: '';
        },
        appClassNameOS() {
            return this.$detect.type_os ? ` os--${this.$detect.type_os}`: '';
        },
        appClassNameDevice() {
            return this.$detect.type_device ? ` device--${this.$detect.type_device}`: '';
        },
        appClassNameLanguage() {
            return this.$detect.languageType ? ` language--${this.$detect.languageType}` : '';
        },
        appClassNameTouchdevice() {
            return this.$detect.is_touchDevice ? ' use_touch' : ' unuse_touch';
        },
        appClassNameStateFreeze() {
            return this.$store.state.$app.is_freeze ? ' st-freeze' : '';
        },
        appClassNameRegion() {
            return 1    
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
        loadMotionEnd() {
            this.appLoadEnd = true;
        },
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
    mounted() {
        // console.log(this.$store.state.is_dev);
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
<!-- <style src="@/style/global/_reset.scss" lang="scss"></style> -->
<!--<style src="@/style/font/font.scss" lang="scss"></style>
<style src="@/style/global/_reset.scss" lang="scss"></style>
<style src="@/style/global/_variable.scss" lang="scss"></style>
<style src="@/style/global/_reset_custom.scss" lang="scss"></style>
<style src="@/style/global/_media.scss" lang="scss"></style>
<style src="@/style/global/_transition.scss" lang="scss"></style>
<style src="@/style/global/_global.scss" lang="scss"></style>
<style src="@/style/global/_icon.scss" lang="scss"></style>

-->

<style scoped lang="scss" >
#app {
    min-height: 100vh;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    @include phone {
        min-height: 100%;
        height: 100%;
    }

    &.st-freeze {
        user-select: none !important;
    }
}
</style>

