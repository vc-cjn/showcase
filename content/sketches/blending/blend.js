let blendShader;
let colorB; // picked by user
let B; // vec4 vector sent to shader
let tex; // shader output texture
let cpickerB;
let bslider; // brightness slider
let bmselect; // blending mode select
let brightness;
let mode;
let img; // shader input texture
let input;
let video_on;

// Cargamos el shader desde los archivos
function preload() {
  blendShader = readShader('/showcase/sketches/blending/blend.frag', { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {

  createCanvas(900, 850, WEBGL);
  
  // Inicializamos el color picker que usaremos para aplicar el color
  colorB = color(10, 18, 255);
  
  tex = createGraphics(800, 800, WEBGL);
  
  cpickerB = createColorPicker(colorB);
  cpickerB.position(490, 200);

  bslider = createSlider(0, 1, 1, 0.05);
  bslider.position(490, 120);
  bslider.style('width', '80px');

  bmselect = createSelect();
  bmselect.position(490, 160);
  bmselect.option('MULTIPLY', 0);
  bmselect.option('ADD (LINEAR DODGE)', 1);
  bmselect.option('OVERLAY', 3);
  bmselect.option('COLOR BURN', 6);
  bmselect.option('LINEAR BURN', 7);
  bmselect.option('DIFFERENCE', 8);
  bmselect.option('DIVIDE', 9);
  bmselect.option('VIVID LIGHT', 13);
  bmselect.selected('MULTIPLY');

  img = loadImage('/showcase/sketches/blending/image.jpg');

  video_on = createCheckbox('Usar Video', false);
  video_on.changed(() => {
    if (video_on.checked()) {
      img = createVideo(['/showcase/sketches/blending/video0.mp4']);
      img.hide();
      img.loop();
    } else {
      img = loadImage('/showcase/sketches/blending/image.jpg');
      img.hide();     
      img.pause();
    }
    blendShader.setUniform('texture', img);
  })
}

function draw() {
 
  colorB = cpickerB.color()
  
  background(255);
  
  image(img, -450, -400, 400, 400); 

  
  
  // vec4 vector sent to shader
  B = [colorB._getRed() / 255, colorB._getGreen() / 255, colorB._getBlue() / 255, alpha(colorB) / 255] // normalized
  
  brightness = bslider.value();
  mode = bmselect.value();

  tex.shader(blendShader)
  blendShader.setUniform('texture', img); // each texel will be color A
  blendShader.setUniform('colorB', B); 
  blendShader.setUniform('brightness', brightness); 
  blendShader.setUniform('mode', mode); 
  tex.square();
  texture(tex);
  square(-850, 10, 800);
}

