import ecs, { Selector } from 'js13k-ecs';
import {vec} from '../lib/Vector';
import { RigidBody, Transform } from '../components';

export default class Physics {

    private selector: Selector;

    constructor () {
        this.selector = ecs.select(RigidBody, Transform);
    }

    update (delta: number) {
        this.selector.iterate(entity => {
            let rigidBody = entity.get(RigidBody);
            let transform = entity.get(Transform);
            rigidBody.velocity = rigidBody.velocity.add(rigidBody.acceleration);
            transform.position = transform.position.add(rigidBody.velocity.scaleBy(delta));
            rigidBody.acceleration = vec(0, 0);
        });
    }
}
