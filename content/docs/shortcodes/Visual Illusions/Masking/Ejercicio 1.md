# Ejercicio 1

**1. Introducción**

Kinegrama Acústico, así le hemos llamado a este ejercicio que explora la interacción entre el sonido y la visualización en tiempo real, inspirado en la técnica de los [kinegramas](https://michaelbach.de/ot/mot-scanimation/index.html) y el proyecto [WaveGAN](https://github.com/chrisdonahue/wavegan). A través de una interfaz gráfica, el usuario puede manipular y generar patrones de sonido, que se traducen en una experiencia audiovisual. Este ejercicio aborda el concepto de kinegramas, su aplicación en diferentes contextos, la relación con el proyecto WaveGAN y la importancia de la interacción entre la visualización y el sonido. [Aquí](https://paperswithcode.com/method/wgan) otros proyectos relacionados.

**2. Marco Teórico**

Kinegramas:

Los kinegramas son imágenes estáticas que, cuando se ven a través de una máscara o una serie de barras, parecen moverse o cambiar. Este efecto se logra mediante la interacción entre la máscara y la imagen, que crea la ilusión de movimiento. Los kinegramas han sido utilizados en una amplia gama de aplicaciones, como arte, diseño, publicidad y educación.

En el Kinegrama Acústico, el concepto de kinegramas se aplica a un entorno musical, donde una barra vertical se desplaza a través de una matriz de colores. Cada color representa un sonido, y cuando la barra se cruza con un color, se reproduce el sonido correspondiente. La velocidad de desplazamiento de la barra y el número de barras pueden ser ajustados por el usuario, lo que permite una mayor personalización de la experiencia.


WaveGAN

WaveGAN es un proyecto de investigación que utiliza la inteligencia artificial para generar sonidos a través de un proceso conocido como ["síntesis de audio por aprendizaje profundo"](https://arxiv.org/abs/1802.04208). El proyecto explora la posibilidad de aplicar la Generative Adversarial Networks (GANs) al dominio del audio, con el objetivo de crear sonidos realistas y de alta calidad.

Aunque el Kinegrama Acústico no utiliza directamente el código de WaveGAN, la idea general de la interfaz visual y el concepto de usar sonidos se basa en este proyecto. Los sonidos utilizados en el Kinegrama Acústico provienen del proyecto WaveGAN específicamente de un [DEMO](https://chrisdonahue.com/wavegan/), lo que demuestra la versatilidad y la capacidad de adaptación de estos sonidos generados por IA.


Interacción entre visualización y sonido

La interacción entre la visualización y el sonido es un aspecto fundamental del Kinegrama Acústico. La interfaz gráfica permite al usuario manipular fácilmente los patrones de sonido y experimentar con diferentes combinaciones. Además, la visualización en tiempo real del desplazamiento de las barras verticales y la reproducción de los sonidos crea una experiencia audiovisual única e inmersiva.

Al ofrecer a los usuarios la posibilidad de personalizar la velocidad, el volumen y la cantidad de barras, el Kinegrama Acústico se convierte en una herramienta creativa y versátil. Esto puede inspirar a los usuarios a explorar nuevas formas de crear y experimentar con sonidos y visualizaciones, lo que puede tener aplicaciones en áreas como la música, el arte y la educación.


**3. Código**

El código crea una matriz 8x16 en la que cada celda representa un sonido de tambor específico. Las filas representan diferentes sonidos de tambor (Tambor1, Tambor2, etc.), mientras que las columnas representan momentos en el tiempo. El usuario puede interactuar con el kinegrama haciendo clic en las celdas de la matriz para activar o desactivar los sonidos de tambor.

El ejercicio también permite al usuario controlar la velocidad de reproducción, el volumen y la cantidad de barras del kinegrama. Además, hay un botón de reproducción/pausa para controlar la reproducción del kinegrama.

Existen varias partes clave que son esenciales para el funcionamiento de la aplicación. A continuación, se describen las secciones más importantes del código:

Carga de sonidos y configuración inicial: En la función preload(), se cargan los sonidos de cada tambor utilizando la función loadSound(). En la función setup(), se inicializa el lienzo, se crean y posicionan los elementos de la interfaz de usuario, y se configura la matriz que representa el patrón de sonido de la cuadrícula.

{{< details title="preload()" open=false >}}
{{< highlight md >}}
function preload() {
  for (let i = 1; i <= 8; i++) {
    sounds[`Tambor${i}`] = loadSound(`/showcase/sketches/masking/ejercicio1/Tambor${i}.wav`);
  }
}
{{< /highlight >}}
{{< /details >}}

{{< details title="setup()" open=false >}}
{{< highlight md >}}
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

Control de velocidad, volumen y cantidad de barras: Las funciones updateSpeed(), updateVolume() y updateBars() se utilizan para actualizar las variables correspondientes cuando los usuarios interactúan con los controles deslizantes en la interfaz de usuario.

{{< details title="updateSpeed()" open=false >}}
{{< highlight md >}}
function updateSpeed() {
  currentSpeed = this.value();
  clearInterval(interval);
  if (playing) {
    interval = setInterval(moveColumn, 1000 / currentSpeed);
  }
}
{{< /highlight >}}
{{< /details >}}

Iniciar/Pausar la reproducción: La función togglePlay() se encarga de iniciar o pausar la reproducción de los patrones de sonido en función del estado actual de la aplicación.

{{< details title="togglePlay()" open=false >}}
{{< highlight md >}}
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

Reproducción de sonidos y movimiento de las barras: La función moveColumn() se encarga de reproducir los sonidos y mover las barras horizontalmente en la cuadrícula. Esto se logra iterando sobre las celdas de la matriz y reproduciendo los sonidos asociados a cada color activo.

{{< details title="moveColumn()" open=false >}}
{{< highlight md >}}
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

Dibujo y actualización del lienzo: La función draw() se ejecuta continuamente en un bucle y se encarga de dibujar y actualizar el lienzo. Esto incluye dibujar el fondo, los elementos de texto, la cuadrícula y las barras verticales.

{{< details title="draw()" open=false >}}
{{< highlight md >}}
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

Interacción del usuario con la cuadrícula: La función mousePressed() se ejecuta cuando el usuario hace clic en el lienzo. Esta función detecta en qué celda de la cuadrícula se hizo clic y, en consecuencia, cambia el color de la celda y reproduce o detiene el sonido asociado.

Al comprender estas partes clave del código, se puede obtener una visión general del funcionamiento interno del Kinegrama Acústico y cómo se lleva a cabo la interacción entre el usuario y la aplicación. Estas funciones trabajan juntas para proporcionar una experiencia de usuario fluida y agradable, permitiendo a los usuarios experimentar con patrones de sonido y kinegramas de una manera única e innovadora.



{{< p5-iframe sketch="/showcase/sketches/masking/ejercicio1/sketch.js" width="800" height="525">}}


**4. Conclusión**

El Kinegrama Acústico es un ejercicio curioso que combina técnicas visuales y auditivas de manera innovadora y atractiva, al tiempo que demuestra el potencial de la inteligencia artificial y la interacción entre la visualización y el sonido en el diseño de experiencias audiovisuales. Esta herramienta puede inspirar a usuarios y creadores a repensar y experimentar con nuevas formas de interactuar con el sonido y la visualización, expandiendo así los límites de la creatividad y la innovación.
Durante el desarrollo de este ejercicio surgieron múltiples ideas, como por ejemplo alternar desde la interfáz cada uno de los sonidos e incluso la posibilidad de incluir otro tipo de intrumentos musicales, el piano sería una excelente opción  y se espera a futuro poder implementar algo por el estilo en donde incluso en la interfaz se observen las octavas de este instrumento y también se llega a imaginar la posibilidad de utilizar una máscara que fluya en el tiempo y tenga otro tipo de acciones como desaparecer y aparecer en ciertos intervalos de manera que de la sensación de interpretación de una pieza musical.