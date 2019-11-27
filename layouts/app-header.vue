<template>
    <section class="header-container">
        <div class="left">
            <i :class="sidebar.opened?'el-icon-s-fold':'el-icon-s-unfold'" :title="sidebar.opened?'收起导航':'展开导航'" @click="TOGGLE_SIDEBAR" />
            <div class="page-title">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="(page,index) in pageTitle" :key="index">{{page.title}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
        </div>
        <div class="right">
            <template v-if="user">
                <i class="avatar" style="background-image:url('/images/head_male.jpg')" />
                <span>{{user.name}}，您好！</span>
                <el-button v-if="user.username=='admin'" type="text" icon="el-icon-switch-button" @click="$router.push('/admin')">管理后台</el-button>
                <div class="sys-msg" @click="msgVisibled=!msgVisibled">
                    <i class="el-icon-chat-line-round" />
                    <span>提醒</span>
                    <em v-if="msgList.length"></em>
                </div>
                <el-button type="text" icon="el-icon-switch-button" @click="logout">注销退出</el-button>
            </template>
        </div>
        <div class="msg-panel" id="msg-panel" v-if="msgVisibled">
            <div class="lists">
                <ul v-if="msgList.length">
                    <li v-for="item in msgList" :key="item.id">
                        <h3>{{getWfType(item.wfType)}}</h3>
                        <div>申请人：{{item.fromName}}；申请日期：{{formatDate(item.content.date, 'YYYY-MM-DD')}}</div>
                        <div class="btns">
                            <el-button size="mini" type="primary" icon="el-icon-document" @click="showMsgInfo(item)">详细信息</el-button>
                        </div>
                    </li>
                </ul>
                <div v-else class="empty">
                    <div>暂时没有新的消息通知</div>
                    <div>
                        <el-button type="text" icon="el-icon-chat-dot-round" @click="$router.push('/work/todo')">我的所有消息</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" append-to-body :close-on-click-modal="false" width="600px">
            <div>{{msgBox}}</div>
			<my-msg :data="msgBox" :showList="false" />
        </el-dialog>
    </section>
</template>

<script>
import {
    mapState, mapMutations
} from 'vuex';
import WebSocket from '~/util/webSocket';
import myMsg from '~/components/myMsg';
export default {
    components: {
        myMsg
    },
    watch: {
        '$route': 'setRouter'
    },
    data: () => ({
        socketIO: null,
        pageTitle: [],
        msgVisibled: false,
        msgList: [],
        dialogTitle: '提示消息',
        dialogVisible: false,
        msgBox: {}
    }),
    computed: {
        ...mapState(['user', 'sidebar', 'serviceList']),
    },
    methods: {
        ...mapMutations(['TOGGLE_SIDEBAR', 'UPDATE_USER', 'UPDATE_MENUACTIVE']),
        formatDate(datetime, dis = 'YYYY-MM-DD hh:mm:ss') {
            if (datetime) {
                return moment(datetime).format(dis);
            }
            return "";
        },
        getWfType(val) {
            let type = _.find(this.$store.state.wfType, { "value": val });
            return type.label || "";
        },

        async showMsgInfo(item) {
            //console.log('showMsgInfo', item);
            const condition = {
                type: "updateData",
                collectionName: 'inbox',
                updateDate: true,
                data: { id: item.id, isRead: true }
            };
            let res = await this.$axios.$post("mock/db", { data: condition });
            if (res) {
                let msgIndex = _.findIndex(this.msgList, { "id": item.id });
                this.msgList.splice(msgIndex, 1);
                let type = _.find(this.$store.state.wfType, { "value": item.wfType });
                this.dialogTitle = type.label;
                this.msgBox = item;
                this.dialogVisible = true;
                this.msgVisibled = false;
            }
        },
        setRouter() {
            //console.log('this.$route.path',this.$route.path);
            let actIndex = '';
            this.pageTitle = [];
            let pathArr = this.$route.path.split('/');
            if (!pathArr[0]) {
                pathArr.splice(0, 1);
            }
            let pIndex = _.findIndex(this.serviceList, { "name": pathArr[0] });
            if (!!~pIndex) {
                let menu = this.serviceList[pIndex];
                actIndex += pIndex;
                this.pageTitle.push(menu);
                if (menu.children && menu.children.length) {
                    let childIndex = _.findIndex(menu.children, { "name": pathArr[1] });
                    if (!!~childIndex) {
                        actIndex += '-' + childIndex;
                        let child = menu.children[childIndex];
                        this.pageTitle.push(child);
                    }
                }
                this.UPDATE_MENUACTIVE(actIndex);
            }
        },
        logout() {
            this.$confirm('确定注销退出?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.UPDATE_USER(null);
                this.$cookies.set('token', '');
                this.$router.push('/login');
            }).catch(() => { });
        },
        initWebSocket() {
            this.socketIO = new WebSocket();
            this.socketIO.onmessage(data => {
                if (!['applyFeedBack'].includes(data.event) && (data.obj.touserId.includes(this.$store.state.user.id) || !data.obj.touserId.length)) {
                    console.log('%c%s', 'color:green;', 'Header客户端接收到消息=>：' + JSON.stringify(data));
                    this.getMsgList(data.obj.id);
                }
            })
        },
        async getMsgList(id = 0) {
            const condition = {
                type: id ? "getData" : "listData",
                collectionName: "inbox",
                data: id ? { id: id } : {  isRead:false, "touserId": { $in: [this.$store.state.user.id] } }
            };
            let res = await this.$axios.$post("mock/db", { data: condition });
            if (id) {
                this.msgList.push(res);
            } else {
                this.msgList = res.list;
            }
            console.log('getMsgList', res);
        }
    },
    mounted() {
        this.setRouter();
        this.initWebSocket();
        this.getMsgList();
        document.body.append(document.getElementById('msg-panel'));
    },
    beforeDestroy() {
        this.socketIO = null;
    }
}
</script>

