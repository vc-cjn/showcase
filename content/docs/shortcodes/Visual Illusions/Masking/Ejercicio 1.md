# Kinegrams y Patrones de Moiré

# Ejercicio 1A

## Introducción y Antecedentes

<p style="text-align: justify;">A continuación se plantea un Kinegram común (Kinegrama o Cinegrama en español), el cual representa la idea básica de una composición de imágenes superpuestas y distorsionadas, de tal manera que al momento de pasar por el frente una máscara de barras verticales, en este caso una grilla, dan el efecto de movimiento sobre la imágen de fondo. <b><i>Cabe mencionar que este primer ejercicio es una muestra básica para entender la idea general del kinegrama, sin embargo el Ejercicio 1B el cual creemos que es el core de este apartado, permite explorar otras formas de visualizar y en un caso particular, escuchar estas técnicas.</i></b></p>

<p style="text-align: justify;">Para este caso particular, empezamos con un ejercicio inicial el cual está basado en un proyecto previo llamado Kinegrams y elaborado por Mithru, el cual es bastante completo y tiene muchas otras funcionalidades. Nosotros extrajimos una de ellas, que es la utilización de una composición de frames de un GIF representados en imágenes separadas.</p>

## Marco Teórico

**Kinegramas**

<p style="text-align: justify;">Los kinegramas son imágenes estáticas que, cuando se ven a través de una máscara o una serie de barras, parecen moverse o cambiar. Este efecto se logra mediante la interacción entre la máscara y la imagen, que crea la ilusión de movimiento. Los kinegramas han sido utilizados en una amplia gama de aplicaciones, como arte, diseño, publicidad y educación.</p>

**Masking**

<p style="text-align: justify;">El Masking o enmascaramiento es el proceso de ocultar ciertas partes de una imagen compuesta y revelar otras utilizando una máscara (también conocida como grilla) con barras que bloquean partes específicas de la imágen. La máscara generalmente consiste en barras paralelas, que pueden variar en ancho y separación. El enmascaramiento es crucial para el funcionamiento de los kinegramas porque permite que saólo se muestre una porción de la imagen compuesta en cualquier momento dado. La velocidad y la dirección en la que se mueve la máscara afectan la percepción del movimiento y la secuencia de las imágenes que se muestran.</p>

## Código y Solución

<p style="text-align: justify;">Como ya se mencionó se usó un proyecto previo como base, de dicho proyecto se extrajo la estructura principal de la clase para generar las imágenes mezcladas llamada generateKinegram dado que no se sabía exactamente como poder manejar esta parte; el resto de código se fue construyendo a medida que se iba dando forma, usando bastante la documentación de p5.js sobre todo para dibujar la grilla de barras y poder parametrizar algunas variables directamente desde unos slider en pantalla. El código en general es bastante sencillo y se muestra a continuación.</p>

{{< details title="CodeKinegram" open=false >}}
{{< highlight js >}}

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
    images[i] = loadImage(`mario${i + 1}.png`);
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


{{< /highlight >}}
{{< /details >}}

## Resultados

<p style="text-align: justify;">A continuación se enseña el resultado obtenido, inicialmente se observan unos sliders los cuales permiten variar algunos parámetros como el ancho de las barras, la separación entre estas, la velocidad a la cual se desplazan y la cantidad de estas de manera que al minimizar esta última, se pueda visualizar la imágen resultante de la mezcla de cada uno de los frames, en este caso la imagen de Mario consta de tres imágenes, y el efecto final es Mario caminando.</p>

{{< p5-iframe sketch="/showcase/sketches/masking/ejercicio1/kinegram.js" width="430" height="530">}}

## Conclusión y trabajo Futuro

En este proyecto hemos explorado una manera sencilla de generar un kinegrama, se pueden cambiar e intentar crear ese efecto de movimiento sobre otras imágenes, se abordó cierta personalización y experimentación al momento de permitir la variación de algunos parametros y asi poder visualizar un resultado al gusto individual de quien está usando la herramienta. Realmente hay mucho trabajo por delante, por ejemplo se piensa en variar el ángulo de la grilla y poder visualizar otros efectos, también el hecho de poder cargar las propias imágenes directamente desde la interfaz. Como veremos a continuación, esta técnica de Kinegramas no solo puede aplicarse a imágenes sino a otros entornos llamativos como la música.



