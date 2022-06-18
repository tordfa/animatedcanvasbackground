export default class Thing{
    constructor(height,width,xPos,yPos,xVel,yVel){
        this.height = height;
        this.width=width;
        this.xPos=xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.fillStyle  = '#6933a6';

    }
    static xTarget = 0;
    static yTarget = 0;

    static createRandom(amount){
        let listOfThings = [];
        for (let index = 0; index < amount; index++) {
            let randomColor="#" + (Math.floor(Math.random()*16777215).toString(16));
            let randomHeight = Math.floor(Math.random() * 30);
            let randomWidth = Math.floor(Math.random() * 30);
            let randomXPos = Math.floor(Math.random()*500);
            let randomYPos = Math.floor(Math.random()*500);
            let randomXVel = Math.floor(Math.random()*10);
            let randomYVel = Math.floor(Math.random()*10);
            let ting = new Thing(randomHeight,randomWidth,randomXPos,randomYPos,randomXVel,randomYVel)
            ting.fillStyle= randomColor;
            listOfThings.push(ting)
        }
        return(listOfThings);
    }


    update(ctx){
        if(this.xPos > (ctx.canvas.width - this.width) || this.xPos < 0){
            this.xVel= -this.xVel;

        }
    
        if(this.yPos > ctx.canvas.height - this.height || this.yPos < 0){
            this.yVel=-this.yVel
        }
        
      
        this.xPos = this.xPos + this.xVel;
        this.yPos = this.yPos + this.yVel;

    }

    draw(ctx){
        ctx.fillStyle=this.fillStyle;
        ctx.strokeStyle=this.fillStyle;
        // ctx.fillRect(this.xPos, this.yPos,this.height,this.width);

        // //Hypotenus
        // ctx.beginPath();
        // ctx.moveTo(this.xPos,this.yPos);
        // ctx.lineTo(250,250);
        // ctx.stroke();

        // //katet
        // ctx.beginPath();
        // ctx.moveTo(this.xPos,this.yPos);
        // ctx.lineTo(250,this.yPos);
        // ctx.stroke();

        // //katet
        // ctx.beginPath();
        // ctx.moveTo(250,250);
        // ctx.lineTo(250,this.yPos);
        // ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle='black';
        ctx.arc(this.xPos,this.yPos, this.height, 0,2*Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    moveTo(xKlikk,yKlikk){
        var speed = 1;
        if(yKlikk <= this.yPos){
            this.xVel=-((Math.floor(xKlikk-this.xPos))/(Math.floor(yKlikk-this.yPos)))*speed;
            this.yVel = -1 * speed

        }else{
            this.xVel=((xKlikk-this.xPos)/(yKlikk-this.yPos))*speed;
            this.yVel = 1 * speed;
        }
    }

    

}