<style lang="scss" scoped>
.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    .left {
        display: flex;
        align-items: center;
        > i {
            font-size: 24px;
            color: #51627f;
            cursor: pointer;
            margin-right: 15px;
        }
        /deep/ .el-breadcrumb {
            font-size: 16px;
        }
    }
    .right {
        display: flex;
        align-items: center;
        .avatar {
            width: 30px;
            height: 30px;
            background-repeat: no-repeat;
            background-position: center;
            border-radius: 50%;
            background-size: cover;
            margin-right: 10px;
        }
        .sys-msg {
            position: relative;
            margin-right: 10px;
            cursor: pointer;
            > span {
                pointer-events: none;
            }
            em {
                position: absolute;
                top: -3px;
                right: -5px;
                display: block;
                width: 10px;
                height: 10px;
                background-color: red;
                border-radius: 50%;
            }
        }
    }
}
.msg-panel {
    position: absolute;
    right: 100px;
    top: 40px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 3px 3px 3px 0 rgba(0, 0, 0, 0.2);
    z-index: 10000;
    &:before {
        position: absolute;
        right: 19px;
        top: -14px;
        border: 7px solid transparent;
        border-bottom-color: #ddd;
        content: '';
    }
    &:after {
        position: absolute;
        right: 20px;
        top: -10px;
        border: 5px solid transparent;
        border-bottom-color: #fff;
        content: '';
    }
    .lists {
        ul {
            padding: 10px 0;
            li {
                padding: 15px;
                line-height: 25px;
                border-bottom: 1px solid #eee;
                &:last-child {
                    border: 0;
                }
                h3 {
                    margin: 0;
                    color: #4389f1;
                }
                .btns {
                    padding: 10px 0;
                }
            }
        }
        .empty {
            padding: 20px 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
}
</style>
