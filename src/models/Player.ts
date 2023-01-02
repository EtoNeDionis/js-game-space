import { Particle } from "./Particles/Particle";
import { HighlightSpanKind } from "typescript";
import { PlayerProjectile } from "./Projectiles/PlayerProjectile";
import { Projectile } from "./Projectiles/Projectile";
interface IPosition {
    x: number;
    y: number;
}
interface IV {
    x: number;
    y: number;
}

export class Player {
    position: IPosition;
    v: IV;
    width: number;
    height: number;
    image: HTMLImageElement;
    rotateDeg: number;

    projectiles: PlayerProjectile[];

    shootsPerSecond: number;
    shootingAvailable: boolean;
    particles: Particle[];
    health: number;

    markedForDeletion: boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.v = { x: 0, y: 0 };
        this.position = { x: 0, y: 0 };
        this.image = new Image();
        this.image.src = "./assets/player.png";

        this.image.onload = () => {
            const aspectRatio = 0.1;
            this.width = this.image.width * aspectRatio;
            this.height = this.image.height * aspectRatio;
            this.position = {
                x: (canvas.width - this.width) / 2,
                y: canvas.height - this.height,
            };
        };

        this.rotateDeg = 0;
        this.projectiles = [];

        this.shootsPerSecond = 6;
        this.shootingAvailable = true;

        this.particles = [];
        this.health = 3;
        this.markedForDeletion = false;
    }

    update(keys: string[], canvasWidth: number, canvasHeight: number) {
        if (this.health === 0) return (this.markedForDeletion = true);
        this.particles = this.particles.filter((p) => {
            if (p.opacity > 0) p.update();
            return p.opacity >= 0;
        });

        this.position.x += this.v.x;
        this.position.y += this.v.y;

        this.v = { x: 0, y: 0 };

        keys.forEach((key) => {
            if (key === "KeyD" && this.position.x + this.width <= canvasWidth) {
                this.v.x = 1;
                this.rotateDeg = (30 * Math.PI) / 180;
            } else if (key === "KeyA" && this.position.x >= 0) {
                this.v.x = -1;
                this.rotateDeg = (-30 * Math.PI) / 180;
            } else if (key === "KeyW" && this.position.y >= 0) {
                this.v.y = -0.5;
            } else if (
                key === "KeyS" &&
                this.position.y + this.height <= canvasHeight
            ) {
                this.v.y = 0.5;
            } else if (key === "Space") {
                // this.reloadTimer++

                if (this.shootingAvailable) {
                    this.shoot();
                    this.shootingAvailable = false;

                    setTimeout(() => {
                        this.shootingAvailable = true;
                    }, (1 / this.shootsPerSecond) * 1000);
                }
            }
        });
        if (keys.indexOf("KeyA") === -1 && keys.indexOf("KeyD") === -1) {
            this.rotateDeg = 0;
        }

        this.projectiles.forEach((proj, index) => {
            proj.update();
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.save();

        ctx.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        );

        ctx.rotate(this.rotateDeg);
        ctx.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2
        );

        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        ctx.restore();

        this.projectiles.forEach((proj, index) => {
            if (proj.markedForDeletion) this.projectiles.splice(index, 1);
            proj.draw(ctx);
        });

        this.particles.forEach((p) => p.draw({ctx: ctx}));
    }

    shoot() {
        this.projectiles.push(
            new PlayerProjectile(
                {
                    x: this.position.x + this.width / 2,
                    y: this.position.y,
                },
                { x: 0, y: -3 }
            )
        );
    }
}
