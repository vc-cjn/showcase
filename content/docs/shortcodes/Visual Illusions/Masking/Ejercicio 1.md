# Ejercicio 1

## 1. Introducción

<p style="text-align: justify;">Kinegrama Acústico, así le hemos llamado a este ejercicio que explora la interacción entre el sonido y la visualización en tiempo real, inspirado en la técnica de los <a href=https://michaelbach.de/ot/mot-scanimation/index.html>kinegramas </a> y el proyecto <a href=https://github.com/chrisdonahue/wavegan>WaveGAN</a>. A través de una interfaz gráfica, el usuario puede manipular y generar patrones de sonido, que se traducen en una experiencia audiovisual. Este ejercicio aborda el concepto de kinegramas, su aplicación en diferentes contextos, la relación con el proyecto WaveGAN y la importancia de la interacción entre la visualización y el sonido. [<a href=https://paperswithcode.com/method/wgan>Aquí</a>] otros proyectos relacionados.</p>

## 2. Marco Teórico

**Kinegramas**

<p style="text-align: justify;">Los kinegramas son imágenes estáticas que, cuando se ven a través de una máscara o una serie de barras, parecen moverse o cambiar. Este efecto se logra mediante la interacción entre la máscara y la imagen, que crea la ilusión de movimiento. Los kinegramas han sido utilizados en una amplia gama de aplicaciones, como arte, diseño, publicidad y educación.</p>

<p style="text-align: justify;">En el Kinegrama Acústico, el concepto de kinegramas se aplica a un entorno musical, donde una barra vertical se desplaza a través de una matriz de colores. Cada color representa un sonido, y cuando la barra se cruza con un color, se reproduce el sonido correspondiente. La velocidad de desplazamiento de la barra y el número de barras pueden ser ajustados por el usuario, lo que permite una mayor personalización de la experiencia.</p>


**WaveGAN**

<p style="text-align: justify;">WaveGAN es un proyecto de investigación que utiliza la inteligencia artificial para generar sonidos a través de un proceso conocido como ["<a href=https://arxiv.org/abs/1802.04208>síntesis de audio por aprendizaje profundo</a>"]. El proyecto explora la posibilidad de aplicar la Generative Adversarial Networks (GANs) al dominio del audio, con el objetivo de crear sonidos realistas y de alta calidad.</p>

<p style="text-align: justify;">Aunque el Kinegrama Acústico no utiliza directamente el código de WaveGAN, la idea general de la interfaz visual y el concepto de usar sonidos se basa en este proyecto. Los sonidos utilizados en el Kinegrama Acústico provienen del proyecto WaveGAN específicamente de un <a href=https://chrisdonahue.com/wavegan/>DEMO</a>, lo que demuestra la versatilidad y la capacidad de adaptación de estos sonidos generados por IA.</p>


**Interacción entre visualización y sonido**

<p style="text-align: justify;">La interacción entre la visualización y el sonido es un aspecto fundamental del Kinegrama Acústico. La interfaz gráfica permite al usuario manipular fácilmente los patrones de sonido y experimentar con diferentes combinaciones. Además, la visualización en tiempo real del desplazamiento de las barras verticales y la reproducción de los sonidos crea una experiencia audiovisual única e inmersiva.</p>

<p style="text-align: justify;">Al ofrecer a los usuarios la posibilidad de personalizar la velocidad, el volumen y la cantidad de barras, el Kinegrama Acústico se convierte en una herramienta creativa y versátil. Esto puede inspirar a los usuarios a explorar nuevas formas de crear y experimentar con sonidos y visualizaciones, lo que puede tener aplicaciones en áreas como la música, el arte y la educación.</p>


## 3. Código Y Solución

<p style="text-align: justify;">El código crea una matriz 8x16 en la que cada celda representa un sonido de tambor específico. Las filas representan diferentes sonidos de tambor (Tambor1, Tambor2, etc.), mientras que las columnas representan momentos en el tiempo. El usuario puede interactuar con el kinegrama haciendo clic en las celdas de la matriz para activar o desactivar los sonidos de tambor.</p>

<p style="text-align: justify;">El ejercicio también permite al usuario controlar la velocidad de reproducción, el volumen y la cantidad de barras del kinegrama. Además, hay un botón de reproducción/pausa para controlar la reproducción del kinegrama.</p>

<p style="text-align: justify;">Existen varias partes clave que son esenciales para el funcionamiento de la aplicación. A continuación, se describen las secciones más importantes del código:</p>

<p style="text-align: justify;">Carga de sonidos y configuración inicial: En la función <b>preload()</b>, se cargan los sonidos de cada tambor utilizando la función <b>loadSound()</b>. En la función <b>setup()</b>, se inicializa el lienzo, se crean y posicionan los elementos de la interfaz de usuario, y se configura la matriz que representa el patrón de sonido de la cuadrícula.</p>

