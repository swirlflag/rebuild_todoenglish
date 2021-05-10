<template>
    <div id="plate--test"
        :class="{'st-open' : isOpen , 'st-hide' : !useTest}"
        ref="ref_root"
    >
        <div id="test__log">

            <router-link :to="this.$route.path === '/components' ? '/' : '/components'">
                {{ this.$route.path === '/components' ? '메인 페이지로' : '컴포넌트 페이지' }}
            </router-link>

            <br>

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

            <button @click="TEST_openConfirm1">
                open confirm
            </button>

            <button @click="TEST_addBanner">
                add banner
            </button>

            <br>

            <button @click="TEST_toggleAuthPlate">
                인증창 호출
            </button>

            <button @click="TEST_switchAuth">
                한방에 로그인/로그아웃
            </button>
<br>
            <button @click="$store.dispatch('openRoofAlert', {message: '안녕하세요? 토도영어 150년치 쿠폰을 드립니다!' , type: 'warning' ,time : 5})">
                roof alert!
            </button>
            <div>
                로그인 유무 :
                {{$store.state.$user.is_login}}
            </div>
            <br>
            <router-link to="/old_main">
                (구) 토도영어 메인
            </router-link>
            <br>
            <router-link to="/old_product">
                (구) 이용하기
            </router-link>
            <br>
            <router-link to="/old_curriculum">
                (구) 커리큘럼 안내
            </router-link>
            <br>
            <router-link to="/old_mypage/account">
                (구)계정 관리
            </router-link>
            <br>
            <router-link to="/old_mypage/study">
                (구)학습정보 열람
            </router-link>

            <div id="testlog1"></div>
            <div id="testlog2"></div>

        </div>

        <div id="test__open"
            @mousedown="grab"
            @mouseup="drop"
            @mousemove="drag"
        >
            {{isOpen ? 'close' : 'TEST'}}
        </div>


    </div>
</template>

<script>
import { randomOne } from '@/utils';
export default {
    data() {
        let useTest = false;

        useTest = true;

        return {
            useTest,

            rootRect : {},
            isGrab : false,
            isOpen : false,

            grabPoint : [0,0],

        }
    },
    methods : {

        TEST_switchAuth() {
            this.$store.dispatch('closeAuthPanel');

            if(this.$store.state.$user.is_login){

                this.$store.dispatch('openDialog' , {
                    message : '확인을 누르면 로그아웃 합니다',
                    actionResult : (result) => {
                        if(result){
                            this.$store.dispatch('signOut');
                        }
                    }
                })
            }else {

                const random = `test_random${Math.round(Math.random()* 100)}`;
                const region = randomOne('ko' , 'en', 'jp' , 'zh');
                this.$store.dispatch('openDialog' , {
                    type : 'confirm',
                    title : '한방에 로그인하기',
                    message : `
                        확인을 누르면 이렇게 로그인합니다.
                        <br> emailId : ${random}@gmail.com
                        <br> username : ${random}
                        <br> region : ${region}
                    `,
                    actionResult : (result) => {
                        if(result){
                            this.$store.dispatch('signInSuccess' , {
                                emailId : `${random}@gmail.com`,
                                username : `${random}`,
                                region : region,
                                accountId : "ACCOUNT_TEST",
                            });
                        }
                    },
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
            this.$store.dispatch('openDialog' , '비밀번호 변경을 위한 이메일을 발송하였습니다.<br/>메일함을 확인해주세요. (TEST)');
        },
        TEST_openAlert2(){
            const payload = {
                title : 'CUSTOM TITLE',
                message : 'MESSAGE',
                buttonConfirmText : 'CUSTOM BUTTON',
                actionResult : () => {
                    console.log('test alert close');
                }
            };
            this.$store.dispatch('openDialog' , payload);
        },
        TEST_openConfirm1() {
            const payload = {
                type : 'confirm',
                message : '테스트 : 확인 버튼을 누르면 홈 화면으로 이동합니다.',
                actionResult : (result) => {
                    if(result && this.$route.path !== '/'){
                        this.$router.push('/');
                    }
                },
            };
            this.$store.dispatch('openDialog' ,payload);
        },
        TEST_addBanner() {
            this.$store.dispatch('addBannerAlert' , 'hello' + Math.floor(Math.random() * 1000));
        },
        TEST_toggleAuthPlate() {
            if(this.$store.state.$auth.is_open){
                this.$store.dispatch('closeAuthPanel');
            }else {
                this.$store.dispatch('openAuthPanel');
            }

        },
        grab(e) {
            this.isGrab = true;
            const { clientX, clientY } = e;
            this.grabPoint = [clientX,clientY];
        },
        drop(e) {

            this.isGrab = false;

            const { clientX, clientY } = e;
            if(this.grabPoint[0] === clientX && this.grabPoint[1] === clientY){
                this.onoff();
            }

        },
        drag(e) {
            if(this.isGrab){
                const target = this.$refs.ref_root;
                target.style.left = e.clientX - 25 + 'px';
                target.style.top = e.clientY - 25 + 'px';

                localStorage.setItem('TESTMENUX' , e.clientX - 25);
                localStorage.setItem('TESTMENUY' , e.clientY - 25);
            }
        },
        onoff() {
            this.isOpen = !this.isOpen;
            localStorage.setItem('TESTMENUOPEN' , this.isOpen);
        }

    },
    mounted() {
        window.TEST_1 = document.querySelector('#testlog1');
        window.TEST_2 = document.querySelector('#testlog2');
        window.addEventListener('mousemove' , this.drag)

        this.isOpen = localStorage.getItem('TESTMENUOPEN') === "true";

        if(localStorage.getItem('TESTMENUX')){
            const target = this.$refs.ref_root;
            const x = localStorage.getItem('TESTMENUX');
            const y = localStorage.getItem('TESTMENUY');
            target.style.left = x + 'px';
            target.style.top = y + 'px';

            if(y > window.innerHeight - target.offsetHeight){
                target.style.top  = window.innerHeight - target.offsetHeight + 'px';
            }
            if(x > window.innerWidth - target.offsetWidth){
                target.style.left  = window.innerWidth - target.offsetWidth + 'px';
            }
        }

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
        top: 50% !important; left: -1px !important;
        transition: transform 200ms ease;

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
        writing-mode: vertical-rl;
        transform :translateY(-50%);
        // width: 30px;
        left: 100%;
        width: 18px;
        font-size: 12px;
        // color: transparent;
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