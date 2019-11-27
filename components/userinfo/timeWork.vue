<template>
    <section class="timework-container">
        <sam-form ref="editform" :data="formData" v-model="formValue" />
        <div style="padding: 10px 20px">
            <el-button size="mini" type="primary" @click="setWork">确定</el-button>
            <el-button size="mini" @click="cancelWork">取消</el-button>
        </div>
    </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import samForm from '~/components/form';
import timeWorkForm from './timeWorkForm.json';
const myValue = {
    type: '',
    project: '',
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
        ...mapState('timeWork', ['workType', 'workProject', 'timeutilHeight', 'locakMinutes', 'editIndex', 'editBlock', 'rangeTime']),
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
                //console.log('watch this.formValue=>', this.formValue);
            },
            immediate: true
        }
    },
    data: () => ({
        formData: timeWorkForm,
        formValue: { ...myValue }

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
            let data = { ...this.formValue };
            let refForm = this.$refs['editform'];
            let isValidate = refForm.checkFormValidate();
            if (!isValidate) {
                this.$message.error('表单数据的验证有误，请核查！');
                return;
            }
            console.log('formValue', this.formValue);
            //

            let obj = { ...this.formValue };
            obj.startTime = this.$global.changeMyTimeToMin(obj.startTime);
            obj.endTime = this.$global.changeMyTimeToMin(obj.endTime);
            obj.allTimes = obj.endTime - obj.startTime;
            this.UPDATE_EDITBLOCK({ ...obj });
            console.log('setWork', obj);

            this.$emit('close');
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
    padding: 15px 0;
}
</style>
