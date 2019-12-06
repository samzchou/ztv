<template>
    <section class="setup-container">
        <div class="header">
            <div>流程设置</div>
            <div class="btns">
                <el-button size="small" type="primary">保存设置</el-button>
            </div>
        </div>
        <div class="content">
            <slider-panel width="120px" title="流程节点" :visible.sync="showNode" position="left">
                <div class="node-icon">
                    <li @click="addChannel(true)">
                        <div><i class="el-icon-connection" /></div>
                        <div>添加流程泳道</div>
                    </li>
                </div>
                <div class="node-icon">
                    <li draggable="true" @dragstart="dragNewNode($event)">
                        <div><i class="el-icon-connection" /></div>
                        <div>添加业务节点</div>
                    </li>
                </div>
            </slider-panel>
            <div class="mid">
                <el-scrollbar class="scrollbar">
                    <div class="node-list">
                        <div>
                            <div class="title">开始泳道</div>
                            <div class="node start">
                                <div>开始节点</div>
                            </div>
                        </div>
                        <draggable class="list-channel" tag="div" v-model="workList" v-bind="dragOptions" handle=".drag" @start="drag = true" @end="drag = false">
                            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                                <div v-for="item in workList" :key="item.key">
                                    <div class="title drag">{{item.label}}</div>
                                    <draggable class="list-node" tag="div" v-model="item.children" v-bind="dragOptions" handle=".node-block" @start="dragNode = true" @end="dragNode = false">
                                        <transition-group type="transition" :name="!dragNode ? 'flip-list' : null">
                                            <div class="node work" v-for="(child,idx) in item.children" :key="child.key" :index="idx" @drop.prevent="dropNode($event,idx)" @dragover="allowDropNode($event,idx)">
                                                <div class="node-block" v-if="child.label">{{child.label}}</div>
                                            </div>
                                        </transition-group>
                                    </draggable>
                                </div>
                            </transition-group>
                        </draggable>
                        <div>
                            <div class="title">结束泳道</div>
                            <div class="node end">
                                <div>结束节点</div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
    </section>
</template>

<script>
import G6 from '@antv/g6/src';

import draggable from "vuedraggable";
import sliderPanel from '~/components/sliderPanel';
import pageData from '~/components/page/data';

export default {
    components: {
        sliderPanel, draggable, pageData
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    },
    data: () => ({
        showNode: true,
        workList: [],
        drag: false,
        dragNode: false,
        listParam: {},
    }),
    methods: {
        closeLeftPanel() {
            this.showNode = false;
        },
        dragNewNode(evt, index) {
            console.log('dragNewNode', evt, index)
        },
        dropNode(evt, index) {
            //let index = evt.dataTransfer.getData('index')
            console.log('dropNode', evt.target, index)
        },
        allowDropNode(evt) {
            this.$global.addClass(evt.target, 'active')
            console.log('allowDropNode', evt)
        },
        setNodeArr(flag) {
            let arr = [];
            for (let i = 0; i < 5; i++) {
                let node = { label: "中间节点", name: "node1", key: this.$global.guid() };
                if (flag && i > 0) {
                    delete node.label;
                }
                arr.push(node)
            }
            return arr;
        },
        addChannel(flag) {
            let chanel = {
                label: "操作人泳道",
                key: this.$global.guid(),
                children: this.setNodeArr(flag)
            }
            this.workList.push(chanel)
        },
        addNode() {

        },
    },
    mounted() {
        this.addChannel(true);
    },

    layout: "admin"
}
</script>
<style lang="scss" scoped>
@import './setup';
</style>