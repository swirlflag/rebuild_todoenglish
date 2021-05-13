import store from '@/store/index.js';
import Fragment from 'vue-fragment';
import gsap  from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import axios from 'axios';
import SwiperCore, { Parallax, Navigation, Pagination } from 'swiper/core';
import 'swiper/swiper.scss';

import {
    detectBrowser ,
    detectOS ,
    detectDevice ,
    detectTouchdevice ,
    detectDefaultRegion ,
} from '@/utils';

// axios.defaults.baseURL = process.env.PROTOCOL + process.env.URLAPI;

// $state.use_coverdPlate = $state.type_browser === 'ie' ;

// console.log(process.env.NODE_ENV === 'development');

const checkClientSignin = () => {
    const userData = window.localStorage.getItem('userData');

    if(userData){
        const parseUserData = JSON.parse(userData);
        store.dispatch('signInSuccess' , {...parseUserData , clientSignin : true });
    }

}

const checkRegion = () => {
    const user = store.state.$user.region;
    const { storage , navigator } = detectDefaultRegion();

    const finalRegion = storage || user || navigator;

    store.dispatch('changeRegion' , finalRegion);
}



const checkDetectData = (Vue) => {

    Vue.prototype.$detect = Vue.observable({
        is_dev          : process.env.NODE_ENV === 'development',
        type_browser    : detectBrowser(),
        type_os         : detectOS(),
        type_device     : detectDevice(),
        is_touchDevice  : detectTouchdevice(),
        region          : detectDefaultRegion(),
    });

    // store.commit('REGION_change' , dete);

};



const bindScreenData = (Vue) => {

    const standardMobileSize = 768;

    const record = () => {
        Vue.prototype.$screen = Vue.observable({
            width: window.innerWidth,
            height: window.innerHeight,
            isMobileSize : window.innerWidth <= standardMobileSize,
        });
    };

    record();

    window.addEventListener('resize', record);
}

const installGloabalPlugin = (Vue) => {
    SwiperCore.use([Parallax,Navigation, Pagination]);

    gsap.registerPlugin(ScrollTrigger);

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

        checkClientSignin();

        checkRegion();

        setGlobalConfig(Vue);

        checkDetectData(Vue);

        bindScreenData(Vue);

        installGloabalPlugin(Vue);

    }
}