/* eslint-disable */
//import VueCookies from 'vue-cookies';
const VueCookies = require('vue-cookies');
const navMenu = require('../config/navMenu');

export const state = () => ({
	rangeTime:null,
	holiday:[],
    weekArray: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
	workTime:{startHour:7,endHour:22,allHour:15},
    timeutilWidth: 350,
	timeutilHeight: 40,
    locakMinutes: 15,
    isEditTime: false,
    editBlock: null,
    editIndex: '',
    userTimeBlocks: [],
	workState:[{id:1,label:'进行中'},{id:2,label:'已完成'},{id:3,label:'已搁置'}],
	nextWeekPlan:null, // 下周工作计划
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
	},
	UPDATE_WEEKPLAN(state, data) {
        state.nextWeekPlan = data;
    },
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