# Ejercicio de Spatial Coherence

## Spatial Coherence vs Average Color (No Spatial Coherence)

En este ejericio se hace una implementación del pixelado de imágenes usando coherencia espacial y se propone presentar una alternativa empleando color averaging. Para el caso de spatial coherence el shader pixelator recibe la imagen y la resolución a utilizar. Una resolución de 30 significa que la imagen pixelada tendrá 30 pixeles de baja resolución (grandes) en cada lado. 

El mecanismo de coherencia espacial opera de la siguiente forma: Para cada texel se recibe una coordenada normalizada [0..1]. Cada componente se multiplica por la resolución por lo que si esta es 30, ahora [0..30]. Luego, a estas componentes se les calcula la función piso. Esta coordenada se divide entre la resolución para volver a obtener valores normalizadas. Aquí la coherencia espacial sea aplica porque se asume que ese color será cercano a los colores de todos los texeles que se mapean a dicha coordenada, aunque no sea cierto en todos los casos, pero siendo muy probable.

Se añadó una implementación que no usa coherencia espacial para que el usuario pueda comparar los resultados. Esta otra implementación, pinta cada pixel de baja resolución con el color promedio de los colores de los pixeles que se mapean a dicha coordenada. Esta aplicación fue implementada por software, es decir, no se usan shaders. El usuario debe subir la imagen que quiere comparar manualmentee a ambas implementaciones y mover el slider para que ambas tengan la misma resolución.

Se observará que no hay gran diferencia en los colores usados en los pixeles de baja resolución. Tal vez incluso parezca que la coherencia espacial muestra la imagen pixelada con un poco más de detalle, mientras que la que usa el promedio de los colores pareciera que estuviera pasando una convolución de tipo blur.

## Average Color (No Spatial Coherence)

A continuación se muestra la implementación hecha en software (no hardware) de la pixelación que no usa coherencia espacial (elegir arbitrariamente uno de los pixeles de una sección para pintar el pixel de baja resolución de dicha sección), sino que hace un promedio de los colores de los pixeles de toda la sección y así pinta el pixel de baja resolución.

El usuario debe cargar la imagen manualmente y mover el slider si es necesario para que tengan la misma resolución ambas implementaciones para poder comparar.

{{<p5-iframe sketch="/showcase/sketches/shader_sp/average.js" width="650" height="750">}}

{{<details "Color Averaging Sketch Code">}}

``` js

let mid = 10;
let w = 20; // pixel width and height: split is in groups of 256 pixels.

let input;
let img;

let width;
let height;

let resolution;

function setup() {

    input = createFileInput(handleFile);

    resolution = createSlider(1, 150, 30, 1);
    resolution.position(100, 10);
    resolution.style('width', '150px');
    resolution.input(() => {
        w = Math.floor(600 / resolution.value());
        mid = Math.floor(w / 2);
    });

}

function draw() {

    if (img != null && img.width > 0) {

        width = 600;

        height = 600;

        input.position(2 * width, 0);

        createCanvas(2 * width, height);

        image(img, width, 0, 600, 600);
    
        fill(100);
        noStroke();
        for (let i = 0; i < width; i += w)
        {
            for (let j = 0; j < height; j += w)
            {
                square(i, j, w);
            } 
        }   
    
        let COLORS = {}
    
        for (let i = 0; i < width; i++) {
            let i_ = i + width;
            for (let j = 0; j < height; j++) {
                let color = get(i_, j);
                let key = `${Math.floor(i / w)}-${Math.floor(j / w)}`;
                if (COLORS[key] == null)
                    COLORS[key] = [];
                COLORS[key].push(color);
            }
        }
    
        for (const key in COLORS) {
            let colors = COLORS[key]
            let R = 0;
            let G = 0;
            let B = 0;
            colors.forEach((c) => {
                R += c[0];
                G += c[1];
                B += c[2];
            })
            COLORS[key] = [Math.floor(R / w**2), Math.floor(G / w**2), Math.floor(B / w**2)]
        }
    
        for (const key in COLORS) {
            fill(COLORS[key])
            let x = parseInt(key.split('-')[0])
            let y = parseInt(key.split('-')[1])
            square(x*w, y*w, w);
        }
    
    }
}

function handleFile(file) {
    if (file.type === 'image') {
      img = createImg(file.data, '');
      img.hide();
    } else {
      img = null;
    }
  }

```
{{</details >}}

## Conclusiones 

En conclusión, en este ejercicio se presentaron dos implementaciones de pixelación de imágenes: una utilizando coherencia espacial y otra utilizando el promedio de colores. La implementación basada en coherencia espacial toma en cuenta la ubicación de los texeles y asume que el color de cada texel será cercano a los colores de los texeles que se mapean a la misma coordenada, lo cual puede resultar en una imagen pixelada con cierto grado de detalle. Por otro lado, la implementación que utiliza el promedio de colores pinta cada pixel de baja resolución con el promedio de los colores de los pixeles que se encuentran en la misma sección, lo cual puede generar una apariencia de desenfoque o convolución.

Al comparar ambas implementaciones, se observa que no hay una diferencia significativa en los colores utilizados en los pixeles de baja resolución. Sin embargo, la implementación basada en coherencia espacial puede presentar un poco más de detalle en la imagen pixelada, mientras que la implementación que utiliza el promedio de colores puede dar la sensación de un efecto de desenfoque.

En cuanto al trabajo futuro, se podrían explorar otras técnicas de pixelación que utilicen diferentes algoritmos o enfoques para obtener resultados distintos. También sería interesante investigar cómo mejorar la implementación de coherencia espacial para lograr una mayor precisión en la selección de colores basados en la ubicación de los texeles. Además, se podría experimentar con combinaciones de diferentes técnicas de pixelación para obtener efectos personalizados y creativos. En resumen, la pixelación es un campo en el que se pueden explorar diversas técnicas y enfoques para lograr resultados visuales interesantes, y existe un amplio espacio para la investigación y la experimentación en este campo.