module.exports = {
    /*----------数据表计数器-----------*/
    counters: {
        "model": {
            "type": String,
            "default": "",
        },
        "count": {
            "type": Number,
            "default": 0
        }
    },
    service: {
        "id": {
            "type": Number,
            "default": 0
        },
        "isAadmin": {
            "type": Number,
            "default": 0,
            "label": "是否后台管理"
        },
        "pid": {
            "type": Number,
            "default": 0,
            "label": "父级ID"
        },
        "title": {
            "type": String,
            "default": "",
            "label": "名称"
        },
        "name": {
            "type": String,
            "default": "",
            "label": "目录/文件名"
        },
        "sort": {
            "type": Number,
            "default": 0,
            "label": "序号"
        },
        "page_id": {
            "type": Number,
            "default": 0,
            "label": "页面路径"
        },
        "page_url": {
            "type": String,
            "default": "",
            "label": "页面URL地址"
        },
        "icon": {
            "type": String,
            "default": "",
            "label": "对应图标"
        }
    },
    /*----------角色权限数据-----------*/
    roles: {
        "id": {
            "type": Number,
            "default": 0
        },
        "name": {
            "type": String,
            "default": "",
            "label": "角色名称"
        },
        "content": {
            "type": Array,
            "default": [],
            "label": "内容"
        }
    },
    /*----------表单配置数据-----------*/
    formList: {
        "id": {
            "type": Number,
            "default": 0
        },
        "form_name": {
            "type": String,
            "default": "",
            "label": "表单名称"
        },
        "content": {
            "type": Object,
            "default": "",
            "label": "数据内容JSON"
        },
        "create_eid": {
            "type": Number,
            "default": 0,
            "label": "创建者用户ID"
        },
        "create_date": {
            "type": Number,
            "default": new Date().getTime(),
            "label": "创建时间"
        }
    },
    /*----------页面配置数据-----------*/
    pageList: {
        "id": {
            "type": Number,
            "default": 0
        },
        "page_name": {
            "type": String,
            "default": "",
            "label": "页面名称"
        },
        "content": {
            "type": Object,
            "default": "",
            "label": "数据内容JSON"
        },
        "create_eid": {
            "type": Number,
            "default": 0,
            "label": "创建者用户ID"
        },
        "create_date": {
            "type": Number,
            "default": new Date().getTime(),
            "label": "创建时间"
        }
    },
    /*----------组织部门表-----------*/
    department: {
        "id": {
            "type": Number,
            "default": 0
        },
        "dept_parentid": {
            "label": "上级部门",
            "type": Number,
            "default": 0
        },
        "dept_name": {
            "type": String,
            "default": "",
            "label": "部门名称"
        },
		"disabled": {
            "label": "是否禁用",
            "type": "Boolean",
            "default": false
        },
		"leaderId": {
            "label": "主管领导ID",
            "type": Number,
            "default": 0
        },
		"sort": {
            "label": "排序",
            "type": Number,
            "default": 0
        }
    },
    /*----------系统用户表-----------*/
    user: {
        "id": {
            "type": Number,
            "default": 0
        },
        "uid": {
            "type": Number,
            "default": 0,
            "label": "员工ID"
        },
        "username": {
            "type": String,
            "default": "",
            "label": "用户名"
        },
        "password": {
            "type": String,
            "default": "123456",
            "label": "密码"
        },
        "roles": {
            "type": Array,
            "default": [],
            "label": "权限"
        },
        "createDate": {
            "type": Number,
            "default": new Date().getTime(),
            "label": "创建时间"
        }
    },
    /*----------员工信息表-----------*/
    employee: {
        "id": {
            "type": Number,
            "default": 0
        },
        "username": {
            "label": "系统账号",
            "type": String,
            "default": ""
        },
        "password": {
            "label": "登陆密码",
            "type": String,
            "default": ""
        },
        "roles": {
            "label": "操作权限",
            "type": Number,
            "default": 0
        },
        "e_name": {
            "label": "员工姓名",
            "type": String,
            "default": ""
        },
        "e_sex": {
            "label": "性别",
            "type": Number,
            "default": 1
        },
        "e_birth": {
            "label": "出生日期",
            "type": Number,
            "default": ""
        },
        "e_political_status": {
            "label": "政治面貌",
            "type": Number,
            "default": 0
        },
        "e_marital_status": {
            "label": "婚姻状况",
            "type": Number,
            "default": 1
        },
        "e_domicile": {
            "label": "户籍所在地",
            "type": Array,
            "default": []
        },
        "e_domicile_type": {
            "label": "户籍类别",
            "type": Number,
            "default": 1
        },
        "e_education": {
            "label": "学历",
            "type": Number,
            "default": 5
        },
        "e_profession": {
            "label": "专业",
            "type": String,
            "default": ""
        },
        "e_graduate_institution": {
            "label": "毕业院校",
            "type": String,
            "default": ""
        },
        "e_idcard_number": {
            "label": "身份证/护照号",
            "type": String,
            "default": ""
        },
        "e_cellphone_number": {
            "label": "手机",
            "type": String,
            "default": ""
        },
        "e_phone_number": {
            "label": "电话",
            "type": String,
            "default": ""
        },
        "e_house_address": {
            "label": "家庭住址",
            "type": String,
            "default": ""
        },
        "e_current_address": {
            "label": "现在住址",
            "type": String,
            "default": ""
        },
        "e_employee_number": {
            "label": "工号",
            "type": String,
            "default": ""
        },
        "e_department": {
            "label": "所属部门",
            "type": Array,
            "default": []
        },
        "is_leader": {
            "label": "是否主管领导",
            "type": Number,
            "default": 0
        },
        "e_position": {
            "label": "岗位",
            "type": Number,
            "default": 0
        },
        "e_title": {
            "label": "职称",
            "type": String,
            "default": ""
        },
        "e_employment_date": {
            "label": "入职日期",
            "type": Number,
            "default": ""
        },
        "e_regular_date": {
            "label": "转正日期",
            "type": Number,
            "default": ""
        },
        "e_work_age": {
            "label": "实际工龄",
            "type": Number,
            "default": 0
        },
        "e_work_age_revise": {
            "label": "工龄修正",
            "type": Number,
            "default": 0
        },
        "e_ annual_leave_service_age": {
            "label": "年假工龄",
            "type": Number,
            "default": 0
        },
        "e_employee_type": {
            "label": "员工类别",
            "type": Number,
            "default": 2
        },
        "e_salary_type": {
            "label": "工资类别",
            "type": Number,
            "default": 2
        },
        "e_social_security_office": {
            "label": "社保所属",
            "type": Number,
            "default": 2
        },
        "e_employee_status": {
            "label": "员工状态",
            "type": Number,
            "default": 1
        },
        "updateDate": {
            "type": Number,
            "default": new Date().getTime(),
            "label": "最后更新时间"
        },
		"disabled":{
			"type": Number,
            "default": 0,
            "label": "是否禁用"
		},
        "token": {
            "label": "登录token",
            "type": String,
            "default": ""
        }
    },
    /*----------时间钟-----------*/
    timeBlock: {
        "id": {
            "type": Number,
            "default": 0
        },
        "userId": {
            "type": Number,
            "default": 0,
            "label": "用户ID"
        },
        "startdate": {
            "type": Number,
            "default": new Date().getTime(),
            "label": "当前周一时间"
        },
        "enddate": {
            "type": Number,
            "default": new Date().getTime(),
            "label": "当前周日时间"
        },
        "apply": {
            "type": Array,
            "default": [],
            "label": "补卡申请"
        },
        "content": {
            "type": Object,
            "default": "",
            "label": "数据内容JSON"
        }
    },
    /*----------流程-----------*/
    workflow: {
        "id": {
            "type": Number,
            "default": 0
        },
        "state": {
            "type": Number,
            "default": 1,
            "label": "状态"
        },
        "createDate": {
            "type": Number,
            "default": new Date().getTime(),
            "label": "创建时间"
        }
    },
    /*----------消息日志表-----------*/
    inbox: {
        "id": {
            "type": Number,
            "default": 0
        },
        "fid": {
            "type": Number,
            "default": 0,
            "label": "消息源ID"
        },
		"isRead": {
            "label": "是否已阅读",
            "type": "Boolean",
            "default": false
        },
		"wfType": {
            "type": Number,
            "default": 0,
            "label": "消息类型"
        },
		"fromuserId": {
            "type": Number,
            "default": 0,
            "label": "用户ID"
        },
		"fromName": {
            "type": String,
            "default": 0,
            "label": "用户姓名"
        },
        "touserId": {
            "type": Array,
            "default": [],
            "label": "用户ID"
        },
        "content": {
            "type": Object,
            "default": "",
            "label": "具体内容"
        },
        "createDate": {
            "type": Number,
            "default": new Date().getTime(),
            "label": "创建时间"
        },
		"updateDate": {
            "type": Number,
            "default": new Date().getTime(),
            "label": "更新时间"
        }
    },

    /*----------图纸信息表-----------*/
    blueprint: {
        "id": {
            "type": Number,
            "default": 0
        },
        "b_emp_id": {
            "label": "录入员用户id",
            "type": String,
            "default": ""
        },
        "b_entry_date": {
            "label": "录入日期",
            "type": Number,
            "default": new Date().getTime(),
        },
        "b_contract_id": {
            "label": "合同号",
            "type": String,
            "default": ""
        },
        "b_production_order_code": {
            "label": "生产指令代码",
            "type": String,
            "default": ""
        },
        "b_project_name": {
            "label": "项目名称",
            "type": String,
            "default": ""
        },
        "b_used_area": {
            "label": "使用场所",
            "type": String,
            "default": ""
        },
        "b_application_industry": {
            "label": "应用行业",
            "type": String,
            "default": ""
        },
        "b_product_name": {
            "label": "产品名称",
            "type": String,
            "default": ""
        },
        "b_product_characteristic": {
            "label": "产品特性",
            "type": String,
            "default": ""
        },
        "b_product_specification": {
            "label": "产品规格",
            "type": String,
            "default": ""
        },
        "b_product_model": {
            "label": "产品型号",
            "type": String,
            "default": ""
        },
        "b_is_put_into_production": {
            "label": "是否投入生产",
            "type": String,
            "default": ""
        },
        "b_blueprint_id": {
            "label": "图纸编码",
            "type": String,
            "default": ""
        },
        "b_blueprint_type": {
            "label": "图纸类型",
            "type": String,
            "default": ""
        },
        "b_blueprint_create_date": {
            "label": "图纸创建日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "b_blueprint_name": {
            "label": "图纸文件名",
            "type": String,
            "default": ""
        },
        "b_blueprint_designer_name": {
            "label": "图纸设计人",
            "type": Number,
            "default": ""
        },
        "b_blueprint_designer_id": {
            "label": "图纸设计人工号",
            "type": String,
            "default": ""
        },
        "b_blueprint_countersigner_name": {
            "label": "图纸会签人",
            "type": Number,
            "default": ""
        },
        "b_blueprint_countersigner_id": {
            "label": "图纸会签人工号",
            "type": String,
            "default": ""
        },
        "b_blueprint_standardized_name": {
            "label": "图纸标准化人",
            "type": Number,
            "default": ""
        },
        "b_blueprint_standardized_id": {
            "label": "图纸标准化人工号",
            "type": String,
            "default": ""
        },
        "b_blueprint_auditor_name": {
            "label": "图纸审核人",
            "type": Number,
            "default": ""
        },
        "b_blueprint_auditor_id": {
            "label": "图纸审核人工号",
            "type": String,
            "default": ""
        },
        "b_blueprint_department": {
            "label": "图纸归属科室",
            "type": String,
            "default": ""
        },
        "b_blueprint_standard_id": {
            "label": "图纸涉及标准编号",
            "type": String,
            "default": ""
        },
        "b_blueprint_status": {
            "label": "图纸当前状态",
            "type": Number,
            "default": 1
        },
        "b_blueprint_version": {
            "label": "图纸版本号",
            "type": String,
            "default": ""
        },
        "b_blueprint_safety_grade": {
            "label": "图纸密级",
            "type": Number,
            "default": 1
        }
    }
}
