import { Vector, vec } from "../lib/Vector";

export default class Camera {

    constructor (public position = vec(0, 0)) {}

    get unit () {
        return Math.floor(Math.min(window.innerWidth, window.innerHeight) / 10);
    }

    screenPosition (position: Vector) {
        return position.scaleBy(this.unit).subtract(this.position.scaleBy(this.unit)).add(window.innerWidth / 2, window.innerHeight / 2);
    }

    worldPosition (position: Vector) {
        return position.scaleBy(1 / this.unit).add(this.position).subtract(window.innerWidth / 2 / this.unit, window.innerHeight / 2 / this.unit);
    }
}
