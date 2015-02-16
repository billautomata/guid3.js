(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * UI toolkit for D3js
 *
 * @module GUId3
 * @main GUId3
 */
window.GUId3 = {}
window.GUId3.Button = require('./GUId3.button.js')
window.GUId3.Slider = require('./GUId3.slider.js')

},{"./GUId3.button.js":2,"./GUId3.slider.js":3}],2:[function(require,module,exports){
/**
 * A button interface element.
 *
 * @class Button
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

  set with {{#crossLink "Button/cssClass"}}{{/crossLink}}
  @property _cssClass

  @type {String}
  @default empty string
  **/
  this._cssClass=' '

  /**
  the CSS `id` of the parent group element

  set with {{#crossLink "Button/cssId"}}{{/crossLink}}
  @property _cssId

  @type {String}
  @default empty string
  **/
  this._cssId=' '

  /**
  the type of button, either `'toggle'` or `'momentary'`

  set with {{#crossLink "Button/type"}}{{/crossLink}}
  @property _type
  @type {String}
  @default 'toggle'
  **/
  this._type = 'toggle' // or 'momentary'


  /**
  the width of the button in pixels

  set with {{#crossLink "Button/width"}}{{/crossLink}}
  @property _width
  @type {Number}
  @default '100'
  **/
  this._width = 100
  this._rx = 2
  this._ry = 2

  /**
  the height of the button in pixels

  set with {{#crossLink "Button/height"}}{{/crossLink}}
  @property _height
  @type {Number}
  @default '100'
  **/
  this._height = 100

  /**
  The percent roundedness of the rectangle.  100% round is a circle or ellipse.

  set with {{#crossLink "Button/roundedRectanglePercent"}}{{/crossLink}}
  @property _roundedRectanglePercent
  @type {Number}
  @default '0'
  **/
  this._roundedRectanglePercent = 0

  /**
  The text lable of the button on each state.

  set with {{#crossLink "Button/labelOn"}}{{/crossLink}} and
  {{#crossLink "Button/labelOff"}}{{/crossLink}}
  @property _labelText
  @type {Number}
  @default `{ on: '1', off: '0' }`
  **/
  this._labelText = { on: '1', off: '0' }

  // target value
  this.object_reference     // a reference to the target object
  this.object_key           // the key of the target value

  /**
  the user facing callback function

  set with {{#crossLink "Slider/callback"}}{{/crossLink}}
  @property _callback
  @type {Function}
  @default undefined
  **/
  this._callback = cb
  this._callbackTriggered = false // for testing

  /**
  the parent group element that the `_cssClass` and `_cssId` are applied to

  use this element to use d3 functions to access internal elements

  @example
      // fade in the text for your button
      var button = new GUId3.button()
      d3.select(button.g_root.node()).selectAll('text')
        .attr('opacity', 0.0)
      d3.select(button.g_root.node()).selectAll('text').transition()
        .attr('opacity', 1.0)

  @property g_root
  @type {Object}
  @default undefined
  **/
  this.g_root = undefined

  // //////////////////////////////////
  // "use functions"
  // can only be called after .create()
  this.toggle = function(){
    this.setValue(!this.object_reference[this.object_key])
    // this.object_reference[this.object_key] =
  }

  /**
  Sets the value of the target object.  Invokes the callback chain.

  **can only be called after calling `create()`**

  @method setValue
  @param v {Boolean} the value mentioned above

  @example
      button.setValue(true)
      // button target value updates
      // button visual updates (indicator and text value label)
      // button callback is invoked

  @return undefined
  */
  this.setValue = function(_){
    this.object_reference[this.object_key] = _
    this.g_root.node().dispatchEvent(new CustomEvent('changed', { detail:_ } ))
  }

  /**
  Gets the value of the target.

  **can only be called after calling `create()`**

  @method getValue

  @example
      button.setValue(true)
      console.log(button.getValue())
      // outputs 'true'

  @return Boolean
  */
  this.getValue = function(_){
    return this.object_reference[this.object_key];
  }

  // //////////////////////////////////
  // param setters and getters

  /**

  Sets the calback to be invoked when the target value changes because of
  button interaction, or outside forces.  The callback will receive one
  argument, the boolean value.  Do not change the target object in this
  callback.  You will cause an infinite loop as changing the value will
  retrigger the callback chain.

  @method callback
  @chainable

  @param [f] {Function}
  the callback function mentioned above

  @example
      button.callback(function(v){ console.log('value changed '+ v) })
      // slider target changes to true
      // outputs 'value changed true'

  @return **Function** `_callback`
  passing no arguments triggers the return, this terminates the chain

  */
  this.callback = function(_){
    if(!arguments.length) { return this._callback; }
    this._callback = _
    return this;
  }


  /**
  Sets the CSS class of the parent group element of the button.

  @method cssClass
  @chainable

  @param _ {String}
  the CSS class mentioned above

  @example
      button.cssClass('foo')
      button.create(d3.select('svg'))

  in your stylesheet

      .foo .gui-button {
        fill: red;
        stroke: orange;
      }

  creates a button with red background and an orange stroke

  @return **String** `_cssClass`
  passing no arguments triggers the return, this terminates the chain

  */
  this.cssClass = function(_){
    if(!arguments.length) { return this._cssClass; }
    this._cssClass = _
    return this;
  }

  /**
  Sets the CSS id of the parent group element of the button.

  @method cssClass
  @chainable

  @param _ {String}
  the CSS id mentioned above

  @example
      button.cssId('foo')
      button.create(d3.select('svg'))

  in your stylesheet

      #foo .gui-button {
        fill: red;
        stroke: orange;
      }

  creates a button with red background and an orange stroke

  @return **String** `_cssId`
  passing no arguments triggers the return, this terminates the chain

  */
  this.cssId = function(_){
    if(!arguments.length) { return this._cssClass; }
    this._cssClass = _
    return this;
  }

  /**
  Sets the visual height of the button.  Sadly this property cannot be set
  using CSS.

  @method height
  @chainable

  @param _ {Number}
  the height of the button in pixels

  @example
      var button = new GUId3.button()
      button.height(44)
      button.create(d3.select('svg'))

  creates a button with a height of 44 pixels in the svg

  @return **Number** `_height`
  passing no arguments triggers the return, this terminates the chain

  */
  this.height = function(_){
    if(!arguments.length) { return this._height; }
    this._height = _
    return this;
  }

  /**
  Sets the roundedness of the rectangle of the slider.  A square slider with
  a `roundedRectanglePercent` of 100, would be a circle.  `10` is a good value
  to start with.

  @method roundedRectanglePercent
  @chainable

  @param _ {String}
  the percent roundedness of the slider rectangles

  @example
      var slider = new GUId3.slider()
      slider.width(100).height(100)
      slider.roundedRectanglePercent(100)
      slider.create(d3.select('svg'))

  creates slider that appears to be a circle

  @return **String** `_roundedRectanglePercent`
  passing no arguments triggers the return, this terminates the chain

  */
  this.roundedRectangle = function(_){
    if(!arguments.length) { return [ this._rx, this._ry ]; }
    this._rx = _[0]
    this._ry = _[1]
    return this;
  }

  /**
  Sets the type of the button.  Wants `'toggle'` or `'momentary'`.

  A momentary button triggers a change in the value to true when pressed, and
  triggers a value change to false when released.  A toggle button is toggled
  between states when the button is pressed.  Nothing happens to a toggle
  button when it is released.

  @method type
  @chainable

  @param _ {String}
  the type of the slider, either `'toggle'` or '`momentary`'

  @example
      var button = new GUId3.button()
      button.type('momentary')
      button.create(d3.select('svg'))

  creates a momentary button

  @return **String** `_type`
  passing no arguments triggers the return, this terminates the chain

  */
  this.type = function(_){
    if(!arguments.length) { return this._type; }
    this._type = _
    return this;
  }

  /**
  Sets the visual width of the button.  Sadly this property cannot be set
  using CSS.

  @method width
  @chainable

  @param _ {Number}
  the width of the button in pixels

  @example
      var button = new GUId3.button()
      button.width(44)
      button.create(d3.select('svg'))

  creates a button with a width of 44 pixels in the svg

  @return **Number** `_height`
  passing no arguments triggers the return, this terminates the chain

  */
  this.width = function(_){
    if(!arguments.length) { return this._width; }
    this._width = _
    return this;
  }

  /**
  Sets the text of the label of the slider, when the target value is `true`,
  or the button is considered in the "on" state.

  @method labelOn
  @chainable

  @param _ {String}
  the text label of the slider when it is "on"

  @example
      var slider = new GUId3.slider()
      slider.labelOn('press me to turn off')
      slider.create(d3.select('svg'))

  creates a slider with on label of "press me to turn off" when it is on

  @return **String** `_labelOn`
  passing no arguments triggers the return, this terminates the chain

  */
  this.labelOn = function(_){
    if(!arguments.length) { return this._labelText.on; }
    this._labelText.on = _
    return this;
  }

  /**
  Sets the text of the label of the slider, when the target value is `false`,
  or the button is considered in the "off" state.

  @method labelOn
  @chainable

  @param _ {String}
  the text label of the slider when it is "on"

  @example
      var slider = new GUId3.slider()
      slider.labelOff('I am off =(')
      slider.create(d3.select('svg'))

  creates a slider with on label of "I am off =("

  @return **String** `_labelOff`
  passing no arguments triggers the return, this terminates the chain

  */
  this.labelOff = function(_){
    if(!arguments.length) { return this._labelText.off; }
    this._labelText.off = _
    return this;
  }

  /**
  Connects the button to a target object and a target key.  When the button
  is clicked on, the value of the targetObject[target_key] is changed.

  Call this funcition immediately before calling `create()`

  @method connect
  @chainable

  @param o {Object}
  the target object that holds the value the button will modify

  @param k {String}
  the String name of the key/field of the object that holds the value the
  slider will modify

  @example
      var foo = { bar: false }
      var button = new GUId3.button()
      // ...

      slider.connect(foo,'bar')
      slider.create(d3.select('svg'))

  clicking on the button will change the value of foo

  */
  this.connect = function(o,k){
    this.object_reference = o
    this.object_key = k
    return this;

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

    })

    return this;
  }

  this.noconnect = function(){
    var dummy = { v: 0 }
    this.connect(dummy,'v')
  }

  /**
  Creates the button in the selection passed.  It is advised that you pass in
  a selection of a group element that you can transform and style yourself.

  Call this function after all the parameters are set, and `connect()` has
  been called.  After you call `create()`, you can then call `setValue()` and
  `getValue()` without having any issues.

  @method create
  @chainable

  @param selection {Object}
  A d3 selection.

  @example

      var svg = d3.select('body').append('svg')
      var g_button_parent = svg.append('g')
        .attr('transform', 'translate(303,101)')

      var foo = { bar: true }
      var slider = new GUId3.button()
      // ...

      button.connect(foo,'bar')
      button.create(g_slider_parent)

  Creates a button at position `x: 303 y: 101`, because the parent element
  with a `translate` with those coordinates was passed as the selection.

  */
  this.create = function(selection){

    // connect to dummy value if not connected to a target
    if(!this.object_reference){
      this.noconnect()
    }

    var svg = selection

    this.g_root = svg.append('g')
      .attr('class', this._cssClass)
      .attr('id', this._cssId)

    this.g_root.classed('parent', true)

    this.g_root.on('changed', function(){

      if(!d3.event.detail){
        rect_button.classed('guid3-button-inactive', true)
      } else {
        rect_button.classed('guid3-button-inactive', false)
      }

      // update the label
      text_value.node().dispatchEvent(new CustomEvent('change_me', { detail: {} } ))

      if(typeof self._callback === 'function'){
        return self._callback(d3.event.detail);
      } else {
        return;
      }

    })

    var rect_button = this.g_root.append('rect')
      .classed('guid3-button', true)
      .attr('x',0)
      .attr('y',0)
      .attr('rx', this._rx)
      .attr('ry', this._ry)
      .attr('width', this._width)
      .attr('height', this._height)
      .style('fill', 'white')
      .style('stroke', 'black')

    if(self._type === 'toggle'){

      // TODO - find the nice way to fix this for mobile
      if(screen.width > 560){ 
        this.g_root.on('mousedown', function(){
          self.setValue(!self.object_reference[self.object_key])
        })
      } else {
        this.g_root.on('touchstart', function(){
          self.setValue(!self.object_reference[self.object_key])
        })
      }

    } else {
      this.g_root.on('mousedown', function(){
        self.setValue(!self.object_reference[self.object_key])
      })
      this.g_root.on('touchstart', function(){
        self.setValue(!self.object_reference[self.object_key])
      })
      this.g_root.on('touchend', function(){
        self.setValue(!self.object_reference[self.object_key])
      })
      this.g_root.on('mouseup', function(){
        self.setValue(!self.object_reference[self.object_key])
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
      .style('pointer-events', 'none')

    text_value.on('change_me', function(){
      if(self.object_reference[self.object_key]){
        text_value.text(self._labelText.on)
      } else {
        text_value.text(self._labelText.off)
      }
    })

  } // end of this.create


}

},{}],3:[function(require,module,exports){
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

  set with {{#crossLink "Slider/type"}}{{/crossLink}}
  @property _type
  @type {String}
  @default 'horizontal'
  **/
  this._type = 'horizontal'

  /**
  the transition speed in milliseconds the slider will use when traveling
  to a new position because it has been clicked

  set with {{#crossLink "Slider/transitionSpeed"}}{{/crossLink}}
  @property _transitionSpeed
  @type {Number}
  @default 100
  **/
  this._transitionSpeed = 100

  /**
  the width of the slider in pixels

  set with {{#crossLink "Slider/width"}}{{/crossLink}}
  @property _width
  @type {Number}
  @default '300'
  **/
  this._width = 300
  this._rx = 2
  this._ry = 2

  /**
  the height of the slider in pixels

  set with {{#crossLink "Slider/height"}}{{/crossLink}}
  @property _height
  @type {Number}
  @default '50'
  **/
  this._height = 50

  /**
  the number of digits to display after the decimal point in the displayed
  value on the slider

  set with {{#crossLink "Slider/fixedDecimal"}}{{/crossLink}}
  @property _fixedDecimal
  @type {Number}
  @default '2'
  **/
  this._fixedDecimal = 2

  /**
  The percent roundedness of the rectangle.  100% round is a circle or ellipse.

  set with {{#crossLink "Slider/roundedRectanglePercent"}}{{/crossLink}}
  @property _roundedRectanglePercent
  @type {Number}
  @default '0'
  **/
  this._roundedRectanglePercent = 0

  /**
  the text label of the slider

  set with {{#crossLink "Slider/label"}}{{/crossLink}}
  @property _label
  @type {String}
  @default empty string
  **/
  this._label = ''

  /**
  the number of ticks of the slider

  set with {{#crossLink "Slider/steps"}}{{/crossLink}}
  @property _steps
  @type {Number}
  @default undefined
  **/
  this._steps = undefined

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
      d3.select(slider.g_root.node()).selectAll('text').opacity(0.0)
      d3.select(slider.g_root.node()).selectAll('text')
        .transition().opacity(1.0)

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
  Sets the value of the target object.  Invokes the callback chain.

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
    this.g_root.node().dispatchEvent(new CustomEvent('changed', { detail:v } ))
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

  /**
  Sets the CSS id of the parent group element of the slider.

  @method cssId
  @chainable

  @param _ {String}
  the CSS id mentioned above

  @example
      slider.cssId('foo')
      slider.create(d3.select('svg'))

  in your stylesheet

      #foo .gui-slider {
        fill: red;
        stroke: orange;
      }

  creates a slider with red background and an orange stroke

  @return **String** `_cssId`
  passing no arguments triggers the return, this terminates the chain

  */
  this.cssId = function(_){
    if(!arguments.length) { return this._cssId; }
    this._cssId = _
    return this;
  }

  /**
  Sets the visual height of the slider.  Sadly this property cannot be set
  using CSS.

  @method height
  @chainable

  @param _ {Number}
  the height of the slider in pixels

  @example
      var slider = new GUId3.slider()
      slider.height(44)
      slider.create(d3.select('svg'))

  creates a slider with a height of 44 pixels in the svg

  @return **Number** `_height`
  passing no arguments triggers the return, this terminates the chain

  */
  this.height = function(_){
    if(!arguments.length) { return this._height; }
    this._height = _
    return this;
  }

  /**
  Sets the number of digits to display when the slider displays the text
  representation of the target value.

  @method fixedDecimal
  @chainable

  @param _ {Number}
  number of decimal places to display

  @example
      var slider = new GUId3.slider()
      slider.fixedDecimal(0)
      slider.create(d3.select('svg'))

  creates a slider with value indicator that has no digits after the decimal
  place, so it appears as an integer

  @return **Number** `_fixedDecimal`
  passing no arguments triggers the return, this terminates the chain

  */
  this.fixedDecimal = function(_){
    if(!arguments.length) { return this._fixedDecimal; }
    this._fixedDecimal = _
    return this;
  }

  /**
  Sets the text of the label of the slider.  This is optional, you can manage
  your own labels.

  @method label
  @chainable

  @param _ {String}
  the text label of the slider

  @example
      var slider = new GUId3.slider()
      slider.label('zewmg')
      slider.create(d3.select('svg'))

  creates a slider with label of zemg

  @return **String** `_label`
  passing no arguments triggers the return, this terminates the chain

  */
  this.label = function(_){
    if(!arguments.length) { return this._label; }
    this._label = _
    return this;
  }

  /**
  Sets the number of steps in the slider.  This is only accounts for mouse
  interaction, and does not

  @method steps
  @chainable

  @param _ {String}
  the number of steps in the slider

  @return **String** `_steps`
  passing no arguments triggers the return, this terminates the chain

  */
  this.steps = function(_){
    if(!arguments.length) { return this._steps; }
    this._steps = _
    return this;
  }

  /**
  Sets the roundedness of the rectangle of the slider.  A square slider with
  a `roundedRectanglePercent` of 100, would be a circle.  `10` is a good value
  to start with.

  @method roundedRectanglePercent
  @chainable

  @param _ {String}
  the percent roundedness of the slider rectangles

  @example
      var slider = new GUId3.slider()
      slider.width(100).height(100)
      slider.roundedRectanglePercent(100)
      slider.create(d3.select('svg'))

  creates slider that appears to be a circle

  @return **String** `_roundedRectanglePercent`
  passing no arguments triggers the return, this terminates the chain

  */
  this.roundedRectangle = function(_){
    if(!arguments.length) { return [ this._rx, this._ry ]; }
    this._rx = _[0]
    this._ry = _[1]
    return this;
  }


  /**
  Sets the internal `d3.scale` of the slider.  This is where all of the
  business logic of the slider is performed.  When the user clicks on the
  slider, an internal scale maps the size of the slider to the input domain
  of the `d3.scale` that is set with this function.  Thus the position
  clicked or dragged on the slider always corresponds to the corresponding
  output range of the scale passed to this function.

  An interesting note.  The domain of this scale does not matter.  You could
  enter `[300.1,333.03]` and the slider would re-map the click events to that
  range.  Because `log` scales are not continuous, try to use values in the
  range of `[ 1, <∞ ]`.

  @method scale
  @chainable

  @param _ {Function}
  a valid `d3.scale`

  @example
      var slider = new GUId3.slider()
      slider.scale(d3.scale.linear().domain([1,2]).range([0,100]))
      slider.create(d3.select('svg'))

  Creates a slider that will output a value between 0 and 100 depending on
  where it is clicked.

  @return **String** `_scale`
  passing no arguments triggers the return, this terminates the chain

  */
  this.scale = function(_){
    if(!arguments.length) { return this._scale; }
    this._scale = _
    return this;
  }

  /**
  Sets the type of the slider.  Wants `'vertical'` or `'horizontal'`.

  @method type
  @chainable

  @param _ {String}
  the type of the slider, either `'vertical'` or '`horiztonal`'

  @example
      var slider = new GUId3.slider()
      slider.type('vertical')
      slider.create(d3.select('svg'))

  creates a vertical slider

  @return **String** `_type`
  passing no arguments triggers the return, this terminates the chain

  */
  this.type = function(_){
    if(!arguments.length) { return this._type; }
    this._type = _
    return this;
  }

  /**
  Sets the transition speed of the slider.  The value passed is in
  milliseconds.  This is the duration of the transition that will be used
  when the slider is clicked on or the source value is updated.
  If you want instant movement between positions, effectively no transition,
  pass zero `0` to this method.

  @method transitionSpeed
  @chainable

  @param _ {Number}
  the transition speed in milliseconds

  @example
      var slider = new GUId3.slider()
      slider.transitionSpeed(303)
      slider.create(d3.select('svg'))

  creates a slider with a transition speed of 303ms

  @return **String** `_type`
  passing no arguments triggers the return, this terminates the chain

  */
  this.transitionSpeed = function(_){
    if(!arguments.length) { return this._transitionSpeed; }
    this._transitionSpeed = _
    return this;
  }


  /**
  Sets the visual width of the slider.  Sadly this property cannot be set
  using CSS.

  @method width
  @chainable

  @param _ {Number}
  the width of the slider in pixels

  @example
      var slider = new GUId3.slider()
      slider.width(303)
      slider.create(d3.select('svg'))

  creates a slider with a width of 303 pixels in the svg

  @return **Number** `_width`
  passing no arguments triggers the return, this terminates the chain

  */
  this.width = function(_){
    if(!arguments.length) { return this._width; }
    this._width = _
    return this;
  }

  /**
  Connects the slider to a target object and a target key.  When the slider
  is clicked on, the value of the targetObject[target_key] is changed.

  Call this funcition immediately before calling `create()`

  @method connect
  @chainable

  @param o {Object}
  the target object that holds the value the slider will modify

  @param k {String}
  the String name of the key/field of the object that holds the value the
  slider will modify

  @example
      var foo = { bar: 303.3 }
      var slider = new GUId3.slider()
      // ...

      slider.connect(foo,'bar')
      slider.create(d3.select('svg'))

  clicking on the slider will change the value of foo

  */
  this.connect = function(o,k){

    this.object_reference = o
    this.object_key = k
    return this;

    // ObserveUtils.defineObservableProperties(this.object_reference,this.object_key)
    //
    // Object.observe(this.object_reference, function(changes){
    //
    //   // console.log(self.object_key)
    //
    //   changes.forEach(function(change,change_index){
    //     if(change.name === self.object_key){
    //       //console.log(self.object_key, 'new value', change.object[self.object_key])
    //
    //       // update the slider visual
    //       var v = change.object[self.object_key]
    //       if(self.g_root === undefined){
    //         self._internal_value = v
    //       } else {
    //         self.g_root.node().dispatchEvent(new CustomEvent('changed', { detail:v } ))
    //       }
    //
    //     }
    //   })
    //
    // })
    //
    // return this;
  }

  this.noconnect = function(){
    var dummy = { v: 0 }
    this.connect(dummy,'v')
  }

  /**
  Creates the slider in the selection passed.  It is advised that you pass in
  a selection of a group element that you can transform and style yourself.

  Call this function after all the parameters are set, and `connect()` has
  been called.  After you call `create()`, you can then call `setValue()` and
  `getValue()` without having any issues.

  @method create
  @chainable

  @param selection {Object}
  A d3 selection.

  @example

      var svg = d3.select('body').append('svg')
      var g_slider_parent = svg.append('g')
        .attr('transform', 'translate(303,101)')

      var foo = { bar: 303.3 }
      var slider = new GUId3.slider()
      // ...

      slider.connect(foo,'bar')
      slider.create(g_slider_parent)

  Creates a slider at position `x: 303 y: 101`, because the parent element
  with a `translate` with those coordinates was passed as the selection.

  */
  this.create = function(selection){

    // connect to dummy value if not connected to a target
    if(!this.object_reference){
      this.noconnect()
    }

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


      // convert to a slider size
      // console.log(self._scale.invertExtent(d3.event.detail))

      var true_value = d3.event.detail

      // we need to convert the true value of the slider
      // to the made up value of it's domain

      var scaled_inverted_value = 0
      scaled_inverted_value = self._scale.invert(true_value)

      // console.log('value passed', d3.event.detail.toFixed(2),scaled_inverted_value.toFixed(2))

      if(self._type === 'horizontal'){

        if(self._drag){
          rect_horizontal_indicator
            .attr('width', map_scale.invert(scaled_inverted_value))
        } else {
          rect_horizontal_indicator.transition().duration(self._transitionSpeed)
            .attr('width', map_scale.invert(scaled_inverted_value))
        }

      } else {

        var slider_height = map_scale.invert(scaled_inverted_value)

        if(self._drag){
          rect_horizontal_indicator
            .attr('y', slider_height)
            .attr('height', self._height - slider_height)
        } else {
          rect_horizontal_indicator.transition().duration(self._transitionSpeed)
            .attr('y', slider_height)
            .attr('height', self._height - slider_height)
        }

      }

      self._drag = false

      text_value.node().dispatchEvent(
        new CustomEvent(
          'change_me',
          { detail: scaled_inverted_value }
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
      .attr('rx', this._rx)
      .attr('ry', this._ry)
      .attr('width', this._width)
      .attr('height', this._height)
      .style('fill', 'white')
      .style('stroke', 'black')

    var clip_bg = this.g_root.append('defs').append('clipPath')
        .attr('id', 'cp')
        .append('rect')
        .attr('x',0)
        .attr('y',0)
        .attr('rx', this._rx)
        .attr('ry', this._ry)
        .attr('width', this._width)
        .attr('height', this._height)
        .style('fill', 'white')
        .style('stroke', 'black')

    // horizontal slider
    var rect_horizontal_indicator = this.g_root.append('rect')
      .attr('class', 'guid3-slider-indicator')
      .attr('x',0)
      .attr('y',1)
      .attr('rx', this._rx)
      .attr('ry', this._ry)
      .attr('width', this._width)
      .attr('height', this._height-2)
      //.attr('clip-path', 'url(#cp)')
      .style('pointer-events', 'none')
      .style('fill', 'rgb(200,200,200)')
      .style('stroke', 'none')

    // create the label
    var g_root_text_label = this.g_root.append('g')

    if(self._type === 'horizontal'){
      g_root_text_label.attr('transform', 'translate(4,' + (self._height * 0.5) + ')')
    } else {
      g_root_text_label.attr('transform', 'translate('+(self._width*0.5)+','+ (self._height*1.05) + ')')
    }

    var text_label = g_root_text_label.append('text')
      .attr('class', 'guid3-slider-textlabel')
      .text(this._label)
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '0.33em')
      .style('pointer-events', 'none')
      .style('font-size', '12px')
      .style('font-family', 'monospace')

    if(self._type === 'horizontal'){

    } else {
      text_label.style('text-anchor', 'middle')
    }

    // create the value indicator
    var g_root_text_value = this.g_root.append('g')

    if(self._type === 'horizontal'){
      g_root_text_value.attr('transform',
        'translate('+(self._width-2) + ','+ (self._height * 0.5) + ')')
    } else {
      g_root_text_value.attr('transform',
        'translate('+(self._width*0.5)+','+ (self._height*1.1) + ')')
    }

    var text_value = g_root_text_value.append('text')
      .attr('class', 'guid3-slider-textvalue')
      .text(function(){ return self.getValue() })
      .attr('x', 0)
      .attr('y', 0)
      .attr('dy', '0.33em')
      .style('pointer-events', 'none')
      .style('font-size', '12px')
      .style('font-family', 'monospace')

    if(self._type === 'horizontal'){
      text_value.style('text-anchor', 'end')
    } else {
      text_value.style('text-anchor', 'middle')
    }

    text_value.on('change_me', function(){

      if(typeof d3.event.detail === 'number'){
        d3.select(this).text(self._scale(d3.event.detail).toFixed(self._fixedDecimal))
      } else {
        d3.select(this).text(self._scale(d3.event.detail))
      }

    })

    var map_scale = d3.scale.linear().domain([0,self._width]).range(self._scale.domain())
    if(self._type !== 'horizontal'){
      map_scale = d3.scale.linear().domain([self._height,0]).range(self._scale.domain())
    }

    var drag_function = function(d){

      var bounding_node = self.g_root.node().getBoundingClientRect()

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

      if(self._steps){
        var tick_size
        if(self._type === 'horizontal'){
          tick_size  = self._width / self._steps
        } else {
          tick_size = self._height / self._steps
        }

        use_value = tick_size * Math.floor((use_value+(tick_size*0.5))/tick_size)
      }

      // set the value of the object itself
      // this triggers the callback on g_root.on('changed')
      self.setValue(self._scale(map_scale(use_value)))
      //self.object_reference[self.object_key] = self._scale(map_scale(use_value))

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

},{}]},{},[1]);
