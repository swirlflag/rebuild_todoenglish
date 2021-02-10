<template>
    <div id="need-login" class="page-contents">

        <div class="layout">
            <div class="layout__content">
                <div>
                    <br>
                    <br>
                    route name : {{ $route && $route.name }}
                    <br>
                    <br>
                    <br>
                    로그인이 필요한 페이지 입니다.
                    <br>
                    로그인이 필요한 페이지 테스트중..
                </div>

                <div>
                    <ButtonDefault @click="openAuth">
                        로그인하기
                    </ButtonDefault>
                </div>

            </div>

        </div>

    </div>
</template>

<script>
import ButtonDefault from '@/components/button/ButtonDefault.vue';
export default {
    name : 'PageNeedLogin',
    components: {
        ButtonDefault,
    },
    methods : {
        openAuth() {
            this.$store.dispatch('openAuthPanel')
        }
    }
}
</script>

<style scoped lang="scss">
#need-login {
    border: 1px solid #d3d;
}
</style>