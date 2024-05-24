import { mazeSizeX, mazeSizeY } from "./script.js";

function Finish()
{
    this.scale = 1.5;
    this.tile = 167;
    this.img = new Image(); 
	this.img.src = "img/tiles.png";

    this.width = 28 * this.scale;
    this.height = 28 * this.scale;
    this.x = 32 * mazeSizeX * this.scale;
    this.y = 32 * mazeSizeY * this.scale;


    this.draw = function(context) {
        let tileSize = 32;
		let imageNumTiles = 16;

        let tileRow = (this.tile / imageNumTiles) | 0; // Bitwise OR operation
		let tileCol = (this.tile % imageNumTiles) | 0;

        context.fillStyle = "red";
        context.drawImage(this.img, tileCol * tileSize, tileRow * tileSize, tileSize, tileSize, mazeSizeX * tileSize * this.scale, mazeSizeY * tileSize * this.scale, tileSize * this.scale, tileSize * this.scale);
    }
}
export { Finish }