/**
 * 验证token
 */
const app = require('express');
const router = app.Router();

router.use(function(req, res, next) {
    if(req.cookies.token){
        next();
    }else{
        res.redirect('/?wpe=login');
    }
});

module.exports = router;

// const app = require('express');
// const router = app.Router();
// const $axios = require('axios');

// let redirectUrl = `http://${ process.env.NODE_ENV === 'production' ? 'prehrssc.onessc.com' : '192.168.16.151:84'}/?wpe=login`;
// let checkTokenUrl = 'http://192.168.16.151:8081/hrssc-platform-portal/api/wf/myWorkCount';


// router.use(function(req, res, next) {
//     if(req.body.token){
//         checkToken(req.body.token).then(flag => {
//             if(flag){
//                 res.cookie('token', req.body.token, { maxAge: 20*365*24*60*60*1000,path: '/'});
//                 next();
//             }else{
//                 res.redirect(redirectUrl); 
//             }
//         });
//     }else if(req.cookies.token){
//         checkToken(req.cookies.token).then(flag => {
//             if(flag){
//                 next();
//             }else{
//                 res.clearCookie('token',{ path: '/' });
//                 res.redirect(redirectUrl); 
//             }
//         });
//     }else{
//         // res.redirect(redirectUrl);  
//         next();
//     }
// });

// // token校验
// async function checkToken(token, fn){
//     let res = await $axios.post(checkTokenUrl, {
//       token: token,
//       data: {}
//     });
//     let data = res && res.data;

//     return data && data.success && data.msgCode !== 'TOKEN_INVALIDATE';
// }

// module.exports = router;