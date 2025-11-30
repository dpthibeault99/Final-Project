export class Meteor {

    canvas;
    pencil;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.size = 60;
        this.reset();                // sets position *and* random speed
    }

    reset() {
        // Spawn just off the right side
        this.x = this.canvas.width;

        // Random vertical placement
        this.y = Math.floor(Math.random() * (this.canvas.height - this.size));

        // 🔥 Assign a random speed for this meteor (2–7 px per frame)
        this.speed = Math.random() * 5 + 2;

        // Collision box
        this.topLeft = { x: this.x, y: this.y };
        this.bottomRight = { x: this.x + this.size, y: this.y + this.size };
    }

    move() {
        this.x -= this.speed;

        // Update collision box
        this.topLeft.x = this.x;
        this.bottomRight.x = this.x + this.size;

        // If off-screen, respawn with NEW random speed & height
        if (this.x + this.size < 0) {
            this.reset();
        }
    }

    draw() {
        this.pencil.fillStyle = "#444";  // dark gray
        this.pencil.fillRect(
            this.x,
            this.y,
            this.size,
            this.size
        );
    }
}
