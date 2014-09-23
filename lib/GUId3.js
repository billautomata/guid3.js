var GUId3 = {}

GUId3.horizontal_slider = function module(cb){

  "use strict";
  var self = this;

  console.log('here')
  // public variables

  this._cssClass=''
  this._cssId=''

  // visual attributes not set by CSS
  this._width = 300
  this._height = 50

  this._label

  // math stuffs
  this._scale
  this.object_reference
  this.object_key

  // callback
  this.callback = cb

  // internal value
  this._internal_value = 0

  // container that gets all the events attached to it
  this.g_root

  this.scale = function(_){
    if(!arguments.length) return this._scale;
    this._scale = _
    return this;
  }

  this.cssClass = function(_){
    if(!arguments.length) return this._cssClass
    this._cssClass = _
    return this;
  }

  this.cssId = function(_){
    if(!arguments.length) return this._cssId
    this._cssId = _
    return this;
  }

  this.width = function(_){
    if(!arguments.length) return this._width;
    this._width = _
    return this;
  }

  this.height = function(_){
    if(!arguments.length) return this.height;
    this._height = _
    return this;
  }

  this.label = function(_){
    if(!arguments.length) return this._label;
    this._label = _
    return this;
  }

  this.connect = function(o,k){
    this.object_reference = o
    this.object_key = k
    return this;
  }

  this.setValue = function(v){

    // update the target value
    this.object_reference[self.object_key] = v

    // update the slider visual
    if(this.g_root === undefined){
      this._internal_value = v
    } else {
      this.g_root.node().dispatchEvent(new CustomEvent('changed', { detail:v } ))
    }
  }

  this.getValue = function(){
    return this.object_reference[self.object_key];
  }

  //
  this.create = function(selection){

    var svg = selection

    this.g_root = svg.append('g').attr('id', 'slider_root')
      .attr('class', this._cssClass)
      .attr('width', this._width)
      .attr('height', this._height)
      .style('border', '1px solid black')

    this.g_root.attr('transform', 'translate(0,0)')

    this.g_root.on('changed', function(){
      console.log(d3.event.detail)
      rect_horizontal_indicator.attr('width', map_scale.invert(self._scale.invert(d3.event.detail)))
      text_label.node().dispatchEvent(new CustomEvent('change_me', { detail: self._scale.invert(d3.event.detail) } ))
    })

    var rect_slider_bg = this.g_root.append('rect')
      .attr('class', 'guid3-slider-bg-colors')
      .attr('x',0)
      .attr('y',0)
      .attr('width', this._width)
      .attr('height', this._height)
      //.attr('fill', 'white')
      .attr('fill-opacity', 1.0)
      //.attr('stroke', 'red')

    // horizontal slider
    var rect_horizontal_indicator = this.g_root.append('rect')
      .attr('class', 'guid3-slider-indicator-colors')
      .attr('x',0)
      .attr('y',0)
      .attr('width', this._width* 0.3)
      .attr('height', this._height)
      .style('pointer-events', 'none')

    var text_label

    text_label = this.g_root.append('text')
      .attr('class', 'guid3-slider-text')
      .text(this._label)
      .attr('x', this._width + 2)
      .attr('y', this._height * 0.5)
      .attr('dy', '0.33em')

    text_label.on('change_me', function(){
      d3.select(this).text(self._scale(d3.event.detail).toFixed(2,0))
      console.log('running from change_me event')
      console.log(d3.event)
    })

    var map_scale = d3.scale.linear().domain([0,self._width]).range(self._scale.domain())

    var drag_function = function(d){

      var bounding_node = self.g_root.node().getBoundingClientRect()

      var x,y

      if(d3.event.type === 'drag'){
        x = d3.event.x
        y = d3.event.y
      } else {
        x = d3.event.x - bounding_node.left
        y = d3.event.y - bounding_node.top
      }

      // clamp the input, out of bounds values can break things
      if(x < 0){ x = 0 }
      if(x > self._width) { x = self._width }

      // xTODO make the slider value independent of the domain
      // map the slider width to the scale domain linearly
      // x test this


      // set the width of the indicator
      rect_horizontal_indicator.attr('width', x)

      text_label.node().dispatchEvent(new CustomEvent('change_me', { detail:map_scale(x) } ))


      // set the value of the object itself
      self.object_reference[self.object_key] = self._scale(map_scale(x))


      if(typeof self.callback === 'function'){
        return self.callback(self._scale(map_scale(x)));
      } else {
        return;
      }

    }

    var drag = d3.behavior.drag().on("drag", drag_function);

    rect_slider_bg.call(drag)
    rect_slider_bg.on('mousedown', drag_function)
    this.setValue(this.object_reference[this.object_key])

  } // end of this.create


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
