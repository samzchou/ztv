<template>
    <section>
        <el-form size="mini" :model="formItem" label-position="top" status-icon ref="optForm" v-on="$listeners" v-bind="$attrs" @keyup.native.enter="submitForm">
            <el-form-item label="标签名">
                <el-input v-model="formItem.label" clearable @blur="submitForm" />
            </el-form-item>
            <el-form-item label="占位文本">
                <el-input v-model="formItem.placeholder" clearable @blur="submitForm" />
            </el-form-item>
            <el-form-item label="键名(不可修改)">
                <el-input v-model="formItem.name" readonly />
            </el-form-item>
            <el-form-item label="">
                <div>
                    <el-checkbox :value="formItem.decimal1!==null" @change="handleDecimal">小数位数</el-checkbox>
                </div>
                <el-input-number v-if="formItem.decimal1!==null" v-model="formItem.decimal1" controls-position="right" clearable @change="submitForm" />
            </el-form-item>
            <el-form-item label="默认值">
                <input-number v-model="formItem.value" clearable @input="submitForm" />
            </el-form-item>
            <el-form-item>
                <div>
                    <el-checkbox v-model="hasColspan" @change="setCol">占位单元(列数)</el-checkbox>
                </div>
                <el-slider v-if="hasColspan" v-model="formItem.colspan" :min="1" :max="12" show-stops @change="submitForm" />
            </el-form-item>
            <el-form-item label="前缀">
                <el-input v-model="formItem.prepend" clearable @change="submitForm" />
            </el-form-item>
            <el-form-item label="后缀">
                <el-input v-model="formItem.append" clearable @change="submitForm" />
            </el-form-item>
            <el-form-item label="最小值">
                <el-input-number v-model="formItem.min" controls-position="right" clearable @change="submitForm" />
            </el-form-item>
            <el-form-item label="最大值">
                <el-input-number v-model="formItem.max" controls-position="right" clearable @change="submitForm" />
            </el-form-item>

            <el-form-item label="是否禁用">
                <el-switch v-model="formItem.disabled" @change="submitForm" />
            </el-form-item>
            <el-form-item label="是否只读">
                <el-switch v-model="formItem.readonly" @change="submitForm" />
            </el-form-item>
        </el-form>
        <form-rules :formRules="formItem.rules" @update="updateRule" :itemType="formItem.component" types="required,length,regexp,sql" />
    </section>
</template>

<script>
import {
    mapState, mapMutations, mapActions
} from 'vuex';
import formRules from './formRules';
import inputNumber from '../plugin/input-number';
export default {
    name: "sam-input",
    components: { formRules, inputNumber },
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
        hasColspan: false
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
        setItemData() {
            if (this.currComponent) {
                this.formItem = _.cloneDeep(this.currComponent);
            }
        },
        selectText(evt) {
            evt.target.select();
        },
        handleDecimal(flag) {
            this.formItem.decimal1 = flag ? 0 : null;
            this.submitForm();
        },
        submitForm() {
            console.log(this.formItem);
            this.UPDATE_ITEM({ ...this.formItem });
        },
        updateRule(rules) {
            this.UPDATE_RULES([...rules]);
        },
    }
}
</script>
