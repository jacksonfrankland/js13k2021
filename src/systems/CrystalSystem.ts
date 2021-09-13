import ecs, { Selector } from "js13k-ecs";
import { Crystal, Transform, RigidBody, Rocket, LifeSpan } from "../components";
import { incrementScore } from "../lib/score";
import { drawImage, loadImage } from "../lib/drawImage";
import {vec} from '../lib/Vector';

export default class {

    private selector: Selector;
    private rockets: Selector;

    constructor (private ctx: CanvasRenderingContext2D) {
        this.selector = ecs.select(Crystal, Transform, RigidBody);
        this.rockets = ecs.select(Rocket, Transform);
        loadImage('crystal.svg');
    }

    update (delta: number) {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.selector.iterate(entity => {
            entity.get(RigidBody).addForce(0, delta / 1200000);
            drawImage(this.ctx, 'crystal.svg', entity.get(Transform).position, vec(.5, .5));
            this.rockets.iterate(rocket => {
                if (rocket.get(Transform).position.subtract(entity.get(Transform).position).magnitudeSquared < 1) {
                    if (!entity.get(Crystal).follow) {
                        incrementScore();
                    }
                    entity.get(Crystal).follow = rocket;
                    entity.get(LifeSpan).timeLeft = Math.min(entity.get(LifeSpan).timeLeft, 200);
                }
            });
            if (entity.get(Crystal).follow) {
                entity.get(RigidBody).addForce(entity.get(RigidBody).velocity.scaleBy(-1));
                entity.get(RigidBody).addForce(entity.get(Crystal).follow!.get(Transform).position.subtract(entity.get(Transform).position).scaleBy(delta / 1000));
            }
        });

    }

}
