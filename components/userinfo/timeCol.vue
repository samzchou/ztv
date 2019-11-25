<template>
    <section class="grid-container">
        <div class="cols">
            <div v-for="k in 96" :key="k" :class="{'bh':(k-1)%4==0}">
                <div class="show-time">
                    <span @click="createBlock(k-1, $event)">
                        {{getMyTime(k-1)}}
                        <i class="el-icon-plus" title="编辑工作时间" />
                    </span>
                </div>
            </div>
        </div>
        <!--工作时间块-->
        <div class="time-block" v-for="(block,idx) in blockList" :key="idx" :class="{'active':activeIndex==idx}" v-clickoutside="handleClickOutside" @click="editMyBlock(idx)" :style="{'top':block.rect.top+'px','height':block.rect.height+'px'}">
            <div class="title">
                <span>工作</span>
                <span class="all-times">{{setAllTime(block.allTimes)}}</span>
                <i class="el-icon-close" @click.stop.prevent="remove(idx)" />
            </div>
            <div class="desc">
                <div>工作分类：{{getWorkStr('workType', block.type)}}</div>
                <div>项目：{{getWorkStr('workProject', block.project)}}</div>
                <div>备注描述：<br />{{ block.desc}}</div>
                <div>完成情况：待完成</div>
            </div>
            <div class="resize" @mousedown="handlerMouserDown(idx, $event)" />
        </div>
    </section>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside';
