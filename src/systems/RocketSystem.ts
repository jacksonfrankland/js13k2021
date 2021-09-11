import { vec, Vector } from "../lib/Vector";
import { Rocket, Transform, RigidBody, Camera } from "../components";
import ecs, { Entity } from 'js13k-ecs';
import { drawImage, loadImage } from "../lib/drawImage";

export default class RocketSystem {

    private entity: Entity;
    private keys = new Set<string>();
    // private mousePosition: Vector|null = null;
    // private camera!: Camera;

    constructor (private ctx: CanvasRenderingContext2D) {
        let position = vec(5, 6);
        this.entity = ecs.create();
        this.entity.add(new Rocket, new Transform(position, 0), new RigidBody);
        loadImage('rocket.svg');
        window.addEventListener('keydown', e => {
            this.keys.add(e.code);
            console.log(e.code);
        });
        window.addEventListener('keyup', e => {
            this.keys.delete(e.code);
        });
    }

    update (delta: number) {
        this.entity.get(RigidBody).addForce(0, delta / 150000);
        let sign = Math.min(Math.max(['KeyD', 'ArrowRight'].filter(code => this.keys.has(code)).length -  ['KeyA', 'ArrowLeft'].filter(code => this.keys.has(code)).length, -1), 1);
        this.entity.get(Transform).rotation += sign * delta / 700;
        if (this.keys.has('Space')) {
            let direction = Vector.fromAngle(this.entity.get(Transform).rotation);
            this.entity.get(RigidBody).addForce(direction.scaleBy(delta / 100000));
        }
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        drawImage(this.ctx, 'rocket.svg', this.entity.get(Transform).position, vec(.8, 1.2), this.entity.get(Transform).rotation);
    }
}
