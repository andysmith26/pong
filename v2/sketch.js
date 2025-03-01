this.focus();

// start coordinates of left paddle
let LEFT_START_X = 50;
let LEFT_START_Y = 190;

// start coordinates of right paddle
let RIGHT_START_X = 530;
let RIGHT_START_Y = 190;

// game element sizes
let PADDLE_WIDTH = 10;
let PADDLE_HEIGHT = 50;
let BALL_DIAMETER = 8;

// coordinates of game title
let TITLE_X = 300;
let TITLE_Y = 40;

// coordinates of left score
let LEFT_SCORE_X = 150;
let LEFT_SCORE_Y = 100;

// coordinates of right score
let RIGHT_SCORE_X = 450;
let RIGHT_SCORE_Y = 100;

// speeds
let PADDLE_SPEED = 300;
let BALL_SPEED_X = 250;
let MAX_BALL_SPEED_Y = 100;

let game;
let img;

function preload() {
  gameFont = "monospace";
}

function setup() {
  createCanvas(600, 440);
  game = new Game();
  noSmooth();
  textAlign(CENTER, CENTER);
  textFont(gameFont);
}

function draw() {
  
  // display the background
  background(40, 45, 52);
  
  // configure the game
  setBounciness(0.1);
  
  // run the game
  displayText();
  displayBall();
  displayPaddleL();
  displayPaddleR();
  update();

}

function displayText() {
  if (game.state === "start") {
    textSize(30);
    fill(255);
    text("Hello Pong!", TITLE_X, TITLE_Y);
  } else {
    game.displayScore();
  }
}

function update() {
  game.update();
}

function displayPaddles() {
  game.player1.display();
  game.player2.display();
}

function displayPaddleL() {
  game.player1.display();
}

function displayPaddleR() {
  game.player2.display();
}

function displayBall() {
  game.ball.display();
}

function setBounciness(b) {
  game.bounciness = b;
}

function setRandomness(r) {
  game.randomness = r;
}

function keyPressed() {
  if (key === "Enter") {
    game.changeState();
  }
}

function showGrid() {
  push();
  for (let x = 50; x < width; x += 50) {
    stroke(255, 50);
    if (x % 100 == 0) {
      strokeWeight(3);
    } else {
      strokeWeight(1);
    }
    line(x, 0, x, height);
    if (x % 100 == 0) {
      noStroke();
      fill(255, 200);
      textSize(16);
      textFont("courier");
      textAlign(CENTER, TOP);
      text(x, x, 5);
    }
  }
  for (let y = 50; y < height; y += 50) {
    stroke(255, 50);
    if (y % 100 == 0) {
      strokeWeight(3);
    } else {
      strokeWeight(1);
    }
    line(0, y, width, y);
    if (y % 100 == 0) {
      noStroke();
      fill(255, 200);
      textSize(16);
      textFont("courier");
      textAlign(LEFT, CENTER);
      text(y, 5, y);
    }
  }
  pop();
}
