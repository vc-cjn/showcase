# Ejercicio Blending

## Sobre el Color Blending

El color blending se refiere al proceso de combinar dos o más colores para crear un nuevo color o una transición suave entre diferentes colores. Se utiliza comúnmente en diversas disciplinas artísticas como la pintura, el diseño gráfico, el arte digital e incluso en aplicaciones cotidianas como el maquillaje y el diseño de interiores.

En el color blending, se mezclan diferentes pigmentos o tonos para producir colores intermedios o degradados. Los colores primarios, es decir, el rojo, azul y amarillo, se utilizan a menudo como base para el color blending. Al mezclar estos colores primarios en diferentes proporciones, se pueden crear colores secundarios como el naranja, verde y morado.

El color blending se puede lograr mediante diferentes técnicas, según el medio o las herramientas que se utilicen. Aquí hay algunos métodos comunes:

**Blending físico:** Esto implica combinar físicamente diferentes pigmentos o pinturas de colores para crear un color mezclado. Por ejemplo, mezclar pinturas azul y amarilla resultará en verde.

**Blending óptico:** La mezcla óptica ocurre cuando se colocan pequeños puntos o trazos de diferentes colores cerca uno del otro, y el ojo humano los percibe como un color mezclado. Esta técnica se utiliza comúnmente en el puntillismo, donde se aplican pequeños puntos de diferentes colores uno al lado del otro para crear un efecto mezclado general.

**Blending digital:** En el arte digital y el diseño gráfico, se puede lograr el color blending a través de herramientas de software. Programas como Photoshop u otros programas de edición gráfica ofrecen varios modos y herramientas de mezcla que permiten a los artistas crear transiciones suaves y mezclar colores de manera fluida.

La elección de la técnica de mezcla depende del efecto deseado y del medio que se esté utilizando. Los artistas y diseñadores suelen experimentar con diferentes técnicas de mezcla para lograr combinaciones de colores específicas, degradados o texturas en su trabajo.

## Blending de Color Digital

En muchos programas de edición de imágenes, se utilizan modelos de color como el modelo RGB (rojo, verde y azul) o el modelo CMYK (cian, magenta, amarillo y negro) para representar los colores. Cada canal de color en estos modelos puede tener un valor que varía de 0 a 255 (en el caso del modelo RGB) o de 0 a 100 (en el caso del modelo CMYK).

Cuando se realiza la mezcla de colores, los valores de los canales de color de los colores de origen se combinan de alguna manera para generar los valores de los colores resultantes. Por ejemplo, al mezclar un color rojo intenso con un color azul intenso utilizando un algoritmo de mezcla, es posible obtener una transición suave entre los dos colores, creando tonos de púrpura o magenta en el proceso.

Los programas de edición de imágenes suelen ofrecer diferentes modos de mezcla, como el modo normal, que simplemente reemplaza el color de fondo con el color frontal; el modo multiplicar, que oscurece el color de fondo al multiplicarlo por el color frontal; el modo de superposición, que combina los colores de manera más compleja, entre otros. Estos modos de mezcla proporcionan diferentes resultados y efectos visuales.

Los blending modes implementados son: multiply, add (linear dodge), overlay, color burn, linear burn, difference, divide, vivid light.

----------------------------------------------------------------

## Funcionamiento 

En este ejercicio, se emplea un shader de nombre blend (Se puede revisar bajo el ejercicio). Inicialmente, se realiza la carga de la imagen a la pantalla, así como la renderización de un color picker que tiene como proposito permitir al usuario el color a aplicar con el blend. Es importante notar, que para facilitar el procesamiento, se envia al shader el color normalizado (Un valor entre 0 y 1 producto de la división del valor RGB por 255)

Una vez en el shader, el mismo emplea cada texel que recibe en la imagen cargada (Textura) y hace el calculo con el color que ha recibido. Esta textura ajustada se renderiza bajo la imagen inicial. 

Se implementarion varios modos de blending con el proposito de demostrar su funcionamiento.

