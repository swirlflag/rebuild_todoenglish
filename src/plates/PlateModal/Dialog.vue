<!--
    USE
    1. String. 간단한 메세지형. alert 타입으로 고정됩니다.

        this.$store.dispath('openDialog' , '쿠폰 등록이 완료되었습니다.');

    2. Object. 타입 설정 및 상세설정형. 필요한 설정만 입력이 가능합니다. 타입을 미입하면 alert으로 설정됩니다.
    타입리스트 : alert, confirm, prompt , wait

        const payload = {
            type : 'confirm'
            title : '주의사항',
            messsage : '이것을 주의해주세요!',
            buttonConfirmText : '확인',
            buttonCancelText : '취소',
            promptValue : 'prompt 사전 입력 값',
            promptPlaceholder : 'prompt placeholder',
            actionResult : (result) => {
                console.log('타입에 따라 적절한 ' + result + ' 를 얻을수 있습니다.)
            }
        }
        this.$store.dispath('openDialog' , payload);

-->

<template>
    <transition name="modal-dialog" :duration="600">
        <div    id="modal-dialog"
                v-if="isOpen"
                :class="`type--${dialogData.type}`"
        >
            <div class="dialog__box" >

                <div class="dialog__source"></div>

                <div class="dialog__contents">
                    <div    class="dialog__title"
                            v-html="dialogData.title"
                    >
                    </div>
                    <div    class="dialog__message"
                            v-html="dialogData.message"
                    >
                    </div>

                    <div    class="dialog__input"
                            v-if="isShowTextInput"
                    >
                        <InputText  v-model="promptData.value"
                                    :placeholder="promptData.placeholder"
                        />
                    </div>

                    <div    class="dialog__spinner"
                            v-if="isShowSpinner"
                    >
                        <span></span>
                    </div>
                </div>

                <div    class="dialog__controls"
                        v-if="isShowControls"
                >

                    <button class="dialog__button-cancel"
                            v-if="isShowConfirmButton"
                            @click="cancel"
                    >
                        {{ dialogData.buttonCancelText }}
                    </button>

                    <button class="dialog__button-confirm"
                            @click="confirm"
                    >
                        {{ dialogData.buttonConfirmText }}
                    </button>

                </div>

            </div>

        </div>
    </transition>

</template>

<script>
import InputText from '@/components/input/InputText.vue';

export default {
    name : 'Dialog',
    props: {

    },
    components : {
        InputText,
    },
    data() {
        return {
            promptData : {
                value : '',
                placeholder : '',
            }
        }
    },
    computed : {
        $modal() {
            return this.$store.state.$modal
        },
        dialogData() {
            return this.$modal.dialogData;
        },
        isOpen() {
            return this.$modal.is_openDialog;
        },
        isShowControls() {
            return  this.dialogData.type === 'alert'
                ||  this.dialogData.type === 'confirm'
                ||  this.dialogData.type === 'prompt';
        },
        isShowConfirmButton() {
            return  this.dialogData.type === 'confirm'
                ||  this.dialogData.type === 'prompt';
        },
        isShowTextInput() {
            return this.dialogData.type === 'prompt';
        },
        isShowSpinner() {
            return this.dialogData.type === 'wait';
        },

    },
    watch : {
        // 'dialogData.promptValue'() {
        //     this.promptData.value = this.dialogData.promptValue;
        // },
        // 'dialogData.promptPlaceholder'() {
        //     this.promptData.placeholder = this.dialogData.promptPlaceholder;
        // },
        'isOpen'() {
            this.isOpen ? this.whenOpen() : this.whenClose();
        }
    },
    methods : {
        whenOpen() {
            this.fetchPromptData();
        },
        whenClose() {

        },

        close() {
            this.$store.dispatch('closeDialog' , null);
        },
        confirm() {
            let result = true;

            if(this.dialogData.type === 'prompt'){
                result = this.promptData.value;
                this.promptData.value = '';
            }

            this.$store.dispatch('closeDialog' , result);
        },
        cancel() {
            this.$store.dispatch('closeDialog' , false);
        },

        fetchPromptData() {
            if(this.isOpen && this.dialogData.type === 'prompt'){
                this.promptData = {
                    value : this.dialogData.promptValue,
                    placeholder : this.dialogData.promptPlaceholder,
                }
            }
        }
    },
    created() {
        const payload = {
            type : 'dialog',
            action : () => {this.isOpen && this.close()},
        };
        this.$store.commit('MODAL_addDimmedClickAction', payload);
        this.$store.dispatch('registDimmedClick', payload);
    },
    mounted() {

    },

}










const defaultDialogData = {
    alert : {
        title               : '알림',
        message             : 'alert 기본 메세지 입니다.',
        buttonConfirmText   : '확인',
    },
    confirm : {
        title               : '알림',
        message             : 'confirm 기본 메세지 입니다.',
        buttonConfirmText   : '확인',
        buttonCancelText    : '취소',
    },
    prompt : {
        title               : '입력하기',
        message             : 'prompt 기본 메세지 입니다.',
        buttonConfirmText   : '완료',
        buttonCancelText    : '취소',
        promptValue         : '',
        promptPlaceholder   : '',
    },
    wait : {
        title               : '잠시 기다려 주세요',
        message             : 'wait 기본 메세지 입니다.',
    },
}


export const dialogStore = {
    state : {
        is_openDialog : false,
        dialogData : {...defaultDialogData.alert},
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
            state.$modal.dialogData.actionResult = null;
        },
    },

    actions : {
         openDialog(context,options) {
            if(context.state.$modal.is_openDialog){
                return;
            }

            let payload = {};

            if(typeof options === 'string'){
                payload = {...defaultDialogData.alert};
                payload.type = 'alert';
                payload.message = options;
            }else if(typeof options === 'object'){
                const type = options.type || 'alert';
                payload = {
                    ...defaultDialogData[type],
                    ...options,
                    type,
                };
            }else {
                return null;
            }

            context.dispatch('enableModal' , 'dialog');
            context.commit('MODAL_recordDialogData', payload);
            context.commit('MODAL_openDialog');
        },

        closeDialog(context , result) {
            const { is_openDialog , dialogData } = context.state.$modal;

            if(!is_openDialog){
                return;
            }

            context.dispatch('disableModal');
            context.commit('MODAL_closeDialog');

            const { actionResult } = dialogData;

            if(actionResult){
                actionResult(result);
                context.commit('MODAL_resetActions');
            }

        },
    },
};


