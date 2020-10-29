import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const storeInfo = {
    state : {
        standardMobilePixelSize : 768,
        is_touchDevice : null,
        is_dev : false,
    },
}
const store = new Vuex.Store(
    storeInfo
)

export default store;


