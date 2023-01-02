import canvas from "../..";
import { Projectile } from "./Projectile";

interface IPosition {
    x: number;
    y: number;
}

interface IV {
    x: number;
    y: number;
}

export class EnemyProjectile extends Projectile {
    constructor(position: IPosition, v: IV, width: number, height: number) {
        super(position, v, width, height);
    }

    update() {
        this.position.x += this.v.x;
        this.position.y += this.v.y;

        if (this.position.y + this.height > canvas.height) {
            this.markedForDeletion = true;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red";
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
