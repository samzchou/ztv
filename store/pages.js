/* const sysCollections = require('../config/collections');
const sysPatterns = require('../config/parttens'); */
const _ = require('lodash');
const sourcePage = {
    title: "我的页面",
	showType:1,
    content: {}
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
    currForm: null,
    pageForm: {
        title: "我的页面",
        content: {}
    },
    formList: [], // 表单列表
	collectionData:{}, // 主要集合数据
})

export const mutations = {
    CLEAR_PAGES(state, flag) {
        if (!flag) {
            let pageForm = { ...state.pageForm };
            pageForm.content = {};
            state.pageForm = pageForm;
        } else {
            state.pageForm = {
                ...sourcePage
            };
        }
        if (!process.server) {
			this.app.$storage.session.set('adminPages', state.pageForm);
            //this.app.$storage.session.remove('adminPages');
        }
    },
    UPDATE_PAGES(state, data) {
        state.pageForm = data;
        if (!process.server) {
            this.app.$storage.session.set('adminPages', state.pageForm);
        }
    },

    INIT_PAGES(state) {
        if (!process.server) {
            let pageForm = this.app.$storage.session.get('adminPages');
            if (pageForm) {
                state.pageForm = pageForm;
            }
        }
    },
    UPDATE_FORMLIST(state, list) {
        state.formList = list;
    },
	UPDATE_COLLECTIONS_DATA(state, obj){
		state.collectionData = obj;
	}
}

export const actions = {
    // 获取表单数据
    async ASYNC_GETFORMS({ commit }, lang) {
        let condition = {
            type: 'listData',
            collectionName: 'formList'
        }
        let res = await this.$axios.$post('mock/db', { data: condition });
        let list = res.list;
        //console.log(res);
        commit('UPDATE_FORMLIST', list);
    },
	async ASYNC_COLLECTIONS_DATA({ commit }, names=['department', 'user','roles']) {
		//console.log('ASYNC_COLLECTIONS_DATA', names);
		let obj = {};
		for(let i=0; i<names.length; i++){
			let condition = {
				type: 'listData',
				collectionName: names[i]
			}
			let res = await this.$axios.$post('mock/db', { data: condition });
			obj[names[i]] = res.list;
		}
		//console.log('ASYNC_COLLECTIONS_DATA', obj);
		commit('UPDATE_COLLECTIONS_DATA', obj);
	}
}