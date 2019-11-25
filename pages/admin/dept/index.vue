<template>
    <section>
        <page-data :data="formData" :listParam="{}" :isTree="{'parentKey':'dept_parentid'}" />
    </section>
</template>

<script>

import samForm from '~/components/form';
import pageData from '~/components/page/data';
export default {
    components: {
        samForm, pageData
    },

    data: () => ({
        formData: {
            title: "机构部门",
            content: {
                "gutter": 20,
                "colspan": 3,
                "size": "small",
                "itemList": [
                    {
                        "name": "dept_parentid",
                        "label": "上级部门",
                        "type": "Number",
                        "component": "sam-select",
                        "optionsUrl": {
                            "table": "department",
                            "params": {
                                "dept_parentid": 0
                            },
                            "label": "dept_name",
                            "value": "id"
                        },
                        "level": 0,
                        "default": 0,
                        "table": "department",
                        "value": "",
                        "tableName": "department-dept_parentid",
                        "key": "b63b6894-c1e5-4448-95ee-b12dd68d4e51-department"
                    },
                    {
                        "name": "dept_name",
                        "type": "String",
                        "component": "sam-input",
                        "cptype": "text",
                        "required": true,
                        "default": "",
                        "label": "部门名称",
                        "table": "department",
                        "value": "",
                        "tableName": "department-dept_name",
                        "key": "17c9c47b-366b-46b9-8c07-62cc4fa19940-department",
                        "rules": [
                            {
                                "required": true,
                                "message": "必填项",
                                "trigger": "blur"
                            }
                        ]
                    }
                ]
            }
        }
    }),
    layout: "admin"
}
</script>
