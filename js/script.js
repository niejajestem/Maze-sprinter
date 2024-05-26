import { Player } from './player.js';
import { World } from './world.js';
import { Finish } from './finish.js';
import { Camera } from './camera.js';

const canvas = document.getElementById('root');
const context = canvas.getContext('2d');
canvas.width = 10000;
canvas.height = 10000;

const dragon = new Player();

let left, right, up, down = false;
let mazeSizeY = 7;
let mazeSizeX = 7;
let tilesAddedPerWin = 2;

let leftRight = false;
let isWalking = false;

let collisionLayer = new World();
let finish = new Finish();
const camera = new Camera();

if(mazeSizeX % 2 == 0)
    mazeSizeX--;
if(mazeSizeY % 2 == 0)
    mazeSizeY--;

function push(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 37: //left
        left = true;
        right = false;
        leftRight = true;
        break;
        case 38: //up
        up = true;
        down = false;
        break;
        case 39: //right
        right = true;
        left = false;
        leftRight = false;
        break;
        case 40: //down
        down = true;
        up = false;
        break;
        case 16: //l.shift
        dragon.sprint(true);
        break;
    }
    
    event.stopPropagation();
    event.preventDefault();
}

function release(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 37:
        left = false;
        break;
        case 38:
        up = false;
        break;
        case 39:
        right = false;
        break;
        case 40:
        down = false;
        break;
        case 16:
        dragon.sprint(false);
        break;
    }
}

function newGame()
{
    dragon.x = dragon.startX;
    dragon.y = dragon.startY;
    

    function generateMaze(rows, cols) {
        let maze = [];
        for (let i = 0; i < rows; i++) {
            maze[i] = [];
            for (let j = 0; j < cols; j++) {
                maze[i][j] = 15;
            }
        }
        
        function isValid(x, y) {
            return x >= 0 && x < rows && y >= 0 && y < cols;
        }
        
        function getNeighbors(x, y) {
            const neighbors = [];
            const dirs = [[0, 2], [0, -2], [2, 0], [-2, 0]];
            for (let [dx, dy] of dirs) {
                const nx = x + dx;
                const ny = y + dy;
                if (isValid(nx, ny) && maze[nx][ny] === 15) {
                    neighbors.push([nx, ny, x + dx / 2, y + dy / 2]);
                }
            }
            return neighbors;
        }
        
        let walls = [];
        let startX = 0;
        let startY = 0;
        maze[0][startY] = 79;
        walls.push(...getNeighbors(startX, startY));
        
        while (walls.length > 0) {
            let randomIndex = Math.floor(Math.random() * walls.length);
            const [x, y, wx, wy] = walls.splice(randomIndex, 1)[0];
            
            if (maze[x][y] === 15) {
                maze[x][y] = 79;
                maze[wx][wy] = 79;
                walls.push(...getNeighbors(x, y));
            }
        }
        
        let endX, endY;
        do {
            endX = Math.floor(Math.random() * rows);
            endY = Math.floor(Math.random() * cols);
        } while (maze[endX][endY] !== 79);
        
        maze.unshift(Array(cols).fill(15));
        maze.push(Array(cols).fill(15));
        
        maze.forEach(element => {
            element.push(15);
            element.unshift(15);
        });
        
        return maze;
    }
    
    const maze = generateMaze(mazeSizeX, mazeSizeY);
    collisionLayer = new World(maze);
    collisionLayer.drawCollision();
    finish = new Finish();
}


function checkForWin()
{
    if(collision(dragon.HitBox, finish))
        return true;
    return false;
}

function collision(rect1, rect2) {
    if(rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y ) {
            return true;
        }
    }
    
    function isCollision(player, obstacles, direction) {
        let isColliding = false;
        
        const hitLine = player.hitLines.find(element => element.direction == direction);
        if(hitLine == undefined) {
            console.warn("HitLine not found");
            return null;
        }
        
        obstacles.forEach(element => {
            if(collision(hitLine, element))
                {
                isColliding = true;
            }
        });
        return isColliding;
    }
    
    window.addEventListener('keydown', push, false);
    window.addEventListener('keyup', release, false);
    
    window.addEventListener('load', () => {
        
        newGame();
        function update() {
            
            isWalking = up || down || left || right;

            if(checkForWin()) {
                console.warn("You win");
                mazeSizeX += tilesAddedPerWin;
                mazeSizeY += tilesAddedPerWin;

                newGame();
            }
            
            let collisionDown = isCollision(dragon, collisionLayer.collidingObjects, "down");
            let collisionUp = isCollision(dragon, collisionLayer.collidingObjects, "up");
            let collisionLeft = isCollision(dragon, collisionLayer.collidingObjects, "left");
            let collisionRight = isCollision(dragon, collisionLayer.collidingObjects, "right");
            
            if (down && (!collisionDown)) {
                dragon.down();
            } else {
                dragon.collidingDown = collisionDown;
            }
            
            if (up && (!collisionUp)) {
                dragon.up();
            } else {
                dragon.collidingUp = collisionUp;
            }
            
            if (left && (!collisionLeft)) {
                dragon.left();
            } else {
                dragon.collidingLeft = collisionLeft;
            }
            
            if (right && (!collisionRight)) {
                dragon.right();
            } else {
                dragon.collidingRight = collisionRight;
            }
            
            dragon.update(leftRight, isWalking);
            camera.follow(dragon); // Update camera to follow player
        }
        
        function draw() {
            camera.applyTransform(context); // Apply camera transformation
            context.clearRect(0, 0, canvas.width, canvas.height);
    
            collisionLayer.draw(context);
            dragon.draw(context);
            finish.draw(context);
        }
        
        function mainLoop() {
            update();
            draw();
            requestAnimationFrame(mainLoop);
        }
        
        requestAnimationFrame(mainLoop);
        
    });
    
    export { mazeSizeX, mazeSizeY }