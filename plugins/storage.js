import Vue from 'vue'
import storage from 'good-storage'

Vue.prototype.$storage = storage;

export default ({ app, store }, inject) => {
  app.$storage = storage;
}
