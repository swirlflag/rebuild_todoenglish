<template>

    <div class="page-contents use-bottom-margin">

        <CommonHeader
            class="mypage-header"
            :title="`${$store.state.username} 님`"
            :link="linkList"
        />

        <div class="mypage-content area__container">
            <transition-group name="fade-left">

                <Studyinfo v-if="nowRoute === '/study'" :key="'studyinfo'"/>

                <Account v-if="nowRoute === '/account'" :key="'account'"/>

            </transition-group>
        </div>

    </div>

</template>

<script>
import CommonHeader from '@/components/layout/CommonHeader.vue';
import Account      from './Account.vue';
import Studyinfo    from './Studyinfo.vue';

import { detectLastPath } from '@/utils';

export default {
    components : {
        CommonHeader,
        Studyinfo ,
        Account ,
    },
    data() {
        return {
            nowRoute : '',
            linkList : [
                {
                    name : '우리아이 학습 정보',
                    to : '/mypage/study',
                },
                {
                    name : '계정 정보',
                    to : '/mypage/account',
                },
            ]
        }
    },
    watch :{
        '$route.path'() {
            this.getChildPath();
        }
    },
    methods : {
        getChildPath() {
            this.nowRoute = detectLastPath('/mypage') || '/study';
        },
    },
    created() {
        this.getChildPath();
    }

}
</script>

<style lang="scss" scoped src="./PageMypageStyle.scss"></style>