import ecs from 'js13k-ecs';
import {Camera} from '../components';
import {Vector} from './Vector';

let loadedImages = new Map<string, HTMLImageElement>();

export function loadImage (image: string) {
    return new Promise(resolve => {
        let img = new Image();
        addEventListener('load', () => {
            loadedImages.set(image, img);
            resolve(true);
        }, false);
        img.src = image;
    });

}
export function drawImage (ctx: CanvasRenderingContext2D, image: string, position: Vector, size: Vector, angle = 0) {
    if(loadedImages.has(image) && loadedImages.get(image)?.complete) {
        let camera: Camera;
        ecs.select(Camera).iterate(entity => camera = entity.get(Camera));
        let unit = camera!.unit;
        let screenPosition = camera!.screenPosition(position);
        ctx.save()
        ctx.translate(screenPosition.x, screenPosition.y);
        ctx.rotate(angle);
        // document.querySelector<HTMLElement>('#fps')!.innerHTML = `${screenPosition.x} ${screenPosition.y}`;
        ctx.drawImage(loadedImages.get(image)!, size.x * unit / -2, - 1 * size.y * unit, size.x * unit, size.y * unit);
        ctx.restore();
    }
}
