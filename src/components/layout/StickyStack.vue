<template>
    <div class="sticky-stack">
        <div class="sticky-stack__flag"></div>
        <div class="sticky-stack__target">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name : 'StickyStack',
    props : {
    },
    data() {
        return {

        }
    }
}

export const stickyStackStore = {
    name : '$stickyStack',

    state : {
        stackList : [],
    },

}
</script>

<style lang="scss" scoped>
.sticky-stack {
    border: 1px solid #d3d;
    display: flex;
    flex-direction: column;
}

.sticky-stack__flag {
    width: 100%;
    height: 0;
    visibility: hidden;
    vertical-align: top;
    display: inline-block;
}
.sticky-stack__target{
    box-sizing: border-box;
    border: 1px solid #3d3;
}

</style>