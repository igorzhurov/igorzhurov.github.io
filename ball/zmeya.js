var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = 'skyblue';
ctx.strokeStyle = 'green';

function Ball() {
	this.x = 200;
	this.y = 200;
	this.radius = 10;
	this.xSpeed = -2;
	this.ySpeed = 2;
};

function circle (x, y, radius, fillCircle) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	if (fillCircle) {
		ctx.fill();
	} else {
		ctx.stroke();
	}
};

Ball.prototype.draw = function () {
	circle(this.x, this.y, this.radius, true);
};

Ball.prototype.move = function () {
	this.x += this.xSpeed;
	this.y += this.ySpeed;
};

Ball.prototype.checkCollision = function () {
	if(this.x - this.radius <= 0 || this.x + this.radius >= 1000) {
		this.xSpeed = -this.xSpeed;
	}
	if(this.y - this.radius <= 0 || this.y + this.radius >= 500) {
		this.ySpeed = -this.ySpeed;
	}
};

var ball = new Ball();

function imBall() {
	ctx.clearRect(0, 0, 1000, 500);
	ball.draw();
	ball.move();	
	ball.checkCollision();
	ctx.strokeRect(0, 0, 1000, 500);
};

setInterval("imBall()", 3);
