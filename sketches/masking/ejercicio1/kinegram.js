let numImages = 3;
let images = [];
let kinegram;
let slitWidth = 5;
let gridX = 0;

let barWidthSlider;
let barSpacingSlider;
let gridSpeedSlider;
let numBarsSlider;

let labelColor='white';

function preload() {
  for (let i = 0; i < numImages; i++) {
    images[i] = loadImage(`/showcase/sketches/masking/ejercicio1/mario${i + 1}.png`);
  }
}

function setup() {
  createCanvas(400, 500);
  kinegram = generateKinegram(images, slitWidth);

  barWidthSlider = createSlider(1, 20, 5,0.1);
  barWidthSlider.position(160, 20);
  let labelBarWidth = createElement('label', 'Ancho de barras:');
  labelBarWidth.position(15, 20);
  labelBarWidth.style('color',labelColor);

  barSpacingSlider = createSlider(1, 20, 5,0.1);
  barSpacingSlider.position(160, 50);
  let labelBarSpacing = createElement('label', 'Espacio entre barras:');
  labelBarSpacing.position(15, 50);
  labelBarSpacing.style('color',labelColor);

  gridSpeedSlider = createSlider(0, 0.5, 0.1,0.001);
  gridSpeedSlider.position(160, 80);
  let labelGridSpeed = createElement('label', 'Velocidad de máscara:');
  labelGridSpeed.position(15, 80);
  labelGridSpeed.style('color',labelColor);

  numBarsSlider = createSlider(1, 100, 20, 1);
  numBarsSlider.position(160, 110);
  let labelNumBars = createElement('label', 'Número de barras:');
  labelNumBars.position(15, 110);
  labelNumBars.style('color',labelColor);
  
  let labelName = createElement('label', 'KINEGRAMA COMÚN');
  labelName.position(115, 410);
  labelName.style('color',labelColor);
}

function draw() {
  background(0);
  image(kinegram, width / 2 - kinegram.width / 2, height / 2 - kinegram.height / 2);
  drawGrid();
  updateGrid();
}

function drawGrid() {
  push();
  let barWidth = barWidthSlider.value();
  let barSpacing = barSpacingSlider.value();
  let numBars = numBarsSlider.value();
  translate(width / 2 - kinegram.width / 2 + gridX, height / 2 - kinegram.height / 2);
  for (let i = 0; i < numBars; i++) {
    let x = i * (barWidth + barSpacing) - ((numBars - 20) * (barWidth + barSpacing));
    fill(0);
    noStroke();
    rect(x, 0, barWidth, kinegram.height);
  }
  pop();
}

function updateGrid() {
  let gridSpeed = gridSpeedSlider.value();
  gridX += gridSpeed;
  let barWidth = barWidthSlider.value();
  let barSpacing = barSpacingSlider.value();
  if (gridX >= (barWidth + barSpacing)) {
    gridX = 0;
  }
}

function generateKinegram(frames, slitWidth) {
  let kinegram = createImage(frames[0].width, frames[0].height);
  kinegram.loadPixels();

  for (let i = 0; i < frames.length; i++) {
    frames[i].loadPixels();
    if (frames[0].width != frames[i].width && frames[0].height == frames[i].height) {
      console.log("image dimensions are not consistent");
      return null;
    }
  }

  for (let x = 0; x < kinegram.width; x++) {
    for (let y = 0; y < kinegram.height; y++) {
      let imgIndex = int(x / slitWidth) % frames.length;
      kinegram.set(x, y, frames[imgIndex].get(x, y));
    }
  }
  kinegram.updatePixels();

  return kinegram;
}
