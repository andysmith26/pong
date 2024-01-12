const VIEW_WIDTH = 500;
const VIEW_HEIGHT = 300;
const PADDLE_SPEED = 200;
const BALL_SPEED_X = 100;
const BALL_SPEED_Y = 50;
const BALL_BOUNCE_RANGE = 30;
const DEBUG_REFRESH_RATE = 500;
let lastDebugMillis = 0;
let debugInfo = [];
let game;
let bounceSound;

class Paddle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 30;
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
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Ball {
  constructor() {
    this.size = 8;
    this.init();
  }

  init() {
    this.x = VIEW_WIDTH / 2 - 2;
    this.y = VIEW_HEIGHT / 2 - 2;
    this.dx = random([-BALL_SPEED_X, BALL_SPEED_X]);
    this.dy = random(-BALL_SPEED_Y, BALL_SPEED_Y);
  }

  update() {
    this.x += this.dx / frameRate();
    this.y += this.dy / frameRate();
  }

  display() {
    fill(255);
    square(this.x, this.y, this.size);
  }

  collidesWithPaddle(paddle) {
    if (
      this.x <= paddle.x + paddle.width &&
      this.x + this.size >= paddle.x &&
      this.y <= paddle.y + paddle.height &&
      this.y + this.size >= paddle.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  // TODO: maybe align this functionality with paddle collision
  //       in terms of where the update happens
  checkForWallCollision() {
    if (this.y <= 0) {
      this.y = 0;
      this.dy *= -1;
      this.dx += random(-BALL_BOUNCE_RANGE, BALL_BOUNCE_RANGE);
    }
    if (this.y >= VIEW_HEIGHT - this.size) {
      this.y = VIEW_HEIGHT - this.size;
      this.dy *= -1;
      this.dx += random(-BALL_BOUNCE_RANGE, BALL_BOUNCE_RANGE);
    }
  }
}

class Game {
  constructor() {
    this.player1 = new Paddle(10, 30);
    this.player2 = new Paddle(VIEW_WIDTH - 15, VIEW_HEIGHT - 50);
    this.ball = new Ball();
    this.state = 'start';
    this.player1Score = 0;
    this.player2Score = 0;
  }

  displayScore() {
    textAlign(CENTER, CENTER);
    textFont(gameFont);
    textSize(32);
    fill(255);
    text(this.player1Score, VIEW_WIDTH / 2 - 50, VIEW_HEIGHT / 3);
    text(this.player2Score, VIEW_WIDTH / 2 + 50, VIEW_HEIGHT / 3);
  }

  updateAndDisplayElements() {
    this.player1.move(87, 83); // W and S keys
    this.player2.move(UP_ARROW, DOWN_ARROW);
    if (this.state === 'play') {
      this.checkForScore();
      if (this.ball.collidesWithPaddle(this.player1)) {
        bounceSound.play();
        this.ball.dx *= -1.03;
        this.ball.x = this.player1.x + this.ball.size;
        this.ball.dy += random(-BALL_BOUNCE_RANGE, BALL_BOUNCE_RANGE);
      }
      if (this.ball.collidesWithPaddle(this.player2)) {
        bounceSound.play();
        this.ball.dx *= -1.03;
        this.ball.x = this.player2.x - this.ball.size;
        this.ball.dy += random(-BALL_BOUNCE_RANGE, BALL_BOUNCE_RANGE);
      }
      this.ball.checkForWallCollision();
      this.ball.update();
    }
    this.player1.display();
    this.player2.display();
    this.ball.display();
  }

  checkForScore() {
    if (this.ball.x <= 0) {
      this.player1Score += 1;
      this.changeState();
    }
    if (this.ball.x >= VIEW_WIDTH - this.ball.size) {
      this.player2Score += 1;
      this.changeState();
    }
  }
  changeState() {
    if (this.state === 'start') {
      this.state = 'play';
    } else {
      this.state = 'start';
      this.ball.init();
    }
  }
}

function preload() {
  gameFont = loadFont('font.ttf');
  bounceSound = loadSound('bounce.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new Game();
}

function draw() {
  background(220);
  showViewport();
  game.updateAndDisplayElements();
  if (game.state === 'start') {
    textFont(gameFont);
    textAlign(CENTER, CENTER);
    textSize(12);
    fill(255);
    text('Hello Pong!', VIEW_WIDTH * 0.5, 20);
  } else {
    game.displayScore();
  }
  showDebugInfo();
}

function showViewport() {
  positionViewport();
  fill(40, 45, 52);
  rect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
}

function positionViewport() {
  let scaleX = windowWidth / VIEW_WIDTH;
  let scaleY = windowHeight / VIEW_HEIGHT;
  let scaleFactor = min(scaleX, scaleY, 1);
  let shiftX = max(0, (windowWidth - VIEW_WIDTH * scaleFactor) / 2);
  let shiftY = max(0, (windowHeight - VIEW_HEIGHT * scaleFactor) / 2);
  translate(shiftX, shiftY);
  scale(scaleFactor);
}

function keyPressed() {
  if (key === 'Enter') {
    game.changeState();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function showDebugInfo() {
  refreshDebugInfo();
  textSize(12);
  fill(0, 255, 0);
  textAlign(LEFT, TOP);
  textFont('monospace');
  debugInfo.forEach((element, index) => {
    text(element, 10, 10 + index * 14);
  });
}

function refreshDebugInfo() {
  let currentMillis = millis();
  if (currentMillis - lastDebugMillis > DEBUG_REFRESH_RATE) {
    lastDebugMillis = currentMillis;
    debugInfo[0] = 'FPS: ' + int(frameRate());
  }
}
