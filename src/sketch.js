var wave;
var tempo = 120;
var interval = 60/tempo * 1000;
var toggled = false;

function setup() {
  createCanvas(400, 400);
  wave = new p5.Oscillator();
 

  wave.freq(1175);
    setInterval(()=>{
        wave.amp(1);

      setTimeout(()=>{
wave.amp(0)   },50)
    },interval)
}


function draw() {
  background(220);

  

}
function mouseClicked(){
  toggled = !toggled
  toggled ? wave.start() : wave.stop()
}
