// Create a variable for color-picker object 
var colPic; 
  
function setup() { 
    
    // Create a canvas 
    createCanvas(400,200); 
      
    // Create a color-picker object  
    colPic = createColorPicker("green"); 
} 
  
function draw() { 
      
    // Set the background-color as 
    // chosen by the color-picker 
    background(colPic.color()); 
}                     