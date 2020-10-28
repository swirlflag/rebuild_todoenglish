import Vue from 'vue';
import router from './router';
import store from './store';
import App  from './App.vue';
import PageNotSurpport from '@/pages/PageNotSurpport/PageNotSurpport.vue';

Vue.config.productionTip = false

const IsNotSurpportCondition = false;

if(IsNotSurpportCondition){
    new Vue({render: h => h(PageNotSurpport)}).$mount('#app')
}else {
    new Vue({
        render: h => h(App),
        router,
        store,
    }).$mount('#app')
}


