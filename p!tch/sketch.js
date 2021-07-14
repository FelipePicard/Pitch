/* Hi there. Welcome to "P1TCH!".
"P1TCH!" is a game designed to train
your musical sight reading skills.
Each time you see the quaver moving on
the sheet music, you must play that note
in your instrument.
This project is still being developed and
so far I've just tested it with a piano and
even on the piano the scoring part isn't always
accurate. Depending on your instrument and skills
you can change the frequency of the notes in the array
"frequencies" (line 39) and the time it takes for the quaver to move
in setInterval(tune, ----) (line 68).
*/


var img, img2,correct, title, h;
var maxAmp = 0;
var loudestFreq =0;
var frequency;

// positions, tone and points:
var c4 = 336,
    d4 = 330,
    e4 = 324,
    f4 = 318,
    g4 = 312,
    a4 = 306,
    b4 = 300,
    c5 = 294,
    d5 = 288,
    e5 = 282,
    f5 = 276,
    g5 = 270,
    a5 = 264,
    tone=336,
    points=0;

// arrays with positions and frequencies:
var pos= [c4,d4,e4,f4,g4,a4,b4,c5,d5,e5,f5,g5,a5];
var frequencies= [522,586,660,699,785,880,990,1050,1180,1320,1402,1574,1768];
var options= [0,1,2,3,4,5,6,7,8];//,9,10,11,12];
var tolerance = 60;

// screen's width and height:
const xend = 400;
const yend = 595;


function preload(){
  img = loadImage('treble.png');
  img2 = loadImage('quaver.png');
  soundFormats('wav');
  correct = loadSound('correct.wav');
}

function setup() {
  // creating the canvas:
  createCanvas(xend, yend);
  
  frameRate(30);
  // setting up the microphone:
  mic = new p5.AudioIn();
   fft = new p5.FFT(0.8, 8192);
   fft.setInput(mic);
  
    // run function "tune" every 5 seconds:
  	setInterval(display, 5000);
  
  function display(){
  background(225, 210, 130);
  textSize(30);
  text('P1TCH!', 30,60);
    
  
  image(img, -20, 216, 110, 160);
  
  // sheet music lines:
  strokeWeight(2);
  line(158, c4, 188,c4);
  line(0, e4, xend,e4);
  line(0, g4, xend,g4);
  line(0, b4, xend,b4);
  line(0, d5, xend,d5);
  line(0, f5, xend,f5);
  line(158, a5, 188,a5);
	
  // generate random notes:
 tone = random(options);
 image(img2, 150, pos[tone]-52, 60,60);
    
     textSize(20);
  text('Score: '+points, 280, 60);
    
} 

}

function draw(){
  // getting the frequency of the loudest sound:
  mic.start();
  	
   var nyquist = sampleRate() / 2; // 22050
    var spectrum = fft.analyze(); // array of amplitudes in bins
    maxAmp = 0;
    var numberOfBins = spectrum.length;
    var largestBin;
    for (var i = 0; i < numberOfBins; i++) {
        var thisAmp = spectrum[i]; // amplitude of current bin
        if (thisAmp > maxAmp) {
            maxAmp = thisAmp;
            largestBin = i;
        }
    }
  
  // printing the frequency:	
  frequency = largestBin * (nyquist / numberOfBins);
    
  // eliminating low-volume frequencies that may interfere with the score:
  if(frequency > 470){
  loudestFreq = frequency;
}
  
  print("loudest frequency =", loudestFreq);
  
  // this is a wierd timer to make the hear() function run only once every new note
  if(frameCount%149 == 0){
     hear();
     frameCount=0;
    }
}


function hear(){
 if(maxAmp >100){
   for(var i = 1; i<5; i++){
     var higher_octaves = (frequencies[tone] * i)
     var lower_octaves = (frequencies[tone] / i) 
   if(loudestFreq>=(higher_octaves -tolerance) && loudestFreq<=(higher_octaves +tolerance)||loudestFreq>=(lower_octaves -tolerance) && loudestFreq<=(lower_octaves +tolerance)){
     points++;
     correct.setVolume(0.5);
  	 correct.play();
     }
   }
  }
}
