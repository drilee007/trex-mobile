
var trex ,trexCorrendo, trexDead;
var chao, chaoImagem, chaoInvisivel;
var obstaculo, obstaculo1, obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;
var nuvem, nuvemImagem;
var placar = 0;
var groupCacto, groupNuvem;
var estadoJogo = "inicio";
var gameOver, gameOverImagem;
var restart, restartImagem;
var jumpSom, dieSom, checkpointSom;
var mensagem = "suco"


function preload(){
  trexCorrendo = loadAnimation ("trex1.png", "trex3.png", "trex4.png");
  chaoImagem = loadImage ("ground2.png");
  obstaculo1 = loadImage ("obstacle1.png");
  obstaculo2 = loadImage ("obstacle2.png")
  obstaculo3 = loadImage ("obstacle3.png");
  obstaculo4 = loadImage ("obstacle4.png");
  obstaculo5 = loadImage ("obstacle5.png");
  obstaculo6 = loadImage ("obstacle6.png");
  nuvemImagem = loadImage ("cloud.png");
  trexDead = loadAnimation ("trex_collided.png");
  gameOverImagem = loadImage ("gameOver.png");
  restartImagem = loadImage ("restart.png");
  jumpSom = loadSound ("jump.mp3");
  dieSom = loadSound ("die.mp3");
  checkpointSom = loadSound ("checkpoint (1).mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight)
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation ("correndo", trexCorrendo);
  trex.addAnimation ("morto", trexDead);
  trex.scale = 0.5;
  trex.debug = false;
  trex.setCollider ("circle", 0,0,40)

  chao = createSprite (width,180,400,20);
  chao.addImage (chaoImagem);
  chaoInvisivel = createSprite (200,190,400,10);
  chaoInvisivel.visible = false;

 groupCacto = new Group ();
 groupNuvem = new Group ();

 gameOver = createSprite (300, 100);
 gameOver.addImage (gameOverImagem );
 gameOver.scale = 0.5;
 gameOver.visible = false;
 restart = createSprite (300,150);
 restart.addImage(restartImagem);
 restart.scale = 0.5;
 restart.visible = false;
 
}

function draw(){
  background("white")

  text ("Pontos: " + placar, width-300,50);

  if (estadoJogo === "jogando") {
    placar = placar + Math.round(frameCount/60);
    chao.velocityX = -(2.5 + placar / 200);
   if (chao.x < 0) {
    chao.x = chao.width/2;
   }
   if (touches.length>0 || (keyDown("space")) && (trex.y>=100)) {
    trex.velocityY = - 8;
    jumpSom.play ();
    touches = []
   }
   trex.velocityY = trex.velocityY + 0.8;
   criarNuvems ();
   criarObstaculos()
   if (placar % 100 == 0 && placar>0) {
    checkpointSom.play ();
   }
   if (trex.isTouching (groupCacto)) {
    estadoJogo = "fim";
    dieSom.play ();
   }
  } else  if (estadoJogo === "fim") {
    chao.velocityX = 0;
    groupCacto.setVelocityXEach (0);
    groupNuvem.setVelocityXEach (0);
    trex.changeAnimation ("morto", trexDead);
    groupCacto.setLifetimeEach (-1);
    groupNuvem.setLifetimeEach (-1);
    gameOver.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart) || touches.length>0) {
      reiniciar ()
      touches = [];
    }
  } else  {
    if (keyDown("space")) {
      estadoJogo = "jogando";
     }
}

  trex.collide (chaoInvisivel);
 
  drawSprites();
  console.log (mensagem);
}

function criarNuvems() {
  if (frameCount % 60 == 0) {
    nuvem = createSprite (width+200,50);
    nuvem.y = Math.round(random (20,80));
    nuvem.addImage (nuvemImagem); 
    nuvem.velocityX = -(2.5 + placar / 200);
    groupNuvem.add (nuvem);
    trex.depth = nuvem.depth;
    trex.depth = trex.depth + 1;
    nuvem.lifetime = width+500;
  }

}

function criarObstaculos() {
  if (frameCount % 60 == 0) {
    obstaculo = createSprite (width+200,160);       
    obstaculo.velocityX = -(2.5 + placar / 200);
    obstaculo.lifetime = width+500;
    obstaculo.scale = 0.7;
    groupCacto.add (obstaculo);
    var numeroObstaculo = Math.round (random(1,6));
    switch (numeroObstaculo) {
      case 1:  obstaculo.addImage (obstaculo1);
        break;
      case 2:  obstaculo.addImage (obstaculo2);
        break;
      case 3:  obstaculo.addImage (obstaculo3);
        break;
      case 4:  obstaculo.addImage (obstaculo4);
        break;
      case 5:  obstaculo.addImage (obstaculo5);
        break;
      case 6:  obstaculo.addImage (obstaculo6);
        break;
      default:
        break;
    } 
  }

}

function reiniciar () {
  estadoJogo = "inicio";
  placar = 0;
  trex.changeAnimation ("correndo", trexCorrendo);
  gameOver.visible = false;
  restart.visible = false;
  groupCacto.destroyEach();
  groupNuvem.destroyEach();
}



