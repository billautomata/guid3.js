var slider = new GUId3.Slider()

slider.cssClass('example3')

slider.width(300).height(50).label('styled slider')

// set up the scale using a d3 scale!
var my_scale = d3.scale.linear().domain([1,100]).range([303,909])
slider.scale(my_scale)

// create the container, or select one
var container = d3.select('div#example3')
  .append('svg').attr('width', 512).attr('height', 85)

// create the slider
slider.create(container.append('g')
  .attr('transform','translate(10,10)'))
// set the value of the slider
slider.setValue(808.1)
