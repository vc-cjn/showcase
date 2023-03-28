## Ejercicio 1: Aplicación para ayudar a daltonicos

**1. Introducción**

El daltonismo es un trastorno de la visión que se caracteriza por la incapacidad o dificultad para distinguir ciertos colores. Esta condición también es conocida como deficiencia del color y es más común en hombres que en mujeres debido a que es un trastorno genético ligado al cromosoma X.

Existen diferentes tipos de daltonismo, siendo los más comunes el protanopia (incapacidad para distinguir el color rojo), deuteranopia (incapacidad para distinguir el color verde) y tritanopia (incapacidad para distinguir el color azul). Los individuos que sufren de daltonismo no perciben los colores de la misma manera que las personas sin este trastorno, lo que puede afectar su capacidad para realizar tareas que requieren una buena discriminación de los colores, como por ejemplo, trabajar con semáforos, distinguir señales de tráfico, entre otras.

Desde el punto de vista fisiológico, el daltonismo es causado por un defecto en los conos de la retina, que son las células responsables de detectar los diferentes colores. Los conos contienen pigmentos sensibles a diferentes longitudes de onda de la luz, y cuando estos pigmentos no funcionan correctamente, se produce una alteración en la percepción de los colores.

{{< hint info >}}
**Sabias que...**  
1 en 12 hombres es daltonico mientras que solo 1 de 200 mujeres tiene la condición
{{< /hint >}}

A nivel psicológico, el daltonismo puede tener un impacto negativo en la vida cotidiana de las personas que lo padecen. Pueden sentirse frustrados e incapaces de realizar ciertas actividades, lo que puede afectar su autoestima y su capacidad para relacionarse socialmente. Sin embargo, también existen estrategias y herramientas que pueden ayudar a los individuos con daltonismo a adaptarse y llevar una vida normal, como por ejemplo, el uso de lentes de contacto especiales, aplicaciones móviles que ayudan a distinguir los colores, y técnicas de compensación visual.

Ser daltonico, no solo significa ver los colores de forma diferente. De hecho, puede involucrar perderse de información vital dependiendo de la composición de una imagen. A continuación se presenta un ejemplo de ello. 

![Imagen Original]("https://res.cloudinary.com/demo/image/upload/docs/redflower.jpg")

Imagen 3: La imagen original

Sin embargo, para una persona con deuteranopia la imagen se vería similar a la siguiente. Evitando casi por completo que se detecte el saltamontes. 

![Imagen con Daltonismo]("https://res.cloudinary.com/demo/image/upload/e_simulate_colorblind/docs/redflower.jpg")

Imagen 2: La información en la imagen parece perderse

En ocasiones, se insertan patrones sobre determinados colores para diferenciarlos. Se puede pensar de esta solución como una convención para los colores. El uso de patrones en los colores puede ser de gran ayuda para las personas con daltonismo al mejorar la legibilidad y la percepción de la información presentada en un sitio web o aplicación. Los patrones son diseños repetitivos que se superponen sobre los colores de fondo para crear un contraste adicional y mejorar la distinción entre diferentes elementos visuales.

Por ejemplo, en lugar de utilizar solo colores para diferenciar entre dos elementos, como rojo y verde, se puede utilizar patrones como rayas diagonales, puntos, cuadros, entre otros. De esta manera, las personas con daltonismo pueden identificar la diferencia entre los elementos de acuerdo con la forma y el patrón de los diseños, en lugar de solo depender de la percepción del color.


