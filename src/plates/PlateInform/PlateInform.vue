<template>
<!--
    MEMO :
    PlateInform 에선, 가로, 세로 100% 인 #modal 이라는 레이어에서
    전역 성격으로 적절한 모달 윈도우들(레이어 팝업, 풀 디스플레이 팝업)을 배치합니다.
    #modal 자체는 기본적으로 윈도우(100%,100%)의 크기를 가지며 position : fixed입니다.
    #modal 이하의 컴포넌트들을 자유롭게 수정 확장할수 있습니다.
-->
    <div id="plate--inform" >

        <ModalAlert
        />

        <ModalConfirm
        />



        <!-- <ModalConfirm
        />

        <ModalAlert
        />

        <ModalBottomSheet
        /> -->

        <div    id="inform__dimmed"
                :class="{'st-show' : $inform.is_dimmedActive}"
                @click="clickModalDimmed"
        >
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex';

// import ModalConfirm     , { confirmStore }      from '@/components/modal/ModalConfirm.vue';
import ModalAlert       , { modalAlertStore }       from './ModalAlert.vue';
import ModalConfirm     , { modalConfirmStore }     from './ModalConfirm.vue';

// import ModalBottomSheet , { bottomSheetStore }  from '@/components/modal/ModalBottomSheet.vue';

export default {
    name : "PlateInform",
    components: {
        ModalAlert,
        ModalConfirm,

        //  ModalConfirm , ModalAlert , ModalBottomSheet
    },
    computed : {
        ...mapState(['$inform'])
    },
    methods : {
        clickModalDimmed() {
            if(!this.$inform.use_clickDimmedThenCloseModal ){
                return;
            }
            if(!this.$inform.is_modalActive){
                return;
            }

            if(this.$inform.modalType){
                this.$inform.clickDimmedActions[this.$inform.modalType]();
            }else {
                for(let i = 0, l = this.$inform.clickDimmedActions.length; i < l; ++i){
                    this.$inform.clickDimmedActions.unkowns[i]();
                }
            }
        }
    }
};

export const modalStore = {
    name : '$inform',
    modalAlertStore,
    modalConfirmStore,
    // bottomSheetStore,

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
            state.$inform.is_modalActive = true;
        },
        MODAL_disable (state) {
            state.$inform.is_modalActive = false;
        },
        MODAL_changeModalType(state,type = '') {
            state.$inform.modalType = type;
        },
        MODAL_enableDimmed (state) {
            state.$inform.is_dimmedActive = true;
        },
        MODAL_disableDimmed (state) {
            state.$inform.is_dimmedActive = false;
        },
        MODAL_addDimmedClickAction(state, payload) {
            if(typeof payload === 'function'){
                state.$inform.clickDimmedActions.unkowns.push(payload);
            }
            if(typeof payload === 'object'){
                const { type , action } = payload;
                state.$inform.clickDimmedActions[type] = action;
            }
        },

    },

    actions : {

        enableModal({state,commit},type) {
            commit('MODAL_enalbe');
            commit('MODAL_changeModalType' , type);

            if(state.$inform.use_openModalWithShowDimmed){
                commit('MODAL_enableDimmed');
            }
            if(state.$inform.use_openModalWithLockScroll){
                commit('SCROLL_lock');
            }
        },

        disableModal({state,commit}) {
            commit('MODAL_disable');
            commit('MODAL_disableDimmed');
            commit('MODAL_changeModalType' , '');

            if(state.$inform.use_openModalWithLockScroll){
                commit('SCROLL_unlock');
            }
        },

    },
};

</script>

<style lang="scss" scoped>

#plate--inform {
    z-index: 1020;
    min-height: 100vh;
    min-width: 100vw;
    height: 100%;
    top: 0; left: 0;
    position: fixed;
    display: inline-block;
    box-sizing: border-box;
    pointer-events: none;
}

#inform__dimmed {
    width: 100%; height: 100%;
    position: absolute;
    background-color: rgba(0,0,0,0.5);
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