# Ejercicio 1B

## Introducción

<p style="text-align: justify;">Kinegrama Acústico, así le hemos llamado a este ejercicio que explora la interacción entre el sonido y la visualización en tiempo real, inspirado en la técnica de los <a href=https://michaelbach.de/ot/mot-scanimation/index.html>kinegramas </a> y el proyecto <a href=https://github.com/chrisdonahue/wavegan>WaveGAN</a>. A través de una interfaz gráfica, el usuario puede manipular y generar patrones de sonido, que se traducen en una experiencia audiovisual. Este ejercicio aborda el concepto de kinegramas, su aplicación en diferentes contextos, la relación con el proyecto WaveGAN y la importancia de la interacción entre la visualización y el sonido. [<a href=https://paperswithcode.com/method/wgan>Aquí</a>] otros proyectos relacionados.</p>

## Marco Teórico

**Kinegramas**

<p style="text-align: justify;">En el Kinegrama Acústico, el concepto de kinegramas se aplica a un entorno musical, donde una barra vertical se desplaza a través de una matriz de colores. Cada color representa un sonido, y cuando la barra se cruza con un color, se reproduce el sonido correspondiente. La velocidad de desplazamiento de la barra y el número de barras pueden ser ajustados por el usuario, lo que permite una mayor personalización de la experiencia.</p>


**WaveGAN**

<p style="text-align: justify;">WaveGAN es un proyecto de investigación que utiliza la inteligencia artificial para generar sonidos a través de un proceso conocido como ["<a href=https://arxiv.org/abs/1802.04208>síntesis de audio por aprendizaje profundo</a>"]. El proyecto explora la posibilidad de aplicar la Generative Adversarial Networks (GANs) al dominio del audio, con el objetivo de crear sonidos realistas y de alta calidad.</p>

<p style="text-align: justify;">Aunque el Kinegrama Acústico no utiliza directamente el código de WaveGAN, la idea general de la interfaz visual y el concepto de usar sonidos se basa en este proyecto. Los sonidos utilizados en el Kinegrama Acústico provienen del proyecto WaveGAN específicamente de un <a href=https://chrisdonahue.com/wavegan/>DEMO</a>, lo que demuestra la versatilidad y la capacidad de adaptación de estos sonidos generados por IA.</p>


**Interacción entre visualización y sonido**

<p style="text-align: justify;">La interacción entre la visualización y el sonido es un aspecto fundamental del Kinegrama Acústico. La interfaz gráfica permite al usuario manipular fácilmente los patrones de sonido y experimentar con diferentes combinaciones. Además, la visualización en tiempo real del desplazamiento de las barras verticales y la reproducción de los sonidos crea una experiencia audiovisual única e inmersiva.</p>

<p style="text-align: justify;">Al ofrecer a los usuarios la posibilidad de personalizar la velocidad, el volumen y la cantidad de barras, el Kinegrama Acústico se convierte en una herramienta creativa y versátil. Esto puede inspirar a los usuarios a explorar nuevas formas de crear y experimentar con sonidos y visualizaciones, lo que puede tener aplicaciones en áreas como la música, el arte y la educación.</p>


## Código Y Solución

<p style="text-align: justify;">Para llegar al código final, se han realizado algunas consultas principalmente en la referencia de p5.js para poder entender algunas de las librerías, como por ejemplo la librería de sonido, y algunas funciones que ya vienen presentes en dicha herramienta. Como ya se mencionó, la parte visual se inspiró en el demo WaveGAN, asi como gran parte de su funcionalidad, sin embargo, existe un proyecto bastante interesante llamado "drum machine!" ya elaborado en p5.js por el usuario asd099 el cual sirvió de guía para la construcción estructural que necesitábamos implementar, no se ha hecho una copia directa dado que quisimos sacar nuestro propio código, pero si nos ayudó bastante en ver como podíamos construir algunas funciones para que funcionaran en nuestro modelo. Y finalmente se hizo uso de la nueva herramienta OpenIA para resolver algunos inconvenientes que nos estaban surgiendo y de los cuales no encontrábamos referencias claras.</p>

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

