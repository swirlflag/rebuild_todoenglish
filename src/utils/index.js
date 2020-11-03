export const targetPathDetect = (path,target) => {

    let result = false;
    for(let i = 0, l = path.length; i < l; ++i){
        if(target === path[i]){
            result = true;
            break;
        }
    }
    return result;

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
    return null

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
        fn(els[i],i ,els)
    }
}