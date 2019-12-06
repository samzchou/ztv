/* eslint-disable */
export default {
    /*----------工作分类信息表-----------*/
    workType: {
        "collInfo": {
            "name": "workType",
            "label": "工作分类",
            "hide": true
        },
        "name": {
            "name": "name",
            "label": "工作分类名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "value": ""
        },
        "disabled": {
            "name": "disabled",
            "label": "是否禁用",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "否",
                    "value": 0
                },
                {
                    "label": "是",
                    "value": 1
                }
            ],
            "value": 0
        },
        "sort": {
            "name": "sort",
            "label": "排序",
            "type": "Number",
            "component": "sam-number",
            "value": 1
        }
    },
    /*----------项目信息表-----------*/
    workProject: {
        "collInfo": {
            "name": "workProject",
            "label": "工作项目",
            "hide": true
        },
		"typeid": {
            "name": "typeid",
            "label": "工作分类",
            "width": 100,
            "component": "sam-select",
            "required": true,
            "optionsUrl": {
                "table": "workType",
                "label": "name",
                "value": "id"
            },
            "default": 0
        },
        "name": {
            "name": "name",
            "label": "项目名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "value": ""
        },
        "disabled": {
            "name": "disabled",
            "label": "是否禁用",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "否",
                    "value": 0
                },
                {
                    "label": "是",
                    "value": 1
                }
            ],
            "value": 0
        },
        "sort": {
            "name": "sort",
            "label": "排序",
            "type": "Number",
            "component": "sam-number",
            "value": 1
        }
    },
    /*----------员工信息表-----------*/
    employee: {
        "collInfo": {
            "name": "employee",
            "label": "员工信息表",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "username": {
            "name": "username",
            "label": "系统账号",
            "width": 150,
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": "",
            "rules": [{
                    "required": true,
                    "message": "请填写账号",
                    "trigger": "blur"
                },
                {
                    "sql": "same"
                }
            ]
        },
        "password": {
            "name": "password",
            "label": "登陆密码",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "tableHide": true,
            "default": ""
        },
        "roles": {
            "name": "roles",
            "label": "角色权限",
            "width": 150,
            "component": "sam-select",
            "required": true,
            "optionsUrl": {
                "table": "roles",
                "label": "name",
                "value": "id"
            },
            "default": 0
        },
        "name": {
            "name": "name",
            "label": "员工姓名",
            "width": 120,
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "sex": {
            "name": "sex",
            "label": "性别",
            "width": 80,
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                "label": "男",
                "value": 1
            }, {
                "label": "女",
                "value": 2
            }],
            "default": 1
        },
        "birth": {
            "name": "birth",
            "label": "出生日期",
            "width": 150,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "political_status": {
            "name": "political_status",
            "label": "政治面貌",
            "width": 100,
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "群众",
                    "value": 1
                },
                {
                    "label": "中共团员",
                    "value": 2
                },
                {
                    "label": "中共党员",
                    "value": 3
                },
                {
                    "label": "其他党派成员",
                    "value": 4
                }
            ],
            "default": 0
        },
        "marital": {
            "name": "marital",
            "label": "婚姻状况",
            "width": 100,
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "未婚",
                    "value": 1
                },
                {
                    "label": "已婚",
                    "value": 2
                },
                {
                    "label": "离异",
                    "value": 3
                }
            ],
            "default": 1
        },
        "domicile": {
            "name": "domicile",
            "label": "户籍所在地",
            "width": 250,
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "optionsConst": "citys",
            "default": []
        },
        "domicile_type": {
            "name": "domicile_type",
            "label": "户籍类别",
            "width": 100,
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                "label": "非农",
                "value": 1
            }, {
                "label": "农业",
                "value": 2
            }],
            "default": 1
        },
        "education": {
            "name": "education",
            "label": "学历",
            "type": "Number",
            "width": 90,
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "小学",
                    "value": 1
                },
                {
                    "label": "初中",
                    "value": 2
                },
                {
                    "label": "高中职",
                    "value": 3
                },
                {
                    "label": "大专",
                    "value": 4
                },
                {
                    "label": "本科",
                    "value": 5
                },
                {
                    "label": "研究生/硕士",
                    "value": 6
                },
                {
                    "label": "博士",
                    "value": 7
                }
            ],
            "default": 5
        },
        "profession": {
            "name": "profession",
            "label": "专业",
            "width": 120,
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "graduate": {
            "name": "graduate",
            "label": "毕业院校",
            "width": 200,
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "idcard": {
            "name": "idcard",
            "label": "身份证/护照号",
            "width": 150,
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": "",
            "rules": [{
                    "required": true,
                    "message": "身份证/护照号",
                    "trigger": "blur"
                },
                {
                    "sql": "same"
                }
            ]
        },
        "mobile": {
            "name": "mobile",
            "label": "手机",
            "width": 120,
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": "",
            "rules": [{
                    "required": true,
                    "message": "请填写手机",
                    "trigger": "blur"
                },
                {
                    "sql": "same"
                }
            ]
        },
        "phone": {
            "name": "phone",
            "label": "电话",
            "width": 150,
            "type": "String",
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "house_address": {
            "name": "house_address",
            "label": "家庭住址",
            "width": 250,
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "current_address": {
            "name": "current_address",
            "label": "现在住址",
            "width": 250,
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "number_code": {
            "name": "number_code",
            "label": "工号",
            "width": 150,
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "code",
            "fun": {
                "event": "getAutoCode",
                "type": "employee"
            },
            "default": "",
            "rules": [{
                    "required": true,
                    "message": "请填写工号",
                    "trigger": "blur"
                },
                {
                    "sql": "same"
                }
            ]
        },
        "department": {
            "name": "department",
            "label": "所属部门",
            "width": 200,
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {},
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                }
            },
            "default": []
        },
        "position": {
            "name": "position",
            "label": "岗位",
            "width": 150,
            "type": "String",
            "required": true,
            "component": "sam-input",
            "default": ""
        },
        "e_title": {
            "name": "e_title",
            "label": "职称",
            "width": 150,
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "join_date": {
            "name": "join_date",
            "label": "入职日期",
            "width": 120,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "regular_date": {
            "name": "regular_date",
            "label": "转正日期",
            "width": 120,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "work_age": {
            "name": "work_age",
            "label": "实际工龄",
            "width": 100,
            "type": "Number",
            "required": true,
            "component": "sam-number",
            "append": "年",
            "default": 0
        },
        "work_age_revise": {
            "name": "work_age_revise",
            "label": "工龄修正",
            "width": 100,
            "type": "Number",
            "component": "sam-number",
            "append": "年",
            "default": 0
        },
        "annual_age": {
            "name": "annual_age",
            "label": "年假工龄",
            "width": 100,
            "type": "Number",
            "required": true,
            "component": "sam-number",
            "append": "年",
            "default": 0
        },
        "e_type": {
            "name": "e_type",
            "label": "员工类别",
            "width": 100,
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "临时工",
                    "value": 1
                },
                {
                    "label": "试用期",
                    "value": 2
                },
                {
                    "label": "合同工",
                    "value": 3
                },
                {
                    "label": "已退休",
                    "value": 4
                },
                {
                    "label": "外援",
                    "value": 5
                }
            ],
            "default": 2
        },
        "salary_type": {
            "name": "salary_type",
            "label": "工资类别",
            "width": 100,
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "P2级",
                    "value": 1
                },
                {
                    "label": "P4级",
                    "value": 2
                },
                {
                    "label": "P6级",
                    "value": 3
                },
                {
                    "label": "P7级",
                    "value": 4
                },
                {
                    "label": "P8级",
                    "value": 5
                }
            ],
            "default": 2
        },
        "security_office": {
            "name": "security_office",
            "label": "社保所属",
            "width": 150,
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "optionsConst": "citys",
            "default": []
        },
        "e_status": {
            "name": "e_status",
            "label": "员工状态",
            "width": 100,
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "在职",
                    "value": 1
                },
                {
                    "label": "已离职",
                    "value": 2
                },
                {
                    "label": "退休",
                    "value": 3
                }
            ],
            "default": 1
        }
    },
    /*----------图纸信息表-----------*/
    blueprint: {
        "collInfo": {
            "name": "blueprint",
            "label": "图纸信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
        // 涉及人员选择参考这里
        "emp_id": {
            "name": "emp_id",
            "label": "录入员",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "entry_date": {
            "name": "entry_date",
            "label": "录入日期",
            "hideForm": true,
            "type": "Number",
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "contract_id": {
            "name": "contract_id",
            "label": "合同号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "production_code": {
            "name": "production_code",
            "label": "生产指令代码",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "project_name": {
            "name": "project_name",
            "label": "项目名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "used_area": {
            "name": "used_area",
            "label": "使用场所",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "application_industry": {
            "name": "application_industry",
            "label": "应用行业",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "product_name": {
            "name": "product_name",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "product_characteristic": {
            "name": "product_characteristic",
            "label": "产品特性",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "product_specification": {
            "name": "product_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "product_model": {
            "name": "product_model",
            "label": "产品型号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "putinto": {
            "name": "putinto",
            "label": "是否投入生产",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "否",
                    "value": 0
                },
                {
                    "label": "是",
                    "value": 1
                }
            ],
            "value": 1
        },
        "blueprint_code": {
            "name": "blueprint_code",
            "label": "图纸编码",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "code",
            "default": ""
        },
        "blueprint_type": {
            "name": "blueprint_type",
            "label": "图纸类型",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "create_date": {
            "name": "create_date",
            "label": "图纸创建日期",
            "type": "Number",
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "file_name": {
            "name": "file_name",
            "label": "图纸文件名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "blueprint_designer": {
            "name": "blueprint_designer",
            "label": "图纸设计人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "blueprint_countersigner": {
            "name": "blueprint_countersigner",
            "label": "图纸会签人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "blueprint_standardized": {
            "name": "blueprint_standardized",
            "label": "图纸标准化人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "blueprint_auditor": {
            "name": "blueprint_auditor",
            "label": "图纸审核人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        // 涉及部门选择参考这里
        "blueprint_department": {
            "name": "blueprint_department",
            "label": "图纸归属部门",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "standard_id": {
            "name": "standard_id",
            "label": "图纸涉及标准编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "status": {
            "name": "status",
            "label": "图纸当前状态",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                "label": "设计中",
                "value": 1
            }, {
                "label": "使用中",
                "value": 2
            }, {
                "label": "已废弃",
                "value": 3
            }],
            "default": 1
        },
        "blueprint_version": {
            "name": "blueprint_version",
            "label": "图纸版本号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "safety_grade": {
            "name": "safety_grade",
            "label": "图纸密级",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                "label": "一级",
                "value": 1
            }, {
                "label": "二级",
                "value": 2
            }, {
                "label": "三级",
                "value": 3
            }],
            "default": 1
        }
    },
    /*----------生产调整信息-----------*/
    produceadjust: {
        "collInfo": {
            "name": "produceadjust",
            "label": "生产调整信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "pa_operator": {
            "name": "pa_operator",
            "label": "录入员姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pa_operator_id": {
            "name": "pa_operator_id",
            "label": "录入员工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pa_operator_t": {
            "name": "pa_operator_t",
            "label": "录入员UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "pa_entry_date": {
            "name": "pa_entry_date",
            "label": "录入日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "pa_priority": {
            "name": "pa_priority",
            "label": "调整优先级",
            "type": "Number",
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
                }
            ],
            "default": 1
        },
        "pa_title": {
            "name": "pa_title",
            "label": "调整标题",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pa_description": {
            "name": "pa_description",
            "label": "调整描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pa_pic_name": {
            "name": "pa_pic_name",
            "label": "调整负责人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pa_department": {
            "name": "pa_department",
            "label": "调整所属科室",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "pa_remark": {
            "name": "pa_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------问题反馈信息-----------*/
    problem: {
        "collInfo": {
            "name": "problem",
            "label": "问题反馈信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "p_operator": {
            "name": "p_operator",
            "label": "录入员姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "p_operator_id": {
            "name": "p_operator_id",
            "label": "录入员工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": "",
        },
        "p_operator_t": {
            "name": "p_operator_t",
            "label": "录入员UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "p_entry_date": {
            "name": "p_entry_date",
            "label": "录入日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "p_title": {
            "name": "p_title",
            "label": "问题标题",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "p_priority": {
            "name": "p_priority",
            "label": "问题优先级",
            "type": "Number",
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
                }
            ],
            "default": 1
        },
        "p_description": {
            "name": "p_description",
            "label": "问题描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "p_department": {
            "name": "p_department",
            "label": "问题所属科室",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "p_pic_name": {
            "name": "p_pic_name",
            "label": "问题负责人",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "p_remark": {
            "name": "p_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------分配任务-----------*/
    assigntask: {
        "collInfo": {
            "name": "assigntask",
            "label": "分配任务",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "at_assigner": {
            "name": "at_assigner",
            "label": "分配人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "at_assigner_id": {
            "name": "at_assigner_id",
            "label": "分配人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": "",
        },
        "at_assigner_t": {
            "name": "at_assigner_t",
            "label": "分配人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "at_task": {
            "name": "at_task",
            "label": "任务名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "at_task_id": {
            "name": "at_task_id",
            "label": "任务编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "at_priority": {
            "name": "at_priority",
            "label": "任务优先级",
            "type": "Number",
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
                }
            ],
            "default": 1
        },
        "at_description": {
            "name": "at_description",
            "label": "任务描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "at_department": {
            "name": "at_department",
            "label": "任务所属科室",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "at_pic_name": {
            "name": "at_pic_name",
            "label": "负责人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "at_startdate": {
            "name": "at_startdate",
            "label": "起始日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "at_finishdate": {
            "name": "at_finishdate",
            "label": "结束日期",
            "hideForm": true,
            "type": "Number",
            "required": false,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "at_remark": {
            "name": "at_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------文档信息表-----------*/
    docinfo: {
        "collInfo": {
            "name": "docinfo",
            "label": "文档信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
		"filecata_id":{
			"name": "d_uid",
            "label": "文档目录ID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "cptype": "text",
            "default": 0
		},
        "d_uid": {
            "name": "d_uid",
            "label": "录入员",
			"hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "d_date": {
            "name": "d_date",
            "label": "录入日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "d_doctype": {
            "name": "d_doctype",
            "label": "文档分类",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "部门内部文档",
                    "value": 1
                },
                {
                    "label": "公司文档",
                    "value": 2
                },
                {
                    "label": "个人私有文档",
                    "value": 3
                }
            ],
            "default": ""
        },
        "d_docname": {
            "name": "d_docname",
            "label": "文档名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"d_size": {
            "name": "d_size",
            "label": "文档大小",
            "type": "Number",
            "required": true,
            "component": "sam-input",
            "default": ""
        },
        "d_title": {
            "name": "d_title",
            "label": "文档标题",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "d_description": {
            "name": "d_description",
            "label": "文档描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "d_grade": {
            "name": "d_grade",
            "label": "文档密级",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                "label": "一级",
                "value": 1
            }, {
                "label": "二级",
                "value": 2
            }, {
                "label": "三级",
                "value": 3
            },{
                "label": "四级",
                "value": 4
            },{
                "label": "五级",
                "value": 5
            }],
            "default": ""
        },
        "d_muid": {
            "name": "d_muid",
            "label": "文档负责人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "label": "name",
                "params": {
                    "department": "$self"
                },
                "column": { "id": 1, "name": 1 }
            },
            "default": ""
        },
        "d_department": {
            "name": "d_department",
            "label": "文档所属科室",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        }
    },
    /*----------生产任务信息-----------*/
    producetask: {
        "collInfo": {
            "name": "producetask",
            "label": "生产任务信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "pt_creator": {
            "name": "pt_creator",
            "label": "创建者姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pt_creator_id": {
            "name": "pt_creator_id",
            "label": "创建者工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pt_creator_t": {
            "name": "pt_creator_t",
            "label": "创建者UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "pt_task_id": {
            "name": "pt_task_id",
            "label": "任务编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pt_title": {
            "name": "pt_title",
            "label": "任务标题",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pt_task_type": {
            "name": "pt_task_type",
            "type": "Number",
            "label": "任务类别",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "a",
                    "value": 1
                },
                {
                    "label": "b",
                    "value": 2
                },
                {
                    "label": "c",
                    "value": 3
                }
            ],
            "default": 1
        },
        "pt_project": {
            "name": "pt_project",
            "label": "所属项目",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pt_blueprint": {
            "name": "pt_blueprint",
            "label": "所属图纸",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pt_document": {
            "name": "pt_document",
            "label": "所属文档",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pt_description": {
            "name": "pt_description",
            "label": "任务描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pt_process_node": {
            "name": "pt_process_node",
            "label": "工序节点",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pt_create_time": {
            "name": "pt_create_time",
            "label": "任务创建时间",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": new Date().getTime()
        },
        "pt_finish_time": {
            "name": "pt_finish_time",
            "label": "任务完成时间",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": new Date().getTime()
        },
        "pt_finish_person": {
            "name": "pt_finish_person",
            "label": "完成此任务员工姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pt_department": {
            "name": "pt_department",
            "label": "任务所属科室",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "pt_pic_name": {
            "name": "pt_pic_name",
            "label": "任务负责人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pt_remark": {
            "name": "pt_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------残次废品信息-----------*/
    imperfections: {
        "collInfo": {
            "name": "imperfections",
            "label": "残次废品信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "im_reporter": {
            "name": "im_reporter",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "im_reporter_id": {
            "name": "im_reporter_id",
            "label": "报告人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "im_reporter_t": {
            "name": "im_reporter_t",
            "label": "报告人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "im_report_date": {
            "name": "im_report_date",
            "label": "报告日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "im_product": {
            "name": "im_product",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "im_specification": {
            "name": "im_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "im_type": {
            "name": "im_type",
            "type": "Number",
            "label": "类别",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "a",
                    "value": 1
                },
                {
                    "label": "b",
                    "value": 2
                },
                {
                    "label": "c",
                    "value": 3
                }
            ],
            "default": 1
        },
        "im_reason": {
            "name": "im_reason",
            "label": "原因",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "im_process_node": {
            "name": "im_process_node",
            "label": "生产过程节点",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "im_description": {
            "name": "im_description",
            "label": "描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "im_area": {
            "name": "im_area",
            "label": "科室/车间",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "im_cost": {
            "name": "im_cost",
            "label": "成本",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "im_pic_name": {
            "name": "im_pic_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "im_measure": {
            "name": "im_measure",
            "label": "处理措施",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "im_result": {
            "name": "im_result",
            "label": "处理结果",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "im_remark": {
            "name": "im_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------设计图纸与生产不匹配信息-----------*/
    mismatch: {
        "collInfo": {
            "name": "mismatch",
            "label": "设计图纸与生产不匹配信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "mi_reporter": {
            "name": "mi_reporter",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mi_reporter_id": {
            "name": "mi_reporter_id",
            "label": "报告人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mi_reporter_t": {
            "name": "mi_reporter_t",
            "label": "报告人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "mi_report_date": {
            "name": "mi_report_date",
            "label": "报告日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "mi_product": {
            "name": "mi_product",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mi_specification": {
            "name": "mi_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mi_project": {
            "name": "mi_project",
            "label": "项目名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mi_blueprint_id": {
            "name": "mi_blueprint_id",
            "label": "图纸编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mi_reason": {
            "name": "mi_reason",
            "label": "原因",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mi_process_node": {
            "name": "mi_process_node",
            "label": "生产过程节点",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mi_description": {
            "name": "mi_description",
            "label": "描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mi_area": {
            "name": "mi_area",
            "label": "科室/车间",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "mi_pic_name": {
            "name": "mi_pic_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mi_measure": {
            "name": "mi_measure",
            "label": "处理措施",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mi_result": {
            "name": "mi_result",
            "label": "处理结果",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mi_remark": {
            "name": "mi_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------生产问题信息-----------*/
    produceproblem: {
        "collInfo": {
            "name": "produceproblem",
            "label": "生产问题信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "pp_reporter": {
            "name": "pp_reporter",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pp_reporter_id": {
            "name": "pp_reporter_id",
            "label": "报告人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pp_reporter_t": {
            "name": "pp_reporter_t",
            "label": "报告人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "pp_report_date": {
            "name": "pp_report_date",
            "label": "报告日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "pp_product": {
            "name": "pp_product",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pp_specification": {
            "name": "pp_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pp_project": {
            "name": "pp_project",
            "label": "项目名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pp_description": {
            "name": "pp_description",
            "label": "问题描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pp_process_node": {
            "name": "pp_process_node",
            "label": "生产过程节点",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pp_area": {
            "name": "pp_area",
            "label": "科室/车间",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "pp_pic_name": {
            "name": "pp_pic_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pp_measure": {
            "name": "pp_measure",
            "label": "处理措施",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pp_result": {
            "name": "pp_result",
            "label": "处理结果",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pp_remark": {
            "name": "pp_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------材料准备不充分问题信息-----------*/
    materialpreparation: {
        "collInfo": {
            "name": "materialpreparation",
            "label": "材料准备不充分问题信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "mpi_reporter": {
            "name": "mpi_reporter",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mpi_reporter_id": {
            "name": "mpi_reporter_id",
            "label": "报告人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mpi_reporter_t": {
            "name": "mpi_reporter_t",
            "label": "报告人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "mpi_report_date": {
            "name": "mpi_report_date",
            "label": "报告日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "mpi_product": {
            "name": "mpi_product",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mpi_specification": {
            "name": "mpi_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mpi_project": {
            "name": "mpi_project",
            "label": "项目名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mpi_blueprint_id": {
            "name": "mpi_blueprint_id",
            "label": "图纸编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mpi_reason": {
            "name": "mpi_reason",
            "label": "问题原因",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mpi_process_node": {
            "name": "mpi_process_node",
            "label": "生产过程节点",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mpi_description": {
            "name": "mpi_description",
            "label": "问题描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mpi_area": {
            "name": "mpi_area",
            "label": "科室/车间",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "mpi_pic_name": {
            "name": "mpi_pic_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mpi_measure": {
            "name": "mpi_measure",
            "label": "处理措施",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mpi_result": {
            "name": "mpi_result",
            "label": "处理结果",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "mpi_remark": {
            "name": "mpi_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------建议与改进-----------*/
    improvement: {
        "collInfo": {
            "name": "improvement",
            "label": "建议与改进",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "i_reporter": {
            "name": "i_reporter",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "i_reporter_id": {
            "name": "i_reporter_id",
            "label": "报告人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "i_reporter_t": {
            "name": "i_reporter_t",
            "label": "报告人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "i_report_date": {
            "name": "i_report_date",
            "label": "报告日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "i_product": {
            "name": "i_product",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "i_specification": {
            "name": "i_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "i_project": {
            "name": "i_project",
            "label": "项目名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "i_blueprint_id": {
            "name": "i_blueprint_id",
            "label": "图纸编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "i_description": {
            "name": "i_description",
            "label": "建议描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "i_process_node": {
            "name": "i_process_node",
            "label": "生产过程节点",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "i_area": {
            "name": "i_area",
            "label": "科室/车间",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "i_pic_name": {
            "name": "i_pic_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "i_remark": {
            "name": "i_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------产品生产过程数据信息-----------*/
    produceprocess: {
        "collInfo": {
            "name": "produceprocess",
            "label": "产品生产过程数据信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "pproc_process_node": {
            "name": "pproc_process_node",
            "label": "生产过程节点",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pproc_project": {
            "name": "pproc_project",
            "label": "项目名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pproc_product": {
            "name": "pproc_product",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pproc_specification": {
            "name": "pproc_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pproc_product_id": {
            "name": "pproc_product_id",
            "label": "产品编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pproc_data": {
            "name": "pproc_data",
            "label": "产品数据",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pproc_area": {
            "name": "pproc_area",
            "label": "科室/车间",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "pproc_reporter": {
            "name": "pproc_reporter",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pproc_reporter_id": {
            "name": "pproc_reporter_id",
            "label": "报告人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pproc_reporter_t": {
            "name": "pproc_reporter_t",
            "label": "报告人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "pproc_report_date": {
            "name": "pproc_report_date",
            "label": "报告日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "pproc_inspector": {
            "name": "pproc_inspector",
            "label": "检查员",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pproc_pic_name": {
            "name": "pproc_pic_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pproc_remark": {
            "name": "pproc_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------违规报告信息-----------*/
    violation: {
        "collInfo": {
            "name": "violation",
            "label": "违规报告信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "v_reporter": {
            "name": "v_reporter",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "v_reporter_id": {
            "name": "v_reporter_id",
            "label": "报告人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "v_reporter_t": {
            "name": "v_reporter_t",
            "label": "报告人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "v_report_date": {
            "name": "v_report_date",
            "label": "报告日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "v_description": {
            "name": "v_description",
            "label": "事件描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "v_date": {
            "name": "v_date",
            "label": "事件发生时间",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "v_pic": {
            "name": "v_pic",
            "label": "事件发生责任人",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "v_reason": {
            "name": "v_reason",
            "label": "事故发生原因",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "v_process_node": {
            "name": "v_process_node",
            "label": "生产过程节点",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "v_area": {
            "name": "v_area",
            "label": "科室/车间",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "v_remark": {
            "name": "v_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------生产线改进意见-----------*/
    productimprovement: {
        "collInfo": {
            "name": "productimprovement",
            "label": "生产线改进意见",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "pi_reporter": {
            "name": "pi_reporter",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pi_reporter_id": {
            "name": "pi_reporter_id",
            "label": "报告人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pi_reporter_t": {
            "name": "pi_reporter_t",
            "label": "报告人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "pi_report_date": {
            "name": "pi_report_date",
            "label": "报告日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "pi_reason": {
            "name": "pi_reason",
            "label": "改进原因",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pi_description": {
            "name": "pi_description",
            "label": "事件描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pi_process_node": {
            "name": "pi_process_node",
            "label": "生产过程节点",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pi_product": {
            "name": "pi_product",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pi_specification": {
            "name": "pi_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pi_project": {
            "name": "pi_project",
            "label": "项目名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pi_blueprint_id": {
            "name": "pi_blueprint_id",
            "label": "图纸编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pi_area": {
            "name": "pi_area",
            "label": "科室/车间",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "pi_pic_name": {
            "name": "pi_pic_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pi_remark": {
            "name": "pi_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------生产准备-----------*/
    produceprepare: {
        "collInfo": {
            "name": "produceprepare",
            "label": "生产准备",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "ppre_task_id": {
            "name": "ppre_task_id",
            "label": "任务工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "ppre_equipment": {
            "name": "ppre_equipment",
            "label": "生产所需设备",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "ppre_tool": {
            "name": "ppre_tool",
            "label": "生产所需工具",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "ppre_blueprint": {
            "name": "ppre_blueprint",
            "label": "生产所需图纸",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "ppre_document": {
            "name": "ppre_document",
            "label": "生产所需文档",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "ppre_parameter": {
            "name": "ppre_parameter",
            "label": "工艺参数",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "ppre_nc": {
            "name": "ppre_nc",
            "label": "NC程序",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "ppre_order": {
            "name": "ppre_order",
            "label": "生产指令",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },

        "ppre_attention": {
            "name": "ppre_attention",
            "label": "生产注意事项",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "ppre_remark": {
            "name": "ppre_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------公告-----------*/
    annoucement: {
        "collInfo": {
            "name": "annoucement",
            "label": "公告",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "a_creator": {
            "name": "a_creator",
            "label": "编写人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "a_creator_id": {
            "name": "a_creator_id",
            "label": "编写人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "a_creator_t": {
            "name": "a_creator_t",
            "label": "编写人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "a_create_date": {
            "name": "a_create_date",
            "label": "编写日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "a_publication_date": {
            "name": "a_publication_date",
            "label": "发布日期",
            "hideForm": true,
            "type": "Number",
            "required": false,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "a_title": {
            "name": "a_title",
            "label": "公告标题",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "a_content": {
            "name": "a_content",
            "label": "公告内容",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "a_reviewer": {
            "name": "a_reviewer",
            "label": "审核人",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "a_reviewer_id": {
            "name": "a_reviewer_id",
            "label": "审核人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "a_reviewer_t": {
            "name": "a_reviewer_t",
            "label": "审核人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "a_review_date": {
            "name": "a_review_date",
            "label": "审核日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "a_effective_date": {
            "name": "a_effective_date",
            "label": "有效日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "a_status": {
            "name": "a_status",
            "type": "Number",
            "label": "公告状态",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "未审核",
                    "value": 1
                },
                {
                    "label": "正在审核",
                    "value": 2
                },
                {
                    "label": "已审核",
                    "value": 3
                }
            ],
            "default": 0
        },
        "a_remark": {
            "name": "a_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------车间通知-----------*/
    proareanotice: {
        "collInfo": {
            "name": "proareanotice",
            "label": "车间通知",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "pan_creator": {
            "name": "pan_creator",
            "label": "编写人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pan_creator_id": {
            "name": "pan_creator_id",
            "label": "编写人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pan_creator_t": {
            "name": "pan_creator_t",
            "label": "编写人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "pan_create_date": {
            "name": "pan_create_date",
            "label": "编写日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "pan_publication_date": {
            "name": "pan_publication_date",
            "label": "发布日期",
            "hideForm": true,
            "type": "Number",
            "required": false,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "pan_title": {
            "name": "pan_title",
            "label": "通知标题",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pan_content": {
            "name": "pan_content",
            "label": "通知内容",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pan_reviewer": {
            "name": "pan_reviewer",
            "label": "审核人",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pan_reviewer_id": {
            "name": "pan_reviewer_id",
            "label": "审核人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "pan_reviewer_t": {
            "name": "pan_reviewer_t",
            "label": "审核人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "pan_review_date": {
            "name": "pan_review_date",
            "label": "审核日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "pan_effective_date": {
            "name": "pan_effective_date",
            "label": "有效日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "pan_status": {
            "name": "pan_status",
            "type": "Number",
            "label": "通知状态",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "未审核",
                    "value": 1
                },
                {
                    "label": "正在审核",
                    "value": 2
                },
                {
                    "label": "已审核",
                    "value": 3
                }
            ],
            "default": 0
        },
        "pan_remark": {
            "name": "pan_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------小组通知-----------*/
    teamnotice: {
        "collInfo": {
            "name": "teamnotice",
            "label": "小组通知",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "tn_creator": {
            "name": "tn_creator",
            "label": "编写人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "tn_creator_id": {
            "name": "tn_creator_id",
            "label": "编写人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "tn_creator_t": {
            "name": "tn_creator_t",
            "label": "编写人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "tn_create_date": {
            "name": "tn_create_date",
            "label": "编写日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "tn_publication_date": {
            "name": "tn_publication_date",
            "label": "发布日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "tn_title": {
            "name": "tn_title",
            "label": "通知标题",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "tn_content": {
            "name": "tn_content",
            "label": "通知内容",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "tn_reviewer": {
            "name": "tn_reviewer",
            "label": "审核人",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "tn_creator_id": {
            "name": "tn_creator_id",
            "label": "审核人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "tn_creator_t": {
            "name": "tn_creator_t",
            "label": "审核人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "tn_review_date": {
            "name": "tn_review_date",
            "label": "审核日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "tn_effective_date": {
            "name": "tn_effective_date",
            "label": "有效日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "tn_status": {
            "name": "tn_status",
            "type": "Number",
            "label": "通知状态",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "未审核",
                    "value": 1
                },
                {
                    "label": "正在审核",
                    "value": 2
                },
                {
                    "label": "已审核",
                    "value": 3
                }
            ],
            "default": 0
        },
        "tn_remark": {
            "name": "tn_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------待办事项-----------*/
    schedule: {
        "collInfo": {
            "name": "schedule",
            "label": "待办事项",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "s_schedule": {
            "name": "s_schedule",
            "label": "待办事项名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "s_schedule_id": {
            "name": "s_schedule_id",
            "label": "待办事项编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "s_create_date": {
            "name": "s_create_date",
            "label": "创建时间",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "s_creator": {
            "name": "s_creator",
            "label": "创建人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "s_creator_id": {
            "name": "s_creator_id",
            "label": "创建人工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "s_creator_t": {
            "name": "s_creator_t",
            "label": "创建人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "s_description": {
            "name": "s_description",
            "label": "事项描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "s_start_date": {
            "name": "s_start_date",
            "label": "开始日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "s_finish_date": {
            "name": "s_finish_date",
            "label": "结束日期",
            "hideForm": true,
            "type": "Number",
            "required": false,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "s_status": {
            "name": "s_status",
            "type": "Number",
            "label": "当前状态",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "待办",
                    "value": 1
                },
                {
                    "label": "正在处理",
                    "value": 2
                },
                {
                    "label": "已完成",
                    "value": 3
                }
            ],
            "default": 0
        },
        "s_executor": {
            "name": "s_executor",
            "label": "执行人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "s_pic_name": {
            "name": "s_pic_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "s_number": {
            "name": "s_number",
            "label": "工单号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "s_remark": {
            "name": "s_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------收件箱-----------*/
    inbodx: {
        "collInfo": {
            "name": "inbodx",
            "label": "收件箱",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "in_sender_id": {
            "name": "in_sender_id",
            "label": "发送人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "in_sender": {
            "name": "in_sender",
            "label": "发送人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "in_receiver_id": {
            "name": "in_receiver_id",
            "label": "接收人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "in_receiver": {
            "name": "in_receiver",
            "label": "接收人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "in_type": {
            "name": "in_type",
            "type": "Number",
            "label": "类型",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "a",
                    "value": 1
                },
                {
                    "label": "b",
                    "value": 2
                },
                {
                    "label": "c",
                    "value": 3
                }
            ],
            "default": 0
        },
        "in_priority": {
            "name": "in_priority",
            "type": "Number",
            "label": "优先级",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "1",
                    "value": 1
                },
                {
                    "label": "2",
                    "value": 2
                },
                {
                    "label": "3",
                    "value": 3
                },
                {
                    "label": "4",
                    "value": 4
                },
                {
                    "label": "5",
                    "value": 5
                }
            ],
            "default": 0
        },
        "in_flow_id": {
            "name": "in_flow_id",
            "label": "流程编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "in_state": {
            "name": "in_state",
            "type": "Number",
            "label": "当前状态",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "未读",
                    "value": 1
                },
                {
                    "label": "已读",
                    "value": 2
                },
                {
                    "label": "标记中",
                    "value": 3
                }
            ],
            "default": 0
        },
        "in_doc_id": {
            "name": "in_doc_id",
            "label": "记录号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "in_tablename": {
            "name": "in_tablename",
            "label": "库表名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "in_dbname": {
            "name": "in_dbname",
            "label": "DB名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "in_send_datetime": {
            "name": "in_send_datetime",
            "label": "发送日期",
            "hideForm": true,
            "type": "Number",
            "required": false,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "in_description": {
            "name": "in_description",
            "label": "描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "in_timer": {
            "name": "in_timer",
            "label": "定时器",
            "hideForm": true,
            "type": "Number",
            "required": false,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "in_remark": {
            "name": "in_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------工作流程-----------*/
    workflow: {
        "collInfo": {
            "name": "workflow",
            "label": "工作流程",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "w_name": {
            "name": "w_name",
            "label": "名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "w_desc": {
            "name": "w_desc",
            "label": "描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "w_tags": {
            "name": "w_tags",
            "label": "标签",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "w_create_time": {
            "name": "w_create_time",
            "label": "创建日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "w_creator": {
            "name": "w_creator",
            "label": "创建人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "w_creator_id": {
            "name": "w_creator_id",
            "label": "创建人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "w_creator_t": {
            "name": "w_creator_t",
            "label": "创建人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "w_auth_name": {
            "name": "w_auth_name",
            "label": "授权人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "w_auth_id": {
            "name": "w_auth_id",
            "label": "授权人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "w_auth_t": {
            "name": "w_auth_t",
            "label": "授权人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "w_department": {
            "name": "w_department",
            "label": "所属科室",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "w_remark": {
            "name": "w_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------工作流程状态-----------*/
    workflownode: {
        "collInfo": {
            "name": "workflownode",
            "label": "工作流程状态",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "wn_flow": {
            "name": "wn_flow",
            "label": "流程名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "wn_flow_id": {
            "name": "wn_flow_id",
            "label": "流程标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "wn_status_name": {
            "name": "wn_status_name",
            "label": "状态名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "wn_create_time": {
            "name": "wn_create_time",
            "label": "创建日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "wn_creator": {
            "name": "wn_creator",
            "label": "创建人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "wn_creator_id": {
            "name": "wn_creator_id",
            "label": "创建人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "wn_creator_t": {
            "name": "wn_creator_t",
            "label": "创建人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "wn_auth_name": {
            "name": "wn_auth_name",
            "label": "授权人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "wn_auth_id": {
            "name": "wn_auth_id",
            "label": "授权人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "wn_auth_t": {
            "name": "wn_auth_t",
            "label": "授权人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "wn_department": {
            "name": "wn_department",
            "label": "所属科室",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "wn_remark": {
            "name": "wn_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------工作流程状态规则-----------*/
    workflowedge: {
        "collInfo": {
            "name": "workflowedge",
            "label": "工作流程状态规则",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "we_flow": {
            "name": "we_flow",
            "label": "流程名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "we_flow_id": {
            "name": "we_flow_id",
            "label": "流程标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "we_edge_name": {
            "name": "we_edge_name",
            "label": "规则名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "we_source_state": {
            "name": "we_source_state",
            "type": "Number",
            "label": "起始状态",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "a",
                    "value": 1
                },
                {
                    "label": "b",
                    "value": 2
                },
                {
                    "label": "c",
                    "value": 3
                }
            ],
            "default": 0
        },
        "we_dest_state": {
            "name": "we_dest_state",
            "type": "Number",
            "label": "目标状态",
            "required": false,
            "component": "sam-select",
            "options": [{
                    "label": "a",
                    "value": 1
                },
                {
                    "label": "b",
                    "value": 2
                },
                {
                    "label": "c",
                    "value": 3
                }
            ],
            "default": 0
        },
        "we_event": {
            "name": "we_event",
            "label": "事件",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "we_desc": {
            "name": "we_desc",
            "label": "描述",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "we_create_time": {
            "name": "we_create_time",
            "label": "创建日期",
            "hideForm": true,
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "we_creator": {
            "name": "we_creator",
            "label": "创建人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "we_creator_id": {
            "name": "we_creator_id",
            "label": "创建人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "we_creator_t": {
            "name": "we_creator_t",
            "label": "创建人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "we_auth_name": {
            "name": "we_auth_name",
            "label": "授权人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "we_auth_id": {
            "name": "we_auth_id",
            "label": "授权人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "we_auth_t": {
            "name": "we_auth_t",
            "label": "授权人UID",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "filterable": true,
            "optionsUrl": {
                "level": 1,
                "table": "employee",
                "value": "id",
                "self": true,
                "label": "name",
                "params": {},
                "column": { "id": 1, "name": 1 }
            },
            "default": 0
        },
        "we_department": {
            "name": "we_department",
            "label": "所属科室",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "props": {
                "multiple": true,
                "checkStrictly": true
            },
            "optionsUrl": {
                "level": 1,
                "table": "department",
                "pid": "dept_parentid",
                "value": "id",
                "label": "dept_name",
                "params": {
                    "disabled": false
                },
                "column": { "id": 1, "dept_parentid": 1, "dept_name": 1 }
            },
            "default": []
        },
        "we_remark": {
            "name": "we_remark",
            "label": "备注",
            "type": "String",
            "required": false,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    }
}
