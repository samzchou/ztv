<template>
    <div ref="area" :class="clockArea" :style="areaStyle">
        <div :style="cssClock">
            <div :class="clockBack"></div>
            <div :style="cssDotWrap">
                <div v-for="(dot,i) in 60" :key="i" :style="Object.assign({},{transform: 'rotateZ('+i*6+'deg)',height: i%5==0?longDot.height:shourtDot.height,width: i%5==0? longDot.width:shourtDot.width},cssDot)"></div>
            </div>
            <div class="clock-name">中浙高铁</div>
            <div :style="Object.assign({},{ transform: 'rotateZ('+hour+'deg)' })" :class="hourNeedle"></div>
            <div :style="Object.assign({},{ transform: 'rotateZ('+min+'deg)' })" :class="minNeedle"></div>
            <div :style="Object.assign({},{ transform: 'rotateZ('+sec+'deg)' })" :class="secondNeedle"></div>
            <div :class="clockDot"></div>
        </div>
        <div :class="clockTitle" :style="style">
            <div>{{getcurrDate}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "my-clock",
    props: {
        areaRect: {
            type: Object,
            default: {
                width: 300,
                height: 300
            }
        }
    },
    computed: {
        areaStyle() {
            return {
                width: this.areaRect.width + 'px',
                height: this.areaRect.height + 'px',
            }
        },
        sec() { //将当前秒数转化为秒针旋转的度数
            return this.currTime.getSeconds() * 6
        },
        min() { //将当前的分钟数转化为分针旋转的度数
            return this.currTime.getMinutes() * 6 + this.currTime.getSeconds() / 60 * 6
        },
        hour() { //将当前的小时数转化为时针旋转的度数
            return this.currTime.getHours() * 30 + this.currTime.getMinutes() / 60 * 30
        },
        timeDisplayArea() { // 当前时间
            let hours = this.currTime.getHours() > 9 ? this.currTime.getHours() : ('0' + this.currTime.getHours())
            let minutes = this.currTime.getMinutes() > 9 ? this.currTime.getMinutes() : ('0' + this.currTime.getMinutes())
            let seconds = this.currTime.getSeconds() > 9 ? this.currTime.getSeconds() : ('0' + this.currTime.getSeconds())
            return hours + ':' + minutes + ':' + seconds
        },
        getcurrDate() { // 当前日期
            return moment(this.currTime).format('YYYY-MM-DD, a hh:mm:ss')
        },
        hourNeedle() { //时针的class
            return `${this.prefixCss}hour-needle`
        },
        minNeedle() { //分针的class
            return `${this.prefixCss}min-needle`
        },
        secondNeedle() { //秒针的class
            return `${this.prefixCss}second-needle`
        },
        clockArea() { //表盘的区域
            return `${this.prefixCss}clock-area`
        },
        clockBack() { //时钟的背景（外框图片）
            return `${this.prefixCss}clock-back`
        },
        clockTitle() { //时钟的title的class
            return `${this.prefixCss}clock-title`
        },
        clockDot() { //时钟的中心点
            return `${this.prefixCss}clock-dot`
        }
    },
    data: () => ({
        prefixCss: 'jhc-', // css 前缀
        cssClock: { //整个钟的盒子
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
        },
        cssDotWrap: { //装刻度的盒子
            width: '100%',
            height: '100%'
        },
        cssDot: { //刻度们
            position: 'absolute',
            backgroundColor: '#509fef'
        },
        longDot: { //长刻度
            width: '3px',
            height: '10px'
        },
        shourtDot: { //短刻度
            width: '1px',
            height: '5px'
        },
        timer: null, //用来标记自适应大小的timer
        updateTimer: null, // 更新时钟的timer
        style: {
            bottom: '0px'
        }, //时钟的title的style
        scale: 0.8, // 时钟占外层的百分比
        currTime: new Date() //当前日期对象
    }),
    methods: {
        //设置钟表的型号大小
        setClockSize() {
            let width = this.getWidth()
            let height = this.getHeight()
            //时钟占外层的百分比
            let scale = this.scale
            //获取较短边
            let shortLth = width
            if (width > height) {
                shortLth = height
            }
            //对时钟的直径做处理
            shortLth = shortLth * scale
            //获取到顶部和左部的距离
            let paddingW = (width - shortLth) / 2
            let paddingH = (height - shortLth) / 2 - 10
            //设置钟表整体的大小以及位置
            this.setStates('cssClock', {
                height: shortLth + 'px',
                width: shortLth + 'px',
                top: paddingH + 'px',
                left: paddingW + 'px',
            })
            //设置刻度所围绕区域的位置
            this.setStates('cssDotWrap', {
                transform: `translate(${shortLth * 0.52}px,${shortLth * 0.16}px)` // 0.52 和 0.16 是我一点一点挪出来的，啊哈哈
            })
            //设置长短刻度的半径,以及尺寸
            let dotRadius = shortLth * 0.75 / 2 - 1
            let longDotWidth = Math.floor(dotRadius / 25) || 2
            let longDotHeight = Math.floor(dotRadius / 8) || 6
            let shortDotWidth = Math.floor(dotRadius / 50) || 1
            let shortDotHeight = Math.floor(dotRadius / 16) || 3
            //短刻度
            this.shourtDot = {
                width: shortDotWidth + 'px',
                height: shortDotHeight + 'px'
            }
            //长刻度
            this.longDot = {
                width: longDotWidth + 'px',
                height: longDotHeight + 'px'
            }
            //设置刻度旋转点的位置
            this.setStates('cssDot', { transformOrigin: `${0}px ${dotRadius}px` })
        },
        getWidth() { //获取指定容器的宽度
            return this.getRef('area').offsetWidth || 200
        },
        getHeight() { //获取指定容器的高度
            return this.getRef('area').offsetHeight || 200
        },
        getRef(ref) { // 获取指定 ref 对象
            return this.$refs && this.$refs[ref] || {}
        },
        // states
        setStates(prop, data) {
            let cache = this[prop]
            this[prop] = Object.assign({}, cache, JSON.parse(JSON.stringify(data)))
        },
        async setcurrTime() {
            let res = await this.$axios.$post('mock/db', { data: { type: "getServerTime" } });
            this.currTime = new Date(res);

            clearInterval(this.updateTimer);
            this.updateTimer = setInterval(() => {
                this.currTime = new Date();
            }, 1000);
        }
    },
    created() {
        this.setcurrTime()
        /* this.currTime = new Date();
        clearInterval(this.updateTimer);
        this.updateTimer = setInterval(() => {
            this.currTime = new Date();
        }, 1000); */
    },
    mounted() {
        //设置时钟的大小
        this.setClockSize()
    },
    beforeDestroy() {
        this.updateTimer && clearInterval(this.updateTimer)
    },
}
</script>

