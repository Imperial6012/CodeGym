var ONE_RADIAN = Math.PI/180;
var _360_RADIAN = 360*ONE_RADIAN;
function Car(x,y, mapWidth, mapHeight){
    this.img = new Image();
    this.img.src = "Img/Car.png";
    this.mapWidth = mapWidth;
    this.mapHeight = mapHeight;

    this.maxspeed = 4;
    this.minspeed = 0;
    this.speed = 0;

    this.acceleration = 0.5;
    this.friction = 0;
    this.rotationAngle = 4.0*ONE_RADIAN;
    this.angle = -90 * ONE_RADIAN;
    this.height = 20;
    this.width = 30;
    this.h_height = this.height/2;
    this.h_width = this.width/2;
    this.cx = 620;
    this.cy = 150;

    this.vertices = [];
 
    this.vertices.push({x: 0, y: 0});
    this.vertices.push({x: 0, y: 0});
    this.vertices.push({x: 0, y: 0});
    this.vertices.push({x: 0, y: 0});
 
}

Car.prototype.draw = function(context){
    context.save();
    context.translate(this.cx,this.cy);
    context.rotate(this.angle);
    context.drawImage(this.img,-this.h_width,-this.h_height,this.width,this.height);
    context.restore();
}
 
Car.prototype.update = function(){
    var cos = Math.cos(this.angle);
    var sin = Math.sin(this.angle);
 
    if(this.speed!=2) {

        this.cx += cos*this.speed;
        this.cy += sin*this.speed;
        if(this.cx<0)
            this.cx = 0;
        else if(this.cx>this.mapWidth)
            this.cx = this.mapWidth;
 
        if(this.cy<0)
            this.cy = 0;
        else if(this.cy>this.mapHeight)
            this.cy = this.mapHeight;
    }

    this.vertices[0] = {
        x: Math.floor(this.cx + cos*-this.h_width-sin*-this.h_height),
        y: Math.floor(this.cy + sin*-this.h_width+cos*-this.h_height)
    };

    this.vertices[1] = {
        x: Math.floor(this.cx + cos*this.h_width-sin*-this.h_height),
        y: Math.floor(this.cy + sin*this.h_width+cos*-this.h_height)
    };

    this.vertices[2] = {
        x: Math.floor(this.cx + cos*this.h_width-sin*this.h_height),
        y: Math.floor(this.cy + sin*this.h_width+cos*this.h_height)
    };

    this.vertices[3] = {
        x: Math.floor(this.cx + cos*-this.h_width-sin*this.h_height),
        y: Math.floor(this.cy + sin*-this.h_width+cos*this.h_height)
    };
}
Car.prototype.handleInput = function(keyStates){
    if(keyStates[Keys.UP_ARROW]) {
        this.speed += this.acceleration;
        if(this.speed > this.maxspeed)
            this.speed = this.maxspeed;
    }else if(keyStates[Keys.DOWN_ARROW]) {
        this.speed -= this.acceleration;
        if(this.speed < this.minspeed)
            this.speed = this.minspeed;
    }
 
    if(keyStates[Keys.LEFT_ARROW])
        this.angle -= this.rotationAngle;
    if(keyStates[Keys.RIGHT_ARROW])
        this.angle += this.rotationAngle;
 
    this.angle = this.angle % _360_RADIAN;
 
    this.speed *= (1.0 - this.friction);
    if(Math.abs(this.speed)<0.1)
        this.speed = 0;
}