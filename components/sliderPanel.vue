<template>
    <client-only>
        <div ref="root" class="slide-panel" :class="[position,{'slide-panel__fixed': fixed, 'slide-panel__shadow': shadow, 'slide-panel__noheader': !hasHeader}]" :style="style">
            <slot name="header">
                <div class="slide-panel__header" v-if="title">
                    {{title}}
                    <i class="el-icon-close slide-panel__close" @click="handleClose"></i>
                </div>
            </slot>
            <div class="slide-panel__body">
                <slot></slot>
            </div>
            <el-button v-if="slideButton" :style="btnStyle" @click="$emit('update:visible', !visible)" type='primary' class="slide-panel-button" :icon="icon"></el-button>
        </div>
    </client-only>
</template>
<script>
export default {
    name: 'slider-panel',
    data() {
        return {}
    },
    props: {
        width: {
            type: String,
            default: '300px'
        },
        title: String,
        visible: {
            type: Boolean,
            default: false
        },
        duration: {
            type: Number,
            default: 300
        },
        position: {
            type: String,
            default: 'left' //top/bottom/left/right
        },
        shadow: {
            type: Boolean,
            default: false
        },
        fixed: {
            type: Boolean,
            default: false
        },
        slideButton: {
            type: Boolean,
            default: false
        },
        icon: {
            type: String,
            default: "my-icon-filter"
        }
    },
    watch: {
        visible(val) {
            if (val) {
                this.open();
            } else {
                this.close();
            }
        }
    },
    mounted() {
        this.$nextTick(_ => {
            this.init()
        })
    },
    computed: {
        style() {
            let style = {};
            if (this.width) {
                style.width = this.width;
            }
            return style;
        },
        btnStyle() {
            return {
                top: "10px",
                [this.position]: '100%',
                [`border-top-${this.position}-radius`]: 0,
                [`border-bottom-${this.position}-radius`]: 0
            }
        },
        hasHeader() {
            return this.$slots.header || this.title
        }
    },
    methods: {
        init: function () {
            let el = this.$refs.root;
            el.style[`margin${_.capitalize(this.position)}`] = `-${this.width}`;
            if (this.visible) this.open()
        },
        open: function () {
            let el = this.$refs.root;
            this.$global.addClass(el, 'visible');
        },
        close: function () {
            let el = this.$refs.root;
            this.$global.removeClass(el, 'visible');
        },
        handleClose() {
            this.$emit('update:visible', false);
            this.$emit('close');
        }
    }
}

</script>
<style lang="scss" scoped>
.slide-panel {
    height: 100%;
    width: 300px;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    flex-shrink: 0;
    z-index: 3;
    margin-left: -300px;
    transition: all 0.2s;
    &.visible {
        // sam.shen modify
        margin: 0 !important;
    }
    &.slide-panel__noheader {
        .slide-panel__body {
            height: 100%;
        }
    }
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding: 0 20px;
        color: #666;
        font-weight: bold;
        font-size: 14px;
        box-sizing: border-box;
        border-bottom: $border-base;
        i {
            font-size: 16px;
            cursor: pointer;
            color: #ccc;
        }
    }
    &__body {
        overflow: auto;
        height: calc(100% - 40px);
    }
    &__fixed {
        top: 82px;
        z-index: 4;
        position: fixed;
        height: calc(100% - 82px);
        &.left {
            left: 0;
        }
        &.right {
            right: 0;
        }
    }
    &__shadow {
        box-shadow: 0 12px 12px 5px rgba(0, 0, 0, 0.06);
    }
    &.left {
        border-right: $border-base;
    }
    &.right {
        border-left: $border-base;
    }
    .slide-panel-button {
        position: absolute;
        width: 40px;
        height: 40px;
        padding: 0;
        line-height: 40px;
    }
}
</style>
