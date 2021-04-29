import store from '@/store/index.js';
import Fragment from 'vue-fragment';
import gsap from 'gsap';
import axios from 'axios';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import 'swiper/swiper.scss';

import {
    detectBrowser ,
    detectOS ,
    detectDevice ,
    detectTouchdevice ,
    checkRegion ,
} from '@/utils';


checkRegion();

// axios.defaults.baseURL = process.env.PROTOCOL + process.env.URLAPI;

if(localStorage.userData){
    const userData = JSON.parse(localStorage.userData);
    store.dispatch('signIn' , userData);
}

// store.state.$user.is_login = true;

// $state.use_coverdPlate = $state.type_browser === 'ie' ;

// console.log(process.env.NODE_ENV === 'development');

const checkDetectData = (Vue) => {

    Vue.prototype.$detect = Vue.observable({
        is_dev          : process.env.NODE_ENV === 'development',
        type_browser    : detectBrowser(),
        type_os         : detectOS(),
        type_device     : detectDevice(),
        is_touchDevice  : detectTouchdevice(),
    });

};

const bindScreenData = (Vue) => {

    const record = () => {
        Vue.prototype.$screen = Vue.observable({
            width: window.innerWidth,
            height: window.innerHeight,
            isMobileSize : window.innerWidth <= store.state.standard_mobileSize,
        });
    };

    record();

    window.addEventListener('resize', record);
}

const installGloabalPlugin = (Vue) => {
    SwiperCore.use([Navigation, Pagination]);

    Vue.prototype.$gsap = gsap;
    Vue.prototype.$swiper = SwiperCore;
    Vue.prototype.$axios = axios;

    Vue.use(Fragment.Plugin);
}


const setGlobalConfig = (Vue) => {
    if(store.state.is_dev){
        Vue.config.devtools = true;
    }
}

export default {
    install(Vue) {

        setGlobalConfig(Vue);

        checkDetectData(Vue);

        bindScreenData(Vue);

        installGloabalPlugin(Vue);

    }
}