## Resultados

<p style="text-align: justify;">A continuación vamos a dejar un ejemplo de cómo puedes habilitar la matriz para que al momento de reproducir obtengas un ritmo interesante, la idea es jugar con cada uno de los sliders presentes, sobre todo el de la cantidad de barras para dar ese efecto de un kinegrama. Adicional recordemos que inicialmente se tiene la matriz vacía, esta consta de 8 filas por 16 columnas por lo que tendrás la opción de habilitar hasta 128 casillas, cada fila asociada a un color y sonido. Lo único que se debe hacer es dar click en cualquier parte del lienzo blanco para habilitar o deshabilitar los colores que detras tendrán un sonido asociado.</p>

**Ejemplo**

<img src="/showcase/sketches/masking/ejercicio1/ejemplo.png">

**Kinegrama Acústico**

El siguiente es el resultado final en el cual se podrán probar una gran cantidad de variaciones de sonido.

{{< p5-iframe sketch="/showcase/sketches/masking/ejercicio1/kinegram_acustic.js" width="720" height="525">}}

<p style="text-align: justify;">Como se observa, se pueden crear diversos ritmos a partir de la selección de colores los cuales representan un sonido dentro de la matriz, y se puede jugar con esto de muchas formas, aumentando la velocidad, el volumen, y lo que más nos interesa, aumentar la cantidad de barras que vendrían a representar la capa de enmascaramiento, que en este caso en lugar de ocultar, permite mostrar lo que hay detrás de esos colores, es decir un sonido asociado, dando movimiento no a una imágen pero si a una serie de sonidos que en conjunto forman un ritmo o una melodía musical.</p>

## Conclusión y Trabajo Futuro

<p style="text-align: justify;">El Kinegrama Acústico es un ejercicio curioso que combina técnicas visuales y auditivas de manera innovadora y atractiva, al tiempo que demuestra el potencial de la inteligencia artificial y la interacción entre la visualización y el sonido en el diseño de experiencias audiovisuales. Esta herramienta puede inspirar a usuarios y creadores a repensar y experimentar con nuevas formas de interactuar con el sonido y la visualización, expandiendo así los límites de la creatividad y la innovación.
Durante el desarrollo de este ejercicio surgieron múltiples ideas, como por ejemplo alternar desde la interfáz cada uno de los sonidos e incluso la posibilidad de incluir otro tipo de intrumentos musicales, el piano sería una excelente opción  y se espera a futuro poder implementar algo por el estilo en donde incluso en la interfaz se observen las octavas de este instrumento y también se llega a imaginar la posibilidad de utilizar una máscara que fluya en el tiempo y tenga otro tipo de acciones como desaparecer y aparecer en ciertos intervalos de manera que de la sensación de interpretación de una pieza musical.</p>


# Ejercicio 1C

## Introducción

**Patrones de Moiré**

<p style="text-align: justify;">Un patrón de Moiré es un fenómeno óptico que ocurre cuando dos o más patrones de líneas, puntos o curvas superpuestos se combinan y crean un patrón de interferencia que no está presente en ninguno de los patrones originales. Los patrones de Moiré son el resultado de la interacción entre las frecuencias espaciales de los patrones superpuestos y, a menudo, se consideran artefactos indeseables en imágenes impresas, escaneadas o en la fotografía digital.</p>

<p style="text-align: justify;">A lo largo de la historia, los patrones de Moiré han sido objeto de estudio en diversos campos, como la física, la matemática, el arte y la ingeniería.</p>

<p style="text-align: justify;">Física: En óptica, los patrones de Moiré se utilizan para estudiar la interferencia de la luz y cómo las ondas interactúan entre sí. En el caso de las rejillas, la interferencia constructiva y destructiva de las ondas de luz crea los patrones visibles de Moiré.</p>

