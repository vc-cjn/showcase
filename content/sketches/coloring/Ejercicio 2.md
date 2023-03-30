# **MODELOS DE COLOR**


### **XYZ**

El modelo de color XYZ, también llamado El espacio de color CIE 1931, establecido por la Comission
Internationale de l´Éclairage (CIE), fueron el resultado de una serie de experimentos realizados a fines de
la década de 1920 por William David Wright con diez observadores y John Guild con siete observadores.
Este modelo se basa en tres colores primarios hipotéticos, XYZ, y todos los colores visibles se pueden
representar usando solo valores positivos de X, Y y Z. Los colores primarios CIE XYZ son hipotéticos
porque no corresponden a ninguna longitud de onda de luz real. El primario Y se define
intencionalmente para que coincida estrechamente con la luminancia, mientras que los primarios X y Z
brindan información de color.


La posición del bloque de colores RGB representables en el espacio XYZ se muestra en la siguiente
figura:

![Imagen RGB](/showcase/sketches/coloring/FiguraXYZ.jpg)


Para ver un poco mejor la figura presentada anteriormente visita:

[Más aquí](https://programmingdesignsystems.com/color/color-models-and-color-spaces/index.html#:~:text=widely%20different%20dimensions.-,RGB,-is%20a%20color)


### **HSL y HSB**

HSL (hue, saturation, lightness) (tono, saturación, luminosidad) y HSB (hue, saturation, brightness) (para
tono, saturación, brillo; también conocido como HSV (hue, saturation, value), para tono, saturación,
valor), estos modelos se desarrollaron para ser más &quot;intuitivos&quot; en la manipulación del color y se
diseñaron para aproximarse a la forma en que los humanos perciben e interpretan el color.
Los componentes:
El tono define el color en sí. Los valores para el eje de tono varían de 0 a 360 comenzando y terminando
en rojo y pasando por verde, azul y todos los colores intermedios.
La saturación indica el grado en que el tono difiere de un gris neutro. Los valores van desde 0, lo que
significa que no hay saturación de color, hasta 1, que es la saturación máxima de un tono determinado
con una iluminación determinada.
Los componentes de La luminosidad (HLS) o El brillo (HSB), indica el nivel de iluminación. Ambos varían
de 0 (negro, sin luz) a 1 (blanco, iluminación completa). La diferencia entre los dos es que la saturación
máxima de tono (S=1) está en el valor B=1 (iluminación completa) en el modelo de color HSB y en la
luminosidad L=0.5 en el modelo de color HLS.

![Imagen RGB](/showcase/sketches/coloring/FiguraHslHsb.png)

Para ver gráficamente el funcionamiento puedes verlo en:
HSL: [Visita aquí](https://programmingdesignsystems.com/color/color-models-and-color-spaces/index.html#:~:text=17%25%20brightness-,HSL,-is%20another%20cylindrical)
HSV - HSB: [Visita aquí](https://programmingdesignsystems.com/color/color-models-and-color-spaces/index.html#:~:text=and%20blue%20lights.-,HSV,-is%20a%20cylindrical)

Se ha desarrollado un color picker en p5 para ver como varían los valores para RGB y HSL:

{{< details title="Implementacion" open=false >}}
{{< highlight md >}}
// Create a variable for color-picker object 
var colPic; 
  
function setup() { 
    
    // Create a canvas 
    createCanvas(400,200); 
      
    // Create a color-picker object  
    colPic = createColorPicker("green"); 
} 
  
function draw() { 
      
    // Set the background-color as 
    // chosen by the color-picker 
    background(colPic.color()); 
}                     
{{< /highlight >}}
{{< /details >}}

{{< p5-iframe sketch="/showcase/sketches/colorPicker.js" width="600" height="250">}}