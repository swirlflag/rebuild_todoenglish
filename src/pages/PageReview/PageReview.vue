<template>
    <div>

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

                    <ButtonDefault theme="pink"

                    >
                        123
                </ButtonDefault>
            </div>

        </div>

    </div>
</template>

<script>

import ButtonDefault from '@/components/button/ButtonDefault.vue';
export default {
    name : 'PageReview',
    components : {
        ButtonDefault,
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