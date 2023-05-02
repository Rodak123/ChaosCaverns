p5.disableFriendlyErrors = true;

let level;

const images = {};

let player;
let enemies = [];

let gameCamera;

function preload() {
  images.tileset = loadImage("res/LuisSn0w.png");
  const actors = [];

  for (let i = 0; i < 10; i++) {
    actors[i] = {
      idle: loadImage("res/actors/lotus_totus/"+(i+1)+" idle.png"),
      walk: loadImage("res/actors/lotus_totus/"+(i+1)+" walk.png"),
      punch: loadImage("res/actors/lotus_totus/"+(i+1)+" punch.png")
    };
  }

  images.actors = actors;
}

function getDocumentHeight(){
  const body = document.body,
      html = document.documentElement;
  return Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);
}

function setup() {
  const docHeight = constrain(getDocumentHeight(), 800, 2000);
  createCanvas(docHeight, docHeight);
  noSmooth();

  Cell.size = (width*0.6) / 12;

  gameCamera = new Camera();

  images.tileset = splitTileset(images.tileset, 16 , 16)
  loadMyTileset(images.tileset);

  for (let i = 0; i < 10; i++) {
    images.actors[i].idle = splitTileset(images.actors[i].idle, 16, 16);
    images.actors[i].walk = splitTileset(images.actors[i].walk, 16, 16);
    images.actors[i].punch = splitTileset(images.actors[i].punch, 32, 32);
  }


  level = new Level();

  player = new Player(300, 500);

  enemies.push(new Enemy(0, 0));

  for (const enemy of enemies) {
    enemy.setTarget(player);
  }

}

function draw() {
  Time.update();
  background('#14182e');
  //background(255);

  push();
  gameCamera.translate();

  level.show();

  player.update();
  for (let i = enemies.length-1; i >= 0; i--) {
    const enemy = enemies[i];
    enemy.update();
  }

  const actors = [player].concat(enemies)
      .sort((a, b) => {return b.pos.y - a.pos.y;});

  level.collide(actors);

  player.moveCamera(gameCamera);

  for (let i = actors.length-1; i >= 0; i--) {
    const actor = actors[i];
    actor.show();
  }

  pop();

}
function mousePressed() {

}

function mouseReleased() {

}