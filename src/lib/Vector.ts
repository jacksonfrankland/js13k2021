export class Vector {
    constructor (public x: number, public y: number) {}

    add (other: Vector): Vector;
    add (x: number, y: number): Vector;
    add (a: Vector|number, b?: number) {
        let other = a instanceof Vector ? a : new Vector(a, b ?? 0);
        return new Vector(this.x + other.x, this.y + other.y);
    }

    subtract (other: Vector): Vector;
    subtract (x: number, y: number): Vector;
    subtract (a: Vector|number, b?: number) {
        let other = a instanceof Vector ? a : new Vector(a, b ?? 0);
        return new Vector(this.x - other.x, this.y - other.y);
    }

    scaleBy (scale: number) {
        return new Vector (this.x * scale, this.y * scale);
    }

    max (scale: number) {
        if (this.magnitudeSquared < scale * scale) {
            return this;
        }
        let magnitude = this.magnitude;
        return new Vector(this.x / magnitude * scale, this.y / magnitude * scale);
    }

    clamp (a: Vector, b: Vector) {
        let clamped = this.copy;
        if (clamped.x < a.x && clamped.x < b.x) {
            clamped.x = Math.min(a.x, b.x);
        }
        if (clamped.x > a.x && clamped.x > b.x) {
            clamped.x = Math.max(a.x, b.x);
        }
        if (clamped.y < a.y && clamped.y < b.y) {
            clamped.y = Math.min(a.y, b.y);
        }
        if (clamped.y > a.y && clamped.y > b.y) {
            clamped.y = Math.max(a.y, b.y);
        }
        return clamped;
    }

    get magnitudeSquared () {
        return this.x * this.x + this.y * this.y;
    }

    get magnitude () {
        return Math.sqrt(this.magnitudeSquared);
    }

    get copy () {
        return new Vector(this.x, this.y);
    }

    get angle () {
        return Math.PI / 2 - Math.atan2(this.y * -1, this.x);
    }

    static fromAngle (angle: number) {
        let adjustedAngle = angle * -1 + Math.PI / 2;
        return new Vector(Math.cos(adjustedAngle), Math.sin(adjustedAngle) * -1);
    }
}

export function vec (x: number, y: number) {
    return new Vector(x, y);
}
