<template>
    <div>
        <div>
            로직 정리중/ 다국어X
            <br>
            <!-- {{SELECT}} -->
            <br>
            <br>
            renders.middle : {{ renders.middle }}
            <br>
            renders.option : {{ renders.option }}
            <br>
        </div>


        <div id="step1">

            <span class="title">
                대분류
            </span>

            <RadioCollection
                v-model="picks.category"
                :list="allData.map((c) => {
                    return c.name
                })"
            />

        </div>

        <div id="step2">
            <span class="title">
                중분류
            </span>

            <template v-for="(item,idx) in renders.middle">
                <div :key="idx" v-if="item">
                    <!-- <p> - {{item}}</p> -->
                    <RadioCollection
                        @change="(v) => {changeMiddleRadio(idx,v)}"
                        :list="item.map(c => c.name)"
                    />
                </div>
            </template>

        </div>

        <div id="step3">
            <span class="title">
                옵션 선택
            </span>


            <template v-for="(item,idx) in renders.option">
                <div :key="idx" v-if="item">
                    <p> - {{item.key}}</p>
                    <RadioCollection
                        :list="item.props.map(c => ({text: c.label , value : c.value}))"
                    />
                </div>
            </template>

        </div>
        {{picks.option}}

        <div class="logicimg">
            <img src="@/assets/temp/sublogic.png" alt="">
        </div>

        <RadioCollection v-if="0" :list="[]"/>

        <!-- {{renders}} -->

        <!-- {{renders.middle}} -->
        <br>
        <!-- {{renders.option}} -->

    </div>
</template>

<script>


import DATA from './paymentDataTEST.json';
import PRICEDATA from './pricesData.json';

import RadioCollection from '@/components/input/RadioCollection.vue';

import { flatenRegionData } from '@/utils';

const getmiddles = (children,depth = 0) => {
    // console.log(children);

    if(Array.isArray(children)){
        return children.map((c) => {
            if(c.options){
                return c.options
            }else {
                return getmiddles(c.children , ++depth);
            }
        });
    }else if(typeof children === 'object'){
        return 'no middle'
    }
}
{getmiddles}

export default {
    components : {
        RadioCollection,
    },
    data() {

        return {
            DATA,
            PRICEDATA,

            renders : {
                category : [],
                middlePoint : [],
                middle : [],
                option : [],
            },

            picks : {
                category : "",
                option : {

                }
            },

        }
    },
    computed : {
        region() {
            return this.$store.state.region;
        },
        allData() {
            return flatenRegionData(DATA, this.region);
        },
        allPrices() {
            return flatenRegionData(PRICEDATA, this.region );
        },
        nowCategory () {
            const index = this.allData.map(c => c.category).indexOf(this.picks.category);
            return this.allData[index] || {};
        },
    },

    watch : {
        "picks.category"() {
            this.watchCategoryChange();
        }
    },

    methods : {
        watchCategoryChange() {

            if(this.nowCategory.children.length > 1){
                this.renders.middle   = [this.nowCategory.children];
                this.renders.option  = [];
            }else {
                this.renders.middle   = [];
                this.renders.option  = this.nowCategory.children[0].options;
            }
        },

        focusChildren(max) {
            const endMax = max ? Math.min(this.renders.middlePoint.length, max) : this.renders.middlePoint.length;

            const loop = (obj,i) => ++i < endMax ? loop(obj.children[this.renders.middlePoint[i]],i) : obj;

            return loop(this.nowCategory,-1);
        },

        changeMiddleRadio(idx,v) {
            this.renders.middlePoint.splice(idx, 1, v.index);

            const focusIndex = idx + 1;

            const target = this.focusChildren(focusIndex);

            console.log(target);

            const name = target.name;

            this.picks.option[name] = name;

            if(target.children){
                this.renders.middle.splice(focusIndex,1,target.children);
                this.renders.option = [];

                // this.picks.option[]
            }else {
                this.renders.middlePoint = this.renders.middlePoint.slice(0, focusIndex);
                this.renders.middle = this.renders.middle.slice(0,focusIndex);
                this.renders.option = target.options;
            }

        }
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