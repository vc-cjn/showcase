# Ejercicio 1

**1. Introducción**

El Kinegrama Acústico es un proyecto que explora la interacción entre el sonido y la visualización en tiempo real, inspirado en la técnica de los kinegramas y el proyecto WaveGAN. A través de una interfaz gráfica, el usuario puede manipular y generar patrones de sonido, que se traducen en una experiencia audiovisual. Este marco teórico aborda el concepto de kinegramas, su aplicación en diferentes contextos, la relación con el proyecto WaveGAN y la importancia de la interacción entre la visualización y el sonido.

**2. Marco Teórico**

Kinegramas:

Los kinegramas son imágenes estáticas que, cuando se ven a través de una máscara o una serie de barras, parecen moverse o cambiar. Este efecto se logra mediante la interacción entre la máscara y la imagen, que crea la ilusión de movimiento. Los kinegramas han sido utilizados en una amplia gama de aplicaciones, como arte, diseño, publicidad y educación.

En el Kinegrama Acústico, el concepto de kinegramas se aplica a un entorno musical, donde una barra vertical se desplaza a través de una matriz de colores. Cada color representa un sonido, y cuando la barra se cruza con un color, se reproduce el sonido correspondiente. La velocidad de desplazamiento de la barra y el número de barras pueden ser ajustados por el usuario, lo que permite una mayor personalización de la experiencia.


WaveGAN

WaveGAN es un proyecto de investigación que utiliza la inteligencia artificial para generar sonidos a través de un proceso conocido como "síntesis de audio por aprendizaje profundo". El proyecto explora la posibilidad de aplicar la Generative Adversarial Networks (GANs) al dominio del audio, con el objetivo de crear sonidos realistas y de alta calidad.

Aunque el Kinegrama Acústico no utiliza directamente el código de WaveGAN, la idea general de la interfaz visual y el concepto de usar sonidos se basa en este proyecto. Los sonidos utilizados en el Kinegrama Acústico provienen del proyecto WaveGAN, lo que demuestra la versatilidad y la capacidad de adaptación de estos sonidos generados por IA.


Interacción entre visualización y sonido

La interacción entre la visualización y el sonido es un aspecto fundamental del Kinegrama Acústico. La interfaz gráfica permite al usuario manipular fácilmente los patrones de sonido y experimentar con diferentes combinaciones. Además, la visualización en tiempo real del desplazamiento de las barras verticales y la reproducción de los sonidos crea una experiencia audiovisual única e inmersiva.

Al ofrecer a los usuarios la posibilidad de personalizar la velocidad, el volumen y la cantidad de barras, el Kinegrama Acústico se convierte en una herramienta creativa y versátil. Esto puede inspirar a los usuarios a explorar nuevas formas de crear y experimentar con sonidos y visualizaciones, lo que puede tener aplicaciones en áreas como la música, el arte y la educación.


**3. Código**

El código crea una matriz 8x16 en la que cada celda representa un sonido de tambor específico. Las filas representan diferentes sonidos de tambor (Tambor1, Tambor2, etc.), mientras que las columnas representan momentos en el tiempo. El usuario puede interactuar con el kinegrama haciendo clic en las celdas de la matriz para activar o desactivar los sonidos de tambor.

El ejercicio también permite al usuario controlar la velocidad de reproducción, el volumen y la cantidad de barras del kinegrama. Además, hay un botón de reproducción/pausa para controlar la reproducción del kinegrama.

Existen varias partes clave que son esenciales para el funcionamiento de la aplicación. A continuación, se describen las secciones más importantes del código:

Carga de sonidos y configuración inicial: En la función preload(), se cargan los sonidos de cada tambor utilizando la función loadSound(). En la función setup(), se inicializa el lienzo, se crean y posicionan los elementos de la interfaz de usuario, y se configura la matriz que representa el patrón de sonido de la cuadrícula.

Control de velocidad, volumen y cantidad de barras: Las funciones updateSpeed(), updateVolume() y updateBars() se utilizan para actualizar las variables correspondientes cuando los usuarios interactúan con los controles deslizantes en la interfaz de usuario.

Iniciar/Pausar la reproducción: La función togglePlay() se encarga de iniciar o pausar la reproducción de los patrones de sonido en función del estado actual de la aplicación.

Reproducción de sonidos y movimiento de las barras: La función moveColumn() se encarga de reproducir los sonidos y mover las barras verticalmente en la cuadrícula. Esto se logra iterando sobre las celdas de la matriz y reproduciendo los sonidos asociados a cada color activo.

Dibujo y actualización del lienzo: La función draw() se ejecuta continuamente en un bucle y se encarga de dibujar y actualizar el lienzo. Esto incluye dibujar el fondo, los elementos de texto, la cuadrícula y las barras verticales.

Interacción del usuario con la cuadrícula: La función mousePressed() se ejecuta cuando el usuario hace clic en el lienzo. Esta función detecta en qué celda de la cuadrícula se hizo clic y, en consecuencia, cambia el color de la celda y reproduce o detiene el sonido asociado.

Al comprender estas partes clave del código, se puede obtener una visión general del funcionamiento interno del Kinegrama Acústico y cómo se lleva a cabo la interacción entre el usuario y la aplicación. Estas funciones trabajan juntas para proporcionar una experiencia de usuario fluida y agradable, permitiendo a los usuarios experimentar con patrones de sonido y kinegramas de una manera única e innovadora.



{{< p5-iframe sketch="/showcase/sketches/masking/ejercicio1/sketch.js" width="800" height="525">}}
