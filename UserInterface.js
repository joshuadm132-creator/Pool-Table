class GameUI {
  constructor(w,h,pt) {
    this.h = h
    this.w = w
    this.btnSpacing = 120
    this.pt = pt

    this.buttons = [
      {
        label: "Default",
        mode: "default",
        x: this.btnSpacing, y: 10, w: 100, h: 30
      },
      {
        label: "Practice",
        mode: "practice",
        x: 2*this.btnSpacing, y: 10, w: 100, h: 30
      },
      {
        label: "Random",
        mode: "random",
        x: 3*this.btnSpacing, y: 10, w: 100, h: 30
      },
      {
        label: "undo",
        mode: "Undo",
        x: 4*this.btnSpacing, y: 10, w: 100, h: 30
      }
    ];
  }

  draw() {
    this.drawPanel();
    this.drawButtons();
    this.drawInstructions();
  }

  drawPanel() {
    push();
    fill(20, 20, 20, 180);
    noStroke();
    rect(0,0 ,this.w, this.h/10, 8,0,8,0);
    rect(0,this.h/10 ,this.w/9, this.h/2);
    pop();
    
  }

  drawButtons() {
    textAlign(CENTER, CENTER);
    textSize(14);

    for (let btn of this.buttons) {

      stroke(0);
      fill(0)
      rect(btn.x, btn.y, btn.w, btn.h, 6);

      noStroke();
      fill(255);
      text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
    }
  }

  drawInstructions() {
    fill(255);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);

    let y = 145;

    text("Controls:", 20, y); y += 16;
    text("Mouse: Aim cue", 20, y); y += 14;
    text("P: Charge power", 20, y); y += 14;
    text("Space: Shoot", 20, y); y += 14;
    text("drag mouse: Place cueball", 20, y); y += 14;


  

    if (this.pt.CueStick.foul) {
      fill(255, 80, 80);
      text("FOUL: Cue ball potted", 20, y + 24);
    }
  }

  handleMousePressed(PT,mx, my) {
    for (let btn of this.buttons) {
      if (
        mx > btn.x &&
        mx < btn.x + btn.w &&
        my > btn.y &&
        my < btn.y + btn.h
      ) {
        
        if(btn.label == "undo"){
          undo.loadSave(PT);
          return
        }
        console.log(btn.label)
        PT.GameMode = btn.mode
        Controls.ChangeGameMode(PT)
        return;
      } 
    }
  }

}
