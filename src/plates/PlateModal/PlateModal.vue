<template>
<!--
    MEMO :
    PlateModal 에선, 가로, 세로 100% 인 #modal 이라는 레이어에서
    전역 성격으로 적절한 모달 윈도우들(레이어 팝업, 풀 디스플레이 팝업)을 배치합니다.
    #modal 자체는 기본적으로 윈도우(100%,100%)의 크기를 가지며 position : fixed입니다.
    #modal 이하의 컴포넌트들을 자유롭게 수정 확장할수 있습니다.
-->
    <div id="plate--modal" >

        <ModalAlert
        />

        <ModalConfirm
        />

        <div    class="modal__dimmed"
                :class="{'st-show' : $modal.is_dimmedActive}"
                @click="clickModalDimmed"
        >
        </div>


        <!-- <ModalConfirm
        />

        <ModalAlert
        />

        <ModalBottomSheet
        /> -->

    </div>
</template>

<script>
import { mapState } from 'vuex';

// import ModalConfirm     , { confirmStore }      from '@/components/modal/ModalConfirm.vue';
import ModalAlert       , { alertStore }        from './ModalAlert.vue';
import ModalConfirm     , { confirmStore }      from './ModalConfirm.vue';
// import ModalBottomSheet , { bottomSheetStore }  from '@/components/modal/ModalBottomSheet.vue';

export default {
    name : "PlateModal",
    components: {
        ModalAlert,
        ModalConfirm,
        //  ModalConfirm , ModalAlert , ModalBottomSheet
    },
    computed : {
        ...mapState(['$modal'])
    },
    methods : {
        clickModalDimmed() {
            if(!this.$modal.use_clickDimmedThenCloseModal ){
                return;
            }
            if(!this.$modal.is_active){
                return;
            }
            for(let i = 0, l = this.$modal.clickDimmedActions.length; i < l; ++i){
                this.$modal.clickDimmedActions[i]();
            }
        }
    }
};

export const modalStore = {
    name : '$modal',
    alertStore,
    confirmStore,
    // confirmStore,
    // bottomSheetStore,

    state : {

        use_clickDimmedThenCloseModal   : true,
        use_openModalWithLockScroll     : false,
        use_openModalWithShowDimmed     : true,

        is_active                       : false,
        is_dimmedActive                 : false,

        clickDimmedActions              : [],

    },

    mutations : {

        MODAL_enalbe (state) {
            state.$modal.is_active = true;
        },
        MODAL_disable (state) {
            state.$modal.is_active = false;
        },

        MODAL_enableDimmed (state) {
            state.$modal.is_dimmedActive = true;
        },
        MODAL_disableDimmed (state) {
            state.$modal.is_dimmedActive = false;
        },
        MODAL_addDimmedClickAction(state,action = () => {}) {
            state.$modal.clickDimmedActions.push(action);
        },

    },

    actions : {

        enableModal({state,commit}) {
            commit('MODAL_enalbe');

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

            if(state.$modal.use_openModalWithLockScroll){
                commit('SCROLL_unlock');
            }
        },

    },
};

</script>

<style lang="scss" scoped>

#plate--modal {
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

.modal__dimmed {
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