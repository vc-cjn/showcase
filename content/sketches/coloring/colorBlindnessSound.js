let img;
let redAudio;
let blueAudio;
let orangeAudio;
let greenAudio;
let yellowAudio;
let violetAudio;


function preload() {
  img = loadImage('/showcase/sketches/coloring/redflower.jpg');
  soundFormats('mp3');
  redAudio = loadSound("/showcase/sketches/coloring/Red.mp3")
  blueAudio = loadSound("/showcase/sketches/coloring/Blue.mp3")
  orangeAudio = loadSound("/showcase/sketches/coloring/Orange.mp3")
  yellowAudio = loadSound("/showcase/sketches/coloring/Yellow.mp3")
  violetAudio = loadSound("/showcase/sketches/coloring/Violet.mp3")
  greenAudio = loadSound("/showcase/sketches/coloring/Green.mp3")
}

function setup() {
  createCanvas(700,500);
  img.resize(700, 500);
  textFont("Helvetica", 50);
}

function getColor(colorHue) {

  colorHue = hue(colorHue)
  
  if (colorHue > 0 && colorHue < 12) {
    foundColor = "Red";
    redAudio.play();
    return foundColor;
  }
  
  if (colorHue > 12 && colorHue < 33) {
    foundColor = "Orange";
    orangeAudio.play();
    return foundColor;
  }
  
  if (colorHue > 33 && colorHue < 67) {
    foundColor = "Yellow";
    yellowAudio.play();
    return foundColor;
  }
  
  if (colorHue > 67 && colorHue < 165) {
    foundColor = "Green";
    greenAudio.play();
    return foundColor;
  }
  
  if (colorHue > 165 && colorHue < 255) {
    foundColor = "Blue";
    blueAudio.play();
    return foundColor;
  }
  
  if (colorHue > 255 && colorHue < 311) {
    foundColor = "Violet";
    violetAudio.play();
    return foundColor;
  }
  
  if (colorHue > 311) {
    foundColor = "Red";
    redAudio.play();
    return foundColor;
  }
  
}

function draw() {
  background(220);
  image(img, 0, 0, width, height);
  noStroke();


  

}

function mousePressed(){
  
  let pix = img.get(mouseX, mouseY);
  // Get the RGB color for that pixel
  detectedColor = color(red(pix), green(pix), blue(pix));
    fill(0);
  text(getColor(detectedColor), 100,40);
}