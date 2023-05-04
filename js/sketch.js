p5.disableFriendlyErrors = true;

let level;

const images = {};

let player;
let enemies = [];
let projectiles = [];

let gameCamera;

let gameGUI;

function preload() {
  loadImages();
}

function loadImages() {
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

  const projectileNames = [
    "arm",
    "bone",
    "coin",
    "log",
    "rock",
    "knife",
    "axe",
  ];
  const projectiles = [];
  for (const name of projectileNames) {
    projectiles.push(loadImage("res/actors/projectiles/" + name + ".png"));
  }
  images.projectiles = projectiles;

  const gui = {};
  gui.icons = loadImage("res/icons.png");

  gui.numbers = loadImage("res/numbers.png");
  gui.numbers_clean = loadImage("res/numbers-clean.png");
  images.gui = gui;
}

function splitImages() {
  images.tileset = splitTileset(images.tileset, 16 , 16)
  loadMyTileset(images.tileset);

  for (let i = 0; i < images.actors.length; i++) {
    images.actors[i].idle = splitTileset(images.actors[i].idle, 16, 16);
    images.actors[i].walk = splitTileset(images.actors[i].walk, 16, 16);
    images.actors[i].punch = splitTileset(images.actors[i].punch, 32, 32);
  }

  for (let i = 0; i < images.projectiles.length; i++) {
    images.projectiles[i] = splitTileset(images.projectiles[i], 16, 16);
  }

  images.gui.icons = splitTileset(images.gui.icons, 16, 16);
  images.gui.numbers = splitTileset(images.gui.numbers, 16, 16);
  images.gui.numbers_clean = splitTileset(images.gui.numbers_clean, 16, 16);
}

function setup() {
  if (inIframe() || settings.showData === false){
    const data = document.getElementById('data');
    data.style.display = 'none';
  }

  frameRate(60);

  const docHeight = constrain(getDocumentHeight(), 800, 2000);
  createCanvas(docHeight, docHeight);
  noSmooth();

  splitImages();

  Cell.size = (width*0.6) / 12;

  gameCamera = new Camera();

  level = new Level();

  player = new Player(projectiles, 0, 0);

  enemies.push(new Zombie(projectiles, 500, 0));

  for (const enemy of enemies) {
    enemy.setTarget(player);
  }

  gameCamera.setFollow(player.pos);

  gameGUI = new Gui(Cell.size*0.1, Cell.size*0.1);

  const guiUnit = Cell.size*1.5;
  const playerHealth = new NumberDisplay(guiUnit, 0, guiUnit*3, guiUnit, true, 20, 2, -1);
  playerHealth.setTrack(player, 'health');
  gameGUI.addElement(playerHealth);

  const playerHealthIcon = new GuiImage(0, 0, guiUnit, guiUnit, images.gui.icons[0]);
  gameGUI.addElement(playerHealthIcon);

  // GUI setup end
}

function draw() {
  Time.update();
  background('#14182e');
  //background(255);

  gameCamera.update();

  push();
  gameCamera.translate();

  level.show();

  player.update();
  player.attack(enemies);

  for (let i = enemies.length-1; i >= 0; i--) {
    const enemy = enemies[i];
    if(enemy.toDestroy){
      enemies.splice(i, 1);
      continue;
    }
    enemy.update();
  }

  for (let i = projectiles.length-1; i >= 0; i--) {
    const projectile = projectiles[i];
    if(projectile.toDestroy){
      projectiles.splice(i, 1);
      continue;
    }
    projectile.update();
  }

  const actors = [player].concat(enemies).concat(projectiles)
      .sort((a, b) => {return b.pos.y - a.pos.y;});

  level.collide(actors);
  for (let i = actors.length-1; i >= 0; i--) {
    actors[i].collideActors(i, actors);
  }

  //player.moveCamera(gameCamera);

  for (let i = actors.length-1; i >= 0; i--) {
    const actor = actors[i];
    actor.show();
  }

  pop();

  gameGUI.update();
  gameGUI.show();

}

function mousePressed() {

}

function mouseReleased() {

}