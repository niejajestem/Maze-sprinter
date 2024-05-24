function World(grid) {
	
	let scale = 1.5;

	this.img = new Image(); 
	this.img.src = "img/tiles.png";
	
	this.grid = grid;
	
	let tileSize = 32;
	let imageNumTiles = 16;
	
	this.draw = function(ctx) {
		
		for(let i = 0; i< this.grid.length; i++) {
			for(let j = 0; j < this.grid[i].length; j++) {
				let tile = this.grid[i][j];
				let tileRow = (tile / imageNumTiles) | 0;
				let tileCol = (tile % imageNumTiles) | 0;
				ctx.drawImage(this.img, tileCol * tileSize, tileRow * tileSize, tileSize, tileSize, j * tileSize * scale, i * tileSize * scale, tileSize * scale, tileSize * scale);
			}
		}
	}
	this.collidingObjects = [];
	
	this.drawCollision = () => {
		for(let i = 0; i < this.grid.length; i++) {
			for(let j = 0; j < this.grid[i].length; j++) {
				if(grid[i][j] == 15) {
					this.collidingObjects.push( {
						x: j * 32 * scale,
						y: i * 32 * scale,
						height: 32 * scale,
						width: 32 * scale
					})
				}	
			}
		}
	}
	
}

export { World }