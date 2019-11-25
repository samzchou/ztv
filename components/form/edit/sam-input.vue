<template>
    <section>
        <el-form size="mini" :model="formItem" label-position="top" status-icon ref="optForm" v-on="$listeners" v-bind="$attrs" @keyup.native.enter="submitForm">
            <el-form-item label="标签名">
                <el-input v-model="formItem.label" clearable @change="submitForm" />
            </el-form-item>
            <el-form-item label="占位文本">
                <el-input v-model="formItem.placeholder" clearable @change="submitForm" />
            </el-form-item>
            <el-form-item label="键名(不可修改)">
                <el-input v-model="formItem.name" readonly />
            </el-form-item>
            <el-form-item label="文本类型">
                <el-select v-model="formItem.cptype" placeholder="请选择类型" @change="submitForm">
                    <el-option v-for="type in typeArr" :key="type.value" :label="type.label" :value="type.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="默认值">
                <el-input v-model="formItem.value" clearable @change="submitForm" />
            </el-form-item>
            <el-form-item>
                <div>
                    <el-checkbox v-model="hasColspan" @change="setCol">占位单元(列数)</el-checkbox>
                </div>
                <el-slider v-if="hasColspan" v-model="formItem.colspan" :min="1" :max="12" show-stops @change="submitForm" />
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
export default {
    name: "sam-input",
    components: { formRules },
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
        typeArr: [
            { label: '单行文本', value: 'text' }, { label: '多行文本', value: 'textarea' }, { label: '密码域', value: 'password' }, { label: '随机码', value: 'code' }
        ]
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
