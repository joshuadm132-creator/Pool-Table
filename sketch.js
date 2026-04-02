
/*
COMMENTARY – CM2030 GRAPHICS PROGRAMMING: SNOOKER APPLICATION

The physics based snooker game presented below is my personal interpretation of the midterm assignment. The code is modular in nature using object oriented programing as my programing paradigm. It is fairly lowly coupled with the idea of good cohesion been attempted. It works with Matter.js as the physics engine extension. And the use of external assets for added base quality.
The pool table was designed as a class because it seemed appropriate to create it as such for both its wide array of elements and rules I placed on it. It was first drawn to the assignment specifications and then I added physical bodies to the world or canvas as padding around the inner section of the pool table. This was done using polygon vertices and Matter.js static bodies. The class structure also allowed the pool table to be the central point of my applications design.
The pool table class handles population of the snooker balls array. The array is populated with Matter circle bodies and those bodies are held in a pool ball class as an outer container. This method allowed for drawing for ellipse over the actual bodies. It also allowed for the addition of custom properties for each ball (colour, label, etc.) and options to the bodies that affected every snooker ball. Thus allowing for universal physics tinkering and rule implementation.
The game rules and logic where held in the helper and pool table modules. Three gameplay modes were added in the pool table class activated via keyboard input or mouse click. Those were a standard starting position, a practice mode, and a randomised mode. In all modes, the cue ball is excluded and must be placed manually by the user inside the D-zone, enforcing official snooker rules. Placing the cue ball must be done using either the mouse by dragging it within the Dzone or by pressing the shift key. When a red ball is potted, it is permanently removed from the balls array. Coloured balls, however, are re-spotted to their table positions using predefined coordinates. If the cue ball is potted, a foul state is triggered and the player must manually re-place the cue.
The cue system was designed using a mixed mouse and keyboard interaction model to balance precision and ease of use. The mouse controls the aiming direction of the cue by calculating the angle between the cue ball and the cursor, while keyboard input is used to incrementally charge shot power. This power is visually represented and capped to prevent unrealistic “elastic band” behaviour. When the shot is taken, the accumulated power is converted into a velocity vector and applied to the cue ball using Matter.js. The cue can only be activated when all balls are nearly stationary, ensuring controlled and realistic gameplay.
The final extensions where sound and particle effects to represent sparks from high contact. The particle system was my fun addition to the assignment to give the illusion that the balls are high velocity high contact 


*/





// module aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var engine;
var PT
let ballHitSound;

function preload() {
   audio.preload();
}

function setup() {
  createCanvas(1200, 600);
  background("grey");
  engine = Engine.create(); // create an engine
  engine.gravity.scale = -0.0
  PT = new PoolTable(250,150,600)
  PT.PopulateTableDefault()
  gameUI = new GameUI(width,height,PT)
  collision.ballContact();
}

function draw() {
  background(120,30,150);
  PT.Draw();
  Particle.run();
  Engine.update(engine);
  gameUI.draw()
 
}

function keyPressed() {     
  
  Controls.gameModeChangeKey(PT)
  PT.CueStick.CueConntrol(PT)
  
}
function mousePressed(){
 
  gameUI.handleMousePressed(PT,mouseX,mouseY)
 
}
function mouseDragged(){

   PT.CueStick.cueSet()

}


function setLineDash(list) {
  drawingContext.setLineDash(list);
}





