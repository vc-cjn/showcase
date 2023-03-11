## Ejercicio 3

Para el ejercicio propuesto se buscan aplicar kernels de imagen a una imagen dada. No solo esto, sino que también se quiere evaluar la generación de histogramas en base a la imagen. 

### Image Kernel Application

En primer lugar se plantea la aplicación de kernels a la imagen. En este caso, se toman 3 kernels.

Recordemos que un kernel es una pequeña matriz empleada para aplicar efectos a una imagen. Similar a aquellos que se pueden encontrar en aplicaciones como Photoshop o Gimp.

Estos kernels tienen aplicaciones también en el campo del machine learning, en dónde su proposito involucra la extracción de features, en este contexto, es más común llamarlo convoluciones. 

Cada kernel tiene una matriz característica, la cual se presenta a continuación.

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


A continuación se toma una imagen del conocido jugador de futbol Vinicius Jr. para aplicarle los kernels. Es posible emplear el menú de selección para elegir que kernel se desea emplear sobre la imagen. Inicialmente, se muestra el kernel de Edge Detection.

{{< p5-iframe sketch="/showcase/sketches/image_kernels.js" width="825" height="525" >}}

### Image Histogram

Por otro lado, la aplicación desarrollada también tiene la posibilidad de realizar una representación del histograma de la imagen. Recordemos que un histograma de imagen es un tipo de histograma que da una representación visual de la distribución tonal dentro de la imagen. Es decir, una visualización gráfica del numero de pixeles para cada valor tonal. A continuación, el usuario puede seleccionar una de 3 imagenes para visualizar su histograma, incluyendo la imagen del jugador de futbol presentada previamente. 

{{< p5-iframe sketch="/showcase/sketches/image_histogram.js" width="625" height="625" >}}