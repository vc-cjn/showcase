//Proyecto realizado por Carlos Augusto Niño Medina.
//Laberinto UN Búho -- Maze UN Owl

var cam;
var walls = [];
var locked = false;
var x = 0, y = 0, z = 0;
var player, ground,ground2, obsticals;
var wall1, wall2, wall3, wall4;
var viewInside = true;
let rotationActive = false;
var angle = 0; // Para rotar la cámara en tercera persona
let CANTIDAD_ESTRELLAS = 8000;
let estrellas = [];
let earth;
let angleEarth=0;
let angleMoon=0;
let angleSun=0;
let suelo;
let n = 30 // Radio de esfera
let a = 0 // Ángulo de la identidad circular
let r = 10 
let sunLightActive = true;  // Por defecto, la luz del sol está activa

function preload() {
    suelo = loadImage('/showcase/sketches/space_transformation/pasto1.jpg');
    sueloExt=loadImage('/showcase/sketches/space_transformation/ground5.jpeg');
    muros=loadImage('/showcase/sketches/space_transformation/muros.jpg');
    earth=loadImage('/showcase/sketches/space_transformation/earth.jpeg');
    moon=loadImage('/showcase/sketches/space_transformation/moon.jpeg');
    sun=loadImage('/showcase/sketches/space_transformation/sun.jpeg');
  }

