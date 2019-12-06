<template>
    <div class="itemPanel" :style="{'height': height+'px'}">
        <el-collapse v-model="activeNames">
            <el-collapse-item title="'start']" name="1">
                <img data-item="{clazz:'start',size:'30*30',label:''}" :src="require('@/assets/flow/start.svg')" style="width:42px;height:42px" />
                <div>{{startEvent}}</div>
                <img data-item="{clazz:'timerStart',size:'30*30',label:''}" :src="require('@/assets/flow/timer-start.svg')" style="width:42px;height:42px" />
                <div>{{timerEvent}}</div>
                <img data-item="{clazz:'messageStart',size:'30*30',label:''}" :src="require('@/assets/flow/message-start.svg')" style="width:42px;height:42px" />
                <div>{{messageEvent}}</div>
                <img data-item="{clazz:'signalStart',size:'30*30',label:''}" :src="require('@/assets/flow/signal-start.svg')" style="width:42px;height:42px" />
                <div>{{signalEvent}}</div>
            </el-collapse-item>
            <el-collapse-item title="'task']" name="2">
                <img :data-item="userTaskData" :src="require('@/assets/flow/user-task.svg')" style="width:80px;height:44px" />
                <div>{{userTask}}</div>
                <img :data-item="scriptTaskData" :src="require('@/assets/flow/script-task.svg')" style="width:80px;height:44px" />
                <div>{{scriptTask}}</div>
                <img :data-item="javaTaskData" :src="require('@/assets/flow/java-task.svg')" style="width:80px;height:44px" />
                <div>{{javaTask}}</div>
                <img :data-item="mailTaskData" :src="require('@/assets/flow/mail-task.svg')" style="width:80px;height:44px" />
                <div>{{mailTask}}</div>
                <img :data-item="receiveTaskData" :src="require('@/assets/flow/receive-task.svg')" style="width:80px;height:44px" />
                <div>{{receiveTask}}</div>
            </el-collapse-item>
            <el-collapse-item title="'gateway']" name="3">
                <img data-item="{clazz:'exclusiveGateway',size:'40*40',label:''}" :src="require('@/assets/flow/exclusive-gateway.svg')" style="width:48px;height:48px" />
                <div>{{exclusiveGateway}}</div>
                <img data-item="{clazz:'parallelGateway',size:'40*40',label:''}" :src="require('@/assets/flow/parallel-gateway.svg')" style="width:48px;height:48px" />
                <div>{{parallelGateway}}</div>
                <img data-item="{clazz:'inclusiveGateway',size:'40*40',label:''}" :src="require('@/assets/flow/inclusive-gateway.svg')" style="width:48px;height:48px" />
                <div>{{inclusiveGateway}}</div>
            </el-collapse-item>
            <el-collapse-item title="'catch']" name="4">
                <img data-item="{clazz:'timerCatch',size:'50*30',label:''}" :src="require('@/assets/flow/timer-catch.svg')" style="width:58px;height:38px" />
                <div>{{timerEvent}}</div>
                <img data-item="{clazz:'messageCatch',size:'50*30',label:''}" :src="require('@/assets/flow/message-catch.svg')" style="width:58px;height:38px" />
                <div>{{messageEvent}}</div>
                <img data-item="{clazz:'signalCatch',size:'50*30',label:''}" :src="require('@/assets/flow/signal-catch.svg')" style="width:58px;height:38px" />
                <div>{{signalEvent}}</div>
            </el-collapse-item>
            <el-collapse-item title="'end']" name="5">
                <img data-item="{clazz:'end',size:'30*30',label:''}" :src="require('@/assets/flow/end.svg')" style="width:42px;height:42px" />
                <div>{{endEvent}}</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
export default {
    props: {
        height: {
            type: Number,
            default: 800,
        },
    },
    data() {
        return {
            activeNames: [],
            userTaskData: "{clazz:'userTask',size:'80*44',label:'" + 'userTask' + "'}",
            scriptTaskData: "{clazz:'scriptTask',size:'80*44',label:'" + 'scriptTask' + "'}",
            javaTaskData: "{clazz:'javaTask',size:'80*44',label:'" + 'javaTask' + "'}",
            mailTaskData: "{clazz:'mailTask',size:'80*44',label:'" + 'mailTask' + "'}",
            receiveTaskData: "{clazz:'receiveTask',size:'80*44',label:'" + 'receiveTask' + "'}",
        };
    },
}
</script>

<style lang="scss" >
.itemPanel {
    float: left;
    width: 10%;
    background: #f0f2f5;
    overflow-y: auto;
    border-left: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
    img {
        width: 92px;
        height: 96px;
        padding: 4px;
        border: 1px solid rgba(0, 0, 0, 0);
        border-radius: 2px;
        &:hover {
            border: 1px solid #ccc;
            cursor: move;
        }
    }
    .el-collapse {
        border: 0;
        .el-collapse-item {
            > div[role='tab'] > div {
                padding-left: 10px;
                border: 1px solid #e9e9e9;
                border-left: 0;
            }
            &:first-child {
                > div[role='tab'] > div {
                    border-top: 0;
                }
            }
            &:last-child {
                > div[role='tab'] > div {
                    border-bottom: 1px solid #e9e9e9;
                }
            }
            .el-collapse-item__wrap {
                border-top: 0;
                background: #f0f2f5;
                text-align: center;
            }
        }
    }
}
</style>
