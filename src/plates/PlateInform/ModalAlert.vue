<template>
    <ModalBox   type="alert"
                :isShow="$inform.is_alertActive"
    >
        <div class="alert__title" v-html="$inform.alertTitle"></div>
        <div class="alert__message" v-html="$inform.alertMessage"></div>
        <div class="alert__button">
            <ButtonDefault @click="close" theme="pink">
                {{ $inform.alertButtonText }}
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
        $inform() {
            return this.$store.state.$inform;
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
                if(this.$inform.is_alertActive){
                    this.close();
                    console.log('dimmed alert');
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
        is_alertActive         : false ,
        alertTitle             : idleAlertState.title,
        alertMessage           : idleAlertState.message ,
        alertButtonText        : idleAlertState.buttonText ,

        on_alertClose       : () => {},
    },
    mutations : {
        MODAL_showAlert(state) {
            state.$inform.is_alertActive = true;
        },
        MODAL_hideAlert(state) {
            state.$inform.is_alertActive = false;
        },
        MODAL_changeAlertTitle(state, title = '') {
            state.$inform.alertTitle = title;
        },
        MODAL_changeAlertMessage(state, message = '') {
            state.$inform.alertMessage = message;
        },
        MODAL_changealertButtonText(state,buttonText = '') {
            state.$inform.alertButtonText = buttonText;
        },
        MODAL_registAlertClose (state, action = () => {}) {
            state.$inform.on_alertClose = action;
        },
    },
    actions : {
        showModalAlert({state,commit, dispatch}, payload = {}) {

            if(state.$inform.is_active){
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
            state.$inform.on_alertClose();
            commit('MODAL_registAlertClose' , () => {});
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