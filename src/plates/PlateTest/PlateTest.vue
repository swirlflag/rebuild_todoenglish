<template>
    <div id="plate--test"
        :class="{'st-open' : isOpen , 'st-hide' : !useTest}"
        ref="ref_root"
    >
        <div id="test__log">

            <button id="test_scrollock" @click="TEST_scrollock">
                scrollock
            </button>

            <div>
                스크롤잠금 :
                {{$store.state.is_pageScrollLock}}
            </div>

            <br>

            <button @click="TEST_openAlert">
                open alert
            </button>

            <button @click="TEST_openAlert2">
                open alert2
            </button>

            <br>

            <button @click="TEST_toggleAuthPlate">
                인증창 호출
            </button>

            <br>

            <button @click="TEST_switchAuth">
                한방에 로그인/로그아웃
            </button>
            <div>
                로그인 유무 :
                {{$store.state.$user.is_login}}
            </div>

            <router-link to="/mypage/account">
                강제 이동: 계정 관리
            </router-link>
            <router-link to="/mypage/study">
                강제 이동: 학습정보 열람
            </router-link>

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

        TEST_switchAuth() {
            this.$store.dispatch('closeAuthPanel');

            if(this.$store.state.$user.is_login){

                this.$store.dispatch('showModalAlert' , {
                    message : '로그아웃 합니다',
                    close : () => {
                        this.$store.dispatch('signOut');
                    }
                })
            }else {

                const random = `test_random${Math.round(Math.random()* 100)}`;
                this.$store.dispatch('showModalAlert' , {
                    title : '',
                    message : `
                        이렇게 로그인합니다.
                        <br>
                        <br> emailId : ${random}@gmail.com
                        <br> username : ${random}
                    `,
                    close : () => {
                        this.$store.dispatch('signIn' , {
                            emailId : `${random}@gmail.com`,
                            username : `${random}`,
                            accountId : "ACCOUNT_TEST",
                        });
                    }
                });
            }
        },

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
            if(this.$store.state.$auth.is_open){
                this.$store.dispatch('closeAuthPanel');
            }else {
                this.$store.dispatch('openAuthPanel');
            }

        },
        grab() {
            this.isGrab = true;
        },
        drop() {
            this.isGrab = false;
        },
        drag(e) {
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
        window.addEventListener('mousemove' , this.drag)
    },
    destroyed() {
        window.removeEventListener('mousemove' , this.drag);
    }
}
</script>

<style scoped lang="scss">
#plate--test {
    background: rgba(0,0,0,0.9);

    position: fixed;
    top: 0; left: 0;
    z-index: 99999999;

    @include hardSelect {
        font-size: 12px !important;
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

    @include hardSelect {
        color:rgb(0, 255, 0);
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
    padding: 3px;
    margin-right: 5px;
    margin-top: 5px;
}

a {
    background: rgb(0, 255, 0) ;
    color: #000 !important;
    padding: 3px 5px;
    border-radius: 9999px;
    margin-right: 5px; margin-top: 5px;
}


</style>