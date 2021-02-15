
import store from '@/store/index.js';
import Fragment from 'vue-fragment';

import {
    detectBrowser ,
    detectOS ,
    detectDevice ,
    detectTouchdevice ,
} from '@/utils';

// axios.defaults.baseURL = process.env.PROTOCOL + process.env.URLAPI;

store.state.type_browser     = detectBrowser();
store.state.type_os          = detectOS();
store.state.type_device      = detectDevice();
store.state.is_touchDevice   = detectTouchdevice();

if(localStorage.userData){
    const userData = JSON.parse(localStorage.userData);
    store.dispatch('signIn' , userData);
}

// store.state.$user.is_login = true;

// $state.use_coverdPlate = $state.type_browser === 'ie' ;
// $state.is_dev = process.env.NODE_ENV === 'development';

export default {
    install(Vue) {
        {Vue}
        Vue.use(Fragment.Plugin);
    }
}