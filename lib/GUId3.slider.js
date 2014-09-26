/**
 * A slider interface element.
 *
 * @class Slider
 * @constructor
 */
module.exports = function module(cb){
  'use strict';

  /**
  A reference to `this`
  @property self
  @type {Object}
  @default this
  **/
  var self = this;


  /**
  the CSS `class` of the parent group element

  set with {{#crossLink "Slider/cssClass"}}{{/crossLink}}
  @property _cssClass

  @type {String}
  @default empty string
  **/
  this._cssClass=''

  /**
  the CSS `id` of the parent group element

  set with {{#crossLink "Slider/cssId"}}{{/crossLink}}
  @property _cssId
  @type {String}
  @default empty string
  **/
  this._cssId=''

  /**
  the type of slider, either `'vertical'` or `'horizontal'`

  set with {{#crossLink "Slider/cssType"}}{{/crossLink}}
  @property _type
  @type {String}
  @default 'horizontal'
  **/
  this._type = 'horizontal'

  /**
  the width of the slider in pixels

  set with {{#crossLink "Slider/width"}}{{/crossLink}}
  @property _width
  @type {Number}
  @default '300'
  **/
  this._width = 300

  /**
  the height of the slider in pixels

  set with {{#crossLink "Slider/height"}}{{/crossLink}}
  @property _height
  @type {Number}
  @default '50'
  **/
  this._height = 50


  this._roundedPercent = 0

  /**
  the text label of the slider

  set with {{#crossLink "Slider/label"}}{{/crossLink}}
  @property _label
  @type {String}
  @default empty string
  **/
  this._label = ''

  /**
  the d3 scale of the slider

  set with {{#crossLink "Slider/scale"}}{{/crossLink}}
  @property _scale
  @type {Function}
  @default undefined
  **/
  this._scale = undefined

  // target value
  this.object_reference = undefined  // a reference to the target object
  this.object_key = undefined        // the key of the target value
  this.watcher = undefined           // Object.observe watcher

  /**
  the user facing callback function

  set with {{#crossLink "Slider/callback"}}{{/crossLink}}
  @property _callback
  @type {Function}
  @default undefined
  **/
  this._callback = cb

  // internal value
  this._internal_value = 0           // maybe deprecate

  /**
  the parent group element that the `_cssClass` and `_cssId` are applied to

  use this element to use d3 functions to access internal elements

  @example
      // fade in the text for your sliders
      var slider = new GUId3.slider()
      d3.select(slider.g_root).selectAll('text').opacity(0.0)
      d3.select(slider.g_root).selectAll('text').transition().opacity(1.0)

  set with {{#crossLink "Slider/callback"}}{{/crossLink}}
  @property g_root
  @type {Object}
  @default undefined
  **/
  this.g_root            // group element is the parent container
                                     // of all the objects, target for events

  this.current_transition
  // //////////////////////////////////
  // "use functions"
  // can only be called after .create()

  /**
  Sets the value of the target function.  Invokes the callback chain.

  **can only be called after calling `create()`**

  @method setValue
  @param v{Number} the value mentioned above

  @example
      slider.setValue(3.0)
      // slider target value updates
      // slider visual updates (indicator and text value label)
      // slider callback is invoked

  @return undefined
  */
  this.setValue = function(v){
    // update the target value
    this.object_reference[self.object_key] = v
  }

  /**
  Gets the value of the target.

  **can only be called after calling `create()`**

  @method getValue

  @example
      slider.setValue(3.0)
      console.log(slider.getValue())
      // outputs '3.0'

  @return Number
  */
  this.getValue = function(){
    return this.object_reference[self.object_key];
  }

  /**

  Sets the calback to be invoked when the target value changes because of
  slider interaction, or outside forces.  The callback will receive one
  argument, the scaled value.  Do not change the target object in this
  callback.  You will cause an infinite loop as changing the value will
  retrigger the callback chain.

  @method callback
  @chainable

  @param [f] {Function}
  the callback function mentioned above

  @example
      slider.callback(function(v){ console.log('value changed '+ v) })
      // slider target changes to 1.01
      // outputs 'value changed 1.01'

  @return **Function** `_callback`
  passing no arguments triggers the return, this terminates the chain

  */
  this.callback = function(f){
    if(!arguments.length) { return this._callback; }
    this._callback = f
    return this;
  }

  /**
  Sets the CSS class of the parent group element of the slider.

  @method cssClass
  @chainable

  @param _ {String}
  the CSS class mentioned above

  @example
      slider.cssClass('foo')
      slider.create(d3.select('svg'))

  in your stylesheet

      .foo .gui-slider {
        fill: red;
        stroke: orange;
      }

  creates a slider with red background and an orange stroke

  @return **String** `_cssClass`
  passing no arguments triggers the return, this terminates the chain

  */
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



    ObserveUtils.defineObservableProperties(this.object_reference,this.object_key)

    Object.observe(this.object_reference, function(changes){

      // console.log(self.object_key)

      changes.forEach(function(change,change_index){
        if(change.name === self.object_key){
          // console.log(self.object_key, 'new value', change.object[self.object_key])

          // update the slider visual
          var v = change.object[self.object_key]
          if(self.g_root === undefined){
            self._internal_value = v
          } else {
            self.g_root.node().dispatchEvent(new CustomEvent('changed', { detail:v } ))
          }

        }
      })


      // console.log('changes')
      // console.log(changes)
    })

    // this.watcher = new PathObserver(this.object_reference, this.object_key)
    // this.watcher.open(function(fresh,old){
    // })

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

      // console.log('g_root changed fired')
      // console.log('value passed', d3.event.detail)

      if(self._type === 'horizontal'){

        if(self._drag){
          rect_horizontal_indicator
            .attr('width', map_scale.invert(self._scale.invert(d3.event.detail)))
        } else {
          rect_horizontal_indicator.transition().duration(150)
            .attr('width', map_scale.invert(self._scale.invert(d3.event.detail)))
        }


      } else {
        var slider_height = map_scale.invert(self._scale.invert(d3.event.detail))

        if(self._drag){
          rect_horizontal_indicator
            .attr('y', slider_height)
            .attr('height', self._height - slider_height)
        } else {
          rect_horizontal_indicator.transition().duration(150)
            .attr('y', slider_height)
            .attr('height', self._height - slider_height)
        }

      }

      self._drag = false

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

      // console.log('here')
      // console.log(d3.event)

      var bounding_node = self.g_root.node().getBoundingClientRect()
      // console.log(bounding_node)

      if(!d3.event.clientX){
        d3.event.clientX = d3.event.x
        d3.event.clientY = d3.event.y
      }

      var x,y

      if(d3.event.type === 'drag'){
        x = d3.event.clientX  // or .layerX
        y = d3.event.clientY  // or .layerY
      } else {
        x = d3.event.clientX - bounding_node.left
        y = d3.event.clientY - bounding_node.top
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

      // console.log('use_value',use_value)

      // set the value of the object itself
      // this triggers the callback on g_root.on('changed')
      self.object_reference[self.object_key] = self._scale(map_scale(use_value))

    }

    var drag = d3.behavior.drag().on('drag', function(){
      self._drag=true
      drag_function()
    });

    rect_slider_bg.call(drag)
    rect_slider_bg.on('mousedown', function(){
        self._drag = false
        drag_function()
    })

  } // end of this.create


}
