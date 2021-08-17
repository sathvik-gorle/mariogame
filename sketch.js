var mario;
var coin1, coin2;
var flyinggoomba, flyinggoombaImg
var goldgoomba
var gameOver
var greenpipe1, greenpipe2
var pipe1, pipe2
var goomba, goombaImg
var mario1, mario2, mario3
var mariobg1
var mariobg2
var mariobg1Img
var mariobg2Img

var brick, brickImg
var wall, wallImg
var restart;
var goldgoombaImg
var coin1Img, coin2Img;
var marioRunning;
var goomba3image
var restartImg
var invisibleGround;
var obstaclesGroup, wallsGroup
var score = 0;
var coinsGroup;
var life = 3;
var gameOver;
var gameOverImg;
var mariosad;
var gameState = "play";
var restartImg;
var restart;
var mariocoin, mariodeath, mariojump, mariogameover;
var marioflagImg, marioflag;
var youwon, mariowin; 

function preload(){
  flyinggoombaImg = loadImage("./images/flyinggoomba.png")
  goldgoombaImg = loadImage("./images/goldgoomba.png")
  pipe1 = loadImage("./images/greenpipe1.png")
  pipe2 = loadImage("./images/greenpipe2.png")
  goombaImg = loadImage("./images/goomba1.png")
  brickImg  = loadImage("./images/mariosinglewall.png")
  wallImg = loadImage("./images/mariowall.png")
  mariobg1Img = loadImage("./images/mariobackground1.png")
  mariobg2Img = loadImage("./images/mariobackground2.png")
  coin1Img = loadImage("./images/coin1.png")
  coin2Img = loadImage("/images/coin2.png")
  marioRunning = loadAnimation("images/mario4.png", "images/mario3.png", "images/mario2.png")
  goomba3image = loadImage("./images/3goombas.png")
  restartImg = loadImage("./images/restart.png")
  gameOverImg = loadImage("./images/gameOver.png")
  mariosad = loadAnimation("./images/mariosad.png")
  restartImg = loadImage("./images/restart.png")
  mariocoin = loadSound("mariocoin.mp3")
  mariodeath = loadSound("mariodeath.mp3")
  mariogameover = loadSound("mariogameover.mp3")
  mariojump = loadSound("mariojump.mp3")
  marioflagImg = loadAnimation("./images/marioflag.png")
  mariowin = loadAnimation("./images/mariohappy.png")
  youwon = loadAnimation("./images/youwon.png")

}

function setup() {
  createCanvas(1700, 780)
  //background
  mariobg1 = createSprite(width/2, height/2-200,width,height )
  mariobg1.addImage(mariobg1Img)
  mariobg1.velocityX = -4
  mariobg1.scale = 1.5

  mario = createSprite(350, 650, 20, 20)
  mario.addAnimation("running", marioRunning)
  mario.addAnimation("sad", mariosad)
  mario.addAnimation("happy", mariowin)
  mario.scale  = 0.2

  invisibleGround = createSprite(width/2, 750, 2200, 10)
  invisibleGround.visible = false
  obstaclesGroup = new Group()
  wallsGroup = new Group()
  coinsGroup = new Group()
  gameOver = createSprite(width/2, height/2-200, 100, 100)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 2
  gameOver.visible = false
  restart = createSprite(width/2, height/2, 40, 40)
  restart.addImage(restartImg)
  restart.visible = false

  marioflag = createSprite(1700, 475, 40, 40)
  marioflag.addAnimation("flag", marioflagImg)
  marioflag.addAnimation("win", youwon)
  marioflag.scale = 0.4
  marioflag.velocityX = 0
  marioflag.visible = false
 


}

function draw() {
  background("black")
  //moving background
  if (gameState == "play"){
  if (mariobg1.x<300){
    mariobg1.x = width/2
  }
  if ((keyDown("space") && mario.collide(invisibleGround) || (keyDown("space") && mario.collide(wallsGroup)))){
    mariojump.play()
    mariojump.setVolume(0.1)
    mario.velocityY = -24
    
  }
  mario.velocityY = mario.velocityY+0.7
  if (mario.x<=349){
    mario.x = 350
  }
  if (mario.y<=0){
    mario.velocityY = mario.velocityY+0.7
  }
  createWalls()
  createObstacles()
  createCoins()
  mario.collide(wallsGroup)

 if(mario.overlap(coinsGroup, function(collector, collected)
  {
    mariocoin.play()
    mariocoin.setVolume(0.1)
    score = score+5
    collected.remove();
 })) 
 {}
  
  
  if(mario.overlap(obstaclesGroup, function(collector, collected){
    mariodeath.play()
    mariodeath.setVolume(0.1)
    life = life-1
    collected.remove()
    if (life == 0){
      gameState = "end"
      mariogameover.play()
      mariogameover.setVolume(0.1)
    }
  }))
 {}

  if (score >= 50 && frameCount % 600 == 0){
    marioflag.visible = true
    marioflag.velocityX = -5
    
  }
  if (mario.isTouching(marioflag)){
    gameState = "win"
  }
  
  
  }
  

  if (gameState == "win"){
    marioflag.changeAnimation("win", youwon)
    marioflag.y = 200
    marioflag.x = width/2
    mario.changeAnimation("happy", mariowin)
    obstaclesGroup.setVelocityXEach(0)
    wallsGroup.setVelocityXEach(0)
    mariobg1.velocityX = 0
    coinsGroup.setVelocityXEach(0)
    obstaclesGroup.destroyEach()
    coinsGroup.destroyEach()
    wallsGroup.destroyEach()
    mario.velocityY=-5
    mario.x = width/2
    mario.y = 700
    mario.scale = 0.15
  }

  if (gameState == "end"){
    gameOver.visible = true
    mariobg1.velocityX = 0
    obstaclesGroup.destroyEach()
    wallsGroup.destroyEach()
    coinsGroup.destroyEach()  
    mario.changeAnimation("sad", mariosad)
    mario.position.x = width/2
    restart.visible = true
    mario.velocityY = 0
    mario.y = 650
    if (mousePressedOver(restart)){
      gameState = "play"
      restart.visible = false
      gameOver.visible = false
      mario.changeAnimation("running", marioRunning)
      mariobg1.velocityX = -4
      mario.position.x = 350
      score = 0
      life = 3
    }
  }


  mario.collide(invisibleGround)
  drawSprites()
  textSize(30)
  fill("black")
  text("Score: " + score, 75, 75)
  text("Lives: " + life, 75, 110) 

}

function createObstacles(){
  if (frameCount % 170 == 0){
    goomba = createSprite(1700, 700, 20, 20)
    goomba.addImage(goombaImg)
    goomba.scale = 0.06
    goomba.velocityX = -7
    obstaclesGroup.add(goomba)
  }
}

function createWalls(){
  if (frameCount % 220 == 0){
    wall = createSprite(1700, Math.round(random(430, 530)), 50, 50)
    wall.addImage(wallImg)
    wall.scale = Math.random(0.5, 0.7)
    wall.velocityX = -5
    wallsGroup.add(wall)
  }
}
function createCoins(){
  if(frameCount % 190 == 0){
    coin1 = createSprite(1700, Math.round(random(200, 600)), 20, 20)
    coin1.addImage(coin1Img)
    coin1.scale = 0.05
    coin1.velocityX = -6
    coinsGroup.add(coin1)
  }
}


