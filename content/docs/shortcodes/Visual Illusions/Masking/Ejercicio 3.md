## Ejercicio 3

**1. Introducción**

Los kernels de imagen son una herramienta importante en el procesamiento de imágenes. Los kernels son matrices de valores numéricos que se utilizan para aplicar filtros a las imágenes y extraer características específicas de ellas.

El uso de kernels de imagen es muy común en aplicaciones de visión por computadora, como el reconocimiento de objetos, la detección de bordes, la eliminación de ruido y la mejora de la calidad de las imágenes.

Por ejemplo, un kernel de detección de bordes se puede utilizar para encontrar los bordes de un objeto en una imagen. El kernel se aplica a la imagen y busca los cambios abruptos en el brillo o el color de los píxeles. Esto puede ayudar a identificar las formas de los objetos en la imagen.

Los kernels de imagen también se utilizan en el preprocesamiento de imágenes antes de aplicar algoritmos de aprendizaje automático, como las redes neuronales convolucionales. En este caso, los kernels se utilizan para extraer características importantes de las imágenes que se utilizarán como entrada para el modelo de aprendizaje automático.

**2. Solución**

Para el ejercicio propuesto se buscan aplicar kernels de imagen a una imagen dada. No solo esto, sino que también se quiere evaluar la generación de histogramas en base a la imagen. 

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


A continuación se toma una imagen del conocido jugador de futbol Vinicius Jr. para aplicarle los kernels. Es posible emplear el menú de selección para elegir que kernel se desea emplear sobre la imagen. Inicialmente, se muestra el kernel de Edge Detection.

{{< p5-iframe sketch="/showcase/sketches/image_kernels.js" width="825" height="525" >}}

### Image Histogram

Por otro lado, la aplicación desarrollada también tiene la posibilidad de realizar una representación del histograma de la imagen. Recordemos que un histograma de imagen es un tipo de histograma que da una representación visual de la distribución tonal dentro de la imagen. Es decir, una visualización gráfica del numero de pixeles para cada valor tonal. A continuación, el usuario puede seleccionar una de 3 imagenes para visualizar su histograma, incluyendo la imagen del jugador de futbol presentada previamente. 

{{< p5-iframe sketch="/showcase/sketches/image_histogram.js" width="625" height="625" >}}

**3. Conclusiones**

Después de explorar el tema de los kernels de imagen, podemos concluir lo siguiente:

Los kernels de imagen son una herramienta esencial en el procesamiento de imágenes y en la visión por computadora en general. Son matrices numéricas que se utilizan para aplicar filtros y extraer características específicas de las imágenes.

Los kernels de imagen son ampliamente utilizados en diversas aplicaciones, desde el reconocimiento de objetos hasta la eliminación de ruido y la mejora de la calidad de las imágenes.

Los kernels de imagen pueden ser ajustados para aplicar diferentes tipos de filtros y extraer diferentes características de las imágenes. Esto significa que su aplicación es altamente personalizable y puede ser adaptada para diferentes tipos de problemas.

A futuro, se puede buscar la implementación de más kernels, con el propósito de aplicar filtros a las imágenes, como el filtro de desenfoque, el filtro de realce de bordes y el filtro de nitidez. Estos filtros pueden mejorar la calidad de la imagen y hacer que ciertas características sean más visibles.

También es posible emplearlos para la compresión de imagenes como el estándar JPEG. En este caso, los kernels se utilizan para transformar la imagen original en una representación más compacta.