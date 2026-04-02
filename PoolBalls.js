class Ball{

    constructor(x,y,poolTableWidth,BallType="white",label="ball"){
        this.x=x
        this.y=y
        this.d=poolTableWidth/50 
        this.type = BallType
        let options = {restitution: 0.8,friction: 0.1,  label: label,label2:BallType}
        this.ball = Bodies.circle(this.x,this.y,this.d/2,options);
        World.add(engine.world, this.ball);
        
        
    }


    Draw(){
        
        fill(this.type);
        ellipse(this.ball.position.x,this.ball.position.y,this.d);
        
    }

}
