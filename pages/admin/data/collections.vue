<template>
    <section class="sampage-container">
        <el-scrollbar class="scrollbar">
            <page-data :data="pageForm" :listParam="{}" />
        </el-scrollbar>
    </section>
</template>

<script>
/* eslint-disable */
import pageData from '~/components/page/data'
export default {
    components: {
        pageData
    },
    data: () => ({
        pageForm: {
            "title": "系统数据表",
            "showType": 1,
            "filter": true,
            "filterFields": ["c-type", "label", "name"],
            "content": {
                "title": "系统数据表",
                "gutter": 20,
                "size": "small",
                "colspan": 4,
                "position": "top",
                "itemList": [
                    {
                        "name": "ctype",
                        "label": "是否系统标准表",
                        "type": "Number",
                        "required": true,
                        "component": "sam-select",
                        "options": [
                            {
                                "label": "否",
                                "value": 1
                            },
                            {
                                "label": "是",
                                "value": 2
                            }
                        ],
                        "default": 1,
                        "value": 1,
                        "table": "collections",
                        "tableName": "collections-ctype",
                        "key": "ctype",
                        "rules": [
                            {
                                "required": true,
                                "message": "必填项",
                                "trigger": "change"
                            }
                        ]
                    },
                    {
                        "name": "label",
                        "label": "数据表Label名称",
                        "type": "String",
                        "required": true,
                        "component": "sam-input",
                        "cptype": "text",
                        "default": "",
                        "table": "collections",
                        "tableName": "collections-label",
                        "key": "label",
                        "rules": [
                            {
                                "required": true,
                                "message": "请输入数据表Label名称",
                                "trigger": "blur"
                            }
                        ]
                    },
                    {
                        "name": "name",
                        "label": "数据表name名称",
                        "type": "String",
                        "required": true,
                        "component": "sam-input",
                        "cptype": "text",
                        "default": "",
                        "table": "collections",
                        "tableName": "collections-name",
                        "key": "name",
                        "rules": [
                            {
                                "required": true,
                                "message": "请输入数据表name名称",
                                "trigger": "blur"
                            }
                        ]
                    },
                    {
                        "name": "name",
                    }
                ]
            },
        }
    }),
    methods: {

    },
    mounted() {

    },
    layout: "admin"
}
</script>
<style lang="scss" scoped>
.sampage-container {
    height: 100%;
    overflow: hidden;
    .scrollbar {
        height: 100%;
        /deep/ .el-scrollbar__wrap {
            overflow-x: hidden;
            .el-menu--collapse {
                width: auto;
            }
        }
    }
}
</style>
