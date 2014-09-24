GUId3.js v 0.3.1
========

##currently unstable, do not use in production

a simple toolkit for UI components for mobile and desktop created with D3.js

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

- [ ] circle slider
- [ ] radio button group (quantile scales?)

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

```javascript
// sliders!
var obj = { value: 3 }  // the target object

function optionalCallback(v){
  console.log('from the constructor passed callback', v)
}

var slider = new GUId3.slider() // or use other constructors
// var slider = new GUId3.slider(obj)                  // or...
var slider = new GUId3.slider(optionalCallback)     // or...
// var slider = new GUId3.slider(obj,optionalCallback)

slider.connect(obj, 'value')
// slider.connect(obj.value) // try to get this to work

slider.scale(d3.scale.pow().exponent(4)
          .domain([0,64])
          .range([10,100000])
          .clamp(true))

slider.width(100).height(30) // chain parameters!

slider.fill('blue')  // sets the fill to blue
slider.fill()        // returns 'blue'

slider.callback(function(scaled_value){
  // sends the scaled value to the callback function
  // useful for debugging or hooking into multiple targets
  // or complex conditionals
  // overwrites the callback sent to the constructor
  console.log('I overwrite the callback in the constructor',scaled_value)
})

slider.setValue(32)  // changes the appearance of the slider
                     // and sets the target value

d3.select('div#foo_slider').call(slider)     // or
slider.create(d3.select('div#foo_slider'))
```

* uses d3 scales internally
* two way communication that monitors the target value using Object.observe
* or use as a proxy to multiple values setting a callback function
* with and without handles or backgrounds
