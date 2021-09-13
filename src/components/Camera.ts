import { Vector, vec } from "../lib/Vector";

export default class Camera {

    constructor (public position = vec(0, 0)) {}

    get unit () {
        return Camera.unit();
    }

    static unit () {
        return Math.floor(Math.min(window.innerWidth, window.innerHeight) / 10);
    }

    static screenWidth () {
        return window.innerWidth / Camera.unit();
    }

    static screenHeight () {
        return window.innerHeight / Camera.unit();
    }

    get left () {
        return this.position.x - Camera.screenWidth() / 2;
    }

    get right () {
        return this.position.x + Camera.screenWidth() / 2;
    }

    get top () {
        return this.position.y - Camera.screenHeight() / 2;
    }

    get bottom () {
        return this.position.y + Camera.screenHeight() / 2;
    }

    screenPosition (position: Vector) {
        return position.scaleBy(this.unit).subtract(this.position.scaleBy(this.unit)).add(window.innerWidth / 2, window.innerHeight / 2);
    }

    worldPosition (position: Vector) {
        return position.scaleBy(1 / this.unit).add(this.position).subtract(window.innerWidth / 2 / this.unit, window.innerHeight / 2 / this.unit);
    }
}
