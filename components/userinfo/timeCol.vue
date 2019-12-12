<template>
    <section class="grid-container">
        <div class="cols">
            <div v-for="k in workTime.allHour*4" :key="k" :class="{'bh':(k-1)%4==0}" :style="{'height':`${timeutilHeight}px`}">
                <div class="show-time">
                    <span @click="createBlock(k-1, $event)">
                        {{getMyTime(k-1)}}
                        <i class="el-icon-plus" title="编辑工作时间" />
                    </span>
                </div>
            </div>
        </div>
        <!--工作时间块-->
        <!-- <draggable v-model="blockList"> -->
        <div class="time-block" v-for="(block,idx) in blockList" :key="idx" :class="{'active':activeIndex==idx, 'disabled':$parent.showWindow||disabled}" v-clickoutside="handleClickOutside" :style="setBlockStyle(block)">
            <div class="title" @mousedown="handlerDrag(idx, $event)">
                <span>{{getWorkStr('workType', block.type)}}</span>
                <span class="all-times">{{setAllTime(block)}}</span>
                <span class="icons" v-if="!disabled" :class="{'disabled':$parent.showWindow}">
                    <i class="el-icon-edit" title="编辑" @click.stop="editMyBlock(idx)" />
                    <i class="el-icon-delete" title="移除" @click.stop="remove(idx)" />
                </span>
            </div>
            <div class="desc">
                <div>{{ block.desc}}</div>
                <div class="state" :class="`s-${block.state||0}`">{{getState(block.state)}}</div>
                <div class="btns" :class="{'disabled':$parent.showWindow}" v-if="!disabled">
                    <!-- <el-button size="mini" type="success">提取到下周计划</el-button> -->
                    <el-dropdown @command="handleCommand">
                        <el-button size="small" type="success">更多...<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{'act':'plan', 'data':block}" :title="getPlan(block)">提取到下周计划</el-dropdown-item>
                            <el-dropdown-item v-for="(state,idx) in workState" :key="state.id" :divided="idx==0" :command="{'act':'state','state':state.id, 'data':block}">
                                <span>{{state.label}}</span>
                                <i v-if="block.state==state.id" class="el-icon-check" style="color:green" />
                            </el-dropdown-item>
                            <el-dropdown-item :command="{'act':'edit', 'idx':idx}" title="编辑" divided>编辑</el-dropdown-item>
                            <el-dropdown-item :command="{'act':'remove', 'idx':idx}" title="移除">移除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div class="resize" :class="{'disabled':disabled||($parent.showWindow && activeIndex==idx)}" @mousedown="handlerMouserDown(idx, $event)" />
        </div>
        <!-- </draggable> -->
    </section>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside';