{{< details title="preload()" open=false >}}
{{< highlight js >}}
function preload() {
  for (let i = 1; i <= 8; i++) {
    sounds[`Tambor${i}`] = loadSound(`/showcase/sketches/masking/ejercicio1/Tambor${i}.wav`);
  }
}
{{< /highlight >}}
{{< /details >}}

<br>

{{< details title="setup()" open=false >}}
{{< highlight js >}}
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
{{< /highlight >}}
{{< /details >}}

<p style="text-align: justify;">Control de velocidad, volumen y cantidad de barras: Las funciones <b>updateSpeed()</b>, <b>updateVolume()</b> y <b>updateBars()</b> se utilizan para actualizar las variables correspondientes cuando los usuarios interactúan con los controles deslizantes en la interfaz de usuario.</p>

{{< details title="updateSpeed()" open=false >}}
{{< highlight js >}}
function updateSpeed() {
  currentSpeed = this.value();
  clearInterval(interval);
  if (playing) {
    interval = setInterval(moveColumn, 1000 / currentSpeed);
  }
}
{{< /highlight >}}
{{< /details >}}

<p style="text-align: justify;">Iniciar/Pausar la reproducción: La función <b>togglePlay()</b> se encarga de iniciar o pausar la reproducción de los patrones de sonido en función del estado actual de la aplicación.</p>

{{< details title="togglePlay()" open=false >}}
{{< highlight js >}}
function togglePlay() {
  playing = !playing;
  if (playing) {
    interval = setInterval(moveColumn, 1000 / currentSpeed);
  } else {
    clearInterval(interval);
  }
}
{{< /highlight >}}
{{< /details >}}

<p style="text-align: justify;">Reproducción de sonidos y movimiento de las barras: La función <b>moveColumn()</b> se encarga de reproducir los sonidos y mover las barras horizontalmente en la cuadrícula. Esto se logra iterando sobre las celdas de la matriz y reproduciendo los sonidos asociados a cada color activo.</p>

{{< details title="moveColumn()" open=false >}}
{{< highlight js >}}
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
{{< /highlight >}}
{{< /details >}}

<p style="text-align: justify;">Dibujo y actualización del lienzo: La función <b>draw()</b> se ejecuta continuamente en un bucle y se encarga de dibujar y actualizar el lienzo. Esto incluye dibujar el fondo, los elementos de texto, la cuadrícula y las barras verticales.</p>

{{< details title="draw()" open=false >}}
{{< highlight js >}}
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
{{< /highlight >}}
{{< /details >}}

<p style="text-align: justify;">Interacción del usuario con la cuadrícula: La función <b>mousePressed()</b> se ejecuta cuando el usuario hace clic en el lienzo. Esta función detecta en qué celda de la cuadrícula se hizo clic y, en consecuencia, cambia el color de la celda y reproduce o detiene el sonido asociado.</p>

<p style="text-align: justify;">Al comprender estas partes clave del código, se puede obtener una visión general del funcionamiento interno del Kinegrama Acústico y cómo se lleva a cabo la interacción entre el usuario y la aplicación. Estas funciones trabajan juntas para proporcionar una experiencia de usuario fluida y agradable, permitiendo a los usuarios experimentar con patrones de sonido y kinegramas de una manera única e innovadora. A continuación dejamos el código completo para que lo puedas usar a tu gusto.</p>


{{< details title="Code" open=false >}}
{{< highlight js >}}

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

{{< /highlight >}}
{{< /details >}}

<br>

{{< p5-iframe sketch="/showcase/sketches/masking/ejercicio1/kinegram_acustic.js" width="720" height="525">}}


**4. Conclusión**

<p style="text-align: justify;">El Kinegrama Acústico es un ejercicio curioso que combina técnicas visuales y auditivas de manera innovadora y atractiva, al tiempo que demuestra el potencial de la inteligencia artificial y la interacción entre la visualización y el sonido en el diseño de experiencias audiovisuales. Esta herramienta puede inspirar a usuarios y creadores a repensar y experimentar con nuevas formas de interactuar con el sonido y la visualización, expandiendo así los límites de la creatividad y la innovación.
Durante el desarrollo de este ejercicio surgieron múltiples ideas, como por ejemplo alternar desde la interfáz cada uno de los sonidos e incluso la posibilidad de incluir otro tipo de intrumentos musicales, el piano sería una excelente opción  y se espera a futuro poder implementar algo por el estilo en donde incluso en la interfaz se observen las octavas de este instrumento y también se llega a imaginar la posibilidad de utilizar una máscara que fluya en el tiempo y tenga otro tipo de acciones como desaparecer y aparecer en ciertos intervalos de manera que de la sensación de interpretación de una pieza musical.</p>


**5. Patrones de Moiré**

{{< p5-iframe sketch="/showcase/sketches/masking/ejercicio1/moire1.js" width="320" height="320">}}