function setup() {
  createCanvas(windowWidth - 25,windowHeight - 25,WEBGL);
  for (let i = 0; i < CANTIDAD_ESTRELLAS; i++) {
    estrellas.push(new Estrella());
  }
  perspective(PI / 3.0, width / height, 0.1, 100000);  // 10000 es la distancia máxima que la cámara puede ver
  cam = createCamera()
  cam.setPosition(cam.eyeX, -90, cam.eyeZ);
  ground = new Box(0,0,0,3000,30,3000, suelo);
  walls.push(ground);
  ground2 = new Box(0,0,10,16000,20,16000,suelo);
  walls.push(ground2);
  
  //Muro superior
  wall3 = new Box(-1480,-170,890,100,600,1275,muros);
  walls.push(wall3);
  wall4 = new Box(-1480,-170,-890,100,600,1275,muros);
  walls.push(wall4);
  
  //Superiores horizontales Medio
  wall31 = new Box(-2055,-170,1440,100,600,1275,muros);
  walls.push(wall31);
  wall32 = new Box(-2055,-170,-1440,100,600,1275,muros);
  walls.push(wall32);
  
  //Superiores verticales
  wall5 = new Box(-2070,-170,-300,1275,600,100,muros);
  walls.push(wall5);
  wall6 = new Box(-2070,-170,300,1275,600,100,muros);
  walls.push(wall6);
  
  //Verticales paralelas
  wall17 = new Box(-1655,-170,-853,900,600,100,muros);
  walls.push(wall17);
  wall30 = new Box(-1655,-170,853,900,600,100,muros);
  walls.push(wall30);
  
  //Superiores Horizontales arriba
  wall7 = new Box(-2655,-170,-890,100,600,1275,muros);
  walls.push(wall7);
  wall8 = new Box(-2655,-170,890,100,600,1275,muros);
  walls.push(wall8);
  
  //Tope pared superior
  wall9 = new Box(-3355,-170,0,100,600,3050,muros);
  walls.push(wall9);
  
  //Cabeza borde superior
  wall80 = new Box(-4855,-170,0,100,600,9050,muros);
  walls.push(wall80);
  
  //Borde superior birrete
  wall81 = new Box(-7255,-170,0,100,600,12050,muros);
  walls.push(wall81);
  
  //Borde superior izquierdo birrete
  wall82 = new Box(-6300,-170,4550,2000,600,100,muros);
  walls.push(wall82);
  
  //Borde superior Derecho birrete
  wall100 = new Box(-6300,-170,-4550,2000,600,100,muros);
  walls.push(wall100);
  
  //Oreja izquierda buho
  wall83 = new Box(-6300,-170,4550,2000,600,100,muros);
  walls.push(wall83);
  wall84 = new Box(7500,-170,2300,1900,600,100,muros);
  walls.push(wall83);
  
  //Relleno birrete izquierda
  wall85 = new Box(-6300,-170,3350,2000,600,100,muros);
  walls.push(wall85);
  wall86 = new Box(-6300,-170,2150,2000,600,100,muros);
  walls.push(wall86);
  wall87 = new Box(-6300,-170,950,2000,600,100,muros);
  walls.push(wall87);
  wall88 = new Box(-5800,-170,3950,2000,600,100,muros);
  walls.push(wall88);
  wall89 = new Box(-5800,-170,2750,2000,600,100,muros);
  walls.push(wall89);
  wall90 = new Box(-5800,-170,1550,2000,600,100,muros);
  walls.push(wall90);
  
  //Relleno birrete Derecha
  wall91 = new Box(-6300,-170,-3350,2000,600,100,muros);
  walls.push(wall91);
  wall92 = new Box(-6300,-170,-2150,2000,600,100,muros);
  walls.push(wall92);
  wall93 = new Box(-6300,-170,-950,2000,600,100,muros);
  walls.push(wall93);
  wall94 = new Box(-5800,-170,-3950,2000,600,100,muros);
  walls.push(wall94);
  wall95 = new Box(-5800,-170,-2750,2000,600,100,muros);
  walls.push(wall95);
  wall96 = new Box(-5800,-170,-1550,2000,600,100,muros);
  walls.push(wall96);
  
  //Muro Derecho 
  wall10 = new Box(890,-170,-1480,1275,600,100,muros);
  walls.push(wall10);
  wall11 = new Box(-890,-170,-1480,1275,600,100,muros);
  walls.push(wall11);
  
  //Derecho Intermedio
  wall33 = new Box(1465,-170,-2030,1275,600,100,muros);
  walls.push(wall33);
  wall34 = new Box(-1465,-170,-2030,1275,600,100,muros);
  walls.push(wall34);
  
  //Derecho horizontales
  wall12 = new Box(300,-170,-2070,100,600,1275,muros);
  walls.push(wall12);
  wall13 = new Box(-300,-170,-2070,100,600,1275,muros);
  walls.push(wall13);
  
  //Derecho Exteriores
  wall14 = new Box(890,-170,-2655,1275,600,100,muros);
  walls.push(wall14);
  wall15 = new Box(-890,-170,-2655,1275,600,100,muros);
  walls.push(wall15);
  
  //Derecho Tope
  wall16 = new Box(0,-170,-3355,3050,600,100,muros);
  walls.push(wall16);
  
  //Ala exterior Derecha superior
  wall41 = new Box(4500,-170,-4605,3050,600,100,muros);
  walls.push(wall41);
  
  //Ala exterior Derecha inferior
  wall42 = new Box(-3000,-170,-4590,6050,600,100,muros);
  walls.push(wall42);
  
  //Relleno ala derecha
  wall53 = new Box(-890,-170,-4000,1275,600,100,muros);
  walls.push(wall53);
  wall54 = new Box(-300,-170,-4590,100,600,1275,muros);
  walls.push(wall54);
  wall55 = new Box(-890,-170,-5175,1275,600,100,muros);
  walls.push(wall55);
  wall56 = new Box(-1465,-170,-4550,1275,600,100,muros);
  walls.push(wall56);
  
  wall66 = new Box(300,-170,-4590,100,600,1275,muros);
  walls.push(wall66); //Horizontal
  wall67 = new Box(890,-170,-4000,1275,600,100,muros);
  walls.push(wall67); //Vertical
  wall68 = new Box(890,-170,-4587,425,600,100,muros);
  walls.push(wall68); //Vertical
  wall69 = new Box(-860,-170,-5675,2300,600,100,muros);
  walls.push(wall69);
  wall70 = new Box(-430,-170,-6175,1500,600,100,muros);
  walls.push(wall70);
  wall71 = new Box(-1130,-170,-6675,650,600,100,muros);
  walls.push(wall71);
  wall72 = new Box(1050,-170,-5175,525,600,100,muros);
  walls.push(wall72); //Vertical
  wall73 = new Box(2655,-170,-2600,100,600,1275,muros);
  walls.push(wall73);
  wall74 = new Box(2055,-170,-3300,100,600,1275,muros);
  walls.push(wall74);
  
  //Pata exterior Derecha
  wall46 = new Box(3980,-170,-3245,1500,600,100,muros);
  walls.push(wall46);
  
  wall77 = new Box(3380,-170,-2645,1500,600,100,muros);
  walls.push(wall77);
  
  wall78 = new Box(3980,-170,-2045,1500,600,100,muros);
  walls.push(wall78);
  
  wall47 = new Box(3980,-170,-1475,1500,600,100,muros);
  walls.push(wall47);
  
  wall48 = new Box(4680,-170,-2400,100,600,1745,muros);
  walls.push(wall48);
  
  //Cabeza Derecha
  wall97 = new Box(-3100,-170,-4900,1275,600,100,muros);
  walls.push(wall97);
  
  //Oreja Derecha buho
  wall98 = new Box(-6300,-170,-4550,2000,600,100,muros);
  walls.push(wall98);
  wall99 = new Box(7500,-170,-2300,1900,600,100,muros);
  walls.push(wall99);
  
  //Muro Izquierdo
  wall23 = new Box(890,-170,1480,1275,600,100,muros);
  walls.push(wall23);
  wall24 = new Box(-890,-170,1480,1275,600,100,muros);
  walls.push(wall24);
  
  //Intermedio Izquiero
  wall35 = new Box(1465,-170,2030,1275,600,100,muros);
  walls.push(wall35);
  wall36 = new Box(-1465,-170,2030,1275,600,100,muros);
  walls.push(wall36);
  
  //Izquierdo Horizontales
  wall25 = new Box(300,-170,2070,100,600,1275,muros);
  walls.push(wall25);
  wall26 = new Box(-300,-170,2070,100,600,1275,muros);
  walls.push(wall26);
  
  //Izquierdo Exteriores
  wall27 = new Box(890,-170,2655,1275,600,100,muros);
  walls.push(wall27);
  wall28 = new Box(-890,-170,2655,1275,600,100,muros);
  walls.push(wall28);
  
  //Izquierdo Tope
  wall29 = new Box(0,-170,3355,3050,600,100,muros);
  walls.push(wall29);
  
  //Ala exterior Izquierda superior
  wall39 = new Box(4500,-170,4605,3050,600,100,muros);
  walls.push(wall39);
  
  //Ala exterior Izquierda inferior
  wall40 = new Box(-3000,-170,4590,6050,600,100,muros);
  walls.push(wall40);
  
  
  //Relleno ala izquierda
  wall49 = new Box(-890,-170,4000,1275,600,100,muros);
  walls.push(wall49);
  wall50 = new Box(-300,-170,4590,100,600,1275,muros);
  walls.push(wall50);
  wall51 = new Box(-890,-170,5175,1275,600,100,muros);
  walls.push(wall51);
  wall52 = new Box(-1465,-170,4550,1275,600,100,muros);
  walls.push(wall52);
  wall57 = new Box(300,-170,4590,100,600,1275,muros);
  walls.push(wall57); //Horizontal
  wall58 = new Box(890,-170,4000,1275,600,100,muros);
  walls.push(wall58); //Vertical
  wall59 = new Box(890,-170,4587,425,600,100,muros);
  walls.push(wall58); //Vertical
  wall60 = new Box(-860,-170,5675,2300,600,100,muros);
  walls.push(wall60);
  wall61 = new Box(-430,-170,6175,1500,600,100,muros);
  walls.push(wall61);
  wall62 = new Box(-1130,-170,6675,650,600,100,muros);
  walls.push(wall62);
  wall63 = new Box(1050,-170,5175,525,600,100,muros);
  walls.push(wall63); //Vertical
  wall64 = new Box(2655,-170,2600,100,600,1275,muros);
  walls.push(wall64);
  wall65 = new Box(2055,-170,3300,100,600,1275,muros);
  walls.push(wall65);
  
  //Pata exterior Izquierda
  wall43 = new Box(3980,-170,3245,1500,600,100,muros);
  walls.push(wall43);
  
  wall75 = new Box(3380,-170,2645,1500,600,100,muros);
  walls.push(wall75);
  
  wall76 = new Box(3980,-170,2045,1500,600,100,muros);
  walls.push(wall76);
  
  wall44 = new Box(3980,-170,1475,1500,600,100,muros);
  walls.push(wall44);
  
  wall45 = new Box(4680,-170,2400,100,600,1745,muros);
  walls.push(wall45);
  
  //Cabeza Izquierda
  wall79 = new Box(-3100,-170,4900,1275,600,100,muros);
  walls.push(wall79);
  
  //Muros de abajo
  wall1 = new Box(1480,-170,890,100,600,1275,muros);
  walls.push(wall1);
  wall2 = new Box(1480,-170,-890,100,600,1275,muros);
  walls.push(wall2);
  
  //Inferior Intermedio
  wall37 = new Box(2055,-170,1440,100,600,1275,muros);
  walls.push(wall37);
  wall38 = new Box(2055,-170,-1440,100,600,1275,muros);
  walls.push(wall38);
  
  //Inferior verticales
  wall18 = new Box(2070,-170,-300,1275,600,100,muros);
  walls.push(wall18);
  wall19 = new Box(2070,-170,300,1275,600,100,muros);
  walls.push(wall19);
  
  //Inferior Exterior
  wall20 = new Box(2655,-170,-890,100,600,1275,muros);
  walls.push(wall20);
  wall21 = new Box(2655,-170,890,100,600,1275,muros);
  walls.push(wall21);
  
  
  //Inferior tope
  wall22 = new Box(3355,-170,0,250,600,3050,muros);
  walls.push(wall22);
  
}

