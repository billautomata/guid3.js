var GUId3 = {}

GUId3.horizontal_slider = function module(){
  "use strict";

  // public variables
  var bg_fill = 'blue'
  var width = 100
  var height = 10
  var scale = d3.scale.linear().domain([0,1]).range([0,1])

  function slider(selection){

    var svg = this

    var g_root = svg.append('g').attr('id', 'slider_root')
      .attr('width', width)
      .attr('height', height)
      .style('border', '1px solid black')

    g_root.attr('transform', 'translate(10,10)')

    var rect_slider_bg = g_root.append('rect')
      .attr('x',0)
      .attr('y',0)
      .attr('width',width)
      .attr('height',height)
      .attr('fill', 'white')
      .attr('fill-opacity', 1.0)
      .attr('stroke', 'red')

    var drag_function = function(d){

      var bounding_node = g_root.node().getBoundingClientRect()

      var x,y

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

//      console.log(x,scale(x))

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
      .attr('fill', bg_fill)
      .style('pointer-events', 'none')

  }

  slider.width = function(_){
    if(!arguments.length) return width;
    width = _
    return slider;
  }

  slider.height = function(_){
    if(!arguments.length) return height;
    height = _
    return slider;
  }

  slider.scale = function(_){
    if(!arguments.length) return scale;
    scale = _
    return slider;
  }

  slider.color = function(_){
    if(!arguments.length) return color;
    bg_fill = _
    return slider;
  }

  return slider;

}
