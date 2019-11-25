/* eslint-disable */
import VueCookies from 'vue-cookies';
//const navMenu = require('../config/adminMenu');
import navMenu from '~/config/adminMenu';
export const state = () => ({
    user: null,
    sidebar: {
        opened: process.server ? true : !+VueCookies.get('sidebarStatus'),
        withoutAnimation: false
    },
    menuAcitve: "",
    navMenu: navMenu.menuList,

})

export const mutations = {
    UPDATE_MENUACTIVE(state, index) {
        state.menuAcitve = index;
    },

    TOGGLE_SIDEBAR: state => {
        VueCookies.set('sidebarStatus', state.sidebar.opened ? 1 : 0);
        state.sidebar.opened = !state.sidebar.opened;
        state.sidebar.withoutAnimation = false;
    },
}

export const actions = {
    async nuxtServerInit({ commit }, { req, app }) {

    },
    async ASYNC_UPDATE_LOCALE({ commit }, lang) {

    },
}