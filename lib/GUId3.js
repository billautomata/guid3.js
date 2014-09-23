var GUId3 = {}


// TODO TOTALLY REDO USING THIS.
GUId3.horizontal_slider = function module(cb){
  "use strict";

  // public variables
  this.bg_fill = 'blue'
  this.width = 100
  this.height = 10
  this.label = ''
  this.value = 0
  this.scale
  this.object_reference
  this.object_key
  this.callback = cb
  this.setValue

  function slider(selection){

    console.log(this)

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
      text_label.node().dispatchEvent(new CustomEvent('change_me', { detail:x } ))

      object_reference[object_key] = scale(x)

      if(typeof callback === 'function'){
        return callback(scale(x))
      } else {
        return
      }

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

    var text_label
    if(label !== ''){
      text_label = g_root.append('text')
        .text(label)
        .attr('x', width)
        .attr('y', 0)
        .attr('dy', '0.33333em')

      text_label.on('change_me', function(d,e){
        d3.select(this).text(scale(d3.event.detail).toFixed(2,0))
        console.log('running from change_me event')
        console.log(d)
        console.log(e)
        console.log(d3.event)
      })

    }

  }

  slider.setValue = function(_){
    drag_function(scale.invert(v))
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

  slider.value = function(_){
    if(!arguments.length) return value;
    value = _
    return slider;
  }

  slider.label = function(_){
    if(!arguments.length) return label;
    label = _
    return slider;
  }

  slider.connect = function(o,k){
    object_reference = o
    object_key = k
    return slider;
  }

  slider.callback = function(_){
    if(typeof _ === 'function'){
      callback = _
      return slider;
    } else {
      return callback(_)
    }


  }

  return slider;

}


  // draw_scale(d3.scale.linear())
  // draw_scale(d3.scale.log())
  // draw_scale(d3.scale.pow().exponent(3))
  //
  // function draw_scale(scale){
  //
  //   scale.domain([1,500])
  //   scale.range([100,1])
  //
  //   var svg = d3.select('div#slider0').append('svg')
  //   svg.attr('width', 500)
  //   svg.attr('height', 100)
  //
  //   for(var i = 0; i < 500; i++){
  //     svg.append('circle')
  //       .attr('cx', i)
  //       .attr('cy', scale(i))
  //       .attr('r', 1)
  //       .attr('fill', 'red')
  //       .attr('stroke', 'none')
  //   }
  //
  // }
