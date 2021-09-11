import { vec, Vector } from "../lib/Vector";

export default class RigidBody {
    constructor (public velocity = vec(0, 0), public acceleration = vec(0, 0)) {}

    addForce (other: Vector): void;
    addForce (x: number, y: number): void;
    addForce (a: Vector|number, b?: number) {
        let other = a instanceof Vector ? a : new Vector(a, b ?? 0);
        this.acceleration = this.acceleration.add(other);
    }
}
