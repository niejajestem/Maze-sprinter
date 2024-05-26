class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    follow(player) {
        // Center the camera on the player
        this.x = player.x - window.innerWidth / 2 + player.width / 2;
        this.y = player.y - window.innerHeight / 2 + player.height / 2;
    }

    applyTransform(ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset the transform
        ctx.translate(-this.x, -this.y); // Translate by the camera position
    }
}

export { Camera };
