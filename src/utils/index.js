import { VM } from '@/main.js';

export const targetPathDetect = (e,...targets) => {

    const path = e.composedPath ? e.composedPath() : e.path;

    for(let i = 0, il = path.length; i < il; ++i){
        for(let j = 0 , jl = targets.length; j < jl; ++j ){
            if(targets[j] === path[i]){
                return true;
            }
        }
    }

    return false;

}

export const combineStore = (...stores) => {

    let combine = {};

    const flatteningStore = (store , result = {}) => {
        result.name        = store.name        ||  result.name  || null;
        result.state       = result.state      || {};
        result.getters     = result.getters    || {};
        result.mutations   = result.mutations  || {};
        result.actions     = result.actions    || {};

        for(const [key,value] of Object.entries(store)){
            switch (key) {
                case ('state') :
                case ('getters') :
                case ('mutations') :
                case ('actions') : {
                    if(key === 'state' && result.name) {
                        result.state[result.name] = {
                            ...result.state[result.name],
                            ...value,
                        }
                    }else {
                        result[key] = {
                            ...result[key],
                            ...value,
                        }
                    }
                    break;
                }
                default : {
                    if(typeof value === 'object') {
                        flatteningStore(value,result)
                    }
                    break;
                }
            }
        }

        return result;
    }

    for(const value of Object.values(stores)) {
        combine = flatteningStore(value,combine)
    }

    combine.name = 'complete';

    return combine;
}

export const installCDN = (Vue, cdns, prefix = '$_') => {

    const setStatePlugin = (pluginList,state = 'ready') => {
        pluginList.forEach((plugin) => {
            Vue.prototype[`${prefix}${plugin}`] =
                state === 'load'
                ? window[plugin]
                : { pluginState : state };
            window[plugin] = null;
        });
    };

    for(const [name,{url,plugins,success}] of Object.entries(cdns)){

        const scriptTag = document.createElement('script');

        setStatePlugin(plugins, 'ready');

        scriptTag.onload = () => {
            setStatePlugin(plugins ,'load');
            success && success(Vue)
            document.body.removeChild(scriptTag);
        };

        scriptTag.onerror = () => {
            setStatePlugin(plugins ,'failed_load');
        };

        scriptTag.setAttribute('type', 'text/javascript');
        scriptTag.setAttribute('src', url);
        scriptTag.setAttribute('name', name);
        document.body.appendChild(scriptTag);

    }

}

const userAgent = window.navigator.userAgent;

export const detectBrowser = () => {

    const isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || userAgent.indexOf(' OPR/') >= 0;
    if(isOpera){ return 'opera' }

    const isFirefox = typeof InstallTrigger !== 'undefined';
    if(isFirefox){ return 'firefox' }

    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window.safari.pushNotification));
    if(isSafari){ return 'safari' }

    const isIE = !!document.documentMode;
    if(isIE){ return 'ie'}

    const isEdge = !isIE && !!window.StyleMedia;
    if(isEdge){ return 'edge'}

    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    if(isChrome) { return 'chrome'}

    const isEdgeChromium = isChrome && (userAgent.indexOf("Edg") != -1);
    if(isEdgeChromium) { return 'edge-chromium'}

    const isBlink = (isChrome || isOpera) && !!window.CSS;
    if(isBlink) { return 'blink'}

    console.error('cannot detect browser');
    // return null

    return 'cannot'

};

export const detectOS = () => {

    const platform  = window.navigator.platform;
    const macosPlatforms    = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms  = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms      = ['iPhone', 'iPad', 'iPod'];

    if (macosPlatforms.indexOf(platform) !== -1) {
        return 'mac';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        return 'ios';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        return 'window';
    } else if (/Android/.test(userAgent)) {
        return 'android';
    } else if (/Linux/.test(platform)) {
        return 'linux';
    }

    return null;

};

export const detectDevice = () => {

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
        return "tablet";
    }
    if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)){
        return "mobile";
    }

    return "desktop";
};


export const detectTouchdevice = () => {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
};



export const iterElement = (els, fn) => {
    for(let i = 0, l = els.length; i < l; ++i){
        fn(els[i],i,els)
    }
}

export const randomOne = (...l) => l[Math.floor((Math.random() * l.length))];
export const randomRange = (a,b,toFixed = 0) => +(Math.min(a,b) + Math.random() * (Math.max(a,b) - Math.min(a,b))).toFixed(toFixed);

export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => {

    let result = {valid : false , errorState : null};

    const minLength = 6;
    const maxLength = 20;

    const engRegExp = /[A-Za-z]/;
    const numRegExp = /[0-9]/;
    const spaceRegExp = /\s/g;

// 1: 비밀번호가 6자 이상 20자 이하가 아닐때
    if(password.length < minLength || password.length > maxLength){
        result.errorState = 1;
        return result;
    }

// 2: 영문, 숫자가 없을때
    if(!engRegExp.test(password) || !numRegExp.test(password)){
        result.errorState = 2;
        return result;
    }

// 3 : 공백 등 허용 가능한 문자셋을 이탈할떄
    if(spaceRegExp.test(password)){
        result.errorState = 3;
        return result;
    }
    for (let i = 0; i < password.length; ++i) {
        const code = password.charCodeAt(i);
        if (code < 32 || code > 255) {
            result.errorState = 3;
            return result;
        }
    }

    result.valid = true;

    return result;

};



export const detectLastPath = (prefixPath) => VM.$route.path.split(prefixPath)[1] || null;


export const deepCopy = (origin) => JSON.parse(JSON.stringify(origin));