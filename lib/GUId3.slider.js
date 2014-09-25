module.exports = function module(cb){
  'use strict';
  var self = this;

  // css hooks
  this._cssClass=''
  this._cssId=''

  // internal type reference
  this._type = 'horizontal' // or vertical

  // visual attributes not set by CSS
  this._width = 300
  this._height = 50
  this._roundedPercent = 0

  this._label = undefined            // text used in the label box

  // math stuffs
  this._scale = undefined

  // target value
  this.object_reference = undefined  // a reference to the target object
  this.object_key = undefined        // the key of the target value
  this.watcher = undefined           // Object.observe watcher

  // callback
  this._callback = cb                 // the callback that is run

  // internal value
  this._internal_value = 0           // maybe deprecate

  this.g_root            // group element is the parent container
                                     // of all the objects, target for events

  // //////////////////////////////////
  // "use functions"
  // can only be called after .create()
  this.setValue = function(v){
    // update the target value
    this.object_reference[self.object_key] = v
  }

  this.getValue = function(){
    return this.object_reference[self.object_key];
  }

  // //////////////////////////////////
  // param setters and getters
  // can be called before and after .create()

  this.callback = function(_){
    if(!arguments.length) { return this._callback; }
    this._callback = _
    return this;
  }

  this.cssClass = function(_){
    if(!arguments.length) { return this._cssClass; }
    this._cssClass = _
    return this;
  }

  this.cssId = function(_){
    if(!arguments.length) { return this._cssId; }
    this._cssId = _
    return this;
  }

  this.height = function(_){
    if(!arguments.length) { return this.height; }
    this._height = _
    return this;
  }

  this.label = function(_){
    if(!arguments.length) { return this._label; }
    this._label = _
    return this;
  }

  this.roundedPercent = function(_){
    if(!arguments.length) { return this._roundedPercent; }
    this._roundedPercent = _
    return this;
  }

  this.scale = function(_){
    if(!arguments.length) { return this._scale; }
    this._scale = _
    return this;
  }

  this.type = function(_){
    if(!arguments.length) { return this._type; }
    this._type = _
    return this;
  }

  this.width = function(_){
    if(!arguments.length) { return this._width; }
    this._width = _
    return this;
  }

  // //////////////////////////////////
  // connect & create
  //
  this.connect = function(o,k){
    this.object_reference = o
    this.object_key = k

    this.watcher = new PathObserver(this.object_reference, this.object_key)
    this.watcher.open(function(fresh,old){
      // update the slider visual
      var v = fresh
      if(self.g_root === undefined){
        self._internal_value = v
      } else {
        self.g_root.node().dispatchEvent(new CustomEvent('changed', { detail:v } ))
      }
    })

    return this;
  }

  //
  this.create = function(selection){

    var svg = selection

    this.g_root = svg.append('g').attr('id', 'slider_root')
      .attr('class', this._cssClass)
      .attr('id', this._cssId)
      .attr('width', this._width)
      .attr('height', this._height)
      .style('border', '1px solid black')

    this.g_root.classed('parent', true)

    this.g_root.on('changed', function(){

      //console.log('g_root changed fired')
      //console.log('value passed', d3.event.detail)

      if(self._type === 'horizontal'){

        rect_horizontal_indicator
          .attr('width', map_scale.invert(self._scale.invert(d3.event.detail)))

      } else {
        var slider_height = map_scale.invert(self._scale.invert(d3.event.detail))

        rect_horizontal_indicator
          .attr('y', slider_height)
          .attr('height', self._height - slider_height)

      }

      text_value.node().dispatchEvent(
        new CustomEvent(
          'change_me',
          { detail: self._scale.invert(d3.event.detail) }
      ))

      if(typeof self._callback === 'function'){
        return self._callback(d3.event.detail);
      } else {
        return;
      }

    })  // end of g_root.on('changed')

    var rect_slider_bg = this.g_root.append('rect')
      .attr('class', 'guid3-slider')
      .attr('x',0)
      .attr('y',0)
      .attr('rx', (this._roundedPercent*0.05) + '%')
      .attr('ry', (this._roundedPercent*0.05) + '%')
      .attr('width', this._width)
      .attr('height', this._height)

    // horizontal slider
    var rect_horizontal_indicator = this.g_root.append('rect')
      .attr('class', 'guid3-slider-indicator')
      .attr('x',0)
      .attr('y',0)
      .attr('rx', (this._roundedPercent*0.05) + '%')
      .attr('ry', (this._roundedPercent*0.05) + '%')
      .attr('width', this._width)
      .attr('height', this._height)
      .style('pointer-events', 'none')

    // create the label
    var g_root_text_label = this.g_root.append('g')
      .attr('transform', 'translate(0,0)')

    var text_label = g_root_text_label.append('text')
      .attr('class', 'guid3-slider-textlabel')
      .text(this._label)
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '0.33em')

    // create the value indicator
    var g_root_text_value = this.g_root.append('g')
      .attr('transform', 'translate(' + (this._width + 2) + ',' + (this._height * 0.5) + ')')

    var text_value = g_root_text_value.append('text')
      .attr('class', 'guid3-slider-textvalue')
      .text(function(){ return self.getValue() })
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '0.33em')

    if(self._type === 'vertical'){
      text_value.attr('x',0)
      text_value.attr('y',0)
      text_value.attr('transform', 'translate('+(self._width*0.5)+','+(self._height * 0.52)+')')
      text_value.attr('text-anchor', 'middle')
    }

    text_value.on('change_me', function(){
      d3.select(this).text(self._scale(d3.event.detail).toFixed(2,0))
    })

    var map_scale = d3.scale.linear().domain([0,self._width]).range(self._scale.domain())
    if(self._type !== 'horizontal'){
      map_scale = d3.scale.linear().domain([self._height,0]).range(self._scale.domain())
    }

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
      if(y < 0){ y = 0 }
      if(y > self._height) { y = self._height }

      var use_value
      if(self._type === 'horizontal'){
        use_value = x
      } else {
        use_value = y
      }

      // set the value of the object itself
      // this triggers the callback on g_root.on('changed')
      self.object_reference[self.object_key] = self._scale(map_scale(use_value))

    }

    var drag = d3.behavior.drag().on('drag', drag_function);

    rect_slider_bg.call(drag)
    rect_slider_bg.on('mousedown', drag_function)

  } // end of this.create


}
