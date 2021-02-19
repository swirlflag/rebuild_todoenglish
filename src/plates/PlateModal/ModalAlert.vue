<template>
    <ModalBox   type="alert"
                :isShow="$modal.is_alertActive"
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
        this.$store.commit('MODAL_addDimmedClickAction',() => {
            if(this.$modal.is_alertActive){
                this.close();
            }
        });
    },
}

export const alertStore = {
    state : {
        is_alertActive         : false ,
        alertTitle             : '알림',
        alertMessage           : '알림 내용입니다.' ,
        alertButtonText        : '확인' ,
        alertActionClose       : () => {},
    },
    mutations : {
        MODAL_showAlert(state) {
            state.$modal.is_alertActive = true;
        },
        MODAL_hideAlert(state) {
            state.$modal.is_alertActive = false;
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
        MODAL_registAlertActionClose (state, action = () => {}) {
            state.$modal.alertActionClose = action;
        },
    },
    actions : {
        showModalAlert({state,commit, dispatch}, payload = {}) {

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

                commit('MODAL_changeAlertTitle' , title || '알림');
                commit('MODAL_changeAlertMessage' , message || '알림 내용입니다.');
                commit('MODAL_changealertButtonText' , buttonText || '확인');

                actionClose  && commit('MODAL_registAlertActionClose' , actionClose);
            }

            dispatch('enableModal');
            commit('MODAL_showAlert');

        },

        closeModalAlert({state,commit, dispatch}) {
            dispatch('disableModal');
            commit('MODAL_hideAlert');
            state.$modal.alertActionClose();
            commit('MODAL_registAlertActionClose' , () => {});
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