import store from '@/store/index.js';
import Fragment from 'vue-fragment';
import gsap from 'gsap';

import {
    detectBrowser ,
    detectOS ,
    detectDevice ,
    detectTouchdevice ,
} from '@/utils';


// axios.defaults.baseURL = process.env.PROTOCOL + process.env.URLAPI;

store.state.is_dev = process.env.NODE_ENV === 'development';

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

// console.log(process.env.NODE_ENV === 'development');

const bindScreenData = (Vue) => {
    Vue.prototype.$screen = Vue.observable({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobileSize : window.innerWidth <= store.state.standard_mobileSize,
    });

    window.addEventListener('resize', () => {
        Vue.prototype.$screen = {
            width: window.innerWidth,
            height: window.innerHeight,
            isMobileSize : window.innerWidth <= store.state.standard_mobileSize,
        }
    });
}

export default {
    install(Vue) {
        if(store.state.is_dev){
            Vue.config.devtools = true;
        }

        Vue.use(Fragment.Plugin);

        Vue.prototype.gsap = gsap;

        bindScreenData(Vue);

    }
}