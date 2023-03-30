let img
function preload() {
  img = loadImage("/showcase/sketches/masking/ejercicio3/bmw.jpg"); 
}

function mySelectEvent() {
  let item = sel.value();
  img = loadImage("/showcase/sketches/masking/ejercicio3/" + item + ".jpg"); 
}

function setup() {
  // Inicializamos un selector para elegir la imagen a trabajar
  background(255);
  sel = createSelect();
  sel.position(10, 10);
  sel.option('bmw');
  sel.option('budapest');
  sel.option('vinicius');
  sel.selected('bmw');
  sel.changed(mySelectEvent);
  // Se inicializa el canvas para colocar la imagen y el grafico
  createCanvas(600, 600);

}

function draw(){
  background(255)
  img.resize(0,400);
  // Cambiamos el modo de color a HSL para hacer el histograma 
  var maxRange = 256
  colorMode(HSL, maxRange);
  image(img, 0, 0);
  // Inicializamos el histograma
  var histogram = new Array(maxRange);
  for (i = 0; i <= maxRange; i++) {
    histogram[i] = 0
  }

  // Cargamos los pixeles de la imagen
  loadPixels();
  
  // Para cada pixel se calcula el valor de HSL
  for (var x = 0; x < img.width; x+=5) {
    for (var y = 0; y < img.height; y+=5) {
      var loc = (x + y * img.width) * 4;
      var h = pixels[loc];
      var s = pixels[loc + 1];
      var l = pixels[loc + 2];
      var a = pixels[loc + 3];
      b = int(l);
      histogram[b]++
    }
  }
  // Se crea un placeholder para una nueva imagen
  image(img, 0, 0);
  // Retornamos a RGB para hacer el grafico
  colorMode(RGB);
  stroke(175,204,59)
  // Guardamos la configuración de dibujo actual
  push()
  //translate(10,0)
  // Se realiza el histograma empleando la función map y alturas 
  for (x = 0; x <= maxRange; x++) {
    index = histogram[x];

    y1=int(map(index, 0, max(histogram), height, height-200));
		y2 = height
    xPos = map(x,0,maxRange,0, width-20)
    line(xPos, y1, xPos, y2);
  }
  pop()
}
