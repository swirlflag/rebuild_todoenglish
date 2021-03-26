<template>
    <div class="input--dropdown"  v-bind:class="{'is--open' : openState}" ref="ref_root">
        <slot></slot>

        <div    class="dropdown__visual"
                v-bind:style="{width: `${width}px`, height : `${openState ? fullHeight : singleHeight}px`}" ref="ref_visual"
        >
            <div class="dropdown__display" ref="ref_display" v-on:click="toggle" v-html="selectText"></div>

            <div    class="dropdown__option" v-bind:style="{height : `${singleHeight}px`}"
                    v-for="(item, idx) in optionsData"
                    v-on:click="clickSelect"
                    v-bind:data-value="item.value"
                    v-bind:data-idx="idx"
                    v-bind:key="idx"
                    v-html="item.html"
            >

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'width', 'height' ],
    model: {
        prop: 'value',
        event: 'change'
    },
    data() {
        return {
            openState : false,
            optionsData : [],
            fullHeight : 0,
            singleHeight : 0,
            observer : null,

            el_options : null,
            el_select : null,
            selectItem : null,
            selectIndex : -1,
            selectVisual : null,
            beforeSelectVisual : null,
            selectText : '&nbsp;',
        }
    },
    watch :{
        selectItem() {
            if(!this.selectItem){
                return
            }
            if(this.beforeSelectVisual){
                this.beforeSelectVisual.classList.remove('is--select');
            }
            if(this.selectVisual){
                this.selectVisual.classList.add('is--select');
            }
            this.selectText = this.selectItem.innerHTML;
            if (this.beforeSelectVisual != null) {
                const value = this.selectItem.value;
                this.$emit('change', value , {
                    value,
                    target  : this.selectItem,
                    index   : +this.selectIndex,
                })
            }
            this.close();
        }
    },
    methods : {
        copyForm() {
            this.optionsData = [];

            const $el = this.$el;
            const $dropdown = this.$refs.ref_root;
            const $visual = this.$refs.ref_visual;
            const $display = this.$refs.ref_display;

            this.el_options = $el.querySelectorAll('option');
            this.el_select = $el.querySelector('select');
            this.selectText = this.el_select.getAttribute('placeholder') || '&nbsp;';

            for(let i = 0, l = this.el_options.length; i < l; ++i){
                const option = this.el_options[i];
                const value = option.getAttribute('value');
                const selected = !!option.getAttribute('selected');

                const html = option.innerHTML;

                if(selected){
                    this.selectIndex = i;
                }

                this.optionsData.push({value,html,selected});
            }

            this.singleHeight = this.height ? this.height : parseInt(getComputedStyle($display).height);
            this.fullHeight = (this.optionsData.length + 1) * this.singleHeight;

            $dropdown.style.height = this.singleHeight +'px';

            setTimeout(() => {
                $visual.style.transition = 'height 400ms cubic-bezier(0.25, 1, 0.5, 1)';
                if(this.selectIndex > -1){
                    this.select(this.selectIndex);
                }
            },0);

        },
        open() {
            this.openState = true;
        },
        close() {
            this.openState = false;
        },
        toggle() {
            this.openState = !this.openState
        },
        select() {
            const items = this.$refs.ref_visual.querySelectorAll('.dropdown__option');
            if(!items.length){
                return;
            }
            this.beforeSelectVisual = this.selectVisual;
            this.selectVisual = items[this.selectIndex];
            this.el_select.selectedIndex = this.selectIndex;
            this.selectItem = this.el_options[this.selectIndex];
        },
        clickSelect(e) {
            this.selectIndex = e.currentTarget.dataset.idx;
            this.select();
        },
        detectedDropdown(e) {
            const path = e.path;
            if(!path){
                return
            }
            let detect = false;
            for(let i = 0, l = path.length; i < l; ++i){
                if(path[i] === this.$refs.ref_root){
                    detect = true;
                }
            }
            if(!detect && this.openState){
                this.close();
            }
        }
    },
    created() {
        window.addEventListener('click' , this.detectedDropdown );
    },
    mounted() {

        this.copyForm();

        this.observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if(mutation.target && mutation.target.tagName === "SELECT"){
                    this.copyForm();
                }
            });
        });

        this.observer.observe(this.$refs.ref_root, {childList : true, subtree : true});

    },
    beforeDestroy() {
        this.observer.disconnect();
        window.removeEventListener('click',this.detectedDropdown );
    }
}
</script>
<style scoped lang="scss">
select {
    display: none;
}

.input--dropdown {
    z-index: 10;
    transition: height 0.3s ease;
    position: relative;
    letter-spacing: -1px;
    z-index: 99999;
    transition: z-index 1000ms ease;
    font-weight: bold;
}
.input--dropdown.is--open {
    z-index: 99999;
}

.dropdown__visual {
    box-sizing: border-box;
    // border-radius: 16px;
    border-radius: 8px;
    height: auto;
    overflow: hidden;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid $COLOR_navy_2;
}
.dropdown__display {
    position: relative;
}
.dropdown__display::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0; right: 8px;
    width: 15px; height: 99%;
    background-image: url("~@/assets/icon/icon_dropdown_arrow.svg");
    background-repeat: no-repeat;
    background-position: center 50%;
    background-size: 12px center;
    transition: transform 0.25s ease;
    box-sizing: border-box;
    transform: rotate(0deg);
}
.is--open .dropdown__display::before {
    transform: rotate(180deg);
}
.dropdown__display,
.dropdown__option {
    display: flex;
    align-items: center;
    padding-left: 16px;
    box-sizing: border-box;
    white-space: nowrap;
    transition: background-color 0.3s ease;
    padding: 20px 24px;
    padding: 15px;
    letter-spacing: 0;

    @include phone {
        padding: 32px 35px;
        padding: 16px;
    }
}

.dropdown__option {
    border-top: 1px solid  rgba(0, 0, 0, 0.08);
}

@mixin selectStyle {
    background-color: #372C77;
    background-color: $COLOR_navy_2;
    color: #fff;
}
.is--select {
    @include selectStyle;
}
.dropdown__option{
    @include hover {
        @include selectStyle;
    }
}

</style>