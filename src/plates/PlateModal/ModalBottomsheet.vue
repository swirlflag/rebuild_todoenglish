<template>
    <ModalBox   type="bottomsheet"
                id="t-modal"

                v-if="1"
    >


        <!-- {{

            $store.$modal.node
        }} -->
        <div ref="ref_render" v-html="this.nowNode">


        </div>

    </ModalBox>
</template>

<script>
import ModalBox from '@/plates/PlateModal/ModalBox.vue';

export default {
    name : "ModalBottomsheet",

    components : {
        ModalBox,
    },
    render(h) {
        console.log(1);
        return h()
    },
    computed : {
        nowNode() {
            return this.$store.state.$modal.node;
        }
    },
    watch : {
        'nowNode'() {
            this.renderNode();
        }
    },
    methods : {
        renderNode() {
            console.log(this.nowNode);
        }
    },
    mounted() {
        console.log();
    },
}

export const modalBottomsheetStore = {
    // state : {
    //     node : null,
    // },
    // mutations : {
    //     fetchNode(state,node) {
    //         state.$modal.node = node;
    //     }
    // },
    // actions : {
    //     transmitNode(context, node) {
    //         context.commit('fetchNode', node);
    //     },
    // },
}

</script>

<style lang="scss" >
#t-modal {
    // border: 1px solid #3d3;
}
</style>