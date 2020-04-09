<template>
  <div class="wrap">
    <slot
      name="emoji-invoker"
      :events="{ click: (e) => toggle(e) }"
    ></slot>
    <div
      v-if="display.visible"
      v-click-outside="hide">
    <div class="emojipanel" :style="`width:${panelWidth}px;height:${panelHeight}px;bottom:${display.bottom}px;left:${display.left}px`">
      <div
        v-for="(emojiGroup, category) in emojis"
        :key="category">
        <div v-if="category == 'QQ'">
          <span
            v-for="(item, index) in emojiGroup"
            :key="index"
            :style="`${item.position}`"
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
  import emojis from './emojis'

  export default {
    name: 'emoji-pick',
    props: {
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
      }
    },
    data() {
      return {
        display: {
          left: 0,
          bottom: 0,
          visible: false,
        },
        emojis: emojis
      }
    },
    methods: {
      insert(emoji) {
        this.$emit('emoji', emoji)
      },
      toggle(e) {
        this.display.visible = ! this.display.visible
        this.display.left = e.toElement.offsetLeft
        this.display.bottom = e.toElement.offsetHeight
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
        bind(el, binding) {
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
        unbind(el) {
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
  background: url('./emojisprite.png');
  background-size: 375px 200px;
  display: inline-block;
  width: 22px;
  height: 22px;
  margin: 0 5px 0 0;
}
.wrap{
  position:relative;
  display: inline-block;
}
</style>