<template>
    <section class="page-contents nav-correction">

        <CommonHeader
            class="curriculum-header"
            title="커리큘럼"
            :link="linkList"
        />

        <div class="curriculum-description area__outer">
            <div class="area__inner">
                <p>
                    토도영어의 커리큘럼은, Global Learning Xprize 대회 우승을 통해 세계 최고의 성과를 증명한 Enuma의 디지털 학습 방법론을 바탕으로 자체 개발되었습니다.
                </p>
                <ul class="dot-list precaution">
                    <li>
                        <a href="#" class="link-hover type-underline">Global Learning Xprize</a>&nbsp;
                        <span>는 Tesla의 Elon Musk가 후원한 전 세계 아동 문맹 퇴치를 위한 소프트웨어 경진대회입니다.</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="curriculum-title area__outer">
            <div class="area__inner">
                <h2>
                    Curriculum&nbsp;<TextChangeMask :text="curriculumTitle"/>
                </h2>
            </div>
        </div>

        <div class="area__container">
            <transition-group name="fade-left">

                <CurriculumMap v-if="nowRoute === '/map'" :key="'map'"/>

                <CurriculumObjectives v-if="nowRoute === '/objectives'" :key="'objectives'"/>

            </transition-group>
        </div>

        <div class="test">
            <div class="testinner">
                hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>hey<br>
            </div>
        </div>

    </section>
</template>

<script>

import CommonHeader from '@/components/layout/CommonHeader.vue';
import TextChangeMask from '@/components/layout/TextChangeMask.vue';
import CurriculumMap from './CurriculumMap.vue';
import CurriculumObjectives from './CurriculumObjectives.vue';

export default {
    components : {
        CommonHeader, TextChangeMask , CurriculumMap ,CurriculumObjectives
    },
    data() {
        return {
            nowRoute : '',
            linkList : [
                {
                    name : '커리큘럼 맵',
                    to : '/curriculum/map',
                },
                {
                    name : '학습 목표',
                    to : '/curriculum/objectives'
                },
            ]
        }
    },
    computed : {
        curriculumTitle () {
            switch (this.nowRoute) {
                case ('/map') : {return 'Map'}
                case ('/objectives') : {return 'Objectives'}
                default : {return ''}
            }
        }
    },
    watch :{
        '$route.path'() {
            this.getCurriculumPath();
        }
    },
    methods : {
        getCurriculumPath() {
            const path = this.$route.path.split('/curriculum')[1];
            this.nowRoute = path || '/map';
        },
    },
    created() {
        // console.log(1);
        this.getCurriculumPath();
    }
}
</script>

<style lang="scss" scoped >
@import './PageCurriculumStyle.scss';

.test {
    width: 60vw;height: 60vw;
    border: 1px solid #000;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    z-index: 10000;
}
</style>

<style >


</style>