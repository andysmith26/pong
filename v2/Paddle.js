class Paddle {
  constructor(initialX, initialY, myWidth, myHeight) {
    this.initialX = initialX;
    this.initialY = initialY;
    this.x = this.initialX;
    this.y = this.initialY;
    this.w = myWidth;
    this.h = myHeight;
  }

  move(upKey, downKey) {
    if (keyIsDown(upKey)) {
      this.y -= PADDLE_SPEED / frameRate();
    }
    if (keyIsDown(downKey)) {
      this.y += PADDLE_SPEED / frameRate();
    }
  }

  display() {
    fill(100, 100, 200);
    rect(this.x, this.y, this.w, this.h);
  }
    
  moveToInitialPosition() {
    this.x = this.initialX;
    this.y = this.initialY;
  }
}
