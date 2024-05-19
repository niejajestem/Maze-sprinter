import { mazeSizeX, mazeSizeY } from "./script.js";

function Finish()
{
    this.tile = 167;
    this.img = new Image(); 
	this.img.src = "img/tiles.png";

    this.width = 28;
    this.height = 28;
    this.x = 32 * mazeSizeX;
    this.y = 32 * mazeSizeY;


    this.draw = function(context) {
        let tileSize = 32;
		let imageNumTiles = 16;

        let tileRow = (this.tile / imageNumTiles) | 0; // Bitwise OR operation
		let tileCol = (this.tile % imageNumTiles) | 0;

        context.fillStyle = "red";
        context.drawImage(this.img, tileCol * tileSize, tileRow * tileSize, tileSize, tileSize, mazeSizeX*tileSize, mazeSizeY*tileSize, tileSize, tileSize);
    }
}
export { Finish }