class Game {
  constructor() {
    this.player1 = new Paddle(
      LEFT_START_X,
      LEFT_START_Y,
      PADDLE_WIDTH,
      PADDLE_HEIGHT
    );
    this.player2 = new Paddle(
      RIGHT_START_X,
      RIGHT_START_Y,
      PADDLE_WIDTH,
      PADDLE_HEIGHT
    );
    this.ball = new Ball(BALL_DIAMETER);
    this.state = "start";
    this.player1Score = 0;
    this.player2Score = 0;
    this.bounciness = 0;
    this.randomness = 0;
  }

  displayScore() {
    fill(255);
    stroke(0);
    strokeWeight(2);
    textSize(32);
    text(this.player1Score, LEFT_SCORE_X, LEFT_SCORE_Y);
    text(this.player2Score, RIGHT_SCORE_X, RIGHT_SCORE_Y);
  }

  update() {
    this.player1.move(87, 83); // W and S keys
    this.player2.move(UP_ARROW, DOWN_ARROW);
    if (this.state === "play") {
      this.ball.update();
      if (!this.ball.ghostMode) {
        this.checkBallCollisions();
      }
    }
  }

  changeState() {
    if (this.state === "start") {
      this.state = "play";
    } else {
      this.state = "start";
      this.ball.reset();
    }
  }
  
  checkBallCollisions() {
    let player1CollisionSurface = this.ball.collidesWith(this.player1).surface;
    let player2CollisionSurface = this.ball.collidesWith(this.player2).surface;

    if (
      player1CollisionSurface == "vertical" ||
      player2CollisionSurface == "vertical"
    ) {
      this.ball.reflectX(this.bounciness);
    }

    // Check collision with horizontal surface paddles
    if (
      player1CollisionSurface == "horizontal" ||
      player2CollisionSurface == "horizontal"
    ) {
      this.ball.ghostMode = true;
    }

    // Check collision with top and bottom boundaries
    if (this.ball.y <= 0 || this.ball.y >= height) {
      this.ball.reflectY(this.randomness);
    }

    // Check for scoring (ball passes left or right edge)
    this.checkScore();
  }

  checkScore() {
    if (this.ball.x <= 0) {
      this.player2Score += 1;
      this.resetBallAndPositions();
    } else if (this.ball.x >= width) {
      this.player1Score += 1;
      this.resetBallAndPositions();
    }
  }

  resetBallAndPositions() {
    this.ball.reset();
    this.player1.moveToInitialPosition();
    this.player2.moveToInitialPosition();
    this.state = "start";
  }
}
