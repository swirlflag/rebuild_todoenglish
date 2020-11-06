<template>
    <div id="plate--test"
        :class="{'st-open' : isOpen}"
        ref="ref_root"
    >
        <div id="test__log">





            <button id="test_scrollock" @click="TEST_scrollock">scrollock</button>





        </div>


        <div id="test__open"
            @click="onoff"
            @mousedown="grab"
            @mouseup="drop"
            @mousemove="drag"
        >
            on/off
        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            rootRect : {},
            isGrab : false,
            isOpen : false,
        }
    },
    methods : {
        TEST_scrollock() {
            if(this.$store.state.is_pageScrollLock){
                this.$store.commit('SCROLL_unlock')
            }else {
                this.$store.commit('SCROLL_lock')
            }
        },
        grab() {
            this.isGrab = true;
        },
        drop() {
            this.isGrab = false;
        },
        drag(e) {
            {e}
            if(this.isGrab){
                const target = this.$refs.ref_root;
                target.style.left = e.clientX - 25 + 'px';
                target.style.top = e.clientY - 25 + 'px';
            }
        },
        onoff() {
            this.isOpen = !this.isOpen
        }

    },
    mounted() {

    }
}
</script>

<style scoped lang="scss">
#plate--test {
    background: rgba(0,0,0,0.9);
    color:rgb(0, 255, 0);

    position: fixed;
    top: 0; left: 0;
    z-index: 99999;
    &.st-open {
        border: 1px solid rgb(0, 255, 0);
        padding: 20px;
    }
    @include phone {
        font-size: 12px;
        padding : 20px !important;
        border: 1px solid rgb(0, 255, 0) !important;
        transform :translate(-100%,-50%) !important;
        top: 50%;

        &.st-open {
            border: 1px solid rgb(0, 255, 0) !important;
            transform :translate(0,-50%) !important;
        }
    }

}
#test__open {
    width: 50px; height: 50px;display: flex;
    justify-content: center; align-items: center;
    border: 1px solid rgb(0, 255, 0);
    cursor: pointer;
    position: absolute;top: -1px; left: -1px;
    z-index: 10;
    background: #000;

    @include phone {
        top: 50%;
        width: 30px;
        left: 100%;
    }

}
#test__log {
    position: relative;
    z-index: 1;
    min-width: 300px; min-height: 200px;
    margin-top: 50px;
    display: none;
    .st-open & {
        display: block;
    }
    @include phone {
        display: block !important;
        margin-top: 0;
        height: 50vh;
        min-width: 60vw !important;
    }
}

button {
    border: 1px solid rgb(0, 255, 0) !important;
    color: rgb(0, 255, 0) !important;
    padding: 5px;
}


</style>