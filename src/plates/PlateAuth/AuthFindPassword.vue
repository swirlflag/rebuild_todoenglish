<template>
    <div class="auth__find-password">

        <form id="form-find-password" @submit.prevent>
            <InputDefault   placeholder="이메일"
                            id="form-find-password__id"
                            ref="ref_id"
                            type="email"
                            :mark="markEmail"
                            v-model="valueId"
                            @change="onInputEmail"
            />

            <div class="auth__alert-area">

                <SpinnerColordotsWave   :isHide="nowState !== 'loading'"
                />

                <AlertFlashText     ref="ref_flashAlert"
                                    :text="alertDataMap[nowState]"
                />

            </div>

            <ButtonDefault  theme="pink"
                            id="form-find-password__submit"
                            @click.prevent="trySerchId"
                            ref="ref_submit"
                            :disable="!validId"
            >
                인증 메일 보내기
            </ButtonDefault>

        </form>

    </div>
</template>

<script>
const API_trySignup = (id) => {
    {id}

    // (대충 아이디 확인하기)
    const serverResult = randomOne(
        {result : true , data : { id}},
        // {result: false, errorCode : 'UNUSE' },
        // {result: false, errorCode : 'CANT' },
    );

    return new Promise((resolve, reject) => {
        try {
            setTimeout(() => {
                resolve(serverResult);
            },1000)
        }catch(error) {
            reject(error);
        }
    })
}
{API_trySignup}

import { randomOne }  from '@/utils';
import AlertFlashText       from '@/components/layout/AlertFlashText.vue';
import ButtonDefault        from '@/components/button/ButtonDefault.vue';
import InputDefault         from '@/components/input/InputDefault.vue';
import SpinnerColordotsWave from '@/components/spinner/SpinnerColordotsWave.vue';


export default {
    components : {
        AlertFlashText,
        ButtonDefault ,
        InputDefault,
        SpinnerColordotsWave,
    },
    data() {
        return {
            isDestory : false,
            nowState : 'idle',
            alertDataMap : {
                idle                    : '',
                validFailEmail          : '올바른 이메일 형식을 입력해주세요.',

                unuseID                 : '가입되지 않은 이메일 입니다.',
                cantUseThisEmail        : '이 이메일은 사용할 수 없습니다.'
            },
            valueId : '',
            validId : false,
        }
    },
    computed : {
        markEmail() {
            return  this.nowState === 'validFailEmail'
                ||  this.nowState === 'unuseID'
                ||  this.nowState === 'cantUseThisEmail'
        },
    },
    methods : {
        onInputEmail(value, valid) {
            this.validId = valid;
            if(this.markEmail){
                this.stateToIdle();
            }
        },
        flashAlert() {
            this.$refs.ref_flashAlert.flash();
        },
        focusTarget(target) {
            if(this.$store.state.is_touchDevice){return}
            target.focus();
        },
        focusEmail(){
            this.focusTarget(this.$refs.ref_id.$refs.ref_input);
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
        stateToUnuseEmail() {
            this.nowState = 'unuseID';
            this.focusEmail();
            this.flashAlert();
        },
        stateToCantUseThisEmail() {
            this.nowState = 'cantUseThisEmail';
            this.focusEmail();
            this.flashAlert();
        },
        trySerchId() {

            if(this.nowState === 'loading'){
                return;
            }

            if(!this.validId){
                this.stateToVaildFailEmail();
                return;
            }

            this.$refs.ref_submit.$el.focus();
            this.$refs.ref_submit.$el.blur();

            this.stateToLoading();
            this.sendSerchId();

        },
        async sendSerchId(){
            const { result , errorCode , data } = await API_trySignup(this.valueId);
            if(this.isDestory){
                return null;
            }
            if(result){
                this.findPasswordSuccess(data);
            }else {
                this.findPasswordFail(errorCode);
            }
        },
        findPasswordSuccess() {
            this.$emit('change-phase' , 'findPasswordSuccess');
        },
        findPasswordFail(errorCode) {
            if(errorCode === 'UNUSE'){
                this.stateToUnuseEmail();
            }
            if(errorCode === 'CANT'){
                this.stateToCantUseThisEmail();
            }
        },

    },
    mounted() {
        this.focusEmail();
    },
    beforeDestroy() {
        this.isDestory = true;
    }
}
</script>

<style scoped lang="scss">
.auth__find-password {
    width: 100%;
}

#form-find-password {
    width: 100%;
    display: flex;
    flex-direction: column;

    > * {
        margin-top: 20px;
        &:nth-child(1) {
            margin-top: 0;
        }
    }

    #form-find-password__submit {
        margin-top: 40px;
    }

}
</style>