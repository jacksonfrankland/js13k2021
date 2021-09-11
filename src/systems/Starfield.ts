import { vec } from '../lib/Vector';
export default class Starfield {

    constructor (private ctx: CanvasRenderingContext2D) {
        this.draw();
        window.addEventListener('resize', () => {
            this.draw();
        });
    }

    draw () {
        this.ctx.fillStyle = '#3D0038';
        this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        for(let i = 0; i < 500; i++) {
            let position = vec(Math.floor(Math.random() * window.innerWidth), Math.floor(Math.random() * window.innerHeight));
            let size = Math.random() * .125;
            // ecs.create().add(new Star(size), new Transform(position));
            this.ctx.fillStyle = '#F9A8D4';
            this.ctx.beginPath();
            this.ctx.arc(position.x, position.y, size * 10, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }

    update (delta: number) {
        // this.ctx.fillStyle = `rgba(0, 0, 0, ${delta / 100})`;
        // this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        // ecs.select(Star, RigidBody, Transform).iterate(entity => {
        //     if (entity.get(Transform).position.x < 0) {
        //         entity.get(Transform).position.x = window.innerWidth + 5;
        //     }
        //     this.ctx.fillStyle = 'gray';
        //     this.ctx.beginPath();
        //     this.ctx.arc(entity.get(Transform).position.x, entity.get(Transform).position.y, entity.get(Star).size * 10, 0, 2 * Math.PI);
        //     this.ctx.fill();
        // });
    }
}
