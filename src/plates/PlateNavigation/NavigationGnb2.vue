<template>
    <div class="nav-gnb">
        <div class="nav-gnb__wrap">

            <router-link to="/" class="nav-gnb__logo">
                <span class="icon icon--logoschool"></span>
            </router-link>

            <div class="nav-gnb__menubutton">button</div>
        </div>

    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$navh : 68px;
.nav-gnb{
    background-color: rgb(69, 177, 177, 0.2);
    height : $navh;
}

.nav-gnb__wrap {
    border: 1px solid #d3d;
    max-width : $SIZE_PC_contentWidth;
    margin: 0 auto;
    padding: 0 $SIZE_PC_innerPadding ;
    box-sizing: border-box;
    height: 100%;
    display: flex;
}

.nav-gnb__logo {
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;

    .icon {

        border: 1px solid #000;
        width: 50px ; height: 50px;
    }
}

.nav-gnb__menubutton {
    margin-left: auto;
}
</style>