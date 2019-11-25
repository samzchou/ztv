const optionSet = require("./options");
//import optionSet from "./options";
module.exports = {
    //export default {
    /*--------------ID自增计数器--------------*/
    "counters": {
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
    /*----------1.1员工信息表（employee）-----------*/
    "employee":{
        "id": {
            "name": "id",
            "hide":true,
            "type": "Number",
            "default": 0
        },
        "e_name":{
            "name": "e_name",
            "label": "员工姓名"
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_sex":{
            "name": "e_sex",
            "label": "性别"
            "type": "Number",
            "required": true,
            "component": "sam-radio",
            "options": [{
                "label": "男",
                "id": 1
            }, {
                "label": "女",
                "id": 2
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
            "valueFormat":"yyyy-MM-dd",
            "default": ""
        },
        "e_political_status": {
            "name": "e_age",
            "label": "政治面貌",
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "群众",
                    "id": 1
                },
                {
                    "label": "中共团员",
                    "id": 2
                },
                {
                    "label": "中共党员",
                    "id": 3
                },
                {
                    "label": "其他党派成员",
                    "id": 4
                }
            ],
            "default": 0
        },
        "e_marital_status":{
            "name": "e_marital_status",
            "label": "婚姻状况"
            "type": "Number",
            "required": true,
            "component": "sam-radio",
            "options": [{
                    "label": "未婚",
                    "id": 1
                },
                {
                    "label": "已婚",
                    "id": 2
                },
                {
                    "label": "离异",
                    "id": 3
                }
            ],
            "default": 1
        },
        "e_domicile_type":{
            "name": "e_marital_status",
            "label": "婚姻状况"
            "type": "Number",
            "required": true,
            "component": "sam-radio",
            "options": [{
                "label": "非农",
                "id": 1
            }, {
                "label": "农业",
                "id": 2
            }],
            "default": 1
        },
        "e_education": {
            "name": "e_education",
            "label": "学历"
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "小学",
                    "id": 1
                },
                {
                    "label": "初中",
                    "id": 2
                },
                {
                    "label": "高中职",
                    "id": 3
                },
                {
                    "label": "大专",
                    "id": 4
                },
                {
                    "label": "本科",
                    "id": 5
                },
                {
                    "label": "研究生/硕士",
                    "id": 6
                },
                {
                    "label": "博士",
                    "id": 7
                }
            ],
            "default": 5
        },
        "e_profession":{
            "name": "e_profession",
            "label": "专业"
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_graduate_institution":{
            "name": "e_graduate_institution",
            "label": "毕业院校"
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_idcard_number":{
            "name": "e_idcard_number",
            "label": "身份证/护照号"
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_cellphone_number":{
            "name": "e_cellphone_number",
            "label": "手机"
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_phone_number":{
            "name": "e_phone_number",
            "label": "电话"
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_house_address":{
            "name": "e_house_address",
            "label": "家庭住址"
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_current_address":{
            "name": "e_current_address",
            "label": "现在住址"
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_employee_number":{
            "name": "e_employee_number",
            "label": "工号"
            "type": "String",
            "required": true,
            "component": "sam-randno",
            "cptype": "text",
            "default": ""
        },
        "e_superior_department":{
            "name": "e_superior_department",
            "label": "上级部门"
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl":"department",
            "level":1,
            "event":["e_department"],
            "default": 0
        },
        "e_department":{
            "name": "e_department",
            "label": "所属部门"
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl":"department",
            "level":2,
            "event":["e_position"],
            "default": 0
        },
        "e_position":{
            "name": "e_position",
            "label": "岗位"
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "optionsUrl":"department",
            "level":3,
            "default": 0
        },
        "e_title":{
            "name": "e_title",
            "label": "职称"
            "type": "String",
            "required": true,
            "component": "sam-input",
            "cptype": "text",
            "default": ""
        },
        "e_employment_date":{
            "name": "e_employment_date",
            "label": "入职日期"
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat":"yyyy-MM-dd",
            "default": ""
        },
        "e_regular_date": {
            "name": "e_regular_date",
            "label": "转正日期",
            "type": "Number",
            "required": true,
            "component": "sam-date",
            "cptype": "date",
            "valueFormat":"yyyy-MM-dd",
            "default": ""
        },
        "e_work_age":{
            "name": "e_work_age",
            "label": "实际工龄",
            "type": "Number",
            "required": true,
            "component": "sam-number",
            "default": ""
        },
        "e_work_age_revise":{
            "name": "e_work_age_revise",
            "label": "工龄修正",
            "type": "Number",
            "required": true,
            "component": "sam-number",
            "default": ""
        },
        "e_ annual_leave_service_age":{
            "name": "e_ annual_leave_service_age",
            "label": "年假工龄",
            "type": "Number",
            "required": true,
            "component": "sam-number",
            "default": ""
        },
        "e_employee_type":{
            "name": "e_employee_type",
            "label": "员工类别"
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "临时工",
                    "id": 1
                },
                {
                    "label": "试用期",
                    "id": 2
                },
                {
                    "label": "合同工",
                    "id": 3
                },
                {
                    "label": "已退休",
                    "id": 4
                },
                {
                    "label": "外援",
                    "id": 5
                }
            ],
            "default": 2
        },
        "e_salary_type":{
            "name": "e_salary_type",
            "label": "工资类别"
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "P2级",
                    "id": 1
                },
                {
                    "label": "P4级",
                    "id": 2
                },
                {
                    "label": "P6级",
                    "id": 3
                },
                {
                    "label": "P7级",
                    "id": 4
                },
                {
                    "label": "P8级",
                    "id": 5
                }
            ],
            "default": 2
        },
        "e_social_security_office":{
            "name": "e_social_security_office",
            "label": "社保所属"
            "type": "Number",
            "required": true,
            "component": "sam-cascader",
            "options": optionSet.citys,
            "default": 2
        },
        "e_employee_status":{
            "name": "e_employee_status",
            "label": "员工状态"
            "type": "Number",
            "required": true,
            "component": "sam-select",
            "options": [{
                    "label": "在职",
                    "id": 1
                },
                {
                    "label": "已离职",
                    "id": 2
                },
                {
                    "label": "退休",
                    "id": 3
                }
            ],
            "default": 1
        }
    },

    /*----------时间钟数据-----------*/
    "timeBlock": {
        "id": {
            "name": "id",
            "type": "Number",
            "default": 0
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

    /*----------用户数据-----------*/
    user: {
        id: {
            "name": "id",
            "type": "Number",
            "default": 0
        },
        org: {
            "name": "org",
            "type": "Array",
            "component": "sam-cascader",
            "default": [],
            "label": "所属部门"
        },
        username: {
            "name": "username",
            "type": "String",
            "component": "sam-input",
            "cptype": "text",
            "required": true,
            "default": "",
            "label": "用户名"
        },
        password: {
            "name": "password",
            "type": "String",
            "component": "sam-input",
            "cptype": "password",
            "required": true,
            "default": "123456",
            "label": "密码"
        },
        name: {
            "name": "name",
            "type": "String",
            "component": "sam-input",
            "cptype": "text",
            "required": true,
            "default": "",
            "label": "姓名"
        },
        sex: {
            "name": "sex",
            "type": "Number",
            "component": "sam-radio",
            "options": [{
                "label": "男",
                "id": 1
            }, {
                "label": "女",
                "id": 2
            }],
            "default": 1,
            "label": "性别"
        },
        brithday: {
            "name": "brithday",
            "type": "Number",
            "component": "sam-date-picker",
            "cptype": "date",
            "required": true,
            "default": new Date().getTime(),
            "label": "出生日期"
        },
        native: {
            "name": "native",
            "type": "Array",
            "component": "sam-city-picker",
            "options": optionSet.citys,
            "required": true,
            "default": [],
            "label": "籍贯"
        },
        residenceAdress: {
            "name": "residenceAdress",
            "type": "String",
            "component": "sam-input",
            "cptype": "text",
            "required": true,
            "default": "",
            "label": "户籍地址"
        },
        residenceNature: {
            "name": "residenceNature",
            "type": "Number",
            "component": "sam-radio",
            "options": [{
                "label": "非农",
                "id": 1
            }, {
                "label": "农业",
                "id": 2
            }],
            "required": true,
            "default": 1,
            "label": "户口性质"
        },
        nation: {
            "name": "nation",
            "type": "Number",
            "component": "sam-select",
            "options": optionSet.nation,
            "required": true,
            "default": 0,
            "label": "民族"
        },
        highEducation: {
            "name": "highEducation",
            "type": "Number",
            "component": "sam-select",
            "options": [{
                    "label": "小学",
                    "id": 1
                },
                {
                    "label": "初中",
                    "id": 2
                },
                {
                    "label": "高中职",
                    "id": 3
                },
                {
                    "label": "大专",
                    "id": 4
                },
                {
                    "label": "本科",
                    "id": 4
                },
                {
                    "label": "研究生/硕士",
                    "id": 5
                },
                {
                    "label": "博士",
                    "id": 6
                }
            ],
            "required": true,
            "default": 0,
            "label": "最高学历"
        },
        highDegree: {
            "name": "highDegree",
            "type": "Number",
            "component": "sam-select",
            "options": [{
                    "label": "学士",
                    "id": 1
                },
                {
                    "label": "硕士",
                    "id": 2
                },
                {
                    "label": "博士",
                    "id": 3
                }
            ],
            "default": 0,
            "label": "最高学位"
        },
        techPost: {
            "name": "techPost",
            "type": "String",
            "component": "sam-input",
            "cptype": "text",
            "default": "",
            "label": "专业技术职务"
        },
        techQua: {
            "name": "techQua",
            "type": "String",
            "component": "sam-input",
            "cptype": "text",
            "default": "",
            "label": "专业技术资格"
        },
        health: {
            "name": "health",
            "type": "Number",
            "component": "sam-select",
            "options": [{
                    "label": "较差",
                    "id": 1
                },
                {
                    "label": "一般",
                    "id": 2
                },
                {
                    "label": "良好",
                    "id": 3
                }
            ],
            "required": true,
            "default": 0,
            "label": "健康状况"
        },
        mobile: {
            "name": "mobile",
            "type": "String",
            "component": "sam-input",
            "cptype": "text",
            "required": true,
            "default": "",
            "label": "联系电话"
        },
        mail: {
            "name": "mail",
            "type": "String",
            "component": "sam-input",
            "cptype": "mail",
            "required": true,
            "default": "",
            "label": "邮箱"
        },
        phone: {
            "name": "phone",
            "type": "String",
            "component": "sam-input",
            "cptype": "text",
            "required": true,
            "default": "",
            "label": "办公电话"
        },
        address: {
            "name": "address",
            "type": "String",
            "component": "sam-input",
            "cptype": "text",
            "required": true,
            "default": "",
            "label": "家庭住址"
        },
        archivesAdress: {
            "name": "archivesAdress",
            "type": "Array",
            "component": "vue-city-picker",
            "options": optionSet.citys,
            "required": true,
            "default": [],
            "label": "档案所在地"
        },
        marriage: {
            "name": "marriage",
            "type": "Number",
            "component": "sam-select",
            "options": [{
                    "label": "未婚",
                    "id": 1
                },
                {
                    "label": "已婚",
                    "id": 2
                },
                {
                    "label": "离异",
                    "id": 3
                }
            ],
            "required": true,
            "default": 0,
            "label": "婚姻状况"
        },
        politics: {
            "name": "politics",
            "type": "Number",
            "component": "sam-select",
            "options": [{
                    "label": "群众",
                    "id": 1
                },
                {
                    "label": "中共团员",
                    "id": 2
                },
                {
                    "label": "中共党员",
                    "id": 3
                },
                {
                    "label": "其他党派成员",
                    "id": 4
                }
            ],
            "eventName": ["politicsDate", "politicsAdress", "politicsChange"],
            "required": true,
            "default": 0,
            "label": "政治面貌"
        },
        politicsDate: {
            "name": "politicsDate",
            "type": "Number",
            "component": "sam-date-picker",
            "cptype": "date",
            "required": true,
            "event": true,
            "default": 0,
            "label": "入党（团）日期"
        },
        politicsAdress: {
            "name": "politicsAdress",
            "type": "Array",
            "component": "vue-city-picker",
            "options": optionSet.citys,
            "required": true,
            "event": true,
            "default": [],
            "label": "党组织关系所在地"
        },
        politicsChange: {
            "name": "politicsChange",
            "type": "Number",
            "component": "sam-radio",
            "options": [{
                "label": "是",
                "id": 1
            }, {
                "label": "否",
                "id": 2
            }],
            "default": 1,
            "label": "是否打算将党组织关系转到公司"
        },
        token: {
            "name": "token",
            "type": "String",
            "default": "",
            "hide": true,
            "label": "后台验证码"
        },
        content: {
            "name": "content",
            "type": "String",
            "component": "sam-input",
            "cptype": "text-area",
            "default": "",
            "label": "备注说明"
        },
        createDate: {
            "name": "createDate",
            "type": "Number",
            "default": new Date().getTime(),
            "label": "创建时间"
        },
        updateDate: {
            "name": "updateDate",
            "type": "Number",
            "default": new Date().getTime(),
            "label": "最后更新时间"
        }
    },
    
    /*----------表单配置数据-----------*/
    formList:{
        "id": {
            "name": "id",
            "type": "Number",
            "default": 0
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

}
