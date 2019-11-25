/* eslint-disable */
module.exports = {
    dashboard:{
        directory:'api/dashboard/getDashboardDirectorys',           // dashboard目录
		valueSet:'api/dict/getValueSetByDictId',                    // 值集
		dataSource:'api/dashboard/getDataSources',                  // 数据源
		dataFields:'api/dashboard/getDataSourceFields',             // 数据源字段
		runChart:'api/dashboard/run',                               // dashboard运行
		checkLegends:'api/dashboard/checkLegends',                  // chart 图例检查
		logical:'api/report/getArgs'
    }
}