import Draggable from 'vuedraggable';
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    directives: { Clickoutside },
    components: {
        Draggable
    },
    props: {
        isInit: {
            type: Boolean,
            default: false
        },
        colIndex: Number,
        time: Object,
        dataList: Array,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState(["collectionData"]),
        ...mapState('timeWork', ['holiday', 'nextWeekPlan', 'workState', 'workTime', 'timeutilHeight', 'timeutilWidth', 'locakMinutes', 'editIndex', 'editBlock', 'rangeTime', 'isEditTime']),
    },
    watch: {
        editBlock: {
            handler(obj) {
                if (obj && !_.isEmpty(obj) && this.blockList.length) {
                    //console.log('handler this.blockList', obj, this.blockList)
                    if (obj.colIndex == this.colIndex) {
                        this.activeIndex = _.findIndex(this.blockList, { 'key': obj.key });
                        this.currBlock = this.blockList[this.activeIndex];
                        // 如果数据有所改变则更新
                        let ddf = this.$global.difference(obj, this.currBlock);
                        if (!_.isEmpty(ddf)) {
                            this.currBlock = _.merge(this.currBlock, ddf);
                            this.$set(this.blockList, this.activeIndex, { ...this.currBlock });
                            //this.$forceUpdate();
                        }
                    }
                }
            },
            immediate: true
        },
        dataList: {
            handler(data) {
                this.blockList = [];
                if (data && _.isArray(data) && data.length) {
                    this.blockList = [...data].map(item => {
                        return item;
                    });
                }
                this.$forceUpdate();
            },
            immediate: true
        },
    },
    data: () => ({
        blockList: [],
        currBlock: {},
        activeIndex: -1,
        dragging: false,
        dragRect: null
    }),
    methods: {
        ...mapMutations('timeWork', ['UPDATE_EDITINDEX', 'UPDATE_EDITBLOCK', 'UPDATE_EDITINGTIME']),
        getPlan(data) {
            if (!this.nextWeekPlan || !this.nextWeekPlan.content) return "";
            let plan = _.find(this.nextWeekPlan.content.list, { "key": data.key });
            if (plan && plan.desc == data.desc) {
                return "已存在计划中，可更新";
            } else {
                return "";
            }
        },
        getState(id) {
            if (!id) return "进行中";
            /* console.log(id, this.workState);
            return ""; */
            let state = _.find(this.workState, { "id": id });
            return state.label || "";
        },
        // 更多操作
        handleCommand(cmd) {
            switch (cmd.act) {
                case "plan":
                    this.$parent.pickerWeekPlan(cmd.data); // 提取到下周计划中
                    break;
                case "state":
                    this.setSatet(cmd);
                    break;
                case "edit":
                    this.editMyBlock(cmd.idx);
                    break;
                case "remove":
                    this.remove(cmd.idx);
                    break;
            }
        },
        // 设置时间块的工作状态
        setSatet(cmd) {
            let data = cmd.data;
            data.state = cmd.state;
            this.$set(this.blockList, data.index, data);
            //console.log('setSatet', this.blockList);
            this.$parent.saveData();
        },
        // 计算时间块的top坐标及高度
        setBlockStyle(data) {
            const startTime = this.workTime.startHour * 3600 * 1000;
            let top = (data.startTime - startTime) / 1000 / 60;
            top = (top / this.locakMinutes) * this.timeutilHeight;
            let bottom = (data.endTime - startTime) / 1000 / 60;
            bottom = (bottom / this.locakMinutes) * this.timeutilHeight;
            return {
                "top": top + "px",
                "height": (bottom - top) + "px"
            }
        },
        // 标题栏时间范围
        setAllTime(data) {
            return this.$global.ChangeHourMinutestr(data.startTime) + '~' + this.$global.ChangeHourMinutestr(data.endTime);
        },
        // 解析工作分类及工作项目
        getWorkStr(key, val) {
            if (!val) return "";
            let obj = _.find(this.collectionData[key], { "id": val });
            return obj.name || "";
        },
        // 移除时间块，同时做保存
        removeBlock(index) {
            this.blockList.splice(index, 1);
            this.$parent.removeBlock(this.colIndex, index);
            this.UPDATE_EDITBLOCK(null);
            //this.$forceUpdate();
        },
        // 移除时间
        remove(index) {
            this.$confirm('确定移除该工作时间?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.removeBlock(index);
            }).catch(() => { });
        },
        // 时间钟块外部点击取消激活
        handleClickOutside() {
            this.activeIndex = -1;
            this.UPDATE_EDITINDEX('');
        },
        // 时间轴线的时间
        getMyTime(str, auto) {
            if (!auto) str = (str + this.workTime.startHour * 4) * this.locakMinutes;
            return this.$global.ChangeHourMinutestr(str * 60 * 1000);
        },
        // 编辑时间钟块
        editMyBlock(index) {
            this.activeIndex = index;
            this.currBlock = this.blockList[index];
            this.UPDATE_EDITINDEX(this.colIndex + '-' + this.activeIndex);
            this.UPDATE_EDITBLOCK(_.cloneDeep(this.currBlock));
        },
        // 创建一个新的时间钟块(以60分钟为基本时间)
        createBlock(index, evt) {
            if (this.$parent.showWindow) {
                return;
            }
            this.activeIndex = this.blockList.length;
            let target = evt.target.parentElement.parentElement; // 单元格目标
            const sysStartTime = this.workTime.startHour * 3600 * 1000;
            //debugger
            // 按系统设定每个单元this.locakMinutes的分钟数转为毫秒
            let startTime = this.locakMinutes * index * 60 * 1000, endTime = this.locakMinutes * (index + 4) * 60 * 1000;
            let obj = {
                "index": this.activeIndex,
                "colIndex": this.colIndex,
                "rowIndex": index,
                "startTime": startTime + sysStartTime,
                "endTime": endTime + sysStartTime,
                "allTimes": (endTime - startTime) + sysStartTime,
                "state": 1,
                "key": this.$global.guid()
            };

            //debugger
            this.blockList.push(obj);
            this.currBlock = { ...obj };

            // 上报事件 timeline.vue
            this.$parent.addBlock(this.colIndex, this.activeIndex, { ...obj });

            // 更新store
            this.UPDATE_EDITINDEX(this.colIndex + '-' + this.activeIndex);
            this.UPDATE_EDITBLOCK(_.cloneDeep(this.currBlock));
            //console.log('createBlock', this.blockList)

            //this.$forceUpdate();

        },
        // 小时转换（分钟转小时）
        changeHourMinutestr(minutes, ext) {
            if (minutes !== "0" && minutes !== "" && minutes !== null) {
                return ((Math.floor(minutes / 60)).toString().length < 2 ? "0" + (Math.floor(minutes / 60)).toString() :
                    (Math.floor(minutes / 60)).toString()) + ":" + ((minutes % 60).toString().length < 2 ? "0" + (minutes % 60).toString() : (minutes % 60).toString());
            } else {
                return "";
            }
        },
        // 时间块resize后重新设定时长
        resetTimes(hh, flag) {
            let minutes = hh * this.locakMinutes; // 总的时间数(this.currBlock.rect.height / this.timeutilHeight)
            if (flag) {
                this.currBlock.allTimes = minutes * 60 * 1000;
                this.currBlock.endTime = this.currBlock.allTimes + this.currBlock.startTime;
                this.$parent.saveData();
            }
        },
        resetStartTime(hh, flag) {
            const startTime = this.workTime.startHour * 3600 * 1000;
            let minutes = hh * this.locakMinutes;
            if (flag) {
                this.currBlock.startTime = minutes * 60 * 1000 + startTime;
                this.currBlock.endTime = this.currBlock.startTime + this.currBlock.allTimes;
                this.$parent.saveData();
            }
        },
        handlerDrag(index, evt) {
            //console.log('handlerDrag', index, evt.target);
            this.dragging = false;

            this.currBlock = this.blockList[index];
            const blockEle = evt.target.parentElement;
            if (this.$global.hasClass(blockEle, 'icons')) {
                return false;
            }
            const blockRect = blockEle.getBoundingClientRect();
            let dragState = {
                startMouseTop: evt.clientY
            }
            let disY = evt.clientY - blockEle.offsetTop;
            this.$global.addClass(blockEle, 'drag');
            const handleMouseMove = (event) => {
                let t = event.clientY - disY;
                //console.log(blockEle.style.top, t)
                if (parseFloat(blockEle.style.top) !== t) {
                    this.dragging = true;
                    blockEle.style.top = t + 'px';
                }

            }
            const handleMouseUp = () => {
                let rc = blockEle.getBoundingClientRect();
                // 锁定为常量this.timeutilHeight 的倍数
                let hh = blockEle.offsetTop / this.timeutilHeight;
                if (!Number.isInteger(hh)) {
                    // 判断是否过半,锁定位置
                    let hg = Math.ceil(hh);

                    if ((hg - hh) < 0.5) {
                        hh = Math.ceil(hh);
                    } else {
                        hh = Math.floor(hh);
                    }
                }
                this.$global.removeClass(blockEle, 'drag');

                this.resetStartTime(hh, this.dragging);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.onselectstart = null;
                document.ondragstart = null;

                this.dragging = false;

            }
            document.onselectstart = () => {
                return false;
            };
            document.addEventListener('mousemove', handleMouseMove, false);
            document.addEventListener('mouseup', handleMouseUp, false);

        },

        // 点击拖拽事件后resize
        handlerMouserDown(index, evt) {

            this.dragging = false;

            this.currBlock = this.blockList[index];
            const blockEle = evt.target.parentElement;
            const blockRect = blockEle.getBoundingClientRect();
            let dragState = {
                startMouseTop: evt.clientY,
                startHeight: blockRect.height
            }
            this.$global.addClass(blockEle, 'drag');
            const handleMouseMove = (event) => {
                const deltaTop = event.clientY - dragState.startMouseTop;
                let height = dragState.startHeight + deltaTop;

                if (parseFloat(blockEle.style.height) !== height) {
                    this.dragging = true;
                    blockEle.style.height = height + 'px';
                }
            }
            const handleMouseUp = () => {
                let rc = blockEle.getBoundingClientRect();
                // 锁定为常量this.timeutilHeight 的倍数
                let hh = rc.height / this.timeutilHeight;
                if (!Number.isInteger(hh)) {
                    // 判断是否过半,锁定位置
                    let hg = Math.ceil(hh);
                    if ((hg - hh) < 0.5) {
                        hh = Math.ceil(hh);
                    } else {
                        hh = Math.floor(hh);
                    }
                }
                this.$global.removeClass(blockEle, 'drag');
                this.resetTimes(hh, this.dragging);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.onselectstart = null;
                document.ondragstart = null;
                this.dragging = false;
            }
            document.onselectstart = () => {
                return false;
            };
            document.addEventListener('mousemove', handleMouseMove, false);
            document.addEventListener('mouseup', handleMouseUp, false);

        },
    }
}
</script>

<style lang="scss" scoped>
@import './timeCol';
</style>
