var slider = new GUId3.Slider(function(v){
  // empty callback
})

slider.width(300)
slider.height(20)

slider.roundedRectangle([5,5])
slider.fixedDecimal(0)
slider.steps(4)

slider.label('')

// set up the scale using a d3 scale!
var my_scale = d3.scale.linear()
  .domain([1,100])
  .range([0,255])

slider.scale(my_scale)

// create the container, or select one
var container = d3.select('div#example2')
  .append('svg')
  .attr('width', 300)
  .attr('height', 45)

// create the slider
slider.create(container)

// set the value of the slider
slider.setValue(128)
