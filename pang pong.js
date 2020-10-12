var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var round = 1 ;
var keystart = 0;
var keymove = 70;
canvas.width = document.body.clientWidth *0.55;
canvas.height= 600*0.8;

function player (x,y) {
  this.x = x;
  this.y = y;
  this.score = 0;
  this.draw = function(){
    ctx.lineWidth=10;
    ctx.strokeStyle="white";
    ctx.beginPath();
    ctx.moveTo(this.x,this.y);
    ctx.lineTo(this.x,this.y+30);
    ctx.stroke();
  }; }

var aiPlayer = new player (645, 230 );
var huPlayer = new player (50 , 230 );


function Ball(){
  this.dx = -3;
  this.dy = -3;
  this.player = 1;
  this.bx = 345; 
  this.by= random(480,0);
  this.moveball=function(){
ctx.fillStyle = "white";
ctx.strokeStyle="white";
ctx.fillRect(this.bx,this.by, 8, 8);
if (this.bx < 0) {
  this.bx = 345;
  aiPlayer.score++;
}

if (this.bx > canvas.width -  8) {
  this.bx=345;
  huPlayer.score++;
}

 if (this.by < 0 || this.by > canvas.height - 8 ) {   
        this.dy=-this.dy;
    }
    
    this.bx+=this.dx;
    this.by+=this.dy;
};
this.change=function(player,x,y){
this.player = player;
this.bx = x; 
this.by= y;
this.dx=-this.dx;
this.dy=-this.dy;
};

}
var ball = new Ball() ;

function coll (x,y,bx,by){
  var count = 0 ;
 if (bx <= (x + 10) &&  bx >= x ){
if (by <= (y+30) &&  by >= y){
  count++;
 }}
 if(count > 0){
return true;}
 else 
  return false; 
  }

function track (player,dy ,by , y ){
if (player == 2){
  if ((dy*by) < 0){
  y--;
  if (y < 0){
   y++;
}
  }

  else if ((dy*by) > 0 ){
    y++;
    if (y > 450){
      y--;
}
  }
}
return y;
}
document.addEventListener("keypress", function(){
  keystart++;
  
});
document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 38:
          if (keymove > 0){
          keymove-=3;}
            break;
        case 40:
        if (keymove < 470){
        keymove+=3;}
            break;
    }
});
// function to generate random number

function random(max,min) {
  var num = Math.floor(Math.random()* (max - min) + min) ;
  return num;
}
 
 
function play (){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
   ctx.fillStyle = "#032d46";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  ctx.save();
  ctx.fillStyle = "white";
  ctx.strokeStyle="white";
 ctx.font = '25px Arial';
 ctx.fillText('Round ' + round , 300, 40);
 // ctx.fillText("5", 348, 30);
 ctx.font = '25px Arial';
 ctx.fillText(huPlayer.score, 145, 70);
 ctx.fillText(aiPlayer.score, 545, 70);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "white";
  ctx.strokeStyle="white";
  ctx.lineWidth=5;
  for(var i =80; i< 220 ; i += 8){
    ctx.beginPath();
    ctx.moveTo(345,i);
    ctx.lineTo(345,i+5);
    ctx.stroke();}
  ctx.restore();

 ctx.save();
 ctx.fillStyle = "white";
  ctx.strokeStyle="white";
 ctx.font = "20px Arial";
 ctx.fillText("Press any key to start", 250, 250);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "white";
  ctx.strokeStyle="white";
  ctx.lineWidth=5;
  for(var i =270; i< 420 ; i += 8){
    ctx.beginPath();
    ctx.moveTo(345,i);
    ctx.lineTo(345,i+5);
    ctx.stroke();}
  ctx.restore();


  ctx.save();
  aiPlayer.draw();
  ctx.restore();

  ctx.save();
  huPlayer.draw();
  ctx.restore(); 

  if (keystart == 1){
    window.requestAnimationFrame(playstart);
  }
  else{
  window.requestAnimationFrame(play);}
}

 
function playstart (){
  keystart=0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
   ctx.fillStyle = "#032d46";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  ctx.save();
   ctx.fillStyle = "white";
  ctx.strokeStyle="white";
 ctx.font = '25px Arial';
 ctx.fillText('Round ' + round , 300, 40);
 // ctx.fillText("5", 348, 30);
 ctx.font = '25px Arial';
 ctx.fillText(huPlayer.score, 145, 70);
 ctx.fillText(aiPlayer.score, 545, 70);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "white";
  ctx.strokeStyle="white";
  ctx.lineWidth=5;
  for(var i = 80; i< 420 ; i += 8){
    ctx.beginPath();
    ctx.moveTo(345,i);
    ctx.lineTo(345,i+5);
    ctx.stroke();}
  ctx.restore();

  ctx.save();
  aiPlayer.y = track(ball.player , ball.dy , ball.by , aiPlayer.y);
  aiPlayer.draw();
  ctx.restore();

  ctx.save();
  huPlayer.y = keymove;
  huPlayer.draw();
  ctx.restore(); 

  ctx.save();
  ball.moveball();
  ctx.restore();

  ctx.save();
  if (coll(aiPlayer.x ,aiPlayer.y , ball.bx , ball.by)==true){
    ball.change(1,aiPlayer.x,aiPlayer.y);
  }
  if (coll(huPlayer.x ,huPlayer.y , ball.bx , ball.by)==true){
    ball.change(2,huPlayer.x,huPlayer.y);
  }
  ctx.restore();

  if (aiPlayer.score == 5){
    window.requestAnimationFrame(gameend);
  }else if(huPlayer.score==5){
  aiPlayer.score=0;
  huPlayer.score=0;
  ball.player=2;
  round++;
  window.requestAnimationFrame(secondround);
  }
  else {
    window.requestAnimationFrame(playstart); }
  }
  
