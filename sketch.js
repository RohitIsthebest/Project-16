var PLAY = 1
var END = 0
var gameState = 1

var fruit,monster,knife,fruitgroup,monsterGroup,score
var monsterImage,fruit1,fruit2,fruit3,fruit4,knifeImage,gameOverImage,gameOver

var gameOverSound,knifeSwooshSound
function preload(){
    knifeImage = loadImage("knife.png")
    monsterImage = loadAnimation("alien1.png" , "alien2.png")
     
    gameOverImage = loadImage("gameover.png")

    fruit1 = loadImage("fruit1.png")
    fruit2 = loadImage("fruit2.png")
    fruit3 = loadImage("fruit3.png")
    fruit4 = loadImage("fruit4.png")

    knifeSwooshSound = loadSound("knifeSwoosh.mp3")
    gameOverSound = loadSound("gameover.mp3")

}

function setup(){
    createCanvas(600,600)

    knife = createSprite(200,200,40,40)
    knife.addImage("knife",knifeImage)
    knife.scale = 0.7
    knife.setCollider("rectangle",0,0,40,40);
    

    score = 0 
    fruitgroup = createGroup()
    monsterGroup = createGroup()
}

function draw(){
    background("lightblue")

    if(gameState === PLAY){

        spawnfruits()
        spawnmonster()

        knife.x = World.mouseX
        knife.y = World.mouseY

        if(fruitgroup.isTouching(knife)){
            fruitgroup.destroyEach()

            knifeSwooshSound.play()
            score = score + 2
        }

        if(monsterGroup.isTouching(knife)){
            gameState = END 
            gameOverSound.play()

        }
    }
    
    if(gameState === END){

        gameOver = createSprite(300,300,20,20)
        gameOver.addImage(gameOverImage)
        gameOver.scale = 2
       
        knife.destroy()
        fruitgroup.destroyEach();
        monsterGroup.destroyEach();
        fruitgroup.setVelocityXEach(0);
        monsterGroup.setVelocityXEach(0);
    }


    drawSprites()
    textSize(25)
    text("Score : " + score,350,50)

}

function spawnfruits(){
    if(frameCount % 80 === 0){
        fruit = createSprite(400,200,20,20)
        fruit.y = Math.round(random(50,550));
        fruit.x = 0
        fruit.scale = 0.3
        fruit.velocityX = (7+(score/4))

        var rand = Math.round(random(1,4))
        switch(rand){

            case 1 : fruit.addImage(fruit1)
                break
            case 2 : fruit.addImage(fruit2)
                break
            case 3 : fruit.addImage(fruit3)
                break
            case 4 : fruit.addImage(fruit4)
                break    
        }
        
        fruit.lifetime = 160
        fruitgroup.add(fruit)


    }

}

function spawnmonster(){
    if(frameCount % 200 === 0){
        monster = createSprite(400,200,20,20)
        monster.y = Math.round(random(100,550))
        monster.addAnimation("monsteer",monsterImage)
        monster.velocityX = -(8+(score/10));
        monsterGroup.add(monster)
        monster.lifetime = 300

    }
}