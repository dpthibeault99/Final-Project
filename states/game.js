import { Toolbox } from "../toolbox.js";

export class Game {

    x = 50;
    y = 50;
    width = 50;
    height = 50;
    canvas;
    pencil;

    ySpeed = 1;
    maximumYSpeed = 20;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        //  Load bird image
        this.image = new Image();
        this.image.src = "bird.png"; // put your bird image in the same folder
    }

    draw() {
        // draw image instead of box
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

    checkCollision(a, b) {
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        );
    }

    isHitByPipe(pipe) {
        let birdBox = { x: this.x, y: this.y, width: this.width, height: this.height };

        let topPipeBox = {
            x: pipe.topPipeTopLeft.x,
            y: pipe.topPipeTopLeft.y,
            width: pipe.topPipeBottomRight.x - pipe.topPipeTopLeft.x,
            height: pipe.topPipeBottomRight.y - pipe.topPipeTopLeft.y
        };

        let bottomPipeBox = {
            x: pipe.bottomPipeTopLeft.x,
            y: pipe.bottomPipeTopLeft.y,
            width: pipe.bottomPipeBottomRight.x - pipe.bottomPipeTopLeft.x,
            height: pipe.bottomPipeBottomRight.y - pipe.bottomPipeTopLeft.y
        };

        return this.checkCollision(birdBox, topPipeBox) || this.checkCollision(birdBox, bottomPipeBox);
    }
}

    // canvas;
    // pencil;

    // constructor(canvas, pencil) {
    //     this.canvas = canvas;
    //     this.pencil = pencil;
    // }

    // update() {
    //     console.log("In game!")

    //      this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);


    //     this.pencil.fillStyle = "gray";
    //     this.pencil.font = "20px Georgia";
    //     this.pencil.fillText("Game", 300, 50);

    //     ///^^^ Why does title keep re-drawing on top off itself
    //     // It was becasue i didt clearRect before
    //     ///^^^ dosent go away when the state changes
    // }



// }