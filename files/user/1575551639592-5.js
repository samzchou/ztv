import moment from 'moment';

moment.locale('zh-cn');

export default ({ app, store }) => {
  if(process.server){
    global.moment = moment;
  }else{
    window.moment = moment;
  }
}