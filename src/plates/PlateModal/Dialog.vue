<template>
    <transition name="modal-dialog" :duration="600">
        <div    id="modal-dialog"
                v-if="isOpen"


        >
            <div class="dialog__box" >

                <!-- {{ dialogList[0] }} -->

                {{ dialogData.title }}
                <br>
                {{ dialogData.message }}
<br>
                <button @click="close">
                    닫기
                </button>

            </div>

        </div>
    </transition>

</template>

<script>

export default {
    name : 'Dialog',
    props: {

    },
    data() {
        return {

        }
    },
    computed : {
        dialogData() {
            return this.$store.state.$modal.dialogData;
        },
        isOpen() {
            return this.$store.state.$modal.is_openDialog;
        }
    },
    watch : {
        "dialogData"() {
            this.watchDialogData();
        }
    },
    methods : {
        watchDialogData() {

        },
        close() {
            this.$store.dispatch('closeDialog');
        },
    },
    created() {

    },
    mounted() {

    },

}








const defaultDialogData = {
    type                : 'alert',
    title               : '알림',
    message             : '',
    buttonConfirmText   : '확인',
    buttonCancelText    : '취소',
    actionClose         : null,
    actionConfirm       : null,
    actionCancel        : null,
};

export const dialogStore = {
    state : {
        is_openDialog : false,
        dialogData : {...defaultDialogData},

        // dialogIssuingIdCount : 0,
    },
    getters : {
        is_showDialog(state) {
            return !!state.$modal.dialogList.length
        }
    },
    mutations : {

        MODAL_openDialog(state) {
            state.$modal.is_openDialog = true;
        },
        MODAL_closeDialog(state) {
            state.$modal.is_openDialog = false;
        },
        MODAL_recordDialogData(state,payload) {
            state.$modal.dialogData = payload;
        },
        MODAL_resetActions(state) {
            state.$modal.dialogData.actionClose     = null;
            state.$modal.dialogData.actionConfirm   = null;
            state.$modal.dialogData.actionCancel    = null;
        },
    },
    actions : {
        openDialog(context,option) {

            if(context.state.$modal.is_openDialog){
                return;
            }

            let payload = {...defaultDialogData};

            if(typeof option === 'string'){
                payload.message = option;
            }else if(typeof option === 'object'){
                payload = {
                    ...payload,
                    ...option,
                };
            }else {
                return;
            }

            context.commit('MODAL_recordDialogData', payload);
            context.commit('MODAL_openDialog');
        },

        closeDialog(context) {

            const { is_openDialog , dialogData } = context.state.$modal;

            if(!is_openDialog){
                return;
            }

            context.commit('MODAL_closeDialog');

            const { actionClose, actionConfirm ,actionCancel } = dialogData;

            actionClose     && actionClose();
            actionConfirm   && actionConfirm();
            actionCancel    && actionCancel();

            context.commit('MODAL_resetActions');
        },
    },
};


</script>

<style scoped lang="scss">

#modal-dialog {

    pointer-events: all;
    position: absolute;
    z-index: 1020;
    transform: translate3d(-50%,-50%,0);
    top: 50%; left: 50%;
    // border: 1px solid #d3d;
    // background: rgba(200,0,0,0.5);

    display: inline-block;

}



.dialog__box {

    position: relative;
    padding: 10px 30px;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0,0,0,0.2);
    border: 2px solid dodgerblue;
    background: #fff;
    font-weight: bold;
    color: dodgerblue;

    transition: transform 500ms ease , opacity 500ms ease;
    opacity: 1;

    .modal-dialog-enter &{
        transition: transform 700ms $EASE_outExpo , opacity 300ms ease;
        opacity: 0;
        transform : translateY(30px);
    }
    .modal-dialog-leave-to &{
        transition: transform 300ms $EASE_inOutCubic , opacity 200ms ease;
        opacity: 0;
        transform : translateY(-30px);
    }

}

</style>