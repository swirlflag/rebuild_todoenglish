<template>
    <div class="list-select">
        <ul class="list-select__list">
            <template v-for="(item,idx) in tempList">
                <li     :key="item+idx"
                        @click="pick(idx)"
                        :class="{'st-select' : modelData.index === idx}"
                >
                    {{ item }}
                </li>
            </template>


        </ul>

        <div class="list-select__controls">
            <ButtonDefault  theme="pink"
                            @click="select"
            >
                결정하기
            </ButtonDefault>
        </div>
    </div>
</template>

<script>
import ButtonDefault from '@/components/button/ButtonDefault.vue';
export default {
    name : 'TESTListSelect',
    components : {
        ButtonDefault,
    },
    props : {
        index : Number,
        isShort : Boolean,
    },
    data() {

        const index = this.index !== undefined ? this.index : -1;

        let tempList = [
            'The Last of Us',
            'Horizon: Zero Dawn',
            'Monster Hunter World',
            'Death Stranding',
            'Dark Souls 3',
            'Detroit: Become Human',
            "Ghost of Tsushima",
            "Grand Theft Auto 5",
            "Red Dead Redemption 2",
            "Animal Crossing: New Horizons",
            "Celeste",
            "Hades",
            "Hollow Knight",
            "Stardew Valley",
            "The Legend of Zelda: Breath of the Wild",
        ];

        if(this.isShort){
            tempList = tempList.splice(0,3);
        }

        return {

            tempList,

            modelData : {
                value : '',
                index,
            }
        }
    },
    watch :  {

    },
    methods : {
        pick(index) {
            this.modelData.index = index;
            this.modelData.value = this.tempList[index];
        },
        select() {
            this.modelData.value = this.tempList[this.modelData.index];
            this.$emit('select' , this.modelData);
        }
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>

.float-sheet {

    .list-select__list {
        margin-top: 30px;
    }
    .list-select__list,
    .list-select__controls {
        padding-left: 30px;
        padding-right: 30px;
        // margin-bottom: 30px;

        @include phone {
            padding-left: $SIZE_MO_innerPadding;
            padding-right: $SIZE_MO_innerPadding;
        }
    }
}

.list-select {
    word-break: break-all;
    color: #000;
    background-color: #fff;
}

.list-select__list {
    display: flex;
    flex-direction: column;

    li {
        cursor: pointer;
        border: 2px solid #f5f5f5;
        border-radius: 10px;
        padding: 13px 15px;
        color: #333;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;

        @include phone {
            padding: $SIZE_MO_innerPadding ;
        }

        + li {
            margin-top: 7px;
        }

        &.st-select {
            font-weight: 700;
            color: #fff;
            background-color: $COLOR_pink_1;
            border-color: $COLOR_pink_1;

        }
    }

}

.list-select__controls {
    // border: 1px solid #000;
    position: sticky;
    // bottom: 30px;
    bottom: 0;
    // background: rgba(0,0,0,0.5);
    background-color: rgba(255,255,255,0.3);
    padding-top: 30px;
    padding-bottom: 30px;
    backdrop-filter: blur(15px);

    @include phone {
        // padding-top: $SIZE_MO_innerPadding;
        // padding-bottom: $SIZE_MO_innerPadding;
    }

    display: flex;
    justify-content: center;

    > button {
        width: 100%;
    }

}
</style>