<template>

    <header class="page-header" :class="{'st-open' : isOpen}" ref="ref_root" >
        <div class="page-header__inner" ref="ref_inner">

            <h1 class="header__title" ref="ref_title">
                {{ title }}
                <span class="header__openbutton" ref="ref_toggle" @click="toggle">
                    <span class="icon icon--arrow-simple" :class="`type-${isOpen ? 'top' : 'bottom'}`"></span>
                </span>
            </h1>

            <template v-if="link">
                <ul class="header__links" ref="ref_links" >
                    <li     v-for="(item, idx) in link"
                            :key="idx"

                    >
                        <template v-if="item.to">
                            <router-link :to="item.to" exact> {{ item.name }} </router-link>
                        </template>
                        <template v-else-if="item.href">
                            <a :href="item.href" target="_blank"> {{ item.name }} </a>
                        </template>
                    </li>

                    <span class="header__links-bar" ref="ref_linkbar"></span>
                </ul>
            </template>

            <span class="header__line"></span>

        </div>

        <div class="page-header__dimmed" @click="close"></div>

    </header>

</template>

<script>

export default {
    props : {
        breadcrumb : Array,
        link : Array,
        title: String,
    },
    data() {
        return {
            isOpen : false,

            closeHeight : 0,
            openHeight : 0,

        }
    },
    watch : {
        '$route.path'() {
            this.close();
            this.animateUnderline();
        },
    },
    methods: {
        open() {
            this.$refs.ref_inner.style.height = this.openHeight + 'px';
            this.isOpen = true;
        },
        close(){
            this.$refs.ref_inner.style.height = this.closeHeight + 'px';
            this.isOpen = false;
        },
        animateUnderline() {
            setTimeout(() => {
                const target = this.$refs.ref_links.querySelector('a.router-link-active');

                if(!target){
                    return;
                }
                const targetRect = target.getBoundingClientRect();

                this.$refs.ref_linkbar.style.transform  = `translate3d(${target.offsetLeft}px,0,0)`;
                this.$refs.ref_linkbar.style.width      = `${targetRect.width+1}px`;

            },20);
        },

        toggle() {
            if(this.isOpen){
                this.close();
            }else {
                this.open();
            }
        },
        calcHeight () {
            if(!this.$refs.ref_links || window.innerWidth > 768){
                return
            }

            this.$refs.ref_links.classList.add('d-n');
            this.$refs.ref_links.classList.add('op-0');

            const closeRect = this.$refs.ref_root.getBoundingClientRect();

            this.closeHeight = closeRect.height;

            this.$refs.ref_links.classList.remove('d-n');

            const openRect = this.$refs.ref_root.getBoundingClientRect();
            this.openHeight = openRect.height;
            this.$refs.ref_links.classList.remove('op-0');

            this.close();

            window.removeEventListener('resize' , this.calcHeight);

        }
    },
    created() {

    },
    mounted() {
        if(window.innerWidth <= 768){
            this.calcHeight();
        }else {
            window.addEventListener('resize' , this.calcHeight);
        }
        this.animateUnderline();
    }
}
</script>

<style lang="scss" scoped>


.page-header {
    z-index: 100;
    // padding-top: 30px;
    position: relative;
    position: sticky;
    top: 113px;
    background: rgba(255,255,255,0.97);
    text-shadow: 0 2px 3px #fff;
    font-size: 16px;

    @include phone {
        padding-top: 0;
        top: 84px;
        @include hardSelect {
            font-size: 16px;
        }
    }

}

.page-header__inner  {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        position: relative;
        flex-wrap: wrap;
        width: $SIZE_PC_contentWidth;
        padding: 30px $SIZE_PC_innerPadding 0 ;
        margin: 0 auto;
        z-index: 2;

        @include overPhone {
            height: auto !important;
        }

        @include phone {
            overflow: hidden;
            transition: height 450ms $EASE_outExpo ;
            padding: 20px $SIZE_MO_innerPadding;
            width: 100%;
            border-bottom: 1px solid #e6e6e6;
            background-color: #fff;
        }
    }

    .page-header__dimmed {
        overflow: hidden;
        position: absolute;
        width: 100vw; height: 100vh;
        top: 0;left: 0;
        z-index: 1;
        background: rgba(0,0,0,0.5);
        opacity: 0;
        pointer-events:  none;
        transition: opacity 400ms ease;

        @include overPhone {
            display: none;
        };

        .st-open & {
            pointer-events: all;
            opacity : 1;
            display: block;
        }
    }

    .header__line {
        width: 100%;
        height: 2px;
        left: 0;
        margin-top: 20px;
        display: inline-block;
        background-color: $COLOR_navy_2;
        align-self : bottom;

        @include phone {
            position: absolute;
            width: 100vw;
            bottom: 0;
            display: none;
        }
    }
    .header__title {
        width: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 22px;
        font-weight: 700;
        @include phone {
            width: 100%;
            font-size: 18px;
        }
        .header__openbutton {
            @include overPhone  {
                display: none;
            }
            @include phone {
                display: flex;
                flex-direction: column;
                width: 26px; height: 26px;
                margin-left: auto;
                overflow: hidden;
            }

            .icon--arrow-simple {
                width: 100%;    height: 100%;
            }
        }
    }

    .header__links {
        display: flex;
        margin-left: auto;
        position: relative;

        @include phone {
            // position: absolute;
            width: 100%;
            // top: 100%;
            // left: 0;
            flex-direction: column;
            margin-top: 20px;
            padding: 0 $SIZE_MO_innerPadding ;
        }

        li {
            & + li {
                margin-left: 70px;

                @include phone {
                    margin-top: 10px;
                    padding-top: 10px;
                    margin-left: 0;
                    border-top: 1px solid #e6e6e6;
                }
            }

            a {
                @include phone {
                    padding: 10px 0;
                }
            }
        }

        .header__links-bar {
            position: absolute;
            width: 100%;
            height: 3px;
            left: 0;
            bottom: 0;
            background: $COLOR_navy_1;
            transition: transform 400ms $EASE_outQuart, width 200ms $EASE_outCubic;
            @include phone {
                 display: none;
            }
        }
    }

    .header__breadcrumb {

    }

.router-link-active {
    font-weight: 700;
}

</style>