<template>

    <div class="pagemission page--subscribe">

        <section class="subscribe__notice">
            <!-- <p>
                선택하기 전에 알려드립니다!
            </p> -->
        </section>

        <section class="subscribe__header">
            <h1>
                {{$l.category_main_title}}
            </h1>
            <p>

            </p>
        </section>

        {{categorys}}
        <section class="subscribe__category">
            <p class="subscribe__category__title">
                {{$l.category_select_title}}
            </p>

            <div class="subscribe__category__radiobox">

                <!-- <div class="subscribe__category__radio" @click="selectCategory('이벤트')">
                    <span class="subscribe__category__radio__source item--event">
                        토도영어 12개월
                        <br>+
                        <br>토도한글 12개월
                    </span>
                    <p class="subscribe__category__radio__name">이벤트 패키지!</p>
                </div> -->

                <template v-for="([key,values],idx) in Object.entries(categorys)">
                    <div    class="subscribe__category__radio"
                            :class="{'st-checked' : pickPaymentOptions.category === key}"
                            @click="selectCategory(key)"
                            :key="`${key}-${idx}`"
                    >
                        <span   class="subscribe__category__radio__source"
                                :class="`item--${key}`"
                        >
                            <span></span>
                            <span></span>
                        </span>
                        <p class="subscribe__category__radio__name">
                            {{ values.name }}
                        </p>

                    </div>

                </template>

                {{refinePaymentData}}
            </div>

        </section>

        <!-- <section class="subscribe__configure"> -->
            {{pickPaymentOptions}}
            <br>
            <br>

        <section    class="subscribe__configure"
                    v-if="refinePaymentData.isShow"
                    :class="`type--${pickPaymentOptions.category}`"
        >

            <div class="subscribe__configure__wrap" >

                <div class="subscribe__status">

                    <div    class="subscribe__ticket"
                            v-if="pickPaymentOptions.type === 'product'"
                    >

                        <div class="subscribe__ticket__side1">

                            <div class="subscribe__ticket__etc">
                                <span class="subscribe__ticket__logo"></span>
                                <span class="subscribe__ticket__lettering">TODO SCHOOL</span>
                            </div>

                            <div    class="subscribe__profilelength"
                                    :class="{'st-show' : !!pickPaymentOptions.profileLength}"
                            >
                                <TextChangeMask
                                    :text="pickPaymentOptions.profileLength ||'0'"
                                />
                                <span>
                                    개 프로필에 등록합니다.
                                </span>
                            </div>

                            <div class="subscribe__ticket__board">

                                <p class="subscribe__ticket__title">
                                    <TextChangeMask
                                        :text="refinePaymentData.name"
                                    />
                                </p>

                                <div class="subscribe__select-">

                                </div>
                                <span class="subscribe__ticket__barcord"></span>
                            </div>

                        </div>

                        <span class="subscribe__ticket__cutline"></span>

                        <div class="subscribe__ticket__side2">
                            side2
                        </div>

                    </div>

                </div>

                <div class="subscribe__option">
                    

                    <template v-for="(item,idx) in refinePaymentData.structure">

                        <div class="subscribe__configure__block" :key="`${pickPaymentOptions.category}-${idx}`">
                            <p class="subscribe__configure__title">
                                {{ item.title }}
                            </p>

                            <div class="subscribe__configure__radio">
                                <RadioCollection    v-model="pickPaymentOptions[item.key]"
                                                    :list="item.options.map(c => ({text : c.label , value : c.value}))"
                                                    type="flat"
                                />
                            </div>
                        </div>
                    </template>

                </div>
            </div>
        </section>

    </div>

</template>

<script>

import TextChangeMask from '@/components/display/TextChangeMask.vue';
import RadioCollection from '@/components/input/RadioCollection.vue';
import { flatenRegionData } from '@/utils';

import paymentData from './paymentData.json';
import PageSubscribeData from './PageSubscribeData.json';




export default {
    components : {
        RadioCollection,
        TextChangeMask,
    },
    data() {
        return {

            pickPaymentOptions : {
                category : null,
                type : null,
            },

        }
    },
    computed : {
        // product

        region () {
            return this.$store.state.region;
        },

        $l() {
            return flatenRegionData(PageSubscribeData,this.region);
        },

        categorys() {
            const result = {};
            Object.entries(paymentData).map(([k,v]) => {
                const name = v.name[this.region];
                if(name){
                    result[k] = {
                        key : k,
                        name,
                        type : v.type,
                    }
                }
            });
            return result;
        },

        refinePaymentData(){
            const pickCategory = this.pickPaymentOptions.category;
            if(pickCategory){
                const result = flatenRegionData(paymentData[pickCategory],this.region);

                // result.isShow = this.categorys.map(c => c.category).indexOf(this.pickPaymentOptions.category) > -1;

                result.isShow = !!this.categorys[pickCategory];

                return result;
            }else {
                return {}
            }
        },
    },

    methods : {
        log(v){
            console.log(v)
        },
        selectCategory(category) {
            if(this.pickPaymentOptions.category === category){

                {123}
                // this.pickPaymentOptions = {
                //     category : null,
                //     type : null,
                // }
            }else {
                this.pickPaymentOptions = {
                    category,
                    type : this.categorys[category].type,
                }
            }
        },
        makeCategorySwiper() {
            const options = {

            };

            const swiper = new this.$swiper(this.$refs.ref_swiper, options)
            {swiper}
        },
    },
    mounted() {
        // this.makeCategorySwiper();
    },
}
</script>

<style scoped lang="scss" src="./PageSubscribe.scss"></style>
