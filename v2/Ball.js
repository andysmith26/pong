class Ball {
  constructor(diameter) {
    this.diameter = diameter;
    this.ghostMode = false;
    this.reset();
  }

  reset() {
    this.x = width / 2 - this.diameter / 2;
    this.y = height / 2 - this.diameter / 2;
    this.dx = random([-BALL_SPEED_X, BALL_SPEED_X]);
    this.dy = random(-MAX_BALL_SPEED_Y, MAX_BALL_SPEED_Y);
    this.ghostMode = false;
  }

  update() {
    this.x += this.dx / frameRate();
    this.y += this.dy / frameRate();
  }

  display() {
    fill(200, 0, 100);
    stroke(0, 0, 0);
    strokeWeight(1);
    rect(this.x, this.y, this.diameter);
  }

  collidesWith(paddle) {
    let ballLeft = this.x;
    let ballRight = this.x + this.diameter;
    let ballTop = this.y;
    let ballBottom = this.y + this.diameter;

    let paddleLeft = paddle.x;
    let paddleRight = paddle.x + paddle.w;
    let paddleTop = paddle.y;
    let paddleBottom = paddle.y + paddle.h;

    let ballIsRightOfPaddle = ballLeft >= paddleRight;
    let ballIsLeftOfPaddle = ballRight <= paddleLeft;
    let ballIsAbovePaddle = ballBottom <= paddleTop;
    let ballIsBelowPaddle = ballTop >= paddleBottom;
    if (
      ballIsRightOfPaddle ||
      ballIsLeftOfPaddle ||
      ballIsAbovePaddle ||
      ballIsBelowPaddle
    ) {
      return { collision: false, surface: null };
    } else {
      
      // Calculate impact depths
      let depthX = Math.min(ballRight - paddleLeft, paddleRight - ballLeft);
      let depthY = Math.min(ballBottom - paddleTop, paddleBottom - ballTop);

      // Determine impact direction based on the minimum impact depth
      let impactSurface;
      if (depthX < depthY) {
        impactSurface = "vertical";
      } else {
        impactSurface = "horizontal";
      }
      return { collision: true, surface: impactSurface };
    }
  }

  reflectX(bounciness) {
    this.dx *= -(1 + bounciness);
  }

  reflectY(bounciness) {
    this.dy *= -(1 + bounciness);
  }
}
