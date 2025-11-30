export class Projectile {
    constructor(x, y, pencil) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 5;
        this.speed = 10;  // pixels per frame
        this.pencil = pencil;
    }

    update() {
        this.x += this.speed; // moves right
    }

    draw() {
        this.pencil.fillStyle = "yellow";
        this.pencil.fillRect(this.x, this.y, this.width, this.height);
    }

    isOffscreen(canvasWidth) {
        return this.x > canvasWidth;
    }
}
