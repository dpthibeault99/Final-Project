import { Toolbox } from "../toolbox.js";

export class Credits {

    canvas;
    pencil;
    changeToState = false;
    toolbox = new Toolbox();

    // Back to Title button
    titleButtonX = 300;
    titleButtonY = 300;
    titleButtonW = 100;
    titleButtonH = 50;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        // Only listen for clicks — not keypresses
        this.onClicked = this.onClicked.bind(this);
        document.addEventListener("click", this.onClicked);
    }

    onClicked(event) {
        let hitTitle = this.toolbox.isWithinRect(
            event.offsetX, event.offsetY,
            this.titleButtonX, this.titleButtonY,
            this.titleButtonW, this.titleButtonH
        );

        if (hitTitle) {
            this.changeToState = "title";
        }
    }

    update() {
        this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Page title
        this.pencil.fillStyle = "gray";
        this.pencil.font = "30px Georgia";
        this.pencil.fillText("Credits", 10, 50);

        // test credits
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Programming: Daniel", 10, 100);
        this.pencil.fillText("Art: Daniel", 10, 140);

        // Title button
        this.pencil.fillStyle = "lightblue";
        this.pencil.fillRect(
            this.titleButtonX, this.titleButtonY,
            this.titleButtonW, this.titleButtonH
        );

        this.pencil.fillStyle = "black";
        this.pencil.fillText("Title",
            this.titleButtonX + 20,
            this.titleButtonY + 30
        );

        // Return next state if changed
        if (this.changeToState) {
            const result = this.changeToState;
            this.changeToState = false;
            return result;
        }

        console.log("Credits");
    }
}
