
import store from '@/store/index.js';
import {
    // detectBrowser , detectOS , detectDevice ,
    detectTouchdevice
} from '@/utils';

// const $state = store.state;

// axios.defaults.baseURL = process.env.PROTOCOL + process.env.URLAPI;

// $state.type_browser     = detectBrowser();
// $state.type_os          = detectOS();
// $state.type_device      = detectDevice();
store.state.is_touchDevice   = detectTouchdevice();

// $state.use_coverdPlate = $state.type_browser === 'ie' ;

// $state.is_dev = process.env.NODE_ENV === 'development';

export default {
    install(Vue) {
        {Vue}
    }
}