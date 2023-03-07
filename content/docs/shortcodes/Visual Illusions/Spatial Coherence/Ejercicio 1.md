## Ejercicio 1

Dentro de este ejercicio, se busca crear un pixelador de videos. Para ello se busca comparar 2 estrategias con el proposito de establecer la que mejor se ajusta a la calidad de la imagen. 

1. Color Averaging

En esta técnica, el color de cada pixel se determina en base al promedio de los colores que cubren cada sector de la imagen original. 

{{< p5-iframe sketch="/showcase/sketches/video_px_cavg.js" width="800" height="400">}}

2. Spatial Coherence 

En esta técnica, el color de cada pixel está dado por un color arbitrario dentro del sector de la imagen original. 

Nota: Este no es el video final. 
{{< p5-iframe sketch="/showcase/sketches/video_px_cavg.js" width="800" height="400">}}

Luego de este analisis, es lógico que surja la inquietud de cual de las dos alternativas puede llegar a ser mejor, y no solo eso, sino también la duda de como evaluar la calidad de la imagen resultante. 

Existen dos formas para evaluar la calidad de la imagen resultante: Es posible partir de un analisis objetivo, como el que se ha planteado en el benchmarking, es decir, medir que tan distante está la imagen obtenida de la imagen original. 

Por otro lado, es viable evaluar la calidad de manera subjetiva: Es decir, evaluando de la mano de los usuarios que tanto varió la calidad de la imagen (En términos de color, brillo, etc.)

