import { Player } from './player.js';
import { World } from './world.js';
import { Finish } from './finish.js';
import { Camera } from './camera.js';

const canvas = document.getElementById('root');
const context = canvas.getContext('2d');
canvas.width = 10000;
canvas.height = 10000;

const player = new Player();

let left = false, right = false, up = false, down = false;
let mazeRows = 7;
let mazeCols = 7;
let tilesAddedPerWin = 2;

let leftRightDirection = false;
let isWalking = false;

let world = new World();
let finish = new Finish();
const camera = new Camera();

if (mazeCols % 2 == 0) mazeCols--;
if (mazeRows % 2 == 0) mazeRows--;

function handleKeyDown(event) {
    var keyCode = event.keyCode;
    switch (keyCode) {
        case 37: // left
            left = true;
            right = false;
            leftRightDirection = true;
            break;
        case 38: // up
            up = true;
            down = false;
            break;
        case 39: // right
            right = true;
            left = false;
            leftRightDirection = false;
            break;
        case 40: // down
            down = true;
            up = false;
            break;
        case 16: // left shift
            player.sprint(true);
            break;
    }

    event.stopPropagation();
    event.preventDefault();
}

function handleKeyUp(event) {
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
            player.sprint(false);
            break;
    }
}

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
    maze[startX][startY] = 79;
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

function setGameMode(mode) {
    console.log(`Setting game mode to: ${mode}`);
    currentGameMode = mode;
}

function onMazeCompleted() {
    if (currentGameMode === "increasing") {
        mazeCols += tilesAddedPerWin;
        mazeRows += tilesAddedPerWin;
    }
    generateMaze(mazeCols, mazeRows);
}

let currentMazeSize = 10;
let currentGameMode = "increasing";

function startNewGame() {
    player.x = player.startX;
    player.y = player.startY;

    document.addEventListener("DOMContentLoaded", function() {
        const settingsForm = document.getElementById("settingsForm");
        const mazeSizeInput = document.getElementById("mazeSize");
        const gameModeSelect = document.getElementById("gameMode");

        let currentMazeSize = parseInt(mazeSizeInput.value);
        let currentGameMode = gameModeSelect.value;

        setGameMode(currentGameMode);

        settingsForm.addEventListener("submit", function(event) {
            event.preventDefault();
            currentMazeSize = parseInt(mazeSizeInput.value);
            currentGameMode = gameModeSelect.value;
            console.log("Maze size set to:", currentMazeSize);
            console.log("Game mode set to:", currentGameMode);
            applySettings(currentMazeSize, currentGameMode);
        });

        function applySettings(mazeSize, gameMode) {
            console.log(`Applying settings - Maze Size: ${mazeSize}, Game Mode: ${gameMode}`);
            generateMaze(mazeSize);
            setGameMode(gameMode);
        }
    });

    const maze = generateMaze(mazeCols, mazeRows);
    world = new World(maze);
    world.drawCollision();
    finish = new Finish();
}

function checkWinCondition() {
    return checkCollision(player.HitBox, finish);
}

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function isCollision(player, obstacles, direction) {
    let isColliding = false;

    const hitLine = player.hitLines.find(element => element.direction === direction);
    if (hitLine === undefined) {
        console.warn("HitLine not found");
        return null;
    }

    obstacles.forEach(element => {
        if (checkCollision(hitLine, element)) {
            isColliding = true;
        }
    });
    return isColliding;
}

window.addEventListener('keydown', handleKeyDown, false);
window.addEventListener('keyup', handleKeyUp, false);

window.addEventListener('load', () => {
    startNewGame();

    function update() {
        isWalking = up || down || left || right;

        if (checkWinCondition()) {
            onMazeCompleted();
            startNewGame();
        }

        let collisionDown = isCollision(player, world.collidingObjects, "down");
        let collisionUp = isCollision(player, world.collidingObjects, "up");
        let collisionLeft = isCollision(player, world.collidingObjects, "left");
        let collisionRight = isCollision(player, world.collidingObjects, "right");

        if (down && !collisionDown) {
            player.down();
        } else {
            player.collidingDown = collisionDown;
        }

        if (up && !collisionUp) {
            player.up();
        } else {
            player.collidingUp = collisionUp;
        }

        if (left && !collisionLeft) {
            player.left();
        } else {
            player.collidingLeft = collisionLeft;
        }

        if (right && !collisionRight) {
            player.right();
        } else {
            player.collidingRight = collisionRight;
        }

        player.update(leftRightDirection, isWalking);
        camera.follow(player); // Update camera to follow player
    }

    function draw() {
        camera.applyTransform(context); // Apply camera transformation
        context.clearRect(0, 0, canvas.width, canvas.height);

        world.draw(context);
        player.draw(context);
        finish.draw(context);
    }

    function mainLoop() {
        update();
        draw();
        requestAnimationFrame(mainLoop);
    }

    requestAnimationFrame(mainLoop);
});

export { mazeCols as mazeSizeX, mazeRows as mazeSizeY };
