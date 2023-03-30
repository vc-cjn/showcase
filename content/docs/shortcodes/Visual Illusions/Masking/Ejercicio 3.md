## Ejercicio 3

**1. Introducción**

Los kernels de imagen son una herramienta importante en el procesamiento de imágenes. Los kernels son matrices de valores numéricos que se utilizan para aplicar filtros a las imágenes y extraer características específicas de ellas.

El uso de kernels de imagen es muy común en aplicaciones de visión por computadora, como el reconocimiento de objetos, la detección de bordes, la eliminación de ruido y la mejora de la calidad de las imágenes.

Por ejemplo, un kernel de detección de bordes se puede utilizar para encontrar los bordes de un objeto en una imagen. El kernel se aplica a la imagen y busca los cambios abruptos en el brillo o el color de los píxeles. Esto puede ayudar a identificar las formas de los objetos en la imagen.

Los kernels de imagen también se utilizan en el preprocesamiento de imágenes antes de aplicar algoritmos de aprendizaje automático, como las redes neuronales convolucionales. En este caso, los kernels se utilizan para extraer características importantes de las imágenes que se utilizarán como entrada para el modelo de aprendizaje automático.

**2. Solución**

Para el ejercicio propuesto se buscan aplicar kernels de imagen a una imagen dada. No solo esto, sino que también se quiere evaluar la generación de histogramas en base a la imagen. 

La aplicación de kernels a las imágenes es una técnica ampliamente utilizada en el procesamiento digital de imágenes. El kernel es una matriz bidimensional que se utiliza como una herramienta para aplicar una operación específica a una imagen.

En el procesamiento de imágenes, se utiliza el kernel para aplicar operaciones como convolución, desenfoque, afilado, detección de bordes, entre otros. La convolución es la operación más común que se aplica a una imagen utilizando un kernel. Consiste en desplazar el kernel sobre la imagen, multiplicando los valores del kernel con los valores de píxeles correspondientes de la imagen y sumando los resultados para producir un nuevo valor de píxel en una nueva imagen de salida.

El proceso de aplicación de kernels a las imágenes se basa en la idea de que una imagen se puede representar como una función de intensidad de píxel en dos dimensiones. Al aplicar un kernel a la imagen, se realiza una operación matemática en cada píxel de la imagen, que se utiliza para modificar la intensidad de los píxeles de la imagen original y producir una nueva imagen.

### Image Kernel Application

En primer lugar se plantea la aplicación de kernels a la imagen. En este caso, se toman 3 kernels. Cada kernel tiene una matriz característica, la cual se presenta a continuación.


1. Edge Detection 

{{< katex display  >}}
\begin{pmatrix}
 &-1  &-1  &-1\\ 
 &-1  &8  &-1\\ 
 &-1  &-1  &-1\\ 
\end{pmatrix}
{{< /katex >}}

2. Ridge Detection

{{< katex display  >}}
\begin{pmatrix}
 &-1  &0 &1\\ 
 &-2  &0  &2\\ 
 &-1  &0  &1\\ 
\end{pmatrix}
{{< /katex >}}

3. Sharpen

{{< katex display  >}}
\begin{pmatrix}
 &0  &-1  &0\\ 
 &-1  &6  &-1\\ 
 &0  &-1  &0\\ 
\end{pmatrix}
{{< /katex >}}

3. Blur

{{< katex display  >}}
\begin{pmatrix}
&0.0625 &0.125 &0.0625\\
&0.125 &0.25 &0.125\\
&0.0625 &0.125 &0.0625 \\
\end{pmatrix}
{{< /katex >}}


A continuación se toma una imagen del conocido jugador de futbol Vinicius Jr. para aplicarle los kernels. Es posible emplear el menú de selección para elegir que kernel se desea emplear sobre la imagen. Inicialmente, se muestra el kernel de Edge Detection.


{{< details title="Implementacion Kernel de Imagen" open=false >}}
{{< highlight js >}}
var img;
var w = 100;
let matrix;
var maxRange = 256


// La funcion preload se ejecuta una unica vez antes de iniciar la funcionalidad de la aplicacion
function preload() {
  img = loadImage("/showcase/sketches/masking/ejercicio3/vinicius.jpg");
}

// Se prepara un canvas para colocar la imagen 
function setup() {
  createCanvas(800, 500);
  img.resize(800, 500);
  
  pixelDensity(1);

  // Crear un selector para el kernel a emplear 
  sel = createSelect();
  sel.position(0, 500);
  sel.option('Edge Detection');
  sel.option('Ridge Detection');
  sel.option('Sharpen');
  sel.option('Blur');

  // Estilo del selector 
  sel.style('font-size', '40px');
  sel.style('height', '60px');
  sel.style('width', '800px');
  sel.style('border-radius', '10px');
  sel.style('padding', '5px');
}

