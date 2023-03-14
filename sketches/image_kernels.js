var img;
var w = 100;
let matrix;
var maxRange = 256


// La funcion preload se ejecuta una unica vez antes de iniciar la funcionalidad de la aplicacion
function preload() {
  img = loadImage("/showcase/sketches/vinicius.jpg");
}

// Se prepara un canvas para colocar la imagen 
function setup() {
  createCanvas(800, 500);
  img.resize(800, 500);
  
  pixelDensity(1);

  // Crear un selector para el kernel a emplear 
  sel = createSelect();
  sel.position(0, 500);
  sel.option('Edge Detection');
  sel.option('Ridge Detection');
  sel.option('Sharpen');
  sel.option('Blur');

  // Estilo del selector 
  sel.style('font-size', '40px');
  sel.style('height', '60px');
  sel.style('width', '800px');
  sel.style('border-radius', '10px');
  sel.style('padding', '5px');
}

function mySelectEvent(){
  let item = sel.value();
  if (item == 'Edge Detection'){
    matrix = [[-1,-1,-1], 
              [-1,8,-1],
              [-1,-1,-1]];
   
    return matrix; 
  }

  if (item == 'Ridge Detection'){
    let v = 1.0/9.0;
    // kernel is the 3x3 matrix of normalized values
    let matrix = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]; 
    return matrix; 
  }

  if (item == 'Sharpen'){
    matrix = [  [0, -1, 0], 
                [-1, 6, -1],
                [0, -1, 0] ];
   
    return matrix; 
  }
  if (item == 'Blur'){
    matrix = [[0.0625, 0.125, 0.0625],
              [0.125, 0.25, 0.125],
              [0.0625, 0.125, 0.0625], ];
   
    return matrix; 
  }
}

function draw() {
  matrix = mySelectEvent();
  // Se ubica la imagen en el extremo superior izquierdo del canvas
  image(img, 0, 0);
  
  // Se limita el espacio sobre el cual se aplica el kernel a un cuadrado de dimensiones wxw
  var xstart = constrain(mouseX-w/2,0,img.width); 
  var ystart = constrain(mouseY-w/2,0,img.height);
  var xend = constrain(mouseX + w/2,0,img.width);
  var yend = constrain(mouseY + w/2,0,img.height);
  var matrixsize = 3;
  
  loadPixels();
  img.loadPixels();
  // Iteramos sobre cada pixel 
  for (var x = xstart; x < xend; x++ ) {
    for (var y = ystart; y < yend; y++ ) {
      // Para cada pixel se aplica la convolución y se determina el nuevo color del mismo.
      var result = convolution(x ,y , matrix, matrixsize, img); 
      var loc = (x + y * img.width) * 4;
      pixels[loc    ] = result[0];
      pixels[loc + 1] = result[1];
      pixels[loc + 2] = result[2];
      pixels[loc + 3] = 255;
      
    }
  }
  updatePixels();

  stroke(0);
  noFill();
  rect(xstart,ystart,w,w);
}

function convolution(x, y, matrix, matrixsize, img) {
  var rtotal = 0.0;
  var gtotal = 0.0;
  var btotal = 0.0;
  var offset = floor(matrixsize / 2);
  
  // Iteramos sobre la matriz de convolucion
  for (var i = 0; i < matrixsize; i++ ) {
    for (var j = 0; j < matrixsize; j++ ) {
      // What pixel are we testing
      var xloc = x + i-offset;
      var yloc = y + j-offset;
      var loc = (xloc + img.width * yloc) * 4;
      
      // Verificar que seguimos entre los bordes 
      loc = constrain(loc, 0, img.pixels.length-1);
      // Calculo de la convolucion.
      rtotal += img.pixels[loc    ] * matrix[i][j];
      gtotal += img.pixels[loc + 1] * matrix[i][j];
      btotal += img.pixels[loc + 2] * matrix[i][j];
    }
  }
  
  rtotal = constrain(rtotal,0,255);
  gtotal = constrain(gtotal,0,255);
  btotal = constrain(btotal,0,255);
  
  // Retornar el arreglo de colores
  return [rtotal,gtotal,btotal]; 
}