import {
    mapState,
    mapMutations
} from 'vuex'
export default {
    directives: { Clickoutside },
    props: {
        colIndex: Number,
        time: Object,
        dataList: Array
    },
    computed: {
        ...mapState('timeWork', ['holiday', 'workType', 'workProject', 'timeutilHeight', 'locakMinutes', 'editIndex', 'editBlock', 'rangeTime', 'isEditTime']),
    },
    watch: {
        editBlock: {
            handler(obj) {
                if (obj && !_.isEmpty(obj) && this.blockList.length) {
                    if (obj.colIndex == this.colIndex) {
                        this.activeIndex = _.findIndex(this.blockList, { 'index': obj.index });
                        this.currBlock = this.blockList[this.activeIndex];
                        // 如果数据有所改变则更新
                        if (!_.isEmpty(this.$global.difference(obj, this.currBlock))) {
                            this.currBlock = _.cloneDeep(obj);
                            let conditions = this.updatePosition(this.currBlock);
                            this.currBlock = Object.assign({}, this.currBlock, conditions);
                            this.$set(this.blockList, this.activeIndex, this.currBlock);
                        }
                    }
                }
            },
            immediate: true
        },
        dataList: {
            handler(data) {
                if (data && _.isArray(data)) {
                    this.blockList = data.map(item => {
                        return item;
                    });
                }
            },
            immediate: true
        },
        // 监听编辑小窗是否关闭， 如果关闭了且没有基础数据就同时删除时间块
        isEditTime(flag) {
            /* if (!flag && !this.currBlock.type && !this.currBlock.project) {
                this.removeBlock(this.currBlock.index, true)
            } */
        }
    },
    data: () => ({
        blockList: [],
        currBlock: {},
        activeIndex: -1,
        dragging: false,
    }),
    methods: {
        ...mapMutations('timeWork', ['UPDATE_EDITINDEX', 'UPDATE_EDITBLOCK', 'UPDATE_EDITINGTIME']),
        setAllTime(milliseconds) {
            milliseconds = !milliseconds ? 0 : milliseconds;
            return this.$global.ChangeHourMinutestr(milliseconds);
        },
        getWorkStr(ca, val) {
            //debugger
            if (val) {
                let cat = _.find(this[ca], { "id": val });
                return cat.label;
            }
            return "";
        },
        removeBlock(index) {
            console.log('removeBlock', this.blockList);
            //debugger
            this.$emit('removeBlock', this.colIndex, index);
            //this.blockList.splice(index, 1);
            this.UPDATE_EDITBLOCK(null);
        },
        remove(index) {
            this.$confirm('确定移除该工作时间?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.removeBlock(index);
            }).catch(() => { });
        },
        updatePosition(obj) {
            let startMin = obj.startTime / 1000 / 60;
            let height = obj.allTimes / 1000 / 60;
            return {
                "rect": {
                    "height": (height / this.locakMinutes) * this.timeutilHeight,
                    "top": (startMin / this.locakMinutes) * this.timeutilHeight
                }
            }
        },
        handleClickOutside() {
            this.activeIndex = -1;
            this.UPDATE_EDITINDEX('');
        },
        // 
        getMyTime(str, auto) {
            if (!auto) str = str * this.locakMinutes;
            return this.$global.ChangeHourMinutestr(str * 60 * 1000);
        },

        editMyBlock(index) {
            this.activeIndex = index;
            this.currBlock = this.blockList[index];

            this.UPDATE_EDITINDEX(this.colIndex + '-' + this.activeIndex);
            this.UPDATE_EDITBLOCK(_.cloneDeep(this.currBlock));
        },
        // 创建一个新的时间钟块(以30分钟为基本时间)
        createBlock(index, evt) {
            this.activeIndex = this.blockList.length; //this.blockList.length ? this.blockList.length - 1 : 0;
            let target = evt.target.parentElement.parentElement; // 单元格目标
            let startTime = this.locakMinutes * index * 60 * 1000, endTime = this.locakMinutes * (index + 2) * 60 * 1000;
            let obj = {
                "index": this.activeIndex,
                "colIndex": this.colIndex,
                "rowIndex": index,
                "rect": {
                    "top": index * this.timeutilHeight,
                    "height": this.timeutilHeight * 2
                },
                "startTime": startTime,
                "endTime": endTime,
                "allTimes": endTime - startTime
            };
            console.log('this.blockList', this.blockList)
            //debugger
            this.blockList.push(obj);
            this.currBlock = obj;

            // 上报事件 timeline.vue
            this.$emit('addBlock', this.colIndex, obj);

            // 更新store
            this.UPDATE_EDITINDEX(this.colIndex + '-' + this.activeIndex);
            this.UPDATE_EDITBLOCK(_.cloneDeep(this.currBlock));
        },
        changeHourMinutestr(minutes, ext) {
            if (minutes !== "0" && minutes !== "" && minutes !== null) {
                return ((Math.floor(minutes / 60)).toString().length < 2 ? "0" + (Math.floor(minutes / 60)).toString() :
                    (Math.floor(minutes / 60)).toString()) + ":" + ((minutes % 60).toString().length < 2 ? "0" + (minutes % 60).toString() : (minutes % 60).toString());
            } else {
                return "";
            }
        },
        // 时间块resize后重新设定时长
        resetTimes(hh) {
            let minutes = hh * this.locakMinutes; // 总的时间数(this.currBlock.rect.height / this.timeutilHeight)
            this.currBlock.allTimes = minutes * 60 * 1000;
            this.currBlock.endTime = this.currBlock.allTimes + this.currBlock.startTime; //minutes * 60 * 1000;this.changeHourMinutestr((hh + this.currBlock.rowIndex) * this.locakMinutes);
            //console.log('this.currBlock', this.currBlock);
            this.UPDATE_EDITBLOCK(_.cloneDeep(this.currBlock));
        },
        handlerMouserDown(index, evt) {
            //debugger
            this.dragging = true;
            this.currBlock = this.blockList[index];
            const blockEle = evt.target.parentElement;
            const blockRect = blockEle.getBoundingClientRect();
            let dragState = {
                startMouseTop: evt.clientY,
                startHeight: this.currBlock.rect.height
            }
            const handleMouseMove = (event) => {
                const deltaTop = event.clientY - dragState.startMouseTop;
                this.currBlock.rect.height = dragState.startHeight + deltaTop;
            }
            const handleMouseUp = () => {
                if (this.dragging) {
                    this.dragging = false;
                }
                // 锁定为常量this.timeutilHeight 的倍数
                let hh = this.currBlock.rect.height / this.timeutilHeight;
                if (!Number.isInteger(hh)) {
                    // 判断是否过半
                    let hg = Math.ceil(hh);
                    if ((hg - hh) < 0.5) {
                        hh = Math.ceil(hh);
                    } else {
                        hh = Math.floor(hh);
                    }
                    this.currBlock.rect.height = hh * this.timeutilHeight;
                }
                this.resetTimes(hh);
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.onselectstart = null;
                document.ondragstart = null;
            }
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        },
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
@import './timeCol';
</style>
