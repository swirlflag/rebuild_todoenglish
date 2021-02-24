<template>
    <div id="plate--banner">

        <BannerAlert
            v-if="1"
        />
    </div>
</template>

<script>
import BannerAlert      , { bannerAlertStore }      from './BannerAlert.vue';
export default {
    name : 'PlateBanner',
    components : {
        BannerAlert,
    }
}

export const bannerStore = {
    name : '$banner',
    bannerAlertStore,
}
</script>

<style scoped lang="scss">
#plate--banner {
    z-index: 800;
    position: fixed;
    width: 100%; height: auto;
    top: 0; left: 0;
    pointer-events: none;
}
</style>