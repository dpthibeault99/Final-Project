export class Meteor {

    canvas;
    pencil;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.size = 60;

        // Use standard rectangle fields for collision
        this.width = this.size;
        this.height = this.size;

        this.reset();  // sets x, y, random speed
    }

    reset() {
        // Spawn just off the right side
        this.x = this.canvas.width;

        // Random vertical placement
        this.y = Math.floor(Math.random() * (this.canvas.height - this.height));

        // Random speed between 2 and 7
        this.speed = Math.random() * 5 + 2;
    }

    move() {
        this.x -= this.speed;

        // If off-screen, respawn with new random speed and height
        if (this.x + this.width < 0) {
            this.reset();
        }
    }

    draw() {
        this.pencil.fillStyle = "#444";
        this.pencil.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
