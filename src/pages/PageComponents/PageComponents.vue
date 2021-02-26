<template>
    <div>
        <div id="comp">
            <div id="comp-tab">
                <div class="tab__category">
                    <div class="tab__category-name">범주</div>
                    <div class="tab__list">
                        <div class="tab__item">요소</div>
                        <div class="tab__item">요소</div>
                        <div class="tab__item">요소</div>
                    </div>
                </div>
                <div class="tab__category">
                    <div class="tab__category-name">범주</div>
                    <div class="tab__list">
                        <div class="tab__item">요소</div>
                        <div class="tab__item">요소</div>
                        <div class="tab__item">요소</div>
                    </div>
                </div>

            </div>
            <div id="comp-content">
                아이템
            </div>

        </div>
    </div>

</template>

<script>
export default {
    name : 'PageComponents',
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
