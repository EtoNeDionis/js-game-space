import { Particle } from "./Particles/Particle";
import { Player } from "./Player";
import { EnemyProjectile } from "./Projectiles/EnemyProjectile";
import {gameStats} from "../index"
interface IPosition {
    x: number;
    y: number;
}
interface IV {
    x: number;
    y: number;
}

export class Enemy {
    position: IPosition;
    width: number;
    height: number;
    image: HTMLImageElement;

    projectiles: EnemyProjectile[];

    player: Player;
    markedForDeletion: boolean;

    particles: Particle[];

    constructor(position: IPosition, player: Player) {
        this.position = { x: 0, y: 0 };

        this.image = new Image();
        this.image.src = "./assets/enemy.png";

        this.image.onload = () => {
            const aspectRatio = 1;
            this.width = this.image.width * aspectRatio;
            this.height = this.image.height * aspectRatio;
            this.position = position;
        };
        this.projectiles = [];

        this.player = player;

        this.markedForDeletion = false;

        this.particles = [];
    }

    update(v: IV) {
        this.position.x += v.x;
        this.position.y += v.y;

        this.player.projectiles.forEach((proj, index) => {
            if (
                // this is x check
                proj.position.x >= this.position.x &&
                proj.position.x <= this.position.x + this.width &&
                // this is y check
                proj.position.y >= this.position.y &&
                proj.position.y <= this.position.y + this.player.height
            ) {
                gameStats.score += 10
                this.markedForDeletion = true;
                this.player.projectiles[index].markedForDeletion = true;
            }
        });

        this.projectiles.forEach((p, index) => {
            p.update();

            const projectileOriginPosition = {
                x: p.position.x + p.width / 2,
                y: p.position.y + p.height / 2,
            };

            if (
                // x check
                projectileOriginPosition.x >= this.player.position.x &&
                projectileOriginPosition.x <=
                    this.player.position.x + this.player.width &&
                // y check
                projectileOriginPosition.y >= this.player.position.y &&
                projectileOriginPosition.y <=
                    this.player.position.y + this.player.height
            ) {
                for (let i = 0; i < 20; i++) {
                    this.player.particles.push(
                        new Particle(
                            {
                                x:
                                    this.player.position.x +
                                    this.player.width / 2,
                                y:
                                    this.player.position.y +
                                    this.player.height / 2,
                            },
                            {
                                x: (Math.random() - 0.5) * 2,
                                y: (Math.random() - 0.5) * 2,
                            },
                            Math.random() * 3,
                            "white"
                        )
                    );
                }
                this.player.health -= 1;
                p.markedForDeletion = true;
            }

            if (p.markedForDeletion) this.projectiles.splice(index, 1);

            this.particles.forEach((p) => p.update());
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );

        this.projectiles.forEach((p) => {
            p.draw(ctx);
        });

        this.particles.forEach((p) => p.draw({ctx: ctx}));
    }

    shoot() {
        this.projectiles.push(
            new EnemyProjectile(
                {
                    x: this.position.x + this.width / 2,
                    y: this.position.y,
                },
                { x: 0, y: 1 },
                3,
                10
            )
        );
    }
}
