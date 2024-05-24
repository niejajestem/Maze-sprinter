import { HitLine } from "./hitLine.js";
import { HitBox } from "./hitBoxx.js";

function Player() {

	const veryImportantConstantDoNotChangeAndYesItIsOnlyUsedOneLineBelowAndNowhereElse = 3; // if you somehow changed it here is the value it needs to be --> 3
	this.scale = 1 / veryImportantConstantDoNotChangeAndYesItIsOnlyUsedOneLineBelowAndNowhereElse;
	this.x = 64;
	this.y = 64;
	
	this.startX = 64;
	this.startY = 64;

	this.collidingLeft = false;
	this.collidingRight = false;
	this.collidingUp = false;
	this.collidingDown = false;
	this.showHitboxes = false;
	
	this.img = new Image();
	this.img.src = "img/bahamut.png";
	
	this.column = 0;
	this.row = 0;
	this.frameWidth = 96;
	this.frameHeight = 96;
	this.counter = 0;
	this.delay = 10;
	
	this.HitBox = new HitBox();
	this.HitBox.width = this.frameWidth * this.scale;
	this.HitBox.height = this.frameHeight * this.scale;
	
	this.hitLines = [];
	for(let i = 0; i < 4; i++) {
		this.hitLines.push(new HitLine());
	}
	
	this.updateHixBoxes = function() {
		
		this.HitBox.x = this.x;
		this.HitBox.y = this.y;
		
		for(let i = 0; i < 4; i++) {
			
			switch (i) {
				case 0:
				//left
				this.hitLines[i].direction = "left";
				this.hitLines[i].x = this.x - 2;
				this.hitLines[i].y = this.y;
				this.hitLines[i].height = this.frameHeight * this.scale;
				this.hitLines[i].width = 2;
				this.hitLines[i].color = "yellow";
				break;
				
				case 1:
				//right
				this.hitLines[i].direction = "right";
				this.hitLines[i].x = this.x + this.frameWidth * this.scale;
				this.hitLines[i].y = this.y ;
				this.hitLines[i].height = this.frameHeight * this.scale;
				this.hitLines[i].width = 2;
				this.hitLines[i].color = "green";
				break;

				case 2:
				//up
				this.hitLines[i].direction = "up";
				this.hitLines[i].x = this.x;
				this.hitLines[i].y = this.y - 2;
				this.hitLines[i].height = 2;
				this.hitLines[i].width = this.frameWidth * this.scale;
				this.hitLines[i].color = "red";
				break;

				case 3:
				//down
				this.hitLines[i].direction = "down";
				this.hitLines[i].x = this.x;
				this.hitLines[i].y = this.y + this.frameHeight * this.scale;
				this.hitLines[i].height = 2;
				this.hitLines[i].width = this.frameHeight * this.scale;
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

	this.update = function() {

		this.updateHixBoxes();

		this.displayHitboxes(this.showHitboxes);
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
		ctx.drawImage(this.img, this.column*this.frameWidth, this.row*this.frameHeight, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth * this.scale, this.frameHeight * this.scale);
		this.hitLines.forEach(element => {
			element.draw(ctx);
		});
		this.HitBox.draw(ctx);
	}
}

export { Player }