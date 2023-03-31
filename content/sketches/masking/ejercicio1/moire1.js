//Patron moiré

let angle = 0;

function setup() {
  createCanvas(300, 300);
}

function draw() {
  background(220);
  
  // Dibujar el círculo en el centro de la pantalla
  let centerX = width / 2;
  let centerY = height / 2;
  let circleSize = min(width, height) * 0.8;
  noFill();
  stroke(0);
  strokeWeight(2);
  ellipse(centerX, centerY, circleSize, circleSize);
  
  // Dibujar el patrón moiré
  translate(centerX, centerY);
  strokeWeight(1);
  for (let r = circleSize / 2; r > 0; r -= 10) {
    let x = r * cos(angle * r / 500);
    let y = r * sin(angle * r / 500);
    line(-x, -y, x, y);
  }
  
  // Actualizar el ángulo para hacer que el patrón se mueva
  angle += 0.05;
}
