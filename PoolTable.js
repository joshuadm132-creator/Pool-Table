class PoolTable{

    constructor(x,y,width){
    this.Balls = []
    this.w = width
    this.h = width/2
    this.x = x
    this.y = y
    this.pocketSize = this.w/33
    this.CueStick = new CueStick(new Ball(this.x+this.w/5.7,this.y + this.h*0.5,this.w,"white","cueBall"));
    this.paddingBodies();
    this.GameMode = "default"
    this.PreviousBalls = []
    this.pockets = [
    { x: this.x + this.pocketSize,y: this.y + this.h - this.pocketSize },
    { x: this.x + this.w / 2 + this.pocketSize, y: this.y + this.h - this.pocketSize / 1.5 },
    { x: this.x + this.w - this.pocketSize, y: this.y + this.h - this.pocketSize },
    { x: this.x + this.pocketSize,y: this.y + this.pocketSize },
    { x: this.x + this.w / 2 + this.pocketSize, y: this.y + this.pocketSize / 1.5 },
    { x: this.x + this.w - this.pocketSize, y: this.y + this.pocketSize }
];
   
    }
    drawPockets(){ 
        //Pockets
        
        for(var p of this.pockets){
        noStroke()
        fill(25)
        ellipse(p.x,p.y,this.pocketSize)
        fill(50)
        ellipse(p.x,p.y,this.pocketSize*0.8)
        stroke(1)
     
        }

    }
    drawCusins(){
            //Inner padding (Coushines)
            fill(250)
            //Right
            beginShape();
            vertex(this.x+(this.w*0.02), this.y+(this.h*0.08));
            vertex(this.x+(this.w*0.035), this.y+(this.h*0.1));
            vertex(this.x+(this.w*0.035), this.y+(this.h*0.9));
            vertex((this.x+this.w*0.02), this.y+(this.h*0.92));
            endShape(CLOSE);
            //Left
            beginShape();
            vertex(this.x-(this.w*0.02)+this.w, this.y+(this.h*0.08));
            vertex(this.x-(this.w*0.035)+this.w, this.y+(this.h*0.1));
            vertex(this.x-(this.w*0.035)+this.w, this.y+(this.h*0.9));
            vertex((this.x-this.w*0.02)+this.w, this.y+(this.h*0.92));
            endShape(CLOSE);

            //TopLeft
            beginShape();
            vertex(this.x+this.w*0.04, this.y+this.h*0.04);
            vertex(this.x+this.w*0.04+this.w/2.1, this.y+this.h*0.04);
            vertex(this.x+this.w*0.04+this.w/2.15, this.y+this.h*0.065);
            vertex(this.x+this.w*0.055, this.y+this.h*0.065);
            endShape(CLOSE);

            // TOPRIGHT
            beginShape();
            vertex(this.x +this.w*0.0455+ this.w/2 ,this.y + this.h*0.04);
            vertex(this.x + this.w - this.w*0.04,this.y + this.h*0.04);
            vertex(this.x + this.w - this.w*0.055,this.y + this.h*0.065);
            vertex(this.x + this.w/2 + this.w*0.055,this.y + this.h*0.065);
            endShape(CLOSE);

            // Bottomleft
            beginShape();
            vertex(this.x + this.w*0.04,this.y + this.h*0.96);
            vertex(this.x+this.w*0.04+this.w/2.1,this.y + this.h*0.96);
            vertex(this.x+this.w*0.04+this.w/2.15,this.y + this.h*0.935);
            vertex(this.x + this.w*0.055,this.y + this.h*0.935);
            endShape(CLOSE);

            // BOTTOMRIGHT 
            beginShape();
            vertex(this.x +this.w*0.044+ this.w/2,this.y + this.h*0.96);
            vertex(this.x + this.w - this.w*0.04,this.y + this.h*0.96);
            vertex(this.x + this.w - this.w*0.055,this.y + this.h*0.935);
            vertex(this.x + this.w/2 + this.w*0.055,this.y + this.h*0.935);
            endShape(CLOSE);
        
    }
    drawDzone(){
         let DzoneX = this.x+this.w*0.2;

        stroke(255);
        noFill();
        line(DzoneX, this.y+this.h*0.05, DzoneX, this.y + this.h*0.95); 
        arc(DzoneX, this.y+this.h*0.5, this.h/3,this.h/3,PI/2,PI+PI/2);
        stroke(1);
        

    }

    drawBaseTable(){
            //Two Rects overlapping to show outer and inner table
            fill(130,80,20)
            rect(this.x,this.y,this.w,this.h,10);
            fill(30,120,50)
            rect(this.x+(this.w*0.02),this.y+(this.h*0.04),this.w-(this.w*0.04),this.h*0.92,10);
 
            //Left right edge colours
            rect(this.x,this.y+(this.h*0.08),(this.w*0.02),this.h*0.84);
            rect(this.x+this.w-(this.w*0.02),this.y+(this.h*0.08),this.w*0.02,this.h*0.84);
            //top bottom edge colours
            rect(this.x+this.w*0.04,this.y,this.w-this.w*0.08,this.h*0.04);
            rect(this.x+this.w*0.04,this.y+this.h*0.96,this.w-this.w*0.08,this.h*0.04);
            fill(0)
            this.drawPockets()
            this.drawCusins()
            this.drawDzone()

            
        
        }
    
    Draw (){
        this.drawBaseTable(); 
        this.CueStick.drawCue()
        for(let i = 0;i<this.Balls.length;i++ ){
            this.Balls[i].Draw();

            for(var p of this.pockets){
                let distcue = dist(this.CueStick.CueBall.ball.position.x,this.CueStick.CueBall.ball.position.y,p.x,p.y)
                
                if (distcue<this.pocketSize/1.3){
                    this.CueStick.foul=true
                    this.CueStick.SettingAllowed = true;
                    this.CueStick.cueSet()
                    audio.playBallSinkSound()
                
        }
    }
            if(this.Ball_in_pocket(this.Balls[i]) == false){
                  this.Balls.splice(i, 1);
                  audio.playBallSinkSound()
            }
            

     }
    }

    Ball_in_pocket(b){
        for(var p of this.pockets){
            let d = dist(b.ball.position.x,b.ball.position.y,p.x,p.y)
            if (d<this.pocketSize/1.3){   
                ColoredBallRules.checkOrder(b.ball.label2)
                if(b.ball.label2 != "red"){
                    ColoredBallRules.addColourBall(PT,b.ball.label2)
                    World.remove(engine.world, b.ball);
                    return false;
                }
                World.remove(engine.world, b.ball);
                return false;
            }

        }
        return true;

    }
    
    
    paddingBodies(){

          // 2D array containing all vertex groups for all cushions
    const paddings = [
        // RIGHT
        [
            { x: this.x + this.w*0.02,  y: this.y + this.h*0.08 },
            { x: this.x + this.w*0.035, y: this.y + this.h*0.10 },
            { x: this.x + this.w*0.035, y: this.y + this.h*0.90 },
            { x: this.x + this.w*0.02,  y: this.y + this.h*0.92 }
        ],
        // LEFT
        [
            { x: this.x + this.w - this.w*0.02,  y: this.y + this.h*0.08 },      
            { x: this.x + this.w - this.w*0.035, y: this.y + this.h*0.10 },
            { x: this.x + this.w - this.w*0.035, y: this.y + this.h*0.90 },
            { x: this.x + this.w - this.w*0.02,  y: this.y + this.h*0.92 }
        ],
        // TOP LEFT
        [
            { x: this.x + this.w*0.04,y: this.y + this.h*0.04 },
            { x: this.x + this.w*0.04 + this.w/2.1,  y: this.y + this.h*0.04 },
            { x: this.x + this.w*0.04 + this.w/2.15, y: this.y + this.h*0.065 },
            { x: this.x + this.w*0.055, y: this.y + this.h*0.065 }
        ],
        // TOP RIGHT
        [
            { x: this.x + this.w/2 + this.w*0.0455, y: this.y + this.h*0.04 },
            { x: this.x + this.w - this.w*0.04, y: this.y + this.h*0.04 },
            { x: this.x + this.w - this.w*0.055,y: this.y + this.h*0.065 },
            { x: this.x + this.w/2 + this.w*0.055,  y: this.y + this.h*0.065 }
        ],
        // BOTTOM LEFT
        [
            { x: this.x + this.w*0.04, y: this.y + this.h*0.96 },
            { x: this.x + this.w*0.04 + this.w/2.1, y: this.y + this.h*0.96 },
            { x: this.x + this.w*0.04 + this.w/2.15,y: this.y + this.h*0.935 },
            { x: this.x + this.w*0.055, y: this.y + this.h*0.935 }
        ],
        // BOTTOM RIGHT
        [
            { x: this.x + this.w/2 + this.w*0.044, y: this.y + this.h*0.96 },
            { x: this.x + this.w - this.w*0.04, y: this.y + this.h*0.96 },
            { x: this.x + this.w - this.w*0.055, y: this.y + this.h*0.935 },
            { x: this.x + this.w/2 + this.w*0.055, y: this.y + this.h*0.935 }
        ]
    ];

    for(let i =0;i<=5;i++){
        let Padding = Bodies.fromVertices(
            (paddings[i][1].x + paddings[i][0].x)/2, 
            (paddings[i][2].y + paddings[i][0].y)/2,
            paddings[i],
            {
        isStatic: true,
        restitution: 0.9,
        label: "cushion"
    }
    );
        World.add(engine.world, Padding);
    }      
    }


    addBall(x,y,type){
       let b = new Ball(x,y,this.w,type)
       this.Balls.push(b)
       return b
       
    }
    deleteBalls() {
    for (let b of this.Balls) {
        World.remove(engine.world, b.ball);
    }
    this.Balls = [];
    }

    ColouredPopulation(){

    this.addBall(this.x+this.w*0.2, this.y + this.h*0.5, "yellow","yellow");
    this.addBall(this.x+this.w*0.2, this.y + this.h*0.25, "green","green");
    this.addBall(this.x+this.w*0.2, this.y + this.h*0.75, "brown","brown");
    this.addBall(this.x + this.w*0.5,  this.y + this.h*0.5, "blue","blue");
    this.addBall(this.x + this.w*0.628, this.y + this.h*0.5, "pink","pink");
    this.addBall(this.x + this.w*0.78,  this.y + this.h*0.5, "black","black");
    }

    PopulateTableDefault(){
    // Reds (triangle)
    this.deleteBalls()
    let startX = this.x + this.w * 0.65;
    let startY = this.y + this.h * 0.5;
    let spacing = this.w / 49;

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col <= row; col++) {
            this.addBall(
                startX + row * spacing,
                startY + col * spacing - (row * spacing) / 2,
                "red"
            );
        }
    }
   this.ColouredPopulation()

    }

    PopulateTablePrac(){
    
    this.deleteBalls()
    let spacing = this.w / 100;
    
   
    let startX = this.x + this.w*0.628
    let startY =  this.y + this.h*0.5
        for (let i = 1; i <= 5; i++) {
            this.addBall(
                startX
               ,startY-(this.w/50 +2)*i ,
                "red");
            }
         for (let i = 1; i <= 5; i++) {
            this.addBall(
                startX
               ,startY+(this.w/50 +2)*i ,
                "red");
            }
             for (let i = 1; i <= 5; i++) {
            this.addBall(
                startX+(this.w/50 +2)*i
               ,startY ,
                "red");
            }
    

    this.ColouredPopulation()
    
} 

    

    PopulateTableRandom(){
    // Reds clusters
    this.deleteBalls()
    let spacing = this.w / 60;
    
    for (let j = 0; j < 3; j++) {
    let startX = random(this.x+this.w*0.2,this.x+this.w-(this.w*0.2))
    let startY = random(this.y+this.h*0.15,this.y + this.h*0.85)     
     for (let i = 0; i < 5; i++) {
            this.addBall(
                startX + spacing + random(-2, 2)*i,
                startY + spacing + random(-2, 2)*i , 
                "red");
            }
    }
    this.ColouredPopulation()
}

}
  

