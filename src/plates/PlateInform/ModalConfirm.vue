<template>
    <ModalBox   type="confirm"
                :isShow="$inform.is_confirmActive"
    >
        <div class="alert__title" v-html="$inform.confirmTitle"></div>
        <div class="alert__message" v-html="$inform.confirmMessage"></div>
        <div class="alert__button">
            <ButtonDefault @click="actionClose(1)" theme="green">
                {{ $inform.confirmFalseButtonText }}
            </ButtonDefault>
            &nbsp;
            <ButtonDefault @click="actionClose(2)" theme="pink">
                {{ $inform.confirmTrueButtonText }}
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
        $inform() {
            return this.$store.state.$inform;
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
                if(this.$inform.is_confirmActive){
                    this.actionClose(0);
                    console.log('dimmed confirm');
                }
            }
        }
        this.$store.commit('MODAL_addDimmedClickAction',payload);
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
        is_confirmActive            : false ,
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
            state.$inform.is_confirmActive = true;
        },
        MODAL_hideConfirm(state) {
            state.$inform.is_confirmActive = false;
        },
        MODAL_changeConfirmTitle(state, title = '') {
            state.$inform.confirmTitle = title;
        },
        MODAL_changeConfirmMessage(state, message = '') {
            state.$inform.confirmMessage = message;
        },
        MODAL_changeConfirmTrueButtonText(state,buttonText = '') {
            state.$inform.confirmTrueButtonText = buttonText;
        },
        MODAL_changeConfirmFalseButtonText(state,buttonText = '') {
            state.$inform.confirmFalseButtonText = buttonText;
        },
        MODAL_registConfirmClose (state, action = () => {}) {
            state.$inform.on_confirmClose = action;
        },
        MODAL_registConfirmTrue (state , action = () => {}) {
            state.$inform.on_confirmTrue = action;
        },
        MODAL_registConfirmFalse (state , action = () => {}) {
            state.$inform.on_confirmFalse = action;
        },
    },
    actions : {
        showModalConfirm({state,commit, dispatch}, payload = {}) {

            if(state.$inform.is_active){
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

            state.$inform.on_confirmClose();

            if(result === 1){
                state.$inform.on_confirmFalse();
            }
            if(result === 2){
                state.$inform.on_confirmTrue();
            }

            commit('MODAL_registConfirmClose' , () => {});
            commit('MODAL_registConfirmTrue' , () => {});
            commit('MODAL_registConfirmFalse' , () => {});
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