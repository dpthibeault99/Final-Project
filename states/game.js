import { Toolbox } from "../toolbox.js";
import { Meteor } from "./meteor.js";
import { Projectile } from "../projectile.js";
import { Gameover } from "./gameOver.js";

let time = 0
let kaboom = 0

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

        setInterval(() => this.countTime(), 1000); 
        //^^this had to be in the constructor for some reason

        // Load bird image
        this.image = new Image();
        this.image.src = "./states/bird.png";

        // Create meteors
        for (let i = 0; i < 3; i++) {
            this.meteors.push(new Meteor(canvas, pencil));
        }

        // Controls
        window.addEventListener("keydown", (e) => {
            if (e.code === "Space") this.flap();
            if (e.code === "Enter") this.shoot();
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

    shoot() {
        let projX = this.x + this.width;
        let projY = this.y + this.height / 2 - 2.5;
        this.projectiles.push(new Projectile(projX, projY, this.pencil));
    }

    // Fixed collison
    checkCollision(bird, meteor) {
        return !(
            bird.x + bird.width < meteor.x ||
            bird.x > meteor.x + meteor.size ||
            bird.y + bird.height < meteor.y ||
            bird.y > meteor.y + meteor.size
        );
    }

    

    countTime() {
    time++;
    document.getElementById("timeDisplay").innerHTML = "Time:" + time;
    }

    update() {
        this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Bird physics
        this.gravity();
        this.draw();

        // Meteors
        for (let m of this.meteors) {
            m.move();
            m.draw();
        }

        // Projectiles
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            let p = this.projectiles[i];

            p.update();
            p.draw();

            if (p.isOffscreen(this.canvas.width)) {
                this.projectiles.splice(i, 1);
            }
        }

        // Build bird hitbox
        let birdBox = {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };

        // Bird–meteor collision
        for (let m of this.meteors) {
            if (this.checkCollision(birdBox, m)) {
                console.log("HIT!");
                // change to gameOver.js
            
                // pencil is not defined? 
                // add "this. again
            this.fillStyle = "red";
            this.font = "30px Arial";
            this.pencil.fillText("GAME OVER", 90, 200);
            this.pencil.fillText("Click or Press Key to Restart", 30, 240);
            this.changeToState = "gameOver";// copied from title.js 
            // line 40 and changed to gameOver

            }
        }


        for (let i = this.projectiles.length - 1; i >= 0; i--) {
    let p = this.projectiles[i];

    p.update();
    p.draw();

    // Remove projectile if it goes off screen
    if (p.isOffscreen(this.canvas.width)) {
        this.projectiles.splice(i, 1);
        continue;
    }

    // Check collision with meteors
    for (let m = this.meteors.length - 1; m >= 0; m--) {

        let meteor = this.meteors[m];

        // Collision (AABB)
        let hit =
            p.x < meteor.x + meteor.size &&
            p.x + p.width > meteor.x &&
            p.y < meteor.y + meteor.size &&
            p.y + p.height > meteor.y;

        if (hit) {
            console.log("KaBOOM!");

            
    kaboom ++; // im fucking awesome
    document.getElementById("kaboomDisplay").innerHTML = "KaBoom:" + time;
    

            // Remove meteor
            // Need to redraw meteor
            this.meteors.splice(m, 1);

            this.meteors.push(new Meteor(this.canvas, this.pencil));
            // ^^^ copy + paste for line 30 then I
            // had to add "this." to canvas and pencil
            

            // Remove projectile
            this.projectiles.splice(i, 1);

            break; // stop checking this projectile
        }

     
        
    }
}

        // HUD
        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Game", 300, 50);

          if (this.changeToState) {
            const result = this.changeToState;
            this.changeToState = false;
            return result;  // "game" or "credits"
            //Copy + paste from titlee.js line 98 - 101 

    }
}
}
