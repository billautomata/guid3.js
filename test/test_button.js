/*globals button: true, g_button1: true */

JS.Test.describe('Button', function(){ with(this){

  before(function(){ with(this){

    window.button_obser1 = { v: true }

    this.svg = d3.select('div#test').append('svg')
      .attr('width', 512)
      .attr('height', 512)

    g_button1 = this.svg.append('g')
     .attr('transform', 'translate(120,300)')

    // pass in a callback
    button = new GUId3.Button(function(d){console.log('from callback button 1',d)})

    button.cssClass('green_button')
    button.width(150).height(50).connect(window.button_obser1,'v')
    button.type('toggle')
    button.labelOn('state on')
    button.labelOff('=)')
    //button.roundedPercent(10)

    // button1.callback(function(d){console.log(d,'zomg')})

    // create the element on the d3 selection
    button.create(g_button1) // you can also chain the create function at the end

  }})

  after(function(){ with(this){

    this.svg.remove()
    button = null

  }})

  describe('internals', function(){ with(this){

    it('self is reference to this', function() { with(this) {
      console.log('in the test')
      assertEqual( button.self, button.this )
    }})

  }})

  describe('default properties', function(){ with(this){

    it('has the property _cssClass', function() { with(this) {
      console.log('in the test')
      assertNot( undefined, button._cssClass )
    }})

    it('has the property _cssId', function() { with(this) {
      assertNot( undefined, button._cssId  )
    }})

    it('has the property _type', function() { with(this) {
      assert( 'toggle', button._type )
    }})

  }})

  describe('node creation', function(){ with(this){

    it('has a parent group element node', function() { with(this) {
      assertNotEqual( null, button.g_root.node() )
    }})
    //
    it('has a child rect element with class guid3-button', function() { with(this) {
      var selection = d3.select(button.g_root.node())
                        .select('rect.guid3-button')
      assertNotEqual( null, selection.node() )
    }})

    it('has a child text element with class guid3-button-text', function() { with(this) {
      var selection = d3.select(button.g_root.node())
                        .select('text.guid3-button-text')
      assertNotEqual( null, selection.node() )
    }})

  }})

  describe('Object.observe functionality', function(){ with(this){

    it('calling setValue changes the target object', function() { with(this) {

      button.setValue(false)
      assertEqual( false, window.button_obser1.v)
      button.setValue(true)
      assertEqual( true, window.button_obser1.v)

    }})

  }})

  describe('custom functionality', function(){ with(this){

    it('calling toggle() changes the target object', function() { with(this) {

      button.toggle()
      assertEqual( false, window.button_obser1.v)
      button.toggle()
      assertEqual( true, window.button_obser1.v)

    }})

  }})


}})
