<template>
    <el-form-item v-if="item" :label="item.label" :prop="item.key" :rules="Rules">
        <!-- 文本-->
        <el-input v-if="item.component==='sam-input'||item.component==='sam-richtext'" v-bind="$attrs" v-on="$listeners" :type="item.cptype||'text'" :placeholder="item.placeholder||''" :prop="item.value||''" :readonly="item.readonly" :disabled="disabled||item.disabled" :show-password="item.cptype=='password'" clearable @change="setValue" />
        <!-- 日期 -->
        <el-date-picker v-else-if="item.component==='sam-date'" v-bind="$attrs" v-on="$listeners" :type="item.cptype" value-format="timestamp" editable range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :disabled="disabled||item.disabled" @change="setValue" />
        <!-- 时间选择 -->
        <el-time-select v-else-if="item.component==='sam-timeselect'" v-bind="$attrs" v-on="$listeners" :picker-options="item.pickeroptions" :disabled="disabled||item.disabled" @change="setValue" />
		<!-- 数字 -->
        <input-number v-else-if="item.component==='sam-number'" v-bind="$attrs" v-on="$listeners" :prepend="item.prepend" :append="item.append" :min="item.min" :max="item.max" :decimal1="item.decimal1" :disabled="disabled||item.disabled" :placeholder="item.placeholder||''" @change="setValue" />
        <!-- 单选 有BUG-->
        <el-radio-group v-else-if="item.component==='sam-radio'" v-bind="$attrs" v-on="$listeners" :disabled="disabled||item.disabled">
            <component :is="item.button?'el-radio-button':'el-radio'" v-for="o in ajaxOptions" :key='o.id' :label="o.value" :border="item.border">
                {{o.label}}
            </component>
        </el-radio-group>
        <!-- 下拉 -->
        <el-select v-else-if="item.component==='sam-select'" v-bind="$attrs" v-on="$listeners" :filterable="item.filterable" :multiple="item.multiple" :multiple-limit="item.multipleLimit" :disabled="disabled||item.disabled" :placeholder="item.placeholder||''" clearable @change="setValue">
            <el-option v-for="o in ajaxOptions" :key="o.value" :label="o.label" :value="o.value" />
        </el-select>
        <!--级联-->
        <el-cascader v-else-if="item.component==='sam-cascader'" :options="ajaxOptions" :props="item.props||{}" collapse-tags v-bind="$attrs" v-on="$listeners" :disabled="disabled||item.disabled" :placeholder="item.placeholder||''" clearable @change="setValue" />
        <!-- 开关 -->
        <el-switch v-else-if="item.component==='sam-switch'" v-bind="$attrs" v-on="$listeners" :disabled="disabled||item.disabled" />
    </el-form-item>
</template>

<script>
import {
    mapState, mapMutations
} from 'vuex';
import inputNumber from './plugin/input-number';
import opts from '~/config/options';
import $bus from '~/util/bus';
export default {
    name: "form-item",
    components: { inputNumber },
    props: {
        item: {
            type: Object,
            required: true
        },
        size: {
            type: String,
            default: "mini"
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        isFilter: {
            type: Boolean,
            default: false
        },
        itemValue: {
            type: Object,
            default: {}
        }
    },
    watch: {
        item: {
            handler(obj) {
                this.setOpts();
                this.setListener();
            },
            immediate: true
        },
        itemValue: {
            handler(val) {
                //console.log('watch form-item itemValue', val);
				if(val){
					this.setEmit();
				}
            },
            immediate: true
        }
    },
    computed: {
        ...mapState('forms', ['formValue']),
        Rules() {
            if (this.isEdit || !this.item.required || this.isFilter) {
                return null;
            }
            const rules = this.item.rules;
            if (rules === undefined) return undefined;
            const R = [];
            rules.forEach(rule => {
                if (rule.sql) {
                    const validator = (rule2, value, callback) => {
                        let obj = {};
                        //console.log('formValue', this.formValue[this.item.name]);
                        // 如果值等于原值
                        if (this.formValue[this.item.name] == this.myValue) {
                            callback();
                            return;
                        }
                        obj[this.item.name] = this.myValue; //{"$ne":this.myValue};
                        let conditions = {
                            type: 'checkValidator',
                            collectionName: this.item.table,
                            valid: rule.sql,
                            data: obj
                        }
                        this.$axios.$post('mock/db', { data: conditions }).then(data => {
                            if (data) {
                                callback(new Error('验证失败！值:"' + this.myValue + '"已存在'));
                            } else {
                                callback();
                            }
                        });
                    }
                    R.push({ validator, trigger: (this.item.component == 'sam-input' || this.item.component == 'sam-number') ? 'blur' : 'change' });
                } else {
                    R.push(rule);
                }
            });
            return R;
        },
    },

    data: () => ({
        optsProp: {
            vaule: 'value',
            label: 'label'
        },
        ajaxOptions: [],
        defaultPtops: {
            value: "value",
            label: "label",
            children: "children"
        },
        cascadereOPt: {
            multiple: true,
            checkStrictly: true
        },
        listenerOn: [],
        myValue: ''
    }),
    methods: {
        setValue(val) {
            this.myValue = val;
        },

        async setOpts(flag) {
            this.ajaxOptions = [];
            if (this.item.options && this.item.options.length) {
                this.ajaxOptions = _.clone(this.item.options);
            } else if (this.item.optionsUrl && !this.item.level) {
                let conditon = {
                    type: 'listData',
                    collectionName: this.item.optionsUrl.table,
                    data: this.item.optionsUrl.params || {}
                }
                let res = await this.$axios.$post('mock/db', { data: conditon });
                if (res && res.list.length) {
                    // 如果是级联的
                    if (this.item.component == 'sam-cascader') {
                        let lists = res.list.map(item => {
                            return {
                                id: item.id,
                                pid: this.item.optionsUrl.pid ? item[this.item.optionsUrl.pid] : item.pid,
                                value: item[this.item.optionsUrl.value],
                                label: item[this.item.optionsUrl.label]
                            }
                        })
                        this.ajaxOptions = this.$global.toTree(lists);
                    } else {
                        this.ajaxOptions = res.list.map(item => {
                            return {
                                value: item[this.item.optionsUrl.value],
                                label: item[this.item.optionsUrl.label]
                            }
                        });
                        if (this.item.emit && this.itemValue.val) {
                            this.setEmit();
                        }

                    }
                }
            } else if (this.item.optionsConst) {
                if (opts[this.item.optionsConst]) {
                    this.ajaxOptions = opts[this.item.optionsConst];
                }
            }
        },
        setEmit() {
			if(this.item.emit){
				let emit = this.item.emit;
				for (let i = 0; i < emit.length; i++) {
					console.log('setEmit', emit[i], this.itemValue.va);
					$bus.$emit(emit[i], this.itemValue.val);
				}
			}
        },
        setListener() {
            if (this.item.on) {
                this.listenerOn = this.item.on;
                for (let i = 0; i < this.listenerOn.length; i++) {
                    $bus.$on(this.listenerOn[i], (value) => {
                        console.log('listenerOn', this.listenerOn[i], value);
						this.item.optionsUrl.params[this.listenerOn[i]] = value;
						/*
                        let keys = Object.keys(this.item.optionsUrl.params);
                        keys.forEach(key => {
                            this.item.optionsUrl.params[key] = value;
                        });
						*/
                        this.item.level = 0;
                        this.setOpts();
                    })
                }
            }
        },
    },
	beforeDestroy(){
		$bus.$off();
	}
}
</script>
