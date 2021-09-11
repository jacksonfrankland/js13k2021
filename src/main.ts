import './style.css';
import ecs from 'js13k-ecs';
import {RigidBody, Transform, Star, Camera, Rocket} from './components';
import { PhysicsSystem, StarfieldSystem, CameraSystem, SunSystem, RocketSystem } from './systems';

let starsCtx = getCtx('#starfield');
let rocketCtx = getCtx('#rocket');
let sunCtx = getCtx('#sun');
let fpsCount = document.querySelector<HTMLElement>('#fps');
ecs.register(Camera, RigidBody, Transform, Star, Rocket);
ecs.process(new CameraSystem, new PhysicsSystem, new StarfieldSystem(starsCtx), new SunSystem(sunCtx), new RocketSystem(rocketCtx));

let oldTimestamp: number;
function step (timestamp: number) {
    if (!oldTimestamp) {
        oldTimestamp = timestamp;
    }
    let delta = timestamp - oldTimestamp;
    // fpsCount!.innerHTML = `FPS: ${Math.floor(1000 / delta)}`;
    // console.log(1000 / delta);
    oldTimestamp = timestamp
    ecs.update(Math.min(delta, 100));
    requestAnimationFrame(step);
}
requestAnimationFrame(step);

function getCtx (selector: string) {
    const canvas = document.querySelector<HTMLCanvasElement>(selector)!;
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * devicePixelRatio;
    canvas.height = rect.height * devicePixelRatio;
    let ctx = canvas.getContext('2d')!;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    window.addEventListener('resize', () => {
        let container = document.querySelector('#app')!;
        let rect = container.getBoundingClientRect();
        canvas.width = rect.width * devicePixelRatio;
        canvas.height = rect.height * devicePixelRatio;
        ctx.scale(devicePixelRatio, devicePixelRatio);
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
    });
    return ctx;
}
