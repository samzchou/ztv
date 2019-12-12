<template>
    <section class="msg-container">
        <div class="title">
            <div>{{getTypeTile(data.wfType,'title')}}：{{data.fromName}}</div>
            <div>{{getTypeTile(data.wfType,'titleDate')}}：{{formatDate(data.content.date)}}</div>
            <div v-if="data.wfType==1">当前状态：<span>已申请</span></div>
        </div>
        <div v-if="msgItem" class="content">
            <div v-if="data.wfType==1">
                <div v-if="msgItem.state>1">
                    <div>处理意见：{{getState(msgItem.state)}}</div>
                    <div v-if="msgItem.feedBack!=''">
                        拒绝理由：{{msgItem.feedBack}}
                    </div>
                </div>
                <el-form v-else size="mini" :model="ruleForm" ref="ruleForm" label-width="100px">
                    <el-form-item label="申请原因：">
                        <div>{{msgItem.reson}}</div>
                    </el-form-item>
                    <el-form-item label="处理意见：" prop="agree">
                        <el-radio v-model="ruleForm.agree" label="1">同意</el-radio>
                        <el-radio v-model="ruleForm.agree" label="2">拒绝</el-radio>
                    </el-form-item>
                    <el-form-item label="备注说明：" prop="feedBack" :rules="Rules">
                        <div style="padding:10px 0">
                            <el-input type="textarea" v-model="ruleForm.feedBack"></el-input>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="small" type="primary" :icon="loading?'el-icon-loading':'el-icon-refresh'" @click="submitForm">提交反馈</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div v-else-if="data.wfType==2">
                <!-- <div>审核指导内容：</div> -->
                <div>{{msgItem}}</div>
                <div v-if="!checkPath('/work/timeLine')" style="padding:15px 0">
                    <el-button size="small" type="primary" @click="goTimeLine">进入我的时间钟</el-button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import WebSocket from '~/util/webSocket';
export default {
    name: 'my-msg',
    props: {
        data: Object,
        showList: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        Rules() {
            const R = [];
            const validator = (rule, value, callback) => {
                //console.log('validator', value)
                if (this.ruleForm.agree == "2" && !value) {
                    callback(new Error('请输入拒绝的理由'));
                } else {
                    callback();
                }
            };
            R.push({ validator, trigger: 'blur' });
            return R;
        },

    },

    watch: {
        data: {
            handler(obj) {
                this.setData();
            },
            immediate: true
        }
    },
    data: () => ({
        socketIO: null,
        workData: {},
        msgItem: null,
        ruleForm: {
            feedBack: "",
            agree: "1"
        },
        loading: false
    }),
    methods: {
        checkPath(path) {
            return this.$route.path == path;
        },
        // 跳转到时间钟
        goTimeLine() {
            //console.log(this.$route.path)
            let obj = { id: this.data.fid, userId: this.data.touserId[0] };
            this.$storage.session.set("timework", obj);
            this.$emit("close");
            this.$router.push('/work/timeLine');
        },
        getTypeTile(val, key) {
            let type = _.find(this.$store.state.wfType, { "value": val });
            return type[key] || "";
        },
        getState(val) {
            let state = _.find(this.$store.state.stateType, { "value": val });
            return state.label || '未知';
        },
        submitForm() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let applyIndex = _.findIndex(this.workData.apply, { date: this.data.content.date });
                    this.msgItem.agree = this.ruleForm.agree === '1';
                    this.msgItem.feedBack = this.ruleForm.feedBack;
                    this.msgItem.state = this.ruleForm.agree == '1' ? 4 : 2;

                    this.$set(this.workData.apply, applyIndex, this.msgItem);
                    console.log('ruleForm', this.workData, this.msgItem);

                    // 更新数据
                    const condition = {
                        type: "updateData",
                        collectionName: 'timeBlock',
                        data: { ...this.workData }
                    };
                    this.$axios.$post("mock/db", { data: condition }).then(res => {
                        if (res) {
                            this.$message.info("已提交成功！");
                            this.socketIO.send({ "event": 'applyFeedBack', "obj": { "blockItem": this.msgItem, "touserId": [this.workData.userId] } });
                        }
                    });
                }
            });
        },
        formatDate(datetime, dis = 'YYYY-MM-DD') {
            if (datetime) {
                return moment(datetime).format(dis);
            }
            return "";
        },
        setData() {
            let type = _.find(this.$store.state.wfType, { "value": this.data.wfType });
            //console.log('handler', JSON.stringify(this.data));
            this.getTodo(type.table, this.data.fid);
        },
        async getTodo(table, id) {
            const condition = {
                type: "getData",
                collectionName: table,
                data: { id: id }
            };
            this.workData = await this.$axios.$post("mock/db", { data: condition });
            console.log('this.workData', this.workData);
            if (this.data.wfType == 1) { // 时间钟补填申请
                // 匹配那条数据, 是否应该在该条数据上加锁已保证数据不丢失
                this.msgItem = _.find(this.workData.apply, { "date": this.data.content.date });
            } else if (this.data.wfType == 2) { // 时间钟主管审核指导
                this.msgItem = this.workData.checkDesc;
            }

            //console.log('getTodo', this.workData, this.msgItem);
        }
    },
    mounted() {
        this.socketIO = new WebSocket();
    },
    beforeDestroy() {
        this.socketIO = null;
    }
}
</script>

<style lang="scss" scoped>
.msg-container {
    .title {
        height: 40px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .content {
        padding: 15px 0;
        line-height: 25px;
    }
    .forms {
        padding: 20px 0;
    }
}
</style>