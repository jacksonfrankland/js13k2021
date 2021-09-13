import ecs, { Selector } from "js13k-ecs";
import { Camera, LifeSpan, Particle, Transform } from "../components";

export default class {
    private selecter: Selector;

    constructor (private ctx: CanvasRenderingContext2D) {
        this.selecter = ecs.select(Particle, LifeSpan, Transform);
    }

    update (_: number) {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        let camera: Camera;
        ecs.select(Camera).iterate(entity => camera = entity.get(Camera));
        this.selecter.iterate(entity => {
            let position = camera.screenPosition(entity.get(Transform).position);
            let particle = entity.get(Particle);
            let lifeSpan = entity.get(LifeSpan);
            this.ctx.save();
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath()
            this.ctx.arc(position.x, position.y, camera.unit * particle.size * lifeSpan.timeLeft / lifeSpan.totalLife, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
}