function draw() {
  background(0);

  //Objeto Perdido
  push();
  colorMode(HSB, 255);
  translate(-6000,-200,0);
  let j = 100 // Tamaño de las cajas
  let rojo
  for(let i=0;i<9;i++){ // Función for
    rojo = map( sin(millis()/1000), -1, 1, 50, 190);
    
    fill(rojo, 250, 100,50)
    rotateX(frameCount * 0.004)
    rotateY(frameCount * 0.0004)
    box(j, j, j) // Cajas
    j +=i*4 // Variación al tamaño de las cajas
    n = (n/2)*cos(a)+20 // Identidad circular
    n++ // Crecimiento esfera
    a+=0.004 // Velocidad de crecimiento de la esfera
  }
  push();
  noStroke()
  fill(20, 230, rojo)
  sphere(n) // Dibujo de la esfera
  pop(); 
  pop();
  translate(0, 900,10000);
  for (const estrella of estrellas) {
      estrella.dibujar();
  }
  
  noStroke();
  let sunX, sunY, sunZ;
  sunX = 90000 * cos(angleSun); // Calculamos la posición del Sol en x
  sunY = 60000 * sin(angleSun); // Y coord, ahora se ajusta en función del ángulo
  sunZ = 90000 * sin(angleSun); // Calculamos la posición del Sol en z

  // Dibujamos el Sol en su nueva posición
  push();
  translate(sunX, sunY, sunZ);
  rotateY(angleSun);
  texture(sun);
  sphere(5000);
  pop();   

  angleSun += 0.005      ; // Incrementamos el ángulo para la próxima iteración

  // Configuramos la luz para que apunte hacia el origen desde la posición del Sol
  if (sunLightActive) {
    // Configuramos la luz para que apunte hacia el origen desde la posición del Sol
    let lightIntensity = sunY > 0 ? 0 : 255;
    directionalLight(lightIntensity, lightIntensity, lightIntensity, -sunX, -sunY, -sunZ);
  } else {
    // Configuramos las luces direcciones alternativas
    var lightDir = [createVector(1,0,0), createVector(0,1,0), createVector(0,0,1), 
                    createVector(0,-1,-1), createVector(-1,0,-1), createVector(-1,-1,-1),
                    createVector(-1,-1,0)];

    for (var dir of lightDir) {
      directionalLight(255, 255, 255, dir);
    }
  }
  push();
  rotateY(angleEarth);
  translate(0,-9000,-50000);
  rotateY(angleEarth);
  texture(earth);
  sphere(5000);
  angleEarth += 0.005;
  push();
  rotateY(angleMoon);
  translate(10000,0,0);
  rotateY(angleMoon);
  texture(moon);
  sphere(1000);
  angleMoon += 0.02;
  pop();
  pop();
  
  if (viewInside) {
    cam.pan(-movedX * 0.001); 
    cam.eyeY = -70;
    cam.centerY = -220;
  
  } else {
    //Cálculo de la posición de la cámara en tercera persona
    var camX = 7000 * cos(angle);
    var camZ = 7000 * sin(angle);
    cam.setPosition(camX, -7000, camZ); // Posición de vista exterior
    cam.lookAt(0, 0, 0); // Mirar al centro de la caja
  }
  //orbitControl();
  push();
  //directionalLight(250, 250, 250, sunX, sunY, sunZ);
  
  ground.update();
  ground2.update();
  
  wall1.update();
  wall2.update();

  //wall4.update();
  wall5.update();
  wall6.update();
  wall7.update();
  wall8.update();
  wall9.update();
  wall10.update();
  wall11.update();
  wall12.update();
  wall13.update();
  wall14.update();
  wall15.update();
  wall16.update();
  wall17.update();
  wall18.update();
  wall19.update();
  wall20.update();
  wall21.update();
  wall22.update();
  wall23.update();
  wall24.update();
  wall25.update();
  wall26.update();
  wall27.update();
  wall28.update();
  wall29.update();
  wall30.update();
  wall31.update();
  wall32.update();
  wall33.update();
  wall34.update();
  wall35.update();
  wall36.update();
  wall37.update();
  wall38.update();
  wall43.update();
  wall44.update();
  wall45.update();
  wall46.update();
  wall47.update();
  wall48.update();
  wall49.update();
  wall50.update();
  wall51.update();
  wall52.update();
  wall53.update();
  wall54.update();
  wall55.update();
  wall56.update();
  wall57.update();
  wall58.update();
  wall59.update();
  wall60.update();
  wall61.update();
  wall62.update();
  wall63.update();
  wall64.update();
  wall65.update();
  
  wall66.update();
  wall67.update();
  wall68.update();
  wall69.update();
  wall70.update();
  wall71.update();
  wall72.update();
  wall73.update();
  wall74.update();
  wall75.update();
  wall76.update();
  wall77.update();
  wall78.update();
  wall79.update();
  wall80.update();
  wall81.update();
  wall82.update();
  wall85.update();
  wall86.update();
  wall87.update();
  wall88.update();
  wall89.update();
  wall90.update();
  wall91.update();
  wall92.update();
  wall93.update();
  wall94.update();
  wall95.update();
  wall96.update();
  wall97.update();
  wall100.update();
  
  translate(-3300,-100,-3300);
  rotateX(HALF_PI);
  texture(muros);
  torus(900, 300);
  pop();
  push();
  strokeWeight(6);
  directionalLight(255, 255, 255, 0, 0, 1);
  directionalLight(255, 255, 255, 0, 1, 0);
  directionalLight(255, 255, 255, 1, 0, 0);
  translate(-3300,-100,3300);
  rotateX(HALF_PI);
  texture(muros);
  torus(900, 300);
  pop();
  push();
  translate(890,0,833);
  rotateY(-HALF_PI/2);
  wall3.update();
  pop();
  push();
  translate(890,0,-833);
  rotateY(HALF_PI/2);
  wall4.update();
  pop();
  
  //Rotación ala izquierda externa superior
  push();
  rotateY(-PI/3);
  wall39.update();
  pop();
  
  //Rotación ala izquierda externa inferior
  push();
  rotateY(HALF_PI/2);
  wall40.update();
  pop();
  
  //Rotación ala izquierda externa superior
  push();
  rotateY(PI/3);
  wall41.update();
  pop();
  
  //Rotación ala izquierda externa inferior
  push();
  rotateY(-HALF_PI/2);
  wall42.update();
  pop();
  
  //Rotación oreja izquierda
  push();
  translate(-5650,0,13270);
  rotateY(-HALF_PI*3/2);
  wall83.update();
  rotateY(-PI*2/3);
  wall84.update();
  pop();
  
  //Rotación oreja derecha
  push();
  translate(-5650,0,-13270);
  rotateY(HALF_PI*3/2);
  wall98.update();
  rotateY(PI*2/3);
  wall99.update();
  pop();

  m();

  // Rotar la cámara en tercera persona
  if (rotationActive && !viewInside) {
    angle += 0.01;
  }
  
}

