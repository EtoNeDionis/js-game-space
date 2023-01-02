import { Player } from "../Player";

interface IPosition {
    x: number;
    y: number;
}

interface IV {
    x: number;
    y: number;
}

export class Projectile {
    position: IPosition;
    v: IV;
    radius?: number;
    height: number;
    width: number;
    markedForDeletion: boolean;

    constructor(position: IPosition, v: IV, width?: number, height?: number) {
        this.position = position;
        this.v = v;
        this.radius = 1;
        this.markedForDeletion = false;
        this.height = height || 0;
        this.width = width || 0;
    }

    update() {}

    draw(ctx: CanvasRenderingContext2D) {}
}
