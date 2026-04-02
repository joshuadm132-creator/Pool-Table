class CueStick{


    constructor(CueBall){

        this.CueBall = CueBall;
        this.power = 0;
        this.foul = false
        this.angle=0
        this.aimLen = 200
        this.cuePreHit 
        this.SettingAllowed =true
    }


    drawCue() {
        
        
        let b = this.CueBall
       if (this.SettingAllowed) {
        stroke(0, 255, 255);
        strokeWeight(1.5);
        fill(255, 255, 255, 150); // transparent
       
    } 
        fill(b.type); 
        ellipse(b.ball.position.x,b.ball.position.y,b.d);
        stroke(0);
        strokeWeight(1);
        if(!b || b.ball.speed>0.02){

        }else{
        let PowerOffset = this.power*3
        let cueX = b.ball.position.x;
        let cueY = b.ball.position.y;
        
        // direction from ball to mouse
        this.angle = atan2(mouseY - cueY, mouseX - cueX)-Math.PI;
        
        let cueLength = 200;
        let cueThickness = 8;
        
        push();
        translate(cueX, cueY);
        
        rotate(this.angle);
       

        fill(200)
        rect(-cueLength-b.ball.circleRadius -PowerOffset, -cueThickness/2, cueLength, cueThickness, 15);

        fill(180,140,80);
        rect(-cueLength-b.ball.circleRadius*2 -PowerOffset, -cueThickness/2, cueLength, cueThickness);
    
        fill(20,20,20)
        rect(-cueLength-b.ball.circleRadius*2 -PowerOffset, -cueThickness/2, cueLength*0.2, cueThickness, 3);
        stroke(250)
        setLineDash([5]);
        line(b.d/2, 0,PowerOffset*5, 0) 
        setLineDash([1]);
        pop();
         
    }


} 

ChargingUp(){

if(this.power <15){

    this.power+=1
}


}
cueSet(){
   if(!this.SettingAllowed)return;
    let b = this.CueBall.ball 
    let DzoneX = PT.x+PT.w*0.2;

    let DistFromDzone = dist(mouseX,mouseY,DzoneX,PT.y+PT.h*0.5)
        if(DistFromDzone < PT.h/6 && mouseX<DzoneX){

          
            Matter.Body.setPosition(b,{x:mouseX, y :mouseY})
            Matter.Body.setVelocity(b,{x:0,y:0})
        
            
        }
        else if(this.foul){

             console.log("foul")
             Matter.Body.setPosition(b,{x:PT.x+PT.w/5.7,y:PT.y + PT.h*0.5})
             Matter.Body.setVelocity(b,{x:0,y:0})
             this.foul = false
             this.SettingAllowed = true
            

        }
    


}



CueConntrol(table){
    if(key =="Shift" && this.SettingAllowed){
        this.cueSet()
    }

    if(key == " " &&  this.CueBall.ball.speed<0.02){
       this.SettingAllowed = false 
       undo.createSave(table);
        audio.playStickHitSound();
        let velocity = {x:this.power*cos(this.angle) ,y:this.power*sin(this.angle) }
        Matter.Body.setVelocity(this.CueBall.ball,velocity)
        this.power = 0
        
    }
    if(key =="p"){
        this.ChargingUp()
    }

}

}