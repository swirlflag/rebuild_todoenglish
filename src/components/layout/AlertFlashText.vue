<template>
        <p  ref="ref_alert"
            :class="{'am-flash' : isFlash}"
            @animationend="finish"
            v-html="text"
        >

        </p>
</template>

<script>
export default {

    name: 'AlertFlashText',

    props : {
        text : null
    },

    data() {
        return {
            isFlash : false,
        }
    },
    methods : {
        flash() {
            if(this.isFlash){
                return
            }
            this.isFlash = true;
        },
        finish() {
            this.isFlash = false;
        },
    },

}
</script>


<style lang="scss" scoped>
@keyframes appearFlash {
    0% {opacity: 0.1;}
    15% {opacity: 1;}
    30% {opacity: 0.1;}
    45% {opacity: 1;}
    60% {opacity: 0.1;}
    75% {opacity: 1;}
    90% {opacity: 0.1;}
    100% {opacity: 1;}
}
.am-flash {
    animation: appearFlash 250ms steps(8, end) both;
}
</style>