<template>
    <div>
        <div>
            로직 정리중/ 다국어X
            <br>
            middleChildrens : {{middleChildrens}}
            <br>
            SELECT.pick.options : {{ SELECT.pick.options }}
            <br>
        </div>


        <div id="step1">

            <span class="title">
                대분류
            </span>

            <RadioCollection
                v-model="SELECT.pick.category"
                :list="DATA.map((c) => {
                    return c.category
                })"
            />

        </div>

        <div id="step2">
            <span class="title">
                중분류
            </span>

            <template v-for="(item,idx) in middleChildrens">
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


            <template v-for="(item,idx) in SELECT.pick.options">
                <div :key="idx" v-if="item">
                    <p> - {{item.key}}</p>
                    <RadioCollection
                        :list="item.props.map(c => ({text: c.label , value : c.value}))"
                    />
                </div>
            </template>

        </div>

        <div class="logicimg">
            <img src="@/assets/temp/sublogic.png" alt="">
        </div>

        <RadioCollection v-if="0" :list="[]"/>

        <!-- {{SELECT.pick}} -->

        <!-- {{SELECT.pick.middle}} -->
        <br>
        <!-- {{SELECT.pick.options}} -->

    </div>
</template>

<script>


import DATA from './paymentDataTEST.json';

import RadioCollection from '@/components/input/RadioCollection.vue';

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

            SELECT : {
                pick : {
                    category : "",
                    middle :  [],
                    options : [],
                }
            },

            middleChildrens : [],
            middleNav : [],
            middlePoints : [],


        }
    },
    computed : {
        nowCategory () {
            const index = DATA.map(c => c.category).indexOf(this.SELECT.pick.category);
            return DATA[index] || {};
        },

    },

    watch : {
        'SELECT.pick.category'(){

            if(this.nowCategory.children.length > 1){
                this.SELECT.pick.middle = this.nowCategory.children;
                this.middleChildrens = [this.nowCategory.children];
                this.SELECT.pick.options = [];
            }else {
                this.middleChildrens = [];
                this.SELECT.pick.middle = [];
                this.SELECT.pick.options = this.nowCategory.children[0].options;
            }

        },

    },

    methods : {

        focusChildren(max) {

            let result = null;

            let i = -1;

            const endMax = max ? Math.min(this.middlePoints.length, max) : this.middlePoints.length;

            const loop = (child) => {
                ++i;
                // console.log(child[this.middlePoints[i]]);
                if(i < endMax){
                    return loop(child.children[this.middlePoints[i]]);
                } else {
                    return child;
                }
            }

            {loop}

            result = loop(this.nowCategory);

            // console.log(this.nowCategory.children);
            // console.log(result);

            return result;
        },

        changeMiddleRadio(idx,v) { {idx,v}

            this.middlePoints.slice(0, idx);
            this.middlePoints.splice(idx, 1, v.index);

            // console.log('middlePoints: ',  this.middlePoints);

            // this.middleChildrens.slice(0,idx);
            // this.middleChildrens.splice(idx,1,this.focusChildren());

            const focus = this.focusChildren(idx+1);

            if(focus.children){
                this.middleChildrens.slice(0,idx+1);
                this.middleChildrens.splice(idx+1,1,focus.children);
                this.SELECT.pick.options = [];
            }else {
                console.log('go option + ');
                this.middlePoints = this.middlePoints.slice(0, idx+1);
                this.middleChildrens = this.middleChildrens.slice(0,idx+1);

                this.SELECT.pick.options = focus.options;
            }

            // console.log(focuschildren);


        }
    }

}
</script>

<style lang="scss" scoped>

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

    max-width : 800px;
    margin: 0 auto;
    margin-top: 100px;
    img  {
        width: 100%; height: 100%;
        display: inline-block;
    }
}
</style>