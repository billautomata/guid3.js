function create_slider(){

  var width = 200
  var height = 120

  var scale = d3.scale.linear().domain([0,width]).range([1,10])

  var div_slider = d3.select('div#slider0')

  var svg = div_slider.append('svg').attr('width', 500).attr('height', 500).style('background-color', 'green')

  var g_root = svg.append('g').attr('id', 'slider_root')
    .attr('width', width)
    .attr('height', height)
    .style('border', '1px solid black')

  g_root.attr('transform', 'translate(30,100)')

  var rect_slider_bg = g_root.append('rect')
    .attr('x',0)
    .attr('y',0)
    .attr('width',width)
    .attr('height',height)
    .attr('fill', 'white')
    .attr('fill-opacity', 1.0)
    .attr('stroke', 'red')

  var drag_function = function(d){

    bounding_node = g_root.node().getBoundingClientRect()

    var x,y

    // console.log('dragging')
    // console.log(d3.event)
    // console.log(d3.event.x,d3.event.y)

    if(d3.event.type === 'drag'){
      x = d3.event.x
      y = d3.event.y
    } else {
      x = d3.event.x - bounding_node.left
      y = d3.event.y - bounding_node.top
    }

    if(x < 0){ x = 0 }
    if(x > width) { x = width }

    rect_horizontal_indicator.attr('width', x)
    console.log(scale(x))

    // g_root.append('circle')
    //   .attr('cx', x)
    //   .attr('cy', y)
    //   .attr('r', 3)
    //   .attr('fill', 'red')
    //   .attr('stroke', 'none')

  }
  var drag = d3.behavior.drag()
    .on("drag", drag_function);

  rect_slider_bg.call(drag)
  rect_slider_bg.on('mousedown', drag_function)

  // horizontal slider
  var rect_horizontal_indicator = g_root.append('rect')
    .attr('x',0)
    .attr('y',0)
    .attr('width',width* 0.3)
    .attr('height',height)
    .attr('fill', 'blue')
    .style('pointer-events', 'none')

}
