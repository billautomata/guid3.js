JS.Test.describe('Slider', function(){ with(this){

    before(function(){ with(this){
      console.log('here before')

      svg = d3.select('div#test').append('svg')
        .attr('width', 512)
        .attr('height', 512)

      slider = new GUId3.slider()

      slider.scale(d3.scale.linear().domain([0,1]).range([0,100]))
      slider.width(200)
      slider.height(20)

      window.target_object = { value: 0.1 }

      slider.connect(window.target_object, 'value')
      slider.create(svg)

      slider.setValue(10)

    }})

    after(function(){ with(this){
      console.log('after')

      svg.remove()
      slider = null

    }})


    it('self is reference to this', function() { with(this) {
      console.log('in the test')
      assertEqual( slider.this , slider.self )
    }})

    it('has the property _cssClass', function() { with(this) {
      console.log('in the test')
      assertNot( slider._cssClass, undefined )
    }})

    it('has the property _cssId', function() { with(this) {
      assertNot( slider._cssId, undefined )
    }})

    it('has the property _type', function() { with(this) {

      assert( slider._type, 'horizontal' )
    }})

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

console.info('tests done being loaded')
