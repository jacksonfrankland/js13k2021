import ecs from 'js13k-ecs';
import { Camera } from '../components';
import { vec } from '../lib/Vector';

export default class {
    constructor () {
        ecs.create().add(new Camera(vec(5, 5)));
    }

    update (_: number) {
    }
}
