import { Toolbox } from "../toolbox.js";


export class Title {

    canvas;
    pencil;
    changeToState = false;
    toolbox = new Toolbox();

    // Start Button
    startButtonX = 300;
    startButtonY = 200;
    startButtonW = 100;
    startButtonH = 50;

    // Credits Button
    creditsButtonX = 300;
    creditsButtonY = 300;
    creditsButtonW = 100;
    creditsButtonH = 50;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onClicked = this.onClicked.bind(this);

        document.addEventListener("keypress", this.onKeyPressed);
        document.addEventListener("click", this.onClicked);
    }

    /// I tried to make a 2nd constructor and got an error saying title.js can only have one constructor. 
    /// it appears you only need diffrent sets of propertys to make
    /// more than one "button",and it has the same pixel x/y as the title button

    onKeyPressed() {
        // keyboard always starts the game
        this.changeToState = "game"; //working click to start, cant coment out of breaks the code
    }

    onClicked(event) {
        // START button check
        let hitStart = this.toolbox.isWithinRect(
            event.offsetX, event.offsetY,
            this.startButtonX, this.startButtonY,
            this.startButtonW, this.startButtonH
        );

        // CREDITS button check
        let hitCredits = this.toolbox.isWithinRect(
            event.offsetX, event.offsetY,
            this.creditsButtonX, this.creditsButtonY,
            this.creditsButtonW, this.creditsButtonH
        );

        if (hitStart) this.changeToState = "game";
        if (hitCredits) this.changeToState = "credits";
    }

    update() {
        // clear screen each frame
        this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Title", 10, 50);

        // Draw START button
        this.pencil.fillStyle = "pink";
        this.pencil.fillRect(
            this.startButtonX, this.startButtonY,
            this.startButtonW, this.startButtonH
        );

        /// how to put text over drawn images
        this.pencil.fillStyle = "black";
        this.pencil.fillText("Start",
            this.startButtonX + 20,
            this.startButtonY + 30
        );

        // Draw CREDITS button
        this.pencil.fillStyle = "lightblue";
        this.pencil.fillRect(
            this.creditsButtonX, this.creditsButtonY,
            this.creditsButtonW, this.creditsButtonH
        );
        /// how to put text over drawn images
        this.pencil.fillStyle = "black";
        this.pencil.fillText("Credits",
            this.creditsButtonX + 15,
            this.creditsButtonY + 30
        );

        // if state changed, return it
        if (this.changeToState) {
            const result = this.changeToState;
            this.changeToState = false;
            return result;  // "game" or "credits"
        }
    }
}
