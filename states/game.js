import { Toolbox } from "../toolbox.js";
import { Meteor } from "./meteor.js";
import { Projectile } from "../projectile.js";


let time = 0
let kaboom = 0

export class Game {

   

    enterGame(){

       this.x = 50;
       this.y = 50;
       this.width = 50;
       this.height = 50;
    //    this.canvas;
    //    this.pencil;
       this.toolbox = new Toolbox();
       this.meteors = [];
       this.projectiles = [];
        

       this.ySpeed = 0.5;
       this.maximumYSpeed = 8;

         this.timerID = setInterval(() => this.countTime(), 1000); 

          // Create meteors
        for (let i = 0; i < 3; i++) {
            this.meteors.push(new Meteor(this.canvas, this.pencil));
        }

              // Controls
        window.addEventListener("keydown", (e) => {
            if (e.code === "Space") this.flap();
            if (e.code === "Enter") this.shoot();
        });

        this.canvas.addEventListener("mousedown", () => this.flap());

    }

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

       
        // Load bird image
        this.image = new Image();
        this.image.src = "./states/bird.png";
        
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

                time = 0 // keeps stacking the time

                clearInterval(this.timerID); 
                //HOw do i set this to 0?
                // ^how to stop time after leaving the game
            
                // pencil is not defined? 
                // add "this. again
            
            this.changeToState = "gameOver";
            
            return "gameOver"; // i almost never put return
            // copied 
            // from title.js 
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
            document.getElementById("kaboomDisplay").innerHTML = "KaBoom:" + kaboom;
    

            // Remove meteor
            // Need to redraw meteor
            this.meteors.splice(m, 1);

            this.meteors.push(new Meteor(this.canvas, this.pencil));
            // ^^^ copy + paste for line 30 then I
            // had to add "this." to canvas and pencil
            
            // Remove projectile
            this.projectiles.splice(i, 1);

            if(kaboom === 2 ){
                this.changeToState = "youWin"
                console.log("YouWin")
                return "youWin"
                
            } //i forgot return again

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
            //Copy + paste from title.js line 98 - 101 

    }
}
}
