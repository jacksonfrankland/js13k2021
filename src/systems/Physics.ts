import ecs, { Selector } from 'js13k-ecs';
import {vec} from '../lib/Vector';
import { MaxSpeed, RigidBody, Transform } from '../components';

export default class {

    private selector: Selector;
    private maxSpeedSelector: Selector;

    constructor () {
        this.selector = ecs.select(RigidBody, Transform);
        this.maxSpeedSelector = ecs.select(RigidBody, MaxSpeed);
    }

    update (delta: number) {
        this.selector.iterate(entity => {
            let rigidBody = entity.get(RigidBody);
            let transform = entity.get(Transform);
            rigidBody.velocity = rigidBody.velocity.add(rigidBody.acceleration);
            transform.position = transform.position.add(rigidBody.velocity.scaleBy(delta));
            rigidBody.acceleration = vec(0, 0);
        });
        this.maxSpeedSelector.iterate(entity => {
            let maxSpeed = entity.get(MaxSpeed).value;
            let rigidBody = entity.get(RigidBody);
            rigidBody.velocity = rigidBody.velocity.max(maxSpeed);
        })
    }
}
