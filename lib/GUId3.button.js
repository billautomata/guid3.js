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

  this.object_reference
  this.object_key
  this.watcher

  this.callback = cb

  // root group element that events are attached to
  // moved to global scope of the object
  this.g_root

  // //////////////////////////////////
  // custom functions
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
