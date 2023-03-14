## Ejercicio 1: Aplicación para ayudar a daltonicos

**1. Introducción**

El daltonismo se define como la incapacidad de ver algunos colores en la forma normal. Ocurre cuando existe un problema con ciertas celulas nerviosas del ojo que perciben el color. Si solo falta un pigmento, la persona suele tener inconvenientes al momento de diferenciar entre el rojo y el verde, el cual es el tipo más común de daltonismo. En la mayoría de los casos, esta condición se debe a un problema genético.

Ser daltonico, no solo significa ver los colores de forma diferente. De hecho, puede involucrar perderse de información vital dependiendo de la composición de una imagen. A continuación se presenta un ejemplo de ello. 

![Imagen Original]("https://res.cloudinary.com/demo/image/upload/docs/redflower.jpg")

Imagen 3: La imagen original

Sin embargo, para una persona con deuteranopia la imagen se vería similar a la siguiente. Evitando casi por completo que se detecte el saltamontes. 

![Imagen con Daltonismo]("https://res.cloudinary.com/demo/image/upload/e_simulate_colorblind/docs/redflower.jpg")

Imagen 2: La información en la imagen parece perderse

En ocasiones, se insertan patrones sobre determinados colores para diferenciarlos. Se puede pensar de esta solución como una convención para los colores. 


![Accesibilidad de color en Trello](https://wearecolorblind.com/wp-content/uploads/2018/08/postimage-trello.jpg)

Imagen 3: Patrones sobre colores con el proposito de facilitar su diferenciación
######

**2. Solución y resultados**

Ahora, para la solución de este ejercicio se ha planteado un script de p5.js que se encarga de etiquetar los colores en una imagen dada con el proposito de facilitar su visualización para un individuo con daltonismo.

Para esto hace uso del matiz, también conocido como tinte o por su nombre en inglés hue, que es la propiedad más másica ya ue es la que usamos para diferenciar un color de otro y por la cual lo nombramos. Cuando decimos "azul" o "verde" realmente estamos nombrando el matiz de un color. 

El codigo a continuación se encarga de obtener el color del pixel sobre el cual está ubucado el mouse y en base al mismo calcular el hue usando la función hue() de p5.

```
  let pix = img.get(mouseX, mouseY);

  image(img, 0, 0, width, height);

  // Get the RGB color for that pixel
  detectedColor = color(red(pix), green(pix), blue(pix));

  colorHue = hue(detectedColor)
```

El resultado desarrollado es el siguiente:

{{< p5-iframe sketch="/showcase/sketches/colorBlindness_sketch.js" width="715" height="530">}}

**3. Conclusiones**

La accesibilidad al contenido multimedia para personas con daltonismo es un problema que a menudo se pasa por alto, sin tener en cuenta el impacto que el diseño puede tener en diferentes usuarios. 

La aproximación tomada no es la única factible, de hecho existen muchas otras opciones con el propósito de mejorar la accesibilidad para personas con daltonismo.

- [Cloudinary](https://cloudinary.com/) ha implementado dentro de sus herramientas una puntuación que evalua una imagen dada en base a su accesibilidad, teniendo en cuenta los diferentes bordes, y los colores diferenciables en la misma. 