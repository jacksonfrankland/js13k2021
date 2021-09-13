import { vec, Vector } from "../lib/Vector";
import { Rocket, Transform, RigidBody, Camera, MaxSpeed, Spawner, Particle, LifeSpan } from "../components";
import ecs, { Entity } from 'js13k-ecs';
import { drawImage, loadImage } from "../lib/drawImage";
import store, {State} from '../store';
import { updateScore } from "../lib/score";

export default class {

    private entity: Entity;
    private particleEmmiter: Entity;
    private keys = new Set<string>();

    constructor (private ctx: CanvasRenderingContext2D, private uiCtx: CanvasRenderingContext2D) {
        let position = vec(5, 6);
        this.entity = ecs.create();
        this.entity.add(new Rocket, new Transform(position, 0), new RigidBody, new MaxSpeed(.005));
        this.particleEmmiter = ecs.create();
        this.particleEmmiter.add(new Spawner(20, () => {
            return [new Particle('#075985', .2), new LifeSpan(1000), new Transform(this.entity.get(Transform).position), new RigidBody(Vector.fromAngle(this.entity.get(Transform).rotation).scaleBy(-0.001))]
        }))

        loadImage('rocket.svg');
        loadImage('arrow.svg');
        window.addEventListener('keydown', e => {
            if (store.state !== State.DYING) {
                this.keys.add(e.code);
            }
        });
        window.addEventListener('keyup', e => {
            this.keys.delete(e.code);
        });
    }

    update (delta: number) {
        if (store.state === State.PLAYING || store.state === State.DYING) {
            this.entity.get(RigidBody).addForce(0, delta / 200000);
        }
        this.particleEmmiter.get(Spawner).enabled = this.keys.has('Space');
        let sign = Math.min(Math.max(['KeyD', 'ArrowRight'].filter(code => this.keys.has(code)).length -  ['KeyA', 'ArrowLeft'].filter(code => this.keys.has(code)).length, -1), 1);
        this.entity.get(Transform).rotation += sign * delta / 700;
        let rotation = this.entity.get(Transform).rotation;
        this.entity.get(Transform).rotation = Math.min(Math.max(rotation, -1), 1);
        if (store.state !== State.DYING && this.keys.has('Space')) {
            if (store.state === State.NOT_PLAYINNG) {
                updateScore(0);
                store.state = State.PLAYING;
            }
            store.started = true;
            let direction = Vector.fromAngle(this.entity.get(Transform).rotation);
            this.entity.get(RigidBody).addForce(direction.scaleBy(delta / 100000));
        }
        this.uiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        drawImage(this.ctx, 'rocket.svg', this.entity.get(Transform).position, vec(1.2, 1.2), this.entity.get(Transform).rotation);
        let camera!: Camera;
        ecs.select(Camera).iterate(entity => camera = entity.get(Camera));
        let position = this.entity.get(Transform).position;
        if (position.x > camera?.right + .5 || position.x < camera?.left - .5 || position.y < camera?.top - .5) {
            let clamped = position.clamp(vec(camera.left + 1, camera.top + 1), vec(camera.right - 1, camera.bottom - 1))
            drawImage(this.uiCtx, 'arrow.svg', clamped, vec(1, 1), position.subtract(clamped).angle);
        }

        if (store.state === State.PLAYING && camera?.screenPosition(vec(0, position.y - .5)).y > window.innerHeight * .9) {
            store.state = State.DYING;
            ecs.create().add(new LifeSpan(3000), new Spawner(50, () => {
                return [
                    new Particle('gray', .3),
                    new LifeSpan(3000),
                    new Transform(vec(this.entity.get(Transform).position.x, camera.worldPosition(vec(0, window.innerHeight * .9)).y)),
                    new RigidBody(Vector.fromAngle(Math.PI / -4 + Math.random() * Math.PI / 2).scaleBy(.0005))
                ];
            }));
            setTimeout(() => {
                this.entity.get(Transform).position = vec(5, 6);
                this.entity.get(RigidBody).acceleration = vec(0, 0);
                this.entity.get(RigidBody).velocity = vec(0, 0);
                this.entity.get(Transform).rotation = 0;
                store.state = State.NOT_PLAYINNG;
            }, 3000);

        }
    }
}
