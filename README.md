![logo](http://billautomata.github.io/GUId3.js/logo.png)
v1.0.1 (beta) [examples](http://billautomata.github.io/GUId3.js/) [tests](http://billautomata.github.io/GUId3.js/test.html) [docs](http://billautomata.github.io/GUId3.js/build/apidocs/)
========
A toolkit for interactive UI components with D3.js.  

The UI elements receive feedback from the target objects using Object.observe when available, or a shim.

Almost all of the visual aspects are powered by setting a class on creation, and modifying the CSS for the corresponding component of the UI element.

* bi-directional communication
  * click/drag the UI component, the value is updated
  * update the value, the UI component visual is correct
* uses d3 scales internally
* pass custom callbacks

```css
/* example.css */
/* changing the position and look of the value indicator for the slider */
.my_css_class .guid3-slider-textvalue {
  -webkit-transform: rotate(33deg) translate(110px,-10px) !important;
  transform: rotate(33deg) translate(110px,-10px) !important;
  font-family: monospace !important;
  font-size: 12px !important;
  fill: black !important;
  stroke: none !important;
}
```

```bash
# build using browserify
$ npm install -g browserify
$ browserify lib/GUId3.base.js -o build/guid3.js
```

#### UI elements
- [x] horizontal slider
- [x] vertical slider
- [x] toggle button
- [x] momentary button

#### future plans
- [ ] circle slider (like a radial knob)
- [ ] radio button group (quantile scales?)

###slider example
```javascript
// example.js
var target_object = { v: 1000 }

var slider = new GUId3.Slider(function(v){
  console.log('from the callback', v)
})

slider.cssClass('example4')
slider.width(30).height(250).label('styled & vertical!')
slider.type('vertical')

// connect the slider to the target
slider.connect(target_object,'v')

// set up the scale using a d3 scale!
var my_scale = d3.scale.linear().domain([1,100]).range([303,909])
slider.scale(my_scale)

// create the container, or select one
var container = d3.select('div#example4')
  .append('svg').attr('width', 500).attr('height', 300)

// create the slider by passing in a d3 selection
slider.create(container.append('g')
  .attr('transform','translate(100,10)'))
// set the value of the slider
slider.setValue(808.1)

```

```css
.example4 .guid3-slider {
  fill: rgb(232,232,232) !important;
  fill-opacity: 1.0 !important;
  stroke: none !important;
}
.example4 .guid3-slider-indicator {
  fill: #b887fd  !important;
  fill-opacity: 0.33 !important;
  stroke: none !important;
}
.example4 .guid3-slider-textlabel {
  fill: black !important;
  font-family: serif !important;
  font-size: 12px !important;
  font-weight: 100 !important;
}
.example4 .guid3-slider-textvalue {
  fill: black !important;
  font-family: cursive !important;
  font-size: 18px !important;
  font-weight: 900 !important;
}
```

```javascript
// buttons!
var obj = { value: true }

var button = new GUId3.Button()

button.cssClass('example6')
button.width(150).height(50)
button.labelOn('zomgon').labelOff('zomgomentary')
button.type('momentary')

button.connect(obj,'value')

button.roundedRectangle([10,10])
button.callback(function(v){
  if(v){
    d3.select('div#example6').style('background-color', '#406573')
  } else {
    d3.select('div#example6').style('background-color', 'white')
  }
})

// create the container, or select one
var container = d3.select('div#example6')
  .append('svg').attr('width', 500).attr('height', 300)

// create the button
button.create(container.append('g')
  .attr('transform','translate(10,10)'))
button.setValue(true)
```
```css
.example6 .guid3-button {
  fill: green !important;
  fill-opacity: 1.0 !important;
  stroke: white !important;
}
.example6 .guid3-button-text {
  fill: white !important;
  font-family: Helvetica !important;
  font-size: 16px !important;
  font-weight: 100 !important;
}
.example6 .guid3-button-inactive {
  fill: blue !important;
  fill-opacity: 1.0 !important;
  stroke: orange !important;
}
```
