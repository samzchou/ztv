

<template>
    <div class="bowen-options">
        <h5>选项配置[共{{itemOptions&&itemOptions.length}}条]</h5>
        <div class="lis" v-for="(opt,i) in itemOptions" :key="i">
            <el-row :gutter="10" v-if="editingIdx===i">
                <el-col :span="7">
                    <el-input size="mini" v-model="editingOpt.value" placeholder="值" />
                </el-col>
                <el-col :span="7">
                    <el-input size="mini" v-model="editingOpt.label" placeholder="标签" />
                </el-col>
                <el-col :span="10">
                    <el-button-group>
                        <el-button size="mini" icon="el-icon-success" @click="handleSave(i)" />
                        <el-button size="mini" icon="el-icon-error" @click="editingIdx=-1" />
                    </el-button-group>
                </el-col>
            </el-row>
            <span v-else>{{opt.value}}/{{opt.label}}</span>
            <el-button-group v-if="!isEdit">
                <el-button size="mini" round icon="el-icon-open" :title="opt.disabled?'不可选':'可选'" :type="opt.disabled?'info':''" @click="handleDisabled(i, opt)" />
                <el-button size="mini" round icon="el-icon-edit" @click="handlePreEdit(i, opt)" />
                <el-button size="mini" round icon="el-icon-delete" @click="handleRemove(i)" />
            </el-button-group>
        </div>
        <template v-if="editingIdx===-2">
            <el-row :gutter="5">
                <el-col :span="7">
                    <el-input size="mini" v-model="editingOpt.value" placeholder="值" />
                </el-col>
                <el-col :span="8">
                    <el-input size="mini" v-model="editingOpt.label" placeholder="标签" />
                </el-col>
                <el-col :span="9">
                    <el-button-group>
                        <el-button size="mini" icon="el-icon-success" @click="handleSave(itemOptions.length)" />
                        <el-button size="mini" icon="el-icon-error" @click="editingIdx=-1" />
                    </el-button-group>
                </el-col>
            </el-row>
        </template>
        <el-button v-show="showBtn" class="add-btn" @click="handlePreAdd" size="mini" type="primary">添加选项</el-button>
    </div>
</template>
<script>
export default {
    props: {
        itemOptions: {
            type: Array,
            default() {
                return [];
            },
            required: true
        }
    },
    data() {
        return {
            editingIdx: -1, // 当前正在编辑的选项索引, -1没有正在编辑的, -2正在"新增"
            editingOpt: {
                'value': '',
                'label': '',
                'disabled': false
            },
            showBtn: true,
            isEdit: false
        }
    },
    methods: {
        handlePreAdd() {
            this.editingOpt = { value: '', label: '', disabled: false };
            this.editingIdx = -2;
            this.showBtn = false;
            this.isEdit = false;
        },
        handlePreEdit(i, opt) {
            this.editingIdx = i;
            this.editingOpt = { ...opt };
            this.showBtn = true;
            this.isEdit = true;
            this.$emit('update');
        },
        handleDisabled(i, opt) {
            opt.disabled = !opt.disabled;
            this.editingOpt = { ...opt };
            this.$set(this.itemOptions, i, { ...this.editingOpt });
            this.$emit('update');
        },
        handleSave(i) {
            this.$set(this.itemOptions, i, { ...this.editingOpt });
            this.editingIdx = -1;
            this.showBtn = true;
            this.isEdit = false;
            this.$emit('update');
        },
        handleRemove(i) {
            this.isEdit = false;
            this.itemOptions.splice(i, 1);
            this.$emit('update');
        }
    }


}
</script>
<style lang="scss" scoped>
.bowen-options {
    .el-input {
        display: inline-block;
        width: 100%;
        vertical-align: middle;
    }
    .lis {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        /* .el-input{
				width:100%;
			} */
    }
}
.add-btn {
    margin: 10px 0;
}
</style>