function m(){
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    cam.move(0, 0, -20);
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    cam.move(0, 0, 20);
  }
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    cam.move(-20, 0, 0);
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    cam.move(20, 0, 0);
  }
  if (keyIsDown(32)){
    cam.setPosition(cam.eyeX, cam.eyeY - 400, cam.eyeZ);
  }
}

function keyTyped() {
  if (key === 'V' || key === 'v') {
    viewInside = !viewInside; // Cambia el estado de la visibilidad cada vez que se presiona 'V'

    if (viewInside) {
      rotationActive = false; // Detiene la rotación cuando se pasa a la vista en primera persona
    }
  }
  
  if ((key === 'P' || key === 'p') && !viewInside) {
    rotationActive = !rotationActive; // Cambia el estado de la rotación cada vez que se presiona 'P' y estamos en la vista exterior
  }
  
  if (key === 'L' || key === 'l') {
    sunLightActive = !sunLightActive;  // Cambia el estado de la luz cada vez que se presiona 'L'
  }
}

function mouseClicked() {
  if (!locked) {
    locked = true;
    requestPointerLock();
  } else {
    exitPointerLock();
    locked = false;
  }
}

class Box {
    constructor(x,y,z,w,h,d,img,textureResolutionX,textureResolutionY){
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        this.h = h;
        this.d = d;
        this.img=img;
        this.textureResolutionX = textureResolutionX;
        this.textureResolutionY = textureResolutionY;
    }
    update(){
        push();
        translate(this.x,this.y,this.z);
        if (this.img) {
          texture(this.img); // Aplicamos la textura aquí
          if (this.h === 30) { // Solo aplicamos la textura a la superficie superior del suelo
            push();
            translate(0, -this.h/2, 0);
            rotateX(PI/2);
            plane(this.w * this.textureResolutionX, this.d * this.textureResolutionY);
            pop();
          } else {
            box(this.w,this.h,this.d); // En los demás casos, seguimos usando box()
          }
        }
        else {
          box(this.w,this.h,this.d);
        }
        pop();
    }
}

function Estrella() {
    this.x = random(-100*width, 100*width);
    this.y = random(-100*height, 100*height );
    this.z = random(-100*width); // Asegúrate de que las estrellas comienzan más allá del campo de visión
    this.velocidad = random(1, 1000);
    this.dibujar = function () {
        let dx = map(mouseX, 0, width, -this.velocidad, this.velocidad);
        let dy = map(mouseY, 0, height, -this.velocidad, this.velocidad);
        this.z = this.z + this.velocidad;
        this.x = this.x + dx;
        this.y = this.y + dy;
        push();
        translate(this.x, this.y, this.z);
        stroke(255);
        strokeWeight(1);
        point(0, 0);
        pop();
    }
}

