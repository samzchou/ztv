<template>
    <section class="chart-container">
        <client-only>
            <echart :options="chartItem" ref="myEchart" :autoresize="true" />
        </client-only>
    </section>
</template>

<script>
const chartSample = require('~/config/chartSample');
export default {
    name: "chart-worktimes",
    data: () => ({
        chartItem: chartSample['line-standard']
    })
}
</script>

<style lang="scss" scoped>
.chart-container {
	width: 100%;
	/deep/ .echarts {
		width: 100%;
	}
}
</style>
