function World(grid) {
	
	this.img = new Image(); 
	this.img.src = "img/tiles.png";
	
	this.grid = grid;
	
	this.draw = function(ctx) {
		let tileSize = 32;       // The size of a tile (32×32)		
		let imageNumTiles = 16;  // The number of tiles per row in the tileset image
		
		for(let i = 0; i< this.grid.length; i++) {
			for(let j = 0; j < this.grid[i].length; j++) {
				let tile = this.grid[i][j];				
				let tileRow = (tile / imageNumTiles) | 0; // Bitwise OR operation
				let tileCol = (tile % imageNumTiles) | 0;
				ctx.drawImage(this.img, (tileCol * tileSize), (tileRow * tileSize), tileSize, tileSize, (j * tileSize), (i * tileSize), tileSize, tileSize);								
			}
		}
	}
	this.collidingObjects = [];
	
	this.drawCollision = () => {
		for(let i = 0; i < this.grid.length; i++) {
			for(let j = 0; j < this.grid[i].length; j++) {
				if(grid[i][j] == 15) {
					this.collidingObjects.push( {
						x: j*32,
						y: i*32,
						height: 32,
						width: 32
					})
				}	
			}
		}
	}
	
}

export { World }