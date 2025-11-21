
import { Game} from "./states/game.js"
import { Gameover } from "./states/gameOver.js";
import { Title } from "./states/title.js";
import { Toolbox } from "./toolbox.js";
import { Credits } from "./states/credits.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();

//Make game states

let game = new Game (canvas, pencil);
let gameOver = new Gameover(canvas, pencil);
let title = new Title(canvas, pencil);
let credits = new Credits(canvas, pencil);

let state = title;

function gameloop(){

    pencil.clearRect(0,0, canvas.width, canvas.hieght);

    let command = state.update();

    if(command == "title") {
        state = title;
    }
    if(command == "gameOver") {
        state = gameOver
    }
    if(command == "game") {
        state = game
    }
    /// i was to focused on title.js i forgot about code.js. took me like an hour 
    // to figure out why credits wasnt working 
    if(command == "credits") {
        state = credits
    }
}

setInterval(gameloop, 1000 / 60)

