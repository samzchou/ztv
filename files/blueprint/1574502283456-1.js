/* eslint-disable */
'use strict';
export default {
    /*----------数据表计数器-----------*/
    counters: {
        "model": {
            "name": "model",
            "type": "String",
            "default": "",
        },
        "count": {
            "name": "count",
            "type": "Number",
            "default": 0
        }
    },
	/*----------权限角色数据-----------*/
    roles: {
        "id": {
            "name": "id",
            "type": "Number",
            "hide": true,
            "default": 0
        },
        "collInfo": {
            "name": "roles",
            "label": "角色配置",
			"hide": true,
            "default": ""
        },
        "name": {
            "name": "name",
            "type": "String",
            "component": "sam-select",
            "required": true,
            "default": "",
            "label": "角色名称"
        },
        "content": {
            "name": "content",
            "type": "Object",
			"hide": true,
            "default": "",
            "label": "数据内容JSON"
        }
    },
    /*----------表单配置数据-----------*/
    formList: {
        "id": {
            "name": "id",
            "type": "Number",
            "hide": true,
            "default": 0
        },
        "collInfo": {
            "name": "formList",
            "label": "表单配置",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "form_name": {
            "name": "form_name",
            "type": "String",
            "required": true,
            "default": "",
            "label": "表单名称"
        },
        "content": {
            "name": "content",
            "type": "Object",
            "default": "",
            "label": "数据内容JSON"
        },
        "create_eid": {
            "name": "create_eid",
            "type": "Number",
            "default": 0,
            "label": "创建者用户ID"
        },
        "create_date": {
            "name": "create_date",
            "type": "Number",
            "default": new Date().getTime(),
            "label": "创建时间"
        }
    },
    /*----------页面配置数据-----------*/
    pageList: {
        "id": {
            "name": "id",
            "type": "Number",
            "hide": true,
            "default": 0
        },
        "collInfo": {
            "name": "pageList",
            "label": "页面配置",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "page_name": {
            "name": "page_name",
            "type": "String",
            "required": true,
            "default": "",
            "label": "页面名称"
        },
        "content": {
            "name": "content",
            "type": "Object",
            "default": "",
            "label": "数据内容JSON"
        },
        "create_eid": {
            "name": "create_eid",
            "type": "Number",
            "default": 0,
            "label": "创建者用户ID"
        },
        "create_date": {
            "name": "create_date",
            "type": "Number",
            "default": new Date().getTime(),
            "label": "创建时间"
        }
    },
    /*----------组织部门表-----------*/
    department: {
        "id": {
            "name": "id",
            "type": "Number",
            "hide": true,
            "default": 0
        },
        "collInfo": {
            "name": "department",
            "label": "组织部门",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "dept_parentid": {
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
            "default": 0
        },
        "dept_name": {
            "name": "dept_name",
            "type": "String",
            "component": "sam-input",
            "cptype": "text",
            "required": true,
            "default": "",
            "label": "部门名称"
        }
    },
    /*----------员工信息表-----------*/
    employee: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
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
            "component": "sam-select",
            "optionsUrl": {
                "table": "roles",
                "label": "name",
                "value": "id"
            },
            "default": 0
        },
        "e_name": {
            "name": "e_name",
            "label": "员工姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_sex": {
            "name": "e_sex",
            "label": "性别",
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
        "e_birth": {
            "name": "e_birth",
            "label": "出生日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "timestamp",
            "default": ""
        },
        "e_political_status": {
            "name": "e_political_status",
            "label": "政治面貌",
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
        "e_marital_status": {
            "name": "e_marital_status",
            "label": "婚姻状况",
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
        "e_domicile": {
            "name": "e_domicile",
            "label": "户籍所在地",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "optionsConst": "citys",
            "default": []
        },
        "e_domicile_type": {
            "name": "e_domicile_type",
            "label": "户籍类别",
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
        "e_education": {
            "name": "e_education",
            "label": "学历",
            "type": "Number",
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
        "e_profession": {
            "name": "e_profession",
            "label": "专业",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_graduate_institution": {
            "name": "e_graduate_institution",
            "label": "毕业院校",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_idcard_number": {
            "name": "e_idcard_number",
            "label": "身份证/护照号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_cellphone_number": {
            "name": "e_cellphone_number",
            "label": "手机",
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
        "e_phone_number": {
            "name": "e_phone_number",
            "label": "电话",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_house_address": {
            "name": "e_house_address",
            "label": "家庭住址",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_current_address": {
            "name": "e_current_address",
            "label": "现在住址",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_employee_number": {
            "name": "e_employee_number",
            "label": "工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_superior_department": {
            "name": "e_superior_department",
            "label": "上级部门",
            "type": "Number",
            "required": true,
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
            "emit": ["e_department"],
            "default": 0
        },
        "e_department": {
            "name": "e_department",
            "label": "所属部门",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl": {
                "table": "department",
                "params": {
                    "dept_parentid": 0
                },
                "label": "dept_name",
                "value": "id"
            },
            "level": 1,
            "on": ["e_department"],
            "default": 0
        },
		"is_leader": {
            "name": "is_leader",
            "label": "是否主管领导",
            "type": "Boolean",
            "required": true,
            "component": "sam-switch",
			"value": false,
            "default": false
        },
        "e_position": {
            "name": "e_position",
            "label": "岗位",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "default": ""
        },
        "e_title": {
            "name": "e_title",
            "label": "职称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_employment_date": {
            "name": "e_employment_date",
            "label": "入职日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
        "e_regular_date": {
            "name": "e_regular_date",
            "label": "转正日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
        "e_work_age": {
            "name": "e_work_age",
            "label": "实际工龄",
            "type": "Number",
            "required": true,
            "component": "sam-number",
            "default": 0
        },
        "e_work_age_revise": {
            "name": "e_work_age_revise",
            "label": "工龄修正",
            "type": "Number",
            "required": true,
            "component": "sam-number",
            "default": 0
        },
        "e_ annual_leave_service_age": {
            "name": "e_ annual_leave_service_age",
            "label": "年假工龄",
            "type": "Number",
            "required": true,
            "component": "sam-number",
            "default": 0
        },
        "e_employee_type": {
            "name": "e_employee_type",
            "label": "员工类别",
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
        "e_salary_type": {
            "name": "e_salary_type",
            "label": "工资类别",
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
        "e_social_security_office": {
            "name": "e_social_security_office",
            "label": "社保所属",
            "type": "Array",
            "required": true,
            "component": "sam-cascader",
            "optionsConst": "citys",
            "default": []
        },
        "e_employee_status": {
            "name": "e_employee_status",
            "label": "员工状态",
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
    /*----------时间钟-----------*/
    timeBlock: {
        "id": {
            "name": "id",
            "type": "Number",
            "hide": true,
            "default": 0
        },
        "collInfo": {
            "name": "timeBlock",
            "label": "时间钟",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "userId": {
            "name": "userId",
            "type": "Number",
            "default": 0,
            "label": "用户ID"
        },
        "startdate": {
            "name": "startdate",
            "type": "Number",
            "default": new Date().getTime(),
            "component": "sam-date",
            "cptype": "date",
            "label": "当前周一时间"
        },
        "enddate": {
            "name": "enddate",
            "type": "Number",
            "default": new Date().getTime(),
            "component": "sam-date",
            "cptype": "date",
            "label": "当前周日时间"
        },
        "content": {
            "name": "content",
            "type": "Object",
            "default": "",
            "label": "数据内容JSON"
        }
    },
    /*----------图纸信息表-----------*/
    blueprint: {
        "id": {
            "name": "id",
            "type": "Number",
            "hide": true,
            "default": 0
        },
        "collInfo": {
            "name": "blueprint",
            "label": "图纸信息",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "b_emp_id": {
            "name": "b_emp_id",
            "label": "录入员用户id",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "b_entry_date": {
            "name": "b_entry_date",
            "label": "录入日期",
            "type": "Number",
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd HH:mm:ss",
            "default": new Date().getTime(),
        },
        "b_contract_id": {
            "name": "b_contract_id",
            "label": "合同号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_production_order_code": {
            "name": "b_production_order_code",
            "label": "生产指令代码",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_project_name": {
            "name": "b_project_name",
            "label": "项目名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_used_area": {
            "name": "b_used_area",
            "label": "使用场所",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_application_industry": {
            "name": "b_application_industry",
            "label": "应用行业",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_product_name": {
            "name": "b_product_name",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_product_characteristic": {
            "name": "b_product_characteristic",
            "label": "产品特性",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_product_specification": {
            "name": "b_product_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_product_model": {
            "name": "b_product_model",
            "label": "产品型号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_is_put_into_production": {
            "name": "b_is_put_into_production",
            "label": "是否投入生产",
            "type": "String",
            "required": true,
            "component": "sam-switch",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_id": {
            "name": "b_blueprint_id",
            "label": "图纸编码",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_type": {
            "name": "b_blueprint_type",
            "label": "图纸类型",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_create_date": {
            "name": "b_blueprint_create_date",
            "label": "图纸创建日期",
            "type": "Number",
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd HH:mm:ss",
            "default": new Date().getTime()
        },
        "b_blueprint_name": {
            "name": "b_blueprint_name",
            "label": "图纸文件名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_designer_name": {
            "name": "b_blueprint_designer_name",
            "label": "图纸设计人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl": "employee",
            "emit": ["b_blueprint_designer_id"],
            "default": ""
        },
        "b_blueprint_designer_id": {
            "name": "b_blueprint_designer_id",
            "label": "图纸设计人工号",
            "type": "String",
            "required": true,
            "component": "sam-select",
            "cptype": "text",
            "on": ["b_blueprint_designer_name"],
            "default": ""
        },
        "b_blueprint_countersigner_name": {
            "name": "b_blueprint_countersigner_name",
            "label": "图纸会签人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl": "employee",
            "emit": ["b_blueprint_countersigner_id"],
            "default": ""
        },
        "b_blueprint_countersigner_id": {
            "name": "b_blueprint_countersigner_id",
            "label": "图纸会签人工号",
            "type": "String",
            "required": true,
            "component": "sam-select",
            "cptype": "text",
            "on": ["b_blueprint_countersigner_name"],
            "default": ""
        },
        "b_blueprint_standardized_name": {
            "name": "b_blueprint_standardized_name",
            "label": "图纸标准化人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl": "employee",
            "emit": ["b_blueprint_standardized_id"],
            "default": ""
        },
        "b_blueprint_standardized_id": {
            "name": "b_blueprint_standardized_id",
            "label": "图纸标准化人工号",
            "type": "String",
            "required": true,
            "component": "sam-select",
            "cptype": "text",
            "on": ["b_blueprint_standardized_name"],
            "default": ""
        },
        "b_blueprint_auditor_name": {
            "name": "b_blueprint_auditor_name",
            "label": "图纸审核人",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl": "employee",
            "emit": ["b_blueprint_auditor_id"],
            "default": ""
        },
        "b_blueprint_auditor_id": {
            "name": "b_blueprint_auditor_id",
            "label": "图纸审核人工号",
            "type": "String",
            "required": true,
            "component": "sam-select",
            "cptype": "text",
            "on": ["b_blueprint_auditor_name"],
            "default": ""
        },
        "b_blueprint_department": {
            "name": "b_blueprint_department",
            "label": "图纸归属科室",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_standard_id": {
            "name": "b_blueprint_standard_id",
            "label": "图纸涉及标准编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_status": {
            "name": "b_blueprint_status",
            "label": "图纸当前状态",
            "type": "Number",
            "required": true,
            "component": "sam-radio",
            "options": [{
                "label": "设计中",
                "id": 1
            }, {
                "label": "使用中",
                "id": 2
            }, {
                "label": "已废弃",
                "id": 3
            }],
            "default": 1
        },
        "b_blueprint_version": {
            "name": "b_blueprint_version",
            "label": "图纸版本号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "b_blueprint_safety_grade": {
            "name": "b_blueprint_safety_grade",
            "label": "图纸密级",
            "type": "Number",
            "required": true,
            "component": "sam-radio",
            "options": [{
                "label": "一级",
                "id": 1
            }, {
                "label": "二级",
                "id": 2
            }, {
                "label": "三级",
                "id": 3
            }],
            "default": 1
        }
    },
	/*----------生产调整信息表-----------*/
    produceAdjust: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "produceAdjust",
            "label": "产品调整信息",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "hide": true,
            "default": ""
        },
        "pa_operator_name": {
            "name":"pa_operator_name",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": "",
            "label": "录入员姓名"
        },
        "pa_operator_id": {
            "name":"pa_operator_id",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": "",
            "label": "录入员工号"
        },
        "pa_entry_date": {
            "name":"pa_entry_date",
            "type": "Number",
            "label": "录入日期",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd HH:mm:ss",
            "default": new Date().getTime()
        },
        "pa_adjust_priority": {
            "name":"pa_adjust_priority",
            "type": "Number",
            "label": "调整优先级",
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
        "pa_adjust_title": {
            "name":"pa_adjust_title",
            "type": "String",
            "default": "",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "label": "调整标题"
        },
        "pa_adjust_description": {
            "name":"pa_adjust_description",
            "type": "String",
            "default": "",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "label": "调整描述"
        },
        "pa_adjust_responsible_person_name": {
            "name":"pa_adjust_responsible_person_name",
            "type": "String",
            "default": "",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "label": "调整负责人姓名"
        },
        "pa_adjust_department": {
            "name":"pa_adjust_department",
            "type": "String",
            "default": "",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "label": "调整所属科室"
        }
    },
	/*----------问题反馈信息表-----------*/
    problem: {
        "id":{
            "name":"id",
            "type":"Number",
            "hide":true,
            "default":0
        },
        "collInfo": {
            "name": "problem",
            "label": "问题反馈信息表",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "p_operator_name": {
            "name":"p_operator_name",
            "type":"String",
            "label":"录入员姓名",
            "default":"",
            "required": true,
            "component": "sam-input",
            "cptype": "text"
        },
        "p_operator_id": {
            "name":"p_operator_id",
            "type":"String",
            "label":"录入员姓号",
            "default":"",
            "required": true,
            "component": "sam-input",
            "cptype": "text"
        },
        "p_entry_date": {
            "name":"p_entry_date",
            "type":"Number",
            "label":"录入日期",
            "default":"",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd"
        },
        "p_problem_title": {
            "name":"p_problem_title",
            "type":"String",
            "label":"问题标题",
            "default":"",
            "required": true,
            "component": "sam-input",
            "cptype": "text"
        },
		"p_problem_priority": {
            "name":"p_problem_priority",
            "type": "Number",
            "label": "问题优先级",
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
        "p_problem_description": {
            "name":"p_problem_description",
            "type":"String",
            "label":"问题描述",
            "default":"",
            "required": true,
            "component": "sam-input",
            "cptype": "text"
        },
		"p_problem_department": {
            "name":"p_problem_department",
            "type": "Number",
            "label": "问题所属科室",
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
        "p_problem_responsible_person_name": {
            "name":"p_problem_responsible_person_name",
            "type":"String",
            "label":"问题负责人",
            "default":"",
            "required": true,
            "component": "sam-input",
            "cptype": "text"
        }

    },
	
	/*----------分配任务表-----------*/
    assign_task: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "assign_task",
            "label": "分配任务表",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "at_assigner_name": {
            "name": "at_assigner_name",
            "label": "分配人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"at_task_name": {
            "name": "at_task_name",
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
		"at_responsible_person": {
            "name": "at_responsible_person",
            "label": "负责人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"at_start_date": {
            "name": "at_start_date",
            "label": "起始日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"at_finish_date": {
            "name": "at_finish_date",
            "label": "结束日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"at_remark": {
            "name": "at_remark",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
	/*----------文档信息表-----------*/
    document: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "document",
            "label": "文档信息表",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "d_operator_name": {
            "name": "d_operator_name",
            "label": "录入员姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"d_operator_id": {
            "name": "d_operator_id",
            "label": "录入员工号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"d_entry_date": {
            "name": "d_entry_date",
            "label": "录入日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"d_document_type": {
            "name":"d_document_type",
            "type": "Number",
            "label": "文档分类",
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
		"d_document_form": {
            "name":"d_document_form",
            "type": "Number",
            "label": "文档格式",
            "required": true,
            "component": "sam-select",
            "options": [{
                "label": "txt",
                "value": 1
                },
                {
                    "label": "docx",
                    "value": 2
                },
				{
                    "label": "doc",
                    "value": 3
                },
                {
                    "label": "pdf",
                    "value": 4
                }
            ],
            "default": 1
        },
		"d_document_name": {
            "name": "d_document_name",
            "label": "文档名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"d_document_title": {
            "name": "d_document_title",
            "label": "文档标题",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"d_document_description": {
            "name": "d_document_description",
            "label": "文档描述",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"d_document_safety_grade": {
            "name": "d_document_safety_grade",
            "label": "文档密级",
            "type": "Number",
            "required": true,
            "component": "sam-radio",
            "options": [{
                "label": "一级",
                "id": 1
            }, {
                "label": "二级",
                "id": 2
            }, {
                "label": "三级",
                "id": 3
            }],
            "default": 1
        },
		"d_document_respinsible_person_name": {
            "name": "d_document_respinsible_person_name",
            "label": "文档负责人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"d_document_department": {
            "name":"d_document_department",
            "type": "Number",
            "label": "文档所属科室",
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
                },
                {
                    "label": "d",
                    "value": 4
                }
            ],
            "default": 1
        },
		"d_document_version": {
            "name": "d_document_version",
            "label": "文档版本号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"d_remark": {
            "name": "d_remark",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
/*----------生产任务信息表-----------*/
    produce_task: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "produce_task",
            "label": "生产任务信息表",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "pt_creator_name": {
            "name": "pt_creator_name",
            "label": "创建者姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
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
		"pt_task_title": {
            "name": "pt_task_title",
            "label": "任务标题",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pt_task_type": {
            "name":"pt_task_type",
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
            "name":"pt_project",
            "type": "Number",
            "label": "所属项目",
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
		"pt_blueprint": {
            "name":"pt_blueprint",
            "type": "Number",
            "label": "所属图纸",
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
		"pt_document": {
            "name":"pt_document",
            "type": "Number",
            "label": "所属文档",
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
		"pt_task_description": {
            "name": "pt_task_description",
            "label": "任务描述",
            "type": "String",
            "required": true,
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
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"pt_finish_time": {
            "name": "pt_finish_time",
            "label": "任务完成时间",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"pt_finish_person_name": {
            "name": "pt_finish_person_name",
            "label": "完成此任务员工姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pt_responsible_person_name": {
            "name": "pt_responsible_person_name",
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
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
	/*----------残次废品信息表-----------*/
    produce_task: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "produce_task",
            "label": "残次废品信息表",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "im_reporter_name": {
            "name": "im_reporter_name",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"im_report_date": {
            "name": "im_report_date",
            "label": "报告日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"im_product_name": {
            "name": "im_product_name",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"im_project_name": {
            "name":"im_project_name",
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
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"im_product_area": {
            "name":"im_product_area",
            "type": "Number",
            "label": "科室/车间",
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
		"im_cost": {
            "name": "im_cost",
            "label": "成本",
            "type": "Number",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"im_resopnsible_person_name": {
            "name": "im_resopnsible_person_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"im_deal_measure": {
            "name": "im_deal_measure",
            "label": "处理措施",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"im_deal_result": {
            "name": "im_deal_result",
            "label": "处理结果",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"im_remark": {
            "name": "im_remark",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
    /*----------设计图纸与生产不匹配信息表-----------*/
    mismatch: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "mismatch",
            "label": "设计图纸与生产不匹配信息表",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "mi_reporter_name": {
            "name": "mi_reporter_name",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mi_report_date": {
            "name": "mi_report_date",
            "label": "报告日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"mi_product_name": {
            "name": "mi_product_name",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mi_product_specification": {
            "name": "mi_product_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mi_project_name": {
            "name": "mi_project_name",
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
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mi_product_area": {
            "name":"mi_product_area",
            "type": "Number",
            "label": "科室/车间",
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
		"mi_resopnsible_person_name": {
            "name": "mi_resopnsible_person_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mi_deal_measure": {
            "name": "mi_deal_measure",
            "label": "处理措施",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mi_deal_result": {
            "name": "mi_deal_result",
            "label": "处理结果",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mi_remark": {
            "name": "mi_remark",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
	/*----------生产问题信息表-----------*/
    produce_problem: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "produce_problem",
            "label": "生产问题信息表",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "pp_reporter_name": {
            "name": "pp_reporter_name",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pp_report_date": {
            "name": "pp_report_date",
            "label": "报告日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"pp_product_name": {
            "name": "pp_product_name",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pp_product_specification": {
            "name": "pp_product_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pp_project_name": {
            "name": "pp_project_name",
            "label": "项目名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pp_problem_description": {
            "name": "pp_problem_description",
            "label": "问题描述",
            "type": "String",
            "required": true,
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
		"pp_product_area": {
            "name":"pp_product_area",
            "type": "Number",
            "label": "科室/车间",
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
		"pp_resopnsible_person_name": {
            "name": "pp_resopnsible_person_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pp_deal_measure": {
            "name": "pp_deal_measure",
            "label": "处理措施",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pp_deal_result": {
            "name": "pp_deal_result",
            "label": "处理结果",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pp_remark": {
            "name": "pp_remark",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
		/*----------材料准备不充分问题信息表-----------*/
    material_preparation_issue: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "material_preparation_issue",
            "label": "材料准备不充分问题信息表",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "mpi_reporter_name": {
            "name": "mpi_reporter_name",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mpi_report_date": {
            "name": "mpi_report_date",
            "label": "报告日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"mpi_product_name": {
            "name": "mpi_product_name",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mpi_product_specification": {
            "name": "mpi_product_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mpi_project_name": {
            "name": "mpi_project_name",
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
		"mpi_problem_description": {
            "name": "mpi_problem_description",
            "label": "问题描述",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mpi_product_area": {
            "name":"mpi_product_area",
            "type": "Number",
            "label": "科室/车间",
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
		"mpi_resopnsible_person_name": {
            "name": "mpi_resopnsible_person_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mpi_deal_measure": {
            "name": "mpi_deal_measure",
            "label": "处理措施",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mpi_deal_result": {
            "name": "mpi_deal_result",
            "label": "处理结果",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"mpi_remark": {
            "name": "mpi_remark",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
	/*----------建议与改进表-----------*/
    improvement: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "improvement",
            "label": "建议与改进表",
            "type": "String",
            "hide": true,
            "default": ""
        },
        "i_reporter_name": {
            "name": "i_reporter_name",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"i_report_date": {
            "name": "i_report_date",
            "label": "报告日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"i_product_name": {
            "name": "i_product_name",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"i_product_specification": {
            "name": "i_product_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"i_project_name": {
            "name": "i_project_name",
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
            "label": "问题描述",
            "type": "String",
            "required": true,
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
		"i_product_area": {
            "name":"i_product_area",
            "type": "Number",
            "label": "科室/车间",
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
		"i_resopnsible_person_name": {
            "name": "i_resopnsible_person_name",
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
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
		/*----------产品生产过程数据信息表-----------*/
    produce_process: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "produce_process",
            "label": "产品生产过程数据信息表",
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
		"pproc_project_name": {
            "name": "pproc_project_name",
            "label": "项目名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pproc_product_name": {
            "name": "pproc_product_name",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pproc_product_specification": {
            "name": "pproc_product_specification",
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
		"pproc_product_data": {
            "name": "pproc_product_data",
            "label": "产品数据",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pproc_product_area": {
            "name":"pproc_product_area",
            "type": "Number",
            "label": "科室/车间",
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
        "pproc_reporter_name": {
            "name": "pproc_reporter_name",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pproc_report_date": {
            "name": "pproc_report_date",
            "label": "报告日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
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
		"pproc_resopnsible_person_name": {
            "name": "pproc_resopnsible_person_name",
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
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
			/*----------违规报告信息表-----------*/
    violation: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "violation",
            "label": "违规报告信息表",
            "type": "String",
            "hide": true,
            "default": ""
        },
		"v_reporter_name": {
            "name": "v_reporter_name",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"v_report_date": {
            "name": "v_report_date",
            "label": "报告日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"v_description": {
            "name": "v_description",
            "label": "事件描述",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"v_date": {
            "name": "v_date",
            "label": "事件发生时间",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"v_person_liable": {
            "name": "v_person_liable",
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
		"v_product_area": {
            "name":"v_product_area",
            "type": "Number",
            "label": "科室/车间",
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
		"v_remark": {
            "name": "v_remark",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
			/*----------生产线改进意见表-----------*/
    product_improvement: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "product_improvement",
            "label": "生产线改进意见表",
            "type": "String",
            "hide": true,
            "default": ""
        },
		"pi_reporter_name": {
            "name": "pi_reporter_name",
            "label": "报告人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pi_report_date": {
            "name": "pi_report_date",
            "label": "报告日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
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
            "required": true,
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
		"pi_product_name": {
            "name": "pi_product_name",
            "label": "产品名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pi_product_specification": {
            "name": "pi_product_specification",
            "label": "产品规格",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pi_project_name": {
            "name": "pi_project_name",
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
		
		"pi_product_area": {
            "name":"pi_product_area",
            "type": "Number",
            "label": "科室/车间",
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
		"pi_resopnsible_person_name": {
            "name": "pi_resopnsible_person_name",
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
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
				/*----------生产准备表-----------*/
    produce_prepare: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "produce_prepare",
            "label": "生产准备表",
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
		"ppre_produce_equipment": {
            "name": "ppre_produce_equipment",
            "label": "生产所需设备",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"ppre_produce_tool": {
            "name": "ppre_produce_tool",
            "label": "生产所需工具",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"ppre_produce_blueprint": {
            "name": "ppre_produce_blueprint",
            "label": "生产所需图纸",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"ppre_produce_document": {
            "name": "ppre_produce_document",
            "label": "生产所需文档",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"ppre_technology_parameter": {
            "name": "ppre_technology_parameter",
            "label": "工艺参数",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"ppre_nc_program": {
            "name": "ppre_nc_program",
            "label": "NC程序",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"ppre_produce_order": {
            "name": "ppre_produce_order",
            "label": "生产指令",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		
		"ppre_produce_attention": {
            "name": "ppre_produce_attention",
            "label": "生产注意事项",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"ppre_remark": {
            "name": "ppre_remark",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
				/*----------公告表-----------*/
    annoucement: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "annoucement",
            "label": "公告表",
            "type": "String",
            "hide": true,
            "default": ""
        },
		"a_creator_name": {
            "name": "a_creator_name",
            "label": "编写人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"a_create_date": {
            "name": "a_create_date",
            "label": "编写日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"a_publication_date": {
            "name": "a_publication_date",
            "label": "发布日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"a_announcement_title": {
            "name": "a_announcement_title",
            "label": "公告标题",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"a_announcement_content": {
            "name": "a_announcement_content",
            "label": "公告内容",
            "type": "String",
            "required": true,
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
		"a_review_date": {
            "name": "a_review_date",
            "label": "审核日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"a_effective_date": {
            "name": "a_effective_date",
            "label": "有效日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"a_status": {
            "name":"a_status",
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
            "default": 1
        },
		"a_remark": {
            "name": "a_remark",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
					/*----------车间通知表-----------*/
    produce_area_notice: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "produce_area_notice",
            "label": "车间通知表",
            "type": "String",
            "hide": true,
            "default": ""
        },
		"pan_creator_name": {
            "name": "pan_creator_name",
            "label": "编写人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pan_create_date": {
            "name": "pan_create_date",
            "label": "编写日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"pan_publication_date": {
            "name": "pan_publication_date",
            "label": "发布日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"pan_notice_title": {
            "name": "pan_notice_title",
            "label": "通知标题",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"pan_notice_content": {
            "name": "pan_notice_content",
            "label": "通知内容",
            "type": "String",
            "required": true,
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
		"pan_review_date": {
            "name": "pan_review_date",
            "label": "审核日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"pan_effective_date": {
            "name": "pan_effective_date",
            "label": "有效日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"pan_status": {
            "name":"pan_status",
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
            "default": 1
        },
		"pan_remark": {
            "name": "pan_remark",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
	/*----------小组通知表-----------*/
    team_notice: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "team_notice",
            "label": "小组通知表",
            "type": "String",
            "hide": true,
            "default": ""
        },
		"tn_creator_name": {
            "name": "tn_creator_name",
            "label": "编写人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"tn_create_date": {
            "name": "tn_create_date",
            "label": "编写日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"tn_publication_date": {
            "name": "tn_publication_date",
            "label": "发布日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"tn_notice_title": {
            "name": "tn_notice_title",
            "label": "通知标题",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"tn_notice_content": {
            "name": "tn_notice_content",
            "label": "通知内容",
            "type": "String",
            "required": true,
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
		"tn_review_date": {
            "name": "tn_review_date",
            "label": "审核日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"tn_effective_date": {
            "name": "tn_effective_date",
            "label": "有效日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"tn_status": {
            "name":"tn_status",
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
            "default": 1
        },
		"tn_remark": {
            "name": "tn_remark",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
	/*----------待办事项表-----------*/
    schedule: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "schedule",
            "label": "待办事项表",
            "type": "String",
            "hide": true,
            "default": ""
        },
		"s_schedule_name": {
            "name": "s_schedule_name",
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
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"s_creator_name": {
            "name": "s_creator_name",
            "label": "创建人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"s_schedule_description": {
            "name": "s_schedule_description",
            "label": "事项描述",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"s_start_date": {
            "name": "s_start_date",
            "label": "开始日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"s_finish_date": {
            "name": "s_finish_date",
            "label": "结束日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"s_status": {
            "name":"s_status",
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
            "default": 1
        },
		"s_executor_name": {
            "name": "s_executor_name",
            "label": "执行人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"s_responsible_name": {
            "name": "s_responsible_name",
            "label": "主管姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"s_produce_order_number": {
            "name": "s_produce_order_number",
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
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
		/*----------收件箱-----------*/
    inbodx: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "inbodx",
            "label": "收件箱",
            "type": "String",
            "hide": true,
            "default": ""
        },
		"in_sender_docid": {
            "name": "in_sender_docid",
            "label": "发送人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"in_sender_name": {
            "name": "in_sender_name",
            "label": "发送人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"in_receiver_docid": {
            "name": "in_receiver_docid",
            "label": "接收人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"in_receiver_name": {
            "name": "in_receiver_name",
            "label": "接收人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"in_message_type": {
            "name":"in_message_type",
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
            "default": 1
        },
		"in_priority": {
            "name":"in_priority",
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
            "default": 1
        },
		"in_flow_docid": {
            "name": "in_flow_docid",
            "label": "流程编号",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"in_state": {
            "name":"in_state",
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
            "default": 1
        },
		"in_doc_docid": {
            "name": "in_doc_docid",
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
		"in_db_name": {
            "name": "in_db_name",
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
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"in_description": {
            "name": "in_description",
            "label": "描述",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"in_timer": {
            "name": "in_timer",
            "label": "定时器",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"in_remark": {
            "name": "in_remark",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
		/*----------工作流程表-----------*/
    workflow: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "workflow",
            "label": "工作流程表",
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
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"w_tags": {
            "name": "w_tags",
            "label": "标签",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"w_create_time": {
            "name": "w_create_time",
            "label": "创建日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"w_creator_name": {
            "name": "w_creator_name",
            "label": "创建人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"w_creator_docid": {
            "name": "w_creator_docid",
            "label": "创建人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
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
		"w_auth_docid": {
            "name": "w_auth_docid",
            "label": "授权人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"w_department": {
            "name":"w_department",
            "type": "Number",
            "label": "所属科室",
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
		"w_remarks": {
            "name": "w_remarks",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
			/*----------工作流程状态表-----------*/
    workflow_node: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "workflow_node",
            "label": "工作流程状态表",
            "type": "String",
            "hide": true,
            "default": ""
        },
		"wn_flow_name": {
            "name": "wn_flow_name",
            "label": "流程名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"wn_flow_docid": {
            "name": "wn_flow_docid",
            "label": "流程标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"wn_node_name": {
            "name": "wn_node_name",
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
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"wn_creator_name": {
            "name": "wn_creator_name",
            "label": "创建人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"wn_creator_docid": {
            "name": "wn_creator_docid",
            "label": "创建人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
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
		"wn_auth_docid": {
            "name": "wn_auth_docid",
            "label": "授权人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"wn_department": {
            "name":"wn_department",
            "type": "Number",
            "label": "所属科室",
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
		"wn_remarks": {
            "name": "wn_remarks",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    },
				/*----------工作流程状态规则表-----------*/
    workflow_edge: {
        "id": {
            "name": "id",
            "hide": true,
            "type": "Number",
            "default": 0
        },
        "collInfo": {
            "name": "workflow_edge",
            "label": "工作流程状态规则表",
            "type": "String",
            "hide": true,
            "default": ""
        },
		"we_flow_name": {
            "name": "we_flow_name",
            "label": "流程名称",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"we_flow_docid": {
            "name": "we_flow_docid",
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
            "name":"we_source_state",
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
            "default": 1
        },
		"we_dest_state": {
            "name":"we_dest_state",
            "type": "Number",
            "label": "目标状态",
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
		"we_event": {
            "name": "we_event",
            "label": "事件",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"we_desc": {
            "name": "we_desc",
            "label": "描述",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"we_create_time": {
            "name": "we_create_time",
            "label": "创建日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat": "yyyy-MM-dd",
            "default": ""
        },
		"we_creator_name": {
            "name": "we_creator_name",
            "label": "创建人姓名",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"we_creator_docid": {
            "name": "we_creator_docid",
            "label": "创建人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
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
		"we_auth_docid": {
            "name": "we_auth_docid",
            "label": "授权人标识",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
		"we_department": {
            "name":"we_department",
            "type": "Number",
            "label": "所属科室",
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
		"we_remarks": {
            "name": "we_remarks",
            "label": "备注",
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        }
    }
}