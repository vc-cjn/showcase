# Ejercicio de fotomosaico

## Fotomosaicos Digitales

Un fotomosaico digital es una imagen compuesta por una colección de pequeñas imágenes llamadas teselas que, cuando se ven desde lejos, forman una imagen más grande y reconocible. Cada tesela es una fotografía o imagen en miniatura que se elige cuidadosamente para que represente un área específica de la imagen objetivo.

El proceso de creación de un fotomosaico digital implica los siguientes pasos:

* Colección de imágenes: Se selecciona una gran cantidad de imágenes que se utilizarán como teselas para componer el fotomosaico. Estas imágenes pueden ser fotografías, ilustraciones u otras imágenes digitales.

* División de la imagen objetivo: La imagen objetivo, es decir, la imagen final que se desea crear como fotomosaico, se divide en una cuadrícula de pequeñas áreas llamadas celdas. El tamaño y la forma de estas celdas pueden variar dependiendo del software o algoritmo utilizado.

* Selección de teselas: Para cada celda de la imagen objetivo, se busca una tesela correspondiente que tenga contenido visual similar a esa área. Esto se puede lograr comparando características como el color, la textura o la forma. El objetivo es encontrar una tesela que sea lo más parecida posible en apariencia a la parte de la imagen objetivo que representa.

* Composición del fotomosaico: A medida que se seleccionan las teselas adecuadas para cada celda, se van reemplazando las áreas correspondientes de la imagen objetivo con las teselas. A medida que se agregan más y más teselas, la imagen objetivo se va construyendo progresivamente y se transforma en un fotomosaico completo.

El resultado final es una imagen compuesta por una serie de teselas individuales que se combinan para formar una representación visual coherente y reconocible de la imagen objetivo. Los fotomosaicos digitales pueden ser muy detallados y atractivos visualmente, ya que están compuestos por una gran cantidad de imágenes pequeñas que aportan variedad y detalles a la imagen final.

Es importante mencionar que existen diferentes técnicas y algoritmos para crear fotomosaicos, algunos más simples y otros más sofisticados. Algunos programas y herramientas de edición de imágenes ofrecen funcionalidades específicas para la creación de fotomosaicos, simplificando el proceso y permitiendo ajustar diversos parámetros para obtener el resultado deseado.

## Funcionamiento 

La coordenada stepCoord mapea la coordenada de cada texel a su coordenada entera usando la función piso.
Por ejemplo, todos los texeles dentro del espacio [2.0, 3.0) X [2.0, 3.0] son mapeados a la coordenada (2, 2).
El texel en la coordenada mapeada, en este caso (2, 2) tiene un color. Ese color se asigna a todos los texeles que fueron mapeados. Ese es el mecanismo de pixelación usado, que aplica el concepto de coherencia espacial, pues no nos interesa qué color es, solo confiamos que será coherente con su espacio al rededor.

Las n imágenes del dataset son recibidas en el shader como una única imagen. Estas imágenes están ordenadas horizontalmente, una siguiendo a la otra. Podemos imaginar el buffer como un arreglo de dimensión **1 x n**. El shader llama a este buffer **palette** o paleta.

La coordenada symbolCoord indica de qué color se debe pintar cada texel en la textura de salida para que vaya dibujando los símbolos del mosaico, es decir las imágenes, correctamente. 

Es necesario hacer el siguiente mapeo sobre la componente horizontal de la coordenada **symbolCoord**.

{{< katex display>}}

\lbrack 0 .. 1 \rbrack \to \lbrack 0 .. 1/n \rbrack \\
symbolCoord.x \to symbolCoord.x / n

{{< /katex >}}

Donde **n** es el número de imagenes en el dataset y **1/n** es la longitud horizontal de cada imagen en la paleta.
De manera que si **n = 30**, la longitud de cada imagen es **1/n = 0.033..**

Si se usa **symbolCoord.x/n** para dibujar, cada símbolo contendrá los pixeles ubicados en el espacio [0, 1/n] X [0, 1] = [0, 0.033] X [0, 1] de la paleta, y eso corresponde a la primera imagen. Como el ordenamiento es por luma ascendente, la primera imagen es la más oscura.

Ahora, es necesario garantizar que con cada cada símbolo que se pinta tenga un luma coherente, de manera que el mosaico pinte la imagen que se quiere pintar. Para esto, se debe calcular el luma del color key. El valor de este luma está en [0.0, 1.0] pues los colores están normalizados. La coordenada vertical no tiene problema pues la dimensión del buffer es 1 x n por lo que no hay ambiguedad en decidir qué imagen se pinta verticalmente (siempre es una, y esa es la que es).

Para encontrar esta coordenada, se calcula la cantidad de desplazamiento horizontal hacia la derecha que se debe hacer desde la coordenada x = 0. Recordando que 1/n es la longitud de cada imagen en la paleta, podemos obtener la coordenada horizontal en la que empieza la imagen. De esta manera se garantiza que se obtiene una coordenada de una imagen con un luma coherente, y que además esta coordenada marca el inicio de la imagen, por lo que se va a poder dibujar correctamente dentro del símbolo.


