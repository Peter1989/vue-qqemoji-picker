<template>
  <div>
    <slot
      name="emoji-invoker"
      :events="{ click: (e) => toggle(e) }"
    ></slot>
    <div
      v-if="display.visible"
      v-click-outside="hide">

    <div class="emojipanel" :style="`width:${panelWidth}px;height:${panelHeight}px;bottom:${posBottom}px;left:${posLeft}px`">
      <div
        v-for="(emojiGroup, category) in emojis"
        :key="category">
        <div v-if="category == 'QQ'">
          <span
            v-for="(item, index) in emojiGroup"
            :key="index"
            :style="`${item.position},background: url(${qqbackground});`"
            class="qqface-item"
            @click="insert(item.code)"/>
        </div>
        <div v-if="category == 'emoji'">
          <span
            v-for="(emoji, emojiName) in emojiGroup"
            :key="emojiName"
            :title="emojiName"
            style="margin:0 4px 0 0;font-size: 18px;"
            @click="insert(emoji)"
          >{{ emoji }}</span>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  import emojis from '../emojis'

  export default {
    props: {
      search: {
        type: String,
        required: false,
        default: '',
      },
      emojiTable: {
        type: Object,
        required: false,
        default() {
          return emojis
        },
      },
      qqbackground:{
        type: String,
        required: true
      },
      panelWidth:{
        type: Number,
        required:false,
        default(){
          return 400
        }
      },
      panelHeight:{
        type: Number,
        required: false,
        default(){
          return 170
        }
      },
      posBottom:{
        type: Number,
        required: false,
        default(){
          return 30
        }
      },
      posLeft:{
        type: Number,
        required: false,
        default(){
          return 0
        }
      }
    },
    data() {
      return {
        display: {
          x: 0,
          y: 0,
          visible: false,
        },
      }
    },
    computed: {
      emojis() {
        if (this.search) {
          const obj = {}

          for (const category in this.emojiTable) {
            obj[category] = {}

            for (const emoji in this.emojiTable[category]) {
              if (new RegExp(`.*${this.search}.*`).test(emoji)) {
                obj[category][emoji] = this.emojiTable[category][emoji]
              }
            }

            if (Object.keys(obj[category]).length === 0) {
              delete obj[category]
            }
          }

          return obj
        }

        return this.emojiTable
      },
    },
    methods: {
      insert(emoji) {
        this.$emit('emoji', emoji)
      },
      toggle(e) {
        this.display.visible = ! this.display.visible
        this.display.x = e.clientX
        this.display.y = e.clientY
      },
      hide() {
        this.display.visible = false
      },
      escape(e) {
        if (this.display.visible === true && e.keyCode === 27) {
          this.display.visible = false
        }
      },
    },
    directives: {
      'click-outside': {
        bind(el, binding, vNode) {
          if (typeof binding.value !== 'function') {
            return
          }

          const bubble = binding.modifiers.bubble
          const handler = (e) => {
            if (bubble || (! el.contains(e.target) && el !== e.target)) {
              binding.value(e)
            }
          }
          el.__vueClickOutside__ = handler

          document.addEventListener('click', handler)
        },
        unbind(el, binding) {
          document.removeEventListener('click', el.__vueClickOutside__)

          el.__vueClickOutside__ = null
        },
      },
    },
    mounted() {
      document.addEventListener('keyup', this.escape)
    },
    destroyed() {
      document.removeEventListener('keyup', this.escape)
    },
  }
</script>
<style>
.emojipanel {
  text-align: left;
  position: absolute;
  background: white;
  box-shadow: 0 1px 4px 0 rgba(137, 158, 204, 0.8);
  border-radius: 2px;
  padding: 10px;
  overflow-y: auto;
}
.qqface-item {
  background-size: 375px 200px;
  display: inline-block;
  width: 22px;
  height: 22px;
  margin: 0 5px 0 0;
}
</style>>
