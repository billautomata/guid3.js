
var button = new GUId3.Button()
button.cssClass('example5')
button.width(150).height(150)
button.labelOn('zomgon').labelOff('zomgoff')
button.callback(function(v){
  if(v){
    d3.select('div#example5').style('background-color', '#406573')
  } else {
    d3.select('div#example5').style('background-color', 'black')
  }
})

// create the container, or select one
var container = d3.select('div#example5')
  .append('svg').attr('width', '100%').attr('height', 300)

// create the button
button.create(container.append('g')
  .attr('transform','translate(10,10)'))
button.setValue(true)
