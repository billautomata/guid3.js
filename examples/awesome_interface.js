


// 32 horizontal sliders

window.svg.append('rect')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 840)
  .attr('height', 255)
  .attr('fill', '#fafafa')
  .attr('stroke', '#c5c5c5')

window.ellipseDimensions = { x: 10, y: 10 }
window.vert0 = {} // target values

var n_sliders = 32
for(var i = 0; i < n_sliders; i++){
  window.vert0['_'+i] = Math.random()
}

Object.keys(window.vert0).forEach(function(k,key_index){


  window.vert0['_'+key_index] = 1.0

  var w = 10
  var h = 200

  var g_parent = window.svg.append('g')
    .attr('transform', 'translate('+(10+(key_index*(w*1.5)))+',10)')



  var slider = new GUId3.slider(function(v){
  //  console.log(v)
    console.log(key_index)

    if(key_index % 2 === 0){
      target_ellipse.attr('ry', v)
    } else {
      target_ellipse.attr('rx', v)
    }

  })

  slider.label('')
  slider.cssClass('vert0')
  slider.type('vertical')

  slider.scale(d3.scale.linear().domain([0,1]).range([32,64]))

  slider.width(w)
  slider.height(h)
  slider.connect(window.vert0,'_'+key_index)
  slider.create(g_parent)
  slider.setValue(Math.abs(Math.sin(3.14 + (key_index*0.231)) * 24) + 36)

})

window.counter_stepper = { i: 0 }
for(window.counter_stepper.i = 0; window.counter_stepper.i < 32; window.counter_stepper.i++){

}

// slider target ellipse
var g_target_ellipse_parent = window.svg.append('g')
  .attr('transform', 'translate(740,128)')

var target_ellipse = g_target_ellipse_parent.append('ellipse')
  .attr('cx', 0)
  .attr('cy', 0)
  .attr('rx', 1)
  .attr('ry', 1)
  .attr('fill', '#676f98')
  .attr('fill-opacity', 0.75)
  .attr('stroke', 'none')



// on off button
var change_interval = setInterval(random_sinusoidal,1000)

var button_target = { v:true }
var timer_duration = { v: 1000 }

var on_off_button = new GUId3.button(function(v){
  if(v){
    random_sinusoidal()
    clearInterval(change_interval)
    change_interval = setInterval(random_sinusoidal,timer_duration.v)
  } else {
    clearInterval(change_interval)
  }
})

on_off_button.labelOn('timer on')
on_off_button.labelOff('timer off')

on_off_button.cssClass('button0')
on_off_button.width(100)
on_off_button.height(100)
on_off_button.roundedPercent(10)

on_off_button.connect(button_target,'v')

var g_button_parent = window.svg.append('g')
  .attr('transform', 'translate(500,-100)')

  g_button_parent.transition()
    .duration(1000)
    .ease('bounce')
    .attr('transform', 'translate(500,110)')


on_off_button.create(g_button_parent)


function random_sinusoidal(){

  var random_offset = Math.random() * 64.0
  var random_multi = Math.random() * 10.0

  for(var i = 0; i < 32; i ++){
    window.vert0['_'+i] = Math.abs(Math.sin(random_offset + (i*random_multi)) * 24) + 36
  }

}


///
var slider2 = new GUId3.slider(function(v){

  if(!on_off_button.getValue()){
    on_off_button.toggle()
  }

  random_sinusoidal()
  clearInterval(change_interval)
  change_interval = setInterval(random_sinusoidal,v)
})

slider2.cssClass('slider2')
slider2.scale(d3.scale.linear().domain([1,100]).range([100,1100]))
slider2.width(825)
slider2.height(30)
slider2.label('speed (ms)')

slider2.connect(timer_duration,'v')

var g_slider2_parent = window.svg.append('g')
  .attr('transform', 'translate(5,220)')

slider2.create(g_slider2_parent)

slider2.setValue(333)

// linear and log scales

var linear_log_target = { v: 1000 }

var slider_linear = new GUId3.slider()
slider_linear.cssClass('slider_linear_log')
slider_linear.width(500).height(22)
slider_linear.label('linear range')
slider_linear.scale(d3.scale.linear().domain([1,100]).range([1,100000]))
slider_linear.connect(linear_log_target, 'v')

var slider_log = new GUId3.slider()
slider_log.cssClass('slider_linear_log')
slider_log.width(500).height(22)
slider_log.label('exp/log range')
slider_log.scale(d3.scale.pow().exponent(4).domain([1,100]).range([1,100000]))
slider_log.connect(linear_log_target, 'v')

linear_log_target.v = 10001

var g_linear_parent = window.svg.append('g')
  .attr('transform', 'translate(5,280)')

slider_linear.create(g_linear_parent)

var g_log_parent = window.svg.append('g')
  .attr('transform', 'translate(5,310)')

slider_log.create(g_log_parent)
