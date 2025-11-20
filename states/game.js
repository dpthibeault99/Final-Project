export class Game {

    canvas;
    pencil;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;
    }

    update() {
        console.log("In game!")

        this.pencil.fillStyle = "gray";
        this.pencil.font = "20px Georgia";
        this.pencil.fillText("Game", 10, 50);

        ///^^^ Why does title keep re-drawing on top off itself
        ///^^^ dosent go away when the state changes
    }



}