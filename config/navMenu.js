/* eslint-disable */
module.exports = {
    "menuList": [
        {
            "label": "个人信息管理",
            "icon": "el-icon-user",
			"name":"userinfo",
            "children": [
                { "label": "用户管理", "icon": "el-icon-document-copy", "path": "/userinfo/list", "name":"list", },
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/userinfo" },
            ]
        },
        {
            "label": "工作管理",
            "icon": "el-icon-time",
			"name":"work",
            "children": [
				{ "label": "时间钟管理", "icon": "el-icon-document-copy", "path": "/work/time", "name":"time", },
                { "label": "待办事项", "icon": "el-icon-document-copy", "path": "/work/todo" },
                { "label": "工作统计", "icon": "el-icon-document-copy", "path": "/work/calc" }
            ]
        },
        {
            "label": "行政中心",
            "icon": "el-icon-suitcase",
            "children": [
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/administration" },
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/administration" }
            ]
        },
        {
            "label": "信息中心",
            "icon": "el-icon-paperclip",
            "children": [
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/infomation" },
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/infomation" }
            ]
        },
        {
            "label": "交互中心",
            "icon": "el-icon-magic-stick",
            "children": [
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/methods" },
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/methods" }
            ]
        },
        {
            "label": "知识中心",
            "icon": "el-icon-connection",
            "children": [
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/learns" },
                { "label": "菜单一", "icon": "el-icon-document-copy", "path": "/learns" }
            ]
        },
        {
            "label": "系统管理",
            "icon": "el-icon-set-up",
            "children": [
                { "label": "机构部门", "icon": "el-icon-document-copy", "path": "/systems/org" },
                { "label": "职位职级", "icon": "el-icon-document-copy", "path": "/systems/dept" },
                { "label": "操作权限", "icon": "el-icon-document-copy", "path": "/systems/role" }
            ]
        }
    ]
}
