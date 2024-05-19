import { HitLine } from "./hitLine.js";
import { HitBox } from "./hitBoxx.js";

function Player() {
	this.x = 44;
	this.y = 44;
	
	this.collidingLeft = false;
	this.collidingRight = false;
	this.collidingUp = false;
	this.collidingDown = false;
	
	this.img = new Image();
	this.img.src = "img/bahamut.png";
	
	this.column = 0;
	this.row = 0;
	this.frameWidth = 96;
	this.frameHeight = 96;
	this.counter = 0;
	this.delay = 10;
	
	this.width = 8;
	this.height = 8;
	

	this.HitBox = new HitBox();
	this.HitBox.width = this.width;
	this.HitBox.height = this.height;

	this.hitLines = [];
	for(let i = 0; i < 4; i++)
	{
		this.hitLines.push(new HitLine());
	}
	
	this.updateHixBoxes = function() {
		
		this.HitBox.x = this.x;
		this.HitBox.y = this.y;

		for(let i = 0; i < 4; i++) {
			
			switch (i) {
				case 0:
				{
					//left
					this.hitLines[i].direction = "left";
					this.hitLines[i].x = this.x - 2;
					this.hitLines[i].y = this.y;
					this.hitLines[i].height = this.height;
					this.hitLines[i].width = 2;
					this.hitLines[i].color = "yellow";
					break;
				}
				case 1:
				{
					//right
					this.hitLines[i].direction = "right";
					this.hitLines[i].x = this.x + this.width;
					this.hitLines[i].y = this.y ;
					this.hitLines[i].height = this.height;
					this.hitLines[i].width = 2;
					this.hitLines[i].color = "green";
					break;
				}
				case 2:
				{
					//up
					this.hitLines[i].direction = "up";
					this.hitLines[i].x = this.x;
					this.hitLines[i].y = this.y - 2;
					this.hitLines[i].height = 2;
					this.hitLines[i].width = this.width;
					this.hitLines[i].color = "red";
					break;
				}
				case 3:
				{
					//down
					this.hitLines[i].direction = "down";
					this.hitLines[i].x = this.x;
					this.hitLines[i].y = this.y + this.height;
					this.hitLines[i].height = 2;
					this.hitLines[i].width = this.width;
					this.hitLines[i].color = "blue";
					break;
				}
			}
		}
	}
	
	this.update = function() {
		this.updateHixBoxes();
	}
	
	this.down = function() {
		this.row = 0;
		this.counter+=1;
		if(this.counter > this.delay) {
			this.counter = 0;
			this.column++;
			if(this.column > 3) {
				this.column = 0;
			}
		}
		this.y += 2;
	}
	
	this.left = function() {
		this.row = 1;
		this.counter+=1;
		if(this.counter > this.delay) {
			this.counter = 0;
			this.column++;
			if(this.column > 3) {
				this.column = 0;
			}
		}
		this.x -= 2;
	}
	
	this.right = function() {
		this.row = 2;
		this.counter+=1;
		if(this.counter > this.delay) {
			this.counter = 0;
			this.column++;
			if(this.column > 3) {
				this.column = 0;
			}
		}
		this.x += 2;
	}
	
	this.up = function() {
		this.row = 3;
		this.counter+=1;
		if(this.counter > this.delay) {
			this.counter = 0;
			this.column++;
			if(this.column > 3) {
				this.column = 0;
			}
		}
		this.y -= 2;
	}
	
	this.draw = function(ctx) {
		ctx.drawImage(this.img, this.column*this.frameWidth, this.row*this.frameHeight, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth, this.frameHeight);
		this.hitLines.forEach(element => {
			element.draw(ctx);
		});
		this.HitBox.draw(ctx);
	}
}

export { Player }