![Accesibilidad de color en Trello](https://wearecolorblind.com/wp-content/uploads/2018/08/postimage-trello.jpg)

Imagen 3: Patrones sobre colores con el proposito de facilitar su diferenciación
######

**2. Solución y resultados**

Ahora, para la solución de este ejercicio se ha planteado un script de p5.js que se encarga de etiquetar los colores en una imagen dada con el proposito de facilitar su visualización para un individuo con daltonismo.

Para esto hace uso del matiz, también conocido como tinte o por su nombre en inglés hue, que es la propiedad más másica ya ue es la que usamos para diferenciar un color de otro y por la cual lo nombramos. Cuando decimos "azul" o "verde" realmente estamos nombrando el matiz de un color. 

El codigo a continuación se encarga de obtener el color del pixel sobre el cual está ubucado el mouse y en base al mismo calcular el hue usando la función hue() de p5.

{{< details title="Implementacion Texto" open=false >}}
{{< highlight md >}}
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

{{< /highlight >}}
{{< /details >}}

{{< details title="Implementacion Audio" open=false >}}
{{< highlight md >}}
let img;
let redAudio;
let blueAudio;
let orangeAudio;
let greenAudio;
let yellowAudio;
let violetAudio;

function preload() {
  img = loadImage('/showcase/sketches/redflower.jpg');
  soundFormats('mp3');
  redAudio = loadSound("/showcase/sketches/Red.mp3")
  blueAudio = loadSound("/showcase/sketches/Blue.mp3")
  orangeAudio = loadSound("/showcase/sketches/Orange.mp3")
  yellowAudio = loadSound("/showcase/sketches/Yellow.mp3")
  violetAudio = loadSound("/showcase/sketches/Violet.mp3")
  greenAudio = loadSound("/showcase/sketches/Green.mp3")
}

function setup() {
  createCanvas(700,500);
  img.resize(700, 500);
  textFont("Helvetica", 50);
}

function getColor(colorHue) {

  colorHue = hue(colorHue)
  
  if (colorHue > 0 && colorHue < 12) {
    foundColor = "Red";
    redAudio.play();
    return foundColor;
  }
  
  if (colorHue > 12 && colorHue < 33) {
    foundColor = "Orange";
    orangeAudio.play();
    return foundColor;
  }
  
  if (colorHue > 33 && colorHue < 67) {
    foundColor = "Yellow";
    yellowAudio.play();
    return foundColor;
  }
  
  if (colorHue > 67 && colorHue < 165) {
    foundColor = "Green";
    greenAudio.play();
    return foundColor;
  }
  
  if (colorHue > 165 && colorHue < 255) {
    foundColor = "Blue";
    blueAudio.play();
    return foundColor;
  }
  
  if (colorHue > 255 && colorHue < 311) {
    foundColor = "Violet";
    violetAudio.play();
    return foundColor;
  } 
  if (colorHue > 311) {
    foundColor = "Red";
    redAudio.play();
    return foundColor;
  }  
}

function draw() {
  background(220);
  image(img, 0, 0, width, height);
  noStroke();
}

function mousePressed(){ 
  let pix = img.get(mouseX, mouseY);
  // Get the RGB color for that pixel
  detectedColor = color(red(pix), green(pix), blue(pix));
    fill(0);
  text(getColor(detectedColor), 100,40);
}


{{< /highlight >}}
{{< /details >}}

El resultado desarrollado es el siguiente:

{{< p5-iframe sketch="/showcase/sketches/colorBlindness_sketch.js" width="715" height="530">}}

Otra alternativa que se construyó es una aplicación interactiva que permite a los usuarios explorar y experimentar con los colores de una imagen. Al hacer clic en un punto específico de la imagen, el programa utiliza algoritmos de procesamiento de imágenes para determinar el color del píxel correspondiente a ese punto. Luego, el programa emite un sonido que representa ese color de manera auditiva.

{{< hint warning >}}
**Asegurate que...**  
Tus altavoces están conectados para poder escuchar los sonidos de la aplicación. Recuerda que funciona al hacer click
{{< /hint >}}

{{< p5-iframe sketch="/showcase/sketches/colorBlindnessSound.js" width="715" height="530">}}

**3. Conclusiones y trabajo a futuro**

El ejercicio de accesibilidad para personas daltonicas es una estrategia importante para garantizar que los sitios web y las aplicaciones sean accesibles a todas las personas, independientemente de su capacidad visual. A través de la implementación de diversas técnicas y herramientas, se puede lograr que la información presentada en estos medios sea legible y fácil de interpretar para las personas con daltonismo.

Entre las técnicas más comunes se encuentran la selección adecuada de los colores utilizados en los elementos visuales, como los botones y los menús, y el uso de patrones y texturas para mejorar la legibilidad y la percepción de la información. También es importante proporcionar opciones de contraste y permitir que los usuarios personalicen la configuración de la interfaz según sus necesidades individuales.

La accesibilidad al contenido multimedia para personas con daltonismo es un problema que a menudo se pasa por alto, sin tener en cuenta el impacto que el diseño puede tener en diferentes usuarios. 

La aproximación tomada no es la única factible, de hecho existen muchas otras opciones con el propósito de mejorar la accesibilidad para personas con daltonismo.

- [Cloudinary](https://cloudinary.com/) ha implementado dentro de sus herramientas una puntuación que evalua una imagen dada en base a su accesibilidad, teniendo en cuenta los diferentes bordes, y los colores diferenciables en la misma. 

En conclusión, la implementación de estrategias de accesibilidad para personas daltonicas es una práctica esencial para garantizar la inclusión y la igualdad de acceso a la información. Es importante reconocer que el daltonismo es una condición común que afecta a un porcentaje significativo de la población, por lo que la implementación de técnicas de accesibilidad puede mejorar la accesibilidad y usabilidad de los sitios web y aplicaciones para estas personas. Además, la implementación de estas técnicas no solo beneficia a las personas con daltonismo, sino que también mejora la accesibilidad para todas las personas con discapacidades visuales o cognitivas.