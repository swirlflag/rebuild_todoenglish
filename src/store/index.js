import Vue from 'vue';
import Vuex from 'vuex';
import { combineStore } from '@/utils';

import defaultStore     from './defaultStore.js';
import userStore        from './userStore.js';

import { appStore           } from '@/App.vue';
import { transitionStore    } from '@/plates/PlateTransitionCover/PlateTransitionCover.vue';
import { navStore           } from '@/plates/PlateNavigation/PlateNavigation.vue';
import { modalStore         } from '@/plates/PlateModal/PlateModal.vue';
import { authStore          } from '@/plates/PlateAuth/PlateAuth.vue';
import { bannerStore        } from '@/plates/PlateBanner/PlateBanner.vue';
import { stickyStackStore   } from '@/components/display/StickyStack.vue';

Vue.use(Vuex);

const storeInfo = combineStore(
    // default가 항상 맨앞에 와야함
    defaultStore,
    appStore,
    transitionStore,
    navStore,
    modalStore,
    authStore,
    userStore,
    bannerStore,
    stickyStackStore,
);

const store = new Vuex.Store(storeInfo)

export default store;

export { storeInfo };


