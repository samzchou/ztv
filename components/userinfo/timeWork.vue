<template>
    <section class="timework-container">
        <el-form size="mini" :model="ruleForm" label-position="top" label-width="100px" :rules="rules" ref="myForm">
            <el-form-item class="half" label="工作分类" prop="type">
                <el-select v-model="ruleForm.type" placeholder="请选择工作分类" style="width:95%">
                    <el-option v-for="item in workType" :label="item.label" :key="item.id" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item class="half" label="项目" prop="project">
                <el-select v-model="ruleForm.project" placeholder="请选择项目" style="width:100%">
                    <el-option v-for="item in workProject" :label="item.label" :key="item.id" :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item class="half" label="开始时间" prop="startTime">
                <el-time-select placeholder="开始时间" v-model="ruleForm.startTime" :picker-options="{start: '00:00',step: '00:15', end: '24:00'}" style="width:95%" />
            </el-form-item>
            <el-form-item class="half" label="结束时间" prop="endTime">
                <el-time-select placeholder="结束时间" v-model="ruleForm.endTime" :picker-options="{start: '00:00',step: '00:15', end: '24:00'}" style="width:100%" />
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc" placeholder="输入描述备注" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="setWork">确定</el-button>
                <el-button @click="cancelWork">取消</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>

<script>
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    name: "time-work",
    computed: {
        ...mapState('timeWork', ['workType', 'workProject', 'timeutilHeight', 'locakMinutes', 'editIndex', 'editBlock', 'rangeTime']),
    },
    watch: {
        editBlock: {
            handler(obj) {
                if (obj && !_.isEmpty(obj)) {
                    if (!_.isEmpty(this.$global.difference(obj, this.ruleForm))) {
                        this.ruleForm = _.cloneDeep(obj);
                        this.ruleForm.startTime = this.$global.ChangeHourMinutestr(obj.startTime);
                        this.ruleForm.endTime = this.$global.ChangeHourMinutestr(obj.endTime);
                    }
                }
            },
            immediate: true
        }
    },
    data: () => ({
        ruleForm: {
            project: '',
            type: "",
            rangeTime: [],
            desc: ''
        },
        startTime: "",
        endTime: "",
        rules: {
            type: [
                { required: true, message: '请选择工作分类', trigger: 'change' }
            ],
            project: [
                { required: true, message: '请选择项目', trigger: 'change' }
            ],
            startTime: [
                { required: true, message: '请选择开始时间', trigger: 'change' }
            ],
            endTime: [
                { required: true, message: '请选择结束时间', trigger: 'change' }
            ]
        }
    }),
    methods: {
        ...mapMutations('timeWork', ['UPDATE_EDITBLOCK']),
        saveData() {
            this.$refs['myForm'].validate((valid) => {
                if (valid) {
                    this.$emit('saveData', this.ruleForm);
                }
            });
        },
        setWork() {
            this.$refs['myForm'].validate((valid) => {
                if (valid) {
                    this.$emit('close');
                    let obj = _.cloneDeep(this.ruleForm);
                    obj.startTime = this.$global.changeMyTimeToMin(obj.startTime);
                    obj.endTime = this.$global.changeMyTimeToMin(obj.endTime);
                    obj.allTimes = obj.endTime - obj.startTime;
                    this.UPDATE_EDITBLOCK({ ...obj });
                }
            });
        },
        cancelWork() {
            this.$emit('close');
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.timework-container {
    padding: 15px;
}
</style>
