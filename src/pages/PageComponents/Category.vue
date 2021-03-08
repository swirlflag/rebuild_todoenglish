<template>
    <div  class="tab__category" :class="{'st-open' : isOpen}">
        <div class="tab__category-name" @click="onClickCategoryName">
            {{ category.name }}
        </div>

        <div class="tab__list">
            <template v-for="(item, idx) in category.items">
                <div :key="idx" class="tab__item" @click="onClickItem(item)">
                    {{ item.name }}
                </div>
            </template>
        </div>

        <!-- <div class="tab__list">
            <div class="tab__item">요소</div>
            <div class="tab__item">요소</div>
            <div class="tab__item">요소</div>
        </div> -->
    </div>
</template>

<script>
export default {
    props : {
        category : Object,
    },
    data() {
        return {
            isOpen: false,
        }
    },
    methods : {
        onClickCategoryName() {
            this.isOpen = !this.isOpen;
        },
        onClickItem(item) {
            const payload = {
                category:this.category.name,
                item :item
            }
            this.$emit('select', payload);
        }
    }
}
</script>

<style>

</style>