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
    /*----------收件箱-----------*/
    inbox: {
        "id": {
            "type": Number,
            "default": 0
        },
        "type": {
            "type": Number,
            "default": 0,
            "label": "消息类型"
        },
        "title": {
            "type": String,
            "default": "",
            "label": "标题名称"
        },
        "form": {
            "type": Object,
            "default": {},
            "label": "来自"
        },
        "touid": {
            "type": Number,
            "default": 0,
            "label": "接受人UID"
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
        "e_superior_department": {
            "label": "上级部门",
            "type": Number,
            "default": 0
        },
        "e_department": {
            "label": "所属部门",
            "type": Number,
            "default": 0
        },
        "is_leader": {
            "label": "是否主管领导",
            "type": "Boolean",
            "default": false
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
        "touserId": {
            "type": Array,
            "default": [],
            "label": "用户ID"
        },
        "content": {
            "type": String,
            "default": "",
            "label": "具体内容"
        },
        "createDate": {
            "type": Number,
            "default": new Date().getTime(),
            "label": "创建时间"
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
    },
	/*----------生产调整信息表-----------*/
    produceAdjust: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
        "pa_operator_name": {
            "name":"pa_operator_name",
            "type": String,
            "default": 0,
            "label": "录入员姓名"
        },
        "pa_operator_id": {
            "name":"pa_operator_id",
            "type": String,
            "default": 0,
            "label": "录入员工号"
        },
        "pa_entry_date": {
            "name":"pa_entry_date",
            "type": Number,
            "default": new Date().getTime(),
            "label": "录入日期"
        },
        "pa_adjust_priority": {
            "name":"pa_adjust_priority",
            "type": Number,
            "default": 0,
            "label": "调整优先级"
        },
        "pa_adjust_title": {
            "name":"pa_adjust_title",
            "type": String,
            "default": "",
            "label": "调整标题"
        },
        "pa_adjust_description": {
            "name":"pa_adjust_description",
            "type": String,
            "default": "",
            "label": "调整描述"
        },
        "pa_adjust_responsible_person_name": {
            "name":"pa_adjust_responsible_person_name",
            "type": String,
            "default": "",
            "label": "调整负责人姓名"
        },
        "pa_adjust_department": {
            "name":"pa_adjust_department",
            "type": Number,
            "default": 1,
            "label": "调整所属科室"
        }
    },
	/*----------问题反馈信息表-----------*/
    problem: {
        "id":{
            "name":"id",
            "type":Number,
            "hide":true,
            "default":0
        },
        "p_operator_name": {
            "name":"p_operator_name",
            "type":String,
            "label":"录入员姓名",
            "default":""
        },
        "p_operator_id": {
            "name":"p_operator_id",
            "type":String,
            "label":"录入员姓号",
            "default":""
        },
        "p_entry_date": {
            "name":"p_entry_date",
            "type":Number,
            "label":"录入日期",
            "default":""
        },
        "p_problem_title": {
            "name":"p_problem_title",
            "type":String,
            "label":"问题标题",
            "default":""
        },
        "p_problem_priority": {
            "name":"p_problem_priority",
            "type":Number,
            "label":"问题优先级",
            "default":1
        },
        "p_problem_description": {
            "name":"p_problem_description",
            "type":String,
            "label":"问题描述",
            "default":""
        },
        "p_problem_department": {
            "name":"p_problem_department",
            "type":Number,
            "label":"问题所属科室",
            "default":1
        },
        "p_problem_responsible_person_name": {
            "name":"p_problem_responsible_person_name",
            "type":String,
            "label":"问题负责人",
            "default":""
        }

    },
/*----------分配任务表-----------*/
    assign_task: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
        "at_assigner_name": {
            "name": "at_assigner_name",
            "label": "分配人姓名",
            "type": String,
            "default": ""
        },
		"at_task_name": {
            "name": "at_task_name",
            "label": "任务名称",
            "type": String,
            "default": ""
        },
		"at_task_id": {
            "name": "at_task_id",
            "label": "任务编号",
            "type": String,
            "default": ""
        },
		"at_responsible_person": {
            "name": "at_responsible_person",
            "label": "负责人姓名",
            "type": String,
            "default": ""
        },
		"at_start_date": {
            "name": "at_start_date",
            "label": "起始日期",
            "type": Number,
            "default": 1
        },
		"at_finish_date": {
            "name": "at_finish_date",
            "label": "结束日期",
            "type": Number,
            "default": 1
        },
		"at_remark": {
            "name": "at_remark",
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
	/*----------文档信息表-----------*/
document: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
        "d_operator_name": {
            "name": "d_operator_name",
            "label": "录入员姓名",
            "type": String,
            "default": "z1"
        },
        "d_operator_id": {
            "name": "d_operator_id",
            "label": "录入员工号",
            "type": String,
            "default": "1"
        },
		 "d_entry_date": {
            "name": "d_entry_date",
            "label": "录入日期",
            "type": Number,
            "default": 1
        },
		"d_document_type": {
            "name": "d_document_type",
            "label": "文档分类",
            "type": Number,
            "default": 1
        },
		"d_document_form": {
            "name": "d_document_form",
            "label": "文档格式",
            "type": Number,
            "default": 1
        },
		"d_document_name": {
            "name": "d_document_name",
            "label": "文档名",
            "type": String,
            "default": "1"
        },
		"d_document_title": {
            "name": "d_document_title",
            "label": "文档标题",
            "type": String,
            "default": "1"
        },
		"d_document_description": {
            "name": "d_document_description",
            "label": "文档描述",
            "type": String,
            "default": "1"
        },
		"d_document_safety_grade": {
            "name": "d_document_safety_grade",
            "label": "文档密级",
            "type": number,
            "default": 1
        },
		"d_document_respinsible_person_name": {
            "name": "d_document_respinsible_person_name",
            "label": "文档负责人姓名",
            "type": String,
            "default": "1"
        },
		"d_document_department": {
            "name": "d_document_department",
            "label": "文档所属科室",
            "type": Number,
            "default": 1
        },
        "d_document_version": {
            "name": "d_document_version",
            "label": "文档版本号",
            "type": String,
            "default": ""
        },
		"d_remark": {
            "name": "d_remark",
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
/*----------生产任务信息表-----------*/
produce_task: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
        "pt_creator_name": {
            "name": "pt_creator_name",
            "label": "创建者姓名",
            "type": String,
            "default": "z1"
        },
        "pt_task_id": {
            "name": "pt_task_id",
            "label": "任务编号",
            "type": String,
            "default": "1"
        },
		"pt_task_title": {
            "name": "pt_task_title",
            "label": "任务标题",
            "type": String,
            "default": "1"
        },
		"pt_task_type": {
            "name": "pt_task_type",
            "label": "任务类别",
            "type": Number,
            "default": 1
        },
		"pt_project": {
            "name": "pt_project",
            "label": "所属项目",
            "type": Number,
            "default": 1
        },
		"pt_blueprint": {
            "name": "pt_blueprint",
            "label": "所属图纸",
            "type": Number,
            "default": 1
        },
		"pt_document": {
            "name": "pt_document",
            "label": "所属文档",
            "type": Number,
            "default": 1
        },
		"pt_task_description": {
            "name": "pt_task_description",
            "label": "任务描述",
            "type": String,
            "default": "1"
        },
		"pt_process_node": {
            "name": "pt_process_node",
            "label": "工序节点",
            "type": String,
            "default": "1"
        },
        "pt_create_time": {
            "name": "pt_create_time",
            "label": "任务创建时间",
            "type": Number,
            "default": 1
        },
		"pt_finish_time": {
            "name": "pt_finish_time",
            "label": "任务完成时间",
            "type": Number,
            "default": 1
        },
		"pt_finish_person_name": {
            "name": "pt_finish_person_name",
            "label": "完成此任务员工姓名",
            "type": String,
            "default": "z1"
        },
        "pt_responsible_person_name": {
            "name": "pt_responsible_person_name",
            "label": "任务负责人姓名",
            "type": String,
            "default": "l1"
        },
		"pt_remark": {
            "name": "pt_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------残次废品信息表-----------*/
imperfections: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
        "im_reporter_name": {
            "name": "im_reporter_name",
            "label": "报告人姓名",
            "type": String,
            "default": "z1"
        },
        "im_report_date": {
            "name": "im_report_date",
            "label": "报告日期",
            "type": Number,
            "default": 1
        },
		"im_product_name": {
            "name": "im_product_name",
            "label": "产品名称",
            "type": String,
            "default": "1"
        },
		"im_product_specification": {
            "name": "im_product_specification",
            "label": "产品规格",
            "type": String,
            "default": "1"
        },
		"im_project_name": {
            "name": "im_project_name",
            "label": "类别",
            "type": Number,
            "default": 1
        },
		"im_reason": {
            "name": "im_reason",
            "label": "原因",
            "type": String,
            "default": "1"
        },
		"im_process_node": {
            "name": "im_process_node",
            "label": "生产过程节点",
            "type": String,
            "default": "1"
        },
		"im_description": {
            "name": "im_description",
            "label": "描述",
            "type": String,
            "default": "1"
        },
		"im_product_area": {
            "name": "im_product_area",
            "label": "科室/车间",
            "type": Number,
            "default": 1
        },
        "im_cost": {
            "name": "im_cost",
            "label": "成本",
            "type": Number,
            "default": 1
        },
		"im_resopnsible_person_name": {
            "name": "im_resopnsible_person_name",
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
		"im_deal_measure": {
            "name": "im_deal_measure",
            "label": "处理措施",
            "type": String,
            "default": "z1"
        },
        "im_deal_result": {
            "name": "im_deal_result",
            "label": "处理结果",
            "type": String,
            "default": "l1"
        },
		"im_remark": {
            "name": "im_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------设计图纸与生产不匹配信息表-----------*/
mismatch: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
        "mi_reporter_name": {
            "name": "mi_reporter_name",
            "label": "报告人姓名",
            "type": String,
            "default": "z1"
        },
        "mi_report_date": {
            "name": "mi_report_date",
            "label": "报告日期",
            "type": Number,
            "default": 1
        },
		"mi_product_name": {
            "name": "mi_product_name",
            "label": "产品名称",
            "type": String,
            "default": "1"
        },
		"mi_product_specification": {
            "name": "mi_product_specification",
            "label": "产品规格",
            "type": String,
            "default": "1"
        },
		"mi_project_name": {
            "name": "mi_project_name",
            "label": "项目名称",
            "type": String,
            "default": "1"
        },
		"mi_blueprint_id": {
            "name": "mi_blueprint_id",
            "label": "图纸编号",
            "type": String,
            "default": "1"
        },
		"mi_reason": {
            "name": "mi_reason",
            "label": "原因",
            "type": String,
            "default": "1"
        },
		"mi_process_node": {
            "name": "mi_process_node",
            "label": "生产过程节点",
            "type": String,
            "default": "1"
        },
		"mi_description": {
            "name": "mi_description",
            "label": "描述",
            "type": String,
            "default": "1"
        },
        "mi_product_area": {
            "name": "mi_product_area",
            "label": "科室/车间",
            "type": Number,
            "default": ""
        },
		"mi_resopnsible_person_name": {
            "name": "mi_resopnsible_person_name",
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
		"mi_deal_measure": {
            "name": "mi_deal_measure",
            "label": "处理措施",
            "type": String,
            "default": "z1"
        },
        "mi_deal_result": {
            "name": "mi_deal_result",
            "label": "处理结果",
            "type": String,
            "default": "l1"
        },
		"mi_remark": {
            "name": "mi_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------生产问题信息表-----------*/
produce_problem: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
        "pp_reporter_name": {
            "name": "pp_reporter_name",
            "label": "报告人姓名",
            "type": String,
            "default": "z1"
        },
        "pp_report_date": {
            "name": "pp_report_date",
            "label": "报告日期",
            "type": Number,
            "default": 1
        },
		"pp_product_name": {
            "name": "pp_product_name",
            "label": "产品名称",
            "type": String,
            "default": "1"
        },
		"pp_product_specification": {
            "name": "pp_product_specification",
            "label": "产品规格",
            "type": String,
            "default": "1"
        },
		"pp_project_name": {
            "name": "pp_project_name",
            "label": "项目名称",
            "type": String,
            "default": "1"
        },
		"pp_problem_description": {
            "name": "pp_problem_description",
            "label": "问题描述",
            "type": String,
            "default": "1"
        },
		"pp_process_node": {
            "name": "pp_process_node",
            "label": "生产过程节点",
            "type": String,
            "default": "1"
        },
		"pp_product_area": {
            "name": "pp_product_area",
            "label": "科室/车间",
            "type": Number,
            "default": ""
        },
		"pp_resopnsible_person_name": {
            "name": "pp_resopnsible_person_name",
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
		"pp_deal_measure": {
            "name": "pp_deal_measure",
            "label": "处理措施",
            "type": String,
            "default": "z1"
        },
        "pp_deal_result": {
            "name": "pp_deal_result",
            "label": "处理结果",
            "type": String,
            "default": "l1"
        },
		"pp_remark": {
            "name": "pp_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------材料准备不充分问题信息表-----------*/
material_preparation_issue: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
        "mpi_reporter_name": {
            "name": "mpi_reporter_name",
            "label": "报告人姓名",
            "type": String,
            "default": "z1"
        },
        "mpi_report_date": {
            "name": "mpi_report_date",
            "label": "报告日期",
            "type": Number,
            "default": 1
        },
		"mpi_product_name": {
            "name": "mpi_product_name",
            "label": "产品名称",
            "type": String,
            "default": "1"
        },
		"mpi_product_specification": {
            "name": "mpi_product_specification",
            "label": "产品规格",
            "type": String,
            "default": "1"
        },
		"mpi_project_name": {
            "name": "mpi_project_name",
            "label": "项目名称",
            "type": String,
            "default": "1"
        },
		"mpi_blueprint_id": {
            "name": "mpi_blueprint_id",
            "label": "图纸编号",
            "type": String,
            "default": "1"
        },
		"mpi_reason": {
            "name": "mpi_reason",
            "label": "问题原因",
            "type": String,
            "default": "1"
        },
		"mpi_process_node": {
            "name": "mpi_process_node",
            "label": "生产过程节点",
            "type": String,
            "default": "1"
        },
		"mpi_problem_description": {
            "name": "mpi_problem_description",
            "label": "问题描述",
            "type": String,
            "default": "1"
        },
		"mpi_product_area": {
            "name": "mpi_product_area",
            "label": "科室/车间",
            "type": Number,
            "default": ""
        },
		"mpi_resopnsible_person_name": {
            "name": "mpi_resopnsible_person_name",
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
		"mpi_deal_measure": {
            "name": "mpi_deal_measure",
            "label": "处理措施",
            "type": String,
            "default": "z1"
        },
        "mpi_deal_result": {
            "name": "mpi_deal_result",
            "label": "处理结果",
            "type": String,
            "default": "l1"
        },
		"mpi_remark": {
            "name": "mpi_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------建议与改进表-----------*/
improvement: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
        "i_reporter_name": {
            "name": "i_reporter_name",
            "label": "报告人姓名",
            "type": String,
            "default": "z1"
        },
        "i_report_date": {
            "name": "i_report_date",
            "label": "报告日期",
            "type": Number,
            "default": 1
        },
		"i_product_name": {
            "name": "i_product_name",
            "label": "产品名称",
            "type": String,
            "default": "1"
        },
		"i_product_specification": {
            "name": "i_product_specification",
            "label": "产品规格",
            "type": String,
            "default": "1"
        },
		"i_project_name": {
            "name": "i_project_name",
            "label": "项目名称",
            "type": String,
            "default": "1"
        },
		"i_blueprint_id": {
            "name": "i_blueprint_id",
            "label": "图纸编号",
            "type": String,
            "default": "1"
        },
		"i_description": {
            "name": "i_description",
            "label": "问题描述",
            "type": String,
            "default": "1"
        },
		"i_process_node": {
            "name": "i_process_node",
            "label": "生产过程节点",
            "type": String,
            "default": "1"
        },
		"i_product_area": {
            "name": "i_product_area",
            "label": "科室/车间",
            "type": Number,
            "default": ""
        },
		"i_resopnsible_person_name": {
            "name": "i_resopnsible_person_name",
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
		"i_remark": {
            "name": "i_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------产品生产过程数据信息表-----------*/
produce_process: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
		"pproc_process_node": {
            "name": "pproc_process_node",
            "label": "生产过程节点",
            "type": String,
            "default": "1"
        },
		"pproc_project_name": {
            "name": "pproc_project_name",
            "label": "项目名称",
            "type": String,
            "default": "1"
        },
		"pproc_product_name": {
            "name": "pproc_product_name",
            "label": "产品名称",
            "type": String,
            "default": "1"
        },
		"pproc_product_specification": {
            "name": "pproc_product_specification",
            "label": "产品规格",
            "type": String,
            "default": "1"
        },
		"pproc_product_id": {
            "name": "pproc_product_id",
            "label": "产品编号",
            "type": String,
            "default": "1"
        },
		"pproc_product_data": {
            "name": "pproc_product_data",
            "label": "产品数据",
            "type": String,
            "default": "1"
        },
		"pproc_product_area": {
            "name": "pproc_product_area",
            "label": "科室/车间",
            "type": Number,
            "default": ""
        },
        "pproc_reporter_name": {
            "name": "pproc_reporter_name",
            "label": "报告人姓名",
            "type": String,
            "default": "z1"
        },
        "pproc_report_date": {
            "name": "pproc_report_date",
            "label": "报告日期",
            "type": Number,
            "default": 1
        },
		"pproc_inspector": {
            "name": "pproc_inspector",
            "label": "检查员",
            "type": String,
            "default": "z1"
        },
		"pproc_resopnsible_person_name": {
            "name": "pproc_resopnsible_person_name",
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
		"pproc_remark": {
            "name": "pproc_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------违规报告信息表-----------*/
violation: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
		"v_reporter_name": {
            "name": "v_reporter_name",
            "label": "报告人姓名",
            "type": String,
            "default": "z1"
        },
        "v_report_date": {
            "name": "v_report_date",
            "label": "报告日期",
            "type": Number,
            "default": 1
        },
		"v_description": {
            "name": "v_description",
            "label": "事件描述",
            "type": String,
            "default": "1"
        },
		"v_date": {
            "name": "v_date",
            "label": "事件发生时间",
            "type": Number,
            "default": 1
        },
		"v_person_liable": {
            "name": "v_person_liable",
            "label": "事件发生责任人",
            "type": String,
            "default": "1"
        },
		"v_reason": {
            "name": "v_reason",
            "label": "事故发生原因",
            "type": String,
            "default": "1"
        },
		"v_process_node": {
            "name": "v_process_node",
            "label": "生产过程节点",
            "type": String,
            "default": "1"
        },
		"v_product_area": {
            "name": "v_product_area",
            "label": "科室/车间",
            "type": Number,
            "default": ""
        },
		"v_remark": {
            "name": "v_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------生产线改进意见表-----------*/
product_improvement: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
		"pi_reporter_name": {
            "name": "pi_reporter_name",
            "label": "报告人姓名",
            "type": String,
            "default": "z1"
        },
        "pi_report_date": {
            "name": "pi_report_date",
            "label": "报告日期",
            "type": Number,
            "default": 1
        },
		"pi_reason": {
            "name": "pi_reason",
            "label": "改进原因",
            "type": String,
            "default": "1"
        },
		"pi_description": {
            "name": "pi_description",
            "label": "事件描述",
            "type": String,
            "default": "1"
        },
		"pi_process_node": {
            "name": "pi_process_node",
            "label": "生产过程节点",
            "type": String,
            "default": "1"
        },
		"pi_product_name": {
            "name": "pi_product_name",
            "label": "产品名称",
            "type": String,
            "default": "1"
        },
		"pi_product_specification": {
            "name": "pi_product_specification",
            "label": "产品规格",
            "type": String,
            "default": "1"
        },
		"pi_project_name": {
            "name": "pi_project_name",
            "label": "项目名称",
            "type": String,
            "default": "1"
        },
		"pi_blueprint_id": {
            "name": "pi_blueprint_id",
            "label": "图纸编号",
            "type": String,
            "default": "1"
        },
		"pi_product_area": {
            "name": "pi_product_area",
            "label": "科室/车间",
            "type": Number,
            "default": ""
        },
		"pi_resopnsible_person_name": {
            "name": "pi_resopnsible_person_name",
            "label": "主管姓名",
            "type": String,
            "default": "1"
        },
		"pi_remark": {
            "name": "pi_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------生产准备表-----------*/
produce_prepare: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
		"ppre_task_id": {
            "name": "ppre_task_id",
            "label": "任务工号",
            "type": String,
            "default": "z1"
        },
        "ppre_produce_equipment": {
            "name": "ppre_produce_equipment",
            "label": "生产所需设备",
            "type": String,
            "default": ""
        },
		"ppre_produce_tool": {
            "name": "ppre_produce_tool",
            "label": "生产所需工具",
            "type": String,
            "default": "1"
        },
		"ppre_produce_blueprint": {
            "name": "ppre_produce_blueprint",
            "label": "生产所需图纸",
            "type": String,
            "default": "1"
        },
		"ppre_produce_document": {
            "name": "ppre_produce_document",
            "label": "生产所需文档",
            "type": String,
            "default": "1"
        },
		"ppre_technology_parameter": {
            "name": "ppre_technology_parameter",
            "label": "工艺参数",
            "type": String,
            "default": "1"
        },
		"ppre_nc_program": {
            "name": "ppre_nc_program",
            "label": "NC程序",
            "type": String,
            "default": "1"
        },
		"ppre_produce_order": {
            "name": "ppre_produce_order",
            "label": "生产指令",
            "type": String,
            "default": "1"
        },
		"ppre_produce_attention": {
            "name": "ppre_produce_attention",
            "label": "生产注意事项",
            "type": String,
            "default": "1"
        },
		"ppre_remark": {
            "name": "ppre_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------公告表-----------*/
annoucement: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
		"a_creator_name": {
            "name": "a_creator_name",
            "label": "编写人姓名",
            "type": String,
            "default": "z1"
        },
		"a_create_date": {
            "name": "a_create_date",
            "label": "编写日期",
            "type": Number,
            "default": 1
        },
		"a_publication_date": {
            "name": "a_publication_date",
            "label": "发布日期",
            "type": Number,
            "default": 1
        },
        "a_announcement_title": {
            "name": "a_announcement_title",
            "label": "公告标题",
            "type": String,
            "default": ""
        },
		"a_announcement_content": {
            "name": "a_announcement_content",
            "label": "公告内容",
            "type": String,
            "default": "1"
        },
		"a_reviewer": {
            "name": "a_reviewer",
            "label": "审核人",
            "type": String,
            "default": "1"
        },
		"a_review_date": {
            "name": "a_review_date",
            "label": "审核日期",
            "type": Number,
            "default": 1
        },
		"a_effective_date": {
            "name": "a_effective_date",
            "label": "有效日期",
            "type": Number,
            "default": 1
        },
		"a_status": {
            "name": "a_status",
            "label": "公告状态",
            "type": Number,
            "default": 1
        },
		"a_remark": {
            "name": "a_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------车间通知表-----------*/
produce_area_notice: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
		"pan_creator_name": {
            "name": "pan_creator_name",
            "label": "编写人姓名",
            "type": String,
            "default": "z1"
        },
		"pan_create_date": {
            "name": "pan_create_date",
            "label": "编写日期",
            "type": Number,
            "default": 1
        },
		"pan_publication_date": {
            "name": "pan_publication_date",
            "label": "发布日期",
            "type": Number,
            "default": 1
        },
        "pan_notice_title": {
            "name": "pan_notice_title",
            "label": "通知标题",
            "type": String,
            "default": ""
        },
		"pan_notice_content": {
            "name": "pan_notice_content",
            "label": "通知内容",
            "type": String,
            "default": "1"
        },
		"pan_reviewer": {
            "name": "pan_reviewer",
            "label": "审核人",
            "type": String,
            "default": "1"
        },
		"pan_review_date": {
            "name": "pan_review_date",
            "label": "审核日期",
            "type": Number,
            "default": 1
        },
		"pan_effective_date": {
            "name": "pan_effective_date",
            "label": "有效日期",
            "type": Number,
            "default": 1
        },
		"pan_status": {
            "name": "pan_status",
            "label": "通知状态",
            "type": Number,
            "default": 1
        },
		"pan_remark": {
            "name": "pan_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------小组通知表-----------*/
team_notice: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
		"tn_creator_name": {
            "name": "tn_creator_name",
            "label": "编写人姓名",
            "type": String,
            "default": "z1"
        },
		"tn_create_date": {
            "name": "tn_create_date",
            "label": "编写日期",
            "type": Number,
            "default": 1
        },
		"tn_publication_date": {
            "name": "tn_publication_date",
            "label": "发布日期",
            "type": Number,
            "default": 1
        },
        "tn_notice_title": {
            "name": "tn_notice_title",
            "label": "通知标题",
            "type": String,
            "default": ""
        },
		"tn_notice_content": {
            "name": "tn_notice_content",
            "label": "通知内容",
            "type": String,
            "default": "1"
        },
		"tn_reviewer": {
            "name": "tn_reviewer",
            "label": "审核人",
            "type": String,
            "default": "1"
        },
		"tn_review_date": {
            "name": "tn_review_date",
            "label": "审核日期",
            "type": Number,
            "default": 1
        },
		"tn_effective_date": {
            "name": "tn_effective_date",
            "label": "有效日期",
            "type": Number,
            "default": 1
        },
		"tn_status": {
            "name": "tn_status",
            "label": "通知状态",
            "type": Number,
            "default": 1
        },
		"tn_remark": {
            "name": "tn_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------待办事项表-----------*/
schedule: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
		"s_schedule_name": {
            "name": "s_schedule_name",
            "label": "待办事项名称",
            "type": String,
            "default": "z1"
        },
		"s_schedule_id": {
            "name": "s_schedule_id",
            "label": "待办事项编号",
            "type": String,
            "default": "z1"
        },
		"s_create_date": {
            "name": "s_create_date",
            "label": "创建时间",
            "type": Number,
            "default": 1
        },
        "s_creator_name": {
            "name": "s_creator_name",
            "label": "创建人姓名",
            "type": String,
            "default": ""
        },
		"s_schedule_description": {
            "name": "s_schedule_description",
            "label": "事项描述",
            "type": String,
            "default": "1"
        },
		"s_start_date": {
            "name": "s_start_date",
            "label": "开始日期",
            "type": Number,
            "default": 1
        },
		"s_finish_date": {
            "name": "s_finish_date",
            "label": "结束日期",
            "type": Number,
            "default": 1
        },
		"s_status": {
            "name": "s_status",
            "label": "当前状态",
            "type": Number,
            "default": 1
        },
		"s_executor_name": {
            "name": "s_executor_name",
            "label": "执行人姓名",
            "type": String,
            "default": "1"
        },
		"s_responsible_name": {
            "name": "s_responsible_name",
            "label": "主管姓名",
            "type": String,
            "default": "1"
        },
		"s_produce_order_number": {
            "name": "s_produce_order_number",
            "label": "工单号",
            "type": String,
            "default": ""
        },
		"s_remark": {
            "name": "s_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------收件箱-----------*/
inbodx: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
		"in_sender_docid": {
            "name": "in_sender_docid",
            "label": "发送人标识",
            "type": String,
            "default": "z1"
        },
		"in_sender_name": {
            "name": "in_sender_name",
            "label": "发送人姓名",
            "type": String,
            "default": "z1"
        },
		"in_receiver_docid": {
            "name": "in_receiver_docid",
            "label": "接收人标识",
            "type": String,
            "default": "z1"
        },
		"in_receiver_name": {
            "name": "in_receiver_name",
            "label": "接收人姓名",
            "type": String,
            "default": "z1"
        },
		"in_message_type": {
            "name": "in_message_type",
            "label": "类型",
            "type": Number,
            "default": 1
        },
		"in_priority": {
            "name": "in_priority",
            "label": "优先级",
            "type": Number,
            "default": 1
        },
		"in_flow_docid": {
            "name": "in_flow_docid",
            "label": "流程编号",
            "type": String,
            "default": ""
        },
		"in_state": {
            "name": "in_state",
            "label": "当前状态",
            "type": Number,
            "default": 1
        },
		"in_doc_docid": {
            "name": "in_doc_docid",
            "label": "记录号",
            "type": String,
            "default": "1"
        },
		"in_tablename": {
            "name": "in_tablename",
            "label": "库表名",
            "type": String,
            "default": "1"
        },
		"in_db_name": {
            "name": "in_db_name",
            "label": "DB名",
            "type": String,
            "default": "1"
        },
		"in_send_datetime": {
            "name": "in_send_datetime",
            "label": "发送日期",
            "type": Number,
            "default": 1
        },
		"in_description": {
            "name": "in_description",
            "label": "描述",
            "type": Number,
            "default": 1
        },
		"in_timer": {
            "name": "in_timer",
            "label": "定时器",
            "type": Number,
            "default": 1
        },
		"in_remark": {
            "name": "in_remark",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------工作流程表-----------*/
workflow: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
		"w_name": {
            "name": "w_name",
            "label": "名称",
            "type": String,
            "default": "z1"
        },
		"w_desc": {
            "name": "w_desc",
            "label": "描述",
            "type": String,
            "default": "z1"
        },
		"w_tags": {
            "name": "w_tags",
            "label": "标签",
            "type": String,
            "default": "z1"
        },
		"w_create_time": {
            "name": "w_create_time",
            "label": "创建日期",
            "type": Number,
            "default": 1
        },
		"w_creator_name": {
            "name": "w_creator_name",
            "label": "创建人姓名",
            "type": String,
            "default": "z1"
        },
		"w_creator_docid": {
            "name": "w_creator_docid",
            "label": "创建人标识",
            "type": String,
            "default": "z1"
        },
		"w_auth_name": {
            "name": "w_auth_name",
            "label": "授权人姓名",
            "type": String,
            "default": "z1"
        },
		"w_auth_docid": {
            "name": "w_auth_docid",
            "label": "授权人标识",
            "type": String,
            "default": "z1"
        },
		"w_department": {
            "name": "w_department",
            "label": "所属科室",
            "type": Number,
            "default": 1
        },
		"w_remarks": {
            "name": "w_remarks",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
/*----------工作流程状态表-----------*/
workflow_node: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
		"wn_flow_name": {
            "name": "wn_flow_name",
            "label": "流程名称",
            "type": String,
            "default": "z1"
        },
		"wn_flow_docid": {
            "name": "wn_flow_docid",
            "label": "流程标识",
            "type": String,
            "default": "z1"
        },
		"wn_node_name": {
            "name": "wn_node_name",
            "label": "状态名称",
            "type": String,
            "default": "z1"
        },
		"wn_create_time": {
            "name": "wn_create_time",
            "label": "创建日期",
            "type": Number,
            "default": 1
        },
		"wn_creator_name": {
            "name": "wn_creator_name",
            "label": "创建人姓名",
            "type": String,
            "default": "z1"
        },
		"wn_creator_docid": {
            "name": "wn_creator_docid",
            "label": "创建人标识",
            "type": String,
            "default": "z1"
        },
		"wn_auth_name": {
            "name": "wn_auth_name",
            "label": "授权人姓名",
            "type": String,
            "default": "z1"
        },
		"wn_auth_docid": {
            "name": "wn_auth_docid",
            "label": "授权人标识",
            "type": String,
            "default": "z1"
        },
		"wn_department": {
            "name": "wn_department",
            "label": "所属科室",
            "type": Number,
            "default": 1
        },
		"wn_remarks": {
            "name": "wn_remarks",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
	/*----------工作流程状态规则表-----------*/
workflow_edge: {
        "id": {
            "name": "id",
            "hide": true,
            "type": Number,
            "default": 0
        },
		"we_flow_name": {
            "name": "we_flow_name",
            "label": "流程名称",
            "type": String,
            "default": "z1"
        },
		"we_flow_docid": {
            "name": "we_flow_docid",
            "label": "流程标识",
            "type": String,
            "default": "z1"
        },
		"we_edge_name": {
            "name": "we_edge_name",
            "label": "规则名称",
            "type": String,
            "default": "z1"
        },
		"we_source_state": {
            "name": "we_source_state",
            "label": "起始状态",
            "type": Number,
            "default": 1
        },
		"we_dest_state": {
            "name": "we_dest_state",
            "label": "目标状态",
            "type": Number,
            "default": 1
        },
		"we_event": {
            "name": "we_event",
            "label": "事件",
            "type": String,
            "default": "z1"
        },
		"we_desc": {
            "name": "we_desc",
            "label": "描述",
            "type": String,
            "default": "z1"
        },
		"we_create_time": {
            "name": "we_create_time",
            "label": "创建日期",
            "type": Number,
            "default": 1
        },
		"we_creator_name": {
            "name": "we_creator_name",
            "label": "创建人姓名",
            "type": String,
            "default": "z1"
        },
		"we_creator_docid": {
            "name": "we_creator_docid",
            "label": "创建人标识",
            "type": String,
            "default": "z1"
        },
		"we_auth_name": {
            "name": "we_auth_name",
            "label": "授权人姓名",
            "type": String,
            "default": "z1"
        },
		"we_auth_docid": {
            "name": "we_auth_docid",
            "label": "授权人标识",
            "type": String,
            "default": "z1"
        },
		"we_department": {
            "name": "we_department",
            "label": "所属科室",
            "type": Number,
            "default": 1
        },
		"we_remarks": {
            "name": "we_remarks",
            "label": "备注",
            "type": String,
            "default": "l1"
        }
    },
    /*----------文件管理表----------*/
    fileManager:{
        "id": {
            "name": "id",
            "type": "Number",
            "hide": true,
            "default": 0
        },
        "collInfo": {
            "name": "fileManager",
            "label": "文件管理",
            "type": "String",
            "hide": true,
            "default": ""
        },
	    "parentid" : {
            "name":"parentid",
            "type":"Number",
            "default":0,
            "hide":true
        },
        "name":{
            "name":"name",
            "type":"String",
            "default":""
        },
	    "suffix": {
            "name":"suffix",
            "type":"String",
            "default":""
        },
        "desc":{
            "name":"desc",
            "type":"String",
            "default":""
        },
        "create_date":{
            "name":"create_date",
            "type":"Number",
            "default": new Date().getTime()
        }
    }
}