<style lang="scss" scoped>
.jhc-hour-needle {
    z-index: 3;
    width: 6%;
    height: 25%;
    position: absolute;
    left: 49%;
    bottom: 47%;
    transform-origin: center bottom;
    background: url(~assets/images/hourPoint.png) no-repeat;
    background-size: 100% 100%;
}

.jhc-min-needle {
    z-index: 2;
    width: 6%;
    height: 30%;
    position: absolute;
    left: 49%;
    bottom: 47%;
    transform-origin: center bottom;
    background: url(~assets/images/minPoint.png) no-repeat;
    background-size: 100% 100%;
}
.jhc-second-needle {
    z-index: 1;
    width: 6%;
    height: 38%;
    position: absolute;
    left: 49%;
    bottom: 47%;
    transform-origin: center bottom;
    background: url(~assets/images/secPoint.png) no-repeat;
    background-size: 100% 100%;
}

.jhc-clock-area {
    width: 200px;
    height: 200px;
    position: relative;
    //background: #050842;
    .clock-name {
        position: absolute;
        top: 25%;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: rgba(255, 255, 255, 0.4);
    }
}

.jhc-clock-back {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background: url(~assets/images/clockBack.png) no-repeat;
    background-size: 100% 100%;
    background-color: #4f6a8c;
    border-radius: 50%;
}

.jhc-clock-title {
    //color: #fff;
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    font-weight: bold;
}

.jhc-clock-dot {
    width: 6%;
    height: 6%;
    border-radius: 50%;
    position: absolute;
    background-color: #509fef;
    z-index: 20;
    left: 49%;
    top: 50.5%;
    box-shadow: 0px 0px 10px 1px #000;
}
</style>


