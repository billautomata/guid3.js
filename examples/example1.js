var slider = new GUId3.Slider(function(v){
  v = Math.floor(v)
  var rgb_string = 'rgb('+[v,v,v].join(',')+')'
  console.log(rgb_string)
  d3.select('div#example1')
    .style('background-color', rgb_string)
})

slider.width(300)
slider.height(20)

slider.label('my slider')

// set up the scale using a d3 scale!
var my_scale = d3.scale.linear()
  .domain([1,100])
  .range([0,255])

slider.scale(my_scale)

// create the container, or select one
var container = d3.select('div#example1')
  .append('svg')
  .attr('width', 350)
  .attr('height', 40)

// create the slider
slider.create(container.append('g')
  .attr('transform','translate(10,10)'))
// set the value of the slider
slider.setValue(33)