Debe tenerse en cuenta que el luma de la imagen que se usa como símbolo puede no ser el más cercano, pues se está usando la función piso. Puede que para algunos casos, haya una imagen por encima que tenga un luma más cercano. Por ejemplo, si kluma = 0.098 el desplazamiento dará como resultado d = 0.066, que corresponde a la tercera imagen. Nada garantiza que la diferencia entre el luma de la tercera imagen y el kluma sea menor que la diferencia entre el luma de la cuarta imagen y el kluma. 

{{<p5-iframe sketch="/showcase/sketches/photomosaic/photomosaic.js" width="650" height="650" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.js">}}

{{<details "Imagenes Empleadas">}}
## Imagenes Empleadas
<img src="/showcase/sketches/resources/dataset/1.jpg" alt="1" width="150"/>
<img src="/showcase/sketches/resources/dataset/2.jpg" alt="2" width="150"/>
<img src="/showcase/sketches/resources/dataset/3.jpg" alt="3" width="150"/>
<img src="/showcase/sketches/resources/dataset/4.jpg" alt="4" width="150"/>
<img src="/showcase/sketches/resources/dataset/5.jpg" alt="5" width="150"/>
<img src="/showcase/sketches/resources/dataset/6.jpg" alt="6" width="150"/>
<img src="/showcase/sketches/resources/dataset/7.jpg" alt="7" width="150"/>
<img src="/showcase/sketches/resources/dataset/8.jpg" alt="8" width="150"/>
<img src="/showcase/sketches/resources/dataset/9.jpg" alt="9" width="150"/>
<img src="/showcase/sketches/resources/dataset/10.jpg" alt="10" width="150"/>
<img src="/showcase/sketches/resources/dataset/11.jpg" alt="11" width="150"/>
<img src="/showcase/sketches/resources/dataset/12.jpg" alt="12" width="150"/>
<img src="/showcase/sketches/resources/dataset/13.jpg" alt="13" width="150"/>
<img src="/showcase/sketches/resources/dataset/14.jpg" alt="14" width="150"/>
<img src="/showcase/sketches/resources/dataset/15.jpg" alt="15" width="150"/>
<img src="/showcase/sketches/resources/dataset/16.jpg" alt="16" width="150"/>
<img src="/showcase/sketches/resources/dataset/17.jpg" alt="17" width="150"/>
<img src="/showcase/sketches/resources/dataset/18.jpg" alt="18" width="150"/>
<img src="/showcase/sketches/resources/dataset/19.jpg" alt="19" width="150"/>
<img src="/showcase/sketches/resources/dataset/20.jpg" alt="20" width="150"/>
<img src="/showcase/sketches/resources/dataset/21.jpg" alt="21" width="150"/>
<img src="/showcase/sketches/resources/dataset/22.jpg" alt="22" width="150"/>
<img src="/showcase/sketches/resources/dataset/23.jpg" alt="23" width="150"/>
<img src="/showcase/sketches/resources/dataset/24.jpg" alt="24" width="150"/>
<img src="/showcase/sketches/resources/dataset/25.jpg" alt="25" width="150"/>
<img src="/showcase/sketches/resources/dataset/26.jpg" alt="26" width="150"/>
<img src="/showcase/sketches/resources/dataset/27.jpg" alt="27" width="150"/>
<img src="/showcase/sketches/resources/dataset/28.jpg" alt="28" width="150"/>
<img src="/showcase/sketches/resources/dataset/29.jpg" alt="29" width="150"/>
<img src="/showcase/sketches/resources/dataset/30.jpg" alt="30" width="150"/>
{{</details>}}
{{<details "Photomosaic Shader Code">}}

``` glsl
precision mediump float;

uniform sampler2D palette;
// source (image or video) is sent by the sketch
uniform sampler2D source;
uniform bool keys;
// displays original
uniform bool original;
// target horizontal & vertical resolution
uniform float resolution;
uniform float n;

// interpolated texcoord (same name and type as in vertex shader)
// defined as a (normalized) vec2 in [0..1]
varying vec2 texcoords2;

float luma(vec3 texel) {
    return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b; // min 0, max 255
}

void main() {
  if (original) {
    gl_FragColor = texture2D(source, texcoords2);
  }
  else {
    // i. define coord as a texcoords2 remapping in [0.0, resolution] ∈ R
    vec2 coord = texcoords2 * resolution;
    // ii. remap stepCoord in [0.0, resolution] ∈ Z
    vec2 stepCoord = floor(coord);
    vec2 symbolCoord = coord - stepCoord;
    // iii. remap stepCoord in [0.0, 1.0] ∈ R
    stepCoord = stepCoord / vec2(resolution); // normalized step coord
    // source texel
    vec4 key = texture2D(source, stepCoord); // texel will be the key to look up

    // we calculate key color luma
    float kluma = luma(key.rgb);

    // palette is an image containing the 30 images but with 1.0 x 1.0 dimensions.
    // each key will get an image from the palette: we have the symbol coord (x, y).
    // images are ordered horizontally, so we take x, which indicates the starting coordinate of our key, and divide it by n because we have n images, 
    // with this we can start counting from the left-most image to the right
    // to this quotient, we add kluma, which is a value between 0 a 1. It will ensure we are going to use the correct image texel. 
    // y coordinate need no special treatment.
    // for each texel, we need to paint the correct portion of the image that will represent

    vec4 paletteTexel = texture2D(palette, vec2(symbolCoord.x / n + kluma, symbolCoord.y));

    gl_FragColor = keys ? key : paletteTexel;
  }
}
```
{{</details >}}