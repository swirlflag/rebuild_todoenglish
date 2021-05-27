<template>
    <div>
adsdd으아아대가리가꺠지겟어요
        <div id="step1">

            <RadioCollection
                v-model="SELECT.pick.category"
                :list="DATA.map((c) => {
                    return c.category
                })"
            />

        </div>
        middleChildrens : {{middleChildrens}}
        <div id="step2">


            <template v-for="(item,idx) in middleChildrens">
                <div :key="idx" v-if="item">
                    <br>
                    <RadioCollection
                        @change="(v) => {changeMiddleRadio(idx,v)}"
                        :list="item.map(c => c.name)"
                    />
                </div>
            </template>

            <br>
            <br>


        </div>

        <div id="step3">

            {{ SELECT.pick.options }}
            <template v-for="(item,idx) in SELECT.pick.options">
                <div :key="idx" v-if="item">
                    <p> - {{item.key}}</p>
                    <br>
                    <RadioCollection
                        :list="item.props.map(c => ({text: c.label , value : c.value}))"
                    />
                </div>
            </template>

        </div>

        <RadioCollection v-if="0" :list="[]"/>

        <!-- {{SELECT.pick}} -->

        <!-- {{SELECT.pick.middle}} -->
        <br>
        <!-- {{SELECT.pick.options}} -->

    </div>
</template>

<script>


import DATA from './paymentDataNew.json';

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
                console.log('nope!!!!!!!!!!!!');
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
#step1 {
    background-color: rgb(165, 231, 42);
}
#step2 {
    background-color: rgb(231, 165, 42);
}
#step3 {
    background-color: rgb(42, 140, 231);

    p {
        font-weight: 700;
        color: #fff;
    }
}
</style>