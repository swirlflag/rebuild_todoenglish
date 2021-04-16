<template>
    <ModalBoxFrame      type="bottomsheet"
                        id="tttt-modal"

                        v-if="1"
    >
        hey..

    </ModalBoxFrame>
</template>

<script>
import ModalBoxFrame from '@/plates/PlateModal/ModalBoxFrame.vue';

export default {
    name : "ModalBottomsheet",

    components : {
        ModalBoxFrame,
    },

    mounted() {
        console.log();
    },
}

export const modalBottomsheetStore = {
    state : {
        node : null,
    },
    mutations : {
        fetchNode(state,node) {
            state.$modal.node = node;
        }
    },
    actions : {
        transmitNode(context, node) {
            context.commit('fetchNode', node);
        },
    },
}

</script>

<style lang="scss" >
#tttt-modal {
    // border: 1px solid #3d3;
    background: #d3d;
}
</style>