function gameend (){
 ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
   ctx.fillStyle = "#032d46";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  ctx.save();
  ctx.fillStyle = "white";
  ctx.strokeStyle="white";
 ctx.font = '25px Arial';
 ctx.fillText('Round ' + round , 300, 40);
 // ctx.fillText("5", 348, 30);
 ctx.font = '25px Arial';
 ctx.fillText(huPlayer.score, 145, 70);
 ctx.fillText(aiPlayer.score, 545, 70);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "white";
  ctx.strokeStyle="white";
  ctx.lineWidth=5;
  for(var i =80; i< 220 ; i += 8){
    ctx.beginPath();
    ctx.moveTo(345,i);
    ctx.lineTo(345,i+5);
    ctx.stroke();}
  ctx.restore();

 ctx.save();
 ctx.fillStyle = "white";
  ctx.strokeStyle="white";
 ctx.font = "20px Arial";
 ctx.fillText("Game Over", 290, 250);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "white";
  ctx.strokeStyle="white";
  ctx.lineWidth=5;
  for(var i =270; i< 420 ; i += 8){
    ctx.beginPath();
    ctx.moveTo(345,i);
    ctx.lineTo(345,i+5);
    ctx.stroke();}
  ctx.restore();

  ctx.save();
  aiPlayer.draw();
  ctx.restore();

  ctx.save();
  huPlayer.draw();
  ctx.restore(); 

if (keystart == 1){
  keystart = 0;
  aiPlayer.score=0;
  huPlayer.score=0;
    window.requestAnimationFrame(play);
  }
  else{
  window.requestAnimationFrame(gameend);}}

function  secondround (){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
   ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  ctx.save();
   ctx.fillStyle = "white";
  ctx.strokeStyle="white";
 ctx.font = '25px Arial';
 ctx.fillText('Round ' + round , 300, 40);
 // ctx.fillText("5", 348, 30);
 ctx.font = '25px Arial';
 ctx.fillText(huPlayer.score, 145, 70);
 ctx.fillText(aiPlayer.score, 545, 70);
  ctx.restore();

  ctx.save();
  ctx.fillStyle = "white";
  ctx.strokeStyle="white";
  ctx.lineWidth=5;
  for(var i = 80; i< 420 ; i += 8){
    ctx.beginPath();
    ctx.moveTo(345,i);
    ctx.lineTo(345,i+5);
    ctx.stroke();}
  ctx.restore();

  ctx.save();
  aiPlayer.y = track(ball.player , ball.dy , ball.by , aiPlayer.y);
  aiPlayer.draw();
  ctx.restore();

  ctx.save();
  huPlayer.y = keymove;
  huPlayer.draw();
  ctx.restore(); 

  ctx.save();
  ball.moveball();
  ctx.restore();

  ctx.save();
  if (coll(aiPlayer.x ,aiPlayer.y , ball.bx , ball.by)==true){
    ball.change(1,aiPlayer.x,aiPlayer.y);
  }
  if (coll(huPlayer.x ,huPlayer.y , ball.bx , ball.by)==true){
    ball.change(2,huPlayer.x,huPlayer.y);
  }
  ctx.restore();

  if (aiPlayer.score == 5){
    window.requestAnimationFrame(gameend);
  }else if(huPlayer.score==5){
  aiPlayer.score = 0;
  huPlayer.score = 0;
  ball.player = 2;
  round = 0;
  window.requestAnimationFrame(play);
  }
 window.requestAnimationFrame(secondround);
}
 


window.requestAnimationFrame(play);