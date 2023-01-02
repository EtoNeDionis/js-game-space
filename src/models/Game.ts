import { Player } from "./Player";
import { Input } from "./Input";
import { EnemyGroup } from "./EnemyGroup";
import canvas from "..";
import { Particle } from "./Particles/Particle";
import {gameStats} from "../index"

export class Game {
    player: Player;
    input: Input;
    vx: number;
    enemyGroups: EnemyGroup[];
    frames: number;
    particles: Particle[];
    isGameEnded: boolean;

    constructor() {
        this.input = new Input();
        this.player = new Player(canvas);
        this.vx = 0;

        this.enemyGroups = [];

        this.frames = 0;
        this.particles = [];
        this.isGameEnded = false;

        for (let i = 0; i < 15; i++) {
            this.particles.push(
                new Particle(
                    {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                    },
                    {
                        x: 0,
                        y: 0.3,
                    },
                    Math.random() * 2,
                    "white",
                    false
                )
            );
        }
    }

    update() {
        if (this.player.markedForDeletion === true) return;
        if (this.frames % (Math.floor(Math.random() * 500) + 800) === 0) {
            this.enemyGroups.push(new EnemyGroup(this.player));
        }

        this.player.update(this.input.keys, canvas.width, canvas.height);

        this.enemyGroups = this.enemyGroups.filter((e) => {
            e.update();
            if (e.enemies.length === 0 && e.particles.length === 0) gameStats.score += 100;
            return e.enemies.length !== 0 || e.particles.length !== 0;
        });

        this.frames++;

        this.particles.forEach((p) => {
            if (p.position.y - p.radius >= canvas.height) {
                p.position.x = Math.random() * canvas.width;
                p.position.y = -p.radius;
            }
            p.update();
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.player.markedForDeletion === true) return;

        this.player.draw(ctx);

        this.enemyGroups.forEach((eg) => {
            eg.draw(ctx);
        });

        this.particles.forEach((p) => p.draw({ctx: ctx}));
    }
}
