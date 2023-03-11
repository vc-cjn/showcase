let img;

function preload() {
  img = loadImage('/showcase/sketches/redflower.jpg');
}

function setup() {
  createCanvas(700, 500);
  img.resize(700, 500);
  textFont("Helvetica", 50);
}

function getColor(colorHue) {

  colorHue = hue(colorHue)
  
  if (colorHue > 0 && colorHue < 12) {
    foundColor = "Red";
    return foundColor;
  }
  
  if (colorHue > 12 && colorHue < 33) {
    foundColor = "Orange";
    return foundColor;
  }
  
  if (colorHue > 33 && colorHue < 67) {
    foundColor = "Yellow";
    return foundColor;
  }
  
  if (colorHue > 67 && colorHue < 165) {
    foundColor = "Green";
    return foundColor;
  }
  
  if (colorHue > 165 && colorHue < 255) {
    foundColor = "Blue";
    return foundColor;
  }
  
  if (colorHue > 255 && colorHue < 311) {
    foundColor = "Violet";
    return foundColor;
  }
  
  if (colorHue > 311) {
    foundColor = "Red";
    return foundColor;
  }
  
}



function draw() {

  background(220);

  let pix = img.get(mouseX, mouseY);

  image(img, 0, 0, width, height);

  // Get the RGB color for that pixel
  detectedColor = color(red(pix), green(pix), blue(pix));
   
  // Get the hue using the function 
  noStroke();
  fill(255);
  rect(0,0,width, 50);
  fill(0);
  text(getColor(detectedColor), 10,40);
}