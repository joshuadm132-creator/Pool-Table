const audio = {

    preload() {
   ballHitSound = loadSound("ball-hits-pool-ball_X2TKPRXx.wav");
    ballSink = loadSound("pool-ball-sinking.wav")
    stickHitSound = loadSound("snooker_qnuXooiD.wav")
  },

     playBallHitSound(pair) {
        if (!ballHitSound.isLoaded()) return;

        const speed =
            pair.bodyA.speed + pair.bodyB.speed;

        // clamp volume
        const volume = constrain(speed*0.2, 0.02, 0.8);
        ballHitSound.setVolume(volume);
        ballHitSound.play();
},

    playBallSinkSound() {
        if (!ballSink.isLoaded()) return;

        ballSink.play();
},
  playStickHitSound(){
    if(!stickHitSound.isLoaded())return;
    stickHitSound.play()
  }
}

const SparkHelper = {

    sparkProduction(pair){
    const speed =
          pair.bodyA.speed + pair.bodyB.speed;
    let power = constrain(speed*2, 0, 30);

    if( power<5){
      power = 0
    }

    Particle.populate(pair.bodyA.position.x,pair.bodyA.position.y,power);

}
}

const collision = {

ContactTypeCheck(pair){

    if( pair.bodyA.label === "cueBall" && pair.bodyB.label === "ball"){
      console.log("Cue -",pair.bodyB.label2)
    }
    if(pair.bodyA.label === "ball" && pair.bodyB.label === "cueBall"){
        console.log("Cue -",pair.bodyA.label2)
      
    }

},
 ballContact(){

   Matter.Events.on(engine, "collisionStart", function(event) {
    const pairs = event.pairs;

    for (let pair of pairs) {
        const { bodyA, bodyB } = pair;


      collision.ContactTypeCheck(pair)
       if (
            bodyA.label === "ball" && bodyB.label === "ball" ||
            bodyA.label === "cueBall" && bodyB.label === "ball" ||
            bodyA.label === "ball" && bodyB.label === "cueBall"
        ) {
            audio.playBallHitSound(pair);
         
            SparkHelper.sparkProduction(pair)
           
        }

        if (
            bodyA.label === "cueBall" && bodyB.label === "cushion" ||
            bodyB.label === "cueBall" && bodyA.label === "cushion"
        ) {
            console.log("cue-cushion");
        }
    }
});
}
}

const Controls = {

    gameModeChangeKey(table){

         if (key === '1' && table.GameMode != "default") {
              
              table.GameMode = "default"
              Controls.ChangeGameMode(table)
        }
         if (key === '2' && table.GameMode != "practice") {
             
             table.GameMode = "practice"
            Controls.ChangeGameMode(table)
        }
        if (key === '3' && table.GameMode != "random") {
               
                table.GameMode = "random"
                Controls.ChangeGameMode(table)
        }

     
    },ChangeGameMode(table){

        if(table.GameMode == "default"){
            table.PopulateTableDefault()
        }
          if(table.GameMode == "practice"){
            table.PopulateTablePrac()
        }
          if(table.GameMode == "random"){
              table.PopulateTableRandom()
        }
       

    }
 
} 

const undo = {
  savedState: null,

  createSave(table) {
    this.savedState = {
      cueBall: {
        x: table.CueStick.CueBall.ball.position.x,
        y: table.CueStick.CueBall.ball.position.y,
        vx: table.CueStick.CueBall.ball.velocity.x,
        vy: table.CueStick.CueBall.ball.velocity.y
      },

      balls: table.Balls.map(b => ({
        x: b.ball.position.x,
        y: b.ball.position.y,
        vx: b.ball.velocity.x,
        vy: b.ball.velocity.y,
        type: b.type,
        label: b.ball.label
      }))
    };
  },

  loadSave(table) {
    if (!this.savedState) return;

   // restore cue ball 
    const cue = table.CueStick.CueBall.ball;

    Matter.Body.setPosition(cue, {
      x: this.savedState.cueBall.x,
      y: this.savedState.cueBall.y
    });

    Matter.Body.setVelocity(cue, {
      x: this.savedState.cueBall.vx,
      y: this.savedState.cueBall.vy
    });

    // remove existing balls 
    for (let b of table.Balls) {
      World.remove(engine.world, b.ball);
    }
    table.Balls = [];

    // recreate balls 
    for (let data of this.savedState.balls) {
      const ball = new Ball(
        data.x,
        data.y,
        table.w,
        data.type,
        data.label
      );

      Matter.Body.setVelocity(ball.ball, {
        x: data.vx,
        y: data.vy
      });

      table.Balls.push(ball);
    }
  }
};

const ColoredBallRules={
  Record : [],

  addColourBall(PT,colour){
   let colourSpots = {
    yellow: { x: PT.x + PT.w * 0.2,   y: PT.y + PT.h * 0.5 },
    green:  { x: PT.x + PT.w * 0.2,   y: PT.y + PT.h * 0.25 },
    brown:  { x: PT.x + PT.w * 0.2,   y: PT.y + PT.h * 0.75 },
    blue:   { x: PT.x + PT.w * 0.5,   y: PT.y + PT.h * 0.5 },
    pink:   { x: PT.x + PT.w * 0.628, y: PT.y + PT.h * 0.5 },
    black:  { x: PT.x + PT.w * 0.78,  y: PT.y + PT.h * 0.5 }
};
    
    PT.addBall(colourSpots[colour].x, colourSpots[colour].y, colour);

  },

  checkOrder(colour){
    this.Record.push(colour)
    if(this.Record.length >= 2){
      if(this.Record[this.Record.length-1] !="red" && this.Record[this.Record.length-2] != "red" )
        console.log("Foul Two Coulured balls placed")
    }
    console.log(this.Record)
}
}