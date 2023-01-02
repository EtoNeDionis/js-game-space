import { ClassElement } from "typescript";
import { Game } from "./models/Game";
import "./styles/index.css";

const canvas = <HTMLCanvasElement>document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreElem = <HTMLDivElement>document.getElementById("score");

export default canvas;
export const gameStats = {
    score: 0
}

const aspectRatio = 16 / 9
canvas.height = 500;

canvas.width = canvas.height * aspectRatio
// canvas.height = canvas.width * heightRatio;

const game = new Game();



const animate = () => {
    requestAnimationFrame(animate);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    game.update();
    game.draw(ctx);

    scoreElem.innerHTML = String(gameStats.score);
};

animate();

/* 
addition
*/
