/*globals slider: true */


JS.Test.describe('Slider', function(){ with(this){

    // setup
    before(function(){ with(this){
      console.log('here before')

      window.callback_target = 32
      window.target_object = { value: 0.1 }

      this.svg = d3.select('div#test').append('svg')
        .attr('width', 512)
        .attr('height', 512)

      function constructorCallback(v){
        console.log('testing constructor callback', v)
        window.callback_target = v
      }

      slider = new GUId3.Slider(constructorCallback)

      slider.scale(d3.scale.linear().domain([0,1]).range([0,100]))
      slider.width(200)
      slider.height(20)
      slider.transitionSpeed(0)

      slider.connect(window.target_object, 'value')
      slider.create(this.svg)

    }})

    // destroy
    after(function(){ with(this){
      console.log('after')

      this.svg.remove()
      slider = null

    }})

    describe('internals', function(){ with(this){

      it('self is reference to this', function() { with(this) {
        console.log('in the test')
        assertEqual( slider.self, slider.this)
      }})

    }})

    describe('default properties', function(){ with(this){

      it('has the property _cssClass', function() { with(this) {
        console.log('in the test')
        assertNot( undefined, slider._cssClass )
      }})

      it('has the property _cssId', function() { with(this) {
        assertNot( undefined, slider._cssId )
      }})

      it('has the property _type', function() { with(this) {
        assert( 'horizontal', slider._type )
      }})

    }})

    describe('node creation', function(){ with(this){

      it('has a parent group element node', function() { with(this) {
        assertNotEqual( slider.g_root.node(), null )
      }})

      it('has a child rect element with class guid3-slider', function() { with(this) {
        var selection = d3.select(slider.g_root.node())
                          .select('rect.guid3-slider')
        assertNotEqual( selection.node(), null )
      }})

      it('has a child rect element with class guid3-slider-indicator', function() { with(this) {
        var selection = d3.select(slider.g_root.node())
                          .select('rect.guid3-slider-indicator')
        assertNotEqual( selection.node(), null )
      }})

      it('has a child text element with class guid3-slider-textlabel', function() { with(this) {
        var selection = d3.select(slider.g_root.node())
                          .select('text.guid3-slider-textlabel')
        assertNotEqual( selection.node(), null )
      }})

      it('has a child text element with class guid3-slider-textvalue', function() { with(this) {
        var selection = d3.select(slider.g_root.node())
                          .select('text.guid3-slider-textvalue')
        assertNotEqual( selection.node(), null )
      }})


    }})

    describe('visual accuracy', function(){ with(this){

      it('slider visual width is correct', function() { with(this) {
        var slider_width = parseInt(d3.select(slider.g_root.node())
          .select('rect.guid3-slider').attr('width'))

        assertEqual( slider_width, 200 )
      }})

      it('slider visual height is correct', function() { with(this) {
        var slider_height = parseInt(d3.select(slider.g_root.node())
          .select('rect.guid3-slider').attr('height'))

        assertEqual( slider_height, 20 )
      }})

    }})

    describe('Object.observe functionality', function(){ with(this){

      it('calling setValue changes the target object', function(resume) { with(this) {

        slider.setValue(101.1)

        var m = setTimeout(function(){
          assertEqual( 101.1, window.target_object.value)
          assertNotEqual( 101.2, window.target_object.value)
          resume()
        },0)

      }})

      it('calling setValue(0) correctly sets the width of the slider',
      function(resume) { with(this) {

        slider.setValue(0)

        var m = setTimeout(function(){

          console.log('////////////')
          console.log(d3.select(slider.g_root.node())
            .select('rect.guid3-slider-indicator').attr('width'))

          var slider_width = parseFloat(d3.select(slider.g_root.node())
            .select('rect.guid3-slider-indicator')
            .attr('width'))

          assertEqual(0,slider_width)
          assertNotEqual(1,slider_width)
          resume()
        },100)
      }})

      it('calling setValue(100) correctly sets the width of the slider',
      function(resume) { with(this) {

        slider.setValue(100)

        var m = setTimeout(function(){

          console.log('////////////')
          console.log(d3.select(slider.g_root.node())
            .select('rect.guid3-slider-indicator').attr('width'))

          var slider_width = parseFloat(d3.select(slider.g_root.node())
            .select('rect.guid3-slider-indicator')
            .attr('width'))

          assertEqual(200,slider_width)
          assertNotEqual(210,slider_width)
          assertNotEqual(0,slider_width)

          resume()
        },100)
      }})

      it('calling setValue(50) correctly sets the width of the slider',
      function(resume) { with(this) {

        slider.setValue(50)

        var m = setTimeout(function(){

          console.log('////////////')
          console.log(d3.select(slider.g_root.node())
            .select('rect.guid3-slider-indicator').attr('width'))

          var slider_width = parseFloat(d3.select(slider.g_root.node())
            .select('rect.guid3-slider-indicator')
            .attr('width'))

          assertEqual(100,slider_width)
          assertNotEqual(210,slider_width)
          assertNotEqual(0,slider_width)

          resume()
        },100)
      }})


    }})

}})

console.info('tests done being loaded')
