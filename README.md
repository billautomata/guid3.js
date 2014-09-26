![logo](http://billautomata.github.io/GUId3.js/logo.png)
#v0.6.1 [examples](http://billautomata.github.io/GUId3.js/) [docs](http://billautomata.github.io/GUId3.js/build/apidocs/)
========

##currently unstable, do not use in production yet, version 1.0.0 planned for October 1

A simple toolkit for interactive UI components with D3.js.  The UI elements receive feedback from the target objects using Object.observe when available, or a shim.

Almost all of the visual aspects are powered by setting a class on creation, and modifying the CSS for the corresponding component of the UI element.

* bi-directional communication
  * click the slider, the value is updated
  * update the value, the slider visual is correct
* uses d3 scales internally
* use as a proxy to multiple values setting a callback function

```css
/* example.css */
/* changing the position and look of the value indicator for the slider */
.my_css_class.guid3-slider-textvalue {
  transform: rotate(33deg) translate(110px,-10px);
  font-family: monospace;
  font-size: 12px;
  fill: black;
  stroke: none;
}
```

```bash
# build using browserify
$ npm install -g browserify
$ browserify test/build_browser.js -o build/guid3.js
```

#### UI elements
- [x] horizontal slider
- [x] vertical slider
- [x] toggle button
- [x] momentary button

######not implemented yet, planned for version 1
- [ ] circle slider (like a radial knob)
- [ ] radio button group (quantile scales?)

###slider example
```javascript
// example.js
var g_slider0 = svg.append('g')
  .attr('transform', 'translate(15,5)')

var obser = { v: 50000 }  // the value we want to change

// pass in a callback
var n = new GUId3.slider(function(d){console.log('from callback slider 0',d)})

n.cssClass('slider0')

n.type('horizontal')
n.width(400).height(50).connect(obser,'v')

n.scale(d3.scale.linear()
  .domain([0,2])      // the domain doesn't matter,
  .range([10,100000]) // you just have to set it
  .clamp(true))

// n.callback(function(q){ console.log('zomg',q) })
// replaces the callback set in the constructor

// create the element on the d3 selection
n.roundedRectanglePercent(5) // rounded rectangles
n.create(g_slider0) // call create() at the end
n.setValue(9333.01) // then you can call setValue(v)
                    // which updates the slider and the target

```

```css
/* example.css */
.slider0 .guid3-slider {
  fill: rgb(33,33,100);
  stroke: black;
  stroke-width: 3px;
}

.slider0 .guid3-slider-indicator {
  fill: rgb(33,33,255);
  stroke: white;
  stroke-width: 0.5;
}

.slider0 .guid3-slider-textvalue {
  transform: translate(-10px,12px);
  font-family: monospace;
  font-size: 23px;
  fill: white;
  fill-opacity: 0.33
  stroke: none;
  text-anchor: end;
}
```

```javascript
// buttons!
var obj = { value: true }

function optionalCallback(v){
  console.log('from the constructor passed callback', v)
  if(v){
    doSomething()
  } else {
    undoSomething()
  }
}

var button = new GUId3.button(optionalCallback)

button.width(100).height(100)
button.labelOn('on')
button.labelOff('off')

button.create(d3.select('g#something'))

button.setValue(true)
button.setValue(false)
button.toggle() // changes the state of the button
                // allows you to treat a momentary button like a toggle

```
