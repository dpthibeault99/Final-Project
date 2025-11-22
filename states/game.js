import { Toolbox } from "../toolbox.js";

export class Game {

    x = 50;
    y = 50;
    width = 50;
    height = 50;
    canvas;
    pencil;
    toolbox = new Toolbox();

    ySpeed = 0.5;
    maximumYSpeed = 8;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        // Load bird image
        this.image = new Image();
        this.image.src = "./states/bird.png";

        // FLAP CONTROLS
        window.addEventListener("keydown", (e) => {
            if (e.code === "Space") this.flap();
        });

        canvas.addEventListener("mousedown", () => this.flap());
    }

    draw() {
        this.pencil.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    flap() {
        this.ySpeed = -15;
    }

    gravity() {
        this.y += this.ySpeed;
        this.ySpeed += 2;

        if (this.ySpeed > this.maximumYSpeed) {
            this.ySpeed = this.maximumYSpeed;
        }
    }

    update() {
        this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Flappy physics
        this.gravity();
        this.draw();

        // HUD text
        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Game", 300, 50);
    }
}