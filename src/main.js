import Vue from 'vue';
import router from './router';
import store from './store';
import App  from './App.vue';
import PageNotSurpport from '@/pages/PageNotSurpport/PageNotSurpport.vue';

import initLogic from '@/init/init.js';

import '@/utils/expansion.js';

Vue.use(initLogic);

Vue.config.productionTip = false

const IsNotSurpportCondition = false;

let VM = null;

if(IsNotSurpportCondition){
    VM = new Vue({render: h => h(PageNotSurpport)}).$mount('#app')
}else {
    VM = new Vue({
        render: h => h(App),
        router,
        store,
    }).$mount('#app')
}

export { VM }


