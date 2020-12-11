<template>
    <div id="plate--setting">
        <!-- svg filter -->
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
            <filter id="gooey">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="gooey" />
                <feBlend in="SourceGraphic" in2="gooey" />
            </filter>
            </defs>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feBlend in="SourceGraphic" in2="goo" />
                </filter>
            </defs>
        </svg>
    </div>
</template>

<script>
export default {
    name : "PlateSetting",
}
</script>

<style lang="scss" scoped>
#plate--setting {
    width: 0; height: 0;
    display: none;
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
    background-color : transparent;
    font-size: 0;
    color:transparent;
}
</style>