</script>

<style scoped lang="scss">

$tempPadding: 30px;
$boxRadius : 16px;

#modal-dialog {
    pointer-events: all;
    position: absolute;
    z-index: 1020;
    transform: translate3d(-50%,-50%,0);
    top: 50%; left: 50%;
    display: inline-block;
    max-width: 580px;
    min-width : 320px;

}



.dialog__box {

    position: relative;

    border-radius: $boxRadius;
    box-shadow: 0 8px 12px rgba(0,0,0,0.2);

    background: #fff;
    font-weight: bold;

    transition: transform 600ms $EASE_outExpo , opacity 300ms ease;
    opacity: 1;
    color: COLOR_navy_2(1);

    .modal-dialog-enter &{
        transition: transform 600ms $EASE_outExpo , opacity 300ms ease;
        opacity: 0;
        transform : translateY(40px);
    }
    .modal-dialog-leave-to &{
        transition: transform 300ms $EASE_inOutCubic , opacity 300ms ease;
        opacity: 0;
        transform : translateY(-13px) scale(0.97);
    }

}

.dialog__source {
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    position: relative;
    bottom: $tempPadding;
    margin-bottom: -$tempPadding;

    -webkit-filter: drop-shadow( 0px 0px 8px rgba(0,0,0,0.1));
    filter: drop-shadow( 0px 0px 8px rgba(0,0,0,0.1));

    .type--alert & {
        // border: 1px solid #000;
        height: 74px;
        background-image: url('~@/assets/illust/rocket_single.svg');
    }
    .type--confirm & {
        height: 70px;
        background-image: url('~@/assets/illust/lets_talk.svg');
    }
}

.dialog__contents {
    padding: $tempPadding;
    padding-bottom: $tempPadding*1.2;
    display: flex;
    flex-direction: column;
    text-align: center;
    line-height: $SIZE_lineheight_high1;

    .dialog__title {
        font-size: $SIZE_PC_fontsize_strong ;
        font-weight: 700;
        @include phone {
            font-size: $SIZE_MO_fontsize_strong ;
        }
    }
    .dialog__message {
        margin-top: $tempPadding;
        font-weight: 400;
    }
    .dialog__input {
        margin-top: $tempPadding;
        font-weight: 400;
    }
    .dialog__spinner {
        display: flex;
        justify-content: center;
        margin-top: $tempPadding;
        span {
            display: inline-block;
            position: relative;
            box-sizing: border-box;
            width: 26px; height: 26px;

            @keyframes rotate {
                0% {transform :rotate(0)}
                100% {transform :rotate(360deg)}
            }

            &::before, &::after {
                content: '';
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                box-sizing: border-box;
            }
            &::before {
                border: 4px solid $COLOR_pink_1;
                animation: rotate 3s linear infinite;
                border-radius: 8px;
            }
            &::after {
                width: 60%; height: 60%;
                top: 20%; left: 20%;
                border-radius: 5px;
                border: 4px solid $COLOR_mint_1;
                animation: rotate 1.5s linear infinite reverse;
            }
        }
    }
}

.dialog__controls {
    display: flex;
    flex-direction: row;

    border-top: 1px solid COLOR_navy_2(0.15);
    border-bottom: transparent;
    border-radius: 0 0 $boxRadius $boxRadius;
    overflow: hidden;

    > button {
        min-width: 120px;
        font-size: $SIZE_PC_fontsize_strong ;
        font-weight: 700;
        vertical-align: top;

        outline: none;
        padding: 20px $tempPadding;
        box-sizing: border-box;
        // width: 100%;
        width: 50%;
        flex-grow: 1;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-basis: 100%;
        word-break: break-all;
        transition: color 300ms ease , background-color 120ms ease;

        @include phone {
            font-size: $SIZE_MO_fontsize_strong ;
        }

        + button {
            border-left: 1px solid COLOR_navy_2(0.15);
        }

        &.dialog__button-confirm {
            color: COLOR_pink_1(1);
            @include hover {
                color: #fff;
                background-color: COLOR_pink_1(1);
            }
        }
        &.dialog__button-cancel {
            // color: rgba(0,0,0,0.5)
            @include hover {
                color: #fff;
                background-color: COLOR_navy_2(1);
            }
        }

    }
}

</style>