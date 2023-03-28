## Ejercicio 1
**1. Introducción**

Las técnicas de pixelado de imágenes y videos son herramientas muy utilizadas en el procesamiento de medios digitales. El pixelado, también conocido como "mosaicado", se refiere al proceso de reducir la resolución de una imagen o video, lo que resulta en la pérdida de detalles y la creación de un efecto de "bloques" o "mosaicos" en la imagen o video.

El pixelado se ha utilizado tradicionalmente para ocultar información en imágenes y videos, ya sea por motivos de privacidad o para proteger la propiedad intelectual. Sin embargo, también se ha convertido en una técnica popular en el mundo del arte digital y la fotografía creativa.

En este contexto, el pixelado se utiliza para crear efectos visuales interesantes y estilizados, que van desde lo abstracto hasta lo surrealista. Además, el pixelado también se ha utilizado en videojuegos y animaciones para crear un estilo de arte distintivo.

En esta era digital, las técnicas de pixelado se han vuelto cada vez más sofisticadas y han evolucionado para incluir algoritmos de inteligencia artificial y aprendizaje automático. Estos métodos avanzados de pixelado permiten una mayor precisión en la reducción de la resolución, lo que puede resultar en imágenes y videos pixelados más realistas y estéticamente atractivos.

**2. Solución**

Dentro de este ejercicio, se busca crear un pixelador de videos. Para ello se busca comparar 2 estrategias con el proposito de establecer la que mejor se ajusta a la calidad de la imagen. 

**2.1. Color Averaging**

El promedio de color es un proceso de computación visual que consiste en calcular el color promedio de un conjunto de píxeles en una imagen o video. Esta técnica se usa a menudo para reducir el ruido u otras variaciones no deseadas en una imagen al suavizar los valores de píxeles en una región local. El promedio de color funciona tomando el valor promedio de cada canal de color (por ejemplo, rojo, verde, azul) para todos los píxeles dentro de una región específica y asignando ese valor promedio a un píxel central dentro de esa región. Este proceso se puede repetir en una imagen o video completo para crear una apariencia más suave y consistente. El promedio de color se usa comúnmente en tareas como el filtrado de imágenes, la corrección de color y la mejora de imágenes. Sin embargo, también puede resultar en la pérdida de detalles o nitidez en una imagen, particularmente en áreas con alto contraste o textura fina, por lo que debe usarse con prudencia y teniendo en cuenta la aplicación específica. En esta técnica, el color de cada pixel se determina en base al promedio de los colores que cubren cada sector de la imagen original. 

{{< p5-iframe sketch="/showcase/sketches/video_px_cavg.js" width="825" height="425">}}

**2.2. Spatial Coherence**

En computación visual, la coherencia espacial se refiere al grado en que los píxeles vecinos en una imagen o video tienen valores o características similares. Las imágenes con alta coherencia espacial tienen una apariencia uniforme y continua, con poca variación en los valores de píxeles dentro de las regiones locales. Esta propiedad puede ser útil en tareas de procesamiento de imágenes como la detección de bordes y la segmentación, donde a menudo es deseable identificar áreas de una imagen que son similares o están conectadas de alguna manera. Por el contrario, las imágenes con coherencia espacial baja tienen una apariencia más aleatoria y ruidosa, con un alto grado de variación en los valores de píxeles dentro de las regiones locales. Esta propiedad puede ser útil en aplicaciones como la síntesis de texturas y la generación de procedimientos, donde se desea una apariencia más aleatoria. En general, la coherencia espacial es un concepto importante en la computación visual que juega un papel clave en muchas tareas de procesamiento de imágenes y videos. En esta técnica, el color de cada pixel está dado por un color arbitrario dentro del sector de la imagen original. 


{{< p5-iframe sketch="/showcase/sketches/video_px_scoh.js" width="825" height="425">}}


**3. Conclusiones**

Luego de este analisis, es lógico que surja la inquietud de cual de las dos alternativas puede llegar a ser mejor, y no solo eso, sino también la duda de como evaluar la calidad de la imagen resultante. 

Existen dos formas para evaluar la calidad de la imagen resultante: Es posible partir de un analisis objetivo, como el que se ha planteado en el benchmarking, es decir, medir que tan distante está la imagen obtenida de la imagen original. 

Por otro lado, es viable evaluar la calidad de manera subjetiva: Es decir, evaluando de la mano de los usuarios que tanto varió la calidad de la imagen (En términos de color, brillo, etc.)

Para el video presentado de los leones, el resultado dado por el promedio del color es mucho más fiel a los colores iniciales del video, probablemente en tanto se asegura de dar valores siempre en razón a la variación de los pixeles en ese marco de referencia. Mientras tanto, el uso de la coherencia espacial resulta en una imagen en la que a medida que avanza el video se va quedando corta para representar los verdaderos colores del video. De modo que si se trata de buscar una mejora en la precisión de color es mejor emplear el promedio de colores, mientras que si se desea ocultar lo que está en la imagen es preferible usar coherencia espacial.

