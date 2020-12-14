<template>
    <div class="modal--alert" :class="{'st-show' : $modal.is_alertActive }">
        <div class="alert__box">
            <div class="alert__title" v-html="$modal.alertTitle"></div>
            <div class="alert__message" v-html="$modal.alertMessage"></div>
            <div class="alert__button">
                <ButtonDefault @click="close" theme="pink">
                    {{ $modal.alertButtonText }}
                </ButtonDefault>
            </div>
        </div>
    </div>
</template>

<script>

import ButtonDefault from '@/components/button/ButtonDefault.vue';
import { mapState } from 'vuex';

export default {
    name : 'ModalAlert',
    components : {
        ButtonDefault,
    },
    computed : {
        ...mapState(['$modal'])
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
        MODAL_changealertButtonText(state,confirmButtonText = '') {
            state.$modal.alertButtonText = confirmButtonText;
        },
        MODAL_registAlertActionClose (state, action = () => {}) {
            state.$modal.alertActionClose = action;
        },
        MODAL_resetAlertActionClose (state) {
            state.$modal.alertActionClose = () => {};
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
                    title, message , close, confirmButton,
                } = payload;

                commit('MODAL_changeAlertTitle' , title || '알림');
                message && commit('MODAL_changeAlertMessage' , message);
                commit('MODAL_changealertButtonText' , confirmButton || '확인');
                close   && commit('MODAL_registAlertActionClose' , close);
            }

            dispatch('enableModal');
            commit('MODAL_showAlert');

        },

        closeModalAlert({state,commit, dispatch}) {
            dispatch('disableModal');
            commit('MODAL_hideAlert');
            state.$modal.alertActionClose();
            commit('MODAL_resetAlertActionClose' , () => {});
        },

    },
}

</script>

<style lang="scss" scoped>

.modal--alert {

    position: absolute;
    top: 50%; left: 50%;
    transform :translate(-50% , calc(-50% + 30px));
    z-index: 1020;
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    pointer-events: none;
    width: 100%;
    box-sizing: border-box;
    // background: rgba(0,0,0,0.2);

    @include phone {
        padding: 0 $SIZE_MO_innerPadding;
    }

    .alert__box {
        width: auto;
        min-width : 360px;
        max-width : 720px;
        height: auto;
        background-color: #fff;
        padding: 30px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        border-radius: 14px;
        box-sizing: border-box;
        transform : translateY(30px);
        transition: transform 180ms $EASE_inCubic,
                opacity 150ms ease
                ;

        opacity: 0;

        @include phone {
            width: 100%;
            min-width : unset !important;
            max-width : 360px !important;
        }

        > * {
            margin-top: 30px;
            &:nth-child(1) {
                margin-top: 0;
            }
        }
    }

    &.st-show .alert__box {
        opacity: 1;
        transform : none;
        pointer-events: all;
        transition: transform 650ms $EASE_outExpo ,
                    opacity 300ms ease
                    ;
        transition-delay: 0ms;
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

}

</style>