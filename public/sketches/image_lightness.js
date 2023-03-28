let img;
let r, g, b;
function preload() {
  img = loadImage("https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg");
}

function setup() {
  createCanvas(400, 400);
  slider = createSlider();
}

function draw() { 
  image(img, 0, 0, width, height);
  const d = pixelDensity();
  loadPixels();
  for (let i = 0; i < height * d; i++) {
    for (let j = 0; j < width * d; j++) {
      const index = 4 * (i + j * width * d);

      r = pixels[index + 0];
      g = pixels[index + 1];
      b = pixels[index + 2];

      const [h, s, l] = rgbToHsl(r, g, b);
      // pixels[index + 0] = h;
      // pixels[index + 1] = s;
      pixels[index + 2] = slider.value();
    }
  }

  updatePixels();
  //noLoop();
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
}