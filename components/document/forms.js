/* eslint-disable */
export default {
    catForm: {
        "gutter": 20,
        "colspan": 6,
        "size": "small",
        "itemList": [{
            "name": "name",
            "label": "目录名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": "",
            "rules": [{
                "required": true,
                "message": "请填写文档目录名称",
                "trigger": "blur"
            }],
            "table": "fileCatalog",
            "value": "",
            "tableName": "fileCatalog-name",
            "key": "name"
        }]
    },
    catValue: {
        name: ""
    },
    uploadForm: {
        "gutter": 20,
        "size": "small",
        "itemList": [{
                "name": "d_grade",
                "label": "文档密级",
                "type": "Number",
                "required": true,
                "colspan": 6,
                "component": "sam-select",
                "options": [{
                        "label": "一级",
                        "value": 1
                    },
                    {
                        "label": "二级",
                        "value": 2
                    },
                    {
                        "label": "三级",
                        "value": 3
                    },
                    {
                        "label": "四级",
                        "value": 4
                    },
                    {
                        "label": "五级",
                        "value": 5
                    }
                ],
                "default": 1,
                "table": "docinfo",
                "value": "",
                "tableName": "docinfo-d_grade",
                "key": "d_grade",
                "rules": [{
                    "required": true,
                    "message": "必填项",
                    "trigger": "change"
                }]
            },
            {
                "name": "d_muid",
                "label": "文档负责人",
                "type": "Number",
                "colspan": 6,
                "component": "sam-select",
                "optionsUrl": {
                    "level": 1,
                    "table": "employee",
                    "value": "id",
                    "label": "name",
                    "params": {},
                    "self": "department",
                    "column": { "id": 1, "name": 1 }
                },
                "default": "",
                "table": "docinfo",
                "value": "",
                "tableName": "docinfo-d_muid",
                "key": "d_muid"
            },
            {
                "name": "d_description",
                "label": "文档描述",
                "type": "String",
                "required": false,
                "colspan": 3,
                "component": "sam-input",
                "cptype": "text",
                "default": "",
                "table": "docinfo",
                "value": "",
                "tableName": "docinfo-d_description",
                "key": "d_description"
            }
        ]
    },
    uploadValue: {
        "d_grade": "",
        "d_description": "",
        "d_muid": ""
    },
    docFields: {
        "gutter": 20,
        "colspan": 5,
        "size": "mini",
        "itemList": [{
            "name": "d_uid",
            "label": "录入员",
            "width": 100,
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": "",
            "table": "docinfo",
            "tableName": "docinfo-d_uid",
            "key": "008172e2-b4eb-4179-a7d1-4a363d4050e0-docinfo",
            "rules": [{
                "required": true,
                "message": "必填项",
                "trigger": "blur"
            }]
        }, {
            "name": "d_date",
            "label": "录入日期",
            "width": 120,
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": "",
            "table": "docinfo",
            "value": "",
            "tableName": "docinfo-d_date",
            "key": "e6ceedef-ddc6-407b-bbc3-14679d2b7136-docinfo",
            "rules": [{
                "required": true,
                "message": "必填项",
                "trigger": "change"
            }]
        }, {
            "name": "d_title",
            "label": "文档标题",
            "type": "String",
            "width": 300,
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": "",
            "table": "docinfo",
            "value": "",
            "tableName": "docinfo-d_title",
            "key": "2b2bed70-3092-4c2c-b89c-1483fec708d8-docinfo",
            "rules": [{
                "required": true,
                "message": "必填项",
                "trigger": "blur"
            }]
        }, {
            "name": "d_description",
            "label": "文档描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": "",
            "table": "docinfo",
            "value": "",
            "tableName": "docinfo-d_description",
            "key": "ba2019da-8e7f-47bf-a6d5-f9426b6a5b69-docinfo"
        }, {
            "name": "d_grade",
            "label": "文档密级",
            "type": "Number",
            "width": 90,
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "一级",
                    "value": 1
                },
                {
                    "label": "二级",
                    "value": 2
                },
                {
                    "label": "三级",
                    "value": 3
                },
                {
                    "label": "四级",
                    "value": 4
                },
                {
                    "label": "五级",
                    "value": 5
                }
            ],
            "default": "",
            "table": "docinfo",
            "value": "",
            "tableName": "docinfo-d_grade",
            "key": "99ee7693-c819-42de-b1b1-40021023f7e6-docinfo",
            "rules": [{
                "required": true,
                "message": "必填项",
                "trigger": "change"
            }]
        }, {
            "name": "d_muid",
            "label": "文档负责人",
            "type": "Number",
            "width": 100,
            "component": "sam-select",
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": "",
            "table": "docinfo",
            "value": "",
            "tableName": "docinfo-d_muid",
            "key": "07e21da0-e29e-4f29-86bc-532f53d22fe9-docinfo"
        }, {
            "name": "d_department",
            "label": "文档所属科室",
            "type": "Array",
            "component": "sam-cascader",
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": {
                    "id": 1,
                    "dept_parentid": 1,
                    "dept_name": 1
                }
            },
            "default": [],
            "table": "docinfo",
            "value": "",
            "tableName": "docinfo-d_department",
            "key": "617c20b4-91aa-4b31-b90e-6edc04b083ce-docinfo"
        }]
    },
    gradeArr: [{
            "label": "一级",
            "value": 1
        },
        {
            "label": "二级",
            "value": 2
        },
        {
            "label": "三级",
            "value": 3
        },
        {
            "label": "四级",
            "value": 4
        },
        {
            "label": "五级",
            "value": 5
        }
    ]
}