/*globals button: true, g_button1: true */

JS.Test.describe('Button', function(){ with(this){

  before(function(){ with(this){
    console.log('before run')

    window.outside_value = 33

    button_observed_object = { v: true }

    svg = d3.select('div#test').append('svg')
      .attr('width', 512)
      .attr('height', 512)

    g_button1 = svg.append('g')
     .attr('transform', 'translate(120,300)')

    // pass in a callback
    button = new GUId3.Button(function(d){

      //console.log('button',button)

      console.log('button test callback', d)

      var s = d3.select(button.g_root.node())
      s.attr('id', 'callback_triggered')
      console.log(d3.select(button.g_root.node()))


    })

    button.cssClass('green_button')
    button.cssId('derrrp')
    button.width(150).height(50).connect(button_observed_object,'v')
    button.type('toggle')
    button.labelOn('state on')
    button.labelOff('=)')
    //button.roundedPercent(10)

    // button1.callback(function(d){console.log(d,'zomg')})

    // create the element on the d3 selection
    button.create(g_button1) // you can also chain the create function at the end


  }})

  after(function(){ with(this){

    console.log('after run')
    svg.remove()
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

    it('calling setValue(false) sets',
    function(resume) { with(this) {

      button.setValue(false)

      var m = setTimeout(function(){

        var classed_inactive = d3.select(button.g_root.node())
          .select('rect').classed('guid3-button-inactive')

          assertEqual(true, classed_inactive)
          assertNotEqual(false, classed_inactive)

        resume()

      },100)
    }})

    it('calling setValue() invokes the callback chain',
    function(resume) { with(this) {

      console.log('setting the value')

      button.setValue(false)

      var m = setTimeout(function(){

        assertEqual('callback_triggered',
          d3.select(button.g_root.node()).attr('id'))
        assertNotEqual('zemw',
          d3.select(button.g_root.node()).attr('id'))
        assertNotEqual(undefined,
          d3.select(button.g_root.node()).attr('id'))
        assertNotEqual(null,
          d3.select(button.g_root.node()).attr('id'))

        resume()

      },200)
    }})

  }})


  //
  describe('custom functionality', function(){ with(this){

    it('calling toggle() changes the target object from false -> true', function(resume) { with(this) {

      //assertEqual(false, button_observed_object.v)
      button.setValue(false)
      button.toggle()

      setTimeout(function(){
          assertEqual( true, button_observed_object.v)
          resume()
      },100)

    }})


    it('calling toggle() changes the target object from true -> false', function(resume) { with(this) {

      //assertEqual(false, button_observed_object.v)
      button.setValue(true)
      button.toggle()

      setTimeout(function(){
          assertEqual( false, button_observed_object.v)
          resume()
      },100)

    }})

  }})



}})
