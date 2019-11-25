<template>
    <div class="lis">
        <h5>验证规则[type={{itemType}}]</h5>
        <div v-if="types.includes('required')">
            <el-checkbox :value="valid1.enable" @change="handleValid1">必填/必选</el-checkbox>
        </div>
        <template v-if="types.includes('length')">
            <div>
                <el-checkbox :value="valid2.enable" @change="handleValid2({enable:$event})">验证长度</el-checkbox>
            </div>
            <div v-show="valid2.enable">
                <el-input-number controls-position="right" size="mini" :value="valid2.min" :min="1" :max="valid2.max" @change="handleValid2({min:$event})" style="width:80px" />
                <span class="c666">~</span>
                <el-input-number controls-position="right" size="mini" :value="valid2.max" :min="valid2.min" :max="9999" @change="handleValid2({max:$event})" style="width:80px" />
            </div>
        </template>
        <template v-if="types.includes('regexp')">
            <div>
                <el-checkbox :value="valid3.enable" @change="handleValid3({enable:$event})">正则验证(暂不支持flag)</el-checkbox>
            </div>
            <div v-show="valid3.enable">
                <el-select v-model="valid3.pattern" size="mini" placeholder="请选择" @change="handleValid3({pattern:$event})">
                    <el-option v-for="item in patterns" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
        </template>
        <template v-if="types.includes('sql')">
            <div>
                <el-checkbox :value="valid4.enable" @change="handleValid4({enable:$event})">后台SQL验证(待完善)</el-checkbox>
            </div>
            <div v-show="valid4.enable">
                <el-select :value="valid4.sql" size="mini" placeholder="请选择" @change="handleValid4({sql:$event})">
                    <el-option v-for="item in sqlType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <!-- <el-input size="mini" :value="valid4.sql" @change="handleValid4({sql:$event})" /> -->
            </div>
        </template>
    </div>
</template>

<script>
// message编辑，添加正则flag，允许添加多条regexp
import {
    mapState
} from 'vuex';
export default {
    name: "form-rules",
    props: {
        formRules: {
            type: Array,
            default: () => []
        },
        itemType: {
            type: String,
            required: true,
        },
        types: {
            required: true,
        }
    },
    watch: {
        formRules(val) {
            this.itemRules = _.cloneDeep(val);
        }
    },
    data() {
        return {
            itemRules: [],
            regOptions: [],
            sqlType: [
                { label: "校验相同值", value: "same" },
                { label: "其他待扩展", value: "other" }
            ]
        }
    },
    methods: {
        handleValid1(enable) {
            const ruleIndex = _.findIndex(this.itemRules, item => {
                return item.required !== undefined;
            });
            if (enable) {
                // 如果勾选了必填 如果不存在这项规则, 就在头部添加
                ruleIndex === -1 && this.itemRules.unshift({ required: true, message: '必填项', trigger: (this.itemType == 'select' || this.itemType == 'cascader') ? 'change' : 'blur' });
                //ruleIndex === -1 && this.itemRules.unshift({ required: true, message: '必填项', trigger: ['change', 'blur'] });
            } else {
                //如果取消了勾选 如果已存在, 删除
                ruleIndex > -1 && this.itemRules.splice(ruleIndex, 1);
            }
            this.updateRules();
        },

        handleValid2({ enable = this.valid2.enable, min = this.valid2.min, max = this.valid2.max }) {
            const ruleIndex = _.findIndex(this.itemRules, item => {
                return item.min !== undefined && item.max !== undefined;
            });
            if (enable) {
                // 勾选或者修改数值
                const isString = this.itemType === 'sam-input';
                const newRule = {
                    min,
                    max,
                    type: isString ? 'string' : 'array',
                    message: isString ? `长度在${min}~${max}个单元` : `至少勾选${min}个`,
                    trigger: isString ? 'blur' : 'change'
                }
                if (ruleIndex === -1) { // 勾选操作
                    this.itemRules.push(newRule);
                } else { // 修改操作
                    //this.itemRules[ruleIndex] = newRule;
                    this.$set(this.itemRules, ruleIndex, newRule);
                }
            } else {
                // 只能是取消勾选
                ruleIndex > -1 && this.itemRules.splice(ruleIndex, 1);
            }
            this.updateRules();
        },
        handleValid3({ enable = this.valid3.enable, pattern = this.valid3.pattern }) {
            const ruleIndex = _.findIndex(this.itemRules, item => {
                return item.pattern !== undefined;
            });
            if (enable) {
                // 勾选或者修改数值
                let p = _.find(this.patterns, { value: pattern })
                const newRule = { pattern, message: `正则验证失败: 须${p.label}`, trigger: ['blur', 'change'] };
                if (ruleIndex === -1) {
                    // 勾选操作
                    this.itemRules.push(newRule);
                } else {
                    // 修改操作
                    this.$set(this.itemRules, ruleIndex, newRule);
                }
            } else {
                // 只能是取消勾选
                ruleIndex > -1 && this.itemRules.splice(ruleIndex, 1);
            }
            this.updateRules();
        },
        handleValid4({ enable = this.valid4.enable, sql = this.valid4.sql }) {
            const ruleIndex = _.findIndex(this.itemRules, item => {
                return item.sql !== undefined;
            });
            if (enable) {
                // 勾选或者修改数值
                const newRule = { sql };
                if (ruleIndex === -1) {
                    // 勾选操作
                    this.itemRules.push(newRule);
                } else {
                    // 修改操作
                    this.$set(this.itemRules, ruleIndex, newRule);
                }
            } else {
                // 只能是取消勾选
                ruleIndex > -1 && this.itemRules.splice(ruleIndex, 1);
            }
            this.updateRules();
        },
        updateRules() {
            this.$emit('update', [...this.itemRules]);
        }
    },
    computed: {
        ...mapState('forms', ['patterns']),
        // 必填
        valid1() {
            return {
                enable: _.findIndex(this.itemRules, { 'required': true }) > -1,
                type: 'todo'
            }
        },
        // 长度
        valid2() {
            const idx = _.findIndex(this.itemRules, item => {
                return item.min !== undefined;
            });
            return idx > -1 ? {
                enable: true,
                min: this.itemRules[idx].min,
                max: this.itemRules[idx].max
            } : {
                    enable: false,
                    min: 3,
                    max: 10
                }
        },
        // 正则
        valid3() {
            const idx = _.findIndex(this.itemRules, item => {
                return item.pattern !== undefined;
            });
            return idx > -1 ? {
                enable: true,
                pattern: this.itemRules[idx].pattern
            } : {
                    enable: false,
                    pattern: '^\\w+$'
                }
        },
        // SQL
        valid4() {
            const idx = _.findIndex(this.itemRules, item => {
                return item.sql !== undefined;
            });
            return idx > -1 ? {
                enable: true,
                sql: this.itemRules[idx].sql
            } : {
                    enable: false,
                    sql: 'same'
                }
        }
    },
    mounted() {
        this.itemRules = _.cloneDeep(this.formRules);
    },
}
</script>

<style lang="scss" scoped>
.lis {
    > h5 {
        border-bottom: 1px solid #e4e4e4;
        line-height: 30px;
    }
    > div {
        margin: 10px 0;
    }
}
</style>
