# vue-qqemoji-picker
Simple Vue.js QQ expression and emoji picker

``` html
<emoji-picker
qqbackground = 'url of sprite.png'
:panelWidth="450"
:panelHeight="170"
:search="search"
style="position:relative;display:inline-block;"
@emoji="insert">
<div
slot="emoji-invoker"
slot-scope="{ events: { click: clickEvent } }"
class="openbutton"
@click.stop="clickEvent">
<button type="button">emoji</button>
</div>
</emoji-picker>
```
