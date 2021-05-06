<template>

    <div    id="modal-roofalert"
            :class="`type--${roofAlertData.type}${isOpen ? '' : ' st-hide'}`"
            v-if="isRender"
    >
        <div    id="modal-roofalert__box"
                ref="ref_box"
                @click="onClickAlert"
        >
            <span id="modal-roofalert__icon">
                <i class="icon"></i>
            </span>
            <p id="modal-roofalert__message" ref="ref_message">
                {{ roofAlertData.message }}
            </p>
            <button id="modal-roofalert__close"
                    @click="close"
            >
                <i class="icon--cancel c-white"></i>
            </button>
        </div>
    </div>

</template>

<script>

export default {
    name : 'RoofAlert',
    data() {
        return {
            tl : new this.$gsap.timeline(),
            isRender : false,
        }
    },
    computed : {
        isOpen() {
            return this.$store.state.$modal.is_openRoofAlert;
        },
        roofAlertData() {
            return this.$store.state.$modal.roofAlertData;
        },
    },
    watch : {
        isOpen() {
            if(this.isOpen){
                this.isRender = true;
            }

            setTimeout(() => {
                this.tl.pause();
                this.tl.clear();
                if(this.isOpen){
                    this.openMotion();
                }else {
                    this.closeMotion();
                }
            },0);
        },
    },
    methods : {
        onClickAlert() {
            console.log('click');
        },
        close() {
            this.$store.dispatch('closeRoofAlert');
        },
        openMotion() {
            const box = this.$refs.ref_box;
            const boxChild = box.children;

            this.tl.fromTo(box, {
                y : -70,
            },{
                y : 10,
                ease : 'power4.out',
                duration: 0.3,
            },0);

            this.tl.fromTo(box , {
                opacity : 0,
            },{
                opacity : 1,
                ease : 'power2.out',
                duration : 0.3,
            },0);

            this.tl.fromTo(boxChild , {
                opacity : 0,
                y : 10,
            },{
                opacity : 1,
                y : 0,
                ease : 'power3.out',
                duration : 0.6,
                stagger : 0.07,
            },0.17)

            this.tl.to(box , {
                y : 0,
                ease : 'power2.out',
                duration : 0.4,
            },0.3);

            this.tl.play(0);

        },
        closeMotion() {
            this.tl.to(this.$refs.ref_box , {
                y : -12,
                opacity : 0,
                ease : 'back.in(1.2)',
                duration : 0.35,
                onComplete : () => {
                    this.isRender = false;
                },
            },0);

            this.tl.play(0);

        },
    },
    mounted () {

    },
    beforeDestroy() {

    },
};

export const roofAlertStore = {
    state : {
        is_openRoofAlert : false,
        roofAlertData : {
            type : 'default',
            message : '',
            timeout : null,
        },
    },
    mutations : {
        MODAL_openRoofAlert(state) {
            state.$modal.is_openRoofAlert = true;
        },
        MODAL_closeRoofAlert(state) {
            state.$modal.is_openRoofAlert = false;
        },
        MODAL_recordRoofAlertData(state, payload) {
            state.$modal.roofAlertData = payload;
        },
        MODAL_timeoutRoofAlert(state) {
            {state}
            // state.$modal.roofAlertData.timeout = setTimeout(() => {
            //     t
            // },2000);
        },

    },
    actions : {
        openRoofAlert(context, options) {
            if(context.state.$modal.is_openRoofAlert){
                return;
            }

            let payload = {};
            if(typeof options === 'string'){
                payload = {
                    type : 'default',
                    message : options,
                };
            }else if(typeof options === 'object'){
                const type = options.type || 'default';
                payload = {type,...options};
            }else {
                return;
            }

            context.commit('MODAL_recordRoofAlertData' ,payload);
            context.commit('MODAL_openRoofAlert');

            if(options.time){
                setTimeout(() => {
                    context.dispatch('closeRoofAlert');
                },options.time * 1000);
            }


        },
        closeRoofAlert(context) {
            context.commit('MODAL_closeRoofAlert');
            // 삭제
        },
    },
};

</script>

<style scoped lang="scss">

$color_blue     : rgba(31, 150, 219,1);
$color_green    : #15AB99;
$color_orange   : #E6801B;
$color_red      : #CB3373;

$gap : 20px;


#modal-roofalert {
    position: absolute;
    top: 0; left: 0;
    top: #{$SIZE_PC_gnbHeight + $gap};
    width: 100%;
    height: auto;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    pointer-events: none;
    z-index: 1020;
}

#modal-roofalert__box {
    pointer-events: all;
    display: inline-flex;

    align-items: center;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 20px;
    opacity: 0;
    // border: 1px solid rgba(255,255,255,0.1);

    min-width: 360px;
    max-width : $SIZE_PC_contentWidth;

    background-color: $color_blue;
    .type--default  & {background-color: $color_blue;}
    .type--success  & {background-color: $color_green;}
    .type--warning  & {background-color: $color_orange;}
    .type--error    & {background-color: $color_red;}

    .st-hide & {
        pointer-events: none ;
    }

    @include phone {
        min-width: unset;
        max-width: $SIZE_MO_contentWidth;
        margin: 0 $SIZE_MO_innerPadding;
        width: 100%;
    }
}

#modal-roofalert__icon {
    margin-right: 10px;
    i {
        width: 22px; height: 22px;
        background-image: url('~@/assets/icon/icon_alert_info.svg');
        .type--default  & {background-image: url('~@/assets/icon/icon_alert_info.svg');}
        .type--success  & {background-image: url('~@/assets/icon/icon_alert_check.svg');}
        .type--warning  & {background-image: url('~@/assets/icon/icon_alert_info.svg');}
        .type--error    & {background-image: url('~@/assets/icon/icon_alert_cancel.svg');}
    }
}

#modal-roofalert__message {
    color: #fff;
    font-weight: 700;
    flex : 1;
    display: flex;
    flex-wrap: nowrap;
}

#modal-roofalert__close {
    margin-left: 30px;
    display: inline-block;
    width: 20px; height: 20px;
    position: relative;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        border-radius: 7px;
        width: 100%; height: 100%;
        background-color: rgba(255,255,255,0.4);
        padding: 8px;
        left: 50%; top: 50%;
        transform: translate3d(-50%,-50%,0);
        display: inline-block;
        opacity: 0;
        transition: opacity 100ms ease;
    }
    @include hover {
        &::before {
            opacity: 1;
        }
    }
    i {
        display: inline-block;
        width: 100%; height: 100%;
    }
}


</style>