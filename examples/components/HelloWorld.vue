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
  name: 'HelloWorld',
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

<style scoped>
.hello{
  display: inline-block;
}
.emojibutton{
  display: inline-block;
}
</style>
