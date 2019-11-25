/* eslint-disable */
//const dbConfig = require('../config/db/index.js');

const dbConfig = {
	collections:{}
};
export const state = () => ({
    "orgList":[
        {
            "label": "总经办部",
            "id": 1
        },
        {
            "label": "设计部",
            "id": 2
        },
        {
            "label": "人事部",
            "id": 3
        }       
    ],
    "sexList":[{label:"男",id:1},{label:"女",id:2}],
    "collections" : dbConfig.collections,
})

export const mutations = {
    
    
}

export const actions = {
    async nuxtServerInit({ commit }, { req, app }) {
        /*
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
        */
    },
    async ASYNC_UPDATE_LOCALE({ commit }, lang) {
        /* let flag = await this.$axios.$post('/api/user/changLocale', {
            data: {
                newLocale: lang
            }
        });
        if (flag !== undefined) {
            this.$router.go(0);
        } */
    },
}