function mySelectEvent(){
  let item = sel.value();
  if (item == 'Edge Detection'){
    matrix = [[-1,-1,-1], 
              [-1,8,-1],
              [-1,-1,-1]];
   
    return matrix; 
  }

  if (item == 'Ridge Detection'){
    let v = 1.0/9.0;
    // kernel is the 3x3 matrix of normalized values
    let matrix = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]; 
    return matrix; 
  }

  if (item == 'Sharpen'){
    matrix = [  [0, -1, 0], 
                [-1, 6, -1],
                [0, -1, 0] ];
   
    return matrix; 
  }
  if (item == 'Blur'){
    matrix = [[0.0625, 0.125, 0.0625],
              [0.125, 0.25, 0.125],
              [0.0625, 0.125, 0.0625], ];
   
    return matrix; 
  }
}

function draw() {
  matrix = mySelectEvent();
  // Se ubica la imagen en el extremo superior izquierdo del canvas
  image(img, 0, 0);
  
  // Se limita el espacio sobre el cual se aplica el kernel a un cuadrado de dimensiones wxw
  var xstart = constrain(mouseX-w/2,0,img.width); 
  var ystart = constrain(mouseY-w/2,0,img.height);
  var xend = constrain(mouseX + w/2,0,img.width);
  var yend = constrain(mouseY + w/2,0,img.height);
  var matrixsize = 3;
  
  loadPixels();
  img.loadPixels();
  // Iteramos sobre cada pixel 
  for (var x = xstart; x < xend; x++ ) {
    for (var y = ystart; y < yend; y++ ) {
      // Para cada pixel se aplica la convolución y se determina el nuevo color del mismo.
      var result = convolution(x ,y , matrix, matrixsize, img); 
      var loc = (x + y * img.width) * 4;
      pixels[loc    ] = result[0];
      pixels[loc + 1] = result[1];
      pixels[loc + 2] = result[2];
      pixels[loc + 3] = 255;
      
    }
  }
  updatePixels();

  stroke(0);
  noFill();
  rect(xstart,ystart,w,w);
}

function convolution(x, y, matrix, matrixsize, img) {
  var rtotal = 0.0;
  var gtotal = 0.0;
  var btotal = 0.0;
  var offset = floor(matrixsize / 2);
  
  // Iteramos sobre la matriz de convolucion
  for (var i = 0; i < matrixsize; i++ ) {
    for (var j = 0; j < matrixsize; j++ ) {
      // What pixel are we testing
      var xloc = x + i-offset;
      var yloc = y + j-offset;
      var loc = (xloc + img.width * yloc) * 4;
      
      // Verificar que seguimos entre los bordes 
      loc = constrain(loc, 0, img.pixels.length-1);
      // Calculo de la convolucion.
      rtotal += img.pixels[loc    ] * matrix[i][j];
      gtotal += img.pixels[loc + 1] * matrix[i][j];
      btotal += img.pixels[loc + 2] * matrix[i][j];
    }
  }
  
  rtotal = constrain(rtotal,0,255);
  gtotal = constrain(gtotal,0,255);
  btotal = constrain(btotal,0,255);
  
  // Retornar el arreglo de colores
  return [rtotal,gtotal,btotal]; 
}
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/masking/ejercicio3/image_kernels.js" width="825" height="525" >}}

### Image Histogram


{{< details title="Implementacion Histograma" open=false >}}
{{< highlight js >}}
let img
function preload() {
  img = loadImage("/showcase/sketches/coloring/ejercicio3/bmw.jpg"); 
}

function mySelectEvent() {
  let item = sel.value();
  img = loadImage("/showcase/sketches/coloring/ejercicio3/" + item + ".jpg"); 
}

function setup() {
  // Inicializamos un selector para elegir la imagen a trabajar
  background(255);
  sel = createSelect();
  sel.position(10, 10);
  sel.option('bmw');
  sel.option('budapest');
  sel.option('vinicius');
  sel.selected('bmw');
  sel.changed(mySelectEvent);
  // Se inicializa el canvas para colocar la imagen y el grafico
  createCanvas(600, 600);

}

function draw(){
  background(255)
  img.resize(0,400);
  // Cambiamos el modo de color a HSL para hacer el histograma 
  var maxRange = 256
  colorMode(HSL, maxRange);
  image(img, 0, 0);
  // Inicializamos el histograma
  var histogram = new Array(maxRange);
  for (i = 0; i <= maxRange; i++) {
    histogram[i] = 0
  }

  // Cargamos los pixeles de la imagen
  loadPixels();
  
  // Para cada pixel se calcula el valor de HSL
  for (var x = 0; x < img.width; x+=5) {
    for (var y = 0; y < img.height; y+=5) {
      var loc = (x + y * img.width) * 4;
      var h = pixels[loc];
      var s = pixels[loc + 1];
      var l = pixels[loc + 2];
      var a = pixels[loc + 3];
      b = int(l);
      histogram[b]++
    }
  }
  // Se crea un placeholder para una nueva imagen
  image(img, 0, 0);
  // Retornamos a RGB para hacer el grafico
  colorMode(RGB);
  stroke(175,204,59)
  // Guardamos la configuración de dibujo actual
  push()
  //translate(10,0)
  // Se realiza el histograma empleando la función map y alturas 
  for (x = 0; x <= maxRange; x++) {
    index = histogram[x];

    y1=int(map(index, 0, max(histogram), height, height-200));
		y2 = height
    xPos = map(x,0,maxRange,0, width-20)
    line(xPos, y1, xPos, y2);
  }
  pop()
}

