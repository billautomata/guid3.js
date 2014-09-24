
// 32 horizontal sliders
window.vert0 = {} // target values

for(var i = 0; i < 32; i++){

  window.vert0['_'+i] = 1.0

  var w = 10
  var h = 200

  var g_parent = window.svg.append('g')
    .attr('transform', 'translate('+(3+(i*(w*1.5)))+',10)')

  var slider = new GUId3.slider(function(v){console.log(v)})

  slider.label('')
  slider.cssClass('vert0')
  slider.type('vertical')

  slider.scale(d3.scale.linear().domain([0,1]).range([32,64]))

  slider.width(w)
  slider.height(h)
  slider.connect(window.vert0,'_'+i)
  slider.create(g_parent)
  slider.setValue(Math.abs(Math.sin(3.14 + (i*0.231)) * 24) + 36)

}

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
slider2.width(600)
slider2.height(30)
slider2.label('speed (ms)')

slider2.connect(timer_duration,'v')

var g_slider2_parent = window.svg.append('g')
  .attr('transform', 'translate(2,220)')

slider2.create(g_slider2_parent)

slider2.setValue(333)

console.log(window.vert0)
