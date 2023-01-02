import { Player } from "../Player";
import { Projectile } from "./Projectile";

interface IPosition {
    x: number;
    y: number;
}

interface IV {
    x: number;
    y: number;
}

export class PlayerProjectile extends Projectile {
    position: IPosition;
    v: IV;
    radius: number;
    markedForDeletion: boolean

    constructor(position: IPosition, v: IV) {
        super(position, v)
    }

    
    update() {
        this.position.x += this.v.x;
        this.position.y += this.v.y;
        if(this.position.y + this.radius < 0) {
            this.markedForDeletion = true
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = "violet";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.closePath();
    }
}
