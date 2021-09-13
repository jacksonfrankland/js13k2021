import ecs, { Selector } from "js13k-ecs";
import {vec, Vector} from '../lib/Vector';
import { LifeSpan, SolarFlare, Spawner, Particle, Camera, Transform, RigidBody, Rocket, Crystal } from "../components";
import store, {State} from "../store";

export default class {

    private selector: Selector;
    private rocketSelector: Selector;
    private spawner: Spawner;
    private camera!: Camera;

    constructor (private ctx: CanvasRenderingContext2D) {
        ecs.select(Camera).iterate(entity => this.camera = entity.get(Camera));
        this.selector = ecs.select(SolarFlare, LifeSpan);
        this.rocketSelector = ecs.select(Rocket, Transform);
        let spawner = ecs.create();
        spawner.add(new Spawner(3000, () => {
            return [
                new LifeSpan(3000),
                new SolarFlare(this.camera.left + Math.random() * (this.camera.right - this.camera.left), 2000)
            ];
        }));
        this.spawner = spawner.get(Spawner);
    }

    update (delta: number) {
        this.spawner.enabled = store.state === State.PLAYING;
        this.selector.iterate(entity => {
            if (entity.get(SolarFlare).time === 0) {
                let position = entity.get(SolarFlare).position;
                ecs.create().add(new LifeSpan(entity.get(LifeSpan).timeLeft), new Spawner(50, () => {
                    return [
                        new Particle('#EF4444', .3),
                        new LifeSpan(3000),
                        new Transform(vec(position - .5 + Math.random(), this.camera.worldPosition(vec(0, window.innerHeight * .9)).y + .1)),
                        new RigidBody(Vector.fromAngle(Math.PI / -4 + Math.random() * Math.PI / 2).scaleBy(.0005))
                    ];
                }));
            }
            entity.get(SolarFlare).time += delta;
            if (entity.get(SolarFlare).time > entity.get(SolarFlare).buildUp) {
                if (!entity.get(SolarFlare).spawnedCrystal) {
                    ecs.create().add(new Crystal, new Transform(vec(entity.get(SolarFlare).position, 1)), new RigidBody, new LifeSpan(10000));
                    entity.get(SolarFlare).spawnedCrystal = true;
                }
                let totalLife = entity.get(LifeSpan).totalLife;
                let buildUp = entity.get(SolarFlare).buildUp;
                let time = entity.get(SolarFlare).time;
                let midPoint = buildUp + (totalLife - buildUp) / 2;
                console.log(totalLife, buildUp, time, midPoint);
                let width = ((totalLife - buildUp) / 2 - Math.abs(midPoint - time)) / (totalLife - buildUp) / 2;
                width = Math.sin(width * Math.PI);
                this.ctx.save();
                this.ctx.fillStyle = '#EF4444';
                let x = this.camera.screenPosition(vec(entity.get(SolarFlare).position - width / 2, 0)).x;
                this.ctx.fillRect(x, 0, width * this.camera.unit, window.innerHeight);

                let cX = x + (width / 2 * this.camera.unit);
                let sX = cX - width * 12 * this.camera.unit;
                let w = width * this.camera.unit * 24;
                let gradient = this.ctx.createLinearGradient(sX, 0, sX + w, 0);
                gradient.addColorStop(.9, 'transparent');
                gradient.addColorStop(.5, '#EF4444BB');
                gradient.addColorStop(.1, 'transparent');
                this.ctx.fillStyle = gradient
                this.ctx.fillRect(sX, 0, w, window.innerHeight);
                this.ctx.restore();
                this.rocketSelector.iterate(rocket => {
                    if (store.state === State.PLAYING && Math.abs(rocket.get(Transform).position.x - entity.get(SolarFlare).position) < width) {
                        store.state = State.DYING;
                        ecs.create().add(new LifeSpan(3000), new Spawner(50, () => {
                            return [
                                new Particle('gray', .3),
                                new LifeSpan(3000),
                                new Transform(rocket.get(Transform).position),
                                new RigidBody(Vector.fromAngle(Math.random() * Math.PI * 2).scaleBy(.0005))
                            ];
                        }));
                        setTimeout(() => {
                            rocket.get(Transform).position = vec(5, 6);
                            rocket.get(RigidBody).acceleration = vec(0, 0);
                            rocket.get(RigidBody).velocity = vec(0, 0);
                            rocket.get(Transform).rotation = 0;
                            store.state = State.NOT_PLAYINNG;
                        }, 3000);
                    }
                });
            }
        });

    }
}
