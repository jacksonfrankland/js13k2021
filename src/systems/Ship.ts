import { Rocket } from "../components";
import { drawImage, loadImage } from "../lib/drawImage";
import { vec } from "../lib/Vector";

export default class Ship {
    constructor (private ctx: CanvasRenderingContext2D) {
        
        ecs.create().add(new Rocket, new Transform());
        loadImage('ship.svg').then(() => {
            drawImage(this.ctx, 'ship.svg', vec(0, 0), vec(30, 30));
        });
        window.addEventListener('resize', () => {
            drawImage(this.ctx, 'ship.svg', vec(0, 0), vec(30, 30));
        });
    }

    update (_: number) {
    }
}
