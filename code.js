import { Toolbox } from "./toolbox.js";
import { Game} from "./game.js"
import { Gameover } from "./states/gameOver.js";
import { Title } from "./states/title.js";


let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();

//Make game states

let game = new Game();
let gameOver = new Gameover();
let title = new Title();

let state = title;

function gameloop

