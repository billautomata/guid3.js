(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function module(cb){
  'use strict';
  var self = this;

  // css hooks
  this._cssClass=' '
  this._cssId=' '

  // internal type
  this._type = 'toggle' // or 'momentary'

  // visual parameters
  this._width = 100
  this._height = 100
  this._roundedPercent = 0

  this._labelText = { on: '1', off: '0' }

  // target value
  this.object_reference     // a reference to the target object
  this.object_key           // the key of the target value
  this.watcher              // Object.observe watcher

  this.callback = cb

  // root group element that events are attached to
  // moved to global scope of the object
  this.g_root = undefined

  // //////////////////////////////////
  // "use functions"
  // can only be called after .create()
  this.toggle = function(){
    this.object_reference[this.object_key] = !this.object_reference[this.object_key]
  }

  this.setValue = function(_){
    this.object_reference[this.object_key] = _
  }

  this.getValue = function(_){
    return this.object_reference[this.object_key];
  }

  // //////////////////////////////////
  // param setters and getters
  this.cssClass = function(_){
    if(!arguments.length) { return this._cssClass; }
    this._cssClass = _
    return this;
  }

  this.cssId = function(_){
    if(!arguments.length) { return this._cssClass; }
    this._cssClass = _
    return this;
  }

  this.height = function(_){
    if(!arguments.length) { return this._height; }
    this._height = _
    return this;
  }

  this.roundedPercent = function(_){
    if(!arguments.length) { return this._roundedPercent; }
    this._roundedPercent = _
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

  this.labelOn = function(_){
    if(!arguments.length) { return this._labelText.on; }
    this._labelText.on = _
    return this;
  }
  this.labelOff = function(_){
    if(!arguments.length) { return this._labelText.off; }
    this._labelText.off = _
    return this;
  }

  // //////////////////////////////////
  // connect & create
  this.connect = function(o,k){
    this.object_reference = o
    this.object_key = k

    this.watcher = new PathObserver(this.object_reference, this.object_key)
    this.watcher.open(function(fresh,old){
      // update the slider visual
      // console.log('fresh',fresh,'old',old)
      var v = fresh
      if(self.g_root === undefined){
        self._internal_value = v
      } else {
        self.g_root.node().dispatchEvent(new CustomEvent('changed', { detail:v } ))
      }
    })

    return this;
  }

  this.create = function(selection){

    var svg = selection

    this.g_root = svg.append('g')
      .attr('class', this._cssClass)
      .attr('id', this._cssId)
      // .attr('width', this._width)
      // .attr('height', this._height)

    this.g_root.classed('parent', true)

    this.g_root.on('changed', function(){
      console.log(d3.event.detail)

      if(!d3.event.detail){
        rect_button.classed('guid3-button-inactive', true)
      } else {
        rect_button.classed('guid3-button-inactive', false)
      }

      // update the label
      text_value.node().dispatchEvent(new CustomEvent('change_me', { detail: {} } ))
    })

    var rect_button = this.g_root.append('rect')
      .classed('guid3-button', true)
      .attr('x',0)
      .attr('y',0)
      .attr('rx', (this._roundedPercent*0.05) + '%')
      .attr('ry', (this._roundedPercent*0.05) + '%')
      .attr('width', this._width)
      .attr('height', this._height)

    if(self._type === 'toggle'){
      this.g_root.on('mousedown', function(){
        self.object_reference[self.object_key] = !self.object_reference[self.object_key]
      })
    } else {
      this.g_root.on('mousedown', function(){
        self.object_reference[self.object_key] = !self.object_reference[self.object_key]
      })
      this.g_root.on('mouseup', function(){
        self.object_reference[self.object_key] = !self.object_reference[self.object_key]
      })
    }

    // text label
    var text_value = this.g_root.append('text')
      .attr('class', 'guid3-button-text')
      .text(this._labelText.on)
      .attr('x', this._width * 0.5)
      .attr('y', this._height * 0.5)
      .attr('dy', '0.333em')
      .attr('text-anchor', 'middle')

    text_value.on('change_me', function(){
      if(self.object_reference[self.object_key]){
        text_value.text(self._labelText.on)
      } else {
        text_value.text(self._labelText.off)
      }
    })

    // TODO set the state of the button based on the target

  } // end of this.create


}

},{}],2:[function(require,module,exports){
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
      .attr('width', this._width)
      .attr('height', this._height)
      .style('border', '1px solid black')

    this.g_root.classed('parent', true)

    this.g_root.on('changed', function(){
      console.log('g_root changed fired')
      console.log(d3.event.detail)

      if(self._type === 'horizontal'){
        rect_horizontal_indicator.attr('width', map_scale.invert(self._scale.invert(d3.event.detail)))
      } else {
        var slider_height = map_scale.invert(self._scale.invert(d3.event.detail))

        rect_horizontal_indicator.attr('y', slider_height)
        rect_horizontal_indicator.attr('height', self._height - slider_height)
      }

      text_value.node().dispatchEvent(
        new CustomEvent(
          'change_me',
          { detail: self._scale.invert(d3.event.detail) }
        ))

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

      // set the width of the indicator
      if(self._type === 'horizontal'){
        rect_horizontal_indicator.attr('width', use_value)
      } else {
        rect_horizontal_indicator.attr('y', use_value)
        rect_horizontal_indicator.attr('height', self._height - use_value)
      }

      text_value.node().dispatchEvent(new CustomEvent('change_me', { detail:map_scale(use_value) } ))

      // set the value of the object itself
      self.object_reference[self.object_key] = self._scale(map_scale(use_value))

      if(typeof self._callback === 'function'){
        return self._callback(self._scale(map_scale(use_value)));
      } else {
        return;
      }

    }

    var drag = d3.behavior.drag().on('drag', drag_function);

    rect_slider_bg.call(drag)
    rect_slider_bg.on('mousedown', drag_function)

  } // end of this.create


}

},{}],3:[function(require,module,exports){
window.GUId3 = {}
window.GUId3.button = require('../lib/GUId3.button.js')
window.GUId3.slider = require('../lib/GUId3.slider.js')

},{"../lib/GUId3.button.js":1,"../lib/GUId3.slider.js":2}]},{},[3]);
