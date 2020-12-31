<template>

    <div class="auth__signup-email">

        <form id="form-signup">

            <InputDefault   type="email"
                            placeholder="이메일"
                            id="form-signup__id"
                            ref="ref_id"
                            v-model="value.id"
                            :mark="markEmail"
                            @change="onInputEmail"
            />

            <InputDefault   type="password"
                            placeholder="비밀번호"
                            id="form-signup__password"
                            ref="ref_password"
                            v-model="value.password"
                            :mark="markPassword"
                            @change="onInputPassword"
            />

            <InputDefault   type="password"
                            placeholder="비밀번호 확인"
                            id="form-signup__password-match"
                            ref="ref_passwordMatch"
                            v-model="value.passwordMatch"
                            @change="onInputPasswordMatch"
            />


            <div id="form-signup__alert">

                <SpinnerColordotsWave   :isHide="nowState !== 'loading'"
                />

                <AlertFlashText     ref="ref_flashAlert"
                                    :text="alertDataMap[nowState]"
                />

            </div>

            <ButtonDefault  theme="pink"
                            id="form-signup__submit"
                            @click.prevent="trySignup"
                            :disable="!isValidAllclear"
                            ref="ref_submit"
            >
                가입하기
            </ButtonDefault>

        </form>
    </div>
</template>

<script>
const API_trySignup = (signData = {id: '' , password : ''}) => {

    const { id, password } = signData;
    {id,password}
    // (대충 siginData로 서버랑 통신하는코드)

    // (대충 랜덤으로회원가입 시도하기)
    const serverResult = randomOne(
        {result : true , data : {}},
        {result: false, errorCode : 'USE' },
        {result: false, errorCode : 'CANT' },
    );

    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(serverResult);
            },2000)
        }catch(error) {
            reject(error);
        }
    })
}
{API_trySignup}
import { randomOne} from '@/utils';
import InputDefault         from '@/components/input/InputDefault.vue';
import ButtonDefault        from '@/components/button/ButtonDefault.vue';
import SpinnerColordotsWave from '@/components/spinner/SpinnerColordotsWave.vue';
import AlertFlashText       from '@/components/layout/AlertFlashText.vue';

export default {
    name: 'AuthSignup',
    components : {
        InputDefault ,
        ButtonDefault ,
        SpinnerColordotsWave ,
        AlertFlashText
    },
    data() {
        return {
            isDestory : false,
            nowState : 'idle',

            alertDataMap : {
                idle                    : '',
                validFailEmail          : '올바른 이메일 형식을 입력해주세요.',
                validFailPassword       : '비밀번호를 입력해주세요.',
                validFailPasswordMatch  : '비밀번호와 확인란이 일치하지 않습니다.',

                useAlreadyEmail         : '이미 사용중인 이메일 입니다.',
                cantUseThisEmail        : '이 이메일은 사용할 수 없습니다.'
            },

            value : {
                id              : '',
                password        : '',
                passwordMatch   : '',
            },

            valid : {
                id              : false,
                password        : false,
                passwordMatch   : false,
            },
        }
    },
    computed : {
        isValidAllclear() {
            return Object.values(this.valid).indexOf(false) === -1;
        },
        markEmail() {
            return  this.nowState === 'validFailEmail'
                ||  this.nowState === 'useAlreadyEmail'
                ||  this.nowState === 'cantUseThisEmail'
        },
        markPassword() {
            return  this.nowState === 'validFailPassword'
                ||  this.nowState === 'validFailPasswordMatch'
        }
    },
    methods : {
        focusEmail() {
            this.$refs.ref_id.$refs.ref_input.focus();
        },
        focusPassword() {
            this.$refs.ref_password.$refs.ref_input.focus();
        },
        focusPasswordMatch() {
            this.$refs.ref_passwordMatch.$refs.ref_input.focus();
        },
        onInputEmail(value, valid) {
            this.valid.id = valid;
            if(this.markEmail){
                this.stateToIdle();
            }
        },
        onInputPassword(value) {
            this.valid.password = !!value;
            this.valid.passwordMatch = value === this.value.passwordMatch;
            if(this.markPassword){
                this.stateToIdle();
            }
        },
        onInputPasswordMatch(value) {
            this.valid.passwordMatch = value === this.value.password;
            if(this.markPassword){
                this.stateToIdle();
            }
        },
        flashAlert() {
            this.$refs.ref_flashAlert.flash();
        },
        validCheck() {
            if(!this.valid.id){
                this.stateToVaildFailEmail();
                return
            }
            if(!this.valid.password){
                this.stateToVaildFailPassword();
                return
            }
            if(!this.valid.passwordMatch){
                this.stateToVaildFailPasswordMatch();
                return
            }

        },
        signupSuccess() {
            this.$emit('change-phase' , 'signupSuccess');
        },
        signupFail(errorCode) {
            if(errorCode === 'USE'){
                this.stateToUseAlreadyEmail();
            }
            if(errorCode === 'CANT'){
                this.stateToCantUseThisEmail();
            }
        },

        async sendSignup() {
            const { result , errorCode , data } = await API_trySignup(this.value);
            if(this.isDestory){
                return null;
            }
            if(result){
                this.signupSuccess(data);
            }else {
                this.signupFail(errorCode);
            }
        },

        trySignup() {

            if(this.nowState === 'loading'){
                return;
            }

            if(!this.isValidAllclear){
                this.validCheck();
                return;
            }

            this.$refs.ref_submit.$el.focus();
            this.$refs.ref_submit.$el.blur();

            this.stateToLoading();
            this.sendSignup();

        },

        stateToIdle() {
            this.nowState = 'idle';
        },
        stateToLoading() {
            this.nowState = 'loading';
        },
        stateToVaildFailEmail() {
            this.nowState = 'validFailEmail';
            this.focusEmail();
            this.flashAlert();
        },
        stateToVaildFailPassword() {
            this.nowState = 'validFailPassword';
            this.focusPassword();
            this.flashAlert();
        },
        stateToVaildFailPasswordMatch() {
            this.nowState = 'validFailPasswordMatch';
            this.focusPassword();
            this.flashAlert();
        },
        stateToUseAlreadyEmail() {
            this.nowState = 'useAlreadyEmail';
            this.focusEmail();
            this.flashAlert();
        },
        stateToCantUseThisEmail() {
            this.nowState = 'cantUseThisEmail';
            this.focusEmail();
            this.flashAlert();
        }

    },
    mounted() {

    },
    isDestory() {
        this.isDestory = true;
    }
}
</script>

<style lang="scss" scoped>

.auth__signup-email {
    width: 100%;
}


#form-signup {
    width: 100%;
    width: auto;
    display: flex;
    flex-direction: column;

    > * {
        margin-top: 20px;
        &:nth-child(1) {
            margin-top: 0;
        }
    }
    #form-signup__alert {
        height: 30px;
        color: $COLOR_pink_1;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: auto;

        .spinner--colordots {
            position: absolute;
            width: 100%; height: 100%;
        }

    }

    #form-signup__submit {
        margin-top: 40px;
    }


}
</style>