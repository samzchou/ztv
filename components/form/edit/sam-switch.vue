<template>
    <section>
        <el-form size="mini" :model="formItem" label-position="top" status-icon ref="optForm" v-on="$listeners" v-bind="$attrs" @keyup.native.enter="submitForm">
            <el-form-item label="标签名">
                <el-input v-model="formItem.label" clearable @blur="submitForm" />
            </el-form-item>
            <el-form-item label="键名(不可修改)">
                <el-input v-model="formItem.name" readonly />
            </el-form-item>
            <el-form-item label="默认值">
                <el-switch v-model="formItem.value" @change="submitForm" />
            </el-form-item>
            <el-form-item>
                <div>
                    <el-checkbox v-model="hasColspan" @change="setCol">占位单元(列数)</el-checkbox>
                </div>
                <el-slider v-if="hasColspan" v-model="formItem.colspan" :min="1" :max="12" show-stops @change="submitForm" />
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
import {
    mapState, mapMutations, mapActions
} from 'vuex';
import formRules from './formRules';
export default {
    name: "sam-radio",
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
        hasColspan: false
    }),
    methods: {
        ...mapMutations('forms', ['UPDATE_ITEM', 'UPDATE_FORMS']),
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
                //console.log('formItem.value', this.formItem.value)
                if (this.formItem.colspan) {
                    this.hasColspan = true;
                }
            }
        },
        submitForm() {
            this.UPDATE_ITEM({ ...this.formItem });
        }
    }
}
</script>
