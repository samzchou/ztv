/* eslint-disable */
export default {
    "menuList": [{
            "label": "数据管理",
            "icon": "el-icon-coin",
            "name": "data",
            "children": [{
                    "label": "数据表",
                    "icon": "el-icon-document-copy",
                    "path": "/admin/data/collections",
                    "name": "collections"
                },
                {
                    "label": "元数据",
                    "icon": "el-icon-document-copy",
                    "path": "/admin/data/meta",
                    "name": "meta"
                },
                {
                    "label": "休假日数据",
                    "icon": "el-icon-document-copy",
                    "path": "/admin/holiday",
                    "name": "holiday"
                }
            ]
        },
        {
            "label": "表单引擎",
            "icon": "el-icon-guide",
            "name": "form",
            "children": [{
                    "label": "表单列表",
                    "icon": "el-icon-document-copy",
                    "path": "/admin/forms/list",
                    "name": "list"
                },
                {
                    "label": "新建表单",
                    "icon": "el-icon-document-copy",
                    "path": "/admin/forms/addNew",
                    "name": "addNew"
                }
            ]
        },
        {
            "label": "页面引擎",
            "icon": "el-icon-monitor",
            "children": [{
                    "label": "页面列表",
                    "icon": "el-icon-document-copy",
                    "path": "/admin/pages/list",
                    "name": "list"
                },
                {
                    "label": "新建页面",
                    "icon": "el-icon-document-copy",
                    "path": "/admin/pages/addNew",
                    "name": "addNew"
                }
            ]
        },
        {
            "label": "系统管理",
            "icon": "el-icon-set-up",
            "children": [{
                    "label": "组织机构",
                    "icon": "el-icon-document-copy",
                    "path": "/admin/dept/orgStruct"
                },
                {
                    "label": "菜单及服务",
                    "icon": "el-icon-document-copy",
                    "path": "/admin/service"
                },
                {
                    "label": "角色/权限",
                    "icon": "el-icon-document-copy",
                    "path": "/admin/roles"
                },
                {
                    "label": "文件管理系统",
                    "icon": "el-icon-document-copy",
                    "path": "/admin/files"
                },
            ]
        }
    ]
}
