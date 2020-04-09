# vue-qqemoji-picker

Simple Vue.js QQ expression and emoji picker

``` html
<template>
  <div class="hello">
    <emoji-pick
      @emoji="insert"
      :panelWidth="450"
      :panelHeight="170">
      <div slot="emoji-invoker" class="emojibutton" slot-scope="{ events: { click: clickEvent } }" @click.stop="clickEvent">
        <button type="button">emoji</button>
      </div>
    </emoji-pick>
    <div>
      <textarea v-model="input"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      input: ''
    }
  },
  methods: {
    insert(emoji) {
      this.input += emoji
    }
  }
}
</script>
```

