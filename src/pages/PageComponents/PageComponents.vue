<template>
    <div>
        <div id="comp">
            <div id="comp-tab">
                <template v-for="(item,idx) in category">
                    <Category
                        :key="idx"
                        :category="item"
                        @select="selectComponent"
                    />
                </template>

            </div>

            <div id="comp-content">

                <div id="comp-component">
                    <template v-if="renderId === '버튼-기본' ">
                        <ButtonDefault>
                            버튼
                        </ButtonDefault>
                    </template>

                    <template v-if="renderId === '텍스트-제목' ">
                        render : 텍스트 - 제목
                    </template>
                </div>

            </div>

        </div>
    </div>

</template>

<script>
import Category from './Category.vue';
import categoryData from './categoryData.js';
import ButtonDefault from '@/components/button/ButtonDefault.vue';


export default {
    name : 'PageComponents',
    components : {
        Category,
        ButtonDefault,
    },
    data() {
        return {
            category : categoryData,

            currentItemData : {
                category : '',
                item : '',
            },
            renderId : '',
        }
    },
    methods : {
        onClickCategoryName() {
        },
        selectComponent(payload) {
            const { category, item } = payload;

            this.currentItemData.category = category;
            this.currentItemData.item = item;

            this.renderId = `${category}-${item.name}`;

            console.log(this.renderId);
        },
    },
    mounted() {


    }
}
</script>


<style src="./PageComponents.scss" lang="scss"></style>


<style lang="scss">
// 컴포넌트 페이지에서는 공용 네비게이션과 footer를 숨겨줍니다.
.page--components {
    #plate--navigation ,
    #plate--footer{
        opacity: 0 !important;
        pointer-events: none !important;
        user-select: none !important;
        height: 0 !important;
        overflow:hidden !important;
        * {
            pointer-events: none !important;
            user-select: none !important;
        }
    }
}

</style>
