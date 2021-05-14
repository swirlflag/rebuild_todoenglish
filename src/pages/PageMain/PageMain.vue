<template>

    <div class="pagemission page--main layout">
        <h1>PAGE : 메인</h1>
        <p>path : {{ $route.path }}</p>
        <p>@/src/pages/PageMain/PageMain.vue</p>
        <br>
        <p>토도스쿨에 대한 소개 혹은 토도스쿨에 포함된 서비스를 나열합니다.</p>
        <br>
        <div class="regiontest">
            <span>언어표시 테스트 : {{region}}</span>
            <div>
                {{$l.MAIN_TITLE}}
            </div>
            <p>
                {{$l.MAIN_CONTENT}}
            </p>
        </div>
    </div>

</template>

<script>
import mainContent from './mainContent.json';

export default {

    computed : {
        region() {
            return this.$store.state.region;
        },
        $l() {
            const result = {};
            Object.keys(mainContent).map(c => {
                result[c] = mainContent[c][this.region];
            });
            return result;
        },
    }
}
</script>

<style lang="scss" scoped>
.regiontest {
    color:dodgerblue;
    display: flex;
    flex-direction: column;
    border: 1px solid dodgerblue;

    > div {
        font-size: 40px;
        font-weight: 700;
    }
    > p{
        font-size: 20px;
    }
}
</style>