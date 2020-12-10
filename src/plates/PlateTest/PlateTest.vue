<template>
    <div id="plate--test"
        :class="{'st-open' : isOpen , 'st-hide' : !useTest}"
        ref="ref_root"
    >
        <div id="test__log">





            <button id="test_scrollock" @click="TEST_scrollock">scrollock</button>

            <br>

            <button @click="TEST_openAlert">open alert</button>

            <button @click="TEST_openAlert2">open alert2</button>

            <br>

            <button @click="TEST_toggleAuthPlate"> toggle auth</button>


            <div id="testlog1"></div>
            <div id="testlog2"></div>


        </div>


        <div id="test__open"
            @click="onoff"
            @mousedown="grab"
            @mouseup="drop"
            @mousemove="drag"
        >
            on/off
        </div>


    </div>
</template>

<script>
export default {
    data() {
        let useTest = false;

        useTest = true;

        return {
            useTest,

            rootRect : {},
            isGrab : false,
            isOpen : false,
        }
    },
    methods : {
        TEST_scrollock() {
            if(this.$store.state.is_pageScrollLock){
                this.$store.commit('SCROLL_unlock')
            }else {
                this.$store.commit('SCROLL_lock')
            }
        },
        TEST_openAlert(){
            const payload = {
                title : 'TEST ALERT',
                message : '테스트용 알림창',
                confirmButton : '확~인',
                close : () => {
                    console.log('test alert close');
                }
            };
            this.$store.dispatch('showModalAlert' , payload);
        },
        TEST_openAlert2(){
            const payload = {
                message : '비밀번호 변경을 위한 이메일을 발송하였습니다.<br/>메일함을 확인해주세요.',
            };
            this.$store.dispatch('showModalAlert' , payload);
        },
        TEST_toggleAuthPlate() {
            if(this.$store.state.$auth.is_openAuth){
                this.$store.commit('AUTH_close');
            }else {
                this.$store.commit('AUTH_open');
            }

        },
        grab() {
            this.isGrab = true;
        },
        drop() {
            this.isGrab = false;
        },
        drag(e) {
            {e}
            if(this.isGrab){
                const target = this.$refs.ref_root;
                target.style.left = e.clientX - 25 + 'px';
                target.style.top = e.clientY - 25 + 'px';
            }
        },
        onoff() {
            this.isOpen = !this.isOpen
        }

    },
    mounted() {


        window.TEST_1 = document.querySelector('#testlog1');
        window.TEST_2 = document.querySelector('#testlog2');
    }
}
</script>

<style scoped lang="scss">
#plate--test {
    background: rgba(0,0,0,0.9);
    color:rgb(0, 255, 0);

    position: fixed;
    top: 0; left: 0;
    z-index: 99999999;
    @include hardSelect {
        font-size: 14px !important;
    }
    &.st-hide {
        opacity: 0 !important;
        pointer-events: none !important;
    }
    &.st-open {
        border: 1px solid rgb(0, 255, 0);
        padding: 10px;
    }
    @include phone {
        font-size: 12px;
        padding : 10px !important;
        border: 1px solid rgb(0, 255, 0) !important;
        transform :translate(-100%,-50%) !important;
        top: 50%;

        &.st-open {
            border: 1px solid rgb(0, 255, 0) !important;
            transform :translate(0,-50%) !important;
        }
    }

}
#test__open {
    width: 40px; height: 40px;display: flex;
    font-weight: bold;
    justify-content: center; align-items: center;
    border: 1px solid rgb(0, 255, 0);
    cursor: pointer;
    position: absolute;top: -1px; left: -1px;
    z-index: 10;
    background: #000;

    @include phone {
        top: 50%;
        transform :translateY(-50%);
        // width: 30px;
        left: 100%;
    }

}
#test__log {
    position: relative;
    z-index: 1;
    // min-width: 300px; 
    margin-top: 40px;
    display: none;
    .st-open & {
        display: block;
    }
    @include phone {
        display: block !important;
        margin-top: 0;
        // height: 50vh;
        // min-width: 60vw !important;
    }
}

button {
    border: 1px solid rgb(0, 255, 0) !important;
    color: rgb(0, 255, 0) !important;
    padding: 5px;
}


</style>