<template>
    <section class="timework-container">
        <sam-form ref="editform" :data="formData" v-model="formValue" />
        <div style="padding: 0 20px 20px">
            <el-button size="small" type="primary" @click="saveData" :loading="saveLoading">提交保存</el-button>
            <el-button size="small" @click="cancelWork">取消关闭</el-button>
        </div>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import samForm from '~/components/form';
import timeWorkForm from './timeWorkForm.json';
const myValue = {
    type: '',
    startTime: '',
    endTime: '',
    desc: ''
};
export default {
    name: "time-work",
    components: {
        samForm
    },
    computed: {
        ...mapState('timeWork', ['workType', 'workTime', 'workProject', 'timeutilHeight', 'locakMinutes', 'editIndex', 'editBlock', 'rangeTime']),
    },
    watch: {
        editBlock: {
            handler(obj) {
                this.formValue = { ...myValue };
                this.$refs['editform'] && this.$refs['editform'].resetForm();
                if (obj && !_.isEmpty(obj)) {
                    this.formValue = Object.assign({}, this.formValue, obj);
                    this.formValue.startTime = this.$global.ChangeHourMinutestr(obj.startTime);
                    this.formValue.endTime = this.$global.ChangeHourMinutestr(obj.endTime);
                }
            },
            immediate: true
        }
    },
    data: () => ({
        formData: timeWorkForm,
        formValue: { ...myValue },
        saveLoading: false,
    }),
    methods: {
        ...mapMutations('timeWork', ['UPDATE_EDITBLOCK']),

        saveData() {
            this.saveLoading = true;
            let data = { ...this.formValue };
            let refForm = this.$refs['editform'];
            let isValidate = refForm.checkFormValidate();
            if (!isValidate) {
                this.$message.error('表单数据的验证有误，请核查！');
                return;
            }
            /* console.log('formValue', this.formValue);
            debugger */
            let obj = { ...this.formValue };
            obj.startTime = this.$global.changeMyTimeToMin(obj.startTime);
            obj.endTime = this.$global.changeMyTimeToMin(obj.endTime);
            obj.allTimes = obj.endTime - obj.startTime;
            this.UPDATE_EDITBLOCK({ ...obj });

            // 判断是否存在下周计划中


            //做延迟，解决数据不同步问题
            setTimeout(() => {
                this.saveLoading = false;
                this.$emit('save');
            }, 500)
        },
        cancelWork() {
            this.$emit('close');
        }
    },
    mounted() {
        //this.formData = { ...timeWorkForm };
    },
}
</script>

<style lang="scss" scoped>
.timework-container {
    /deep/ .form-container {
        padding: 10px 20px;
    }
}
</style>
