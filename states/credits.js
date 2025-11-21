import { Toolbox } from "../toolbox.js";

export class Credits {

    canvas;
    pencil;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
    }

    update() {
        console.log("Credits!")

         this.pencil.clearRect(0, 0, this.canvas.width, this.canvas.height);


        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Credits", 300, 50);

        ///^^^ Why does title keep re-drawing on top off itself
        // It was becasue i didt clearRect before
        ///^^^ dosent go away when the state changes
    }



}