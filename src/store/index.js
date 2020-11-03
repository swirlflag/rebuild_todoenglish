import Vue from 'vue';
import Vuex from 'vuex';
import state            from '@/store/state.js';
import getters          from '@/store/getters.js';
import mutations        from '@/store/mutations.js';
import actions          from '@/store/actions.js';

import { transitionStore } from '@/plates/PlateTransitionCover.vue';
import { navStore } from '@/plates/PlateNavigation.vue';
import { combineStore } from '@/utils';

Vue.use(Vuex);

const defaultStore = { state , getters, mutations, actions };

const storeInfo = combineStore(
    defaultStore,
    transitionStore,
    navStore,
);

const store = new Vuex.Store(storeInfo)

export default store;


