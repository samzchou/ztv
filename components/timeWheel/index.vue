<template>
    <div class="time-wheel">
        <div v-for="i in count" :key="i" :title="`t-${i}`" :style="Object.assign({},{ transform: 'rotate('+getRot(i-1)+'deg) skewY('+skew+'deg)' })"></div>
    </div>
</template>

<script>
export default {
    props: {
        count: {
            type: Number,
            default: 10
        }
    },
    computed: {

    },
    data: () => ({
        ro: 45,     // 旋转角度
        skew: -45,  // 倾斜度
    }),
    methods: {
        getRot(index) {
            return this.ro * index;
        }
    },

    created() {
        //this.ro = 360 / this.count;
        //this.skew = 180 / (this.count / 2);
    }
}
</script>

<style lang="scss" scoped>
.time-wheel {
    position: relative;
    margin: 0 auto;
    padding: 0;
    width: 15em;
    height: 15em;
    border-radius: 100%;
    list-style: none;
    overflow: hidden;
    transform: rotate(0deg);
    > div {
        background-color: #ddd;
        overflow: hidden;
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 50%;
        transform-origin: 0% 100%;
        &:nth-child(odd) {
            background-color: #ccc;
        }
    }
}
</style>
