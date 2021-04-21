<template>
    <div>

        <BottomSheet    v-model="isShowBottomSheet"
                        title="리뷰 페이지의 바텀시트?"

        >
            <TESTListSelect @select="isShowBottomSheet = false"/>
        </BottomSheet>

        <br>
        <br>
        <br>
        <br>
        <br>

        <div id="temp">

            <div class="layout">
                <h2 class="layout__escape">text 1</h2>
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

                    <ButtonDefault theme="green"
                                    @click="isShowBottomSheet = true"

                    >
                        바텀시트 테스트
                    </ButtonDefault>

            </div>

        </div>

    </div>
</template>

<script>

import ButtonDefault from '@/components/button/ButtonDefault.vue';
import BottomSheet from  '@/components/frame/BottomSheet.vue';
import TESTListSelect from '@/components/form/TESTListSelect.vue';

export default {
    name : 'PageReview',
    components : {
        ButtonDefault,
        BottomSheet,
        TESTListSelect,
    },
    data() {
        return {
            isShowBottomSheet : true,
        }
    },
    mounted() {
        // console.log('mounted : PageReview.vue');
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