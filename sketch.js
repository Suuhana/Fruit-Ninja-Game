//declaration of the game States
var PLAY=1;

var END=0;

var gameState=1;

//declaration of the variables
var knife , fruit , monster;

var fruitGroup , monsterGroup;

var score , r , randomFruit , position;

var knifeImage , fruit1, fruit2 ,fruit3 , fruit4;

var monsterImage , gameOverImage;

var gameOverSound , knifeSwooshSound;

function preload(){
  
  //preloading the images
  knifeImage = loadImage("knife.png");
  
  monsterImage = loadAnimation("alien1.png","alien2.png")
  
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  gameOverImage = loadImage("gameover.png")

  gameOverSound = loadSound("gameover.mp3");
  
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
  
}

function setup() {
  
  //creating the canvas
  createCanvas(600, 400);
  
  //creating the knife
  knife=createSprite(40,200,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.7
  knife.setCollider("rectangle",0,0,40,40);

  //Initializing the variable 'score'
  score = 0;
  
  //Initializing the Groups
  fruitGroup=createGroup();
  monsterGroup=createGroup();
}

function draw() {
  
  //setting background color
  background("lightblue");
  
  if(gameState===PLAY){
    
    //Calling the fruits and Monster function
    fruits();
    Monster();
    
    //Moving knife with the mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    //Increasing score if knife touching fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      
      score = score + 2;
      
      knifeSwooshSound.play();
    }
    else {
      
      //Go to the end state if knife is touching the enemy
      if(monsterGroup.isTouching(knife)){
        gameState=END;
        
        gameOverSound.play();
        
        fruitGroup.destroyEach();
        monsterGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
        
        knife.addImage(gameOverImage);
        knife.scale  =2;
        knife.x = 300;
        knife.y = 200;
      }
    }
  }
  
  drawSprites();
  
  //Displaying the Score
  textSize(25);
  text("Score : " + score,250,50);
}

//creating the function for adding fruit & monster elements

function Monster(){
  
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100,450));
    monster.velocityX = -(8 + (score/10));
    monster.setLifetime = 50;
    
    monsterGroup.add(monster);
  }
}

function fruits(){
  
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    
    fruit = createSprite(400,200,20,20);
    
    if(position == 1) {
    fruit.x = 600;
    
    fruit.velocityX = -(7 + score/4);
      
    } else {
      
      if(position == 2) {
      fruit.x = 0;
      
      fruit.velocityX = (7 + score/4);
      }
    }
    
    fruit.scale = 0.2;
    
    r = Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,550));
    
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}