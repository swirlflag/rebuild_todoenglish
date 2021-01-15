<template>
    <div class="auth__signout-check">

        <div class="auth__alert-area">

            <SpinnerColordotsWave   :isHide="!ongoing"
            />

            <AlertFlashText     ref="ref_flashAlert"
                                :text="alertDataMap[nowState]"
            />

        </div>

        <ButtonDefault  theme="pink"
                        :disable="ongoing"
                        @click="trySignout"
        >
            로그아웃 할게요!
        </ButtonDefault>

        <ButtonDefault  :disable="ongoing"
                        @click="closeAuth"
        >
            아니에요.
        </ButtonDefault>

    </div>
</template>

<script>

import ButtonDefault        from '@/components/button/ButtonDefault.vue';
import SpinnerColordotsWave from '@/components/spinner/SpinnerColordotsWave.vue';
import AlertFlashText       from '@/components/layout/AlertFlashText.vue';

export default {
    components : {
        ButtonDefault,
        AlertFlashText,
        SpinnerColordotsWave,
    },
    data() {
        return {
            ongoing : false,

            nowState : 'idle',
            alertDataMap : {
                idle                    : '',
                unknownError            : '알수 없는 에러가 발생했습니다.',
            },
        }
    },
    methods : {
        trySignout() {
            // 백엔드에서 로그아웃 로직이 있는지 확인하고 없으면
            // [시도 - 실행] 에서  =>  [실행] 으로 축소한다.
            this.sendSignout()
        },
        async sendSignout() {
            this.ongoing = true;

            // 가상 로그아웃 딜레이
            setTimeout(() => {
                this.ongoing = false;
                this.$emit('change-phase' , 'signoutSuccess');
                this.$store.dispatch('siginOut');
            },1000);
        },
        closeAuth() {
            this.$store.dispatch('closeAuthPanel');
        }
    }
}
</script>

<style scoped lang="scss">
.auth__signout-check {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    > * {
        border: 1px solid #d3d ;
        margin-top: 22px;
        @include phone {
            margin-top: 14px;
        }
        &:nth-child(1) {
            margin-top: 0;
        }
    }

    .auth__alert-area {
        width: 100%;
        // margin-bottom: 30px;
    }

    > .button--default {
        // margin-top: 20px;
    }

}
</style>