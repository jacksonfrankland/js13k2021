import ecs, { Entity } from 'js13k-ecs';
import { Camera } from '../components';
import { vec } from '../lib/Vector';

export default class {

    private camera: Entity;

    constructor () {
        this.camera = ecs.create();
        this.camera.add(new Camera(vec(5, 5)));
    }

    update (_: number) {
        
    }
}
