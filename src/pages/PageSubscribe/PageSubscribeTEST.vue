<template>
    <div>

        <div id="step1">

            <span class="title">
                대분류
            </span>

        </div>



        <div id="step2">
            <span class="title">
                중분류
            </span>

            <template v-for="(item, depth) in middleChildren">
                <div :key="depth">
                    <RadioCollection
                        @change="(v) => {changeMiddleRadio(depth,v.index)}"
                        :list="item.map(c => c.key)"
                    />
                </div>
            </template>


        </div>

        <div id="step3">
            <span class="title">
                옵션 선택
            </span>

        </div>

        <div class="logicimg">
            <!-- <img src="@/assets/temp/sublogic.png" alt=""> -->
        </div>

        <RadioCollection v-if="0" :list="[]"/>

        <!-- {{ allData }} -->

        <br>
        <br>
        middlePoint : {{middlePoint}}
        <br>
        middleChildren : {{middleChildren.map(c => c.map(c2 => c2.key))}}

    </div>
</template>

<script>


// import DATA from './paymentDataTEST.json';
// import PRICEDATA from './pricesData.json';

import NEWDATA from './new.json';

import RadioCollection from '@/components/input/RadioCollection.vue';

import { flatenRegionData } from '@/utils';

export default {
    components : {
        RadioCollection,
    },
    data() {

        return {
            // DATA,
            // PRICEDATA,
            NEWDATA,

            renders : {
                middlePoint : [],
                middle : [],
                option : [],
            },

            picks : {
                category : "",
                option : {

                }
            },

            middlePoint : [],
            middleChildren : [],

        }
    },
    computed : {
        region() {
            return this.$store.state.region;
        },
        allData() {
            return flatenRegionData(NEWDATA, this.region);
        },

    },

    watch : {

    },

    methods : {
        focusDepth(depthIndex) { {depthIndex}

            let result = null;
            let i = -1;
            const endMax = Math.min(this.middlePoint.length, depthIndex);

            console.log(endMax);

            const loop = (child) => {
                // typeof child === "Array" !!!!!!!!!!!!111
                ++i; {i}

                const targetchild = child[this.middlePoint[i]];

                if(i < endMax && targetchild.children){
                    return loop(targetchild.children)
                }else {
                    return targetchild
                }

            }

            {loop}

            result = loop(this.allData);

            return result;

        },

        changeMiddleRadio(depthIndex,itemIndex) { {depthIndex,itemIndex}

            this.middlePoint = this.middlePoint.slice(0, depthIndex);
            this.middlePoint.splice(depthIndex, 1, itemIndex);

            const target = this.focusDepth(depthIndex); {target}

            console.log('target : ', target);

            console.error(`
                아래 target.children 으로 분기하는것 isMiddle로 변경하고 렌더링 조건 제대로 만들기
                depthIndex 값 바르게 조작하기
                array 조작하는거 하나로 통일하기
                1번째만 대분류로 만들기
                옵션 렌더링하기
            `);

            if(target.children){
                console.log('more middle ~~~~~');
                // this.middleChildren.splice(depthIndex+1, 1, target);
                // this.middleChildren.slice(0,depthIndex+1);

                // if(target.children){
                    this.middleChildren = this.middleChildren.slice(0, depthIndex+1);
                    this.middleChildren.splice(depthIndex+1,1,target.children);
                // }
            }else {
                console.log('end and show option + ');

                this.middlePoint = this.middlePoint.slice(0, depthIndex+1);
                this.middleChildren = this.middleChildren.slice(0,depthIndex+1);
                // this.SELECT.pick.options = focus.options;
            }

        },
    },
    mounted() {
        // this.changeMiddleRadio(0,0)


        this.middleChildren = [this.allData];


        // this.middleChildren = this.allData.map(c => c.key);

        // console.log(object);

        // this.middleChildren.splice(0, 1, this.allData);
    }

}
</script>

<style lang="scss" scoped>

//
span.title {
    // border: 2px solid #000;
    background: #fff;
    font-weight: 700;
    font-weight: 20px;
    display: inline-block;
    // border-radius: 5px;
    padding: 5px;
    color: #d3d;
}

#step1 {
    background-color: rgb(165, 231, 42);
}
#step2 {
    background-color: rgb(231, 165, 42);
}
#step3 {
    background-color: rgb(100, 180, 255);

    p {
        font-weight: 700;
        color: #fff;
    }
}
.logicimg {
    margin-top: 100px;
    border: 1px solid #aaa;

    max-width : 900px;
    margin: 0 auto;
    margin-top: 100px;
    img  {
        width: 100%; height: 100%;
        display: inline-block;
    }
}
</style>