<template>
    <ModalBox   type="confirm"
                :isShow="$modal.is_confirmActive"
    >
        <div class="alert__title" v-html="$modal.confirmTitle"></div>
        <div class="alert__message" v-html="$modal.confirmMessage"></div>
        <div class="alert__button">
            <ButtonDefault @click="actionClose(1)">
                {{ $modal.confirmFalseButtonText }}
            </ButtonDefault>
            &nbsp;
            <ButtonDefault @click="actionClose(2)" theme="pink">
                {{ $modal.confirmTrueButtonText }}
            </ButtonDefault>
        </div>
    </ModalBox>
</template>

<script>

import ModalBox from './ModalBox.vue';
import ButtonDefault from '@/components/button/ButtonDefault.vue'

export default {
    name : 'ModalConfirm',
    components : {
        ModalBox,
        ButtonDefault,
    },
    computed : {
        $modal() {
            return this.$store.state.$modal;
        }
    },
    methods  : {
        actionClose(result = null) {
            this.$store.dispatch('closeModalConfirm' , result);
        },
    },
    created() {
        this.$store.commit('MODAL_addDimmedClickAction',() => {
            if(this.$modal.is_confirmActive){
                this.actionClose(0);
            }
        });
    },
}

const idleConfirmState = {
    title            : '확인 알림',
    message          : '확인 알림 내용입니다.',
    buttonTrueText   : '확인',
    buttonFalseText  : '취소',
};

export const confirmStore = {
    state : {
        is_confirmActive            : false ,
        confirmTitle                : idleConfirmState.title,
        confirmMessage              : idleConfirmState.message,
        confirmTrueButtonText       : idleConfirmState.buttonTextTrue,
        confirmFalseButtonText      : idleConfirmState.buttonFalseText,

        confirmActionClose          : () => {},
        confirmActionTrue           : () => {},
        confirmActionFalse          : () => {},
    },
    mutations : {
        MODAL_showConfirm(state) {
            state.$modal.is_confirmActive = true;
        },
        MODAL_hideConfirm(state) {
            state.$modal.is_confirmActive = false;
        },
        MODAL_changeConfirmTitle(state, title = '') {
            state.$modal.confirmTitle = title;
        },
        MODAL_changeConfirmMessage(state, message = '') {
            state.$modal.confirmMessage = message;
        },
        MODAL_changeConfirmTrueButtonText(state,buttonText = '') {
            state.$modal.confirmTrueButtonText = buttonText;
        },
        MODAL_changeConfirmFalseButtonText(state,buttonText = '') {
            state.$modal.confirmFalseButtonText = buttonText;
        },
        MODAL_registConfirmActionClose (state, action = () => {}) {
            state.$modal.confirmActionClose = action;
        },
        MODAL_registConfirmActionTrue (state , action = () => {}) {
            state.$modal.confirmActionTrue = action;
        },
        MODAL_registConfirmActionFalse (state , action = () => {}) {
            state.$modal.confirmActionFalse = action;
        },
    },
    actions : {
        showModalConfirm({state,commit, dispatch}, payload = {}) {

            if(state.$modal.is_active){
                console.dev('ERC_MD1 : 지금은 중복 호출 자체를 막아두었습니다.');
                return;
            }

            if(typeof payload === 'string'){
                commit('MODAL_changeConfirmMessage' , payload);
            }else {
                const {
                    title, message , buttonTrueText , buttonFalseText, actionTrue , actionFalse , actionClose
                } = payload;

                commit('MODAL_changeConfirmTitle' , title || idleConfirmState.title);
                commit('MODAL_changeConfirmMessage' , message || idleConfirmState.message);
                commit('MODAL_changeConfirmTrueButtonText' , buttonTrueText || idleConfirmState.buttonTrueText);
                commit('MODAL_changeConfirmFalseButtonText' , buttonFalseText || idleConfirmState.buttonFalseText);

                actionClose && commit('MODAL_registConfirmActionClose' , actionClose);
                actionTrue  && commit('MODAL_registConfirmActionTrue' , actionTrue);
                actionFalse && commit('MODAL_registConfirmActionFalse' , actionFalse);
            }

            dispatch('enableModal');
            commit('MODAL_showConfirm');

        },

        closeModalConfirm({state,commit, dispatch} , result) {
            dispatch('disableModal');
            commit('MODAL_hideConfirm');

            state.$modal.confirmActionClose();

            if(result === 1){
                state.$modal.confirmActionFalse();
            }
            if(result === 2){
                state.$modal.confirmActionTrue();
            }

            commit('MODAL_registConfirmActionClose' , () => {});
            commit('MODAL_registConfirmActionTrue' , () => {});
            commit('MODAL_registConfirmActionFalse' , () => {});
        },

    },
}

</script>

<style lang="scss" scoped>
.alert__title {
    // font-size: 26px;
    font-size: 20px;
    font-weight: 700;
}
.alert__message {
    line-height: $SIZE_lineheight_high1;
}
.alert__check {

}

</style>