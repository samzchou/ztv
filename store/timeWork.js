/* eslint-disable */
//import VueCookies from 'vue-cookies';
const VueCookies = require('vue-cookies');
const navMenu = require('../config/navMenu');

export const state = () => ({
	rangeTime:null,
	holiday:[],
    weekArray: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    workType: [{
        label: "工作分类一",
        id: 1
    }, {
        label: "工作分类二",
        id: 2
    }],
    workProject: [{
        label: "项目一",
        id: 1
    }, {
        label: "项目二",
        id: 2
    }],
    timeutilHeight: 20,
    locakMinutes: 15,
    isEditTime: false,
    editBlock: null,
    editIndex: '',
    userTimeBlocks: [],
})

export const mutations = {
    UPDATE_USERBLOCK(state, obj) {
        state.userTimeBlocks = obj;
    },
    UPDATE_EDITBLOCK(state, obj) {
        state.editBlock = obj;
    },
    UPDATE_EDITINDEX(state, indexStr) {
        state.editIndex = indexStr;
        state.isEditTime = true;
    },
    UPDATE_EDITINGTIME(state, flag) {
        state.isEditTime = flag;
    },
    TOGGLE_SIDEBAR: state => {
        VueCookies.set('sidebarStatus', state.sidebar.opened ? 1 : 0);
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = false;
    },
	UPDATE_TIME_RANGE(state, timeObj) {
		state.rangeTime = timeObj;
	},
	UPDATE_HOLIDAY(state, data) {
		state.holiday = data;
	}
}

export const actions = {
    async nuxtServerInit({ commit }, { req, app }) {
        let { host = '' } = req.headers || {};
        let user = null;
        if (req.cookies.token) {
            user = await this.$axios.$post('mock/db', {
                data: {
                    type: 'getData',
                    collectionName: 'user',
                    data: {
                        token: req.cookies.token
                    }
                }
            });
        }
        commit('UPDATE_USER', user);
    },
    async ASYNC_GTETIME_RANGE({ commit }) {
        let res = await this.$axios.$post('mock/db', {
            data: {
				type: "serverTimeRange",
				data: {}
			}
        });
        commit('UPDATE_TIME_RANGE', res);
    },
	async ASYNC_GTE_HOLIDAY({ commit }) {
		const condition = {
			type: 'openFile',
			path: 'holiday.json'
		}
		
        let res = await this.$axios.$post('mock/files', { data: condition });
		//debugger
		if (res) {
			res = JSON.parse(res);
			commit('UPDATE_HOLIDAY', res);
		}
        
    },
}