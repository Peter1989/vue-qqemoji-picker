import Vue from 'vue'
import App from './App.vue'
import EmojiPick from '../packages/emoji-pick/src/index'
Vue.use(EmojiPick)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
