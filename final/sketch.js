let viewW = 500;
let viewH = 300;
let scaleFactor, shiftX, shiftY;
let gameFont;

function preload() {
  gameFont = loadFont('font.ttf');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateScale();
  textFont(gameFont);
}

function draw() {
  showViewport();
  showWelcome();
}

function showWelcome() {
  textAlign(CENTER, CENTER);
  textSize(32);
  text('Hello Pong!', viewW / 2, viewH / 2);
}

function showViewport() {
  positionViewport();
  rect(0, 0, viewW, viewH);
}

function positionViewport() {
  translate(shiftX, shiftY);
  scale(scaleFactor);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateScale();
}

function calculateScale() {
  let scaleX = windowWidth / viewW;
  let scaleY = windowHeight / viewH;
  scaleFactor = min(scaleX, scaleY, 1);
  shiftX = max(0, (windowWidth - viewW * scaleFactor) / 2);
  shiftY = max(0, (windowHeight - viewH * scaleFactor) / 2);
}
