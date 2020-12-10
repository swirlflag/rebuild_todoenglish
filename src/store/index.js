import Vue from 'vue';
import Vuex from 'vuex';
import { combineStore } from '@/utils';

import state            from '@/store/state.js';
import getters          from '@/store/getters.js';
import mutations        from '@/store/mutations.js';
import actions          from '@/store/actions.js';

import { transitionStore } from '@/plates/PlateTransitionCover/PlateTransitionCover.vue';
import { navStore } from '@/plates/PlateNavigation/PlateNavigation.vue';
import { modalStore } from '@/plates/PlateModal/PlateModal.vue';
import { authStore } from '@/plates/PlateAuth/PlateAuth.vue';

Vue.use(Vuex);

const defaultStore = { state , getters, mutations, actions };

const storeInfo = combineStore(
    // default가 항상 맨앞에 와야함
    defaultStore,
    transitionStore,
    navStore,
    modalStore,
    authStore,
);

const store = new Vuex.Store(storeInfo)

export default store;


