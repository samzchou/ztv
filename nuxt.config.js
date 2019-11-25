/* eslint-disable */
const sysConfig = require('./config');
module.exports = {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { 'http-equiv': 'X-UA-Compatible', 'content': 'IE=Edge,chrome=1' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: sysConfig.description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    router: {
        middleware: ['auth']
    },
    css: [
        'element-ui/lib/theme-chalk/index.css',
        './assets/scss/base.scss'
    ],
    // 组件缓存
    cache: true,
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        '@/plugins/element-ui',
        '@/plugins/axios',
        '@/plugins/lodash',
        '@/plugins/global',
        '@/plugins/moment',
        { src: '@/plugins/code-editor', ssr: false },
        { src: '@/plugins/echarts', ssr: false },
        { src: '@/plugins/cookies', ssr: false },
        { src: '@/plugins/storage', ssr: false }
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/axios'
    ],
    styleResources: {
        scss: '~assets/scss/var.scss'
    },
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {
        //baseURL: sysConfig.hrssc_env.SERVER_URL,
        //browserBaseURL: sysConfig.hrssc_env.SERVER_URL
    },
    /*
     ** Build configuration
     */
    build: {
        transpile: [/^element-ui/],
        /*
         ** You can extend webpack config here
         */
        extend(config, { isDev, loaders: { vue } }) {
            vue.i18n = '@kazupon/vue-i18n-loader';
            if (isDev && process.client) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    },
    env: {
        server_url: sysConfig.hrssc_env.SERVER_URL,
        HOST: sysConfig.hrssc_env.HOST,
        PORT: sysConfig.hrssc_env.PORT
    }
}