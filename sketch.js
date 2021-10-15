

var imagemDaTorre, torre;
var portaImg, porta, grupoPortas;
var escaladorImg, escaladores, grupoEscaladores;
var fantasma, imagemDoFantasma;
var grupoBlocoInvisivel, blocoInvisivel;
var estadoJogo = "JOGAR"

function preload(){
  imagemDaTorre = loadImage("tower.png");
  portaImg = loadImage("door.png");
  escaladorImg = loadImage("climber.png");
  imagemDoFantasma = loadImage("ghost-standing.png");
  somAssustador = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  //sprites
  torre = createSprite(300,300);
  torre.addImage("tower",imagemDaTorre);
  torre.velocityY = 5;
  
  fantasma = createSprite(200,200,50,50);
  fantasma.addImage(imagemDoFantasma);
  fantasma.scale = 0.35;
  
  //somAssustador.loop();
  
  
  //grupos
  grupoPortas = new Group();
  grupoEscaladores = new Group();
  grupoBlocoInvisivel = new Group();
}


function draw(){
  background(0);
  
  
  
  
  
  
  
  
  
  
  
  if(estadoJogo == "JOGAR") {
    if(grupoEscaladores.isTouching(fantasma)){
      fantasma.velocityY= 0;
    }
    if(torre.y > 500){
      torre.y = height/2;
    }
    
    if(keyDown("LEFT_ARROW")){
      fantasma.x = fantasma.x-3;
    } else if(keyDown("RIGHT_ARROW")){
      fantasma.x = fantasma.x+3;
    }
    if (keyDown('space')){
      fantasma.velocityY = -10;
    }
    fantasma.velocityY = fantasma.velocityY + 1  
    gerarPortas();
    if (grupoBlocoInvisivel.isTouching(fantasma) || fantasma.y > 600){
      fantasma.destroy();
      estadoJogo = "ENCERRAR";
    }
  }
  drawSprites();
  if (estadoJogo == "ENCERRAR"){
    textSize(30);
    fill("yellow");
    stroke("yellow");
    text("gameOver", 230, 250);

    torre.velocityY = 0;
  }
}
function gerarPortas(){
  if(frameCount % 70 == 0){
    porta = createSprite(200, -50);
    porta.addImage(portaImg);
    porta.x = Math.round(random(120, 480)); 
    porta.velocityY = 5;
    porta.lifetime = 800;
    grupoPortas.add(porta);
    
    escaladores = createSprite(200, 10);
    escaladores.addImage(escaladorImg);
    escaladores.x = porta.x;
    escaladores.velocityY = 5;
    grupoEscaladores.add(escaladores);
    
    blocoInvisivel = createSprite(200, 15);
    blocoInvisivel.width = escaladores.width;
    blocoInvisivel.height = 2;
    blocoInvisivel.x = porta.x;
    blocoInvisivel.velocityY = 5;
    grupoBlocoInvisivel.add(blocoInvisivel);
    
    fantasma.depth = porta.depth;
    fantasma.depth = fantasma.depth + 1;
  }
}

