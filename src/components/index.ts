import {vec} from '../lib/Vector';

export class Transform {
    constructor (public position = vec(0, 0), public rotation = 0) {}
}

export class Rocket {}

export {default as RigidBody} from './RigidBody';
export {default as Camera} from './Camera';

export class Star {
    constructor (public size = 1) {}
}
