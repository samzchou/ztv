import lodash from 'lodash';
export default ({ app, store }) => {
  if(process.server){
    global._ = lodash;
  }else{
    window._ = lodash;
  }
}