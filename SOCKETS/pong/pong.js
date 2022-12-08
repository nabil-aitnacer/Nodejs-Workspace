const canvas = document.getElementById('pong');
const context =canvas.getContext('2d');

const paddle ={
    width:10,
    height:100,
    color:"White",
  

}
const net = {
    x :canvas.width/2-1,
    y:0,
    width:2,
    height:10,
    color:"White"
}

//crea user paddle 
const user = {
    x:0,
    y:canvas.height/2 -100/2,
    score:0
}
const computer = {
    x:canvas.width-10,
    y:canvas.height/2 -100/2,
    score:0
}
 const ball ={
    x:canvas.width/2,
    y:canvas.height/2,
    radius:10,
    speed:5,
    velocityX:5,
    velocityY:5,
    top : function(){
        return this.y - this.radius;
    },
    bottom : function(){
        return this.y+this.radius;
    },
    left : function(){
        return this.x-this.radius;
    },
    right : function(){
        return this.x+this.radius;
    },
    absoluteVelocityX:function(){
        return Math.abs(this.velocityX)
    },
    absoluteVelocityY:function(){
        return Math.abs(this.velocityY)
    }

 }
//draw Rectangle
function drawRect(x,y,w,h,color){
    context.fillStyle = color;
    context.fillRect(x,y,w,h)
}

//draw Net 
function drawNet(){
    for (let index = 0; index <= canvas.height; index+=15) {
       
        drawRect(net.x,net.y+index,net.width,net.height,net.color);
       
        
    }
}

//draw Circle
function drawCircle(x,y,r,color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x,y,r,0,Math.PI*2,false);
    context.closePath();
    context.fill();

  

}



//draw text
function drawText(text,x,y,color){
    context.fillStyle = color;
    context.font="45px fantasy";
    context.fillText(text,x,y);
}


function render(){
    //clear Canvas 
    drawRect(0,0,canvas.width,canvas.height,"black");
    
    //draw the net
    drawNet()

    //draw Score
    drawText(user.score,canvas.width/4,canvas.height/5,"White");
    drawText(computer.score,3*canvas.width/4,canvas.height/5,"White");

    //draw paddle 
    drawRect(user.x,user.y,paddle.width,paddle.height,paddle.color);
    drawRect(computer.x,computer.y,paddle.width,paddle.height,paddle.color);

    //draw ball
    drawCircle(ball.x,ball.y,ball.radius,ball.color)
}
function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.velocityX = -ball.velocityX;

}
// colission Detection 
function collision(_ball,_playerPaddle){
    _playerPaddle.top = _playerPaddle.y;
    _playerPaddle.bottom = _playerPaddle.y + paddle.height;
    _playerPaddle.left = _playerPaddle.x;
    _playerPaddle.right = _playerPaddle.x +paddle.width;
    return _ball.right()> _playerPaddle.left&&
            _ball.bottom()>_playerPaddle.top
            && _ball.left()< _playerPaddle.right
            && _ball.top()< _playerPaddle.bottom

}
//controle user paddle
canvas.addEventListener('mousemove',movePaddle);
function movePaddle(e){
    let rect =canvas.getBoundingClientRect();
    user.y = e.clientY - rect.top - paddle.height/2
}
//update function 
function update(){
   
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    let computerLevel = 0.1;
    computer.y +=(ball.y - (computer.y + paddle.height/2))*computerLevel
    if(ball.bottom() > canvas.height || ball.top()< 0){
        ball.velocityY = -ball.velocityY
    }

    // check whos have the ball
    let player = (ball.x < canvas.width/2 )?user :computer
    if(collision(ball,player)){
        let collidePoint = ball.y - (player.y - paddle.height/2);
        //angle
        
        // normalisation
        collidePoint = collidePoint/(paddle.height/2);
        let angleRad = collidePoint * Math.PI/4
        // x direction 
        let direction = (ball.x < canvas.width/2)? 1 :-1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);

        ball.velocityY =  ball.speed * Math.sin(angleRad);
ball.speed +=0.5;
    }
    if(ball.left() <0  ){
        computer.score++;
        resetBall();

    }else if(ball.right()>canvas.width){
      
        user.score++;
        resetBall();
    }
    console.log(ball.x)
}

//game Init 
function game(){
  
    update()
    render();
}
function testingBouncing(){
    
   if(ball.bottom() >canvas.height){
    ball.velocityY = -ball.absoluteVelocityY()
    
   } else if (ball.right()>canvas.width) {
    ball.velocityX = -ball.absoluteVelocityX();
    ball.velocityY = -ball.absoluteVelocityY()
   } else if(ball.top() <= 0){
    ball.velocityX = -ball.absoluteVelocityX()
    ball.velocityY = ball.absoluteVelocityY()
   }else if(ball.left() <= 0){
    ball.velocityX = ball.absoluteVelocityX()
    ball.velocityY = ball.absoluteVelocityY()
   }
}
const framePerSecond = 60;
setInterval(game,1000/framePerSecond)