// import {Thing} from '/thing.js'

class Thing{
    constructor(height,width,xPos,yPos,xVel,yVel){
        this.height = height;
        this.width=width;
        this.xPos=xPos;
        this.yPos = yPos;
        this.xVel = xVel;
        this.yVel = yVel;
        this.fillStyle  = '#6933a6';
        this.xAcceleration = 0;
        this.yAcceleration = 0;

    }

    static createRandom(amount){
        let listOfThings = [];
        for (let i= 0; i< amount; i++) {
            let randomColor="#" + (Math.floor(Math.random()*16777215).toString(16));
            // 
            randomColor = "black";
            //
            let randomHeight = Math.floor(Math.random() * 40);
            let randomWidth = Math.floor(Math.random() * 30);
            let randomXPos = Math.floor(Math.random()*500);
            let randomYPos = Math.floor(Math.random()*500);
            let randomXVel = Math.floor(Math.random()*5);
            let randomYVel = Math.floor(Math.random()*1);
            let ting = new Thing(randomHeight,randomWidth,randomXPos,randomYPos,randomXVel,randomYVel)
            ting.fillStyle= randomColor;
            listOfThings.push(ting)
        }
        return(listOfThings);
    }


    update(ctx){

        // Collision detection
        if(this.xPos > (ctx.canvas.width - this.width) || this.xPos < 0){
            this.xVel= -this.xVel;
            this.newXVel= -this.newXVel;

        }
    
        if(this.yPos > ctx.canvas.height - this.height || this.yPos < 0){
            this.yVel=-this.yVel  
            this.newYVel = -this.newYVel   
        }
        //
        if(this.xPos > (((ctx.canvas.width/2)-((ctx.canvas.width*0.55)/2))) && this.xPos < ((ctx.canvas.width/2)+((ctx.canvas.width*0.55)/2))){
            
            if(this.yPos > ((ctx.canvas.height/2)-((ctx.canvas.height*0.40)/2)) && this.yPos < ((ctx.canvas.height/2)+((ctx.canvas.height*0.40)/2))){
                this.fillStyle="white";
            }else{
                this.fillStyle="black"
            }
        }else{
            this.fillStyle="black"
        }
        
        const maxVel = 5;
        this.xVel = this.xVel + this.xAcceleration
        if (this.xVel > maxVel){
            this.xVel = maxVel;
        }else if(this.xVel < -maxVel){
            this.xVel = -maxVel
        }
        this.yVel = this.yVel + this.yAcceleration
        if (this.yVel > maxVel){
            this.yVel = maxVel;
        }else if(this.yVel < -maxVel){
            this.yVel = -maxVel
        }
        this.xPos = this.xPos + (this.xVel);
        this.yPos = this.yPos + this.yVel;

    }

    draw(ctx){
        this.update(ctx);
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

    moveTo(xKlikk,yKlikk,speed){
        
        var aKatet = xKlikk-this.xPos;
        var bKatet = yKlikk-this.yPos;
        var cHyp = Math.sqrt(Math.pow(aKatet,2) + Math.pow(bKatet,2))
        var fart = cHyp/250 * speed;
        // console.log("Chyp: " + cHyp); 
        // console.log("a: " + aKatet);
        // console.log("b: " + bKatet);
        this.xAcceleration = ((aKatet/cHyp)*(fart));
        this.yAcceleration = ((bKatet/cHyp)*(fart));

    }

    onClick(xKlikk,yKlikk){
        if((xKlikk < this.xPos+this.height) && (xKlikk > this.xPos-this.height)){
            if((yKlikk < this.yPos+this.height) && (yKlikk > this.yPos-this.height)){
                return true;
            }

        }
    }

    randomSpeed(){
        let randomXVel = Math.floor((Math.random()*30)-15);
        let randomYVel = Math.floor((Math.random()*30)-15);

        this.xVel = randomXVel;
        this.yVel = randomYVel;
    }

    

}

//----------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------//
console.log("TestGit")
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d')
var overlay = document.getElementsByClassName("overlay")[0];
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

var speed = 10;

let klikkPosX = 500;
let klikkPosY = 500;

let canvasXCenter = (ctx.canvas.width)/2;
let canvasYCenter = (ctx.canvas.height)/2;


console.log(canvasXCenter)

let tings = Thing.createRandom(30);


canvas.addEventListener('click', function (e) {
    klikkPosX = (e.clientX)
    klikkPosY = (e.clientY)
        for (let i= 0; i< tings.length; i++) {

            tings[i].moveTo(klikkPosX,klikkPosY,speed); 
            
            }

        for (let i= tings.length-1;i>= 0; i--) {
            if(tings[i].onClick(klikkPosX,klikkPosY)){
                tings.splice(i,1);
                console.log(i+ " removed" )
                break
            }   
        }

        

    
})

overlay.addEventListener('click', function (e){
    for (let i= 0; i< tings.length; i++) {
        tings[i].randomSpeed();
        
    }
})

function init() {

    window.requestAnimationFrame(draw);
}

function update(){
    for (let i= 0; i< tings.length; i++) {  
        tings[i].moveTo(klikkPosX,klikkPosY,0.1);  
        }
}

function draw(){
    update(); 

        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)


    for (let i= 0; i< tings.length; i++) {  
    tings[i].draw(ctx);  
    }

    window.requestAnimationFrame(draw); 
}

init();