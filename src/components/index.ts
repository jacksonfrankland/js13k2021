import { Entity } from 'js13k-ecs';
import {vec} from '../lib/Vector';

export class Transform {
    constructor (public position = vec(0, 0), public rotation = 0) {}
}

export class MaxSpeed {
    constructor (public value = 1) {}
}

export class Crystal {
    public follow?: Entity;
}

export class LifeSpan {
    public timeLeft: number;
    constructor (public totalLife = 1000) {
        this.timeLeft = totalLife;
    }
}

export class Spawner {
    public tillNextSpawn: number;

    constructor (public interval: number, public generateComponents: () => any[], public enabled = true) {
        this.tillNextSpawn = interval;
    }
}

export class Particle {
    constructor (public color = '#ffffff', public size = 1) {}
}

export class Rocket {}

export {default as RigidBody} from './RigidBody';
export {default as Camera} from './Camera';

export class Star {
    constructor (public size = 1) {}
}

export class SolarFlare {
    public time = 0;
    public spawnedCrystal = false;
    constructor (public position = 5, public buildUp = 1000) {}
}
