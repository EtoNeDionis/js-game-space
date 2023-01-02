import { Particle } from "./Particles/Particle";
import canvas from "..";
import { Enemy } from "./Enemy";
import { Player } from "./Player";
interface IPosition {
    x: number;
    y: number;
}
interface IV {
    x: number;
    y: number;
}

export class EnemyGroup {
    enemies: Enemy[];
    position: IPosition;
    v: IV;
    markedForDeletion: boolean;
    shootFrame: number;
    particles: Particle[];

    score: number
    constructor(player: Player) {
        this.position = { x: 0, y: 0 };
        this.v = { x: 1, y: 0 };
        this.enemies = [];

        const columns = Math.floor(Math.random() * 2 + 3);
        const rows = Math.floor(Math.random() * 5 + 4);
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                this.enemies.push(new Enemy({ x: i * 30, y: j * 30 }, player));
            }
        }

        this.markedForDeletion = false;
        this.shootFrame = 0;

        this.particles = [];
    }

    update() {
        this.particles = this.particles.filter((p) => {
            if (p.opacity > 0) p.update();
            return p.opacity >= 0;
        });

        if (this.enemies.length === 0) return (this.markedForDeletion = true);
        this.v.y = 0;
        if (
            this.enemies.at(-1).position.x + this.enemies[0].width >=
                canvas.width ||
            this.enemies.at(0).position.x < 0
        ) {
            this.v.x *= -1;
            this.v.y += 30;
        }

        this.enemies.forEach((e) => {
            e.update(this.v);
        });

        this.position = this.enemies[0].position;

        /*
            Deletion
        */
        //  if off screen
        if (this.position.y > canvas.height) this.markedForDeletion = true;

        this.enemies = this.enemies.filter((e) => {
            if (e.markedForDeletion) {
                
                for (let i = 0; i < 20; i++) {
                    this.particles.push(
                        new Particle(
                            {
                                x: e.position.x + e.width / 2,
                                y: e.position.y + e.height / 2,
                            },
                            {
                                x: (Math.random() - 0.5) * 2,
                                y: (Math.random() - 0.5) * 2,
                            },
                            Math.random() * 3,
                            "yellow"
                        )
                    );
                }
            }

            this.score += 10
            return !e.markedForDeletion;
        });

        this.shootFrame++;
        if (this.shootFrame % Math.floor(Math.random() * 200 + 50) === 0) {
            this.enemies[
                Math.floor(Math.random() * this.enemies.length)
            ].shoot();
            this.shootFrame = 0;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.enemies.forEach((e) => {
            e.draw(ctx);
        });

        this.particles.forEach((p) => p.draw({ctx: ctx}));
    }
}
