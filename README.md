GUId3.js
========

##currently very unstable, do not use

a simple toolkit for UI components for mobile and desktop created with D3.js

```javascript

var obj = { value: 3 }

function optionalCallback(value){
  console.log('from the hook', value)
}

var s = GUId3.horizontalSlider(optionalCallback)

s.connect(obj,'value')

s.scale(d3.scale.pow().exponent(4)
          .domain([0,n.width()])
          .range([10,100000])
          .clamp(true)
      )

s.width(100).height(30) // chain parameters!

s.fill('blue')  // sets the fill to blue
s.fill()        // returns 'blue'

s.callback(function(v){
  // sends the scaled value to the callback function
  // useful for debugging or hooking into multiple targets
  // or complex conditionals
  // overwrites the callback sent to the constructor
  console.log(v)
})

n.connect(obj,'value')  // pass in the object and the key we want to target

d3.select('div#foo_slider').call(GUId3.horizontal_slider()
                                    .width(100).height(30)
                                    .fill('blue')
                                    .connect(obj,'value'))

d3.select('div#bar_slider').call(s)

// both sliders will change the value, but only the #bar_slider will run the callback

```

* uses d3 scales internally
* two way communication that monitors the target value using Object.observe
* or use as a proxy to mulitple values setting a callback function
* calling `connect(object.reference)`
* calling `setValue` function that
* with and without handles or backgrounds

buttons
* toggle
* momentary
* radio list
