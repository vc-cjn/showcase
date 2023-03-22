let scaleFactor = 0.7; // Factor de escala para ajustar todos los elementos
let sounds = {};
let colors = ["blue", "green", "red", "purple", "orange", "pink", "gray", "yellow"];
let matrix = [];
let matrixLabels = ["Tambor1", "Tambor2", "Tambor3", "Tambor4", "Tambor5", "Tambor6", "Tambor7", "Tambor8"];
let lineX = 100;
let columnIndex = 0;
let interval;
let activeColors = [];
let currentSpeed = 1;

let colorToSound = {
  "blue": "Tambor1",
  "green": "Tambor2",
  "red": "Tambor3",
  "purple": "Tambor4",
  "orange": "Tambor5",
  "pink": "Tambor6",
  "gray": "Tambor7",
  "yellow": "Tambor8"
};

function preload() {
  for (let i = 1; i <= 8; i++) {
    sounds[`Tambor${i}`] = loadSound(`/showcase/sketches/masking/ejercicio1/Tambor${i}.wav`);
  }
}

function setup() {
  createCanvas(1000 * scaleFactor, 700 * scaleFactor);
  let title = createElement('label', 'Kinegrama Acústico');
  title.position(500 * scaleFactor, 10 * scaleFactor);
  for (let i = 0; i < 8; i++) {
    let row = [];
    for (let j = 0; j < 16; j++) {
      row.push({x: (50 * j + 150) * scaleFactor, y: (50 * i + 50) * scaleFactor, color: "transparent", sound: `Tambor${i+1}`});
    }
    matrix.push(row);
  }

  let playButton = createButton('Iniciar/Pausar');
  playButton.position(150 * scaleFactor, 480 * scaleFactor);
  playButton.mousePressed(togglePlay);

  // Crea el input de velocidad
  let speedInput = createInput();
  let labelspeed = createElement('label', 'Velocidad:');
  labelspeed.position(150 * scaleFactor, 520 * scaleFactor);
  speedInput.attribute('type', 'range');
  speedInput.attribute('min', 1);
  speedInput.attribute('max', 10);
  speedInput.attribute('value', 1);
  speedInput.input(updateSpeed);
  speedInput.position(280 * scaleFactor, 520 * scaleFactor);

  // Crea el control deslizante de volumen
  let volumeLabel = createElement('label', 'Volumen:');
  volumeLabel.position(150 * scaleFactor, 560 * scaleFactor);

  let volumeSlider = createSlider(0, 1, 0.5, 0.01);
  volumeSlider.position(280 * scaleFactor, 560 * scaleFactor);
  volumeSlider.input(updateVolume);

  // Crea el control deslizante de cantidad de barras
  let barsLabel = createElement('label', 'Cant. Barras:');
  barsLabel.position(150 * scaleFactor, 600 * scaleFactor);

  let barsSlider = createSlider(1, 10, numRectangles, 1);
  barsSlider.position(280 * scaleFactor, 600 * scaleFactor);
  barsSlider.input(updateBars);
}

function updateSpeed() {
  currentSpeed = this.value();
  clearInterval(interval);
  if (playing) {
    interval = setInterval(moveColumn, 1000 / currentSpeed);
  }
}



function updateVolume() {
  let volume = this.value();
  for (let i = 1; i <= 8; i++) {
    sounds[`Tambor${i}`].setVolume(volume);
  }
}

function updateBars() {
  numRectangles = this.value();
}

let playing = false;

function togglePlay() {
  playing = !playing;
  if (playing) {
    interval = setInterval(moveColumn, 1000 / currentSpeed);
  } else {
    clearInterval(interval);
  }
}


let numRectangles = 1;
let rectangleSpacing = 100; // Espaciado entre rectángulos

function moveColumn() {
  columnIndex = (columnIndex + 1) % 16;

  // Reproduce los sonidos de la columna actual para cada rectángulo
  for (let k = 0; k < numRectangles; k++) {
    let currentColumnIndex = (columnIndex - k * rectangleSpacing / 50) % 16;
    if (currentColumnIndex < 0) currentColumnIndex += 16; // Asegura que el índice sea positivo

    for (let i = 0; i < matrix.length; i++) {
      let box = matrix[i][currentColumnIndex];
      if (box.color !== "transparent") {
        sounds[box.sound].play();
      }
    }
  }
}

function draw() {
  background(220);
  textSize(24 * scaleFactor);

  for (let i = 0; i < matrixLabels.length; i++) {
    text(matrixLabels[i], 20 * scaleFactor, (50 * i + 85) * scaleFactor);
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      noStroke();
      fill(matrix[i][j].color);
      rect(matrix[i][j].x, matrix[i][j].y, 50 * scaleFactor, 50 * scaleFactor);
    }
  }

  for (let k = 0; k < numRectangles; k++) {
    let currentLineX = 150 * scaleFactor + ((columnIndex - k * rectangleSpacing / 50) % 16) * 50 * scaleFactor;
    fill(255, 0, 0, 128); // Color rojo semitransparente para el rectángulo
    noStroke();
    rect(currentLineX, 50 * scaleFactor, 50 * scaleFactor, 400 * scaleFactor); // Dibuja el rectángulo
  }
}

function mousePressed() {
  let activeColors = new Set();
  for (let i = 0; i < matrix.length; i++) {
    let TamborColor = colors[i]; // Obtenemos el color correspondiente al Tambor
    for (let j = 0; j < matrix[i].length; j++) {
      if (mouseX > matrix[i][j].x && mouseX < matrix[i][j].x + 50 * scaleFactor && mouseY > matrix[i][j].y && mouseY < matrix[i][j].y + 50 * scaleFactor) {
        if (matrix[i][j].color === TamborColor) { // Si el color es el del Tambor
          matrix[i][j].color = "transparent"; // Cambiamos a transparente
          sounds[matrix[i][j].sound].stop(); // Detenemos el sonido
        } else { // Si no, cambiamos al color del Tambor
          matrix[i][j].color = TamborColor;
          sounds[matrix[i][j].sound].play();
          activeColors.add(TamborColor); // Agregamos el color activo al conjunto
        }
      }
    }
  }
  // Reproducimos los sonidos de los colores activos
  for (let color of activeColors) {
    let soundKey = colorToSound[color];
    if (soundKey) {
      sounds[soundKey].play();
    }
  }
}


