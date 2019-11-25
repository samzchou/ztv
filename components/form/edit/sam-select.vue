<template>
    <section>
        <el-form size="mini" :model="formItem" label-position="top" status-icon ref="optForm" v-on="$listeners" v-bind="$attrs" @keyup.native.enter="submitForm">
            <el-form-item label="标签名">
                <el-input v-model="formItem.label" clearable @blur="submitForm" />
            </el-form-item>
            <el-form-item label="占位文本">
                <el-input v-model="formItem.placeholder" />
            </el-form-item>
            <el-form-item label="键名(不可修改)">
                <el-input v-model="formItem.name" readonly />
            </el-form-item>
            <el-form-item label="默认值">
                <el-select v-model="formItem.value" :multiple="formItem.multiple" :clearable="!formItem.multiple" @change="submitForm">
                    <el-option v-for="o in ajaxOptions" :key="o.value" :label="o.label" :value="o.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <div>
                    <el-checkbox v-model="hasColspan" @change="setCol">占位单元(列数)</el-checkbox>
                </div>
                <el-slider v-if="hasColspan" v-model="formItem.colspan" :min="1" :max="12" show-stops @change="submitForm" />
            </el-form-item>
            <!-- <el-form-item label="数据接口URL">
                <el-input v-model="formItem.optionsUrl" />
            </el-form-item> -->
            <el-form-item label="是否禁用">
                <el-switch v-model="formItem.disabled" @change="submitForm" />
            </el-form-item>
        </el-form>
        <editor-options v-if="formItem.optionsUrl===undefined" :itemOptions="formItem.options" @update="submitForm" />
        <form-rules :formRules="formItem.rules" @update="updateRule" :itemType="formItem.component" types="required" />
    </section>
</template>

<script>
import {
    mapState, mapMutations, mapActions
} from 'vuex';
import formRules from './formRules';
import editorOptions from './editor-options';
export default {
    name: "sam-radio",
    components: { formRules, editorOptions },
    computed: {
        ...mapState('forms', ['currComponent', 'currForms']),
    },
    watch: {
        currComponent: {
            handler(list) {
                this.setItemData();
            },
            immediate: true
        }
    },
    data: () => ({
        formItem: {},
        hasColspan: false,
        ajaxOptions: []
    }),
    methods: {
        ...mapMutations('forms', ['UPDATE_ITEM', 'UPDATE_FORMS', 'UPDATE_RULES']),
        setCol(val) {
            if (val) {
                this.formItem.colspan = this.currForms.colspan || 1;
            } else {
                delete this.formItem.colspan;
            }
            this.submitForm();
        },
        async setItemData() {
            if (this.currComponent) {
                this.formItem = _.cloneDeep(this.currComponent);
            }
            this.ajaxOptions = [];
            if (this.formItem.options && this.formItem.options.length) {
                this.ajaxOptions = _.clone(this.formItem.options);
            } else if (this.formItem.optionsUrl && !this.formItem.level) {
                let conditon = {
                    type: 'listData',
                    collectionName: this.formItem.optionsUrl.table,
                    data: this.formItem.optionsUrl.params || {}
                }
                let res = await this.$axios.$post('mock/db', { data: conditon });
                if (res && res.list.length) {
                    this.ajaxOptions = res.list.map(item => {
                        return {
                            value: item[this.formItem.optionsUrl.value],
                            label: item[this.formItem.optionsUrl.label]
                        }
                    });
                }
            }
        },
        submitForm() {
            this.UPDATE_ITEM({ ...this.formItem });
        },
        updateRule(rules) {
            this.UPDATE_RULES([...rules]);
        },
    }
}
</script>
