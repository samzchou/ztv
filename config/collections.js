/* eslint-disable */
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
    collections: {
        "id": {
            "type": Number,
            "default": 0
        },
        "ctype": {
            "type": Number,
            "label": "是否系统标准表",
            "default": 0
        },
        "label": {
            "type": String,
            "label": "数据表Label名称",
            "default": ""
        },
        "name": {
            "type": String,
            "label": "数据表name名称",
            "default": ""
        },
        "fields": {
            "type": String,
            "label": "数据表name名称",
            "default": "",
            "tableHide": true
        }
    },
	
    workflow_type: {
        "id": {
            "type": Number,
            "default": 0
        },
        "dept_id": {
            "type": Array,
            "label": "所属部门",
            "default": []
        },
        "name": {
            "type": String,
            "label": "类别名称",
            "default": ""
        }
    },
    workflow_distance: {
        "id": {
            "type": Number,
            "default": 0
        },
        "wt_id": {
            "type": Number,
            "label": "流程类型ID",
            "default": 0
        },
        "name": {
            "type": String,
            "label": "流程实例名称",
            "default": ""
        },
        "grade": {
            "type": Number,
            "label": "流程级别",
            "default": 0
        },
        "limit": {
            "type": Number,
            "label": "操作限制",
            "default": 0
        },
        "notice_type": {
            "type": Number,
            "label": "通知类型",
            "default": 0
        },
        "file_id": {
            "type": Number,
            "label": "绑定文档ID",
            "default": 0
        }
    },
    workflow_history: {
        "id": {
            "type": Number,
            "default": 0
        },
        "wd_id": {
            "type": Number,
            "label": "对应流程ID",
            "default": 0
        },
        "from_uid": {
            "type": Number,
            "label": "上节点提交人ID",
            "default": 0
        },
        "to_uid": {
            "type": Number,
            "label": "下节点处理人ID",
            "default": 0
        },
        "state": {
            "type": Number,
            "label": "流程状态",
            "default": 0
        },
        "feedback": {
            "type": String,
            "label": "反馈意见",
            "default": ""
        },
        "create_date": {
            "type": Number,
            "label": "创建时间",
            "default": new Date().getTime()
        }
    },
    /*----------文件系统目录数据-----------*/
    fileCatalog: {
        "id": {
            "type": Number,
            "default": 0
        },
		"type": {
            "type": Number,
			"label": "分类(个人、部分、公司)",
            "default": 0
        },
        "pid": {
            "type": Number,
            "label": "父级ID",
            "default": 0
        },
		"uid": {
            "type": Number,
            "label": "用户UID",
            "default": 0
        },
		"department": {
            "type": Array,
            "label": "部门ID",
            "default": []
        },
        "name": {
            "type": String,
            "label": "目录名称",
            "default": ""
        },
        "disabled": {
            "type": Number,
            "label": "是否禁用",
            "default": 0
        }
    },
    
    /*----------系统服务数据-----------*/
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
		"sort": {
            "type": Number,
            "default": 0,
			"label": "排序"
        },
		"isLeader": {
            "type": Boolean,
            "default": false,
			"label": "是否为部门主管级"
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
            "type": Array,
            "default": []
        },
        "sort": {
            "label": "排序",
            "type": Number,
            "default": 0
        }
    },
    /*----------工作分类信息表-----------*/
    workType: {
        "id": {
            "type": Number,
            "default": 0
        },
        "name": {
            "label": "工作分类名称",
            "type": String,
            "default": ""
        },
        "disabled": {
            "label": "是否禁用",
            "type": Number,
            "default": 0
        },
        "sort": {
            "label": "排序",
            "type": Number,
            "default": 0
        }
    },
    /*----------项目信息表-----------*/
    workProject: {
        "id": {
            "type": Number,
            "default": 0
        },
        "typeid": {
            "label": "项目名称",
            "type": Number,
            "default": 0
        },
        "name": {
            "label": "项目名称",
            "type": String,
            "default": ""
        },
        "disabled": {
            "label": "是否禁用",
            "type": Number,
            "default": 0
        },
        "sort": {
            "label": "排序",
            "type": Number,
            "default": 0
        }
    },
	work_report:{
		"id": {
            "type": Number,
            "default": 0
        },
		"type": {
            "type": Number,
            "label": "报告类型(月计划、周报)",
            "default": 1
        },
        "uid": {
            "type": Number,
            "label": "用户UID",
            "default": 0
        },
		"startTime": {
            "type": Number,
            "label": "用户UID",
            "default": 0
        },
		"endTime": {
            "type": Number,
            "label": "用户UID",
            "default": 0
        },
		"content":{
			"type": Object,
            "label": "具体内容",
            "default": {}
		},
		"create_date":{
			"type": Number,
            "label": "创建时间",
            "default": new Date().getTime()
		},
		"update_date":{
			"type": Number,
            "label": "更新时间",
            "default": new Date().getTime()
		},
		"update_uid":{
			"type": Number,
            "label": "更新者用户UID",
            "default": 0
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
        "name": {
            "label": "员工姓名",
            "type": String,
            "default": ""
        },
        "sex": {
            "label": "性别",
            "type": Number,
            "default": 1
        },
        "birth": {
            "label": "出生日期",
            "type": Number,
            "default": ""
        },
        "political_status": {
            "label": "政治面貌",
            "type": Number,
            "default": 0
        },
        "marital": {
            "label": "婚姻状况",
            "type": Number,
            "default": 1
        },
        "domicile": {
            "label": "户籍所在地",
            "type": Array,
            "default": []
        },
        "domicile_type": {
            "label": "户籍类别",
            "type": Number,
            "default": 1
        },
        "education": {
            "label": "学历",
            "type": Number,
            "default": 5
        },
        "profession": {
            "label": "专业",
            "type": String,
            "default": ""
        },
        "graduate": {
            "label": "毕业院校",
            "type": String,
            "default": ""
        },
        "idcard": {
            "label": "身份证/护照号",
            "type": String,
            "default": ""
        },
        "mobile": {
            "label": "手机",
            "type": String,
            "default": ""
        },
        "phone": {
            "label": "电话",
            "type": String,
            "default": ""
        },
        "house_address": {
            "label": "家庭住址",
            "type": String,
            "default": ""
        },
        "current_address": {
            "label": "现在住址",
            "type": String,
            "default": ""
        },
        "number_code": {
            "label": "工号",
            "type": String,
            "default": ""
        },
        "department": {
            "label": "所属部门",
            "type": Array,
            "default": ""
        },
        "position": {
            "label": "岗位",
            "type": String,
            "default": ""
        },
        "e_title": {
            "label": "职称",
            "type": String,
            "default": ""
        },
        "join_date": {
            "label": "入职日期",
            "type": Number,
            "default": ""
        },
        "regular_date": {
            "label": "转正日期",
            "type": Number,
            "default": ""
        },
        "work_age": {
            "label": "实际工龄",
            "type": Number,
            "default": ""
        },
        "work_age_revise": {
            "label": "工龄修正",
            "type": Number,
            "default": ""
        },
        "annual_age": {
            "label": "年假工龄",
            "type": Number,
            "default": ""
        },
        "e_type": {
            "label": "员工类别",
            "type": Number,
            "default": ""
        },
        "salary_type": {
            "label": "工资类别",
            "type": Number,
            "default": ""
        },
        "security_office": {
            "label": "社保所属",
            "type": Array,
            "default": []
        },
        "e_status": {
            "label": "员工状态",
            "type": Number,
            "default": 1
        },
        "updateDate": {
            "type": Number,
            "default": new Date().getTime(),
            "label": "最后更新时间"
        },
        "disabled": {
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
		"isRead": {
            "label": "是否已阅读",
            "type": "Boolean",
            "default": false
        },
		"checkUid": {
            "type": Number,
            "default": 0,
            "label": "审核人"
        },
		"checkDesc": {
            "type": String,
            "default": "",
            "label": "审核意见"
        },
        "apply": {
            "type": Array,
            "default": [],
            "label": "补卡申请"
        },
        "content": {
            "type": Array,
            "default": "",
            "label": "数据内容"
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
            "label": "消息类型(1:时间钟)"
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
        "emp_id": {
            "label": "录入员用户id",
            "type": Number,
            "default": ""
        },
        "entry_date": {
            "label": "录入日期",
            "type": Number,
            "default": new Date().getTime(),
        },
        "contract_id": {
            "label": "合同号",
            "type": String,
            "default": ""
        },
        "production_code": {
            "label": "生产指令代码",
            "type": String,
            "default": ""
        },
        "project_name": {
            "label": "项目名称",
            "type": String,
            "default": ""
        },
        "used_area": {
            "label": "使用场所",
            "type": String,
            "default": ""
        },
        "application_industry": {
            "label": "应用行业",
            "type": String,
            "default": ""
        },
        "product_name": {
            "label": "产品名称",
            "type": String,
            "default": ""
        },
        "product_characteristic": {
            "label": "产品特性",
            "type": String,
            "default": ""
        },
        "product_specification": {
            "label": "产品规格",
            "type": String,
            "default": ""
        },
        "product_model": {
            "label": "产品型号",
            "type": String,
            "default": ""
        },
        "putinto": {
            "label": "是否投入生产",
            "type": Number,
            "default": 1
        },
        "blueprint_code": {
            "label": "图纸编码",
            "type": String,
            "default": ""
        },
        "blueprint_type": {
            "label": "图纸类型",
            "type": String,
            "default": ""
        },
        "create_date": {
            "label": "图纸创建日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "file_name": {
            "label": "图纸文件名",
            "type": String,
            "default": ""
        },
        "blueprint_designer": {
            "label": "图纸设计人",
            "type": Number,
            "default": ""
        },
        "blueprint_countersigner": {
            "label": "图纸会签人",
            "type": Number,
            "default": 0
        },
        "blueprint_standardized": {
            "label": "图纸标准化人",
            "type": Number,
            "default": 0
        },
        "blueprint_auditor": {
            "label": "图纸审核人",
            "type": Number,
            "default": 0
        },
        "blueprint_department": {
            "label": "图纸归属部门",
            "type": Array,
            "default": []
        },
        "standard_id": {
            "label": "图纸涉及标准编号",
            "type": String,
            "default": ""
        },
        "status": {
            "label": "图纸当前状态",
            "type": Number,
            "default": 1
        },
        "blueprint_version": {
            "label": "图纸版本号",
            "type": String,
            "default": ""
        },
        "safety_grade": {
            "label": "图纸密级",
            "type": Number,
            "default": 1
        }
    },
    /*----------生产调整信息-----------*/
    produceadjust: {
        "id": {
            "type": Number,
            "default": 0
        },
        "pa_operator": {
            "label": "录入员姓名",
            "type": String,
            "default": ""
        },
        "pa_operator_id": {
            "label": "录入员工号",
            "type": String,
            "default": ""
        },
        "pa_operator_t": {
            "label": "录入员UID",
            "type": Number,
            "default": 0
        },
        "pa_entry_date": {
            "label": "录入日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "pa_priority": {
            "label": "调整优先级",
            "type": Number,
            "default": 0
        },
        "pa_title": {
            "label": "调整标题",
            "type": String,
            "default": ""
        },
        "pa_description": {
            "label": "调整描述",
            "type": String,
            "default": ""
        },
        "pa_pic_name": {
            "label": "调整负责人姓名",
            "type": String,
            "default": ""
        },
        "pa_department": {
            "label": "调整所属科室",
            "type": Array,
            "default": []
        },
        "pa_remark": {
            "label": "备注",
            "type": String,
            "default": ""

        }
    },
    /*----------问题反馈信息-----------*/
    problem: {
        "id": {
            "type": Number,
            "default": 0
        },
        "p_operator": {
            "label": "录入员姓名",
            "type": String,
            "default": ""
        },
        "p_operator_id": {
            "label": "录入员工号",
            "type": String,
            "default": ""
        },
        "p_operator_t": {
            "label": "录入员UID",
            "type": Number,
            "default": 0
        },
        "p_entry_date": {
            "label": "录入日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "p_title": {
            "label": "问题标题",
            "type": String,
            "default": ""
        },
        "p_priority": {
            "label": "问题优先级",
            "type": Number,
            "default": 0
        },
        "p_description": {
            "label": "问题描述",
            "type": String,
            "default": ""
        },
        "p_department": {
            "label": "问题所属科室",
            "type": Array,
            "default": []
        },
        "p_pic_name": {
            "label": "问题负责人姓名",
            "type": String,
            "default": ""
        },
        "p_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------分配任务-----------*/
    assigntask: {
        "id": {
            "type": Number,
            "default": 0
        },
        "at_assigner": {
            "label": "分配人姓名",
            "type": String,
            "default": ""
        },
        "at_assigner_id": {
            "label": "分配人工号",
            "type": String,
            "default": ""
        },
        "at_assigner_t": {
            "label": "分配人UID",
            "type": Number,
            "default": 0
        },
        "at_task": {
            "label": "任务名称",
            "type": String,
            "default": ""
        },
        "at_task_id": {
            "label": "任务编号",
            "type": String,
            "default": ""
        },
        "at_priority": {
            "label": "任务优先级",
            "type": Number,
            "default": 0
        },
        "at_description": {
            "label": "任务描述",
            "type": String,
            "default": ""
        },
        "at_department": {
            "label": "任务所属科室",
            "type": Array,
            "default": []
        },
        "at_pic_name": {
            "label": "负责人姓名",
            "type": String,
            "default": ""
        },
        "at_startdate": {
            "label": "起始日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "at_finishdate": {
            "label": "结束日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "at_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------文档信息-----------*/
    docinfo: {
        "id": {
            "type": Number,
            "default": 0
        },
		"filecata_id":{
            "label": "文档目录ID",
            "type": Number,
            "default": 0
		},
        "d_uid": {
            "label": "录入员UID",
            "type": Number,
            "default": ""
        },
        "d_date": {
            "label": "录入日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "d_doctype": {
            "label": "文档分类",
            "type": Number,
            "default": 0
        },
        "d_docname": {
            "label": "文档路径名",
            "type": String,
            "default": ""
        },
		"d_size": {
            "label": "文档大小",
            "type": Number,
            "default": 0
        },
        "d_title": {
            "label": "文档标题",
            "type": String,
            "default": ""
        },
        "d_description": {
            "label": "文档描述",
            "type": String,
            "default": ""
        },
        "d_grade": {
            "label": "文档密级",
            "type": Number,
            "default": 0
        },
        "d_muid": {
            "label": "文档负责人姓名",
            "type": String,
            "default": ""
        },
        "d_department": {
            "label": "文档所属科室",
            "type": Array,
            "default": []
        }
    },
    /*----------生产任务信息-----------*/
    producetask: {
        "id": {
            "type": Number,
            "default": 0
        },
        "pt_creator": {
            "label": "创建者姓名",
            "type": String,
            "default": ""
        },
        "pt_creator_id": {
            "label": "创建者工号",
            "type": String,
            "default": ""
        },
        "pt_creator_t": {
            "label": "创建者UID",
            "type": Number,
            "default": 0
        },
        "pt_task_id": {
            "label": "任务编号",
            "type": String,
            "default": ""
        },
        "pt_title": {
            "label": "任务标题",
            "type": String,
            "default": ""
        },
        "pt_task_type": {
            "label": "任务类别",
            "type": Number,
            "default": 0
        },
        "pt_project": {
            "label": "所属项目",
            "type": String,
            "default": ""
        },
        "pt_blueprint": {
            "label": "所属图纸",
            "type": String,
            "default": ""
        },
        "pt_document": {
            "label": "所属文档",
            "type": String,
            "default": ""
        },
        "pt_description": {
            "label": "任务描述",
            "type": String,
            "default": ""
        },
        "pt_process_node": {
            "label": "工序节点",
            "type": String,
            "default": ""
        },
        "pt_create_time": {
            "label": "任务创建时间",
            "type": Number,
            "default": new Date().getTime()
        },
        "pt_finish_time": {
            "label": "任务完成时间",
            "type": Number,
            "default": new Date().getTime()
        },
        "pt_finish_person": {
            "label": "完成此任务员工姓名",
            "type": String,
            "default": ""
        },
        "pt_department": {
            "label": "任务所属科室",
            "type": Array,
            "default": []
        },
        "pt_pic_name": {
            "label": "任务负责人姓名",
            "type": String,
            "default": ""
        },
        "pt_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------残次废品信息-----------*/
    imperfections: {
        "id": {
            "type": Number,
            "default": 0
        },
        "im_reporter": {
            "label": "报告人姓名",
            "type": String,
            "default": ""
        },
        "im_reporter_id": {
            "label": "报告人工号",
            "type": String,
            "default": ""
        },
        "im_reporter_t": {
            "label": "报告人UID",
            "type": Number,
            "default": 0
        },
        "im_report_date": {
            "label": "报告日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "im_product": {
            "label": "产品名称",
            "type": String,
            "default": ""
        },
        "im_specification": {
            "label": "产品规格",
            "type": String,
            "default": ""
        },
        "im_type": {
            "label": "类别",
            "type": Number,
            "default": 0
        },
        "im_reason": {
            "label": "原因",
            "type": String,
            "default": ""
        },
        "im_process_node": {
            "label": "生产过程节点",
            "type": String,
            "default": ""
        },
        "im_description": {
            "label": "描述",
            "type": String,
            "default": ""
        },
        "im_area": {
            "label": "科室/车间",
            "type": Array,
            "default": []
        },
        "im_cost": {
            "label": "成本",
            "type": String,
            "default": ""
        },
        "im_pic_name": {
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
        "im_measure": {
            "label": "处理措施",
            "type": String,
            "default": ""
        },
        "im_result": {
            "label": "处理结果",
            "type": String,
            "default": ""
        },
        "im_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------设计图纸与生产不匹配信息-----------*/
    mismatch: {
        "id": {
            "type": Number,
            "default": 0
        },
        "mi_reporter": {
            "label": "报告人姓名",
            "type": String,
            "default": ""
        },
        "mi_reporter_id": {
            "label": "报告人工号",
            "type": String,
            "default": ""
        },
        "mi_reporter_t": {
            "label": "报告人UID",
            "type": Number,
            "default": 0
        },
        "mi_report_date": {
            "label": "报告日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "mi_product": {
            "label": "产品名称",
            "type": String,
            "default": ""
        },
        "mi_specification": {
            "label": "产品规格",
            "type": String,
            "default": ""
        },
        "mi_project": {
            "label": "项目名称",
            "type": String,
            "default": ""
        },
        "mi_blueprint_id": {
            "label": "图纸编号",
            "type": String,
            "default": ""
        },
        "mi_reason": {
            "label": "原因",
            "type": String,
            "default": ""
        },
        "mi_process_node": {
            "label": "生产过程节点",
            "type": String,
            "default": ""
        },
        "mi_description": {
            "label": "描述",
            "type": String,
            "default": ""
        },
        "mi_area": {
            "label": "科室/车间",
            "type": Array,
            "default": []
        },
        "mi_pic_name": {
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
        "mi_measure": {
            "label": "处理措施",
            "type": String,
            "default": ""
        },
        "mi_result": {
            "label": "处理结果",
            "type": String,
            "default": ""
        },
        "mi_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------生产问题信息-----------*/
    produceproblem: {
        "id": {
            "type": Number,
            "default": 0
        },
        "pp_reporter": {
            "label": "报告人姓名",
            "type": String,
            "default": ""
        },
        "pp_reporter_id": {
            "label": "报告人工号",
            "type": String,
            "default": ""
        },
        "pp_reporter_t": {
            "label": "报告人UID",
            "type": Number,
            "default": 0
        },
        "pp_report_date": {
            "label": "报告日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "pp_product": {
            "label": "产品名称",
            "type": String,
            "default": ""
        },
        "pp_specification": {
            "label": "产品规格",
            "type": String,
            "default": ""
        },
        "pp_project": {
            "label": "项目名称",
            "type": String,
            "default": ""
        },
        "pp_description": {
            "label": "问题描述",
            "type": String,
            "default": ""
        },
        "pp_process_node": {
            "label": "生产过程节点",
            "type": String,
            "default": ""
        },
        "pp_area": {
            "label": "科室/车间",
            "type": Array,
            "default": []
        },
        "pp_pic_name": {
            "name": "pp_pic_name",
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
        "pp_measure": {
            "label": "处理措施",
            "type": String,
            "default": ""
        },
        "pp_result": {
            "label": "处理结果",
            "type": String,
            "default": ""
        },
        "pp_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------材料准备不充分问题信息-----------*/
    materialpreparation: {
        "id": {
            "type": Number,
            "default": 0
        },
        "mpi_reporter": {
            "label": "报告人姓名",
            "type": String,
            "default": ""
        },
        "mpi_reporter_id": {
            "label": "报告人工号",
            "type": String,
            "default": ""
        },
        "mpi_reporter_t": {
            "label": "报告人UID",
            "type": Number,
            "default": 0
        },
        "mpi_report_date": {
            "label": "报告日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "mpi_product": {
            "label": "产品名称",
            "type": String,
            "default": ""
        },
        "mpi_specification": {
            "label": "产品规格",
            "type": String,
            "default": ""
        },
        "mpi_project": {
            "label": "项目名称",
            "type": String,
            "default": ""
        },
        "mpi_blueprint_id": {
            "label": "图纸编号",
            "type": String,
            "default": ""
        },
        "mpi_reason": {
            "label": "问题原因",
            "type": String,
            "default": ""
        },
        "mpi_process_node": {
            "label": "生产过程节点",
            "type": String,
            "default": ""
        },
        "mpi_description": {
            "label": "问题描述",
            "type": String,
            "default": ""
        },
        "mpi_area": {
            "label": "科室/车间",
            "type": Array,
            "default": []
        },
        "mpi_pic_name": {
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
        "mpi_measure": {
            "label": "处理措施",
            "type": String,
            "default": ""
        },
        "mpi_result": {
            "label": "处理结果",
            "type": String,
            "default": ""
        },
        "mpi_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------建议与改进-----------*/
    improvement: {
        "id": {
            "type": Number,
            "default": 0
        },
        "i_reporter": {
            "label": "报告人姓名",
            "type": String,
            "default": ""
        },
        "i_reporter_id": {
            "label": "报告人工号",
            "type": String,
            "default": ""
        },
        "i_reporter_t": {
            "label": "报告人UID",
            "type": Number,
            "default": 0
        },
        "i_report_date": {
            "name": "i_report_date",
            "label": "报告日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "i_product": {
            "label": "产品名称",
            "type": String,
            "default": ""
        },
        "i_specification": {
            "label": "产品规格",
            "type": String,
            "default": ""
        },
        "i_project": {
            "label": "项目名称",
            "type": String,
            "default": ""
        },
        "i_blueprint_id": {
            "label": "图纸编号",
            "type": String,
            "default": ""
        },
        "i_description": {
            "label": "建议描述",
            "type": String,
            "default": ""
        },
        "i_process_node": {
            "label": "生产过程节点",
            "type": String,
            "default": ""
        },
        "i_area": {
            "label": "科室/车间",
            "type": Array,
            "default": []
        },
        "i_pic_name": {
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
        "i_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------产品生产过程数据信息-----------*/
    produceprocess: {
        "id": {
            "type": Number,
            "default": 0
        },
        "pproc_process_node": {
            "label": "生产过程节点",
            "type": String,
            "default": ""
        },
        "pproc_project": {
            "label": "项目名称",
            "type": String,
            "default": ""
        },
        "pproc_product": {
            "label": "产品名称",
            "type": String,
            "default": ""
        },
        "pproc_specification": {
            "label": "产品规格",
            "type": String,
            "default": ""
        },
        "pproc_product_id": {
            "label": "产品编号",
            "type": String,
            "default": ""
        },
        "pproc_data": {
            "label": "产品数据",
            "type": String,
            "default": ""
        },
        "pproc_area": {
            "label": "科室/车间",
            "type": Array,
            "default": []
        },
        "pproc_reporter": {
            "label": "报告人姓名",
            "type": String,
            "default": ""
        },
        "pproc_reporter_id": {
            "label": "报告人工号",
            "type": String,
            "default": ""
        },
        "pproc_reporter_t": {
            "label": "报告人UID",
            "type": Number,
            "default": 0
        },
        "pproc_report_date": {
            "label": "报告日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "pproc_inspector": {
            "label": "检查员",
            "type": String,
            "default": ""
        },
        "pproc_pic_name": {
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
        "pproc_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------违规报告信息-----------*/
    violation: {
        "id": {
            "type": Number,
            "default": 0
        },
        "v_reporter": {
            "label": "报告人姓名",
            "type": String,
            "default": ""
        },
        "v_reporter_id": {
            "label": "报告人工号",
            "type": String,
            "default": ""
        },
        "v_reporter_t": {
            "label": "报告人UID",
            "type": Number,
            "default": 0
        },
        "v_report_date": {
            "label": "报告日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "v_description": {
            "label": "事件描述",
            "type": String,
            "default": ""
        },
        "v_date": {
            "label": "事件发生时间",
            "type": Number,
            "default": new Date().getTime()
        },
        "v_pic": {
            "label": "事件发生责任人",
            "type": String,
            "default": ""
        },
        "v_reason": {
            "label": "事故发生原因",
            "type": String,
            "default": ""
        },
        "v_process_node": {
            "label": "生产过程节点",
            "type": String,
            "default": ""
        },
        "v_area": {
            "label": "科室/车间",
            "type": Array,
            "default": []
        },
        "v_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------生产线改进意见-----------*/
    productimprovement: {
        "id": {
            "type": Number,
            "default": 0
        },
        "pi_reporter": {
            "label": "报告人姓名",
            "type": String,
            "default": ""
        },
        "pi_reporter_id": {
            "label": "报告人工号",
            "type": String,
            "default": ""
        },
        "pi_reporter_t": {
            "label": "报告人UID",
            "type": Number,
            "default": 0
        },
        "pi_report_date": {
            "label": "报告日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "pi_reason": {
            "label": "改进原因",
            "type": String,
            "default": ""
        },
        "pi_description": {
            "label": "事件描述",
            "type": String,
            "default": ""
        },
        "pi_process_node": {
            "label": "生产过程节点",
            "type": String,
            "default": ""
        },
        "pi_product": {
            "label": "产品名称",
            "type": String,
            "default": ""
        },
        "pi_specification": {
            "label": "产品规格",
            "type": String,
            "default": ""
        },
        "pi_project": {
            "label": "项目名称",
            "type": String,
            "default": ""
        },
        "pi_blueprint_id": {
            "name": "pi_blueprint_id",
            "label": "图纸编号",
            "type": String,
            "default": ""
        },
        "pi_area": {
            "name": "pi_product_area",
            "label": "科室/车间",
            "type": Array,
            "default": []
        },
        "pi_pic_name": {
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
        "pi_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------生产准备-----------*/
    produceprepare: {
        "id": {
            "type": Number,
            "default": 0
        },
        "ppre_task_id": {
            "label": "任务工号",
            "type": String,
            "default": ""
        },
        "ppre_equipment": {
            "label": "生产所需设备",
            "type": String,
            "default": ""
        },
        "ppre_tool": {
            "label": "生产所需工具",
            "type": String,
            "default": ""
        },
        "ppre_blueprint": {
            "label": "生产所需图纸",
            "type": String,
            "default": ""
        },
        "ppre_document": {
            "label": "生产所需文档",
            "type": String,
            "default": ""
        },
        "ppre_parameter": {
            "label": "工艺参数",
            "type": String,
            "default": ""
        },
        "ppre_nc": {
            "label": "NC程序",
            "type": String,
            "default": ""
        },
        "ppre_order": {
            "label": "生产指令",
            "type": String,
            "default": ""
        },
        "ppre_attention": {
            "label": "生产注意事项",
            "type": String,
            "default": ""
        },
        "ppre_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------公告-----------*/
    annoucement: {
        "id": {
            "type": Number,
            "default": 0
        },
        "a_creator": {
            "label": "编写人姓名",
            "type": String,
            "default": ""
        },
        "a_creator_id": {
            "label": "编写人工号",
            "type": String,
            "default": ""
        },
        "a_creator_t": {
            "label": "编写人UID",
            "type": Number,
            "default": 0
        },
        "a_create_date": {
            "label": "编写日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "a_publication_date": {
            "label": "发布日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "a_title": {
            "label": "公告标题",
            "type": String,
            "default": ""
        },
        "a_content": {
            "label": "公告内容",
            "type": String,
            "default": ""
        },
        "a_reviewer": {
            "label": "审核人",
            "type": String,
            "default": ""
        },
        "a_reviewer_id": {
            "label": "审核人工号",
            "type": String,
            "default": ""
        },
        "a_reviewer_t": {
            "label": "审核人UID",
            "type": Number,
            "default": 0
        },
        "a_review_date": {
            "label": "审核日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "a_effective_date": {
            "label": "有效日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "a_status": {
            "label": "公告状态",
            "type": Number,
            "default": 0
        },
        "a_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------车间通知-----------*/
    proareanotice: {
        "id": {
            "type": Number,
            "default": 0
        },
        "pan_creator": {
            "label": "编写人姓名",
            "type": String,
            "default": ""
        },
        "pan_creator_id": {
            "label": "编写人工号",
            "type": String,
            "default": ""
        },
        "pan_creator_t": {
            "label": "编写人UID",
            "type": Number,
            "default": 0
        },
        "pan_create_date": {
            "label": "编写日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "pan_publication_date": {
            "label": "发布日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "pan_title": {
            "label": "通知标题",
            "type": String,
            "default": ""
        },
        "pan_content": {
            "label": "通知内容",
            "type": String,
            "default": ""
        },
        "pan_reviewer": {
            "label": "审核人",
            "type": String,
            "default": ""
        },
        "pan_reviewer_id": {
            "label": "审核人工号",
            "type": String,
            "default": ""
        },
        "pan_reviewer_t": {
            "label": "审核人UID",
            "type": Number,
            "default": 0
        },
        "pan_review_date": {
            "label": "审核日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "pan_effective_date": {
            "label": "有效日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "pan_status": {
            "label": "通知状态",
            "type": Number,
            "default": 0
        },
        "pan_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------小组通知-----------*/
    teamnotice: {
        "id": {
            "type": Number,
            "default": 0
        },
        "tn_creator": {
            "label": "编写人姓名",
            "type": String,
            "default": ""
        },
        "tn_creator_id": {
            "label": "编写人工号",
            "type": String,
            "default": ""
        },
        "tn_creator_t": {
            "label": "编写人UID",
            "type": Number,
            "default": 0
        },
        "tn_create_date": {
            "label": "编写日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "tn_publication_date": {
            "label": "发布日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "tn_title": {
            "label": "通知标题",
            "type": String,
            "default": ""
        },
        "tn_content": {
            "label": "通知内容",
            "type": String,
            "default": ""
        },
        "tn_reviewer": {
            "label": "审核人",
            "type": String,
            "default": ""
        },
        "tn_reviewer_id": {
            "label": "审核人工号",
            "type": String,
            "default": ""
        },
        "tn_reviewer_t": {
            "label": "审核人UID",
            "type": Number,
            "default": 0
        },
        "tn_review_date": {
            "label": "审核日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "tn_effective_date": {
            "label": "有效日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "tn_status": {
            "label": "通知状态",
            "type": Number,
            "default": 0
        },
        "tn_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------待办事项-----------*/
    schedule: {
        "id": {
            "type": Number,
            "default": 0
        },
        "s_schedule": {
            "label": "待办事项名称",
            "type": String,
            "default": ""
        },
        "s_schedule_id": {
            "label": "待办事项编号",
            "type": String,
            "default": ""
        },
        "s_create_date": {
            "label": "创建时间",
            "type": Number,
            "default": new Date().getTime()
        },
        "s_creator": {
            "label": "创建人姓名",
            "type": String,
            "default": ""
        },
        "s_creator_id": {
            "label": "创建人工号",
            "type": String,
            "default": ""
        },
        "s_creator_t": {
            "label": "创建人UID",
            "type": Number,
            "default": 0
        },
        "s_description": {
            "label": "事项描述",
            "type": String,
            "default": ""
        },
        "s_start_date": {
            "label": "开始日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "s_finish_date": {
            "label": "结束日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "s_status": {
            "label": "当前状态",
            "type": Number,
            "default": 0
        },
        "s_executor": {
            "label": "执行人姓名",
            "type": String,
            "default": ""
        },
        "s_pic_name": {
            "label": "主管姓名",
            "type": String,
            "default": ""
        },
        "s_number": {
            "label": "工单号",
            "type": String,
            "default": ""
        },
        "s_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------收件箱-----------*/
    inbodx: {
        "id": {
            "type": Number,
            "default": 0
        },
        "in_sender_id": {
            "label": "发送人标识",
            "type": String,
            "default": ""
        },
        "in_sender": {
            "label": "发送人姓名",
            "type": String,
            "default": ""
        },
        "in_receiver_id": {
            "label": "接收人标识",
            "type": String,
            "default": ""
        },
        "in_receiver": {
            "label": "接收人姓名",
            "type": String,
            "default": ""
        },
        "in_type": {
            "label": "类型",
            "type": Number,
            "default": 0
        },
        "in_priority": {
            "label": "优先级",
            "type": Number,
            "default": 0
        },
        "in_flow_id": {
            "label": "流程编号",
            "type": String,
            "default": ""
        },
        "in_state": {
            "label": "当前状态",
            "type": Number,
            "default": 0
        },
        "in_doc_id": {
            "label": "记录号",
            "type": String,
            "default": ""
        },
        "in_tablename": {
            "label": "库表名",
            "type": String,
            "default": ""
        },
        "in_dbname": {
            "label": "DB名",
            "type": String,
            "default": ""
        },
        "in_send_datetime": {
            "label": "发送日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "in_description": {
            "label": "描述",
            "type": String,
            "default": ""
        },
        "in_timer": {
            "label": "定时器",
            "type": Number,
            "default": new Date().getTime()
        },
        "in_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------工作流程-----------*/
    workflow: {
        "id": {
            "type": Number,
            "default": 0
        },
        "w_name": {
            "label": "名称",
            "type": String,
            "default": ""
        },
        "w_desc": {
            "label": "描述",
            "type": String,
            "default": ""
        },
        "w_tags": {
            "label": "标签",
            "type": String,
            "default": ""
        },
        "w_create_time": {
            "label": "创建日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "w_creator": {
            "label": "创建人姓名",
            "type": String,
            "default": ""
        },
        "w_creator_id": {
            "label": "创建人标识",
            "type": String,
            "default": ""
        },
        "w_creator_t": {
            "label": "创建人UID",
            "type": Number,
            "default": 0
        },
        "w_auth_name": {
            "label": "授权人姓名",
            "type": String,
            "default": ""
        },
        "w_auth_id": {
            "label": "授权人标识",
            "type": String,
            "default": ""
        },
        "w_auth_t": {
            "label": "授权人UID",
            "type": Number,
            "default": 0
        },
        "w_department": {
            "label": "所属科室",
            "type": Array,
            "default": []
        },
        "w_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------工作流程状态-----------*/
    workflownode: {
        "id": {
            "type": Number,
            "default": 0
        },
        "wn_flow": {
            "label": "流程名称",
            "type": String,
            "default": ""
        },
        "wn_flow_id": {
            "label": "流程标识",
            "type": String,
            "default": ""
        },
        "wn_status_name": {
            "label": "状态名称",
            "type": String,
            "default": ""
        },
        "wn_create_time": {
            "label": "创建日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "wn_creator": {
            "label": "创建人姓名",
            "type": String,
            "default": ""
        },
        "wn_creator_id": {
            "label": "创建人标识",
            "type": String,
            "default": ""
        },
        "wn_creator_t": {
            "label": "创建人UID",
            "type": Number,
            "default": 0
        },
        "wn_auth_name": {
            "label": "授权人姓名",
            "type": String,
            "default": ""
        },
        "wn_auth_id": {
            "label": "授权人标识",
            "type": String,
            "default": ""
        },
        "wn_auth_t": {
            "label": "授权人UID",
            "type": Number,
            "default": 0
        },
        "wn_department": {
            "label": "所属科室",
            "type": Array,
            "default": []
        },
        "wn_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    },
    /*----------工作流程状态规则-----------*/
    workflowedge: {
        "id": {
            "type": Number,
            "default": 0
        },
        "we_flow": {
            "label": "流程名称",
            "type": String,
            "default": ""
        },
        "we_flow_id": {
            "label": "流程标识",
            "type": String,
            "default": ""
        },
        "we_edge_name": {
            "label": "规则名称",
            "type": String,
            "default": ""
        },
        "we_source_state": {
            "label": "起始状态",
            "type": Number,
            "default": 0
        },
        "we_dest_state": {
            "label": "目标状态",
            "type": Number,
            "default": 0
        },
        "we_event": {
            "label": "事件",
            "type": String,
            "default": ""
        },
        "we_desc": {
            "label": "描述",
            "type": String,
            "default": ""
        },
        "we_create_time": {
            "label": "创建日期",
            "type": Number,
            "default": new Date().getTime()
        },
        "we_creator": {
            "label": "创建人姓名",
            "type": String,
            "default": ""
        },
        "we_creator_id": {
            "label": "创建人标识",
            "type": String,
            "default": ""
        },
        "we_creator_t": {
            "label": "创建人UID",
            "type": Number,
            "default": 0
        },
        "we_auth_name": {
            "label": "授权人姓名",
            "type": String,
            "default": ""
        },
        "we_auth_id": {
            "label": "授权人标识",
            "type": String,
            "default": ""
        },
        "we_auth_t": {
            "label": "授权人UID",
            "type": Number,
            "default": 0
        },
        "we_department": {
            "label": "所属科室",
            "type": Array,
            "default": []
        },
        "we_remark": {
            "label": "备注",
            "type": String,
            "default": ""
        }
    }
}