var button = new GUId3.Button()
button.cssClass('example6')
button.width(150).height(150)
button.labelOn('zomgon').labelOff('zomgomentary')
button.type('momentary')
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
