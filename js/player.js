import { HitLine } from "./hitLine.js";
import { HitBox } from "./hitBoxx.js";

function Player() {
	
	const veryImportantConstantDoNotChangeAndYesItIsOnlyUsedOneLineBelowAndNowhereElse = 2; // if you somehow changed it here is the value it needs to be --> 2
	this.scale = 1 / veryImportantConstantDoNotChangeAndYesItIsOnlyUsedOneLineBelowAndNowhereElse;
	this.x = 64;
	this.y = 64;
	
	this.startX = 48;
	this.startY = 48;
	
	this.collidingLeft = false;
	this.collidingRight = false;
	this.collidingUp = false;
	this.collidingDown = false;
	
	this.showHitboxes = true;
	
	this.img = new Image();
	
	this.column = 0;
	this.row = 0;
	this.frameWidth = 64;
	this.frameHeight = 64;
	this.playerWidth = 36;
	this.playerHeight = 54;
	this.counter = 0;
	this.walkSpeed = 2;
	this.sprintSpeed = 3;
	this.speed = this.walkSpeed;
	this.delay = 2;
	
	this.HitBox = new HitBox();
	this.HitBox.width = this.playerWidth * this.scale;
	this.HitBox.height = this.playerHeight * this.scale;
	
	this.hitLines = [];
	for(let i = 0; i < 4; i++) {
		this.hitLines.push(new HitLine());
	}
	
	this.updateHixBoxes = function() {
		
		this.HitBox.x = this.x;
		this.HitBox.y = this.y;
		
		for(let i = 0; i < 4; i++) {
			
			let hitLinesThickness = 4;
			switch (i) {
				case 0:
				//left
				this.hitLines[i].direction = "left";
				this.hitLines[i].x = this.x;
				this.hitLines[i].y = this.y + this.hitLines[i].width;
				this.hitLines[i].height = this.playerHeight * this.scale - this.hitLines[i].width * 2;
				this.hitLines[i].width = hitLinesThickness;
				this.hitLines[i].color = "yellow";
				break;
				
				case 1:
				//right
				this.hitLines[i].direction = "right";
				this.hitLines[i].x = this.x + this.playerWidth * this.scale - this.hitLines[i].width;
				this.hitLines[i].y = this.y + this.hitLines[i].width;
				this.hitLines[i].height = this.playerHeight * this.scale - this.hitLines[i].width * 2;
				this.hitLines[i].width = hitLinesThickness;
				this.hitLines[i].color = "green";
				break;
				
				case 2:
				//up
				this.hitLines[i].direction = "up";
				this.hitLines[i].x = this.x + this.hitLines[i].height;
				this.hitLines[i].y = this.y;
				this.hitLines[i].height = hitLinesThickness;
				this.hitLines[i].width = this.playerWidth * this.scale - this.hitLines[i].height * 2;
				this.hitLines[i].color = "red";
				break;
				
				case 3:
				//down
				this.hitLines[i].direction = "down";
				this.hitLines[i].x = this.x + this.hitLines[i].height;
				this.hitLines[i].y = this.y + this.playerHeight * this.scale - this.hitLines[i].height;
				this.hitLines[i].height = hitLinesThickness;
				this.hitLines[i].width = this.playerWidth * this.scale - this.hitLines[i].height * 2;
				this.hitLines[i].color = "blue";
				break;
			}
		}
	}
	
	this.displayHitboxes = function(yesNo) {
		if(yesNo)
			return 0;
		
		this.HitBox.color = "transparent";
		this.hitLines.forEach(element => {
			element.color = "transparent";
		});
	}
	
	this.update = function(leftRight, isWalking) {
		this.updateHixBoxes();
		this.displayHitboxes(this.showHitboxes);
		this.animation(leftRight, isWalking);
	}
	
	this.sprint = function(isSprinting) {
		if(isSprinting) {
			this.delay = 0;
			this.speed = this.sprintSpeed;
		}else{
			this.delay = 2;
			this.speed = this.walkSpeed;
		}
	}
	
	this.up = function() {
		this.y -= this.speed;
	}
	
	this.down = function() {
		this.y += this.speed;
	}
	
	this.left = function() {
		this.x -= this.speed;
	}
	
	this.right = function() {
		this.x += this.speed;
	}
	
	this.animation = function(leftRight, isWalking) {
		this.animationMove = function(leftRight) {
			if(leftRight != undefined) {
				this.row = leftRight;
			}
			this.counter+=1;
			if(this.counter > this.delay) {
				this.counter = 0;
				this.column++;
				if(this.column > 8) {
					this.column = 0;
				}
			}
		}
		
		this.animationIdle = function(leftRight) {
			if(leftRight != undefined) {
				this.row = leftRight;
			}
			this.counter+=1;
			if(this.counter > this.delay) {
				this.counter = 0;
				this.column++;
				if(this.column > 5) {
					this.column = 0;
				}
			}
		}
		
		if(isWalking) {
			if(this.img.src != "img/run.png")
				this.img.src = "img/run.png";
			
			this.animationMove(leftRight);
		}else {
			if(this.img.src != "img/idle.png")
				this.img.src = "img/idle.png";
			
			this.animationIdle(leftRight);
		}
	}
	
	this.draw = function(ctx) {
		this.HitBox.draw(ctx);
		this.hitLines.forEach(element => {
			element.draw(ctx);
		});
		
		ctx.drawImage(this.img, this.column*this.frameWidth, this.row*this.frameHeight, this.frameWidth, this.frameHeight, this.x - 7, this.y - 4, this.frameWidth * this.scale, this.frameHeight * this.scale);
	}
	
}

export { Player }