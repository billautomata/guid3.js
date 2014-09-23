GUId3.js
========

##currently very unstable, do not use

a simple toolkit for UI components for mobile and desktop created with D3.js

#### UI elements
- [x] horizontal slider
- [x] vertical slider
- [ ] radial slider
- [ ] toggle button
- [ ] momentary button
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

button.setValue(true)
button.toggle()

button.create(d3.select('div#something'))

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
