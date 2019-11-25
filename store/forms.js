//const sysCollections = require('../config/collections');
//const sysPatterns = require('../config/parttens');
import sysCollections from '../config/coll';
import sysPatterns from '../config/parttens';
const _ = require('lodash');
const sourceForm = {
    title: "表单测试（编辑状态下禁用组件）",
    form_name: "",
    gutter: 20,
    size: "small",
    itemList: []
};
const guid = (val = "") => {
    return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-' + val).replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        const d = new Date().getTime().toString(16);
        return v.toString(16);
    })
};
export const state = () => ({
    currForms: {
        ...sourceForm
    },
	formValue:{},
    currComponent: null,
    collections: [], // 数据表字段
    patterns: sysPatterns.exp,

})

export const mutations = {
    CLEAR_FORMS(state, flag) {
        if(!flag){ // 清除所有组件
            state.currForms.itemList = [];
        }else{
            state.currForms = {
                ...sourceForm
            };
        }
        if (!process.server) {
			this.app.$storage.session.set('adminForms', state.currForms);
            //this.app.$storage.session.remove('adminForms');
        }
    },
    UPDATE_FORMS(state, data) {
        state.currForms = data;
        if (!process.server) {
            this.app.$storage.session.set('adminForms', state.currForms);
            //this.app.store.commit('forms/SET_CHEKEDKEYS');
        }
    },
    UPDATE_RULES(state, rules) {
        //console.log(state.currComponent, rules);
        state.currComponent['rules'] = rules;
        let currForms = _.cloneDeep(state.currForms);
        let tableIndex = _.findIndex(currForms.itemList, {
            "key": state.currComponent.key
        });
        currForms.itemList[tableIndex] = state.currComponent;
        this.app.store.commit('forms/UPDATE_FORMS', currForms);
    },
    SET_CHEKEDKEYS(state) {
        // 列出已被选取的字段节点 checkedKeys
        let checkedKeys = [];
        let currForms = {
            ...state.currForms
        }
        currForms.itemList.forEach(item => {
            item.children.forEach(child => {
                checkedKeys.push(child.name)
            })
        });
        state.checkedKeys = checkedKeys;
    },
    INIT_FORMS(state) {
        if (!process.server) {
            let currForms = this.app.$storage.session.get('adminForms');
            if (currForms) {
                state.currForms = currForms;
                //this.app.store.commit('forms/SET_CHEKEDKEYS');
            }
        }
    },
    UPDATE_ITEM(state, data) {
        let currForms = {
            ...state.currForms
        };
        let index = _.findIndex(currForms.itemList, {
            "name": data.name,
            "table": data.table
        });
        currForms.itemList[index] = data;
        state.currComponent = data;
        this.app.store.commit('forms/UPDATE_FORMS', currForms);
    },
    REMOVE_ITEM(state, data) {
        let currForms = {
            ...state.currForms
        };
        let index = _.findIndex(currForms.itemList, {
            "name": data.name,
            "table": data.table
        });
        if (!!~index) {
            currForms.itemList.splice(index, 1);
        }
        state.currComponent = null;
        this.app.store.commit('forms/UPDATE_FORMS', currForms);
    },
	UPDATE_FORM_VALUE(state, obj) {
        state.formValue = obj;
    },
    UPDATE_COLLECTIONS(state, colls) {
        state.collections = colls;
    }
}

export const actions = {
    // 获取数据表及字段
    async ASYNC_GETCOLLS({ commit }, lang) {
        let collections = { ...sysCollections };
        let keys = Object.keys(collections),
            colls = [];
        keys.forEach(key => {
            // 忽略系统定义的表
            if (!['user', 'counters', 'formList', 'pageList'].includes(key)) {
                let fields = collections[key];
                let obj = {
                    "name": fields.collInfo.name,
                    "label": fields.collInfo.label,
                    "key": fields.collInfo.name,
                    "tableName": fields.collInfo.name,
                    "children": []
                }
                for (let field in fields) {
                    let data = fields[field];
                    if (!['id', 'collectionName', 'collectionLabel'].includes(field) && !data.hide) {
                        data.table = key;
                        data.value = "";
                        data.tableName = key + '-' + data.name
                        data.key = guid(key);
                        obj.children.push(data);
                    }
                }
                colls.push(obj);
            }
        });
        //console.log('colls', colls);
        commit('UPDATE_COLLECTIONS', colls);
    },
}