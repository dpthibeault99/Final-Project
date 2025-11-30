import { Toolbox } from "../toolbox.js";
import { Meteor } from "./meteor.js";   
import { Projectile } from "../projectile.js";

export class Game {

    x = 50;
    y = 50;
    width = 50;
    height = 50;
    canvas;
    pencil;
    toolbox = new Toolbox();
    meteors = [];
    projectiles = [];

    ySpeed = 0.5;
    maximumYSpeed = 8;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        // Load bird image
        this.image = new Image();
        this.image.src = "./states/bird.png";

         // Make meteors
        for (let i = 0; i < 3; i++) {
        this.meteors.push(new Meteor(canvas, pencil));
        }

        // FLAP CONTROLS
        window.addEventListener("keydown", (e) => {
            if (e.code === "Space") this.flap();
        });

        window.addEventListener("keydown", (e) => {
        if (e.code === "Enter") this.shoot();
        })
        

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

    shoot() {
    // Spawn projectile at the front of the bird
    let projX = this.x + this.width;
    let projY = this.y + this.height / 2 - 2.5; // centered vertically
    this.projectiles.push(new Projectile(projX, projY, this.pencil));
    }

    update() {
        this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Flappy physics
        this.gravity();
        this.draw();

        // draw meteors
        for (let m of this.meteors) {
            m.move();
            m.draw();
        }

        for (let i = this.projectiles.length - 1; i >= 0; i--) {
        let p = this.projectiles[i];
        p.update();
        p.draw();

        // Remove if offscreen
        if (p.isOffscreen(this.canvas.width)) {
        this.projectiles.splice(i, 1);
    }
}


        // HUD text
        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Game", 300, 50);
}
}