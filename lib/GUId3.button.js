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
    this.object_reference[this.object_key] = !this.object_reference[this.object_key]
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
  Sets the roundedness of the rectangle of the button.  A square button with
  a `roundedRectanglePercent` of 100, would be a circle.  `10` is a good value
  to start with.

  @method roundedRectanglePercent
  @chainable

  @param _ {String}
  the percent roundedness of the button rectangles

  @example
      var button = new GUId3.button()
      button.width(100).height(100)
      button.roundedRectanglePercent(100)
      button.create(d3.select('svg'))

  creates button that appears to be a circle

  @return **String** `_roundedRectanglePercent`
  passing no arguments triggers the return, this terminates the chain

  */
  this.roundedRectanglePercent = function(_){
    if(!arguments.length) { return this._roundedRectanglePercent; }
    this._roundedRectanglePercent = _
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
      .attr('rx', (this._roundedRectanglePercent*0.05) + '%')
      .attr('ry', (this._roundedRectanglePercent*0.05) + '%')
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
