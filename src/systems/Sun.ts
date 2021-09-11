import {makeNoise2D} from 'fast-simplex-noise';

export default class {

    private noise = makeNoise2D();
    private time = 0;
    private pointCount = 75;

    constructor (private ctx: CanvasRenderingContext2D) {
        this.ctx.fillStyle = '#EF4444';
        this.ctx.fillRect(0, window.innerHeight * .9, window.innerWidth, window.innerHeight * .1);
        // this.ctx.globalCompositeOperation = 'overlay';
    }

    update (delta: number) {
        this.time += delta;
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        let points: number[] = []
        for (let i = 0; i < this.pointCount; i++) {
            points.push(this.noise(i, this.time / 1000));
        }
        this.ctx.fillStyle = '#EF4444';
        this.ctx.beginPath();
        this.ctx.moveTo(0, window.innerHeight * .9 - points[0] * window.innerHeight * .02);
        for (let i = 1; i < points.length; i++) {
            let x = window.innerWidth / (this.pointCount - 1) * (i + 1);
            let y = window.innerHeight * .9 - points[i] * window.innerHeight * .015;
            let oldY = window.innerHeight * .9 - points[i - 1] * window.innerHeight * .02;
            let gap = window.innerWidth / (this.pointCount - 1) / 3;
            this.ctx.bezierCurveTo(x - gap * 2, oldY, x - gap, y, x, y);
        }
        this.ctx.lineTo(window.innerWidth, window.innerHeight);
        this.ctx.lineTo(0, window.innerHeight);
        this.ctx.fill();
        let gradient = this.ctx.createLinearGradient(0, 0, 0, window.innerHeight);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(.15 + this.noise(0, this.time / 1000) / 10, 'transparent');
        gradient.addColorStop(1, '#EF4444');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }
}
