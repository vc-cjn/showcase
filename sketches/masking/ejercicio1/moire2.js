let angle1 = 0;
let angle2 = 0;
let angleSpeed = 0.02;
let lineSpacing = 5;
let isPaused = false;
let pauseButton;

function setup() {
  createCanvas(300, 300);

  // Crear botón de pausa / reproducción y agregar función de control
  pauseButton = createButton('Pausar');
  pauseButton.position(10, 10);
  pauseButton.mousePressed(togglePause);
}

function draw() {
  background(255);
  stroke(0);

  // Dibujar el primer conjunto de líneas diagonales
  push();
  translate(width / 2, height / 2);
  rotate(angle1);
  for (let x = -width / 2; x <= width / 2; x += lineSpacing) {
    line(x, -height / 2, x, height / 2);
  }
  pop();

  // Dibujar el segundo conjunto de líneas diagonales
  push();
  translate(width / 2, height / 2);
  rotate(angle2);
  for (let x = -width / 2; x <= width / 2; x += lineSpacing) {
    line(x, -height / 2, x, height / 2);
  }
  pop();

  // Actualizar los ángulos de rotación si no está pausado
  if (!isPaused) {
    angle1 += angleSpeed;
    angle2 -= angleSpeed;
  }
}

// Función para pausar y reanudar el movimiento de las líneas
function togglePause() {
  isPaused = !isPaused;
  pauseButton.html(isPaused ? 'Reproducir' : 'Pausar');
}
