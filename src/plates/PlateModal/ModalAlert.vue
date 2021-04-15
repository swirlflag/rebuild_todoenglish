<template>
    <ModalBox   type="alert"
                v-if="$modal.is_activeAlert"
    >
        <div class="alert__title" v-html="$modal.alertTitle"></div>
        <div class="alert__message" v-html="$modal.alertMessage"></div>
        <div class="alert__button">
            <ButtonDefault @click="close" theme="pink">
                {{ $modal.alertButtonText }}
            </ButtonDefault>
        </div>
    </ModalBox>
</template>

<script>

import ModalBox from './ModalBox.vue';
import ButtonDefault from '@/components/button/ButtonDefault.vue';

export default {
    name : 'ModalAlert',
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
        close() {
            this.$store.dispatch('closeModalAlert');
        },
    },
    created() {
        const payload = {
            type : 'alert',
            action : () => {
                if(this.$modal.is_activeAlert){
                    this.close();
                }
            },
        }
        this.$store.commit('MODAL_addDimmedClickAction', payload);
    },
}

const idleAlertState = {
    title       : '알림',
    message     : '알림 내용입니다.',
    buttonText  : '확인',
};



export const modalAlertStore = {
    state : {
        is_activeAlert          : false ,
        alertTitle              : idleAlertState.title,
        alertMessage            : idleAlertState.message ,
        alertButtonText         : idleAlertState.buttonText ,

        on_alertClose           : () => {},
    },
    mutations : {
        MODAL_showAlert(state) {
            state.$modal.is_activeAlert = true;
        },
        MODAL_hideAlert(state) {
            state.$modal.is_activeAlert = false;
        },
        MODAL_changeAlertTitle(state, title = '') {
            state.$modal.alertTitle = title;
        },
        MODAL_changeAlertMessage(state, message = '') {
            state.$modal.alertMessage = message;
        },
        MODAL_changealertButtonText(state,buttonText = '') {
            state.$modal.alertButtonText = buttonText;
        },
        MODAL_registAlertClose (state, action = () => {}) {
            state.$modal.on_alertClose = action;
        },
    },
    actions : {
        openModalAlert({state,commit, dispatch}, payload = {}) {

            if(state.$modal.is_active){
                console.dev('ERC_MD1 : 지금은 중복 호출 자체를 막아두었습니다.');
                return;
            }

            if(typeof payload === 'string'){
                commit('MODAL_changeAlertMessage' , payload);
            }else {

                const {
                    title, message , buttonText, actionClose
                } = payload;

                commit('MODAL_changeAlertTitle' , title || idleAlertState.title);
                commit('MODAL_changeAlertMessage' , message || idleAlertState.message);
                commit('MODAL_changealertButtonText' , buttonText || idleAlertState.buttonText);

                actionClose  && commit('MODAL_registAlertClose' , actionClose);
            }

            dispatch('enableModal' , 'alert');
            commit('MODAL_showAlert');

        },

        closeModalAlert({state,commit, dispatch}) {
            dispatch('disableModal');
            commit('MODAL_hideAlert');
            state.$modal.on_alertClose();
            commit('MODAL_registAlertClose' , () => {});
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