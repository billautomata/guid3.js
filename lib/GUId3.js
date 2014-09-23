var GUId3 = {}


// TODO TOTALLY REDO USING THIS.
GUId3.horizontal_slider = function module(cb){

  "use strict";
  var self = this;

  console.log('here')
  // public variables
  this.bg_fill = 'blue'
  this.width = 300
  this.height = 50
  this.label = ''
  this.value = 0

  this._scale
  this.object_reference
  this.object_key
  this.callback = cb
  this.setValue

  this.scale = function(_){
    if(!arguments.length) return _scale;
    this._scale = _
    return this;
  }

  this.connect = function(o,k){
    this.object_reference = o
    this.object_key = k
  }

  //
  this.create = function(selection){

    var svg = selection

    var g_root = svg.append('g').attr('id', 'slider_root')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('border', '1px solid black')

    g_root.attr('transform', 'translate(10,10)')

    var rect_slider_bg = g_root.append('rect')
      .attr('x',0)
      .attr('y',0)
      .attr('width', this.width)
      .attr('height', this.height)
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

      console.log('x',x)
      console.log(self._scale.domain)

      if(x < 0){ x = 0 }
      if(x > this.width) { x = this.width }

      // xTODO make the slider value independent of the domain
      // map the slider width to the scale domain linearly
      // test this
      var map_scale = d3.scale.linear().domain([0,self.width]).range(self._scale.domain())

      console.log('map scale',map_scale(x))

      // set the width of the indicator
      rect_horizontal_indicator.attr('width', x)


      if(text_label){
        text_label.node().dispatchEvent(new CustomEvent('change_me', { detail:map_scale(x) } ))
      }

      self.object_reference[self.object_key] = self._scale(map_scale(x))

      if(typeof self.callback === 'function'){
        return self.callback(self._scale(map_scale(x)))
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
      .attr('width', this.width* 0.3)
      .attr('height', this.height)
      .attr('fill', this.bg_fill)
      .style('pointer-events', 'none')

    var text_label
    if(this.label !== ''){
      text_label = g_root.append('text')
        .text(this.label)
        .attr('x', this.width)
        .attr('y', 0)
        .attr('dy', '0.33333em')

      text_label.on('change_me', function(d,e){
        d3.select(this).text(self._scale(d3.event.detail).toFixed(2,0))
        console.log('running from change_me event')
        console.log(d)
        console.log(e)
        console.log(d3.event)
      })

    }

  }
  //
  // slider.setValue = function(_){
  //   drag_function(scale.invert(v))
  // }
  //
  // slider.width = function(_){
  //   if(!arguments.length) return width;
  //   width = _
  //   return slider;
  // }
  //
  // slider.height = function(_){
  //   if(!arguments.length) return height;
  //   height = _
  //   return slider;
  // }
  //
  // slider.scale = function(_){
  //   if(!arguments.length) return scale;
  //   scale = _
  //   return slider;
  // }
  //
  // this.color = function(_){
  //   if(!arguments.length) return color;
  //   this.bg_fill = _
  //   return slider;
  // }
  //
  // slider.value = function(_){
  //   if(!arguments.length) return value;
  //   value = _
  //   return slider;
  // }
  //
  // slider.label = function(_){
  //   if(!arguments.length) return label;
  //   label = _
  //   return slider;
  // }
  //
  // slider.connect = function(o,k){
  //   object_reference = o
  //   object_key = k
  //   return slider;
  // }
  //
  // slider.callback = function(_){
  //   if(typeof _ === 'function'){
  //     callback = _
  //     return slider;
  //   } else {
  //     return callback(_)
  //   }
  //
  //
  // }
  //
  // return slider;

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