<p style="text-align: justify;">Matemáticas: Los patrones de Moiré se pueden describir matemáticamente utilizando funciones periódicas, como las funciones trigonométricas seno y coseno. Estas funciones ayudan a comprender cómo se forman y cambian los patrones de Moiré en función de las propiedades de las rejillas, como la orientación y el espaciado.</p>

<p style="text-align: justify;">Arte: Los patrones de Moiré han sido utilizados por artistas y diseñadores en diversas formas, desde la creación de ilusiones ópticas hasta la incorporación de patrones de Moiré en estampados y diseños textiles. Los patrones pueden ser visualmente intrigantes y proporcionar una sensación de movimiento y dinamismo en la obra de arte.</p>

<p style="text-align: justify;">Ingeniería: Los patrones de Moiré se han aplicado en una amplia gama de campos de la ingeniería, como la metrología, la fotografía y la impresión. Por ejemplo, en metrología, los patrones de Moiré se pueden utilizar para medir deformaciones o desplazamientos en estructuras y materiales. En la impresión y la fotografía, la aparición no deseada de patrones de Moiré puede ser un problema cuando se escanean o imprimen imágenes que contienen rejillas finas, como las imágenes de televisión o las fotografías de edificios con ventanas muy juntas.</p>

## Código y Solución

A continuación se presenta el código de dos patrones de moiré

<p style="text-align: justify;">El de la izquierda corresponde a un patrón de Moiré el cual consiste en líneas que se desplazan en dirección radial a diversad velocidades causando un efecto bastante interesante</p>



{{< details title="Moire_1" open=false >}}
{{< highlight js >}}
//Patron moiré

let angle = 0;
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

  // Actualizar el ángulo para hacer que el patrón se mueva, si no está pausado
  if (!isPaused) {
    angle += 0.05;
  }
}

// Función para pausar y reanudar el movimiento de las líneas
function togglePause() {
  isPaused = !isPaused;
  pauseButton.html(isPaused ? 'Reproducir' : 'Pausar');
}


{{< /highlight >}}
{{< /details >}}

<br>
<p style="text-align: justify;">El de la derecha corresponde a un patrón de Moiré el cual dibuja dos conjuntos de líneas diagonales que se cruzan en ángulos opuestos. Los ángulos de las líneas cambian con el tiempo, lo que crea un efecto de animación en el patrón de Moiré.   En el código se puede experimentar con los valores de angleSpeed y lineSpacing para generar diferentes patrones de Moiré y efectos visuales, mientras que en la interfaz se ha creado un botón para reproducir y pausar dicho patrón.</p>


{{< details title="Moire_2" open=false >}}
{{< highlight js >}}
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


{{< /highlight >}}
{{< /details >}}


{{< p5-iframe sketch="/showcase/sketches/masking/ejercicio1/moire1.js" width="320" height="320">}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{< p5-iframe sketch="/showcase/sketches/masking/ejercicio1/moire2.js" width="320" height="320">}}


## Conclusiones y Trabajo Futuro

<p style="text-align: justify;">Los patrones de Moiré al igual que los Kinegramas, tienen cierta similitud en cuanto al manejo de capas de patrones superpuestos. Sin embargo, sus propósitos son distintos. Mientras que los kinegramas son una técnica de animación que utiliza una máscara de barras para crear la ilusión de movimiento, los patrones de Moiré son un efecto visual de interferencia que ocurre cuando se superponen dos o más patrones repetitivos.</p>
<p style="text-align: justify;">En el trabajo futuro se puede pensar en la combinación de formas y colores los cuales se pueden aplicar en arte y diseño, por otro lado se podrían crear animaciones y transiciones en trabajos de desarrollo web por ejemplo; otra de las cosas es que se puede representar informacion en visualizaciones de datos, como por ejemplo para representar la densidad de poblacion, el tráfico vehicular o las fluctuaciones de temperatura en un mapa, el sin fin de aplicaciones es bastante extenso y abierto a cualquier ámbito. En los códigos realizados, se pueden añadir más interacción del usuario para controlar parámetros de velocidad, tamaño, espaciado y orientación de las lineas. También se ha pensado en la adición de imágenes o texto en la escena y observar cómo interactúan con los patrones.</p>