{{<p5-iframe sketch="/showcase/sketches/blending/blend.js" width="800" height="900" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js">}}

{{<details "Sketch Code">}}

``` js
let blendShader;
let colorB; // picked by user
let B; // vec4 vector sent to shader
let tex; // shader output texture
let cpickerB;
let bslider; // brightness slider
let bmselect; // blending mode select
let brightness;
let mode;
let img; // shader input texture
let input;
let video_on;

// Cargamos el shader desde los archivos
function preload() {
  blendShader = readShader('/showcase/sketches/blending/blend.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {

  createCanvas(900, 850, WEBGL);
  
  // Inicializamos el color picker que usaremos para aplicar el color
  colorB = color(10, 18, 255);
  
  tex = createGraphics(800, 800, WEBGL);
  
  cpickerB = createColorPicker(colorB);
  cpickerB.position(490, 200);

  bslider = createSlider(0, 1, 1, 0.05);
  bslider.position(490, 120);
  bslider.style('width', '80px');

  bmselect = createSelect();
  bmselect.position(490, 160);
  bmselect.option('MULTIPLY', 0);
  bmselect.option('ADD (LINEAR DODGE)', 1);
  bmselect.option('OVERLAY', 3);
  bmselect.option('COLOR BURN', 6);
  bmselect.option('LINEAR BURN', 7);
  bmselect.option('DIFFERENCE', 8);
  bmselect.option('DIVIDE', 9);
  bmselect.option('VIVID LIGHT', 13);
  bmselect.selected('MULTIPLY');

  img = loadImage('/showcase/sketches/blending/image.jpg');

  video_on = createCheckbox('Usar Video', false);
  video_on.changed(() => {
    if (video_on.checked()) {
      img = createVideo(['/showcase/sketches/blending/video0.mp4']);
      img.hide();
      img.loop();
    } else {
      img = loadImage('/showcase/sketches/blending/image.jpg');
      img.hide();     
      img.pause();
    }
    blendShader.setUniform('texture', img);
  })
}

function draw() {
 
  colorB = cpickerB.color()
  
  background(255);
  
  image(img, -450, -400, 400, 400); 

  
  
  // vec4 vector sent to shader
  B = [colorB._getRed() / 255, colorB._getGreen() / 255, colorB._getBlue() / 255, alpha(colorB) / 255] // normalized
  
  brightness = bslider.value();
  mode = bmselect.value();

  tex.shader(blendShader)
  blendShader.setUniform('texture', img); // each texel will be color A
  blendShader.setUniform('colorB', B); 
  blendShader.setUniform('brightness', brightness); 
  blendShader.setUniform('mode', mode); 
  tex.square();
  texture(tex);
  square(-850, 10, 800);
}
```
{{</details >}}

{{<details "Blend Shader">}}

``` glsl

precision mediump float;

uniform vec4 colorB;
uniform float brightness; // [0, 1]
uniform int mode;
uniform sampler2D texture;
varying vec2 texcoords2;

void main() {

  // https://stackoverflow.com/questions/67576655/why-my-texture-coordinates-are-inverted-each-time-i-call-my-glsl-shader-in-p5js
  vec4 colorA = texture2D(texture, vec2(texcoords2.x, 1.0 - texcoords2.y)); // each texel is color A

  if (mode == 0) { // multiply
    gl_FragColor = colorA * colorB * brightness;
  }
  else if (mode == 1) { // add (linear dodge)
    gl_FragColor = (colorA + colorB) * brightness;
  }
  else if (mode == 2) { // screen
    gl_FragColor = (1. - (1. - colorA) * (1. - colorB)) * brightness;
  }
  else if (mode == 3) { // overlay
    float R = (colorA[0] < 0.5) ? 2. * colorA[0] * colorB[0] : (1. - (1. - colorA[0]) * (1. - colorB[0]));
    float G = (colorA[1] < 0.5) ? 2. * colorA[1] * colorB[1] : (1. - (1. - colorA[1]) * (1. - colorB[1]));
    float B = (colorA[2] < 0.5) ? 2. * colorA[2] * colorB[2] : (1. - (1. - colorA[2]) * (1. - colorB[2]));
    float A = (colorA[3] < 0.5) ? 2. * colorA[3] * colorB[3] : (1. - (1. - colorA[3]) * (1. - colorB[3]));
    gl_FragColor = vec4(R, G, B, A) * brightness;
  }
  else if (mode == 4) { // darkest
    gl_FragColor = vec4(min(colorA[0], colorB[0]), 
                        min(colorA[1], colorB[1]), 
                        min(colorA[2], colorB[2]), 
                        min(colorA[3], colorB[3])) * brightness;
  }
  else if (mode == 5) { // lightest
    gl_FragColor = vec4(max(colorA[0], colorB[0]), 
                        max(colorA[1], colorB[1]), 
                        max(colorA[2], colorB[2]), 
                        max(colorA[3], colorB[3])) * brightness;
  }
  else if (mode == 6) { // color burn
    gl_FragColor = 1. - ((1. - colorA) / colorB) * brightness;
  }
  else if (mode == 7) { // linear burn
    gl_FragColor = (colorA + colorB - 1.) * brightness;
  }
  else if (mode == 8) { // difference
    gl_FragColor = (abs(colorA - colorB)) * brightness;
  }
  else if (mode == 9) { // divide
    gl_FragColor = (colorA / colorB) * brightness;
  }
  else if (mode == 10) { // exclusion
    gl_FragColor = (0.5 - 2. * (colorA - 0.5) * (colorB - 0.5)) * brightness;
  }
  else if (mode == 11) { // color dodge
    gl_FragColor = (colorA / (1. - colorB)) * brightness;
  }
  else if (mode == 12) { // hard light
    float R = (colorB[0] > 0.5) ? (1. - (1. - colorA[0]) * (1. - 2. * (colorB[0] - 0.5))) : colorA[0] * 2. * colorB[0];
    float G = (colorB[1] > 0.5) ? (1. - (1. - colorA[1]) * (1. - 2. * (colorB[1] - 0.5))) : colorA[1] * 2. * colorB[1];
    float B = (colorB[2] > 0.5) ? (1. - (1. - colorA[2]) * (1. - 2. * (colorB[2] - 0.5))) : colorA[2] * 2. * colorB[2];
    float A = (colorB[3] > 0.5) ? (1. - (1. - colorA[3]) * (1. - 2. * (colorB[3] - 0.5))) : colorA[3] * 2. * colorB[3];
    gl_FragColor = vec4(R, G, B, A) * brightness;
  }
  else if (mode == 13) { // vivid light
    float R = (colorB[0] > 0.5) ? colorA[0] / (1. - 2. * (colorB[0] - 0.5)) : (1. - (1. - colorA[0]) / (2. * colorB[0]));
    float G = (colorB[1] > 0.5) ? colorA[1] / (1. - 2. * (colorB[1] - 0.5)) : (1. - (1. - colorA[1]) / (2. * colorB[1]));
    float B = (colorB[2] > 0.5) ? colorA[2] / (1. - 2. * (colorB[2] - 0.5)) : (1. - (1. - colorA[2]) / (2. * colorB[2]));
    float A = (colorB[3] > 0.5) ? colorA[3] / (1. - 2. * (colorB[3] - 0.5)) : (1. - (1. - colorA[3]) / (2. * colorB[3]));
    gl_FragColor = vec4(R, G, B, A) * brightness;
  }
  else if (mode == 14) { // vivid light
    float R = (colorB[0] > 0.5) ? colorA[0] + 2. * (colorB[0] - 0.5) : (colorA[0] + 2. * colorB[0] - 1.);
    float G = (colorB[1] > 0.5) ? colorA[1] + 2. * (colorB[1] - 0.5) : (colorA[1] + 2. * colorB[1] - 1.);
    float B = (colorB[2] > 0.5) ? colorA[2] + 2. * (colorB[2] - 0.5) : (colorA[2] + 2. * colorB[2] - 1.);
    float A = (colorB[3] > 0.5) ? colorA[3] + 2. * (colorB[3] - 0.5) : (colorA[3] + 2. * colorB[3] - 1.);
    gl_FragColor = vec4(R, G, B, A) * brightness;
  }
  else if (mode == 15) { // pin light
    float R = (colorB[0] > 0.5) ? max(colorA[0], 2. * (colorB[0] - 0.5)) : min(colorA[0], 2. * colorB[0]);
    float G = (colorB[1] > 0.5) ? max(colorA[1], 2. * (colorB[1] - 0.5)) : min(colorA[1], 2. * colorB[1]);
    float B = (colorB[2] > 0.5) ? max(colorA[2], 2. * (colorB[2] - 0.5)) : min(colorA[2], 2. * colorB[2]);
    float A = (colorB[3] > 0.5) ? max(colorA[3], 2. * (colorB[3] - 0.5)) : min(colorA[3], 2. * colorB[3]);
    gl_FragColor = vec4(R, G, B, A) * brightness;    
  }
  else if (mode == 16) { // soft light photoshop
    float R = (colorB[0] < 0.5) ? 2. * colorA[0] * colorB[0] + colorA[0] * colorA[0] * (1. - 2. * colorB[0]) : 2. * colorA[0] * (1. - colorB[0]) + sqrt(colorA[0]) * (2. * colorB[0] - 1.);
    float G = (colorB[1] < 0.5) ? 2. * colorA[1] * colorB[1] + colorA[1] * colorA[1] * (1. - 2. * colorB[1]) : 2. * colorA[1] * (1. - colorB[1]) + sqrt(colorA[1]) * (2. * colorB[1] - 1.);
    float B = (colorB[2] < 0.5) ? 2. * colorA[2] * colorB[2] + colorA[2] * colorA[2] * (1. - 2. * colorB[2]) : 2. * colorA[2] * (1. - colorB[2]) + sqrt(colorA[2]) * (2. * colorB[2] - 1.);
    float A = (colorB[3] < 0.5) ? 2. * colorA[3] * colorB[3] + colorA[3] * colorA[3] * (1. - 2. * colorB[3]) : 2. * colorA[3] * (1. - colorB[3]) + sqrt(colorA[3]) * (2. * colorB[3] - 1.);
    gl_FragColor = vec4(R, G, B, A) * brightness;
  }
  else if (mode == 17) { // soft light pegtop
    gl_FragColor = ((1. - (2. * colorB)) * (colorA * colorA) + (2. * colorB * colorA)) * brightness;
  }
  else if (mode == 18) { // soft light illusions.hu
    float R = pow(colorA[0], pow(2., 2. * (0.5 - colorB[0])));
    float G = pow(colorA[1], pow(2., 2. * (0.5 - colorB[1])));
    float B = pow(colorA[2], pow(2., 2. * (0.5 - colorB[2])));
    float A = pow(colorA[3], pow(2., 2. * (0.5 - colorB[3])));
    gl_FragColor = vec4(R, G, B, A) * brightness;
  }
  else if (mode == 19) { // soft-light w3c
    float gRa = (colorA[0] <= 0.25) ? ((16. * colorA[0] - 12.) * colorA[0] + 4.) * colorA[0] : sqrt(colorA[0]); 
    float gGa = (colorA[1] <= 0.25) ? ((16. * colorA[1] - 12.) * colorA[1] + 4.) * colorA[1] : sqrt(colorA[1]); 
    float gBa = (colorA[2] <= 0.25) ? ((16. * colorA[2] - 12.) * colorA[2] + 4.) * colorA[2] : sqrt(colorA[2]); 
    float gAa = (colorA[3] <= 0.25) ? ((16. * colorA[3] - 12.) * colorA[3] + 4.) * colorA[3] : sqrt(colorA[3]);

    float R = (colorB[0] <= 0.5) ? colorA[0] - (1. - 2. * colorB[0]) * colorA[0] * (1. - colorA[0]) : colorA[0] + (2. * colorB[0] - 1.) * (gRa - colorA[0]);
    float G = (colorB[1] <= 0.5) ? colorA[1] - (1. - 2. * colorB[1]) * colorA[1] * (1. - colorA[1]) : colorA[1] + (2. * colorB[1] - 1.) * (gGa - colorA[1]);
    float B = (colorB[2] <= 0.5) ? colorA[2] - (1. - 2. * colorB[2]) * colorA[2] * (1. - colorA[2]) : colorA[2] + (2. * colorB[2] - 1.) * (gBa - colorA[2]);
    float A = (colorB[3] <= 0.5) ? colorA[3] - (1. - 2. * colorB[3]) * colorA[3] * (1. - colorA[3]) : colorA[3] + (2. * colorB[3] - 1.) * (gAa - colorA[3]);

    gl_FragColor = vec4(R, G, B, A) * brightness;

  }
  // http://www.deepskycolors.com/archivo/2010/04/21/formulas-for-Photoshop-blending-modes.html
}

```

{{</details >}}

## Conclusiones

En conclusión, el color blending es una técnica ampliamente utilizada en diversas disciplinas artísticas y aplicaciones cotidianas para crear transiciones suaves entre diferentes colores. Ya sea mediante la mezcla física de pigmentos, la mezcla óptica de puntos de colores o la mezcla digital a través de software, los artistas y diseñadores tienen diferentes métodos a su disposición para lograr combinaciones de colores específicas y efectos visuales impactantes. La elección de la técnica de mezcla depende del efecto deseado y del medio utilizado, y los artistas suelen experimentar con diferentes técnicas para lograr resultados únicos en su trabajo.

En cuanto al blending de color digital, los programas de edición de imágenes ofrecen diferentes modos de mezcla que permiten combinar los valores de los canales de color para generar transiciones suaves entre colores. Estos modos de mezcla, como el modo multiplicar, añadir, superponer y otros, proporcionan resultados visuales distintos y pueden ser utilizados para crear efectos específicos en una imagen. Los modelos de color, como el RGB y el CMYK, son utilizados en estos programas para representar los colores y realizar los cálculos necesarios para el blending. El uso de shaders en aplicaciones gráficas permite implementar estos modos de blending y proporcionar a los usuarios herramientas creativas para mezclar colores y lograr efectos visuales impresionantes en sus proyectos.

En cuanto al trabajo futuro, se podrían explorar nuevas técnicas de blending y modos de mezcla para ampliar aún más las posibilidades creativas en el color blending. También se podría investigar la aplicación del color blending en otros campos, como la realidad virtual o la impresión en 3D, para descubrir cómo esta técnica puede ser utilizada de formas innovadoras. Además, se podría desarrollar software más intuitivo y accesible que facilite el proceso de mezcla de colores para artistas y diseñadores, brindándoles herramientas más avanzadas y opciones personalizables. En resumen, el color blending sigue siendo un área en constante evolución que ofrece un gran potencial para la expresión artística y la creación visual, y hay muchas oportunidades para explorar y expandir sus aplicaciones en el futuro.