GUId3.js
========

a simple toolkit for UI components for mobile and desktop created with D3.js

```javascript
var s = GUId3.horizontal_slider()

s.width(100).height(30)
s.fill('blue')
s.fill()  // returns 'blue'

d3.select('div#foo_slider').call(GUId3.horizontal_slider().width(100).height(30).fill('blue'))
d3.select('div#bar_button').call(s)
```

sliders
* vertical
* horizontal
* uses d3 scales internally
* getValue
* setValue
* with and without handles or backgrounds

buttons
* toggle
* momentary
* radio list
