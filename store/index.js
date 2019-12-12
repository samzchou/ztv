/* eslint-disable */
//import VueCookies from 'vue-cookies';
const VueCookies = require('vue-cookies');
//const navMenu = require('../config/navMenu');
import colDataOPts from '../config/options';
import dataUtil from '../util/data_util';

export const state = () => ({
    user: null,
    sidebar: {
        opened: process.server ? true : !+VueCookies.get('sidebarStatus'),
        withoutAnimation: false
    },
    menuAcitve: "",
    //navMenu: navMenu.menuList,
    pageTitle: '主页',
    currpage:{},
	serviceList:[],
	collectionData:{},
	holidayType:[{label:'工作日',value:'0'},{label:'休息日',value:'1'},{label:'节假日',value:'2'}], 
	checkArr: [ 
		{ label: '查看', value: 1 }, { label: '新增', value: 2 }, { label: '修改', value: 3 }, { label: '删除', value: 4 }, { label: '批量处理', value: 5 }
	],
	wfType:[
		{ label: '时间钟补填审批', value: 1, table:'timeBlock',title:'申请人',titleDate:'申请日期' }, { label: '时间钟审核指导', value: 2, table:'timeBlock',title:'审核人',titleDate:'审核日期' }, { label: '其他', value: 3 }
	],
	stateType:[
		{ label: '申请中', value: 1 }, { label: '已拒绝', value: 2 }, { label: '处理中', value: 3 }, { label: '已同意', value: 4 }, { label: '已完成', value: 5 }, { label: '已撤回', value: 6 }
	],
})

export const mutations = {
    UPDATE_MENUACTIVE(state, index) {
        state.menuAcitve = index;
    },
    UPDATE_USER(state, data) {
        state.user = data;
        if (!process.server) {
            this.app.$storage.set('user', state.user);
        }
    },
    SET_CURRPAGE(state, data){
        state.currpage = data;
    },
    TOGGLE_SIDEBAR: state => {
        VueCookies.set('sidebarStatus', state.sidebar.opened ? 1 : 0);
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = false;
    },
	UPDATE_SERVICE(state, list){
		state.serviceList = dataUtil.toTree(list);
	},
	UPDATE_COLLECTIONS_DATA(state, obj){
		state.collectionData = Object.assign({},colDataOPts,obj);
	}
}

export const actions = {
    async nuxtServerInit({ commit }, { req, app }) {
        let { host = '' } = req.headers || {};
        if (req.cookies.token) {
            let user = await this.$axios.$post('mock/db', {
                data: {
                    type: 'getData',
                    collectionName: 'employee',
                    data: {
                        token: req.cookies.token
                    }
                }
            });
			if(user){
				commit('UPDATE_USER', user);
			}
        }
		// 系统常用值集;这里需要直接取字段；待优化
		let obj = {}, names = ['employee','department', 'service', 'roles','workType'];
		for(let i=0; i<names.length; i++){
			let condition = {
				type: 'listData',
				collectionName: names[i]
			}
			let res = await this.$axios.$post('mock/db', { data: condition });
			if(res){
				obj[names[i]] = res.list;
			}
		}
		commit('UPDATE_COLLECTIONS_DATA', obj);	
		
    },
    async ASYNC_GET_SERVICE({ commit }, lang) {
        let res = await this.$axios.$post('mock/db', {
            data: {
                type: 'listData',
				collectionName: 'service',
            }
        });
        commit('UPDATE_SERVICE', res.list);
    },
}