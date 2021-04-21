<template>
    <ModalBoxFrame   type="confirm"
                v-if="$modal.is_activeConfirm"
    >
        <div class="confirm__title" v-html="$modal.confirmTitle"></div>
        <div class="confirm__message" v-html="$modal.confirmMessage"></div>
        <div class="confirm__button">
            <ButtonDefault @click="actionClose(1)" theme="green">
                {{ $modal.confirmFalseButtonText }}
            </ButtonDefault>
            &nbsp;
            <ButtonDefault @click="actionClose(2)" theme="pink">
                {{ $modal.confirmTrueButtonText }}
            </ButtonDefault>
        </div>
    </ModalBoxFrame>
</template>

<script>

import ModalBoxFrame from './ModalBoxFrame.vue';
import ButtonDefault from '@/components/button/ButtonDefault.vue'

export default {
    name : 'ModalConfirm',
    components : {
        ModalBoxFrame,
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
        const payload = {
            type: 'confirm',
            action : () => {
                if(this.$modal.is_activeConfirm){
                    this.actionClose(0);
                }
            }
        }
        this.$store.dispatch('registDimmedClick', payload);
    },
}

const idleConfirmState = {
    title            : '확인 알림',
    message          : '확인 알림 내용입니다.',
    buttonTrueText   : '확인',
    buttonFalseText  : '취소',
};

export const modalConfirmStore = {
    state : {
        is_activeConfirm            : false ,
        confirmTitle                : idleConfirmState.title,
        confirmMessage              : idleConfirmState.message,
        confirmTrueButtonText       : idleConfirmState.buttonTextTrue,
        confirmFalseButtonText      : idleConfirmState.buttonFalseText,

        on_confirmClose          : () => {},
        on_confirmTrue           : () => {},
        on_confirmFalse          : () => {},
    },
    mutations : {
        MODAL_showConfirm(state) {
            state.$modal.is_activeConfirm = true;
        },
        MODAL_hideConfirm(state) {
            state.$modal.is_activeConfirm = false;
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
        MODAL_registConfirmClose (state, action = () => {}) {
            state.$modal.on_confirmClose = action;
        },
        MODAL_registConfirmTrue (state , action = () => {}) {
            state.$modal.on_confirmTrue = action;
        },
        MODAL_registConfirmFalse (state , action = () => {}) {
            state.$modal.on_confirmFalse = action;
        },
    },
    actions : {
        openModalConfirm({state,commit, dispatch}, payload = {}) {

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

                actionClose && commit('MODAL_registConfirmClose' , actionClose);
                actionTrue  && commit('MODAL_registConfirmTrue' , actionTrue);
                actionFalse && commit('MODAL_registConfirmFalse' , actionFalse);
            }

            dispatch('enableModal' , 'confirm');
            commit('MODAL_showConfirm');

        },

        closeModalConfirm({state,commit, dispatch} , result) {
            dispatch('disableModal');
            commit('MODAL_hideConfirm');

            state.$modal.on_confirmClose();

            if(result === 1){
                state.$modal.on_confirmFalse();
            }
            if(result === 2){
                state.$modal.on_confirmTrue();
            }

            commit('MODAL_registConfirmClose' , () => {});
            commit('MODAL_registConfirmTrue' , () => {});
            commit('MODAL_registConfirmFalse' , () => {});
        },

    },
}

</script>

<style lang="scss" scoped>
.modal__box {
    > * {
        margin-top: 30px;
        &:nth-child(1) {
            margin-top: 0;
        }
    }
}
.confirm__title {
    // font-size: 26px;
    font-size: 20px;
    font-weight: 700;
}
.confirm__message {
    line-height: $SIZE_lineheight_high1;
}
.confirm__button {
    display: inline-block;
    // display: flex;

    > button + button{
        @include phone {
            margin-top: 10px;
        }
    }
}

</style>