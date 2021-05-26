<template>

    <div class="pagemission page--subscribe">

        <section class="subscribe__notice">
            <p>
                선택하기 전에 알려드립니다!
                <br>
                우리 무슨 이벤트 이런거 하고있어요 
            </p>
        </section>

        <section class="subscribe__header">
            <h1>
                {{$l.category_main_title}}
            </h1>
            <p>
            </p>
        </section>

        <br><br>
        <section class="subscribe__category">
            <p class="subscribe__category__title">
                {{$l.category_select_title}}
            </p>

            <div class="subscribe__category__radiobox">

                <template v-for="([key,values],idx) in Object.entries(refinePaymentData)">
                    <div    class="subscribe__category__radio"
                            :class="{'st-checked' : paymentOptions.category === key}"
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

            </div>

            <p class="subscribe__category__text" v-if="refineCategoryData.text">
                * {{refineCategoryData.text}}
                <br>
                <br>
                <span class="precaution">
                    -테스트: 선택한 결제 상품에 대해, 상품 타입(?) 및 결제 종류에 대한 간단한 설명줄-
                </span>
            </p>

        </section>
            <!-- refinePaymentData : {{refinePaymentData}} -->
            <br>
            <br>
            refineCategoryData : {{refineCategoryData}}
            <br>
            <br>
            this.paymentOptions : {{paymentOptions}}
            <br>
            <br>

        <section    class="subscribe__configure"
                    v-if="refineCategoryData"
                    :class="`category--${paymentOptions.category}`"
        >

            <div class="subscribe__configure__wrap" >

                <div    class="subscribe__status"
                        :class="`type--${paymentOptions.type}`"
                >

                    <div    class="subscribe__ticket"
                            v-if="paymentOptions.type === 'product'"
                    >

                        <div class="subscribe__ticket__side1">

                            <div class="subscribe__ticket__etc">
                                <span class="subscribe__ticket__logo"></span>
                                <span class="subscribe__ticket__lettering">TODO SCHOOL</span>
                            </div>

                            <div    class="subscribe__profilelength"
                                    :class="{'st-show' : !!paymentOptions.pick.profileLength}"
                            >
                                <TextChangeMask
                                    :text="paymentOptions.pick.profileLength ||'0'"
                                />
                                <span>
                                    개 프로필에 등록합니다.
                                </span>
                            </div>

                            <div class="subscribe__ticket__board">

                                <p class="subscribe__ticket__title">
                                    <TextChangeMask
                                        :text="refineCategoryData.name"
                                    />
                                </p>

                                <ul class="subscribe__ticket__list">
                                    <template v-for="(item,idx) in refineCategoryData.structure">
                                        <li     class="subscribe__ticket__text prefix--dot"
                                                v-if="paymentOptions.pick[item.key]"
                                                :key="idx"
                                        >
                                            <!-- {{paymentOptions.pick[item.key]}} -->
                                            <!-- {{item.statusText}} -->

                                            {{ item }}
                                        </li>
                                    </template>
                                </ul>

                                <div    class="subscribe__ticket__price"
                                        :class="{'st-show' : paymentOptions.result.price}"
                                >
                                    <TextChangeMask
                                        :text="paymentOptions.result.price && paymentOptions.result.price.toLocaleString()"
                                        speed="400"
                                        delay="150"
                                    />

                                    <span>
                                        {{$l.priceUnit}}
                                    </span>
                                </div>
                                <span class="subscribe__ticket__barcord"></span>
                            </div>

                        </div>

                        <span class="subscribe__ticket__cutline"></span>

                        <div class="subscribe__ticket__side2">
                            side2 :
                        </div>

                    </div>

                    <div    class="subscribe__etc-display"
                            v-if="paymentOptions.type === 'etc'"
                    >

                        {{refineCategoryData}}
                    </div>

                </div>

                <div class="subscribe__option">

                    <template v-for="(option,idx) in refineCategoryData.structure">

                        <div class="subscribe__configure__block" :key="`${paymentOptions.category}-${idx}`">
                            <p class="subscribe__configure__title">
                                {{ option.title }}
                            </p>

                            <span v-if="option.required">* required check</span>

                            <div class="subscribe__configure__radio">
                                <RadioCollection    v-model="paymentOptions.pick[option.key]"
                                                    :list="option.options.map(c => ({text : c.label , value : c.value}))"
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

            paymentOptions : {
                category : null,
                type : null,

                pick : {
                    // ...from paymentData.json
                },

                result : {
                    string : "",
                    price : null,
                },
            },

        }
    },
    computed : {

        region () {
            return this.$store.state.region;
        },

        $l() {
            return flatenRegionData(PageSubscribeData,this.region);
        },

        refinePaymentData(){
            let data = {};

            Object.entries(paymentData).map(([key,values]) => {
                const { reveal } = values;

                const isAll = (reveal === undefined) || (typeof reveal === 'boolean' && reveal);

                if(isAll){
                    data[key] = values;
                }else if(Array.isArray(reveal)){
                    if(reveal.indexOf(this.region) > -1){
                        data[key] = values;
                    }
                }
            });

            return flatenRegionData(data,this.region);
        },

        refineCategoryData() {
            return this.refinePaymentData[this.paymentOptions.category] || {};
        },


    },
    watch :{
        "region"() {
            this.watchRegion();
        },
        "paymentOptions.pick" :{
            deep : true,
            handler() {
                this.watchPaymentPick();
            },
        },
        "paymentOptions.category"() {
            this.watchSelectCategory();
        },
    },

    methods : {
        watchSelectCategory() {
            const { category } = this.paymentOptions;
            const type = category && this.refinePaymentData[category].type;

            this.paymentOptions.type = type;
            this.paymentOptions.pick = {};
            this.paymentOptions.result = {
                string : "",
                price : null,
            };
        },
        watchRegion() {
            if(!this.paymentOptions.category){
                return;
            }
            this.calcPaymentResult();
        },
        watchPaymentPick() {
            if(!this.refinePaymentData[this.paymentOptions.category]){
                this.paymentOptions.category = null;
                return;
            }
            this.calcPaymentResult();
        },
        selectCategory(category) {
            this.paymentOptions.category = category;
        },
        calcPaymentResult() {
            const string = this.assembleProductString();
            const price = this.refineCategoryData?.prices?.[string] || null;

            this.paymentOptions.result = {
                string, price
            };

        },
        assembleProductString() {
            let result = '';
            const { category } = this.paymentOptions;

            switch(category) {
                case ('todoenglish'):{
                    const { profileLength, monthPeriod } = this.paymentOptions.pick;

                    const stringProfileLength   =   profileLength   ?   `_${profileLength}profile`  : "";
                    const stringMonthPeriod     =   monthPeriod     ?   `_${monthPeriod}month`      : "";

                    result = `todoenglish${stringProfileLength}${stringMonthPeriod}`;
                    break;
                }
                case ('todohangul') : {
                    const { profileLength , monthPeriod } = this.paymentOptions.pick;

                    const stringProfileLength   =   profileLength   ?   `_${profileLength}profile`  : "";
                    const stringMonthPeriod     =   monthPeriod     ?   `_${monthPeriod}month`      : "";

                    result = `todohangul${stringProfileLength}${stringMonthPeriod}`;
                    break;
                }
                case ('todolive') : {
                    const { ticketLength } = this.paymentOptions.pick;

                    const stringTicketLength =  ticketLength  ?  `_${ticketLength}ticket` : "";

                    result = `todolive${stringTicketLength}`;
                    break;
                }
                case ('device') : {
                    const { deviceName } = this.paymentOptions.pick;

                    const stringDeviceName = deviceName ? `_${deviceName}` : "";

                    result = `device${stringDeviceName}`;
                    break;
                }
                default : {
                    break;
                }
            }

            return result;

        },

    },
    mounted() {
    },
}
</script>

<style scoped lang="scss" src="./PageSubscribe.scss"></style>


<!--
토도영어
    구독권
    워크시트?

토도한글
    구독권

토도수학
    구독권

토도라이브
    참여 티켓

디바이스
    갤럭시탭

-->
