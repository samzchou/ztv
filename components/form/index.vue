
<template>
    <section class="form-container">
        <div class="title" v-if="formData.title && isEdit">
            <span>{{formData.title}}</span>
        </div>
        <el-form ref="myForm" status-icon :label-position="formData.position" :size="formData.size" :model="value">
            <el-row :gutter="formData.gutter">
                <draggable v-model="formData.itemList" @start="startDrag" @end="updateDragForm" :disabled="!isEdit">
                    <transition-group name="list-complete">
                        <el-col value-key="id" class="draggable list-complete-item" :class="{'frozen':isEdit,'active':currComponent&&currComponent.name==item.name &&isEdit}" v-for="item in formData.itemList.filter(o=>{return !o.formHide})" :key="item.key" :span="setColspan(item.colspan||formData.colspan)" @click.native="selectItem(item)">
                            <form-item v-if="value[item.key]!==undefined" :key="item.key" :item="item" :value="value[item.key]" :itemValue="{'val':value[item.key]}" :isFilter="isFilter" :disabled="disabled" @input="handleInput($event, item)" @selected="handleInput($event, item)" />
                            <!-- <i class="remove el-icon-delete" title="移除" @click.stop.prevent="REMOVE_ITEM(item)" /> -->
                        </el-col>
                    </transition-group>
                </draggable>
            </el-row>
            <el-form-item v-if="isTest">
                <el-button size="small" type="primary" @click="submitTest">{{isTest?'测试表单':'提交保存'}}</el-button>
                <el-button size="small" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
import {
    mapState, mapMutations, mapActions
} from 'vuex';
import $bus from '@/util/bus';
import Draggable from 'vuedraggable';
import formItem from './formItem';
export default {
    name: "sam-form",
    components: {
        Draggable, formItem
    },
    props: {
        data: {
            type: Object,
            default: {}
        },
        value: {
            type: Object,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        inline: {
            type: Boolean,
            default: false
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        isTest: {
            type: Boolean,
            default: false
        },
        isFilter: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        data: {
            handler(obj) {
                //console.log('watch formdata', obj)
                this.setFormData();
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        ...mapState('forms', ['currComponent']),
    },
    data: () => ({
        radio: 3,
        formData: {
            title: '表单',
            position: "top",
            gutter: 20,
            colspan: 6,
            size: "mini",
            itemList: []
        },
    }),
    methods: {
        ...mapMutations('forms', ['UPDATE_FORMS', 'UPDATE_ITEM', 'REMOVE_ITEM', 'UPDATE_FORM_VALUE']),
        // 关闭标题
        closeTitle() {
            let formData = _.cloneDeep(this.data);
            formData.hideTitle = true;
            this.UPDATE_FORMS({ ...formData });
        },
        // 表单组件值发生改变
        handleInput(val, item) {
            this.$emit('input', { ...this.value, [item.key]: val });
            if (item.emit) {
                for (let i = 0; i < item.emit.length; i++) {
                    $bus.$emit(item.emit[i], val);
                }
            }
        },
        // 重置表单值
        resetForm() {
            this.$refs['myForm'].resetFields();
        },
        // 校验表单是否可提交(外部调用)
        checkFormValidate(callBack) {
            let flag = true;
            this.$refs['myForm'].validate((valid) => {
                flag = valid;
            });
            return flag;
        },
        // 表单测试提交
        submitTest(flag) {
            this.$refs['myForm'].validate((valid) => {
                if (this.isTest || flag) {
                    let msg = {
                        message: '测试通过',
                        type: 'success'
                    };
                    if (!valid) {
                        msg = {
                            message: '测试不通过!!',
                            type: 'error'
                        };
                    }
                    this.$message(msg);
                } else {
                    if (valid) {
                        alert('submit!');
                    }
                }
            });
        },
        // 设置列数（容器总列数为24个单元）
        setColspan(colspan) {
            return Math.ceil(24 / colspan);
        },
        // 设置表单数据
        setFormData() {
            this.formData = _.cloneDeep(this.data);
            //console.log('this.formData', this.formData, this.value)
            this.UPDATE_FORM_VALUE(this.value);
        },
        // 选中组件进行编辑
        selectItem(item) {
            if (this.isEdit) {
                this.UPDATE_ITEM({ ...item });
                this.$emit('editItem');
            }
        },
        // 开始拖动
        startDrag(obj) {
            this.$global.addClass(obj.item, 'dragging');
        },
        // 结束拖动
        updateDragForm(obj) {
            this.UPDATE_FORMS({ ...this.formData });
            this.$global.removeClass(obj.item, 'dragging');
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.setFormData();
        });
        // 监听键盘的DELETE按键
        /* document.onkeydown = (e) => {
            let key = window.event.keyCode;
            if (key == 46 || key == 110) {
                //this.REMOVE_ITEM(this.currComponent);
            }
        }; */
        $bus.$on("submitForm", (obj) => {
            //console.log('submitForm', obj, this.formRules);
        })
    },
    beforeDestroy() {
        //$bus.$off("submitForm")
        $bus.$off()
    },

}
</script>
<style lang="scss" scoped>
.form-container {
    padding: 20px;
    .title {
        line-height: 40px;
        border-bottom: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 15px;
    }
    /deep/ .el-form {
        padding: 0;
        .el-col {
            position: relative;
            &.active {
                background-color: #f5fff6;
                outline: 1px dashed #488c63;
                .remove {
                    display: block;
                }
            }
            &.el-col-5 {
                width: 20%;
            }
            &.el-col-7 {
                width: 14.285%;
            }
            .remove {
                position: absolute;
                top: -10px;
                right: -10px;
                z-index: 10;
                background-color: #ccc;
                padding: 5px;
                border-radius: 50%;
                font-size: 10px;
                display: none;
                cursor: pointer;
                &:hover {
                    background-color: $c-main;
                    color: #fff;
                }
            }
            .el-form-item {
                width: 100%;
                //overflow: hidden;
                .el-form-item__label {
                    /* line-height: 22px;
                    height: 22px; */
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .el-form-item__content {
                    vertical-align: middle;
                    //line-height: 30px;
                }
                .el-input,
                .el-cascader,
                .el-select {
                    width: 100%;
                }
            }
            &.frozen {
                .el-form-item {
                    pointer-events: none;
                }
            }
            &.dragging {
                border: 1px dashed #b7c2ce;
            }
        }
        &.el-form--label-left {
            .el-form-item {
                display: flex;
                align-items: center;
                .el-form-item__label {
                    text-align: right;
                }
                .el-form-item__content {
                    flex: 1;
                }
            }
        }
    }
    .list-complete-item {
        transition: all 0.5s;
    }
    .list-complete-enter,
    .list-complete-leave-active {
        opacity: 0;
    }
}
</style>
