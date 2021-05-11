<template>
    <div>

        <FloatSheet     v-model="isShowFloatSheet"
                        :point="$refs.ref_point"
                        title="일반페이지 바텀시트 테스트"

        >
            <TESTListSelect @select="isShowFloatSheet = false" />
        </FloatSheet>


        <div id="temp">

            <div class="layout">
                <h2 class="layout-escape">text 1</h2>
                <h2>text 222</h2>

                <ul class="list--dot">
                    <li class="precaution">안녕하세요</li>
                    <li>안녕하세요</li>
                    <li>안녕하세요</li>
                    <li>안녕하세요</li>
                </ul>
                <p class="precaution">안녕하세요</p>
                <p class="prefix--asterisk">주의사항!</p>
                <p class="prefix--dot">middle dot</p>

                <ButtonDefault theme="green">
                    NOTHING
                </ButtonDefault>
                <br>

                <ButtonDefault theme="pink" @click="isShowFloatSheet = true" ref="ref_point">
                    OPEN !
                </ButtonDefault>
                <br>scroll
                <br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll<br>scroll
                

            </div>

        </div>

    </div>

</template>

<script>

import ButtonDefault from '@/components/button/ButtonDefault.vue';
import FloatSheet from  '@/components/frame/FloatSheet.vue';
import TESTListSelect from '@/components/testcomp/TESTListSelect.vue';

export default {
    name : 'PageReview',
    components : {
        ButtonDefault,
        FloatSheet,
        TESTListSelect,
    },
    data() {
        return {
            isShowFloatSheet : false,
            pointElement : null,
        }
    },
    methods : {

    },

    mounted() {
        // console.log(this.$refs.ref_point);
    }
}
</script>
<style lang="scss" scoped src="./PageReviewStyle.scss"></style>

<style lang="scss" scoped>
#temp {
    // margin-top: 500px;
    // height: 1px;
    // background-color: #d3d;
}


</style>