{{< /highlight >}}
{{< /details >}}

Por otro lado, la aplicación desarrollada también tiene la posibilidad de realizar una representación del histograma de la imagen. Recordemos que un histograma de imagen es un tipo de histograma que da una representación visual de la distribución tonal dentro de la imagen. Es decir, una visualización gráfica del numero de pixeles para cada valor tonal. A continuación, el usuario puede seleccionar una de 3 imagenes para visualizar su histograma, incluyendo la imagen del jugador de futbol presentada previamente. 

El histograma se representa en un gráfico en el que el eje x representa los valores de intensidad de los píxeles, y el eje y representa la frecuencia con la que aparece ese valor de intensidad en la imagen. Los valores de intensidad pueden variar de 0 a 255 en una imagen de escala de grises, o de 0 a 255 para cada canal de color (rojo, verde y azul) en una imagen en color.

El histograma de imagen es una herramienta muy útil para analizar y comprender la distribución de la intensidad de los píxeles en una imagen. Por ejemplo, se puede utilizar para determinar el rango dinámico de la imagen, es decir, el rango de intensidades que se encuentran en la imagen. También se puede utilizar para identificar problemas de exposición, como la subexposición o la sobreexposición, o para ajustar la curva de tonos de una imagen.

Además, el histograma de imagen también puede ser utilizado para realizar ajustes en la imagen, como el aumento o disminución del contraste o la luminosidad. Al visualizar la distribución de los niveles de intensidad de los píxeles en el histograma, se pueden identificar los valores de intensidad que necesitan ser ajustados para mejorar la calidad visual de la imagen.

{{< p5-iframe sketch="/showcase/sketches/masking/ejercicio3/image_histogram.js" width="625" height="625" >}}

### Image Lightness

La luminosidad de la imagen es una percepción visual que describe el brillo de una imagen. La luminosidad se refiere a la cantidad percibida de luz que es reflejada por un objeto o superficie. El brillo de una imagen está determinado por la cantidad de luz que llega al ojo del espectador, que está influenciado por factores como las condiciones de iluminación y los colores presentes en la imagen. La luminosidad es un aspecto importante de la comunicación visual, ya que puede afectar el estado de ánimo y el tono de una imagen, así como la legibilidad y claridad de su contenido. Comprender cómo funciona la luminosidad y cómo se puede manipular puede ser una herramienta útil para los diseñadores y fotógrafos que buscan crear composiciones visuales efectivas.

Para esta solución se plantea el escaneo de todos los pixeles empleando el arreglo pixels. Posteriormente, los valores de RGB existentes dentro de este arreglo se convierten a valores de HSL para luego transformar los valores únicamente del parametro L empleando el slider. Usando el slider se puede variar el parametro de lightness.

{{< details title="Implementacion Lightness" open=false >}}
{{< highlight js >}}
let img;
let r, g, b;
function preload() {
  img = loadImage("https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg");
}

function setup() {
  createCanvas(400, 400);
  slider = createSlider();
}

function draw() { 
  image(img, 0, 0, width, height);
  const d = pixelDensity();
  loadPixels();
  for (let i = 0; i < height * d; i++) {
    for (let j = 0; j < width * d; j++) {
      const index = 4 * (i + j * width * d);

      r = pixels[index + 0];
      g = pixels[index + 1];
      b = pixels[index + 2];

      const [h, s, l] = rgbToHsl(r, g, b);
      // pixels[index + 0] = h;
      // pixels[index + 1] = s;
      pixels[index + 2] = slider.value();
    }
  }

  updatePixels();
  //noLoop();
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
}
{{< /highlight >}}
{{< /details >}}

{{< hint warning >}}
**Nota**  
Deslizar el slider cambia la luminosidad de la imagen.
{{< /hint >}}

{{< p5-iframe sketch="/showcase/sketches/masking/ejercicio3/image_lightness.js" width="420" height="450" >}}

**3. Conclusiones**

Después de explorar el tema de los kernels de imagen, podemos concluir lo siguiente:

Los kernels de imagen son una herramienta esencial en el procesamiento de imágenes y en la visión por computadora en general. Son matrices numéricas que se utilizan para aplicar filtros y extraer características específicas de las imágenes.

Los kernels de imagen son ampliamente utilizados en diversas aplicaciones, desde el reconocimiento de objetos hasta la eliminación de ruido y la mejora de la calidad de las imágenes.

Los kernels de imagen pueden ser ajustados para aplicar diferentes tipos de filtros y extraer diferentes características de las imágenes. Esto significa que su aplicación es altamente personalizable y puede ser adaptada para diferentes tipos de problemas.

A futuro, se puede buscar la implementación de más kernels, con el propósito de aplicar filtros a las imágenes, como el filtro de desenfoque, el filtro de realce de bordes y el filtro de nitidez. Estos filtros pueden mejorar la calidad de la imagen y hacer que ciertas características sean más visibles.

También es posible emplearlos para la compresión de imagenes como el estándar JPEG. En este caso, los kernels se utilizan para transformar la imagen original en una representación más compacta.