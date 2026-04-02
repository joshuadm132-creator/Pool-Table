
class Particle{
  static sparks = [];


  constructor(x,y){
    
    this.pos = {x:x,y:y}
    this.vel = {x:random(-2,2),y:random(-2,2)}
    this.lifespan = random(10,35)
    this.acc 
    this.burning = true
    
  }
  static populate(x,y,power){
    
    for(let i=0;i<power; i++){
      let p = new Particle(x,y)
      append(Particle.sparks,(p))
  }
    
  
    
  }  
  static run(){
    
    for(let i=0 ;i<Particle.sparks.length;i++){
      
      let s = Particle.sparks[i];
      if (!s.burning) {
        Particle.sparks.splice(i, 1);
      }
      s.update()
      s.drawP()
      
     
    }
    
  }
  update(){
    
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
    this.acc =random(-0.04,0.04)
    this.vel.x += this.acc
    this.vel.y += this.acc
    
    this.lifespan--
    
    if(this.lifespan<0){
      this.burning = false
    }
    
  }
  drawP(){
    if(this.burning){
      fill(235,70,30)
      stroke("orange")
      ellipse(this.pos.x,this.pos.y,2)
      stroke(0)
    }
    
  }
  
  
  
}

