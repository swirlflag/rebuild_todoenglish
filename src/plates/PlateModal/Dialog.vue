<template>
    <div id="modal-dialog" v-if="is_showDialog">

        <transition-group  name="modal-dialog" :duration="2000">
            <template v-for="item in $modal.dialogList">
                <div class="dialog__box" :key="item.id">
                    {{item.id}}
                    <button @click="close(item.id)">삭제</button>
                </div>
            </template>
        </transition-group>

    </div>
</template>

<script>
import { mapGetters } from  'vuex';

export default {
    name : 'Dialog',
    props: {

    },
    data() {
        return {

        }
    },
    computed : {
        '$modal'() {
            return this.$store.state.$modal
        },
        ...mapGetters([
            'is_showDialog',
        ]),
    },
    methods : {
        close(id) {
            this.$store.commit('MODAL_removeDialogList' , id);
        },
    },
    created() {

    }
}

const defaultItemState = {
    type : 'alert',
    title : '알림',
    message : '',
    buttonConfirmText : '확인',
    buttonCancelText : '취소',
    actionClose     : () => {},
    actionConfirm   : () => {},
    actionCancel    : () => {},

};

export const dialogStore = {
    state : {
        dialogList : [],
        dialogIssuingIdCount : 0,
    },
    getters : {
        is_showDialog(state) {
            return !!state.$modal.dialogList.length
        }
    },
    mutations : {

        MODAL_addDialogList(state, payload) {
            const id = ++state.$modal.dialogIssuingIdCount;

            const item = {
                ...payload,
                id,
            };

            state.$modal.dialogList.push(item);
        },
        MODAL_removeDialogList(state, id) {
            if(!state.$modal.dialogList.length){
                return
            }

            let index = 0;

            if(id !== undefined){
                for(let i = 0, l = state.$modal.dialogList.length; i < l; ++i){
                    const item = state.$modal.dialogList[i];
                    if(id === item.id){
                        index = i;
                        break;
                    }
                }
            }

            state.$modal.dialogList.splice(index, 1);
        },
    },
    actions : {
        openDialog(context,option) {

            let payload = {...defaultItemState};

            if(typeof option === 'string'){
                payload.message = option;
            }else if(typeof option === 'object'){
                payload = {
                    ...payload,
                    ...option,
                }
            }else {
                return;
            }

            context.commit('MODAL_addDialogList', payload);
        },

        closeDialog(context,id) {
            context.commit('MODAL_removeDialogList', id);
        },
    },
};


</script>

<style scoped lang="scss">
#modal-dialog {
    pointer-events: all;
    position: absolute;
    top: 50%; left: 50%;
    display: flex;
    flex-direction: column;
    z-index: 1020;
    transform: translate3d(-50%,-50%,0);
    background: rgba(200,0,0,0.5);
}
.dialog__box {
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0,0,0,0.2);
    background: dodgerblue;
    font-weight: bold;
    color: #fff;
}
</style>