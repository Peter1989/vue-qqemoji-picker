// packages/emoji-pick/index.js

// 导入组件，组件必须声明 name
import EmojiPicker from './EmojiPicker.vue'

// 为组件添加 install 方法，用于按需引入
const EmojiPickerPlugin = {
  install(Vue, options = {}) {
    console.log('options', options)
    Vue.component('emoji-pick', EmojiPicker)
  },
}

export default EmojiPickerPlugin