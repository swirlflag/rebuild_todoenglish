<!--
    MEMO
        PlateModal 에선, 가로, 세로 100% 인 #modal 이라는 레이어에서
        전역 성격으로 적절한 모달 윈도우들(레이어 팝업, 풀 디스플레이 팝업)을 배치합니다.
        #modal 자체는 기본적으로 윈도우(100%,100%)의 크기를 가지며 position : fixed입니다.
        #modal 이하의 컴포넌트들을 자유롭게 수정 확장할수 있습니다.

        dimmed의 z-index 는 1000이므로 하위 요소들은 그 이상으로 설정해주세요.
        dimmed를 제외한 항목들은 자체적으로 v-if를 지니게 해 문서 순수성을 높혀주세요!
-->
<template>

    <div id="plate--modal" >

    <!-- 삭제 예정-->
        <ModalAlert/>
    <!-- 삭제 예정-->

    <!-- 삭제 예정-->
        <ModalConfirm/>
    <!-- 삭제 예정-->

        <Dialog />


        <div    id="modal__dimmed"
                :class="{'st-show' : $modal.is_dimmedActive}"
                @click="clickModalDimmed"
        >
        </div>

    </div>
</template>

<script>

import ModalAlert       , { modalAlertStore }       from './ModalAlert.vue';
import ModalConfirm     , { modalConfirmStore }     from './ModalConfirm.vue';

import Dialog , { dialogStore } from './Dialog.vue';

export default {
    name : "PlateModal",
    components: {
        ModalAlert,
        ModalConfirm,


        Dialog,
    },
    computed : {
        $modal() {
            return this.$store.state.$modal;
        }
    },
    methods : {
        clickModalDimmed() {
            if(!this.$modal.use_clickDimmedThenCloseModal ){
                return;
            }
            if(!this.$modal.is_modalActive){
                return;
            }
            if(this.$modal.modalType){
                this.$modal.clickDimmedActions[this.$modal.modalType]();
            }else {
                for(let i = 0, l = this.$modal.clickDimmedActions.length; i < l; ++i){
                    this.$modal.clickDimmedActions.unkowns[i]();
                }
            }
        }
    }
};

export const modalStore = {
    name : '$modal',
    modalAlertStore,
    modalConfirmStore,
    dialogStore,

    state : {

        use_clickDimmedThenCloseModal   : true,
        use_openModalWithLockScroll     : false,
        use_openModalWithShowDimmed     : true,

        is_modalActive                  : false,
        is_dimmedActive                 : false,

        modalType                       : '',

        clickDimmedActions : {
            unkowns : []
        },

    },

    mutations : {
        MODAL_enalbe (state) {
            state.$modal.is_modalActive = true;
        },
        MODAL_disable (state) {
            state.$modal.is_modalActive = false;
        },
        MODAL_changeModalType(state,type = '') {
            state.$modal.modalType = type;
        },
        MODAL_enableDimmed (state) {
            state.$modal.is_dimmedActive = true;
        },
        MODAL_disableDimmed (state) {
            state.$modal.is_dimmedActive = false;
        },
        MODAL_addDimmedClickAction(state, payload) {
            if(typeof payload === 'function'){
                state.$modal.clickDimmedActions.unknowns.push(payload);
            }
            if(typeof payload === 'object'){
                const { type , action } = payload;
                state.$modal.clickDimmedActions[type] = action;
            }
        },

    },

    actions : {

        enableModal({state,commit},type) {
            commit('MODAL_enalbe');
            commit('MODAL_changeModalType' , type);

            if(state.$modal.use_openModalWithShowDimmed){
                commit('MODAL_enableDimmed');
            }
            if(state.$modal.use_openModalWithLockScroll){
                commit('SCROLL_lock');
            }
        },

        disableModal({state,commit}) {
            commit('MODAL_disable');
            commit('MODAL_disableDimmed');
            commit('MODAL_changeModalType' , '');

            if(state.$modal.use_openModalWithLockScroll){
                commit('SCROLL_unlock');
            }
        },

        registDimmedClick({commit}, payload) {
            commit('MODAL_addDimmedClickAction',payload);
        },

    },
};

</script>

<style lang="scss" scoped>

#plate--modal {
    z-index: 1020;
    width: 100%;
    height: 100%;
    top: 0; left: 0;
    position: fixed;
    display: inline-block;
    box-sizing: border-box;
    pointer-events: none;
}

#modal__dimmed {
    width: 100%; height: 100%;
    position: absolute;
    background-color: $COLOR_overlayblack;
    opacity: 0;
    pointer-events: none;
    transition: opacity 400ms ease;
    z-index: 1000;
    &.st-show {
        pointer-events: all;
        opacity: 1;
        display : block;
    }
}

</style>